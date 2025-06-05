var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    }
    else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.length == 1) {
                    res.json({
                        id: resultadoAutenticar[0].idUsuario,
                        nome: resultadoAutenticar[0].nome,
                        email: resultadoAutenticar[0].email,
                        jogadorFavorito: resultadoAutenticar[0].JogadorFavorito
                    });
                }
                else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                }
                else {
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

    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var telefone = req.body.telefoneServer;
    var jogadorFavorito = req.body.jogadorFavoritoServer;


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
    var fk_idUsuario = req.body.fk_idUsuario;
    var pontuacaoTotalQuiz = req.body.pontuacao;
    var respostasDoUsuario = req.body.respostasDoUsuario;

    if (fk_idUsuario == undefined) {
        res.status(400).send("O ID do usuário está undefined!");
    } else if (pontuacaoTotalQuiz == undefined) {
        res.status(400).send("A pontuação está undefined!");
    } else if (respostasDoUsuario == undefined) {
        res.status(400).send("As respostas do quiz estão undefined!");
    } else {
        var promessas = [];

        for (var i = 0; i < respostasDoUsuario.length; i++) {
            var resposta = respostasDoUsuario[i];

            if (resposta.fk_idPergunta == undefined || resposta.respostaSelecionada == undefined) {
                console.log("Resposta inválida. Pulando:", resposta);
            } else {
                promessas.push(
                    usuarioModel.salvarRespostaQuiz(
                        fk_idUsuario,
                        resposta.fk_idPergunta,
                        resposta.respostaSelecionada,
                        pontuacaoTotalQuiz
                    )
                );
            }
        }

        Promise.all(promessas)
            .then(function (resultados) {
                console.log("Todas as respostas do quiz foram salvas com sucesso!");
                res.status(200).json({
                    message: "Quiz salvo com sucesso!",
                    resultados: resultados
                });
            })
            .catch(function (erro) {
                console.log("Erro ao salvar quiz: ", erro.sqlMessage || erro.message);
                res.status(500).json({
                    error: "Erro ao salvar quiz.",
                    details: erro.sqlMessage || erro.message
                });
            });
    }
}


module.exports = {
    autenticar,
    cadastrar,
    quizelar
};
