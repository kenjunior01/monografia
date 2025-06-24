-- Criação das tabelas principais da plataforma MonografiaPlus

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    senha_hash VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(20) DEFAULT 'cliente' CHECK (tipo_usuario IN ('cliente', 'escritor', 'admin')),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT true
);

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    numero_pedido VARCHAR(20) UNIQUE NOT NULL,
    cliente_id UUID REFERENCES usuarios(id),
    escritor_id UUID REFERENCES usuarios(id),
    
    -- Informações básicas
    pais VARCHAR(100) NOT NULL,
    instituicao VARCHAR(255) NOT NULL,
    nivel_academico VARCHAR(50) NOT NULL,
    area_estudo VARCHAR(100) NOT NULL,
    tema TEXT,
    
    -- Especificações técnicas
    numero_paginas INTEGER NOT NULL,
    prazo_dias INTEGER NOT NULL,
    estilo_citacao VARCHAR(50) NOT NULL,
    descricao TEXT,
    
    -- Estudo de caso
    precisa_estudo_caso BOOLEAN DEFAULT false,
    nome_empresa VARCHAR(255),
    setor_empresa VARCHAR(100),
    detalhes_empresa TEXT,
    
    -- Financeiro
    valor_total DECIMAL(10,2) NOT NULL,
    status_pagamento VARCHAR(20) DEFAULT 'pendente' CHECK (status_pagamento IN ('pendente', 'pago', 'cancelado')),
    
    -- Status do pedido
    status VARCHAR(20) DEFAULT 'novo' CHECK (status IN ('novo', 'em-andamento', 'revisao', 'concluido', 'cancelado')),
    progresso INTEGER DEFAULT 0,
    
    -- Datas
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_prazo DATE NOT NULL,
    data_conclusao TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de arquivos
CREATE TABLE IF NOT EXISTS arquivos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pedido_id UUID REFERENCES pedidos(id),
    nome_arquivo VARCHAR(255) NOT NULL,
    tipo_arquivo VARCHAR(10) NOT NULL,
    tamanho_bytes BIGINT NOT NULL,
    url_arquivo TEXT NOT NULL,
    tipo_conteudo VARCHAR(20) CHECK (tipo_conteudo IN ('material-apoio', 'monografia-final', 'rascunho')),
    data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de mensagens/chat
CREATE TABLE IF NOT EXISTS mensagens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pedido_id UUID REFERENCES pedidos(id),
    remetente_id UUID REFERENCES usuarios(id),
    destinatario_id UUID REFERENCES usuarios(id),
    conteudo TEXT NOT NULL,
    tipo_mensagem VARCHAR(20) DEFAULT 'texto' CHECK (tipo_mensagem IN ('texto', 'arquivo', 'sistema')),
    lida BOOLEAN DEFAULT false,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de pagamentos
CREATE TABLE IF NOT EXISTS pagamentos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pedido_id UUID REFERENCES pedidos(id),
    valor DECIMAL(10,2) NOT NULL,
    metodo_pagamento VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'processando', 'aprovado', 'rejeitado')),
    transaction_id VARCHAR(255),
    data_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de avaliações
CREATE TABLE IF NOT EXISTS avaliacoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pedido_id UUID REFERENCES pedidos(id),
    cliente_id UUID REFERENCES usuarios(id),
    escritor_id UUID REFERENCES usuarios(id),
    nota INTEGER CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT,
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de notificações
CREATE TABLE IF NOT EXISTS notificacoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID REFERENCES usuarios(id),
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    lida BOOLEAN DEFAULT false,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_pedidos_cliente ON pedidos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_escritor ON pedidos(escritor_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_status ON pedidos(status);
CREATE INDEX IF NOT EXISTS idx_mensagens_pedido ON mensagens(pedido_id);
CREATE INDEX IF NOT EXISTS idx_arquivos_pedido ON arquivos(pedido_id);
CREATE INDEX IF NOT EXISTS idx_notificacoes_usuario ON notificacoes(usuario_id);

-- Triggers para atualizar data_atualizacao
CREATE OR REPLACE FUNCTION update_data_atualizacao()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_usuarios_update
    BEFORE UPDATE ON usuarios
    FOR EACH ROW
    EXECUTE FUNCTION update_data_atualizacao();

CREATE TRIGGER trigger_pedidos_update
    BEFORE UPDATE ON pedidos
    FOR EACH ROW
    EXECUTE FUNCTION update_data_atualizacao();
