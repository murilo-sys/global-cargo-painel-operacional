CREATE OR REPLACE VIEW vw_operational_freights AS
    SELECT
      id,
      destination_hub,
      origin_hub,
      status,
      modal,
      emission_type,
      freight_type,
      current_location,
      cte_number,
      minute_number,
      weight_kg,
      freight_weight,
      volume_m3,
      invoice_value,
      updated_at,
      last_synced_at,
      is_disabled,
      issuance_status
    FROM freights
    WHERE is_disabled = false
      AND status IN ('Pendente', 'Standby', 'Manifestado')
      AND freight_type IN ('CT-e', 'Minuta');
