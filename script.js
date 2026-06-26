const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const revealElements = document.querySelectorAll(".reveal");
const categoryButtons = document.querySelectorAll(".menu-tabs button");
const menuCards = document.querySelectorAll(".menu-card");
const timeButtons = document.querySelectorAll(".time-picker button");
const reservationButton = document.querySelector(".booking-card .btn");
const dateInput = document.querySelector("[name='date']");

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const showCategory = (category) => {
  categoryButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.category === category);
  });

  menuCards.forEach((card) => {
    card.hidden = card.dataset.category !== category;
  });
};

showCategory(document.querySelector(".menu-tabs .active")?.dataset.category ?? "entradas");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showCategory(button.dataset.category);
  });
});

timeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    timeButtons.forEach((item) => item.classList.toggle("selected", item === button));
  });
});

reservationButton.addEventListener("click", () => {
  const selectedTime = document.querySelector(".time-picker .selected")?.textContent.trim() ?? "20:30";
  const date = dateInput.value || "la fecha elegida";
  const guests = document.querySelector("[name='guests']").value;
  const text = encodeURIComponent(
    `Hola Uspallata Bodegón, quiero reservar una mesa para ${guests} el ${date} a las ${selectedTime}.`
  );

  window.open(`https://wa.me/5491123456789?text=${text}`, "_blank", "noopener,noreferrer");
});

dateInput.min = new Date().toISOString().split("T")[0];
