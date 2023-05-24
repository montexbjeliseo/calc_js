const app = document.getElementById("app");

function crearCalculadora() {
    const calculadora = document.createElement('div');
    calculadora.classList.add('calculadora');
    calculadora.appendChild(crearMarca());
    calculadora.appendChild(crearPanelSuperior());
    calculadora.appendChild(crearPanelInferior());
    return calculadora;
}
function crearPanelSuperior() {
    const panelSuperior = document.createElement('div');
    panelSuperior.appendChild(crearPantalla());
    panelSuperior.appendChild(crearBotonAlternarTema());
    panelSuperior.classList.add('panelSuperior');
    return panelSuperior;
}

function crearPantalla() {
    const pantalla = document.createElement('div');
    //pantalla.innerText = '2 + 4';
    pantalla.classList.add('pantalla');
    pantalla.id = "pantalla";
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
            switch (valor) {
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
                    boton.disabled = true;
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

function onClickBoton(evento) {
    const pantalla = document.getElementById("pantalla");
    const valor = evento.target.innerText;
    let expresion = pantalla.innerText;
    switch (valor) {
        case 'AC':
            pantalla.innerText = "";
            break;
        case '←':
            pantalla.innerText = expresion.substring(0, expresion.length - 1);
            break;
        case '=':
            try {
                pantalla.innerText = eval(expresion);
            } catch (error) {
                console.log(error);
            }
            break;
        case '*':
        case '-':
        case '+':
        case '/':
            pantalla.innerText = ponerOperador(expresion, valor);
            break;
        case '( )':
            pantalla.innerText = ponerParentesis(expresion);
            break;
        case '.':
            pantalla.innerText = ponerDecimal(expresion);
            break;
        default:
            pantalla.innerText = ponerNumero(expresion, valor);
            break;
    }

}

function ponerOperador(expresion, valor) {
    const ultimaEntrada = expresion[expresion.length - 1];
    //Si la Última Entrada NO es igual a /*+-()
    //Y NO esta Vacia
    if (!"/*+-(".includes(ultimaEntrada) && ultimaEntrada !== "" ||
        (expresion == "" || ultima_entrada == "(") && operador == "-") {
        return expresion + valor;
    }
    return expresion;
}

function ponerParentesis(expresion) {
    let parentesisAbierto = 0;
    let parentesisCerrado = 0;
    let operadores = ["-", "+", "*", "/"];
    let ultimaEntrada = expresion[expresion.length - 1];
    if (expresion === '' || operadores.includes(ultimaEntrada) || ultimaEntrada === '(') {
        return expresion + '(';
    }
    for (let caracter of expresion) {
        if (caracter === '(') {
            parentesisAbierto++;
        } else if (caracter === ')') {
            parentesisCerrado++;
        }

    }

    if (parentesisAbierto > parentesisCerrado && !operadores.includes(ultimaEntrada) &&
        ultimaEntrada != '(') {
        return expresion + ')';
    }

    //No se pueden agregar mas parentesis 
    return expresion;
}

function ponerDecimal(expresion) {
    // Cualquiera de estos caracteres,
    // Nos va a marcar un límite, el principio del término
    let limite = "()/-+*";

    let index = -1;

    // Recorremos de atrás para delante
    for (let i = expresion.length - 1; i > -1; i--) {
        if (limite.includes(expresion[i])) {
            // Se encontró un límite
            index = i + 1;
            break;
        }
    }

    // Suponemos que la expresión es un solo término
    let termino = expresion;

    // Sin embargo
    // De haberse encontrado un índice
    if (index > 0) {
        // Se recorta el último término
        termino = expresion.substring(index, expresion.length);
    }

    // Podemos agregarlo
    if (!termino.includes(".") && termino != "") {
        return expresion + ".";
    }

    // No efectúa ningún cambio
    return expresion;

}

function ponerNumero(expresion, valor) {
    let ultima_entrada = expresion[expresion.length - 1];
    // Si la expresion es distinto de 0 y la última entrada
    // NO es un paréntesis de cierre
    if (expresion != "0" && ultima_entrada != ")") {
        // Se agregar el valor
        return expresion + valor;
        // En cambio
        // Si la expresión es 0
    } else if (expresion == "0") {
        // Reemplaza el cero por el nuevo valor
        return valor;
    }
    // No se efectúa cambios
    return expresion;
}

function crearBotonAlternarTema() {
    let switchContainer = document.createElement("label");
    switchContainer.classList.add("switch");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    switchContainer.appendChild(checkbox);
    let slider = document.createElement("span");
    slider.classList.add("slider");
    slider.classList.add("round");
    switchContainer.appendChild(slider);
    switchContainer.addEventListener("change", alternarTema);
    return switchContainer;
}

function alternarTema(event) {
    document.body.classList.toggle("dark");
}

function crearMarca() {
    // Panel Titulo
    let panelBajo = document.createElement('div');
    panelBajo.innerText = 'INFORMATORIO';
    panelBajo.style.display = 'flex';
    panelBajo.style.alignItems = 'center';
    panelBajo.style.justifyContent = 'center';
    panelBajo.style.padding = '5px';
    return panelBajo;
}

app.appendChild(crearCalculadora());



