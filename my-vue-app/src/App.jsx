import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import BasicExample from './components/box'
import './App.css'
import * as amplitude from '@amplitude/analytics-browser';

function App() {
  if (localStorage.getItem("hasVoted") == undefined ){
    localStorage.setItem("hasVoted", "0")
  }
  amplitude.init('c46a7699d239e619ba942793f5e6f7cd', {"autocapture":true});
  const [count, setCount] = useState(0)
  const [options, setOptions] = useState([]);
  
  function sendResult() {
    if (
      localStorage.getItem("hasVoted") === "0" ||
      localStorage.getItem("hasVoted") == undefined
    ) {
      fetch("https://externally-handy-maggot.ngrok-free.app/aula", {
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
          return await response.text();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Você já votou!");
    }
  }

  function resultado() {
    fetch("https://externally-handy-maggot.ngrok-free.app/votos", {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    })
      .then(async function (response) {
        console.log(response);
        return await response.json();
      }).then(async function (text) {
        console.log(text)
        let i = 0
        let alerttext = ""
        for (i in text.opcoes) {
          alerttext += `${text.opcoes[i]}: ${text.votos[i]} votos \n`
        }
        alert(alerttext)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <div id="cartascontainer">
      <form>
        <label>Empresa:</label>
        <select name="empresas" id="empresas">
          <option>Opção 1</option>
          <option>Opção 2</option>
          </select>
        <br /><br />
        <label>Candidato:</label>
        <select name="candidatos" id="candidatos">
        <option>Opção 3</option>
        <option>Opção 4</option></select>
        <br /><br />
      </form>
      <div id="buttondiv">
        <button id="formsubmit" onClick={sendResult}>Enviar</button>
        <button id="mostrarvotos" onClick={resultado}>Mostrar Votos</button>
      </div>
      <div id="tablediv"><table id="senttable"></table></div>
    </div>
    </>
  )
}

export default App
