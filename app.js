require("dotenv").config();
const WebSocket = require("ws");
const http = require("http");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("./models/connection");

var usersRouter = require("./routes/users");
var winsRouter = require("./routes/wins");

var app = express();
const cors = require("cors");
app.use(cors());
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connecté");

  // Écoute des messages du client (téléphone)
  // Écoute des messages du client (téléphone)
  ws.on("message", (message) => {
    // Diffuse le message (formulaire validé) à tous les clients connectés
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        // Envoie une chaîne de texte plutôt qu'un objet Blob
        client.send("formOK");
      }
    });
  });
});

const PORT = process.env.PORT || 3001;

// ...

server.listen(PORT, () => {
  console.log(`Serveur WebSocket en écoute sur le port ${PORT}`);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/startVideo", (req, res) => {
  // Code pour démarrer la vidéo ici
  // Vous pouvez ajouter ici la logique pour déclencher la lecture de la vidéo sur l'écran de l'ordinateur
  // Par exemple, vous pouvez utiliser une bibliothèque pour contrôler la lecture de la vidéo
  console.log("Démarrage de la vidéo sur l'écran de l'ordinateur");

  // Répondez avec un message pour indiquer que la vidéo a été démarrée
  res.status(200).json({ message: "La vidéo a été démarrée" });
});

app.use("/users", usersRouter);
app.use("/wins", winsRouter);

module.exports = app;
