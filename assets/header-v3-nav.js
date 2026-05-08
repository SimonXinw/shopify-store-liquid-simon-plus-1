(() => {
  const DESKTOP_BREAKPOINT = 990;

  const initDesktopHover = () => {
    const menuRoots = Array.from(document.querySelectorAll("[data-v3-menu]"));

    if (!menuRoots.length) {
      return;
    }

    menuRoots.forEach((menuRoot) => {
      const panelContainer = menuRoot.querySelector("[data-v3-panels]");
      const triggers = Array.from(menuRoot.querySelectorAll("[data-v3-panel-trigger]"));
      const panels = Array.from(menuRoot.querySelectorAll("[data-v3-panel]"));
      const overlay = menuRoot.querySelector(".header-v3-menu__overlay");

      if (!panelContainer || !triggers.length || !panels.length) {
        return;
      }

      let activePanelId = "";
      let closeTimer = null;

      const setPanelContainerHeight = (heightValue) => {
        panelContainer.style.height = `${heightValue}px`;
      };

      const resetOpenState = () => {
        menuRoot.classList.remove("is-panel-open");
        activePanelId = "";
        setPanelContainerHeight(0);

        triggers.forEach((trigger) => {
          trigger.setAttribute("aria-expanded", "false");
        });

        panels.forEach((panel) => {
          panel.classList.remove("is-active");
        });
      };

      const openPanelById = (panelId) => {
        const nextPanel = panels.find((panel) => panel.dataset.v3Panel === panelId);
        const nextTrigger = triggers.find((trigger) => trigger.dataset.v3PanelTrigger === panelId);

        if (!nextPanel || !nextTrigger) {
          return;
        }

        activePanelId = panelId;
        menuRoot.classList.add("is-panel-open");

        panels.forEach((panel) => {
          panel.classList.toggle("is-active", panel === nextPanel);
        });

        triggers.forEach((trigger) => {
          trigger.setAttribute("aria-expanded", trigger === nextTrigger ? "true" : "false");
        });

        setPanelContainerHeight(nextPanel.scrollHeight);
      };

      const scheduleClose = () => {
        window.clearTimeout(closeTimer);
        closeTimer = window.setTimeout(() => {
          resetOpenState();
        }, 140);
      };

      const cancelClose = () => {
        window.clearTimeout(closeTimer);
      };

      triggers.forEach((trigger) => {
        const panelId = trigger.dataset.v3PanelTrigger;

        trigger.addEventListener("mouseenter", () => {
          if (window.innerWidth < DESKTOP_BREAKPOINT) {
            return;
          }

          cancelClose();
          openPanelById(panelId);
        });

        trigger.addEventListener("focus", () => {
          if (window.innerWidth < DESKTOP_BREAKPOINT) {
            return;
          }

          cancelClose();
          openPanelById(panelId);
        });
      });

      menuRoot.addEventListener("mouseenter", () => {
        if (window.innerWidth < DESKTOP_BREAKPOINT) {
          return;
        }

        cancelClose();
      });

      menuRoot.addEventListener("mouseleave", () => {
        if (window.innerWidth < DESKTOP_BREAKPOINT) {
          return;
        }

        scheduleClose();
      });

      panelContainer.addEventListener("mouseenter", () => {
        if (window.innerWidth < DESKTOP_BREAKPOINT) {
          return;
        }

        cancelClose();
      });

      panelContainer.addEventListener("mouseleave", () => {
        if (window.innerWidth < DESKTOP_BREAKPOINT) {
          return;
        }

        scheduleClose();
      });

      if (overlay) {
        overlay.addEventListener("click", () => {
          resetOpenState();
        });
      }

      window.addEventListener("resize", () => {
        if (window.innerWidth < DESKTOP_BREAKPOINT) {
          resetOpenState();
          return;
        }

        if (!activePanelId) {
          return;
        }

        openPanelById(activePanelId);
      });
    });
  };

  const initRegionPickers = () => {
    const roots = document.querySelectorAll("[data-v3-region-picker]");

    if (!roots.length) {
      return;
    }

    const hideCountryList = (listElement) => {
      if (!listElement) {
        return;
      }

      listElement.style.display = "none";
    };

    roots.forEach((root) => {
      const trigger = root.querySelector(".country_container");
      const listElement = root.querySelector(".country_list");

      if (!trigger || !listElement) {
        return;
      }

      trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = listElement.style.display === "block";

        roots.forEach((pickerRoot) => {
          const pickerList = pickerRoot.querySelector(".country_list");
          hideCountryList(pickerList);
        });

        if (!isOpen) {
          listElement.style.display = "block";
        }
      });
    });

    document.addEventListener("click", () => {
      roots.forEach((root) => {
        const listElement = root.querySelector(".country_list");
        hideCountryList(listElement);
      });
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    initDesktopHover();
    initRegionPickers();
  });
})();
