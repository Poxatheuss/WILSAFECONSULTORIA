const whatsappNumber = "5515991427570";
const defaultMessage = "Olá! Vim pelo site da Wilsafe e gostaria de solicitar um orçamento.";

function whatsappUrl(message = defaultMessage) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = whatsappUrl(link.dataset.whatsappMessage || defaultMessage);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");
const servicesDropdown = document.querySelector(".nav-dropdown");
const servicesToggle = document.querySelector(".nav-services-toggle");

function closeServices() {
  servicesDropdown?.classList.remove("open");
  servicesToggle?.setAttribute("aria-expanded", "false");
}

function closeMenu() {
  if (!menu || !menuButton) return;
  menu.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
  closeServices();
}

menuButton?.addEventListener("click", () => {
  const willOpen = !menu.classList.contains("open");
  menu.classList.toggle("open", willOpen);
  menuButton.setAttribute("aria-expanded", String(willOpen));
  document.body.classList.toggle("menu-open", willOpen);
});

servicesToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  const willOpen = !servicesDropdown.classList.contains("open");
  servicesDropdown.classList.toggle("open", willOpen);
  servicesToggle.setAttribute("aria-expanded", String(willOpen));
});

document.addEventListener("click", (event) => {
  if (!servicesDropdown?.contains(event.target)) closeServices();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeServices();
    closeMenu();
  }
});

menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("scroll", () => header?.classList.toggle("scrolled", window.scrollY > 24), { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
