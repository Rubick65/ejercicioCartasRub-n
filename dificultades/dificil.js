var intentos = 0
var listaImagenesABarajar;
const cantidadIntentosPermitidos = 3
   /**
     * Función que comprueba si se ha cumplido la condición para ejecutar la  desventaja
     */
    function comprobarCondicionBarajar(){
        intentos++;// Aumentamos los puntos
        // En caso de que los intentos sean igual a los necesarios para ejecutar la desventaja
        if(intentos == cantidadIntentosPermitidos){
            // Vaciamos la lista de imagenes
            listaImagenesABarajar = []
            // Barajamos una columan aleatoria
            barajarColumnaAleatoria()
        }       
    }

    /**
     * FUnción que baraja una columna aleatoria
     */
    function barajarColumnaAleatoria(){
        // Sacamos una columna aleatoria
        var columnaAleatoria = Math.floor(Math.random() * columnas)
        // sacamos las filas de la tabla
        var fils = tabla.rows;
        // Sacamos la lista que queremos barajar
        sacarListaABarajar(columnaAleatoria, fils)

        // Barajamos la lista de cartas
        barajarCartas(listaImagenesABarajar)

        // Introducimos las cartas barajadas en la tabla 
        introducirCartasBarajadas(columnaAleatoria, fils)
        // Reiniciamos los intentos
        intentos = 0
    }

    /**
     * Función que saba la lista de imágenes a barajar
     * @param {Number} columnaAleatoria columna de la que se van a sacar las imágenes 
     * @param {HTMLObjectElement} fils Todas las filas del html
     */
    function sacarListaABarajar(columnaAleatoria, fils){
        // Recorremos las filas
        for(var i = 0; i < filas; i++){
            // Sacamos la imagen de la fila y la columnas selccionada
            imagenActual = fils[i].cells[columnaAleatoria].querySelector("img");
            // Añadimos un estilo css a las cartas que se van a alterar para indicarle al usuario 
            imagenActual.classList.add("carta-brillante")
            // Añadimos la imagen a la lista de imágenes a barajar
            listaImagenesABarajar.push(imagenActual) 
        }
    }

    /**
     * Función que elimina la marca brillante de las cartas
     */
    function eliminarMarcadoCartas(){
        // Recorremos la lista de imágenes
        for(var imagen of listaImagenesABarajar){
            // Eliminamos el estilo de cada carta
            imagen.classList.remove("carta-brillante")
        }
    }

    /**
     * Función que introduce la lista de cartas barajadas de vuelta a la tabla
     * @param {Number} columnaAleatoria Columna en la que se deben de volver a meter las cartas
     * @param {HTMLObjectElement} fil Filas de la tabla
     */
    function introducirCartasBarajadas(columnaAleatoria, fil ){
        // Recorremos la lista de imágenes
        for(var i = 0; i < listaImagenesABarajar.length; i++){
            // Vamos vaciando cada celda
            fil[i].cells[columnaAleatoria].innerHTML = "";
            // Y añadiendo la imagen en su nueva posición
            fil[i].cells[columnaAleatoria].appendChild(listaImagenesABarajar[i]);
        }
        // Esperamos 0.9s y eliminamos la marca brillante de las cartas
        setTimeout(eliminarMarcadoCartas, 900);
    }