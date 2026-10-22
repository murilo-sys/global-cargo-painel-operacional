CREATE OR REPLACE VIEW vw_operational_manifests AS
    SELECT
      id,
      origin_hub,
      code,
      status,
      total_m3,
      total_weight_kg,
      estimated_arrival,
      unloading_places
    FROM manifests
    WHERE status = 'Em trânsito';

CREATE OR REPLACE VIEW vw_operational_pickups AS
    SELECT
      code,
      filial,
      status,
      volume_m3,
      weight_kg,
      invoice_value,
      destination_hub,
      service_date
    FROM pickups
    WHERE status IN ('Em trânsito', 'Coletada');
