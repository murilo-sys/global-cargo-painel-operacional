CREATE OR REPLACE FUNCTION fn_get_operational_dashboard_metrics(
          p_freights_date TIMESTAMPTZ DEFAULT (NOW() - INTERVAL '6 days'),
          p_pickups_date TIMESTAMPTZ DEFAULT (NOW() - INTERVAL '7 days'),
          p_current_filial TEXT DEFAULT 'SAO GLOBAL CARGO',
          p_current_location TEXT DEFAULT 'GLOBAL AIR CARGO LTDA - SAO',
          p_current_hub TEXT DEFAULT 'SAO'
        )
        RETURNS JSONB
        LANGUAGE plpgsql
        AS $$
        DECLARE
          v_dashboard JSONB;
        BEGIN
          WITH
          -- ========================================================
          -- 1. FREIGHTS (LENDO DIRETO DA VIEW AGORA!)
          -- ========================================================
          filtered_freights AS (
            SELECT
              destination_hub,
              modal,
              volume_m3,
              weight_kg,
              invoice_value,
              minute_number,
              status,
              freight_weight,
              cte_number,
              issuance_status
            FROM vw_operational_freights
            WHERE current_location = p_current_location
              AND updated_at >= p_freights_date
              AND destination_hub <> p_current_hub
          ),
          mocar_metrics AS (
            SELECT
              COALESCE(SUM(volume_m3), 0) AS m3,
              COALESCE(SUM(weight_kg), 0) AS "realWeight"
            FROM filtered_freights
          ),
          issuance_metrics AS (
            SELECT
              COALESCE(COUNT(*) FILTER (WHERE issuance_status = 'Pendente'), 0) AS pendings,
              COALESCE(COUNT(*) FILTER (WHERE issuance_status = 'Emitido'), 0) AS issued,
              COALESCE(COUNT(*) FILTER (WHERE issuance_status = 'Manifestado'), 0) AS manifested
            FROM filtered_freights
          ),
          freights_by_hub AS (
            SELECT
              CASE
                WHEN f.modal = 'Aéreo' THEN concat(COALESCE(f.destination_hub, 'N/A'), ' - AIR')
                ELSE f.destination_hub
              END AS hub_code,
              COALESCE(SUM(f.volume_m3), 0) AS m3,
              COALESCE(SUM(f.weight_kg), 0) AS "realWeight",
              COALESCE(SUM(f.invoice_value), 0) AS "invoiceValue",
              COALESCE(SUM(f.freight_weight), 0) AS "freightWeight"
            FROM filtered_freights f
            GROUP BY hub_code
          ),

          -- ========================================================
          -- 2. MANIFESTS (TRANSFERS)
          -- ========================================================
          filtered_manifests AS (
            SELECT
              id,
              origin_hub,
              code,
              status,
              total_m3,
              total_weight_kg,
              estimated_arrival
            FROM vw_operational_manifests
            WHERE unloading_places @> ARRAY[p_current_filial]
          ),
          manifest_cargo AS (
            SELECT
              m.code AS manifest_code,
              f.id AS freight_id,
              CASE
                WHEN f.modal = 'Aéreo' THEN concat(COALESCE(f.destination_hub, 'N/A'), ' - AIR')
                ELSE COALESCE(f.destination_hub, 'N/A')
              END AS destination_hub,
              f.volume_m3,
              f.weight_kg,
              f.invoice_value,
              f.freight_weight
            FROM filtered_manifests m
            JOIN manifest_freights mf ON mf.manifest_id = m.id
            JOIN freights f ON f.id = mf.freight_id
            WHERE f.is_disabled = false
          ),
          transfers_by_hub AS (
            SELECT
              m.destination_hub AS hub_code,
              COALESCE(SUM(m.volume_m3), 0) AS m3,
              COALESCE(SUM(m.weight_kg), 0) AS "realWeight",
              COALESCE(SUM(m.invoice_value), 0) AS "invoiceValue",
              COALESCE(SUM(m.freight_weight), 0) AS "freightWeight"
            FROM manifest_cargo m
            GROUP BY m.destination_hub
          ),
          manifest_overall_metrics AS (
            SELECT
              COALESCE(SUM(volume_m3), 0) AS m3,
              COALESCE(SUM(weight_kg), 0) AS "realWeight",
              COALESCE(SUM(invoice_value), 0) AS "invoiceValue",
              COALESCE(SUM(freight_weight), 0) AS "freightWeight"
            FROM manifest_cargo
          ),

          -- ========================================================
          -- 3. PICKUPS
          -- ========================================================
          filtered_pickups AS (
            SELECT
              code,
              filial,
              status,
              volume_m3,
              weight_kg,
              invoice_value,
              destination_hub
            FROM vw_operational_pickups
            WHERE filial = p_current_filial
              AND service_date >= p_pickups_date
          ),
          pickups_by_hub AS (
            SELECT
              p.destination_hub AS hub_code,
              COALESCE(SUM(p.volume_m3) FILTER (WHERE p.status = 'Em trânsito'), 0) AS in_transit_m3,
              COALESCE(SUM(p.weight_kg) FILTER (WHERE p.status = 'Em trânsito'), 0) AS in_transit_real_weight,
              COALESCE(SUM(p.invoice_value) FILTER (WHERE p.status = 'Em trânsito'), 0) AS in_transit_invoice_value,
              COALESCE(SUM(p.volume_m3) FILTER (WHERE p.status = 'Coletada'), 0) AS collected_m3,
              COALESCE(SUM(p.weight_kg) FILTER (WHERE p.status = 'Coletada'), 0) AS collected_real_weight,
              COALESCE(SUM(p.invoice_value) FILTER (WHERE p.status = 'Coletada'), 0) AS collected_invoice_value
            FROM filtered_pickups p
            GROUP BY p.destination_hub
          ),
          pickups_overall_metrics AS (
            SELECT
              COALESCE(SUM(volume_m3) FILTER (WHERE status = 'Em trânsito'), 0) AS in_transit_m3,
              COALESCE(SUM(weight_kg) FILTER (WHERE status = 'Em trânsito'), 0) AS in_transit_real_weight,
              COALESCE(SUM(volume_m3) FILTER (WHERE status = 'Coletada'), 0) AS collected_m3,
              COALESCE(SUM(weight_kg) FILTER (WHERE status = 'Coletada'), 0) AS collected_real_weight
            FROM filtered_pickups
          ),

          -- ========================================================
          -- 4. CONSOLIDAÇÃO DOS HUBS
          -- ========================================================
          all_hubs AS (
            SELECT
              h.code,
              h.color,
              jsonb_build_object(
                'm3', COALESCE(fh.m3, 0),
                'realWeight', COALESCE(fh."realWeight", 0),
                'invoiceValue', COALESCE(fh."invoiceValue", 0),
                'freightWeight', COALESCE(fh."freightWeight", 0)
              ) AS "warehouse",
              jsonb_build_object(
                'm3', COALESCE(th.m3, 0),
                'realWeight', COALESCE(th."realWeight", 0),
                'invoiceValue', COALESCE(th."invoiceValue", 0),
                'freightWeight', COALESCE(th."freightWeight", 0)
              ) AS "transfers",
              jsonb_build_object(
                'inTransit', jsonb_build_object(
                  'm3', COALESCE(ph.in_transit_m3, 0),
                  'realWeight', COALESCE(ph.in_transit_real_weight, 0),
                  'invoiceValue', COALESCE(ph.in_transit_invoice_value, 0)
                ),
                'collected', jsonb_build_object(
                  'm3', COALESCE(ph.collected_m3, 0),
                  'realWeight', COALESCE(ph.collected_real_weight, 0),
                  'invoiceValue', COALESCE(ph.collected_invoice_value, 0)
                )
              ) AS "pickups"
            FROM hubs h
            LEFT JOIN freights_by_hub fh ON fh.hub_code = h.code
            LEFT JOIN transfers_by_hub th ON th.hub_code = h.code
            LEFT JOIN pickups_by_hub ph ON ph.hub_code = h.code
            ORDER BY h.code ASC
          )

          -- ========================================================
          -- 5. RESPOSTA FINAL PADRONIZADA
          -- ========================================================
          SELECT
            jsonb_build_object(
              'hubs', COALESCE((
                SELECT jsonb_agg(
                  jsonb_build_object(
                    'code', ah.code,
                    'color', ah.color,
                    'warehouse', ah."warehouse",
                    'transfers', ah."transfers",
                    'pickups', ah."pickups"
                  )
                ) FROM all_hubs ah
              ), '[]'::jsonb),
              'issuances', COALESCE((
                SELECT jsonb_build_object(
                  'pendings', im.pendings,
                  'issued', im.issued,
                  'manifested', im.manifested
                ) FROM issuance_metrics im
              ), '{}'::jsonb),
              'mocar', COALESCE((
                SELECT jsonb_build_object(
                  'm3', mm.m3,
                  'realWeight', mm."realWeight"
                ) FROM mocar_metrics mm
              ), '{}'::jsonb),
              'manifests', jsonb_build_object(
                'totals', COALESCE((
                  SELECT jsonb_build_object(
                    'm3', mom.m3,
                    'realWeight', mom."realWeight",
                    'invoiceValue', mom."invoiceValue",
                    'freightWeight', mom."freightWeight"
                  ) FROM manifest_overall_metrics mom
                ), '{}'::jsonb),
                'manifests', COALESCE((
                  SELECT jsonb_agg(
                    jsonb_build_object(
                      'manifestCode', fm.code,
                      'estimatedArrival', fm.estimated_arrival,
                      'm3', fm.total_m3,
                      'realWeight', fm.total_weight_kg,
                      'originHub', fm.origin_hub
                    )
                  ) FROM filtered_manifests fm
                ), '[]'::jsonb)
              ),
              'pickups', COALESCE((
                SELECT jsonb_build_object(
                  'inTransit', jsonb_build_object(
                    'm3', pom.in_transit_m3,
                    'realWeight', pom.in_transit_real_weight
                  ),
                  'collected', jsonb_build_object(
                    'm3', pom.collected_m3,
                    'realWeight', pom.collected_real_weight
                  )
                ) FROM pickups_overall_metrics pom
              ), '{}'::jsonb)
            )
          INTO v_dashboard;

          RETURN v_dashboard;
        END;
        $$;
