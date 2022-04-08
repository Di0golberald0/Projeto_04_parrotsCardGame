let numCartas = prompt("Com quantas cartas você quer jogar?");

if(numCartas < 4 || numCartas%2!==0 || numCartas > 14){
    repetirNumCartas();
}

function repetirNumCartas(){
    do {numCartas = prompt("Valor inválido. Favor, entrar outro")}
    while(numCartas < 4 || numCartas%2 !==0 || numCartas > 14)
}



