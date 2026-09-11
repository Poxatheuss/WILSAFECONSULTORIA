const whatsappNumber = "5515991072139";
const defaultMessage = "Olá! Vim pelo site da Wilsafe e gostaria de solicitar um orçamento.";

function whatsappUrl(message = defaultMessage) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = whatsappUrl();
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");

function closeMenu() {
  menu.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const willOpen = !menu.classList.contains("open");
  menu.classList.toggle("open", willOpen);
  menuButton.setAttribute("aria-expanded", String(willOpen));
  document.body.classList.toggle("menu-open", willOpen);
});

menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 24), { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.querySelector("#quoteForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value.trim();
  const company = document.querySelector("#company").value.trim();
  const service = document.querySelector("#service").value;
  const message = document.querySelector("#message").value.trim();
  const text = [
    `Olá! Meu nome é ${name} e vim pelo site da Wilsafe.`,
    company ? `Empresa: ${company}.` : "",
    `Preciso de: ${service}.`,
    message ? `Detalhes: ${message}` : ""
  ].filter(Boolean).join("\n");
  window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
});

document.querySelector("#year").textContent = new Date().getFullYear();
