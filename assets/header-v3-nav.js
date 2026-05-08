(() => {
  const DESKTOP_BREAKPOINT = 990;

  const closeMenu = (details) => {
    if (!details) {
      return;
    }

    details.removeAttribute("open");
    const summary = details.querySelector("summary");

    if (summary) {
      summary.setAttribute("aria-expanded", "false");
    }
  };

  const openMenu = (details) => {
    if (!details) {
      return;
    }

    details.setAttribute("open", "open");
    const summary = details.querySelector("summary");

    if (summary) {
      summary.setAttribute("aria-expanded", "true");
    }
  };

  const initDesktopHover = () => {
    const detailsList = Array.from(document.querySelectorAll(".header-v3-menu__details"));

    if (!detailsList.length) {
      return;
    }

    let closeTimer = null;

    detailsList.forEach((details) => {
      const summary = details.querySelector("summary");
      const overlay = details.querySelector(".header-v3-menu__overlay");

      if (!summary) {
        return;
      }

      details.addEventListener("mouseenter", () => {
        if (window.innerWidth < DESKTOP_BREAKPOINT) {
          return;
        }

        window.clearTimeout(closeTimer);
        detailsList.forEach((menuDetails) => {
          if (menuDetails !== details) {
            closeMenu(menuDetails);
          }
        });
        openMenu(details);
      });

      details.addEventListener("mouseleave", () => {
        if (window.innerWidth < DESKTOP_BREAKPOINT) {
          return;
        }

        window.clearTimeout(closeTimer);
        closeTimer = window.setTimeout(() => {
          closeMenu(details);
        }, 120);
      });

      summary.addEventListener("click", (event) => {
        if (window.innerWidth < DESKTOP_BREAKPOINT) {
          return;
        }

        event.preventDefault();
      });

      if (overlay) {
        overlay.addEventListener("click", () => {
          closeMenu(details);
        });
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth < DESKTOP_BREAKPOINT) {
        detailsList.forEach((details) => {
          closeMenu(details);
        });
      }
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    initDesktopHover();
  });
})();
