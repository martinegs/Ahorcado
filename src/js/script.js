var intentos = 6;
var arrCoincidencias = [];
const palabrAdivinar = ingresarPalabra();

creaTablero(palabrAdivinar);


  const letra = document.querySelector("input");

  letra.oninput = function () {
    let ganastePerdiste = document.getElementById("resultado");

    if (ganastePerdiste.innerHTML === "") {
      if (soloLetras(letra.value)) {
        mostrarTablero(letra.value);
        buscarCoincidencia(letra.value);
      }
    }
  };

function ingresarPalabra() {
  let validar = false;
  const pattern = /^[a-zA-Z]+$/;
  let palabra = "";

  do {
    palabra = prompt("Ingresa una palabra para adivinar!");
    console.log(typeof palabra);

    if(pattern.test(palabra)){
      validar=true;
    }

  } while (!validar);
  
  const arrPalabra = palabra.split("");
  console.log(arrPalabra);

  return arrPalabra;
}

function creaTablero(arrPalabra) {
  let tablero = document.getElementById("tablero");
  let tablaHTML = "<table><tr>";

  arrPalabra.forEach((letra) => {
    arrCoincidencias.push("?");
  });
  console.log(arrCoincidencias);

  for (let i = 0; i < arrCoincidencias.length; i++) {
    tablaHTML += "<td>" + arrCoincidencias[i] + "</td>";
  }

  tablaHTML += "</tr></table>";
  tablero.innerHTML = tablaHTML;

  document.getElementById("intentos").innerHTML = "Intentos restantes: " + intentos;
}

function soloLetras(cadena) {
  const pattern = new RegExp("[a-zA-Z]"); 
  console.log(pattern.test(cadena));

  if (!pattern.test(cadena)) {
    document.querySelector("input").value = "";
    document.getElementById("status").innerHTML = "Solo puedes ingresar letras!!!..";
    return false;
  } else {
    return true;
  }
}

function buscarCoincidencia(letra) {
  let tablero = "";
  let coincidencias = 0;

  palabrAdivinar.forEach((caracter) => {
    if (caracter == letra) {
      console.log(caracter);
      coincidencias += 1;
    }
  });

  if (coincidencias > 0) {
    document.getElementById("status").innerHTML = `Hubo ${coincidencias} coincidencias!!!`;

    if (arrCoincidencias.indexOf("?") == -1) {
      document.getElementById("resultado").innerHTML = "¡Ganaste!";

      const boton = document.createElement('button');
    
      boton.textContent = 'Seguir jugando';
      
      boton.addEventListener('click', function() {
        location.reload();
      });
      
      const contenedor = document.getElementById('jugarDeNuevo');
      contenedor.appendChild(boton);

    }
  } else {
    intentos--;
    document.getElementById("status").innerHTML = `No hubo coinciencias :(`;
    document.getElementById("intentos").innerHTML = "Intentos restantes: " + intentos;

    if (intentos == 0) {
      document.getElementById("resultado").innerHTML = `Perdiste`;

      const boton = document.createElement('button');
    
      boton.textContent = 'Seguir jugando';
      
      boton.addEventListener('click', function() {
        location.reload();
      });
      
      const contenedor = document.getElementById('jugarDeNuevo');
      contenedor.appendChild(boton);
    }
  }

  let imagen = document.getElementById("imagen");

  switch (intentos) {
    case 0:
      imagen.src = "img/0.png";
      break;

    case 1:
      imagen.src = "img/1.png";
      break;

    case 2:
      imagen.src = "img/2.png";
      break;

    case 3:
      imagen.src = "img/3.png";
      break;

    case 4:
      imagen.src = "img/4.png";
      break;

    case 5:
      imagen.src = "img/5.png";
      break;
  }
}

function mostrarTablero(letra) {
  let tablero = document.getElementById("tablero");
  let tablaHTML = "<table><tr>";

  for (let i = 0; i < palabrAdivinar.length; i++) {
    if (palabrAdivinar[i] == letra) {
      arrCoincidencias[i] = letra;
    }
  }

  for (i = 0; i < arrCoincidencias.length; i++) {
    if (arrCoincidencias[i]!=="?") {
      tablaHTML += `<td style="background-color: green;">${arrCoincidencias[i]}</td>`;
    }else{
    tablaHTML += "<td>" + arrCoincidencias[i] + "</td>";
    }
  }

  tablaHTML += "</tr></table>";
  tablero.innerHTML = tablaHTML;
}
