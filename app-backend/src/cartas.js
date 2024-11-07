import * as amplitude from "../node_modules/@amplitude/analytics-browser";
localStorage.getItem("hasVoted");

amplitude.init("c46a7699d239e619ba942793f5e6f7cd", { autocapture: true });

fetch("/aula", {
  method: "GET",
  mode: "cors",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})
  .then(async function (response) {
    return await response.json();
  })
  .then(async function (text) {
    console.log(text);

    for (let i = 0; i < text.opcoessup.length; i++) {
      let empresaoption = document.createElement("option");
      empresaoption.setAttribute("value", text.opcoessup[i]);
      empresaoption.setAttribute("id", text.opcoessup[i]);
      empresaoption.innerText = text.opcoessup[i];
      document.getElementById(`empresas`).appendChild(empresaoption);
    }

    for (let i = 0; i < text.opcoesinf.length; i++) {
      let candidatooption = document.createElement("option");
      candidatooption.setAttribute("value", text.opcoesinf[i]);
      candidatooption.setAttribute("id", text.opcoesinf[i]);
      candidatooption.innerText = text.opcoesinf[i];
      document.getElementById(`candidatos`).appendChild(candidatooption);
    }
  })
  .catch((error) => {
    console.error(error);
  });

document
  .getElementById("formsubmit")
  .addEventListener("click", function sendData() {
    if (
      localStorage.getItem("hasVoted") === "0" ||
      localStorage.getItem("hasVoted") == undefined
    ) {
      fetch("/aula", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          opcao1: document.getElementById("empresas").value,
          opcao2: document.getElementById("candidatos").value,
        }),
      })
        .then(async function (response) {
          localStorage.setItem("hasVoted", "1");
          console.log(response);
          return await response.json();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Você já votou!");
    }
  });
