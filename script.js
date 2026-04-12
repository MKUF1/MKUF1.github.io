const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach(item => revealObserver.observe(item));

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

const mouseGlowAreas = document.querySelectorAll("[data-mouse-glow]");

mouseGlowAreas.forEach(area => {
  area.addEventListener("pointermove", event => {
    const rect = area.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    area.style.setProperty("--mx", `${x}%`);
    area.style.setProperty("--my", `${y}%`);
  });

  area.addEventListener("pointerleave", () => {
    area.style.setProperty("--mx", "50%");
    area.style.setProperty("--my", "40%");
  });
});

const parallaxItems = document.querySelectorAll("[data-parallax]");

parallaxItems.forEach(item => {
  item.addEventListener("pointermove", event => {
    if (window.innerWidth <= 720) return;

    const rect = item.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 8;
    const rotateX = (0.5 - y) * 8;

    item.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  item.addEventListener("pointerleave", () => {
    item.style.transform = "";
  });
});

const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  const feedback = contactForm.querySelector("[data-form-feedback]");
  const submitButton = contactForm.querySelector(".contact-submit");
  const isArabic = document.documentElement.lang === "ar";
  const recipient = "m.core.official.webdevelopment@gmail.com";

  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!submitButton || !feedback) return;

    submitButton.classList.add("is-sending");
    feedback.textContent = isArabic ? "جاري تجهيز الرسالة..." : "Preparing your message...";

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const project = String(formData.get("project") || "");
    const message = String(formData.get("message") || "");

    const subject = isArabic ? `استفسار موقع - ${project}` : `Website Inquiry - ${project}`;
    const body = isArabic
      ? [
          "مرحبًا M Core،",
          "",
          `الاسم: ${name}`,
          `البريد الإلكتروني: ${email}`,
          `نوع المشروع: ${project}`,
          "",
          "الرسالة:",
          message
        ].join("\n")
      : [
          "Hello M Core,",
          "",
          `Full Name: ${name}`,
          `Email Address: ${email}`,
          `Project Type: ${project}`,
          "",
          "Message:",
          message
        ].join("\n");

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.setTimeout(() => {
      submitButton.classList.remove("is-sending");
      feedback.textContent = isArabic
        ? "تم تجهيز الرسالة في تطبيق البريد."
        : "Your message has been prepared in your email app.";
    }, 450);
  });
}
