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
    pantalla.innerText = '2 + 4';
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
        divFila.appendChild(boton);
        });
        botones.appendChild(divFila);
    });
    return botones;
}


crearCalculadora();



