CREATE DATABASE Coracao_Verde_Branco;
USE Coracao_Verde_Branco;
CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    email VARCHAR(45),
    telefone CHAR(11),
    senha VARCHAR(45),
    idolo VARCHAR(45)
);
CREATE TABLE Quiz (
    idQuiz INT PRIMARY KEY AUTO_INCREMENT,
    pontuacao CHAR(15)
);
CREATE TABLE Usuario_Quiz (
    idUsuario_Quiz INT PRIMARY KEY AUTO_INCREMENT,
    fk_idQuiz INT,
    fk_idUsuario INT,
    CONSTRAINT fk_Quiz FOREIGN KEY (fk_idQuiz) REFERENCES Quiz(idQuiz),
    CONSTRAINT fk_Usuario FOREIGN KEY (fk_idUsuario) REFERENCES Usuario(idUsuario)
);