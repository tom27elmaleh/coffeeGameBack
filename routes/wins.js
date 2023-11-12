var express = require("express");
var router = express.Router();
const Win = require("../models/wins");

//new winner
router.post("/", async (req, res) => {
  try {
    // Recherchez la dernière entrée de la table "wins" et mettez à jour "isPlaying" et "lastWinner"
    const lastWin = await Win.findOne().sort({ _id: -1 });

    if (lastWin) {
      lastWin.isPlaying = true;

      // Enregistrez la mise à jour
      await lastWin.save();

      // Planifiez la création d'un nouveau document avec un délai de 10 secondes
      setTimeout(async () => {
        const newWin = new Win({
          isPlaying: false,
          nameLastWinner: "",
        });
        await newWin.save();
      }, 10000); // 10 secondes en millisecondes

      res.json({ result: "ok" });
    } else {
      res.json({ result: "ko" });
    }
  } catch (error) {
    console.error(error);
    res.json({ result: "ko" });
  }
});

router.get("/checkIsPlaying", async (req, res) => {
  try {
    const lastWin = await Win.findOne().sort({ _id: -1 });

    if (lastWin) {
      const isPlaying = lastWin.isPlaying;
      res.status(200).json({ isPlaying });
    } else {
      res.status(404).send("Aucune entrée trouvée dans la table 'wins'.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur s'est produite.");
  }
});

module.exports = router;
