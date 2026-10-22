CREATE OR REPLACE VIEW vw_operational_pickups AS
    SELECT
      code,
      filial,
      status,
      volume_m3,
      weight_kg,
      invoice_value,
      destination_hub
    FROM pickups
    WHERE status IN ('Em trânsito', 'Coletada')
    -- filial = 'SAO GLOBAL CARGO'
    -- service_date >= p_date::timestamptz