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
    let cartaUm = document.querySelector(".cartaUm");
    let cartaDois = document.querySelector(".cartaDois");
    
    console.log("elemento = " + elemento)
    console.log("cartaUm = " + cartaUm)

    if(cartaUm === null) {
        elemento.classList.add("selecionado", "cartaUm");
        virarCarta();
        elemento.classList.remove("selecionado")
    }
    else if(cartaDois === null){
        elemento.classList.add("selecionado", "cartaDois");
        virarCarta();
        elemento.classList.remove("selecionado");

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

    let cartaUm = document.querySelector(".cartaUm");
    let cartaDois = document.querySelector(".cartaDois");

    let frentecartaUm = document.querySelector(".cartaUm .frente");
    let versocartaUm = document.querySelector(".cartaUm .verso");

    let frentecartaDois = document.querySelector(".cartaDois .frente");
    let versocartaDois = document.querySelector(".cartaDois .verso");

    const cartaUmImagem = document.querySelector(".cartaUm .verso ").src;
    const cartaDoisImagem = document.querySelector(".cartaDois .verso").src;

    console.log("cartaUm " + cartaUm)
    console.log("cartaDois " + cartaDois)
    console.log("cartaUmImagem " + cartaUmImagem)
    console.log("cartaDoisImagem " + cartaDoisImagem)

    if(cartaUmImagem === cartaDoisImagem) {
        cartaUm.classList.add("acertada");
        cartaDois.classList.add("acertada");

        numPares--;
        
        console.log("ACERTOU")
        console.log(numPares)
    }
    else {
        frentecartaUm.classList.remove("escondido");
        versocartaUm.classList.add("escondido");

        frentecartaDois.classList.remove("escondido");
        versocartaDois.classList.add("escondido");

        cartaUm.setAttribute("onclick","selecionarCarta(this)");
        cartaDois.setAttribute("onclick","selecionarCarta(this)");

        console.log("ERROU")
    }

    cartaUm.classList.remove("cartaUm");
    cartaDois.classList.remove("cartaDois");

    console.log("DESFIZ")

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
