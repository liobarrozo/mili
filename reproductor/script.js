class MusicPlayer {
  constructor() {
    this.currentSongIndex = 0
    this.isPlaying = false

    // Lista de canciones (puedes reemplazar con tus propios archivos)
    this.songs = [
      {
        title: "Congratulations",
        artist: "Mac Miller",
        src: "./image/congratulations.mp3", // Reemplaza con tu archivo de audio
        cover: "./image/congratulationsPortada.jpeg",
      },
      {
        title: "See You Again",
        artist: "Tyler, The Creator",
        src: "./image/seeYouAgain.mp3", // Reemplaza con tu archivo de audio
        cover: "./image/portadaCancion.jpeg",
      },
    ]

    this.initializeElements()
    this.loadSong()
    this.attachEventListeners()
  }

  initializeElements() {
    this.audioPlayer = document.getElementById("audioPlayer")
    this.playPauseBtn = document.getElementById("playPauseBtn")
    this.nextBtn = document.getElementById("nextBtn")
    this.albumCover = document.getElementById("albumCover")
    this.songTitle = document.getElementById("songTitle")
    this.artistName = document.getElementById("artistName")
    this.progressBar = document.getElementById("progressBar")
    this.progress = document.getElementById("progress")
    this.currentTime = document.getElementById("currentTime")
    this.duration = document.getElementById("duration")
    this.volumeSlider = document.getElementById("volumeSlider")
  }

  loadSong() {
    const song = this.songs[this.currentSongIndex]

    this.audioPlayer.src = song.src
    this.songTitle.textContent = song.title
    this.artistName.textContent = song.artist
    this.albumCover.style.backgroundImage = `url(${song.cover})`

    // Reset progress
    this.progress.style.width = "0%"
    this.currentTime.textContent = "0:00"
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pause()
    } else {
      this.play()
    }
  }

  play() {
    this.audioPlayer.play()
    this.isPlaying = true
    this.playPauseBtn.innerHTML = "⏸️"
    this.albumCover.classList.add("playing")
  }

  pause() {
    this.audioPlayer.pause()
    this.isPlaying = false
    this.playPauseBtn.innerHTML = "▶️"
    this.albumCover.classList.remove("playing")
  }

  nextSong() {
    this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length
    this.loadSong()
    if (this.isPlaying) {
      this.play()
    }
  }

  updateProgress() {
    if (this.audioPlayer.duration) {
      const progressPercent = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100
      this.progress.style.width = `${progressPercent}%`

      this.currentTime.textContent = this.formatTime(this.audioPlayer.currentTime)
      this.duration.textContent = this.formatTime(this.audioPlayer.duration)
    }
  }

  setProgress(e) {
    const width = this.progressBar.clientWidth
    const clickX = e.offsetX
    const duration = this.audioPlayer.duration

    this.audioPlayer.currentTime = (clickX / width) * duration
  }

  setVolume() {
    this.audioPlayer.volume = this.volumeSlider.value / 100
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  attachEventListeners() {
    // Controles principales
    this.playPauseBtn.addEventListener("click", () => this.togglePlayPause())
    this.nextBtn.addEventListener("click", () => this.nextSong())

    // Eventos del audio
    this.audioPlayer.addEventListener("timeupdate", () => this.updateProgress())
    this.audioPlayer.addEventListener("ended", () => this.nextSong())
    this.audioPlayer.addEventListener("loadedmetadata", () => {
      this.duration.textContent = this.formatTime(this.audioPlayer.duration)
    })

    // Barra de progreso
    this.progressBar.addEventListener("click", (e) => this.setProgress(e))

    // Control de volumen
    this.volumeSlider.addEventListener("input", () => this.setVolume())

    // Establecer volumen inicial
    this.setVolume()
  }
}

// Inicializar el reproductor cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  new MusicPlayer()
})
