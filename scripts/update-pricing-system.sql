-- Atualização do sistema de preços para suportar cálculo dinâmico

-- Adicionar colunas para detalhamento de preços
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS preco_base DECIMAL(10,2) DEFAULT 10000.00;
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS custo_paginas_adicionais DECIMAL(10,2) DEFAULT 0.00;
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS custo_urgencia DECIMAL(10,2) DEFAULT 0.00;
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS custo_estudo_caso DECIMAL(10,2) DEFAULT 0.00;
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS custo_revisoes_premium DECIMAL(10,2) DEFAULT 0.00;
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS custo_suporte_urgente DECIMAL(10,2) DEFAULT 0.00;

-- Adicionar campos para serviços adicionais
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS revisoes_premium BOOLEAN DEFAULT false;
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS suporte_urgente BOOLEAN DEFAULT false;

-- Tabela de configuração de preços
CREATE TABLE IF NOT EXISTS configuracao_precos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    preco_base DECIMAL(10,2) NOT NULL DEFAULT 10000.00,
    paginas_incluidas INTEGER NOT NULL DEFAULT 40,
    preco_por_pagina_adicional DECIMAL(10,2) NOT NULL DEFAULT 200.00,
    multiplicador_urgencia DECIMAL(3,2) NOT NULL DEFAULT 1.50,
    multiplicador_estudo_caso DECIMAL(3,2) NOT NULL DEFAULT 1.30,
    multiplicador_revisoes DECIMAL(3,2) NOT NULL DEFAULT 0.20,
    custo_suporte_urgente DECIMAL(10,2) NOT NULL DEFAULT 2000.00,
    dias_urgencia_limite INTEGER NOT NULL DEFAULT 10,
    ativo BOOLEAN DEFAULT true,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir configuração padrão
INSERT INTO configuracao_precos (
    preco_base, paginas_incluidas, preco_por_pagina_adicional,
    multiplicador_urgencia, multiplicador_estudo_caso, multiplicador_revisoes,
    custo_suporte_urgente, dias_urgencia_limite
) VALUES (
    10000.00, 40, 200.00, 1.50, 1.30, 0.20, 2000.00, 10
) ON CONFLICT DO NOTHING;

-- Tabela de histórico de pagamentos offline
CREATE TABLE IF NOT EXISTS pagamentos_offline (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pedido_id UUID REFERENCES pedidos(id),
    metodo_pagamento VARCHAR(50) NOT NULL CHECK (metodo_pagamento IN ('transferencia', 'mpesa', 'deposito')),
    valor DECIMAL(10,2) NOT NULL,
    referencia_pagamento VARCHAR(255),
    comprovante_url TEXT,
    status VARCHAR(20) DEFAULT 'aguardando' CHECK (status IN ('aguardando', 'confirmado', 'rejeitado')),
    observacoes TEXT,
    data_pagamento TIMESTAMP,
    data_confirmacao TIMESTAMP,
    confirmado_por UUID REFERENCES usuarios(id),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de instruções de pagamento
CREATE TABLE IF NOT EXISTS instrucoes_pagamento (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    metodo VARCHAR(50) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    instrucoes TEXT NOT NULL,
    dados_conta JSONB,
    ativo BOOLEAN DEFAULT true,
    ordem INTEGER DEFAULT 0,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir instruções de pagamento padrão
INSERT INTO instrucoes_pagamento (metodo, titulo, instrucoes, dados_conta, ordem) VALUES
(
    'transferencia',
    'Transferência Bancária',
    'Faça a transferência para a conta abaixo e envie o comprovante:',
    '{"banco": "Banco Comercial e de Investimentos", "conta": "123456789", "titular": "MonografiaPlus Lda", "iban": "MZ59000000000000123456789"}',
    1
),
(
    'mpesa',
    'M-Pesa',
    'Envie o valor via M-Pesa para o número abaixo:',
    '{"numero": "84 123 4567", "nome": "MonografiaPlus"}',
    2
),
(
    'deposito',
    'Depósito Bancário',
    'Faça o depósito em qualquer agência do banco:',
    '{"banco": "Banco Comercial e de Investimentos", "conta": "123456789", "titular": "MonografiaPlus Lda"}',
    3
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_pagamentos_offline_pedido ON pagamentos_offline(pedido_id);
CREATE INDEX IF NOT EXISTS idx_pagamentos_offline_status ON pagamentos_offline(status);
CREATE INDEX IF NOT EXISTS idx_configuracao_precos_ativo ON configuracao_precos(ativo);

-- Trigger para atualizar data_atualizacao na configuração de preços
CREATE TRIGGER trigger_configuracao_precos_update
    BEFORE UPDATE ON configuracao_precos
    FOR EACH ROW
    EXECUTE FUNCTION update_data_atualizacao();
