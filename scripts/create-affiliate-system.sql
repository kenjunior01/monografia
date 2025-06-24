-- Sistema completo de afiliados
CREATE TABLE IF NOT EXISTS afiliados (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    codigo_afiliado VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'ativo', 'suspenso', 'inativo')),
    
    -- Dados pessoais
    documento_identidade VARCHAR(50),
    endereco TEXT,
    cidade VARCHAR(100),
    pais VARCHAR(100) DEFAULT 'Moçambique',
    
    -- Dados bancários para pagamento
    banco VARCHAR(100),
    numero_conta VARCHAR(50),
    titular_conta VARCHAR(255),
    tipo_conta VARCHAR(20) CHECK (tipo_conta IN ('corrente', 'poupanca', 'mpesa')),
    
    -- Dados de marketing
    canais_marketing TEXT[], -- ['instagram', 'whatsapp', 'facebook', 'tiktok']
    experiencia_marketing TEXT,
    meta_mensal INTEGER DEFAULT 10,
    como_conheceu VARCHAR(255),
    
    -- Estatísticas
    total_indicacoes INTEGER DEFAULT 0,
    indicacoes_pagas INTEGER DEFAULT 0,
    comissao_total DECIMAL(10,2) DEFAULT 0.00,
    comissao_pendente DECIMAL(10,2) DEFAULT 0.00,
    taxa_conversao DECIMAL(5,2) DEFAULT 0.00,
    
    -- Configurações
    aprovado_por UUID REFERENCES usuarios(id),
    data_aprovacao TIMESTAMP,
    observacoes_admin TEXT,
    
    -- Timestamps
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de indicações/referrals
CREATE TABLE IF NOT EXISTS indicacoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    afiliado_id UUID REFERENCES afiliados(id),
    cliente_id UUID REFERENCES usuarios(id),
    pedido_id UUID REFERENCES pedidos(id),
    
    -- Dados da indicação
    codigo_usado VARCHAR(50) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    
    -- Status e valores
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'convertida', 'paga', 'cancelada')),
    valor_pedido DECIMAL(10,2),
    valor_comissao DECIMAL(10,2) DEFAULT 1000.00, -- Valor fixo de 1000 MT
    
    -- Timestamps importantes
    data_indicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_conversao TIMESTAMP, -- Quando o pedido foi pago
    data_pagamento_comissao TIMESTAMP,
    
    -- Auditoria
    pago_por UUID REFERENCES usuarios(id),
    observacoes TEXT
);

-- Tabela de pagamentos de comissões
CREATE TABLE IF NOT EXISTS pagamentos_comissoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    afiliado_id UUID REFERENCES afiliados(id),
    
    -- Dados do pagamento
    valor_total DECIMAL(10,2) NOT NULL,
    quantidade_indicacoes INTEGER NOT NULL,
    metodo_pagamento VARCHAR(50) NOT NULL CHECK (metodo_pagamento IN ('transferencia', 'mpesa', 'deposito')),
    
    -- Detalhes do pagamento
    referencia_pagamento VARCHAR(255),
    comprovante_url TEXT,
    dados_pagamento JSONB, -- Dados específicos do método (conta, número, etc.)
    
    -- Status
    status VARCHAR(20) DEFAULT 'processando' CHECK (status IN ('processando', 'pago', 'falhado', 'cancelado')),
    
    -- Auditoria
    processado_por UUID REFERENCES usuarios(id),
    data_processamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_pagamento TIMESTAMP,
    observacoes TEXT
);

-- Tabela de materiais de marketing para afiliados
CREATE TABLE IF NOT EXISTS materiais_marketing (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('banner', 'post', 'story', 'video', 'texto', 'email')),
    formato VARCHAR(50), -- '1080x1080', 'MP4', 'TXT', etc.
    
    -- Arquivo
    arquivo_url TEXT,
    arquivo_tamanho INTEGER, -- em bytes
    conteudo_texto TEXT, -- Para materiais de texto
    
    -- Configurações
    ativo BOOLEAN DEFAULT true,
    ordem INTEGER DEFAULT 0,
    downloads INTEGER DEFAULT 0,
    
    -- Timestamps
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de configurações do sistema de afiliados
CREATE TABLE IF NOT EXISTS configuracoes_afiliados (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    chave VARCHAR(100) UNIQUE NOT NULL,
    valor TEXT NOT NULL,
    tipo VARCHAR(20) DEFAULT 'string' CHECK (tipo IN ('string', 'number', 'boolean', 'json')),
    descricao TEXT,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir configurações padrão
INSERT INTO configuracoes_afiliados (chave, valor, tipo, descricao) VALUES
('comissao_por_indicacao', '1000', 'number', 'Valor em MT pago por cada indicação convertida'),
('aprovacao_automatica', 'false', 'boolean', 'Se true, afiliados são aprovados automaticamente'),
('prazo_pagamento_horas', '48', 'number', 'Prazo em horas para pagamento de comissões'),
('meta_mensal_padrao', '10', 'number', 'Meta mensal padrão para novos afiliados'),
('taxa_conversao_minima', '5', 'number', 'Taxa de conversão mínima esperada (%)'),
('link_base_afiliado', 'https://monografiaplus.com/novo-pedido?ref=', 'string', 'URL base para links de afiliados')
ON CONFLICT (chave) DO NOTHING;

-- Função para gerar código de afiliado único
CREATE OR REPLACE FUNCTION gerar_codigo_afiliado(nome_afiliado TEXT)
RETURNS TEXT AS $$
DECLARE
    codigo TEXT;
    contador INTEGER := 0;
    ano_atual TEXT := EXTRACT(YEAR FROM CURRENT_DATE)::TEXT;
BEGIN
    -- Gerar código base: AFIL-PRIMEIRNOME-ANO
    codigo := 'AFIL-' || UPPER(SPLIT_PART(nome_afiliado, ' ', 1)) || '-' || ano_atual;
    
    -- Verificar se já existe e adicionar número se necessário
    WHILE EXISTS (SELECT 1 FROM afiliados WHERE codigo_afiliado = codigo) LOOP
        contador := contador + 1;
        codigo := 'AFIL-' || UPPER(SPLIT_PART(nome_afiliado, ' ', 1)) || '-' || ano_atual || '-' || contador::TEXT;
    END LOOP;
    
    RETURN codigo;
END;
$$ LANGUAGE plpgsql;

-- Trigger para gerar código automaticamente
CREATE OR REPLACE FUNCTION trigger_gerar_codigo_afiliado()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.codigo_afiliado IS NULL OR NEW.codigo_afiliado = '' THEN
        NEW.codigo_afiliado := gerar_codigo_afiliado(NEW.nome);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_afiliados_codigo
    BEFORE INSERT ON afiliados
    FOR EACH ROW
    EXECUTE FUNCTION trigger_gerar_codigo_afiliado();

-- Trigger para atualizar estatísticas do afiliado
CREATE OR REPLACE FUNCTION atualizar_estatisticas_afiliado()
RETURNS TRIGGER AS $$
BEGIN
    -- Atualizar estatísticas quando indicação muda de status
    IF TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN
        UPDATE afiliados SET
            total_indicacoes = (
                SELECT COUNT(*) FROM indicacoes 
                WHERE afiliado_id = NEW.afiliado_id
            ),
            indicacoes_pagas = (
                SELECT COUNT(*) FROM indicacoes 
                WHERE afiliado_id = NEW.afiliado_id AND status = 'paga'
            ),
            comissao_total = (
                SELECT COALESCE(SUM(valor_comissao), 0) FROM indicacoes 
                WHERE afiliado_id = NEW.afiliado_id AND status = 'paga'
            ),
            comissao_pendente = (
                SELECT COALESCE(SUM(valor_comissao), 0) FROM indicacoes 
                WHERE afiliado_id = NEW.afiliado_id AND status = 'convertida'
            ),
            taxa_conversao = (
                CASE 
                    WHEN (SELECT COUNT(*) FROM indicacoes WHERE afiliado_id = NEW.afiliado_id) > 0
                    THEN (
                        SELECT COUNT(*) * 100.0 / (SELECT COUNT(*) FROM indicacoes WHERE afiliado_id = NEW.afiliado_id)
                        FROM indicacoes 
                        WHERE afiliado_id = NEW.afiliado_id AND status IN ('convertida', 'paga')
                    )
                    ELSE 0
                END
            ),
            data_atualizacao = CURRENT_TIMESTAMP
        WHERE id = NEW.afiliado_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_atualizar_estatisticas_afiliado
    AFTER UPDATE ON indicacoes
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_estatisticas_afiliado();

-- Trigger para registrar indicação quando pedido é criado com código de afiliado
CREATE OR REPLACE FUNCTION registrar_indicacao_pedido()
RETURNS TRIGGER AS $$
DECLARE
    afiliado_record RECORD;
BEGIN
    -- Se o pedido tem código de afiliado, registrar indicação
    IF NEW.codigo_afiliado IS NOT NULL AND NEW.codigo_afiliado != '' THEN
        -- Buscar afiliado pelo código
        SELECT * INTO afiliado_record 
        FROM afiliados 
        WHERE codigo_afiliado = NEW.codigo_afiliado AND status = 'ativo';
        
        IF FOUND THEN
            -- Registrar indicação
            INSERT INTO indicacoes (
                afiliado_id,
                cliente_id,
                pedido_id,
                codigo_usado,
                status,
                valor_pedido,
                valor_comissao
            ) VALUES (
                afiliado_record.id,
                NEW.cliente_id,
                NEW.id,
                NEW.codigo_afiliado,
                'pendente',
                NEW.valor_total,
                1000.00
            );
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_registrar_indicacao_pedido
    AFTER INSERT ON pedidos
    FOR EACH ROW
    EXECUTE FUNCTION registrar_indicacao_pedido();

-- Função para converter indicação quando pedido é pago
CREATE OR REPLACE FUNCTION converter_indicacao_pedido()
RETURNS TRIGGER AS $$
BEGIN
    -- Quando pedido muda para 'pago', converter indicação
    IF TG_OP = 'UPDATE' AND OLD.status != 'pago' AND NEW.status = 'pago' THEN
        UPDATE indicacoes SET
            status = 'convertida',
            data_conversao = CURRENT_TIMESTAMP
        WHERE pedido_id = NEW.id AND status = 'pendente';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_converter_indicacao_pedido
    AFTER UPDATE ON pedidos
    FOR EACH ROW
    EXECUTE FUNCTION converter_indicacao_pedido();

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_afiliados_codigo ON afiliados(codigo_afiliado);
CREATE INDEX IF NOT EXISTS idx_afiliados_status ON afiliados(status);
CREATE INDEX IF NOT EXISTS idx_afiliados_email ON afiliados(email);

CREATE INDEX IF NOT EXISTS idx_indicacoes_afiliado ON indicacoes(afiliado_id);
CREATE INDEX IF NOT EXISTS idx_indicacoes_cliente ON indicacoes(cliente_id);
CREATE INDEX IF NOT EXISTS idx_indicacoes_pedido ON indicacoes(pedido_id);
CREATE INDEX IF NOT EXISTS idx_indicacoes_status ON indicacoes(status);
CREATE INDEX IF NOT EXISTS idx_indicacoes_codigo ON indicacoes(codigo_usado);

CREATE INDEX IF NOT EXISTS idx_pagamentos_comissoes_afiliado ON pagamentos_comissoes(afiliado_id);
CREATE INDEX IF NOT EXISTS idx_pagamentos_comissoes_status ON pagamentos_comissoes(status);

CREATE INDEX IF NOT EXISTS idx_materiais_marketing_tipo ON materiais_marketing(tipo);
CREATE INDEX IF NOT EXISTS idx_materiais_marketing_ativo ON materiais_marketing(ativo);

-- Adicionar coluna codigo_afiliado na tabela pedidos se não existir
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS codigo_afiliado VARCHAR(50);
CREATE INDEX IF NOT EXISTS idx_pedidos_codigo_afiliado ON pedidos(codigo_afiliado);
