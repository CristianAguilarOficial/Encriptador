// 1. Funciones de Utilidad
// ========================

// Obtiene el texto ingresado en el campo de entrada
function obtenerTexto() {
  return document.getElementById("texto").value;
}

// Muestra el resultado en la interfaz y habilita el botón de copiar
function mostrarResultado(resultado) {
  document.getElementById("d_resultado_h").style.display = "none";

  const textoResultado = document.getElementById("texto2");
  textoResultado.value = resultado;
  textoResultado.style.display = "initial";

  document.getElementById("copiar").style.display = "initial";
}

// Alerta al usuario si el texto ingresado es vacío o tiene solo un carácter
function alertarTextoVacio() {
  const alerta = document.getElementById("alertaPersonalizada");
  alerta.style.display = "block"; // Mostrar la alerta
  setTimeout(cerrarAlerta, 3000); // Cerrar automáticamente después de 3 segundos
  document.getElementById("texto").focus();
}

function cerrarAlerta() {
  const alerta = document.getElementById("alertaPersonalizada");
  alerta.style.display = "none"; // Ocultar la alerta
}

// Copia el texto del área de resultado al portapapeles
function copiarTexto() {
  const texto = document.getElementById("texto2").value;

  navigator.clipboard.writeText(texto).then(
    function () {
      actualizarBotonCopiar();
    },
    function (err) {
      console.error("Error: ", err);
    }
  );
}

// Actualiza el botón de copiar despues de una copia exitosa
function actualizarBotonCopiar() {
  const botonCopiar = document.getElementById("copiar");

  botonCopiar.style.transition = "400ms";
  botonCopiar.style.backgroundColor = "#5fc981";
  botonCopiar.style.borderColor = "#5fc981";
  botonCopiar.style.color = "#000000";
  botonCopiar.innerHTML = "Copiado exitosamente";
}

// Restaura el estilo original del botón de copiar
function resetearBotonCopiar() {
  const botonCopiar = document.getElementById("copiar");

  botonCopiar.style.transition = "400ms";
  botonCopiar.style.backgroundColor = "transparent";
  botonCopiar.style.borderColor = "#ffffff";
  botonCopiar.style.fontWeight = "normal";
  botonCopiar.style.color = "#ffffff";
  botonCopiar.innerHTML = "Copiar";
}

// Valida el texto ingresado para asegurar que cumple con las reglas
function validarTexto(texto) {
  let esValido = true;
  const input = document.getElementById("texto");

  // Convierte el texto a minúsculas
  input.value = texto.toLowerCase(); //buenisimo el toLowerCase

  const mensajeError = document.getElementById("ErrorMsg");
  const patron = /^[a-z0-9ñ ]+$/; // Patrón que solo permite letras minúsculas, números y espacios

  // Verifica si el texto cumple con el patrón
  if (texto.length >= 1) {
    esValido = patron.test(texto);
  }

  // Actualiza el estado de validacion del texto
  actualizarEstadoValidacion(esValido, mensajeError);
}

// Actualiza el estado de validación y el estilo del mensaje de error
function actualizarEstadoValidacion(esValido, mensajeError) {
  const encriptarBtn = document.getElementById("encriptar");
  const desencriptarBtn = document.getElementById("desencriptar");

  if (esValido) {
    mensajeError.style.transition = "300ms";
    mensajeError.style.transform = "scale(1)";
    mensajeError.style.color = "#495057";
    encriptarBtn.disabled = false;
    desencriptarBtn.disabled = false;
  } else {
    mensajeError.style.transition = "300ms";
    mensajeError.style.transform = "scale(1.1)";
    mensajeError.style.color = "red";
    encriptarBtn.disabled = true;
    desencriptarBtn.disabled = true;
  }
}

// Resetea el boton de copiar si el texto es vacío y valida el texto ingresado
function resetButton() {
  const texto = obtenerTexto();
  if (texto.length <= 1) {
    resetearBotonCopiar();
  }
  validarTexto(texto);
}

// Encripta el texto usando estas reglas
function encriptar(texto) {
  return texto
    .replace(/e/g, "enter")
    .replace(/i/g, "imes")
    .replace(/a/g, "ai")
    .replace(/o/g, "ober")
    .replace(/u/g, "ufat");
}

// Desencripta el texto encriptado usando estas reglas
function desencriptar(texto) {
  return texto
    .replace(/enter/g, "e")
    .replace(/imes/g, "i")
    .replace(/ai/g, "a")
    .replace(/ober/g, "o")
    .replace(/ufat/g, "u");
}

// Función principal para encriptar el texto
function encriptarTexto() {
  const textoOriginal = obtenerTexto();

  if (textoOriginal.length <= 1) {
    alertarTextoVacio(); // Alerta al usuario si el texto es vacío o tiene solo un carácter
    return;
  }

  const textoEncriptado = encriptar(textoOriginal);
  mostrarResultado(textoEncriptado);
}

// Función principal para desencriptar el texto
function desencriptarTexto() {
  const textoOriginal = obtenerTexto();

  if (textoOriginal.length <= 1) {
    alertarTextoVacio(); // validar el texto pero en desencriptar
    return;
  }

  const textoDesencriptado = desencriptar(textoOriginal);
  mostrarResultado(textoDesencriptado);
}
