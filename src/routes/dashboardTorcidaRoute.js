var express = require("express");
var router = express.Router();
var dashboardTorcidaController = require("../controllers/dashboardTorcidaController");

router.get("/pontuacao-media", dashboardTorcidaController.getPontuacaoMediaQuiz);
router.get("/questao-mais-errada", dashboardTorcidaController.getQuestaoMaisErrada);
router.get("/total-usuarios", dashboardTorcidaController.getTotalUsuarios);
router.get("/votos-jogadores", dashboardTorcidaController.getVotosJogadores);
router.get("/porcentagens-pontuacao", dashboardTorcidaController.getPorcentagensPontuacao);

module.exports = router;