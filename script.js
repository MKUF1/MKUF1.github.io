const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

reveals.forEach(item => revealObserver.observe(item));

const counters = document.querySelectorAll(".counter");

const animateCounter = counter => {
  const target = Number(counter.dataset.target || 0);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 45));

  const tick = () => {
    current += step;
    if (current >= target) {
      counter.textContent = `${target}+`;
      return;
    }
    counter.textContent = `${current}+`;
    requestAnimationFrame(tick);
  };

  tick();
};

const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.55 }
);

counters.forEach(counter => counterObserver.observe(counter));

document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    button.parentElement.classList.toggle("is-open");
  });
});

const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");

if (siteHeader && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("menu-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      siteHeader.classList.remove("menu-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  const feedback = contactForm.querySelector("[data-form-feedback]");
  const submitButton = contactForm.querySelector(".contact-submit");
  const isArabic = document.documentElement.lang === "ar";

  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    submitButton.classList.add("is-sending");
    feedback.textContent = isArabic ? "جاري إرسال رسالتك..." : "Sending your message...";

    window.setTimeout(() => {
      submitButton.classList.remove("is-sending");
      feedback.textContent = isArabic
        ? "تم إرسال الرسالة بنجاح. سنعود إليك قريبًا."
        : "Message sent. We will get back to you soon.";
      contactForm.reset();
    }, 1400);
  });
}

const aboutGlowSection = document.querySelector("[data-pointer-glow]");

if (aboutGlowSection) {
  const glow = aboutGlowSection.querySelector(".about-hero-glow");

  aboutGlowSection.addEventListener("pointermove", event => {
    const bounds = aboutGlowSection.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    glow?.style.setProperty("--x", `${x}%`);
    glow?.style.setProperty("--y", `${y}%`);
  });
}

const homeHero = document.querySelector(".hero-home");
const heroGlow = document.querySelector(".hero-pointer-glow");
const heroVisual = document.querySelector(".hero-visual");

if (homeHero && heroGlow) {
  homeHero.addEventListener("pointermove", event => {
    const bounds = homeHero.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    heroGlow.style.setProperty("--x", `${x}%`);
    heroGlow.style.setProperty("--y", `${y}%`);

    if (heroVisual && window.innerWidth > 720) {
      const rotateY = ((x - 50) / 50) * 4;
      const rotateX = ((50 - y) / 50) * 4;
      heroVisual.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  });

  homeHero.addEventListener("pointerleave", () => {
    heroGlow.style.setProperty("--x", "50%");
    heroGlow.style.setProperty("--y", "50%");

    if (heroVisual) {
      heroVisual.style.transform = "";
    }
  });
}
