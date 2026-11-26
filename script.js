const filterButtons = document.querySelectorAll(".filter-button");
const menuCards = document.querySelectorAll(".menu-card");
const cartCount = document.querySelector(".cart-count");
const cartLink = document.querySelector(".cart-link");
const cartMessage = document.querySelector(".cart-message");
const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector(".form-feedback");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

let itemCount = 0;

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    menuCards.forEach((card) => {
      card.hidden = category !== "All" && card.dataset.category !== category;
    });
  });
});

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    itemCount += 1;
    cartCount.textContent = String(itemCount);
    cartLink.setAttribute("aria-label", `Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`);
    cartMessage.textContent = `${button.dataset.dish} added to your cart!`;
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) {
    return;
  }

  const firstName = contactForm.elements.name.value.trim().split(/\s+/)[0];
  formFeedback.textContent = `Thanks, ${firstName}! Your message is ready. We’ll be in touch soon.`;
  contactForm.reset();
});

navToggle.addEventListener("click", () => {
  const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isExpanded));
  navToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navLinks.classList.toggle("is-open", !isExpanded);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    navLinks.classList.remove("is-open");
  });
});
