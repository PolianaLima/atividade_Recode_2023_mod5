
/*Inserindo dados na tabela de Aeroportos*/
INSERT INTO `bd_agencia`.`aeroporto` (`cidade`, `codigo`, `estado`, `nome`, `sigla`) VALUES 
('São Paulo', 'GRU', 'SP', 'Aeroporto Internacional de Guarulhos', 'GRU'),
('Rio de Janeiro', 'GIG', 'RJ', 'Aeroporto Internacional do Rio de Janeiro/Galeão', 'GIG'),
('Brasília', 'BSB', 'DF', 'Aeroporto Internacional de Brasília', 'BSB'),
('Salvador', 'SSA', 'BA', 'Aeroporto Internacional de Salvador', 'SSA'),
('Fortaleza', 'FOR', 'CE', 'Aeroporto Internacional de Fortaleza', 'FOR'),
('Recife', 'REC', 'PE', 'Aeroporto Internacional do Recife/Guararapes', 'REC'),
('Belém', 'BEL', 'PA', 'Aeroporto Internacional de Belém/Val de Cans', 'BEL'),
('Manaus', 'MAO', 'AM', 'Aeroporto Internacional Eduardo Gomes', 'MAO'),
('Porto Alegre', 'POA', 'RS', 'Aeroporto Internacional Salgado Filho', 'POA'),
('Curitiba', 'CWB', 'PR', 'Aeroporto Internacional Afonso Pena', 'CWB');

/*Inserindo dados na tabela de Empresa aereas*/
INSERT INTO `bd_agencia`.`empresaaerea` (`cnpj`, `nome`) VALUES 
('12345678901234', 'Latam Airlines'),
('98765432109876', 'Gol Linhas Aéreas'),
('34567890123456', 'Azul Linhas Aéreas'),
('78901234567890', 'Avianca Brasil'),
('23456789012345', 'Emirates'),
('89012345678901', 'American Airlines'),
('45678901234567', 'British Airways'),
('56789012345678', 'Air France'),
('67890123456789', 'Lufthansa'),
('90123456789012', 'Qatar Airways');

/*INSERINDO DADOS DE VOOS*/

INSERT INTO `bd_agencia`.`voos` (`data_partida`, `desconto`, `duracao`, `hora_partida`, `numero`, `preco`, `total_assentos`, `id_aeroporto_chegada`, `id_aeroporto_partida`, `id_empresa`) VALUES 
('2023-01-15', 0.1, '3:30', '08:00', '1566', 350.00, 150, 1, 2, 1),
('2023-02-20', 0.05, '2:45', '15:30', '1567', 280.00, 120, 3, 4, 2),
('2023-03-10', 0.15, '4:15', '12:45', '1568', 420.00, 180, 5, 6, 3),
('2023-04-05', 0.12, '2:15', '18:20', '1569', 300.00, 130, 7, 8, 4),
('2023-05-12', 0.08, '3:00', '09:10', '1570', 380.00, 160, 9, 10, 5),
('2023-06-18', 0.2, '5:30', '14:55', '1571', 500.00, 200, 1, 3, 6),
('2023-07-25', 0.18, '4:45', '11:30', '1572', 450.00, 190, 5, 7, 7),
('2023-08-30', 0.07, '2:30', '17:15', '1573', 320.00, 140, 9, 2, 8),
('2023-09-08', 0.1, '3:15', '07:45', '1574', 370.00, 170, 4, 8, 9),
('2023-10-14', 0.15, '4:00', '13:20', '1575', 400.00, 180, 6, 1, 10);

