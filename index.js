const app = document.getElementById("app");

function crearCalculadora (){
    const calculadora = document.createElement('div');
    calculadora.classList.add('calculadora');
    app.appendChild(calculadora);
    calculadora.appendChild(crearPanelSuperior());
    calculadora.appendChild(crearPanelInferior());
}
function crearPanelSuperior(){
    const panelSuperior= document.createElement('div');
    panelSuperior.appendChild(crearPantalla());
    panelSuperior.classList.add('panelSuperior');
    return panelSuperior;
}

function crearPantalla(){
    const pantalla= document.createElement('div');
    pantalla.id = 'pantalla'
    // pantalla.innerText = '2 + 4';
    pantalla.classList.add('pantalla');
    return pantalla;
}

function crearPanelInferior() {
    const panelInferior = document.createElement('div');
    panelInferior.classList.add('panelInferior');
    panelInferior.appendChild(crearBotones());  
    return panelInferior;
}

function crearBotones() {
    let valoresBotones = [
        ['C', '←', '( )', '%'],
        ['7', '8', '9', '*'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['.', '0', '=', '/'],
    ];
    const botones = document.createElement('div');
    valoresBotones.forEach((fila) => {
        const divFila = document.createElement('div');
        fila.forEach((valor) => {
        const boton = document.createElement('button');
        const texto = document.createTextNode(valor);
        boton.appendChild(texto);
        boton.classList.add('boton');
        divFila.appendChild(boton);
        switch(valor) {
            case 'C':
                boton.classList.add('rojo');
                break;
            case '←':
                boton.classList.add('naranja');
                break;
            case '=':
                boton.classList.add('igual');
                break;   
            case '%':
                boton.disabled=true;
                break;        

            case '*':
            case '-':
            case '+':
            case '/':
                boton.classList.add('celeste');
                break;
            default:    
                boton.classList.add('numero');
            break;
        }
        boton.addEventListener('click', onClickBoton);
        divFila.appendChild(boton);
        });
        botones.appendChild(divFila);
    });
    return botones;
}

function onClickBoton(evento){
    const pantalla = document.getElementById('pantalla');
    const valor = evento.target.innerText;
    let expresion = pantalla.innerText;
    switch(valor){
        case 'C':
            pantalla.innerText= "";
            break;
        case '←':
            pantalla.innerText = expresion.substring(0, expresion.length - 1);
            break;    
        case '=':
            try {
                pantalla.innerText=eval(expresion)
            } catch (error) {
                console.log(error);
            }    
            break;
            default:
                pantalla.innerText+=valor;
                break;
    }
}
function ponerOperador(expresion, valor) {
    const ultimaEntrada= expresion[expresion.length-1];
    //si la ultima entrada NO es igual a *+-/()
    //y no esta vacia

    if(! "/*+-(".includes(ultimaEntrada)&& ultimaEntrada!==''||
    (expresion == "" || ultima_entrada == "(") && operador == "-") {
        return expresion+valor;
    }
    return expresion;
}



crearCalculadora();





