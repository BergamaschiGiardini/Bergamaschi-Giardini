(() => {
  // Variante servizi 3c: la foto cambia al passaggio del mouse sulla riga.
  document.querySelectorAll("[data-svz-reveal]").forEach((root) => {
    const rows = root.querySelectorAll("[data-svz-row]");
    const imgs = root.querySelectorAll("[data-svz-img]");

    rows.forEach((row) => {
      const attiva = () => {
        const i = row.getAttribute("data-svz-row");
        rows.forEach((r) => r.classList.toggle("is-active", r === row));
        imgs.forEach((im) => im.classList.toggle("is-active", im.getAttribute("data-svz-img") === i));
      };

      // "focus" oltre a "mouseenter": le righe sono <a href>, quindi ricevono
      // gia' il fuoco da tastiera e non serve tabindex. Senza questo, chi naviga
      // con Tab vede la lista scorrere e la foto restare ferma sulla prima.
      row.addEventListener("mouseenter", attiva);
      row.addEventListener("focus", attiva);
    });
  });

  // FAQ variante 03: accordion con una risposta aperta per volta.
  // Le risposte restano visibili se lo script non parte: .is-enhanced attiva il collasso.
  document.querySelectorAll("[data-aree-acc]").forEach((acc) => {
    const items = Array.from(acc.querySelectorAll("[data-aree-acc-item]"));
    const buttons = items.map((item) => item.querySelector("button"));

    if (buttons.some((btn) => !btn)) {
      return;
    }

    acc.classList.add("is-enhanced");

    const setOpen = (openItem) => {
      items.forEach((item, i) => {
        const isOpen = item === openItem;
        item.classList.toggle("is-open", isOpen);
        buttons[i].setAttribute("aria-expanded", String(isOpen));
      });
    };

    items.forEach((item, i) => {
      buttons[i].setAttribute("aria-expanded", String(item.classList.contains("is-open")));
      buttons[i].addEventListener("click", () => {
        setOpen(item.classList.contains("is-open") ? null : item);
      });
    });
  });

  // Mappa aree: la forma sulla mappa e la riga in lista si accendono insieme, nei due versi.
  // L'accoppiamento e' data-comune sulla forma e l'href sulla riga.
  // Se lo script non parte la sezione resta leggibile e i link funzionano: qui non si nasconde niente.
  document.querySelectorAll("[data-aree-mappa]").forEach((sezione) => {
    const lista = sezione.querySelector(".aree-vicine__list");
    if (!lista) {
      return;
    }

    const righe = new Map();
    lista.querySelectorAll("a[href]").forEach((riga) => {
      righe.set(riga.getAttribute("href").replace(/^.*\//, "").replace(/\.html$/, ""), riga);
    });

    // Una forma senza riga corrispondente resta inerte: accenderla romperebbe la sincronia.
    const coppie = Array.from(sezione.querySelectorAll("[data-comune]"))
      .map((forma) => {
        const slug = forma.getAttribute("data-comune");
        return { slug: slug, forma: forma, riga: righe.get(slug) };
      })
      .filter((coppia) => coppia.riga);

    if (!coppie.length) {
      return;
    }

    const motoRidotto = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pinned = null;
    let preview = null;

    const render = () => {
      coppie.forEach(({ slug, forma, riga }) => {
        const isPinned = slug === pinned;
        const isPreview = slug === preview;
        forma.classList.toggle("is-pinned", isPinned);
        forma.classList.toggle("is-preview", isPreview);
        forma.setAttribute("aria-pressed", String(isPinned));
        riga.classList.toggle("is-pinned", isPinned);
        riga.classList.toggle("is-preview", isPreview);
      });
    };

    // Si scrolla il solo contenitore: scrollIntoView trascinerebbe anche la pagina.
    const centra = (riga) => {
      const r = riga.getBoundingClientRect();
      const l = lista.getBoundingClientRect();
      lista.scrollTo({
        top: lista.scrollTop + (r.top - l.top) - (lista.clientHeight - r.height) / 2,
        behavior: motoRidotto.matches ? "auto" : "smooth"
      });
    };

    // Il clic fissa la selezione e porta la riga in vista. Non naviga: alla pagina ci si va dal nome.
    const fissa = ({ slug, riga }) => {
      pinned = pinned === slug ? null : slug;
      render();
      if (pinned) {
        centra(riga);
      }
    };

    coppie.forEach((coppia) => {
      const accendi = () => {
        preview = coppia.slug;
        render();
      };
      const spegni = () => {
        preview = null;
        render();
      };

      [coppia.forma, coppia.riga].forEach((el) => {
        el.addEventListener("pointerenter", accendi);
        el.addEventListener("pointerleave", spegni);
        el.addEventListener("focus", accendi);
        el.addEventListener("blur", spegni);
      });

      coppia.forma.addEventListener("click", () => fissa(coppia));
      coppia.forma.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          fissa(coppia);
        }
      });
    });

    render();
  });
})();
