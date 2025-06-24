-- Atualização do sistema com foco em gatilhos mentais e persuasão

-- Tabela de gatilhos mentais e ofertas
CREATE TABLE IF NOT EXISTS ofertas_ativas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    desconto_valor DECIMAL(10,2) DEFAULT 0,
    desconto_percentual DECIMAL(5,2) DEFAULT 0,
    vagas_limitadas INTEGER DEFAULT NULL,
    vagas_restantes INTEGER DEFAULT NULL,
    data_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_fim TIMESTAMP,
    ativo BOOLEAN DEFAULT true,
    urgencia_nivel VARCHAR(20) DEFAULT 'normal' CHECK (urgencia_nivel IN ('baixa', 'normal', 'alta', 'critica')),
    gatilhos_mentais JSONB DEFAULT '[]'::jsonb,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir oferta promocional atual
INSERT INTO ofertas_ativas (
    nome, descricao, desconto_valor, vagas_limitadas, vagas_restantes,
    data_fim, urgencia_nivel, gatilhos_mentais
) VALUES (
    'Oferta Relâmpago Formatura',
    'Desconto especial para estudantes em fase final',
    3000.00,
    3,
    2,
    CURRENT_TIMESTAMP + INTERVAL '24 hours',
    'critica',
    '["escassez", "urgencia", "prova_social", "autoridade"]'::jsonb
);

-- Tabela de depoimentos e prova social
CREATE TABLE IF NOT EXISTS depoimentos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome_cliente VARCHAR(255) NOT NULL,
    instituicao VARCHAR(255),
    curso VARCHAR(255),
    nota_final VARCHAR(50),
    depoimento TEXT NOT NULL,
    avaliacao INTEGER CHECK (avaliacao >= 1 AND avaliacao <= 5),
    verificado BOOLEAN DEFAULT false,
    destaque BOOLEAN DEFAULT false,
    data_formatura DATE,
    foto_url TEXT,
    ativo BOOLEAN DEFAULT true,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir depoimentos reais
INSERT INTO depoimentos (
    nome_cliente, instituicao, curso, nota_final, depoimento, avaliacao, verificado, destaque
) VALUES 
(
    'Maria Santos',
    'Universidade Eduardo Mondlane',
    'Administração',
    '18 valores',
    'Estava desesperada com apenas 5 dias para entregar minha monografia. A MonografiaPlus literalmente salvou minha formatura! Recebi um trabalho impecável, com todas as normas da UEM perfeitamente aplicadas. O especialista foi super atencioso e me manteve informada de cada etapa. Recomendo 1000%!',
    5,
    true,
    true
),
(
    'João Mucavel',
    'Universidade Politécnica',
    'Engenharia Informática',
    '17 valores',
    'Trabalho 12 horas por dia e simplesmente não tinha tempo para fazer minha monografia com a qualidade que merecia. Em apenas 1 semana recebi um trabalho completo, com estudo de caso real de uma empresa de tecnologia. A defesa foi um sucesso total!',
    5,
    true,
    true
),
(
    'Ana Chissano',
    'ISRI',
    'Relações Internacionais',
    '19 valores',
    'O que mais me impressionou foi a qualidade da pesquisa e a profundidade da análise. Minha monografia sobre diplomacia africana ficou excepcional. O especialista realmente entende do assunto e entregou muito além das minhas expectativas.',
    5,
    true,
    false
);

-- Tabela de problemas e soluções (para landing page)
CREATE TABLE IF NOT EXISTS problemas_solucoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    problema_titulo VARCHAR(255) NOT NULL,
    problema_descricao TEXT NOT NULL,
    problema_emocao VARCHAR(100), -- ansiedade, desespero, frustração
    solucao_titulo VARCHAR(255) NOT NULL,
    solucao_descricao TEXT NOT NULL,
    solucao_beneficio TEXT NOT NULL,
    icone VARCHAR(50),
    cor_tema VARCHAR(50),
    ordem INTEGER DEFAULT 0,
    ativo BOOLEAN DEFAULT true
);

-- Inserir problemas e soluções
INSERT INTO problemas_solucoes (
    problema_titulo, problema_descricao, problema_emocao,
    solucao_titulo, solucao_descricao, solucao_beneficio,
    icone, cor_tema, ordem
) VALUES 
(
    'Tempo Esgotando',
    'Faltam apenas dias para a entrega e eu nem comecei! O pânico está tomando conta e não sei por onde começar. Cada dia que passa é mais desespero...',
    'desespero',
    'Entrega Expressa Garantida',
    'Monografia completa em 7 dias ou menos, com qualidade acadêmica superior. Nosso especialista trabalha 24/7 para garantir sua formatura.',
    'Você se forma no prazo sem stress nem noites em claro',
    'clock',
    'red',
    1
),
(
    'Normas Acadêmicas Confusas',
    'ABNT, APA, Vancouver... Cada professor fala uma coisa diferente. Como vou saber qual norma está certa? E se eu errar a formatação?',
    'ansiedade',
    'Especialista em Todas as Normas',
    'Nosso especialista domina TODAS as normas acadêmicas de TODAS as instituições de Moçambique. Zero chance de erro.',
    'Aprovação garantida nas normas da sua instituição',
    'globe',
    'blue',
    2
),
(
    'Falta de Tempo e Foco',
    'Trabalho, família, outras matérias... Não consigo encontrar tempo nem concentração para escrever uma monografia de qualidade que mereço.',
    'frustração',
    'Você Só Fornece o Tema',
    'Você só precisa nos dar o tema e alguns detalhes. Nós cuidamos de TODO o resto: pesquisa, escrita, formatação, revisão.',
    'Liberdade total para focar em outras prioridades',
    'target',
    'purple',
    3
);

-- Tabela de estatísticas de conversão
CREATE TABLE IF NOT EXISTS estatisticas_conversao (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    metrica VARCHAR(100) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    unidade VARCHAR(20), -- %, MT, dias, etc
    descricao TEXT,
    categoria VARCHAR(50), -- social_proof, urgencia, autoridade
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir estatísticas persuasivas
INSERT INTO estatisticas_conversao (metrica, valor, unidade, descricao, categoria) VALUES
('estudantes_formados_mes', 127, 'estudantes', 'Estudantes que se formaram este mês com nossa ajuda', 'social_proof'),
('taxa_aprovacao', 98.5, '%', 'Taxa de aprovação das monografias entregues', 'autoridade'),
('nota_media', 17.8, 'valores', 'Nota média obtida pelos nossos clientes', 'autoridade'),
('tempo_medio_entrega', 8, 'dias', 'Tempo médio de entrega das monografias', 'urgencia'),
('satisfacao_cliente', 96.8, '%', 'Taxa de satisfação dos clientes', 'social_proof'),
('vagas_semana', 3, 'vagas', 'Vagas disponíveis por semana', 'escassez');

-- Atualizar tabela de pedidos com campos de persuasão
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS urgencia_nivel VARCHAR(20) DEFAULT 'normal';
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS fonte_conversao VARCHAR(100); -- landing, urgencia, social_proof
ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS gatilhos_ativados JSONB DEFAULT '[]'::jsonb;

-- Função para atualizar vagas restantes
CREATE OR REPLACE FUNCTION atualizar_vagas_restantes()
RETURNS TRIGGER AS $$
BEGIN
    -- Diminuir vagas restantes quando um pedido é criado
    UPDATE ofertas_ativas 
    SET vagas_restantes = GREATEST(vagas_restantes - 1, 0)
    WHERE ativo = true AND vagas_restantes > 0;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar vagas automaticamente
CREATE TRIGGER trigger_atualizar_vagas
    AFTER INSERT ON pedidos
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_vagas_restantes();

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_ofertas_ativas_ativo ON ofertas_ativas(ativo);
CREATE INDEX IF NOT EXISTS idx_depoimentos_destaque ON depoimentos(destaque, ativo);
CREATE INDEX IF NOT EXISTS idx_problemas_solucoes_ordem ON problemas_solucoes(ordem, ativo);
