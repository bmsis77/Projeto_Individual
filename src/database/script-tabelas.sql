CREATE DATABASE if not exists Coracao_Verde_Branco;
USE Coracao_Verde_Branco;
CREATE TABLE if not exists Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    email VARCHAR(45),
    telefone CHAR(11),
    senha VARCHAR(45),
    jogadorFavorito VARCHAR(45)
);
CREATE TABLE if not exists Quiz (
    idPergunta int primary key,
    pergunta varchar(255),
    respCorreta varchar(45)
);
CREATE TABLE Usuario_Quiz (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_idUsuario INT,
    pergunta TEXT,
    respUsuario VARCHAR(100),
    pontuacao INT,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_idUsuario) REFERENCES Usuario(idUsuario)
);

INSERT INTO Quiz (idPergunta, pergunta, respCorreta) VALUES
(1, 'Qual era o nome original do clube?', 'alternativaB'),
(2, 'Qual a data de fundação do Palmeiras?', 'alternativaA'),
(3, 'Qual o nome da principal torcida organizada do Palmeiras?', 'alternativaC'),
(4, 'Qual foi o ano do primeiro título da Libertadores conquistado pelo Palmeiras?', 'alternativaA'),
(5, 'Qual foi a campanha histórica do Palmeiras que ficou conhecida como ''Arrancada Heroica''?', 'alternativaD'),
(6, 'Como é chamado o clássico confronto entre Palmeiras e Santos?', 'alternativaB'),
(7, 'Qual jogador é o maior artilheiro da história do Palmeiras?', 'alternativaA'),
(8, 'Qual jogador fez o ''gol decisivo'' na libertadores 2020?', 'alternativaD'),
(9, 'Qual foi a frase dita após não deixarem o nome continuar Palestra Itália?', 'alternativaB'),
(10, 'Qual foi o primeiro mascote oficial do Palmeiras?', 'alternativaD'),
(11, 'O Palmeiras foi o único clube na história a representar a Seleção Brasileira, cedendo tanto o elenco quanto a comissão técnica, contra que país foi o jogo, e quanto foi?', 'alternativaA'),
(12, 'Qual jogador do Palmeiras é o recordista de títulos conquistados pelo clube', 'alternativaD'),
(13, 'Qual foi a maior goleada da história do Palmeiras sobre o maior rival?', 'alternativaC'),
(14, 'Qual foi o rival europeu que o verdão enfrentou no histórico título do Torneio Internacional de Clubes 1951', 'alternativaB'),
(15, 'Quais foram os jogadores que fizeram os gols na histórica vitória de 4x0 contra o seu maior rival, Crédito Para Negativado!', 'alternativaB');
