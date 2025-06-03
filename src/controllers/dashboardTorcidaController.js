// src/controllers/dashboardTorcidaController.js
var dashboardTorcidaModel = require("../models/dashboardTorcidaModel");

function getPontuacaoMediaQuiz(req, res) {
    dashboardTorcidaModel.buscarPontuacaoMediaQuiz().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]); // Retorna o primeiro (e único) resultado da média
        } else {
            res.status(204).send("Nenhum resultado encontrado para pontuação média!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a pontuação média do quiz.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function getQuestaoMaisErrada(req, res) {
    dashboardTorcidaModel.buscarQuestaoMaisErrada().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(204).send("Nenhuma questão mais errada encontrada!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a questão mais errada.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function getTotalUsuarios(req, res) {
    dashboardTorcidaModel.buscarTotalUsuarios().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(204).send("Nenhum usuário encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o total de usuários.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function getVotosJogadores(req, res) {
    dashboardTorcidaModel.buscarVotosJogadores().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado); // Retorna um array de jogadores e seus votos
        } else {
            res.status(204).send("Nenhum voto de jogador encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os votos dos jogadores.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function getPorcentagensPontuacao(req, res) {
    dashboardTorcidaModel.buscarPorcentagensPontuacao().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(204).send("Nenhuma porcentagem de pontuação encontrada!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as porcentagens de pontuação.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    getPontuacaoMediaQuiz,
    getQuestaoMaisErrada,
    getTotalUsuarios,
    getVotosJogadores,
    getPorcentagensPontuacao
};