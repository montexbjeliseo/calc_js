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
    //pantalla.innerText = '2 + 4';
    pantalla.classList.add('pantalla');
    pantalla.id="pantalla";
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
        ['AC', '←', '( )', '%'],
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
        boton.classList.add("boton");
        switch(valor){
            case 'AC': 
                boton.classList.add("rojo");
                break;
            case '←': 
                boton.classList.add("naranja");
                break;
            case '=': 
                boton.classList.add("igual");
                break;
            case '%': 
                boton.disabled=true;
                break;
            case '*':
            case '-':
            case '+':
            case '/':
                boton.classList.add("celeste");
                break;
            default: 
                boton.classList.add("numero");
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
    const pantalla= document.getElementById("pantalla");
    const valor=evento.target.innerText;
    let expresion= pantalla.innerText;
    switch(valor){
        case 'AC':
            pantalla.innerText="";
            break;
        case '←':
            pantalla.innerText = expresion.substring(0, expresion.length - 1);
            break;
        case '=':
            try {
                pantalla.innerText=eval(expresion);
            } catch (error) {
                console.log(error);
            }
            break;
        case '*':
        case '-':
        case '+':
        case '/':
            pantalla.innerText=ponerOperador(expresion, valor);
            break;
        case '( )':
            pantalla.innerText=ponerParentesis(expresion); 
            break;    
        default:
            pantalla.innerText+=valor;
            break; 
    } 

}

function ponerOperador(expresion, valor){
    const ultimaEntrada=expresion[expresion.length-1];
    //Si la Última Entrada NO es igual a /*+-()
    //Y NO esta Vacia
    if (!"/*+-(".includes(ultimaEntrada)&& ultimaEntrada!=="" || 
    (expresion == "" || ultima_entrada == "(") && operador == "-"){
        return expresion+valor;
    }  
    return expresion;
}

function ponerParentesis(expresion){
    let parentesisAbierto = 0;
    let parentesisCerrado = 0;
    let operadores = ["-", "+", "*", "/"];
    let ultimaEntrada = expresion[expresion.length-1];
    if (expresion === '' || operadores.includes(ultimaEntrada) || ultimaEntrada === '(') {
        return expresion +'(';
    }
    for (let caracter of expresion) {
        if (caracter === '(') {
            parentesisAbierto++;
        } else if (caracter === ')'){
            parentesisCerrado++;
        }
        
    }

    if (parentesisAbierto > parentesisCerrado && !operadores.includes(ultimaEntrada) &&
    ultimaEntrada != '(') {
        return expresion+')';
    } 

    //No se pueden agregar mas parentesis 
    return expresion;
}


crearCalculadora();



