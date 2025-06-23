document.getElementById("musica").volume = 0.05;
const audio = document.getElementById("cerati");
const boton = document.getElementById("toggleMusica");

  boton.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      boton.textContent = "Pausar";
    } else {
      audio.pause();
      boton.textContent = "Reproducir";
    }
  });