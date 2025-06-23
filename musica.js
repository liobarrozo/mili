window.addEventListener("load", () => {
    document.getElementById("musica").volume = 0.05;
    const audio = document.getElementById("musica");
    const boton = document.getElementById("toggleMusica");

  boton.addEventListener("click", () => {
    if (audio.paused) {
        console.log("Musica en pausa")
        audio.play();
        boton.textContent = "Pausar";
    } else {
        console.log("Musica en play")
        audio.pause();
        boton.textContent = "Reproducir";
    }
  });
  })


