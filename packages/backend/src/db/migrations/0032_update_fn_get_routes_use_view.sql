CREATE OR REPLACE FUNCTION fn_get_routes(
  p_date TIMESTAMPTZ DEFAULT ((NOW() AT TIME ZONE 'America/Sao_Paulo')::date - INTERVAL '5 days')
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
  v_dashboard JSONB;
BEGIN

WITH routes_base AS (
  SELECT 
    r.name AS name,
    r.id AS id,
    r.vehicle_code AS vehicle,
    t.max_weight_kg AS "maxRealWeight",
    t."max_volume_m³" AS "maxVolumeM3",
    r.hubs AS hubs
  FROM routes r 
  LEFT JOIN vehicle_types t ON r.vehicle_code = t.name
),
filtered_freights AS (
  SELECT
    destination_hub,
    modal,
    volume_m3,
    weight_kg,
    invoice_value,
    minute_number,
    status,
    cte_number,
    freight_weight
  FROM vw_operational_freights
  WHERE current_location = 'GLOBAL AIR CARGO LTDA - SAO'
    AND modal = 'Rodoviário'
    AND updated_at >= p_date::date
)

SELECT
  COALESCE(
    jsonb_agg(
      jsonb_build_object(
        'name', r.name,
        'id', r.id,
        'vehicle', r.vehicle,
        'maxRealWeight', r.maxRealWeight,
        'maxVolumeM3', r.maxVolumeM3,
        'hubs', COALESCE(
          (
            SELECT jsonb_agg(
              jsonb_build_object(
                'code', h.code,
                'color', h.color,
                'totalRealWeight', h.totalRealWeight,
                'totalVolumeM3', h.totalVolumeM3,
                'totalInvoiceValue', h.totalInvoiceValue,
                'totalFreightWeight', h.totalFreightWeight
              )
            )
            FROM (
              SELECT 
                rh AS code,
                hs.color AS color,
                COALESCE(SUM(ff.weight_kg), 0) AS totalRealWeight,
                COALESCE(SUM(ff.volume_m3), 0) AS totalVolumeM3,
                COALESCE(SUM(ff.invoice_value), 0) AS totalInvoiceValue,
                COALESCE(SUM(ff.freight_weight), 0) AS totalFreightWeight
              FROM UNNEST(r.hubs) AS rh
              LEFT JOIN filtered_freights ff ON ff.destination_hub = rh
              INNER JOIN hubs hs ON rh = hs.code 
              GROUP BY rh, hs.color
            ) h
          ),
          '[]'::jsonb
        )
      )
    ),
    '[]'::jsonb
  )
INTO v_dashboard FROM routes_base r;

RETURN v_dashboard;
END;
$$;
