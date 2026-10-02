/* =========================================
   CONFIGURACIÓN DE ARCHIVOS
========================================= */

const ASSETS = {

    musica:
        "assets/musica/musica.mp3",

    sonidos: {
        click:
            "assets/sonidos/click.mp3",

        transicion:
            "assets/sonidos/transicion.mp3",

        avion:
            "assets/sonidos/avion.mp3",

        campanilla:
            "assets/sonidos/campanilla.mp3"
    },

    imagenes: {
        cielo:
            "assets/imagenes/cielo.jpg",

        ciudad:
            "assets/imagenes/ciudad.jpg",

        regalo:
            "assets/imagenes/regalo.jpg"
    },

    gifs: {
        avion:
            "assets/gifs/avion.gif",

        ciudad:
            "assets/gifs/ciudad.gif",

        estrellas:
            "assets/gifs/estrellas.gif"
    }
};


/* =========================================
   PANTALLAS
========================================= */

const pantallaInicio =
    document.getElementById("pantallaInicio");

const pantallaSueno =
    document.getElementById("pantallaSueno");

const pantallaAbordaje =
    document.getElementById("pantallaAbordaje");

const pantallaVuelo =
    document.getElementById("pantallaVuelo");

const pantallaCiudad =
    document.getElementById("pantallaCiudad");

const pantallaExperiencia =
    document.getElementById("pantallaExperiencia");

const pantalla10 =
    document.getElementById("pantalla10");


/* =========================================
   BOTONES
========================================= */

const comenzar =
    document.getElementById("comenzar");

const pregunta =
    document.getElementById("pregunta");

const cerrar =
    document.getElementById("cerrar");

const abordar =
    document.getElementById("abordar");

const continuarViaje =
    document.getElementById("continuarViaje");

const continuarVuelo =
    document.getElementById("continuarVuelo");

const seguirVuelo =
    document.getElementById("seguirVuelo");

const continuarExperiencia =
    document.getElementById("continuarExperiencia");

const controlMusica =
    document.getElementById("controlMusica");


/* =========================================
   MODAL
========================================= */

const modal =
    document.getElementById("modal");


/* =========================================
   AUDIO
========================================= */

const musicaFondo =
    document.getElementById("musicaFondo");

const sonidoClick =
    document.getElementById("sonidoClick");

const sonidoTransicion =
    document.getElementById("sonidoTransicion");

const sonidoAvion =
    document.getElementById("sonidoAvion");

const sonidoCampanilla =
    document.getElementById("sonidoCampanilla");


/* =========================================
   EXPERIENCIA
========================================= */

const frasesSecuencia =
    document.querySelectorAll(".frase-secuencia");

const mensajeFinal =
    document.getElementById("mensajeFinal");

const gifNubesExperiencia =
    document.getElementById("gifNubesExperiencia");

const avionPequeno =
    document.getElementById("avionPequeno");

const imagenAzafata =
    document.getElementById("imagenAzafata");


/* =========================================
   VARIABLES
========================================= */

let musicaActiva = false;

let temporizadorFrase = null;
let temporizadorSiguiente = null;
let temporizadorFinal = null;
let temporizadorBoton = null;


/* =========================================
   CONFIGURAR VOLUMEN
========================================= */

if (musicaFondo) {
    musicaFondo.volume = 0.28;
}

if (sonidoClick) {
    sonidoClick.volume = 0.45;
}

if (sonidoTransicion) {
    sonidoTransicion.volume = 0.35;
}

if (sonidoAvion) {
    sonidoAvion.volume = 0.45;
}

if (sonidoCampanilla) {
    sonidoCampanilla.volume = 0.35;
}


/* =========================================
   FUNCIÓN AUDIO
========================================= */

function reproducir(audio) {

    if (!audio) return;

    audio.currentTime = 0;

    audio.play().catch(() => {
        // El navegador puede bloquear audio
        // hasta que exista interacción del usuario.
    });
}


/* =========================================
   DETENER AUDIO
========================================= */

function detenerAudio(audio) {

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
}


/* =========================================
   MÚSICA
========================================= */

function iniciarMusica() {

    if (!musicaFondo) return;

    musicaFondo
        .play()
        .then(() => {

            musicaActiva = true;

            if (controlMusica) {
                controlMusica.classList.add("activa");
                controlMusica.textContent = "♫";
            }

        })
        .catch(() => {

            musicaActiva = false;

        });
}


function detenerMusica() {

    if (!musicaFondo) return;

    musicaFondo.pause();

    musicaActiva = false;

    if (controlMusica) {
        controlMusica.classList.remove("activa");
        controlMusica.textContent = "♪";
    }
}


if (controlMusica) {

    controlMusica.addEventListener("click", () => {

        if (musicaActiva) {

            detenerMusica();

        } else {

            iniciarMusica();

        }

    });

}


/* =========================================
   LIMPIAR TEMPORIZADORES
========================================= */

function limpiarTemporizadores() {

    clearTimeout(temporizadorFrase);
    clearTimeout(temporizadorSiguiente);
    clearTimeout(temporizadorFinal);
    clearTimeout(temporizadorBoton);

    temporizadorFrase = null;
    temporizadorSiguiente = null;
    temporizadorFinal = null;
    temporizadorBoton = null;
}


/* =========================================
   TRANSICIÓN
========================================= */

function cambiarPantalla(actual, siguiente, retraso = 500) {

    reproducir(sonidoTransicion);

    actual.classList.remove("activa");

    setTimeout(() => {

        siguiente.classList.add("activa");

    }, retraso);
}


/* =========================================
   PARTÍCULAS
========================================= */

function crearParticula() {

    const contenedor =
        document.getElementById("particulas");

    if (!contenedor) return;

    const particula =
        document.createElement("span");

    particula.className = "particula";

    particula.style.left =
        Math.random() * 100 + "%";

    particula.style.bottom =
        Math.random() * 20 + "%";

    particula.style.animationDuration =
        (4 + Math.random() * 5) + "s";

    particula.style.animationDelay =
        Math.random() * 2 + "s";

    const tamanos = [
        "1px",
        "2px",
        "3px"
    ];

    particula.style.width =
        tamanos[Math.floor(Math.random() * tamanos.length)];

    particula.style.height =
        particula.style.width;

    contenedor.appendChild(particula);

    setTimeout(() => {

        particula.remove();

    }, 10000);
}


setInterval(() => {

    crearParticula();

}, 700);


/* =========================================
   PANTALLA 1 → 2
========================================= */

if (comenzar) {

    comenzar.addEventListener("click", () => {

        reproducir(sonidoClick);

        iniciarMusica();

        cambiarPantalla(
            pantallaInicio,
            pantallaSueno,
            400
        );

    });

}


/* =========================================
   ABRIR MODAL
========================================= */

if (pregunta) {

    pregunta.addEventListener("click", () => {

        reproducir(sonidoClick);

        modal.classList.add("visible");

    });

}


/* =========================================
   CERRAR MODAL
========================================= */

function cerrarModal() {

    modal.classList.remove("visible");

    mostrarAbordar();

}


if (cerrar) {

    cerrar.addEventListener(
        "click",
        cerrarModal
    );

}


/* =========================================
   TOCAR FUERA DEL MODAL
========================================= */

if (modal) {

    modal.addEventListener("click", (evento) => {

        if (evento.target === modal) {

            cerrarModal();

        }

    });

}


/* =========================================
   ESCAPE
========================================= */

document.addEventListener("keydown", (evento) => {

    if (evento.key === "Escape") {

        if (
            modal &&
            modal.classList.contains("visible")
        ) {

            cerrarModal();

        }

    }

});


/* =========================================
   MOSTRAR ABORDAR
========================================= */

function mostrarAbordar() {

    setTimeout(() => {

        if (abordar) {
            abordar.classList.add("visible");
        }

    }, 450);

}


/* =========================================
   PANTALLA 2 → 3
   BOARDING PASS
========================================= */

if (abordar) {

    abordar.addEventListener("click", () => {

        reproducir(sonidoClick);

        /*
            Entramos al Boarding Pass.
        */

        cambiarPantalla(
            pantallaSueno,
            pantallaAbordaje,
            450
        );


        /*
            🔔 ALERTA DE AEROPUERTO

            SOLO se reproduce aquí.
        */

        setTimeout(() => {

            reproducir(sonidoCampanilla);

        }, 550);

    });

}


/* =========================================
   PANTALLA 3 → 4
   SALIR DEL BOARDING PASS
========================================= */

if (continuarViaje) {

    continuarViaje.addEventListener("click", () => {

        reproducir(sonidoClick);


        /*
            🔇 IMPORTANTE:

            detener completamente la alerta
            del Boarding Pass.

            Así no continúa sonando
            durante las siguientes pantallas.
        */

        detenerAudio(sonidoCampanilla);


        cambiarPantalla(
            pantallaAbordaje,
            pantallaVuelo,
            450
        );


        /*
            Sonido del avión despegando.
        */

        setTimeout(() => {

            reproducir(sonidoAvion);

        }, 650);

    });

}


/* =========================================
   PANTALLA 4 → 5
========================================= */

if (continuarVuelo) {

    continuarVuelo.addEventListener("click", () => {

        reproducir(sonidoClick);


        /*
            Reiniciar GIF del avión pequeño.
        */

        if (avionPequeno) {

            const rutaOriginal =
                avionPequeno.src;

            avionPequeno.src = "";

            avionPequeno.src =
                rutaOriginal;

        }


        cambiarPantalla(
            pantallaVuelo,
            pantallaCiudad,
            450
        );

    });

}


/* =========================================
   PANTALLA 5 → 6
========================================= */

if (seguirVuelo) {

    seguirVuelo.addEventListener("click", () => {

        reproducir(sonidoClick);

        cambiarPantalla(
            pantallaCiudad,
            pantallaExperiencia,
            700
        );

        setTimeout(() => {

            iniciarExperiencia();

        }, 750);

    });

}


/* =========================================
   EXPERIENCIA
========================================= */

function iniciarExperiencia() {

    limpiarTemporizadores();


    /*
        Ocultar todas las frases.
    */

    frasesSecuencia.forEach((frase) => {

        frase.classList.remove("visible");

    });


    /*
        Ocultar mensaje final.
    */

    mensajeFinal.classList.remove("visible");


    /*
        Ocultar botón.
    */

    continuarExperiencia.classList.remove(
        "visible"
    );


    /*
        ⭐ Activar estrellas grandes.
    */

    pantallaExperiencia.classList.add(
        "estrellas-activas"
    );


    /*
        ☁️ Activar GIF de nubes.
    */

    pantallaExperiencia.classList.remove(
        "nubes-desapareciendo"
    );

    pantallaExperiencia.classList.add(
        "nubes-activas"
    );


    let indice = 0;


    function mostrarSiguienteFrase() {

        if (indice >= frasesSecuencia.length) {

            mostrarMensajeFinal();

            return;

        }


        const fraseActual =
            frasesSecuencia[indice];


        /*
            Mostrar frase.
        */

        fraseActual.classList.add("visible");


        /*
            IMPORTANTE:

            Ya NO reproducimos aquí
            sonidoCampanilla.

            La alerta de aeropuerto
            pertenece únicamente al Boarding Pass.
        */


        /*
            Frase visible durante 5 segundos.
        */

        temporizadorFrase = setTimeout(() => {

            fraseActual.classList.remove("visible");

            indice++;


            temporizadorSiguiente =
                setTimeout(() => {

                    mostrarSiguienteFrase();

                }, 700);

        }, 5000);

    }


    mostrarSiguienteFrase();

}


/* =========================================
   MENSAJE FINAL
========================================= */

function mostrarMensajeFinal() {

    /*
        ⭐ Apagar estrellas grandes.
    */

    pantallaExperiencia.classList.remove(
        "estrellas-activas"
    );


    /*
        ☁️ Comenzar desaparición de nubes.
    */

    pantallaExperiencia.classList.remove(
        "nubes-activas"
    );

    pantallaExperiencia.classList.add(
        "nubes-desapareciendo"
    );


    /*
        Esperar a que desaparezcan
        antes de mostrar el mensaje final.
    */

    temporizadorFinal =
        setTimeout(() => {

            mensajeFinal.classList.add(
                "visible"
            );

        }, 1500);


    /*
        Mostrar botón después
        del mensaje final.
    */

    temporizadorBoton =
        setTimeout(() => {

            continuarExperiencia.classList.add(
                "visible"
            );

        }, 5700);

}


/* =========================================
   PENÚLTIMA PANTALLA → PANTALLA 10
========================================= */

/*
    ESTE ERA EL ERROR PRINCIPAL.

    El botón se hacía visible,
    pero nunca tenía una función
    para llevar a la siguiente pantalla.
*/

if (continuarExperiencia) {

    continuarExperiencia.addEventListener(
        "click",
        () => {

            reproducir(sonidoClick);


            /*
                Detener cualquier temporizador
                pendiente de la experiencia.
            */

            limpiarTemporizadores();


            /*
                Asegurarnos de que las nubes
                y estrellas no continúen
                cuando salgamos.
            */

            if (pantallaExperiencia) {

                pantallaExperiencia.classList.remove(
                    "nubes-activas"
                );

                pantallaExperiencia.classList.remove(
                    "nubes-desapareciendo"
                );

                pantallaExperiencia.classList.remove(
                    "estrellas-activas"
                );

            }


            /*
                Mostrar pantalla final.
            */

            cambiarPantalla(
                pantallaExperiencia,
                pantalla10,
                500
            );

        }
    );

}


/* =========================================
   PANTALLA 10
========================================= */

/*
    La imagen de la azafata se encuentra
    dentro de #pantalla10 en tu HTML.

    No necesita JavaScript para aparecer.
    CSS controla su posición y animación.
*/

if (imagenAzafata) {

    imagenAzafata.addEventListener(
        "error",
        () => {

            console.warn(
                "No se pudo cargar la imagen de la azafata."
            );

        }
    );

}