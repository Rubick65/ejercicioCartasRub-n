/**
 * Fichero principal con la lógica general del juego
 */

var rutaImagenOculta = "imagenes/imagenCarta.png"; // Ruta a la imágen de la carta boca abajo
var imagenVictoria = "imagenes/victoriaYDerrota/imagenVictoria.png"
var imagenDerrota = "imagenes/victoriaYDerrota/imagenDerrota.png";
var listaImagenes = [
    "imagenes/cartasPoker/1.png",
    "imagenes/cartasPoker/2.png",
    "imagenes/cartasPoker/3.png",
    "imagenes/cartasPoker/4.png",
    "imagenes/cartasPoker/5.png",
    "imagenes/cartasPoker/6.png",
    "imagenes/cartasPoker/7.png",
    "imagenes/cartasPoker/8.png",
    "imagenes/cartasPoker/9.png",
    "imagenes/cartasPoker/10.png",
    "imagenes/cartasPoker/11.png",
    "imagenes/cartasPoker/12.png",
    "imagenes/cartasPoker/13.png",
    "imagenes/cartasPoker/14.png",
    "imagenes/cartasPoker/15.png",
    "imagenes/cartasPoker/16.png",
    "imagenes/cartasPoker/17.png",
    "imagenes/cartasPoker/18.png"
];// Imágenes de las cartas
var listaCartasOcultas; // Lista para guardar las cartas ocultas

var tabla = document.getElementById("miTabla"); // Guardamos el elemento table del html
var filas, columnas; // Variables que guardarán el tamaño de la fila y de la columna

var dificultad = parseInt(document.getElementById("opciones").value); // Dificultad seleccionada por el usuario

var cantidadPuntosVictoria;// Variable para guardar la cantidad de puntos necesarios para ganar la partida

var primerPulsacion, bloqueado; // Booleanos para indicar si es la primera pulsación y para ver si el click está bloqueado
    var primeraImagen, segundaImagen; // Variables para guardar las imágenes de los clicks

/**
 * Función para crear la tabla según las filas y columnas indicadas por el usuario
 */
function crearCeldas(){
    // Limpiamos la tabla
    tabla.innerHTML = "";

    // Declaración de variables
    var nuevaFila, nuevaCelda, imagenCarta, contador = 0;
    
    // Sacamos las filas y columnas introducidas por el usuario
    sacarFilaYColumnas();

    // Barajamos la lista de imágenes 
    barajarCartas(listaImagenes);
    crearCartasOcultas();

    // Bucle para recorrer la cantidad de filas ingresadas por el usuario
    for(var i = 0; i < filas; i++){
        // Creamos una nueva fila
        nuevaFila = document.createElement("tr");

        // Bucle para recorrer la cantidad de columnas ingresadas por el usuario
        for(var j = 0; j < columnas; j++){
            // Creamos una nueva celda 
            nuevaCelda = document.createElement("td");

            // Creamos una nueva imagen y le indicamos la ruta
            imagenCarta = document.createElement("img");
            imagenCarta.src = rutaImagenOculta;
            imagenCarta.setAttribute("data-alt-src", listaCartasOcultas[contador]);
            imagenCarta.addEventListener("click",revelarCarta); // Le damos la función del click a las imágenes
            contador++; // Aumentamos el contador

            // Añadimos la imagen a la nueva celda y añadimos la nueva celda a la fila
            nuevaCelda.appendChild(imagenCarta);
            nuevaFila.appendChild(nuevaCelda);
        }

        // Por último añadimos la nueva fila a la tabla
        tabla.appendChild(nuevaFila);
    }

    // Reinciamos variables importantes para el funcionamiento del juego
    reinciarVariablesPartida();
}

/**
 * Función que saca las filas y columnas introducidas por el usuario
 */
function sacarFilaYColumnas(){
    
    filas = parseInt(document.getElementById("filasNum").value) || 2;
    columnas = parseInt(document.getElementById("columnasNum").value) || 2;

    // En caso de que exista una cantidad impar de celdas
    if((filas * columnas) % 2 != 0)
        // Nos aseguramos de que la cantidad de celdas sea par
        asegurarPares()
        
    // Comprobamos que la cantidad de filas o columnas sea válida
    filas = comprobarFilasColumnas(filas);
    columnas = comprobarFilasColumnas(columnas);

    // Actualizamos visualmente los cambios 
    document.getElementById("filasNum").value = filas
    document.getElementById("columnasNum").value = columnas
}

/**
 * Función que se asegura de que la cantidad de celdas de la tabla sea un número par
 */
function asegurarPares(){
    // En caso de que la fila no sea par
    if(filas % 2 != 0){
        filas += 1;
    }
}

/**
 * Función que comprueba si el número de filas o columnas introducidas por el usuario 
 * es válida, en caso contrario devuelve un valor que si está dentro de los límites
 * @param {number} filaOColumna  Variable que representa el número de filas o columnas introducidas por el usuario
 * @returns Devuelve la nueva cantidad en caso de sobrepasar los límites
 */
function comprobarFilasColumnas(filaOColumna){
    var nuevaFilaOColumna = filaOColumna;

    // Condicional que comprueba que la cantidad de filas o columnas sea válida
    if (filaOColumna > 6) 
        nuevaFilaOColumna = 6;
    else if (filaOColumna <= 1) 
        nuevaFilaOColumna = 2;
    
    return nuevaFilaOColumna;
}

/**
 * Función que baraja una lista de imagenes aplicando el algorítmo de Fisher-Yates
 */
function barajarCartas(imagenes){
    var numeroAleatorio, varCambio;

    // Bucle que recorre de manera inversa una lista de imágenes
    for (var i = imagenes.length - 1; i >= 0; i--){
        // Sacamos un número aleatorio entre 0 y el indice actual de la lista
        numeroAleatorio = Math.floor(Math.random() * (i + 1));
        // Guardamos la imagen que se encuentra en la posición aleatoria
        varCambio = imagenes[numeroAleatorio];
        // Cambiamos la imagen en la posición del número aleatorio por la imagen en el indice actual
        imagenes[numeroAleatorio] = imagenes[i];
        // Cambiamos la imagen actual por la imagen de la posición aleatoria
        imagenes[i] = varCambio;
    }
}

/**
 * Función que crea la lista de las cartas no visibles
 */
function crearCartasOcultas(){
    // Nos aseguramos de que la lista esté vacía
    listaCartasOcultas = [];

    // Sacamos la cantidad de cartas necesarias
    var cantidadCartas = (filas * columnas) / 2;

    // Recorremos la lista de imagenes con límite en la cantidad de cartas que necesitamos
    for(var i = 0; i < cantidadCartas; i++){
        // Guardamos en la lista de cartas ocultas dos copias de la misma imagen
        listaCartasOcultas.push(listaImagenes[i], listaImagenes[i]); 
    }

    // Barajamos la lista de cartas ocultas
    barajarCartas(listaCartasOcultas); 
}

/**
 * Función que da valores inciales a varibles necesarias para el correcto funcionamiento del juego
 */
function reinciarVariablesPartida() {
    // Indicamos que es la primera pulsación y que se desbloque el click
    primerPulsacion = true;
    bloqueado = false;

    // Reniciamos los intentos y los puntos de sus repestivos ficheros de dificultad
    intentos = 0 // Fichero Dificil
    puntos = 0; // Fichero Fácil

    // Sacamos la cantidad de puntos necesarios para ganar la partida
    cantidadPuntosVictoria = ((filas * columnas) / 2) * 10;
    
    // Sacamos la dificutlad actual
    dificultad = parseInt(document.getElementById("opciones").value);

    // Seteamos la puntuación y los intentes a sus respectivos números
    reiniciarPuntuacionPartida();
}


/**
 * Función que reinicia la puntuación 
 */
function reiniciarPuntuacionPartida(){
    // Sacamos el elemento que guarda la puntuación
    var puntuacion = document.getElementById("puntuacion");
    // Sacamos el elemento que guarda la cantidad de intentos
    var fallos = document.getElementById("fallos");
    // Ponemos la puntuación a cero
    puntuacion.value = 0;
    // Situamos la cantidad de intentos
    fallos.value = sacarCantidadIntentos(dificultad)
}

/**
 * Función que revela la carta pulsada
 * @param {object} event imagen pulsada
 */
function revelarCarta(event){
    // En caso de que esté bloqueado el click salimos de la función
    if(bloqueado) return; 

    // Guardamos la imagen clickeada
    var imagen = event.target;
    
    // En caso de que se pulse dos veces la misma imagen salimos de la función
    if(imagen === primeraImagen) return;

    // Cambiamos la imagen actual por la imagen oculta
    cambiarImagen(imagen);

    // En caso de que sea la primera pulsación
    if(primerPulsacion){
        // Guardamos la primera imagen
        primeraImagen = imagen;
    }else{
        // Y en la segunda guardamos la segunda imagen
        segundaImagen = imagen;

        // Ahora comparamos las dos imagenes
        compararImagenes();
    }

    // Cambiamos el valor de la primera pulsación
    primerPulsacion = !primerPulsacion;
}

/**
 * Función para intercambiar las imagen actual por la imagen oculta
 * @param {object} imagenActual 
 */
function cambiarImagen(imagenActual){
    // Guardamos la imagen actual en la variable
    var varCambio = imagenActual.src;

    // Intercambiamos las dos imágenes
    imagenActual.src = imagenActual.dataset.altSrc;
    imagenActual.dataset.altSrc = varCambio;
}

/**
 * Función que compara las dos imagenes seleccionadas por el usuario
 */
function compararImagenes(){
    // Indicamos que no se pueda hacer más clicks
    bloqueado = true;

    // Si las dos imágenes son iguales
    if(primeraImagen.src == segundaImagen.src){
        // Reiniciamos la cantida de intentos necesarios para ejectuar la desventaja en el modo difícil
        intentos = 0;
        // Aumentamos la puntuación
        cambiarPuntuacion(10, "puntuacion");
        // Esperamos 700 ms y eliminamos la función del click de las dos cartas
        setTimeout(eliminarFuncionCartas, 100);
    }
    else{
        // Reducimos la cantidad de intentos
        cambiarPuntuacion(-1, "fallos");
        // Esperamos 700 ms y ocultamos ambas cartas
        setTimeout(ocultarCartas, 700);
    } 
}

/**
 * Función que cambia la puntuación 
 * @param {number} numero Número para cambiar la puntuación 
 * @param {String} idObjetivo ID del elemento html al que se le va a cambiar la puntuación
 */
function cambiarPuntuacion(numero, idObjetivo){
    var puntuacion, nuevosPuntos;
    // Sacamos los puntos actuales
    puntuacion = document.getElementById(idObjetivo);
    // Calculamos los nuevos puntos
    nuevosPuntos = parseInt(puntuacion.value) + numero;
    // Actualizamos el valor de los puntos
    puntuacion.value = nuevosPuntos;
}


/**
 * Función que oculta las cartas 
 */
function ocultarCartas(){
    // Cambiamos las cartas por las cartas boca abajo
    cambiarImagen(primeraImagen);
    cambiarImagen(segundaImagen);

    // Limpiamos las imagenes
    primeraImagen = null;
    segundaImagen = null;

    // Indicamos que ya no está bloqueado el click
    bloqueado = false;

    // En caso de que se haya perdido la partida
    if(comprobarFinalDerrota())
        // Mostramos la imagen de derrota
        imagenFinal(imagenDerrota)

     // En caso de que no se haya ganado la partida y la dificultad sea difícil
    else if(dificultad == 3)
        // Ejecutamos la función que corresponde a cada dificutlad
        comprobarCondicionBarajar();
    
}

/**
 * Función para eliminar la función de click de las cartas
 */
function eliminarFuncionCartas(){
    // Eliminamos la función del click que revela las cartas pero mantenemos las cartas volteadas en pantalla
    primeraImagen.removeEventListener("click",revelarCarta);
    segundaImagen.removeEventListener("click",revelarCarta);

    // Indicamos que ya no está bloqueado el click
    bloqueado = false;

    // En caso de que se haya ganando la partida
    if(comprobarFinalVictoria()){
        // Mostramos la imagen de victoria
         setTimeout(() => imagenFinal(imagenVictoria), 700);

    // En caso de que no se haya ganado la partida y de que la dificultad sea fácil
    }else if(dificultad == 1){
        // Ejecutamos la función que corresponde a cada dificutlad
        comprobarCondicionRevelar()
    }
    
}

/**
 * Función que comprueba si se cumple la condición de derrota
 * @returns Devuelve true en caso de que si se cumpla la condición y false en caso contrario
 */
function comprobarFinalDerrota(){
    var fallos = parseInt(document.getElementById("fallos").value); 
    return fallos == 0;   
}


/**
 * Función que comprueba si se cumple la condición de victoria
 * @returns Devuelve true en caso de si se haya ganado la partida y false en caso contrario
 */
function comprobarFinalVictoria(){
    // Sacamos la puntuación actual
    var puntuacionFinal = parseInt(document.getElementById("puntuacion").value);
    return puntuacionFinal === cantidadPuntosVictoria
}


/**
 * Función que situa la imagen de fin de partida en la pantalla
 * @param {object} imagen imagen que se aparecerá en la pantalla
 */
function imagenFinal(imagen){
    // Evitamos que se pueda hacer click
    bloqueado = true;
    // Limpiamos la tabla
    tabla.innerHTML = "";
    // Creamos una nueva imagen
    var nuevaImagen = document.createElement("img");
    // Indicamos la ruta a la imagen
    nuevaImagen.src = imagen;
    // Añadimos la imagen a la tabla
    tabla.appendChild(nuevaImagen);
}