let formResult = {};
let lastIndex = 0;

function muestraMensaje(value) {
    console.log(value);
};


/////////////////////// CREO Y CONFIGURO EL BLOQUE Y SUS EVENTOS ///////////
function setBlock(index) {
    var newBlock = document.createElement('div');
    newBlock.id = 'block' + index;
    newBlock.name = "Bloque " + index;
    newBlock.className = 'block-card';

    const blockSelected = document.getElementById("blockSelected");

    newBlock.onmouseover = function () {
        newBlock.classList.add("block-hover");
    }
    newBlock.onmouseout = function () {
        newBlock.classList.remove("block-hover");
    };

    newBlock.onclick = function () {
        blockSelected.innerHTML = "Bloque Seleccionado:" + index;
        blockSelected.classList.add("block-click");
        setTimeout(() => {
            blockSelected.classList.remove("block-click");
        }, 500);
    }

    return newBlock;
};
////////////////////////////////////////////////////////////////////




/////////////////////// CREO Y CONFIGURO LOS INPUT ///////////
function setInput(index, span) {
    const input = document.createElement("input");
    input.type = 'text';
    input.className = 'input-text';
    input.name = "inputText" + index;

    // input.onchange = function (evt) {
    //     span.innerHTML = "Texto: " + this.value;
    //     // formResult.add({[this.name] : this.value});

    //     formResult = Object.assign(formResult, { [this.name]: this.value })

    //     console.log(formResult);
    // };

    var onChange = function (evt) {
        span.innerHTML = "Texto: " + this.value;
        // formResult.add({[this.name] : this.value});

        formResult = Object.assign(formResult, { [this.name]: this.value });

        updateResult();

        console.log(formResult);
    };

    input.addEventListener('input', onChange, false);

    return input;
}
///////////////////////////////////////////////////////////////////////////////////////////



/////////////////////// ACTUALIZA EL OBJETO ///////////
function updateResult(){
    const result = document.getElementById("result");
    result.innerHTML = JSON.stringify(formResult, undefined, 2);
}
////////////////////////////////////////////////////////


// function nextIndex(){
//     const testForm = document.testForm;

//     while (testForm.firstChild) {
//         testForm.removeChild(testForm.firstChild);
//     };
// }


/////////////////////// MÉTODO INVOCADO AL PRESIONAR + ///////////
function createBlock() {

    // Obtengo todos los bloques para saber el index
    // const blockCard = document.getElementsByClassName("block-card");
    // nextIndex();
    const index = ++lastIndex;

    // Obtengo el form
    const testForm = document.testForm;

    // Creo el bloque
    const newBlock = setBlock(index);

    // Creo el Span del valor del input
    const span = document.createElement("span");
    span.innerHTML = "Texto: ";

    // Creo el input
    const input = setInput(index, span);

    // Creo el título del bloque
    const blockTitle = document.createElement("h2");
    blockTitle.innerHTML = "Bloque " + index;

    // Creo el botón de eliminar bloque
    const buttonRemove = document.createElement("button");
    buttonRemove.innerHTML = "Eliminar";
    buttonRemove.className = "button-remove";
    buttonRemove.type = "button";

    // buttonRemove.addEventListener("click", function (event) {
    //     event.preventDefault();
    //     testForm.removeChild(newBlock);
    // });

    buttonRemove.onclick = function (event){
        event.preventDefault();
        delete formResult[input.name];
        updateResult();
        testForm.removeChild(newBlock);
    }



    // Append
    newBlock.appendChild(blockTitle);
    newBlock.appendChild(input);
    newBlock.appendChild(span);
    newBlock.appendChild(buttonRemove);

    testForm.appendChild(newBlock);
}

// Limpio el form
function clearForm() {
    console.log("Clear");
    const testForm = document.testForm;

    while (testForm.firstChild) {
        testForm.removeChild(testForm.firstChild);
    };

    formResult = {};

    updateResult();
};

// Se ejecuta una vez que se renderizó la página
// window.onload = function () {
//     var btnAdd = document.getElementById("btn_agregar");
//     btnAdd.onclick = createBlock;
// }
