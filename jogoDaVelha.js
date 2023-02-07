let jogadorDaVez = "";
const inputVezJogador = document.getElementById("vezJogador");
const jogadasJogador1 = [];
const jogadasJogador2 = [];
const jogador1Input = document.getElementById("jogador1");
const jogador2Input = document.getElementById("jogador2");
let jogador1 = "";
let jogador2 = "";
let jogadas = 0;
let ganhou = "";

const ganhar = [
  ["1", "2", "3"],
  ["1", "4", "7"],
  ["1", "5", "9"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["3", "5", "7"],
];

const comecar = document.getElementById("comecar");

comecar.addEventListener("click", function () {
  if (jogador1 !== "" && jogador2 !== "") {
    document.querySelectorAll(".charKey").forEach(function (key) {
      key.disabled = false;
    });
    document.getElementById("vezJogador").value = `${jogadorDaVez} é a sua vez`;
    comecar.setAttribute("disabled", "");
  }
});

document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener("click", function () {
    let value = charKeyBtn.dataset.value;
    if (jogadorDaVez === jogador1) {
      jogadasJogador1.push(value);
      charKeyBtn.setAttribute("disabled", "");
      charKeyBtn.innerText = "X";
      jogadas++;
      for (let i = 0; i <= 7; i++) {
        if (verificar1(ganhar[i], jogadasJogador1) === ganhar[i].length) {
          Ganhador();
        }
      }
      if (jogadas === 9 && ganhou !== "s") {
        document.getElementById("result").value = "Empatou";
        ganhou = "e";
        document.getElementById("vezJogador").value = "";
      }
      if (ganhou !== "s" && ganhou !== "e") {
        jogadorDaVez = jogador2;
        document.getElementById(
          "vezJogador"
        ).value = `${jogadorDaVez} é a sua vez`;
      }
    } else {
      jogadasJogador2.push(value);
      charKeyBtn.setAttribute("disabled", "");
      charKeyBtn.innerText = "O";
      jogadas++;
      for (let i = 0; i <= 7; i++) {
        if (verificar1(ganhar[i], jogadasJogador2) === ganhar[i].length) {
          Ganhador();
        }
      }
      if (ganhou !== "s") {
        jogadorDaVez = jogador1;
        document.getElementById(
          "vezJogador"
        ).value = `${jogadorDaVez} é a sua vez`;
      }
    }
  });
});

jogador1Input.addEventListener("keydown", function (ev) {
  if (ev.key === "Enter") {
    jogador1 = jogador1Input.value;
    jogador1Input.setAttribute("disabled", "");
    jogadorDaVez = jogador1;
  }
});

jogador2Input.addEventListener("keydown", function (ev) {
  if (ev.key === "Enter") {
    jogador2 = jogador2Input.value;
    jogador2Input.setAttribute("disabled", "");
  }
});

function verificar1(first, last) {
  let result = first.filter(function (item) {
    return last.indexOf(item) > -1;
  });
  if (result === true) {
    alert("Foi");
  }
  return result.length;
}

function Ganhador() {
  ganhou = "s";
  document.getElementById("result").value = `${jogadorDaVez} ganhou!`;
  document.querySelectorAll(".charKey").forEach(function (key) {
    key.disabled = true;
    key.innerText = "-";
  });
  comecar.disabled = false;
  document.getElementById("vezJogador").value = "";
  jogadas = 0;
  jogadasJogador1.length = 0;
  jogadasJogador2.length = 0;
}

document.getElementById("reiniciar").addEventListener("click", reiniciar);

function reiniciar() {
  document.querySelectorAll(".charKey").forEach(function (key) {
    key.disabled = true;
    key.innerText = "-";
  });
  comecar.disabled = false;
  jogador1Input.disabled = false;
  jogador2Input.disabled = false;
  jogador1Input.value = "";
  jogador2Input.value = "";
  jogador1 = "";
  jogador2 = "";
  jogadorDaVez = "";
  document.getElementById("vezJogador").value = "";
  jogadas = 0;
  jogadasJogador1.length = 0;
  jogadasJogador2.length = 0;
  document.getElementById("result").value = "";
  ganhou = "";
}
