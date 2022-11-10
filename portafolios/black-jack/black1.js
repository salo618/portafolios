let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];
let puntosJugador = 0;
let puntosComputadora = 0;
let btnPedir = document.querySelector("#btnPedir");
const btnParar = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");
let divCartaJugador = document.querySelector("#jugador-cartas");
let divCartaComputadora = document.querySelector("#computadora-cartas");
let puntosHTML = document.querySelectorAll("small");
const creardeck = () => {
    for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
        deck.push(i + tipo);
    }
}
    for (tipo of tipos) {
    for (let esp of especiales) {
        deck.push(esp + tipo);
    }
}
  console.log(deck);
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};
creardeck();

const pedirCarta = () => {
  if (deck === 0) {
    throw "no hay cartas en el deck";
  }
  const cartas = deck.pop();
  return cartas;
};
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  /*let puntos = 0;
if (isNaN(valor)){
    puntos = (valor === "A") ? 11 : 10;
}else{
    puntos = valor * 1;
}*/
 // const imgCarta = ` <img class="imgCarta" src="./images/cartas/${cartas}.png">`;
  //divCartaComputadora.innerHTML += imgCarta;
};
const turnoComputadora = (puntosMinimos) => {
    do{
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerHTML = puntosComputadora;
        const imgCarta = ` <img class="carta" src="./images/cartas/${carta}.png">`;
        divCartaComputadora.innerHTML += imgCarta;  
        if(puntosMinimos>21){
            break;
        }
    } while((puntosComputadora<puntosMinimos)&&(puntosMinimos<=21));
    setTimeout( () => {
        if(puntosComputadora === puntosMinimos){
            alert("Emparte");
        }
        else if(puntosMinimos>21){
            alert("Computadora Gana");
        }
        else if(puntosComputadora>21){
            alert("Jugador Gana");
        }
        else{
            alert("Computadora Gana")
        }
        
        },1000);
};

btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);
  puntosHTML[0].innerHTML = puntosJugador;
  const imgCarta = ` <img class="carta" src="./images/cartas/${carta}.png">`;
  divCartaJugador.innerHTML += imgCarta;
  if (puntosJugador > 21){
    console.warn("Lo siento has perdido");
    btnPedir.disabled = true;
    btnParar.disabled = true;
    turnoComputadora(puntosJugador);
  }
  if(puntosJugador == 21){
    console.warn("Genial tienes 21 puntos");
    btnPedir.disabled = true;
    btnParar.disabled = true;
    turnoComputadora(puntosJugador);
  }
  //<img class="carta" alt="imagen" src="./images/cartas/2C.png">
  //<img class="carta" alt="imagen2" src="./images/cartas/2C.png">
});
btnParar.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnParar.disabled = true;
    turnoComputadora(puntosJugador);
});
btnNuevo.addEventListener("click", () => {
    location.reload();
});