-- 1. Cria a coluna que o próprio Postgres calcula e SALVA NO DISCO
    ALTER TABLE freights
    ADD COLUMN issuance_status TEXT GENERATED ALWAYS AS (
      CASE
        WHEN status = 'Manifestado' THEN 'Manifestado'
        WHEN cte_number IS NOT NULL AND status IN ('Pendente', 'Standby') THEN 'Emitido'
        WHEN cte_number IS NULL AND minute_number IS NULL AND status IN ('Pendente', 'Standby') THEN 'Pendente'
        ELSE 'Outro'
      END
    ) STORED;

    -- 2. Cria um índice nela (A busca vira instantânea em 1 milhão de linhas!)
    CREATE INDEX idx_freights_issuance_status ON freights (issuance_status);