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
                        // Alterado de 'idUsuario' para 'id' para corresponder ao que o frontend espera
                        id: resultadoAutenticar[0].idUsuario,
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

// --- NOVO CÓDIGO DA FUNÇÃO QUIZELAR ---
async function quizelar(req, res) {
    // Captura os dados enviados pelo frontend
    const fk_idUsuario = req.body.fk_idUsuario; // ID do usuário logado
    const pontuacaoTotalQuiz = req.body.pontuacao; // Pontuação total de acertos do quiz (renomeado no backend)
    const respostasDoUsuario = req.body.respostasDoUsuario; // Array de respostas individuais

    // Validações básicas dos dados recebidos
    if (fk_idUsuario == undefined || pontuacaoTotalQuiz == undefined || respostasDoUsuario == undefined || !Array.isArray(respostasDoUsuario)) {
        res.status(400).send("Dados do quiz incompletos ou inválidos! Verifique fk_idUsuario, pontuacao e respostasDoUsuario.");
        return;
    }

    try {
        // Array para guardar todas as promessas de inserção de respostas
        const promessasDeInsercao = [];

        // Itera sobre cada resposta individual no array
        for (const resposta of respostasDoUsuario) {
            // Valida se a resposta individual tem os campos necessários
            if (resposta.fk_idPergunta == undefined || resposta.respostaSelecionada == undefined) {
                console.warn("Uma resposta individual dentro do array está incompleta. Pulando:", resposta);
                continue; // Pula esta resposta e continua para a próxima
            }

            // Adiciona a promessa de inserção para cada resposta ao array
            // O model 'salvarRespostaQuiz' será chamado para cada resposta
            promessasDeInsercao.push(
                usuarioModel.salvarRespostaQuiz(
                    fk_idUsuario,
                    resposta.fk_idPergunta,
                    resposta.respostaSelecionada,
                    pontuacaoTotalQuiz // A pontuação total é enviada para cada registro de resposta
                )
            );
        }

        // Aguarda que todas as operações de inserção no banco de dados sejam concluídas
        const resultados = await Promise.all(promessasDeInsercao);
        
        console.log("Todas as respostas do quiz salvas com sucesso no BD!");
        // Envia uma resposta de sucesso ao frontend
        res.status(200).json({ message: "Quiz salvo com sucesso!", resultados: resultados });

    } catch (erro) {
        // Captura e loga qualquer erro que ocorra durante o processo de salvamento
        console.error("Erro ao salvar quiz no controller:", erro.sqlMessage || erro.message);
        // Envia uma resposta de erro detalhada ao frontend
        res.status(500).json({ error: "Erro ao salvar quiz.", details: erro.sqlMessage || erro.message });
    }
}

module.exports = {
    autenticar,
    cadastrar,
    quizelar // Exportando a função quizelar atualizada
};