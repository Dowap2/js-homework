const createCarousel = () => {
  const track = document.querySelector("#carouselTrack");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.querySelector("#prevBtn");
  const nextBtn = document.querySelector("#nextBtn");
  const currentIndexEl = document.querySelector("#currentIndex");
  const totalPagesEl = document.querySelector("#totalPages");
  const gameContainers = document.querySelectorAll(".game-container");

  let currentSlide = 0;
  const totalSlides = slides.length;

  const updateSlide = () => {
    const translateX = -currentSlide * 100;
    track.style.transform = `translateX(${translateX}%)`;
    currentIndexEl.textContent = currentSlide + 1;
  };

  const goToNext = () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
  };

  const goToPrev = () => {
    currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    updateSlide();
  };

  gameContainers.forEach((container) => {
    const overlayImage = container.querySelector(".overlay-image");
    const gameContent = container.querySelector(".game-content");

    container.addEventListener("mouseenter", () => {
      if (overlayImage) {
        overlayImage.style.transform = "scale(1.03)";
        overlayImage.style.transition = "transform 0.3s ease";
      }

      if (gameContent) {
        gameContent.style.opacity = "0.64";
        gameContent.style.transition = "opacity 0.3s ease";
      }
    });

    container.addEventListener("mouseleave", () => {
      if (overlayImage) {
        overlayImage.style.transform = "scale(1)";
      }

      if (gameContent) {
        gameContent.style.opacity = "1";
      }
    });
  });

  const init = () => {
    totalPagesEl.textContent = totalSlides;

    nextBtn.addEventListener("click", goToNext);
    prevBtn.addEventListener("click", goToPrev);

    addHoverEvents();
    updateSlide();
  };

  return { init };
};

document.addEventListener("DOMContentLoaded", () => {
  const carousel = createCarousel();
  carousel.init();
});
