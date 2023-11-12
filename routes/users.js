var express = require("express");
var router = express.Router();
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const validator = require("validator");

// Middleware de validation pour vérifier que le numéro est composé de chiffres
const validateNumber = (req, res, next) => {
  const { number } = req.body;
  if (!validator.isNumeric(number)) {
    return res.status(400).json({
      message: "Le champ numéro doit contenir uniquement des chiffres.",
    });
  }
  next();
};

// Middleware de validation pour vérifier que l'email est au format email
const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ message: "Le champ email doit être au format email valide." });
  }
  next();
};

// check empty
const validateNotEmptyFields = (req, res, next) => {
  const { firstName, lastName, email, number } = req.body;
  if (!firstName || !lastName || !email || !number) {
    return res
      .status(400)
      .json({ message: "Tous les champs doivent être remplis." });
  }
  next();
};

// Add user
router.post(
  "/add",
  validateNotEmptyFields,
  validateNumber,
  validateEmail,
  async (req, res) => {
    const { firstName, lastName, email, number } = req.body;

    // Vérifier si un utilisateur avec le même email ou le même numéro existe déjà
    const existingUser = await User.findOne({ $or: [{ email }, { number }] });

    if (existingUser) {
      // Un utilisateur avec le même email ou le même numéro existe déjà
      return res.status(409).json({
        message: "Un utilisateur avec cet email ou numéro existe déjà.",
      });
    }

    // Si aucun utilisateur existant n'est trouvé, ajoutez le nouvel utilisateur à la base de données
    const newUser = new User({ firstName, lastName, email, number });

    try {
      const savedUser = await newUser.save();
      res
        .status(201)
        .json({ message: "Utilisateur ajouté avec succès", user: savedUser });
    } catch (err) {
      res.status(500).json({
        message: "Erreur lors de l'ajout de l'utilisateur",
        error: err,
      });
    }
  }
);

module.exports = router;

//Get users
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find(); // Récupérez tous les utilisateurs de la base de données

//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({
//       message: "Erreur lors de la récupération des utilisateurs",
//       error: err,
//     });
//   }
// });

module.exports = router;
