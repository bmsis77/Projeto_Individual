// Importa o arquivo que se conecta ao banco de dados (usuarioModel.js)
var usuarioModel = require("../models/usuarioModel");

// Função que faz o login do usuário
function autenticar(req, res) {
    // Pega o email e a senha que vieram do corpo da requisição (formulário)
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Verifica se o email foi enviado
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    }
    // Verifica se a senha foi enviada
    else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        // Chama a função do model para verificar se o usuário existe no banco de dados
        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                // Mostra no console quantos resultados vieram do banco
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                // Se encontrou apenas 1 usuário, envia os dados dele como resposta
                if (resultadoAutenticar.length == 1) {
                    res.json({
                        id: resultadoAutenticar[0].idUsuario,
                        nome: resultadoAutenticar[0].nome,
                        email: resultadoAutenticar[0].email,
                        jogadorFavorito: resultadoAutenticar[0].JogadorFavorito
                    });
                }
                // Se não encontrou nenhum usuário
                else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                }
                // Se encontrou mais de um com o mesmo login e senha (erro de duplicidade)
                else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            })
            // Se der erro na busca, mostra no console e envia o erro
            .catch(function (erro) {
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

// Função que faz o cadastro de um novo usuário
function cadastrar(req, res) {
    // Pega os dados do corpo da requisição (formulário de cadastro)
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var telefone = req.body.telefoneServer;
    var jogadorFavorito = req.body.jogadorFavoritoServer;

    // Verifica se todos os campos foram preenchidos
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
        // Se tudo estiver preenchido, chama a função do model para salvar no banco
        usuarioModel.cadastrar(nome, email, senha, telefone, jogadorFavorito)
            .then(
                function (resultado) {
                    // Retorna o resultado do cadastro
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    // Se der erro, mostra no console e envia para o navegador
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

// Função que salva as respostas de um quiz
function quizelar(req, res) {
    // Pega os dados enviados pelo front-end
    var fk_idUsuario = req.body.fk_idUsuario;
    var pontuacaoTotalQuiz = req.body.pontuacao;
    var respostasDoUsuario = req.body.respostasDoUsuario;

    // Verifica se os dados principais foram enviados corretamente
    if (fk_idUsuario == undefined) {
        res.status(400).send("O ID do usuário está undefined!");
    } else if (pontuacaoTotalQuiz == undefined) {
        res.status(400).send("A pontuação está undefined!");
    } else if (respostasDoUsuario == undefined) {
        res.status(400).send("As respostas do quiz estão undefined!");
    } else {
        // Cria uma lista para armazenar todas as promessas de inserção no banco
        var promessas = [];

        // Percorre todas as respostas do usuário
        for (var i = 0; i < respostasDoUsuario.length; i++) {
            var resposta = respostasDoUsuario[i];

            // Verifica se cada resposta tem os campos necessários
            if (resposta.fk_idPergunta == undefined || resposta.respostaSelecionada == undefined) {
                console.warn("Resposta inválida. Pulando:", resposta);
                continue;
            }

            // Adiciona a promessa de salvar essa resposta no banco
            promessas.push(
                usuarioModel.salvarRespostaQuiz(
                    fk_idUsuario,
                    resposta.fk_idPergunta,
                    resposta.respostaSelecionada,
                    pontuacaoTotalQuiz
                )
            );
        }

        // Aguarda todas as respostas serem salvas e depois envia o resultado
        Promise.all(promessas).then(function (resultados) {
            console.log("Todas as respostas do quiz foram salvas com sucesso!");
            res.status(200).json({ message: "Quiz salvo com sucesso!", resultados: resultados });
        }).catch(function (erro) {
            // Se der erro ao salvar, mostra no console e envia mensagem de erro
            console.error("Erro ao salvar quiz:", erro.sqlMessage || erro.message);
            res.status(500).json({ error: "Erro ao salvar quiz.", details: erro.sqlMessage || erro.message });
        });
    }
}

// Exporta as três funções para que outros arquivos possam usar
module.exports = {
    autenticar,
    cadastrar,
    quizelar
};
