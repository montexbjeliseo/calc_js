const app = document.getElementById("app");

function crearCalculadora (){
    const calculadora = document.createElement('div');
    calculadora.classList.add('calculadora');
    app.appendChild(calculadora);
    calculadora.appendChild(crearPanelSuperior());
}
function crearPanelSuperior(){
    const panelSuperior= document.createElement('div');
    panelSuperior.appendChild(crearPantalla());
    return panelSuperior;
}

function crearPantalla(){
    const pantalla= document.createElement('div');
    pantalla.classList.add('pantalla');
    return pantalla;
}



crearCalculadora();



