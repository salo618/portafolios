/*
*2C= two of clubs/dos de treboles
*2D = two of diamonds/dos de diamantes
*2H = two of hearts/dos de corazones
*2S = two of swords/dos de espadas
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S' ];
const especiales= ['A', 'J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias al HTML

const btnPedir = document.querySelector('#btnPedir');
const btnDetener= document.querySelector('#btnDetener');
const btnNuevo= document.querySelector('#btnNuevo')

const divCartaJugador =document.querySelector('#jugador-cartas');
const divCartaComputadora=document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');

const crearDeck =()=>{
    for (let i=2; i <= 10; i++){
        for(let tipo of tipos){
        deck.push(i+tipo);
    }
}
for(let tipo of tipos){
    for(let esp of especiales){
        deck.push(esp + tipo);
        }
    }
    console.log(deck);
    deck= _.shuffle(deck);
    console.log(deck);

    return deck;

}
crearDeck();


//esta funcion permite tomar una carta

const pedirCarta = () => {
    if(deck.length === 0){
        throw 'No hay cartas en el deck';
        //valor de las cartas
    }
    const carta = deck.pop();
    return carta;
}
const valorCarta = (carta) =>{
    const valor = carta.substring(0, carta.length - 1);
    return(isNaN(valor)) ? (valor === 'A') ? 11 : 10: valor * 1;
};

const turnoComputadora = (puntosMinimos)=>{
    do{
        const carta = pedirCarta();
        
        puntosComputadora = puntosComputadora + valorCarta (carta);
        puntosHTML[1].innerHTML =puntosComputadora;
        

        
        const imgCarta = ` <img class="carta" src="./images/cartas/${carta}.png">`;
        divCartaComputadora.innerHTML += imgCarta; 

        if(puntosMinimos>21){
            break;
        }
    }while((puntosComputadora<puntosMinimos)&&(puntosMinimos<=21));


setTimeout(()=>{
    if (puntosComputadora === puntosMinimos){
        alert ('Empate');
    }else if (puntosMinimos > 21){ 
        alert ('Computadora Gana');
    }else if(puntosComputadora>21){
        alert ('Jugador Gana');
    }else{
        alert ('Computadora Gana');
    }
},1000);
}
btnPedir.addEventListener('click',() =>{
    
    const carta = pedirCarta();
    puntosJugador= puntosJugador + valorCarta(carta);
    puntosHTML[0].innerHTML = puntosJugador;
    //<img class="carta" src="images/cartas/2C.png">

    const imgCarta = ` <img class="carta" src="./images/cartas/${carta}.png">`;
    divCartaJugador.innerHTML += imgCarta;

    if(puntosJugador > 21){
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
        }else if(puntosJugador===21){
            console.warn('¡Genial tienes 21 puntos!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
    }
});
btnDetener.addEventListener('click',()=>{
    btnPedir.disabled=true;
    btnDetener.disabled=true;
    turnoComputadora(puntosJugador);
});
btnNuevo.addEventListener('click', () =>{
    console.clear();
    deck =[];
    deck =crearDeck();

    puntosJugador     = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartaComputadora.innerHTML='';
    divCartaJugador.innerHTML ='';

    btnPedir.disabled  =false;
    btnDetener.disabled=false;
});