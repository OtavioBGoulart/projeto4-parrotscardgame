let qtdecartas = 0
container = document.querySelector(".container-cartas");
const gifs = ["bobrossparrot.gif", "explodyparrot.gif", "fiestaparrot.gif", "metalparrot.gif", "revertitparrot.gif", "tripletsparrot.gif", "unicornparrot.gif"];
const gifsutilizados = [];
let pares = 0;
let numJogadas = 0;
let paresCartas = [];

function comparador() {
    return Math.random() - 0.5;
}

function comecar() {
    do {
        qtdecartas = Number(prompt("Com quantas cartas deseja jogar? (Só seram aceitos números pares entre 4 e 14!) "));
    } while (!(qtdecartas % 2 === 0 && qtdecartas >= 4 && qtdecartas <= 14));

    for (let i = 0; i < qtdecartas / 2; i++) {
        gifsutilizados.push(gifs[i]);
        gifsutilizados.push(gifs[i]);
    }

    criarCartas(qtdecartas);
}

function criarCartas(qtdecartas) {

    gifsutilizados.sort(comparador);

    for (let cartas = 0; cartas < qtdecartas; cartas++) {

        let inserircartas = `<div onclick="virarCarta(this);" class="carta ${gifsutilizados[cartas]}">
    <img class="frente-carta"  src="./gifs/${gifsutilizados[cartas]}" />
    <img class="costas-carta"  src="./imagens/front.png" />
    </div>`;

        container.innerHTML = container.innerHTML + inserircartas;

    }
}

comecar();

let elementoCartas = document.querySelectorAll(".carta");
let cartaEscolhida = false;
let proxCartaEscolhida = false;
let primeiraCarta = null;
let segundaCarta = null;
let fecharVirada = false;
let listaPrimeira = null;
let listaSegunda = null;
let frenteCarta = null;
let costaCarta = null;

function virarCarta(carta) {

    frenteCarta = carta.querySelector(".frente-carta");
    costaCarta = carta.querySelector(".costas-carta");
    frenteCarta.classList.add("virar-frente");
    costaCarta.classList.add("virar-costas");

    if (!cartaEscolhida) {
        primeiraCarta = carta;
        cartaEscolhida = true;
        numJogadas++;

    } else {
        segundaCarta = carta;

        proxCartaEscolhida = true;

    }

    if (cartaEscolhida && proxCartaEscolhida) {
        listaPrimeira = primeiraCarta.classList;
        listaSegunda = segundaCarta.classList;
        if (listaPrimeira[1] == listaSegunda[1]) {
            setTimeout(par, 1000);
            resetar();
        } else {
            setTimeout(desvirartodas, 500);
            resetar();
        }
    }
    setTimeout(fimJogo, 1800);
}

function fimJogo() {
    if (qtdecartas / 2 == pares) {
        alert(`Você ganhou em ${numJogadas} jogadas!`);
    }
}

function par() {

    paresCartas.push(primeiraCarta);
    paresCartas.push(segundaCarta);
    cartasDesbloqueadas();

    pares++;
}

function desvirartodas() {
    let primeiraCartaFrente = primeiraCarta.querySelector(".frente-carta");
    let primeiraCartaCostas = primeiraCarta.querySelector(".costas-carta");

    let segundaCartaFrente = segundaCarta.querySelector(".frente-carta");
    let segundaCartaCostas = segundaCarta.querySelector(".costas-carta");

    primeiraCartaCostas.classList.remove("virar-frente");
    primeiraCartaCostas.classList.remove("virar-costas");
    segundaCartaFrente.classList.remove("virar-frente");
    segundaCartaCostas.classList.remove("virar-costas");
    cartasDesbloqueadas();

}

function resetar() {

    cartaEscolhida = false;
    proxCartaEscolhida = false;
    listaPrimeira = null;
    listaSegunda = null;

}

function cartasDesbloqueadas() {
    for (let i = 0; i < elementoCartas; i++) {
        let item = elementoCartas[i];
        item.setAttribute("onclick", "virarCarta(this);");
    }

    for (let i = 0; i < paresCartas.length; i++) {
        paresCartas[i].removeAttribute("onclick");
    }
}