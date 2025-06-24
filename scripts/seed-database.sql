-- Dados iniciais para a plataforma MonografiaPlus

-- Inserir usuários de exemplo
INSERT INTO usuarios (nome, email, telefone, senha_hash, tipo_usuario) VALUES
('João Silva', 'joao@email.com', '(11) 99999-0001', '$2b$10$example_hash_1', 'cliente'),
('Maria Santos', 'maria@email.com', '(11) 99999-0002', '$2b$10$example_hash_2', 'cliente'),
('Dr. Ana Costa', 'ana.costa@monografiaplus.com', '(11) 99999-0003', '$2b$10$example_hash_3', 'escritor'),
('Prof. Carlos Lima', 'carlos.lima@monografiaplus.com', '(11) 99999-0004', '$2b$10$example_hash_4', 'escritor'),
('Admin Sistema', 'admin@monografiaplus.com', '(11) 99999-0000', '$2b$10$example_hash_admin', 'admin');

-- Inserir pedidos de exemplo
INSERT INTO pedidos (
    numero_pedido, cliente_id, escritor_id, pais, instituicao, nivel_academico, 
    area_estudo, tema, numero_paginas, prazo_dias, estilo_citacao, 
    precisa_estudo_caso, nome_empresa, setor_empresa, valor_total, 
    status, progresso, data_prazo
) VALUES
(
    'MON-001', 
    (SELECT id FROM usuarios WHERE email = 'joao@email.com'),
    (SELECT id FROM usuarios WHERE email = 'ana.costa@monografiaplus.com'),
    'Brasil', 'Universidade de São Paulo', 'graduacao', 'administracao',
    'Gestão de Recursos Humanos em Startups', 50, 15, 'ABNT',
    true, 'TechStart Ltda', 'Tecnologia', 750.00,
    'em-andamento', 65, CURRENT_DATE + INTERVAL '10 days'
),
(
    'MON-002',
    (SELECT id FROM usuarios WHERE email = 'maria@email.com'),
    (SELECT id FROM usuarios WHERE email = 'carlos.lima@monografiaplus.com'),
    'Brasil', 'PUC-SP', 'pos-graduacao', 'administracao',
    'Sustentabilidade no Setor Bancário', 60, 20, 'ABNT',
    true, 'Banco Exemplo S.A.', 'Financeiro', 900.00,
    'concluido', 100, CURRENT_DATE - INTERVAL '5 days'
);

-- Inserir mensagens de exemplo
INSERT INTO mensagens (pedido_id, remetente_id, destinatario_id, conteudo) VALUES
(
    (SELECT id FROM pedidos WHERE numero_pedido = 'MON-001'),
    (SELECT id FROM usuarios WHERE email = 'ana.costa@monografiaplus.com'),
    (SELECT id FROM usuarios WHERE email = 'joao@email.com'),
    'Olá João! Acabei de finalizar o primeiro capítulo da sua monografia. Gostaria de revisar antes de prosseguir?'
),
(
    (SELECT id FROM pedidos WHERE numero_pedido = 'MON-001'),
    (SELECT id FROM usuarios WHERE email = 'joao@email.com'),
    (SELECT id FROM usuarios WHERE email = 'ana.costa@monografiaplus.com'),
    'Oi Dra. Ana! Obrigado pelo update. Vou revisar hoje à noite e te dou um retorno amanhã.'
);

-- Inserir avaliações de exemplo
INSERT INTO avaliacoes (pedido_id, cliente_id, escritor_id, nota, comentario) VALUES
(
    (SELECT id FROM pedidos WHERE numero_pedido = 'MON-002'),
    (SELECT id FROM usuarios WHERE email = 'maria@email.com'),
    (SELECT id FROM usuarios WHERE email = 'carlos.lima@monografiaplus.com'),
    5,
    'Excelente trabalho! O Prof. Carlos entregou uma monografia de altíssima qualidade, dentro do prazo e com todas as especificações solicitadas. Recomendo!'
);
