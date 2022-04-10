const gifsPool = ["./Imagens/bobrossparrot.gif", "./Imagens/explodyparrot.gif", "./Imagens/fiestaparrot.gif", "./Imagens/metalparrot.gif", "./Imagens/revertitparrot.gif", "./Imagens/tripletsparrot.gif", "./Imagens/unicornparrot.gif"];
const gifsUsados = [];

gifsPool.sort(comparador);

function comparador() { 
	return Math.random() - 0.5; 
}

let numCartas = prompt("Com quantas cartas você quer jogar?");
let numPares = numCartas/2;
let numJogadas = 0;

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
}


function montarBaralho() {
    const baralho = document.querySelector(".card-space");
    baralho.innerHTML = "";

    for (let i = 0; i < numCartas; i++) {
        baralho.innerHTML += `
        <div class="card " onclick="selecionarCarta(this)">
         <img class="frente face" src="./Imagens/front.png"/>
         <img class="verso face escondido" src="${gifsUsados[i]}"/>
        </div>
        `;
    }
}

function selecionarCarta(elemento){
    let carta = document.querySelector(".selecionado");

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
    console.log("comparei")

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
        console.log("acertou")
        numPares--;
    }
    else {
        frentePrimeira.classList.remove("escondido");
        versoPrimeira.classList.add("escondido");

        frenteSegunda.classList.remove("escondido");
        versoSegunda.classList.add("escondido");
        console.log("Fastao errou")
    }

    console.log("desfazer")
    primeira.classList.remove("primeira");
    segunda.classList.remove("segunda");

    if(numPares === 0) {
        encerrarJogo();
    }
}

function encerrarJogo() {
    if(minutos > 0){
        alert("Você ganhou em " + numJogadas +"jogadas e em " + minutos + " minutos e "+ segundos + " segundos");
    }
    else{
        alert("Você ganhou em " + numJogadas +"jogadas e em " + segundos + " segundos!");
    }
    
    const reiniciar = prompt("Gostaria de jogar novamente?");
    if(reiniciar === "sim") {
        numCartas = prompt("Com quantas cartas você quer jogar?");
        numPares = numCartas/2;
        numJogadas = 0;
    }
    else{
        alert("Obrigado pelo seu tempo!")
    }
}
