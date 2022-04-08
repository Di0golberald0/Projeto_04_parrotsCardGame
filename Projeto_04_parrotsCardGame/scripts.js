const memes = ["./Imagens/bobrossparrot.gif", "./Imagens/explodyparrot.gif", "./Imagens/fiestaparrot.gif", "./Imagens/metalparrot.gif", "./Imagens/revertitparrot.gif", "./Imagens/tripletsparrot.gif", "./Imagens/unicornparrot.gif"];

let numCartas = prompt("Com quantas cartas você quer jogar?");

if(numCartas < 4 || numCartas%2!==0 || numCartas > 14){
    repetirNumCartas();
}
else{
    montarBaralho();
}

function repetirNumCartas(){
    do {numCartas = prompt("Valor inválido. Favor, entrar outro")}
    while(numCartas < 4 || numCartas%2 !==0 || numCartas > 14)
}

memes.sort(comparador);


function comparador() { 
	return Math.random() - 0.5; 
}


function montarBaralho() {
    const baralho = document.querySelector(".card-space");
    baralho.innerHTML = "";
    console.log(memes)
    for (let i = 0; i < numCartas; i++) {
        baralho.innerHTML += `
        <div class="card" onclick="virarCarta(this)">
        <img class="frente" src="./Imagens/front.png"/>
        <img class="verso escondido" src=""/>
        </div>
        `;
    }
}

function virarCarta(elemento){


}