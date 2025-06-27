const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.getElementById("closeBtn");
const images = document.querySelectorAll(".gallery img");

images.forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImage.src = img.src;
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
