
/**
 * Fichero que gestiona todo lo relacionado con la selección de dificultades
 */

// Nota: variables globales como filas, columnas se definen en el fichero cartas.js

/**
 * Función que calcula la cantidad de intentos en función de la dificultad
 * @returns Devuelve la cantidad de intentos
 */
function sacarCantidadIntentos(){
    var intentos; 

    // Calculamos los intentos en función de la dificultad
    switch(dificultad){
        case 1: // Fácil
            intentos = calcularIntentos(4);
            // Calculamos los puntos necesarios para ejectuar la habilidad
            puntosParaHabilidad = filas - 1
            break
        case 2: // Normal
            intentos = calcularIntentos(2);
            break
        case 3: // Difícil
             intentos = calcularIntentos(1);
             break
            
    }
    return intentos
}

/**
 * Función que realiza el calculo de la cantidad de intentos
 * @param {*} modificador Por lo que se multiplicará el resultado en función de la dificultad
 * @returns Devuelve el calculo de la cantidad de intentos
 */
function calcularIntentos(modificador){
    return  Math.ceil(((filas * columnas)/ 2) * 0.75) * modificador
}

