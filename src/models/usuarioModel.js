var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email, jogadorFavorito as JogadorFavorito FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
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

function quizelar(fk_idUsuario, pontuacao, respostas) {
    let comandosSql = "";

    respostas.forEach(resp => {
        const pergunta = resp.pergunta.replace(/'/g, ""); // evita problemas com aspas
        const resposta = resp.respostaSelecionada;

        comandosSql += `
            INSERT INTO Usuario_Quiz (fk_idUsuario, pergunta, respUsuario, pontuacao)
            VALUES ('${fk_idUsuario}', '${pergunta}', '${resposta}', '${pontuacao}');
        `;
    });

    console.log("Executando múltiplas instruções SQL:\n" + comandosSql);
    return database.executar(comandosSql);
}

module.exports = {
    autenticar,
    cadastrar,
    quizelar
};