(() => {
  const navbar = document.querySelector(".site-navbar");
  const menuToggle = navbar?.querySelector(".site-navbar__toggle");
  const navigation = navbar?.querySelector(".site-navbar__nav");
  const servicesItem = navbar?.querySelector(".site-navbar__item--has-dropdown");
  const servicesToggle = navbar?.querySelector(".site-navbar__services-toggle");

  if (!navbar || !menuToggle || !navigation || !servicesItem || !servicesToggle) {
    return;
  }

  navbar.classList.add("is-enhanced");
  menuToggle.hidden = false;
  servicesToggle.hidden = false;

  const setServicesMenu = (isOpen) => {
    servicesToggle.setAttribute("aria-expanded", String(isOpen));
    servicesToggle.setAttribute("aria-label", `${isOpen ? "Chiudi" : "Apri"} il menu Servizi`);
    servicesItem.classList.toggle("is-open", isOpen);
  };

  const setMainMenu = (isOpen) => {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", `${isOpen ? "Chiudi" : "Apri"} il menu principale`);
    menuToggle.querySelector(".site-navbar__toggle-label").textContent = isOpen ? "Chiudi" : "Menu";
    menuToggle.querySelector(".site-navbar__toggle-icon").textContent = isOpen ? "×" : "☰";

    if (!isOpen) {
      setServicesMenu(false);
    }
  };

  menuToggle.addEventListener("click", () => {
    setMainMenu(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  servicesToggle.addEventListener("click", () => {
    setServicesMenu(servicesToggle.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMainMenu(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (!navbar.contains(event.target)) {
      setMainMenu(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    if (servicesToggle.getAttribute("aria-expanded") === "true") {
      setServicesMenu(false);
      servicesToggle.focus();
      return;
    }

    if (menuToggle.getAttribute("aria-expanded") === "true") {
      setMainMenu(false);
      menuToggle.focus();
    }
  });
})();
