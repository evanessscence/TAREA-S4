
const form = document.querySelector("form");
const cedulaField = document.getElementById("cedula");
const nombreField = document.getElementById("nombre");
const apellidosField = document.getElementById("apellidos");
const departamentoField = document.getElementById("departamento");
const motivosText = document.getElementById("motivos");

document.addEventListener("DOMContentLoaded", function(event){
  let objectArray = JSON.parse(localStorage.getItem("formObject")) || [];
  objectArray.forEach(
    function(arrayObject){
      insertarInfo(arrayObject);

    }
  )
})

form.addEventListener("submit", function(event){
  event.preventDefault();

  if(!validarForm()){
    return;
  }

  let formData = new FormData(form);
  let formObject =  formDataObjetc(formData);
  guardarInfo(formObject);
  insertarInfo(formObject);

  form.reset();
})

cedulaField.addEventListener("blur", validarCedula);
nombreField.addEventListener("blur", (e) => validarTexto("Este campo es obligatorio.", e));
apellidosField.addEventListener("blur", (e) => validarTexto("Este campo es obligatorio.", e));
departamentoField.addEventListener("blur", validarDepartamento);
motivosText.addEventListener("blur", (e) => validarTexto("Este campo es obligatorio.", e))


function validarForm(){

    let valido = true;

    if (!validarCedula({ target: cedulaField })) {
      valido = false;
    }
    if (!validarTexto("Este campo es obligatorio.", { target: nombreField })) {
      valido = false;
    }
    if (!validarTexto("Este campo es obligatorio.", { target: apellidosField })) {
      valido = false;
    }
    if (!validarDepartamento({ target: departamentoField })) {
      valido = false;
    }
    if (!validarTexto("Este campo es obligatorio.", { target: motivosText })) {
      valido = false;
    }
  
    return valido;

  
}



function validarTexto(mensaje, e){
  const mainField = e.target;
  const mainValue = e.target.value;
  if (mainValue.trim().length == 0){
    mainField.nextElementSibling.classList.add("error");
    mainField.nextElementSibling.innerText = mensaje;
    return false;
  }else{
    mainField.nextElementSibling.classList.remove("error");
    mainField.nextElementSibling.innerText = "";
    return true;
  }
}

function regexCedula(cedula){
  let regex = /\d\d\d-\d\d\d\d\d\d-\d\d\d\d[A-Za-z]+/i;
  return regex.test(cedula.trim()); 
}

function validarCedula(e){
  const mainField = e.target;
  const mainValue = e.target.value;
  if(mainValue.trim().length == 0){
    mainField.nextElementSibling.classList.add("error");
    mainField.nextElementSibling.innerText = "El campo cédula es obligatorio.";
    return false;
  }else if(mainValue.trim().length < 16){
    mainField.nextElementSibling.classList.add("error");
    mainField.nextElementSibling.innerText = "El número de cédula debe tener 16 dígitos";
    return false;
  }else if(!regexCedula(mainValue)){
    mainField.nextElementSibling.classList.add("error");
    mainField.nextElementSibling.innerText = "Sigue el formato: 999-999999-9999X";
    return false;
  }else{
    mainField.nextElementSibling.classList.remove("error");
    mainField.nextElementSibling.innerText = "";
    return true;
  }
}

function validarDepartamento(e){
  const mainField = e.target;
  const mainValue = e.target.value;
  if(mainValue == "Seleccione una opción..."){
    mainField.nextElementSibling.classList.add("error");
    mainField.nextElementSibling.innerText = "Este campo es obligatorio.";
    return false;
  }else{
    mainField.nextElementSibling.classList.remove("error");
    mainField.nextElementSibling.innerText = "";
    return true;
  }
}


function formDataObjetc(formData){
  let ced = formData.get("cedula");
  let nombre = formData.get("nombre");
  let apellido = formData.get("apellidos");
  let departamento = formData.get("departamento");
  let motivo = formData.get("motivos");
  return{ 
    "ced" : ced ,
    "nombre" : nombre,
    "apellido" : apellido,
    "departamento" : departamento,
    "motivo" : motivo }
}

function insertarInfo(formObject) {
  const tabla = document.getElementById("tablaVisitantes").querySelector("tbody");

  const newRow = tabla.insertRow();

  const celdaCedula = newRow.insertCell(0);
  celdaCedula.textContent = formObject.ced;

  const celdaNombre = newRow.insertCell(1);
  celdaNombre.textContent = formObject.nombre;

  const celdaApellido = newRow.insertCell(2);
  celdaApellido.textContent = formObject.apellido;

  const celdaDept = newRow.insertCell(3);
  celdaDept.textContent = formObject.departamento;

  const celdaMotivo = newRow.insertCell(4);
  celdaMotivo.textContent = formObject.motivo;
}


function guardarInfo(formObject) {
  let objectArray = JSON.parse(localStorage.getItem("formObject")) || [];
  objectArray.push(formObject);

  let ObjJSON = JSON.stringify(objectArray);
  localStorage.setItem("formObject", ObjJSON);
}


