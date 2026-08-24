const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");

menuToggle?.addEventListener("click", () => {
  const isOpen = header?.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    header?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const heroSlides = [...document.querySelectorAll(".hero__slide")];
let heroIndex = 0;

if (heroSlides.length > 1) {
  window.setInterval(() => {
    heroSlides[heroIndex].classList.remove("is-active");
    heroIndex = (heroIndex + 1) % heroSlides.length;
    heroSlides[heroIndex].classList.add("is-active");
  }, 5200);
}

const procedureTrack = document.querySelector(".procedure-track");
const procedureSlides = [...document.querySelectorAll(".procedure-slide")];
const procedureDotsWrap = document.querySelector(".procedure-dots");
const procedurePrev = document.querySelector(".procedure-arrow--prev");
const procedureNext = document.querySelector(".procedure-arrow--next");
let procedureIndex = 0;
let procedureTimer;

function showProcedure(index) {
  if (!procedureTrack || !procedureSlides.length) return;
  procedureSlides[procedureIndex]?.classList.remove("is-active");
  procedureDotsWrap?.children[procedureIndex]?.classList.remove("is-active");
  procedureIndex = (index + procedureSlides.length) % procedureSlides.length;
  procedureSlides[procedureIndex]?.classList.add("is-active");
  procedureDotsWrap?.children[procedureIndex]?.classList.add("is-active");
  procedureTrack.style.transform = `translateX(-${procedureIndex * 100}%)`;
}

function startProcedureCarousel() {
  window.clearInterval(procedureTimer);
  procedureTimer = window.setInterval(() => {
    showProcedure(procedureIndex + 1);
  }, 5200);
}

if (procedureTrack && procedureDotsWrap && procedureSlides.length) {
  procedureSlides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ver procedimento ${index + 1}`);
    if (index === 0) dot.classList.add("is-active");
    dot.addEventListener("click", () => {
      showProcedure(index);
      startProcedureCarousel();
    });
    procedureDotsWrap.appendChild(dot);
  });

  procedurePrev?.addEventListener("click", () => {
    showProcedure(procedureIndex - 1);
    startProcedureCarousel();
  });

  procedureNext?.addEventListener("click", () => {
    showProcedure(procedureIndex + 1);
    startProcedureCarousel();
  });

  startProcedureCarousel();
}

const galleryTrack = document.querySelector(".gallery-track");
const galleryItems = [...document.querySelectorAll(".gallery-track figure")];
const galleryDotsWrap = document.querySelector(".gallery-dots");
const galleryPrev = document.querySelector(".gallery-arrow--prev");
const galleryNext = document.querySelector(".gallery-arrow--next");
let galleryIndex = 0;
let galleryTimer;

function getGalleryStep() {
  if (!galleryTrack || !galleryItems.length) return 0;
  const gap = Number.parseFloat(getComputedStyle(galleryTrack).gap) || 0;
  return galleryItems[0].getBoundingClientRect().width + gap;
}

function getGalleryMaxIndex() {
  if (!galleryTrack || !galleryItems.length) return 0;
  const viewport = galleryTrack.parentElement?.getBoundingClientRect().width || 0;
  const visibleItems = Math.max(1, Math.floor((viewport + 1) / getGalleryStep()));
  return Math.max(0, galleryItems.length - visibleItems);
}

function showGallery(index) {
  if (!galleryTrack || !galleryItems.length) return;
  galleryDotsWrap?.children[galleryIndex]?.classList.remove("is-active");
  galleryIndex = Math.max(0, Math.min(index, getGalleryMaxIndex()));
  galleryDotsWrap?.children[galleryIndex]?.classList.add("is-active");
  galleryTrack.style.transform = `translateX(-${galleryIndex * getGalleryStep()}px)`;
}

function startGalleryCarousel() {
  window.clearInterval(galleryTimer);
  galleryTimer = window.setInterval(() => {
    const nextIndex = galleryIndex >= getGalleryMaxIndex() ? 0 : galleryIndex + 1;
    showGallery(nextIndex);
  }, 5200);
}

if (galleryTrack && galleryDotsWrap && galleryItems.length) {
  galleryItems.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ver imagem ${index + 1}`);
    if (index === 0) dot.classList.add("is-active");
    dot.addEventListener("click", () => {
      showGallery(index);
      startGalleryCarousel();
    });
    galleryDotsWrap.appendChild(dot);
  });

  galleryPrev?.addEventListener("click", () => {
    showGallery(galleryIndex - 1);
    startGalleryCarousel();
  });

  galleryNext?.addEventListener("click", () => {
    const nextIndex = galleryIndex >= getGalleryMaxIndex() ? 0 : galleryIndex + 1;
    showGallery(nextIndex);
    startGalleryCarousel();
  });

  window.addEventListener("resize", () => showGallery(galleryIndex));
  startGalleryCarousel();
}

const testimonials = [...document.querySelectorAll(".testimonial")];
const dotsWrap = document.querySelector(".testimonial-dots");
let testimonialIndex = 0;
let testimonialTimer;

function showTestimonial(index) {
  testimonials[testimonialIndex]?.classList.remove("is-active");
  dotsWrap?.children[testimonialIndex]?.classList.remove("is-active");
  testimonialIndex = index;
  testimonials[testimonialIndex]?.classList.add("is-active");
  dotsWrap?.children[testimonialIndex]?.classList.add("is-active");
}

function startTestimonials() {
  window.clearInterval(testimonialTimer);
  testimonialTimer = window.setInterval(() => {
    showTestimonial((testimonialIndex + 1) % testimonials.length);
  }, 5600);
}

if (dotsWrap && testimonials.length) {
  testimonials.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ver depoimento ${index + 1}`);
    if (index === 0) dot.classList.add("is-active");
    dot.addEventListener("click", () => {
      showTestimonial(index);
      startTestimonials();
    });
    dotsWrap.appendChild(dot);
  });
  startTestimonials();
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll("section, .service-card, .method-grid article, .gallery-track figure").forEach((element) => {
  element.classList.add("reveal");
  revealObserver.observe(element);
});
