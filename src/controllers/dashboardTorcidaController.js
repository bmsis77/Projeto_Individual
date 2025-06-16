var dashboardTorcidaModel = require("../models/dashboardTorcidaModel");

function getPontuacaoMediaQuiz(req, res) {

    console.log("Recuperando a pontuação média do quiz");

    dashboardTorcidaModel.buscarPontuacaoMediaQuiz().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
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

    console.log("Recuperando a questão mais errada");

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

    console.log("Recuperando o total de usuários");

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

    console.log("Recuperando os votos dos jogadores");

    dashboardTorcidaModel.buscarVotosJogadores().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
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

    var idUSuario = req.params.idUsuario

    console.log("Recuperando pontuação do jogador");

    dashboardTorcidaModel.buscarPorcentagensPontuacao(idUSuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhuma pontuação encontrada!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a porcentagem do jogador", erro.sqlMessage);
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
