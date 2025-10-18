/**
 * Fichero que se encarga de las funciones propias de la dificultad fácil
 */

// Nota: variables globales como filas, columnas, bloqueado y tabla se definen en el fichero cartas.js
var imagenOculta = document.createElement("img") // Creamos una imagen con la ruta de la imagen oculta
imagenOculta.src = "imagenes/imagenCarta.png" // Le indicamos la ruta a la imagen oculta
var puntos = 0; // Situamos los puntos a cer
var listaImagenesReveladas;// Lista de imagenes que se revelarán cuando se ejecute la habilidad del modo fácil
var puntosParaHabilidad; // Puntos necesarios para ejecutar la habilidad
var primeraCarta = true // Booleano que indica si es la primera carta 

   /**
     * Función que comprueba si se ha cumplido la condición para ejecutar la  habilidad
     */
    function comprobarCondicionRevelar(){
        puntos++;// Aumentamos los puntos
        // En caso de que los puntos sean igual a los necesarios para ejecutar la habilidad
        if(puntos == puntosParaHabilidad){
            listaImagenesReveladas = [] // Vaciamos la lista de imágenes
            // Revelamos dos cartas de manera aleatoria
            revelarCartasAleatorias()
            revelarCartasAleatorias()
        }       
    }

    /**
     * Función que revela cartas de manera aleatoria en el tablero de juego
     */
    function revelarCartasAleatorias(){
        // Sacamos las filas de la tabla
        var fil = tabla.rows
    
        do {
            // Sacamos un número aleatorio para las filas y otro para las columnas
            var filaAleatoria = Math.floor(Math.random() * (filas))
            var columnaAleatoria = Math.floor(Math.random() * (columnas));
            // Sacamos la imagen en esa fila y columna
            var imagenActual = fil[filaAleatoria].cells[columnaAleatoria].querySelector("img"); 
        } while (imagenActual.src != imagenOculta.src);// Repetimos el proceso hasta que la imagen acutal sea igual que la imagen boca abajo

        // Añadimos la imagen actual a la lista de imagenes reveladas
        listaImagenesReveladas.push(imagenActual)
        // Cambiamos la la imagen por su versión boca abajo
        cambiarImagen(imagenActual)

        // En caso de que no sea la primera carta
        if(!primeraCarta){
            // Bloqueamos el click
            bloqueado = true;
            // Esperamos un segundo y ocultamos las imágenes
            setTimeout(ocultarImagenes, 1000);
        }
        
        // Cambimos el booleano de la primera carta
        primeraCarta = !primeraCarta        
    }

    /**
     * Función que oculta las imagenes
     */
    function ocultarImagenes(){
        // Recorremos la lista de imagenes reveladas
        for(var imagen of listaImagenesReveladas){
            // Oculatamos las imagenes
            cambiarImagen(imagen)
        }
        // Reiniciamos los puntos
        puntos = 0;
        // Desbloqueamos el click
        bloqueado = false
    }