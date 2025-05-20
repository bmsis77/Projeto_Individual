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
    idQuiz INT PRIMARY KEY AUTO_INCREMENT,
    nome varchar(45),
    pergunta varchar(255),
    respCorreta varchar(45)
);
CREATE TABLE if not exists Usuario_Quiz (
    fk_idQuiz INT,
    fk_idUsuario INT,
    pontuacao char(15),
    respUsuario varchar(45),
    constraint chave_composta primary key (fk_idQuiz, fk_idUsuario),
    CONSTRAINT fk_Quiz FOREIGN KEY (fk_idQuiz) REFERENCES Quiz(idQuiz),
    CONSTRAINT fk_Usuario FOREIGN KEY (fk_idUsuario) REFERENCES Usuario(idUsuario)
);

select * from Usuario;
