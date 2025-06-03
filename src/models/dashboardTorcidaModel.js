// src/models/dashboardTorcidaModel.js
var database = require("../database/config"); // Certifique-se de que o caminho para seu config.js está correto

function buscarPontuacaoMediaQuiz() {
    console.log("Acessando o model para buscar a pontuação média do quiz.");
    // A função AVG no MySQL já ignora valores nulos.
    // Usamos CAST para garantir que 'pontuacaoDaTentativa' seja tratado como número para a média.
    var instrucaoSql = `
        SELECT AVG(CAST(pontuacaoDaTentativa AS DECIMAL(10,2))) AS mediaPontuacao
        FROM Usuario_Quiz;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarQuestaoMaisErrada() {
    console.log("Acessando o model para buscar a questão mais errada.");
    // Conta as respostas incorretas para cada pergunta e retorna a pergunta com mais erros.
    var instrucaoSql = `
        SELECT
            p.pergunta AS questaoMaisErrada,
            COUNT(uq.idQuiz) AS totalErros
        FROM
            Usuario_Quiz uq
        JOIN
            Pergunta p ON uq.fk_idPergunta = p.idPergunta
        WHERE
            uq.respostaSelecionada <> p.respCorreta
        GROUP BY
            p.pergunta
        ORDER BY
            totalErros DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTotalUsuarios() {
    console.log("Acessando o model para buscar o total de usuários.");
    // KPI "Família Palmeiras" - assumindo que representa o total de usuários cadastrados
    var instrucaoSql = `
        SELECT COUNT(idUsuario) AS totalUsuarios
        FROM Usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarVotosJogadores() {
    console.log("Acessando o model para buscar os votos dos jogadores favoritos.");
    // Conta os votos para cada jogador favorito
    var instrucaoSql = `
        SELECT
            jogadorFavorito,
            COUNT(idUsuario) AS votos
        FROM
            Usuario
        WHERE
            jogadorFavorito IS NOT NULL AND jogadorFavorito <> ''
        GROUP BY
            jogadorFavorito
        ORDER BY
            votos DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorcentagensPontuacao() {
    console.log("Acessando o model para buscar porcentagens de pontuação.");
    // Calcula o total de respostas e o total de respostas corretas/erradas
    // Assumimos que 'respostaSelecionada' da Usuario_Quiz deve ser igual a 'respCorreta' da Pergunta para ser considerada certa.
    var instrucaoSql = `
        SELECT
            SUM(CASE WHEN uq.respostaSelecionada = p.respCorreta THEN 1 ELSE 0 END) AS respostasCertas,
            SUM(CASE WHEN uq.respostaSelecionada <> p.respCorreta THEN 1 ELSE 0 END) AS respostasErradas
        FROM
            Usuario_Quiz uq
        JOIN
            Pergunta p ON uq.fk_idPergunta = p.idPergunta;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarPontuacaoMediaQuiz,
    buscarQuestaoMaisErrada,
    buscarTotalUsuarios,
    buscarVotosJogadores,
    buscarPorcentagensPontuacao
};