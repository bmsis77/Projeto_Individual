var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.length == 1) {
                    res.json({
                        idUsuario: resultadoAutenticar[0].idUsuario,
                        nome: resultadoAutenticar[0].nome,
                        email: resultadoAutenticar[0].email,
                        jogadorFavorito: resultadoAutenticar[0].JogadorFavorito
                    });
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            })
            .catch(function (erro) {
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var telefone = req.body.telefoneServer;
    var jogadorFavorito = req.body.jogadorFavoritoServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (jogadorFavorito == undefined) {
        res.status(400).send("Seu jogador favorito está undefined!");
    } else {
        usuarioModel.cadastrar(nome, email, senha, telefone, jogadorFavorito)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function quizelar(req, res) {
    var fk_idUsuario = req.body.fk_idUsuarioServer;
    var pontuacao = req.body.pontuacaoServer;
    var respostas = req.body.respostasUsuarioServer; 

    if (!respostas || !Array.isArray(respostas)) {
        res.status(400).send("Respostas inválidas.");
        return;
    }

    usuarioModel.quizelar(fk_idUsuario, pontuacao, respostas)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro ao salvar quiz:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}
module.exports = {
    autenticar,
    cadastrar,
    quizelar
}