var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email, jogadorFavorito as JogadorFavorito FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, telefone, jogadorFavorito) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, telefone, jogadorFavorito);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO Usuario (nome, email, senha, telefone, jogadorFavorito) VALUES ('${nome}', '${email}', '${senha}', '${telefone}', '${jogadorFavorito}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};

// console.log("Usuário encontrado: ", resultadoAutenticar[0]);
// console.log("Autenticação realizada com sucesso!");
// res.json({
// id: resultadoAutenticar[0].idusuario,
// email: resultadoAutenticar[0].email,
// username: resultadoAutenticar[0].username,
// senha: resultadoAutenticar[0].senha,
// genero: resultadoAutenticar[0].genero
// });
// } else if (resultadoAutenticar.length == 0) {
// res.status(403).send("Email e/ou senha inválido(s)");
// } else {
// res.status(403).send("Mais de um usuário com o mesmo login e senha!");
// }
// }
// ).catch(
// function (erro) {
// console.log(erro);
// console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
// res.status(500).json(erro.sqlMessage);
// }
// );
// }

// }

// function cadastrar(req, res) {
// // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
// var username = req.body.usernameServer;
// var email = req.body.emailServer;
// var senha = req.body.senhaServer;
// var genero = req.body.generoServer;

// // Faça as validações dos valores
// if (username == undefined) {
// console.log("Seu nome está undefined!");
// } else if (email == undefined) {
// console.log("Seu email está undefined!");
// } else if (senha == undefined) {
// console.log("Sua senha está undefined!");
// } else if (genero == undefined) {
// console.log("Sua Seu gênero está undefined!");
// } else {

// // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
// usuarioModel.cadastrar(username, email, senha, genero)
// .then(
// function (resultado) {
// res.json(resultado);
// }
// ).catch(
// function (erro) {
// console.log(erro);
// console.log(
// "\nHouve um erro ao realizar o cadastro! Erro: ",
// erro.sqlMessage
// );
// res.status(500).json(erro.sqlMessage);
// }
// );
// }
// }

// module.exports = {
// autenticar,
// cadastrar
// }
