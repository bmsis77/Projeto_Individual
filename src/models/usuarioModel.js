var database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);
    var instrucaoSql = `
        SELECT idUsuario, nome, email, jogadorFavorito FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, telefone, jogadorFavorito) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, telefone, jogadorFavorito);

    var instrucaoSql = `
        INSERT INTO Usuario (nome, email, senha, telefone, jogadorFavorito) VALUES ('${nome}', '${email}', '${senha}', '${telefone}', '${jogadorFavorito}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// --- NOVA FUNÇÃO NO MODEL PARA SALVAR CADA RESPOSTA INDIVIDUAL DO QUIZ ---
function salvarRespostaQuiz(fk_idUsuario, fk_idPergunta, respostaSelecionada, pontuacaoDaTentativa) {
    console.log(`ACESSEI O USUARIO MODEL PARA SALVAR RESPOSTA DO QUIZ!
        ID Usuário: ${fk_idUsuario},
        ID Pergunta: ${fk_idPergunta},
        Resposta Selecionada: ${respostaSelecionada},
        Pontuação Total da Tentativa: ${pontuacaoDaTentativa}`);

    // A instrução SQL INSERT agora usa as novas nomenclaturas e os valores passados
    // 'respostaSelecionada' é uma string, por isso precisa de aspas simples na SQL
    // 'dataHora' é preenchido automaticamente pelo DEFAULT CURRENT_TIMESTAMP no BD
    var instrucaoSql = `
        INSERT INTO Usuario_Quiz (fk_idUsuario, fk_idPergunta, respostaSelecionada, pontuacaoDaTentativa, dataHora)
        VALUES (${fk_idUsuario}, ${fk_idPergunta}, '${respostaSelecionada}', ${pontuacaoDaTentativa}, NOW());
    `;

    console.log("Executando a instrução SQL para salvar resposta do quiz: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    salvarRespostaQuiz // Exportando a nova função para uso no controller
};