const gifsPool = ["./Imagens/bobrossparrot.gif", "./Imagens/explodyparrot.gif", "./Imagens/fiestaparrot.gif", "./Imagens/metalparrot.gif", "./Imagens/revertitparrot.gif", "./Imagens/tripletsparrot.gif", "./Imagens/unicornparrot.gif"];
const gifsUsados = [];

gifsPool.sort(comparador);

function comparador() { 
	return Math.random() - 0.5; 
}

let numCartas = prompt("Com quantas cartas você quer jogar?");
let numPares = numCartas/2;
let numJogadas = 0;

let minutos = 0;
let segundos = 0;
let temporizador;

if(numCartas < 4 || numCartas%2!==0 || numCartas > 14){
    repetirNumCartas();
}
else{
    escolherGifs();
}

function repetirNumCartas(){
    do {numCartas = prompt("Valor inválido. Favor, entrar outro")}
    while(numCartas < 4 || numCartas%2 !==0 || numCartas > 14)
}

function escolherGifs() {

    for (let i = 0; i < numCartas/2; i++) {
        gifsUsados.push(gifsPool[i]);
    }

    for (let i = 0; i < numCartas/2; i++) {
        gifsUsados.push(gifsPool[i]);
    }

    montarBaralho();
    temporizador = setInterval(timer,1000);
    
}


function montarBaralho() {
    const baralho = document.querySelector(".card-space");
    baralho.innerHTML = "";

    for (let i = 0; i < numCartas; i++) {
        baralho.innerHTML += `
        <div class="card " onclick="selecionarCarta(this)">
         <img class="frente imagem" src="./Imagens/front.png"/>
         <img class="verso imagem escondido" src="${gifsUsados[i]}"/>
        </div>
        `;
    }
}

function timer() {
    let mostrarMinutos;
    if(minutos < 10) {
        mostrarMinutos = `0${minutos}`;
    }
    else {
        mostrarMinutos = `${minutos}`
    }

    let mostrarSegundos;
    if(segundos < 10){
        mostrarSegundos = `0${segundos}`
    }
    else{
        mostrarSegundos = `${segundos}`
    }

    document.querySelector(".timer").innerHTML = `${mostrarMinutos}:${mostrarSegundos}`;

    console.log(`${mostrarMinutos}:${mostrarSegundos}`)

    segundos++;
    
    if(segundos > 59) {
        segundos = 0;
        minutos++;
    }
}

function selecionarCarta(elemento) {
    elemento.removeAttribute("onclick");
    let carta = document.querySelector(".selecionado");
    
    console.log("elemento = " + elemento)
    console.log("carta = " + carta)

    if(carta === null) {
        elemento.classList.add("selecionado", "primeira");
        virarCarta();
        console.log("Sou o selecionado1; " + elemento)
    }
    else {
        carta.classList.remove("selecionado")
        elemento.classList.add("selecionado", "segunda");

        virarCarta();

        elemento.classList.remove("selecionado");
        console.log("Sou o selecionado2; " + elemento)
        setTimeout(compararCartas, 2000);
    }
}

function virarCarta() {

    let frente = document.querySelector(".selecionado .frente");
    frente.classList.add("escondido");

    let verso = document.querySelector(".selecionado .verso");
    verso.classList.remove("escondido");

    numJogadas++ ;

}

function compararCartas() {
    console.log("COMPAREI")

    let primeira = document.querySelector(".primeira");
    let segunda = document.querySelector(".segunda");

    let frentePrimeira = document.querySelector(".primeira .frente");
    let versoPrimeira = document.querySelector(".primeira .verso");

    let frenteSegunda = document.querySelector(".segunda .frente");
    let versoSegunda = document.querySelector(".segunda .verso");

    const primeiraImagem = document.querySelector(".primeira .verso ").src;
    const segundaImagem = document.querySelector(".segunda .verso").src;

    console.log("primeira " + primeira)
    console.log("segunda " + segunda)
    console.log("primeiraImagem " + primeiraImagem)
    console.log("segundaImagem " + segundaImagem)

    if(primeiraImagem === segundaImagem) {
        primeira.classList.toggle("acertada");
        segunda.classList.toggle("acertada");

        console.log("ACERTOU")

        numPares--;

        console.log(numPares)
    }
    else {
        frentePrimeira.classList.remove("escondido");
        versoPrimeira.classList.add("escondido");

        frenteSegunda.classList.remove("escondido");
        versoSegunda.classList.add("escondido");

        console.log("ERROU")

        primeira.setAttribute("onclick", "selecionarCarta(this)");
        segunda.setAttribute("onclick", "selecionarCarta(this)");
    }

    console.log("DESFIZ")
    primeira.classList.remove("primeira");
    segunda.classList.remove("segunda");

    if(numPares === 0) {
        encerrarJogo();
    }
}

function encerrarJogo() {
    if(minutos > 0){
        alert("Você ganhou em " + numJogadas +" jogadas e em " + minutos + " minutos e "+ segundos + " segundos");
    }
    else{
        alert("Você ganhou em " + numJogadas +" jogadas e em " + segundos + " segundos!");
    }
    clearInterval(temporizador);
    
    const reiniciar = prompt("Gostaria de jogar novamente?");
    if(reiniciar === "sim") {
        numCartas = prompt("Com quantas cartas você quer jogar?");
        numPares = numCartas/2;
        numJogadas = 0;
        minutos = 0;
        segundos = 0;
        escolherGifs();
    }
    else{
        alert("Obrigado pelo seu tempo!")
    }
}
