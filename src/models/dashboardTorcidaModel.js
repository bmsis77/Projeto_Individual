var database = require("../database/config");

function buscarPontuacaoMediaQuiz() {
    console.log("Acessando o model para buscar a pontuação média do quiz.");
    var instrucaoSql = `
       SELECT ROUND(AVG(CAST(pontuacaoDaTentativa AS DECIMAL(10,2))), 2) AS mediaPontuacao
FROM Usuario_Quiz;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarQuestaoMaisErrada() {
    console.log("Acessando o model para buscar a questão mais errada.");
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
    var instrucaoSql = `
        SELECT COUNT(idUsuario) AS totalUsuarios
        FROM Usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarVotosJogadores() {
    console.log("Acessando o model para buscar os votos dos jogadores favoritos.");
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

function buscarPorcentagensPontuacao(idUsuario) {
    var instrucaoSql = `
        SELECT
            SUM(CASE WHEN P.respCorreta = UQ.respostaSelecionada THEN 1 ELSE 0 END) AS respostasCorretas,
            SUM(CASE WHEN P.respCorreta != UQ.respostaSelecionada THEN 1 ELSE 0 END) AS respostasErradas
        FROM Pergunta AS P
        JOIN Usuario_Quiz AS UQ ON P.idPergunta = UQ.fk_idPergunta
        WHERE UQ.fk_idUsuario = ?;
    `;
    return database.executar(instrucaoSql, [idUsuario]);
}


module.exports = {
    buscarPontuacaoMediaQuiz,
    buscarQuestaoMaisErrada,
    buscarTotalUsuarios,
    buscarVotosJogadores,
    buscarPorcentagensPontuacao
};