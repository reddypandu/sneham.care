  const carousel = document.querySelector('#custom3DCarousel');
  const carouselInstance = bootstrap.Carousel.getOrCreateInstance(carousel, {
    interval: 4000,
    ride: 'carousel',
    pause: false
  });

  const nextBtn = carousel.querySelector('.carousel-control-next');
  const prevBtn = carousel.querySelector('.carousel-control-prev');

  // Restart carousel after user clicks control
  [nextBtn, prevBtn].forEach(btn => {
    btn.addEventListener('click', () => {
      // Optional safety: carouselInstance.pause();
      setTimeout(() => {
        carouselInstance.cycle();
      }, 4000);
    });
  });



  