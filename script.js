class NocturnalEyeAnimation {
  constructor() {
    this.leftEye = document.getElementById("leftEye")
    this.rightEye = document.getElementById("rightEye")
    this.isBlinking = false
    this.init()
  }

  init() {
    this.startBlinkingCycle()
    this.addMouseInteraction()
    this.addRandomSparkles()
    this.addMagicParticles()
    this.addNightEffects()
  }

  blink(duration = 150) {
    if (this.isBlinking) return

    this.isBlinking = true
    this.leftEye.classList.add("blink")
    this.rightEye.classList.add("blink")

    setTimeout(() => {
      this.leftEye.classList.remove("blink")
      this.rightEye.classList.remove("blink")
      this.isBlinking = false
    }, duration)
  }

  startBlinkingCycle() {
    const blinkInterval = () => {
      const nextBlink = Math.random() * 4000 + 3000

      setTimeout(() => {
        this.blink()
        blinkInterval()
      }, nextBlink)
    }

    setTimeout(() => {
      this.blink()
      blinkInterval()
    }, 2000)
  }

  addMouseInteraction() {
    document.addEventListener("mousemove", (e) => {
      if (this.isBlinking) return

      const eyes = [this.leftEye, this.rightEye]

      eyes.forEach((eye) => {
        const iris = eye.querySelector(".iris")
        const rect = eye.getBoundingClientRect()
        const eyeCenterX = rect.left + rect.width / 2
        const eyeCenterY = rect.top + rect.height / 2

        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX)
        const distance = Math.min(
          8,
          Math.sqrt(Math.pow(e.clientX - eyeCenterX, 2) + Math.pow(e.clientY - eyeCenterY, 2)) / 10,
        )

        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance

        iris.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
      })
    })

    document.addEventListener("click", () => {
      this.blink(200)
      this.createMagicBurst()
    })
  }

  addRandomSparkles() {
    setInterval(() => {
      this.createSparkle()
    }, 2500)
  }

  createSparkle() {
    const sparkle = document.createElement("div")
    sparkle.className = "sparkle"
    sparkle.style.position = "absolute"
    sparkle.style.top = Math.random() * 100 + "%"
    sparkle.style.left = Math.random() * 100 + "%"
    sparkle.style.animationDelay = "0s"

    document.querySelector(".container").appendChild(sparkle)

    setTimeout(() => {
      sparkle.remove()
    }, 2000)
  }

  addMagicParticles() {
    setInterval(() => {
      this.createMagicParticle()
    }, 4000)
  }

  createMagicParticle() {
    const particle = document.createElement("div")
    particle.className = "magic-particle"
    particle.style.position = "absolute"
    particle.style.top = Math.random() * 80 + 10 + "%"
    particle.style.left = Math.random() * 80 + 10 + "%"
    particle.style.animationDelay = Math.random() * 2 + "s"

    document.querySelector(".container").appendChild(particle)

    setTimeout(() => {
      particle.remove()
    }, 6000)
  }

  createMagicBurst() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.createMagicParticle()
      }, i * 100)
    }
  }

  addNightEffects() {
    // Efecto de respiración en el resplandor de los ojos
    setInterval(() => {
      const glows = document.querySelectorAll(".eye-glow")
      glows.forEach((glow) => {
        glow.style.animation = "eyeGlow 3s ease-in-out infinite"
      })
    }, 3000)
  }
}

// Inicializar la animación cuando la página cargue
window.addEventListener("load", () => {
  new NocturnalEyeAnimation()
})

// Efectos especiales con teclado
document.addEventListener("keydown", (e) => {
  const eyeAnimation = new NocturnalEyeAnimation()

  if (e.code === "Space") {
    eyeAnimation.blink(300)
    eyeAnimation.createMagicBurst()
  }
})

// Crear más estrellas dinámicamente
function createRandomStars() {
  const starsContainer = document.querySelector(".stars")

  for (let i = 0; i < 15; i++) {
    const star = document.createElement("div")
    star.className = "star"
    star.style.width = Math.random() * 3 + 1 + "px"
    star.style.height = star.style.width
    star.style.top = Math.random() * 100 + "%"
    star.style.left = Math.random() * 100 + "%"
    star.style.animationDelay = Math.random() * 3 + "s"

    starsContainer.appendChild(star)
  }
}

// Crear estrellas adicionales al cargar
window.addEventListener("load", createRandomStars)
