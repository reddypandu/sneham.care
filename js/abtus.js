document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("sneham-visible");
        }
      });
    }, {
      threshold: 0.4, // 40% of element in viewport
    });

    const fadeElems = document.querySelectorAll(".sneham-fade-in-on-scroll");
    fadeElems.forEach(el => observer.observe(el));
  });




  document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".about-sneham-section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add("show");
        observer.unobserve(section); // run only once
      }
    });
  }, { threshold: 0.2 });

  observer.observe(section);
});