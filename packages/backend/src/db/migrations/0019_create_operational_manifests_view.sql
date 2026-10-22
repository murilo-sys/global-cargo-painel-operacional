CREATE OR REPLACE VIEW vw_operational_manifests AS
    SELECT
      id,
      origin_hub,
      code,
      status,
      total_m3,
      total_weight_kg,
      estimated_arrival
    FROM manifests
    WHERE status = 'Em trânsito'
    -- unloading_places @> ARRAY['SAO GLOBAL CARGO']