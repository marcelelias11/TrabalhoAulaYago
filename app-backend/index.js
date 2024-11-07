const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const compression = require("compression");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const path = require("path");

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());

//app.use(limiter);

app.use(express.json());

app.use(express.static("src"));
app.use(compression());

let content = {
  opcoes: [],
  votos: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

app.get("/votos", (req, res) => {
  res.status(200).send(content);
});

app.post("/aula", (req, res) => {
  function findIt(p) {
    return (p = `${req.body.opcao1} e ${req.body.opcao2}`);
  }
  console.log(content.opcoes.find(findIt));
  if (content.opcoes.find(findIt) == undefined) {
    content.opcoes.push(`${req.body.opcao1} e ${req.body.opcao2}`);
    content.votos[
      content.opcoes.indexOf(`${req.body.opcao1} e ${req.body.opcao2}`)
    ] += 1;
  } else {
    content.votos[
      content.opcoes.indexOf(`${req.body.opcao1} e ${req.body.opcao2}`)
    ] += 1;
  }
  console.log(`Opções: ${content.opcoes}, Votos: ${content.votos}`);
  res.status(201).send("Success!");
});

app.get("/connectioncheck", (req, res) => {
  res.status(200).send("Conexão bem sucedida!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
