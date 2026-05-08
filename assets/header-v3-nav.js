(() => {
  const DESKTOP_BREAKPOINT = 990;

  const getDockAnchor = (menuRoot) =>
    menuRoot.closest(".header-wrapper") || menuRoot.closest("sticky-header") || menuRoot.closest("header");

  const syncPanelDock = (menuRoot, panelContainer) => {
    if (!panelContainer || window.innerWidth < DESKTOP_BREAKPOINT) {
      return;
    }

    const anchor = getDockAnchor(menuRoot);

    if (!anchor) {
      return;
    }

    const rect = anchor.getBoundingClientRect();
    panelContainer.style.top = `${Math.round(rect.bottom)}px`;
  };

  const activateL2Tab = (megaPanel, panelContainer, tabIndexStr) => {
    if (!megaPanel || !panelContainer || !tabIndexStr) {
      return;
    }

    megaPanel.querySelectorAll("[data-v3-l2-tab]").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.v3L2Tab === tabIndexStr);
    });

    megaPanel.querySelectorAll("[data-v3-l2-panel]").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.v3L2Panel === tabIndexStr);
    });

    const activeMega = panelContainer.querySelector(".header-v3-mega.is-active");

    if (activeMega) {
      panelContainer.style.height = `${activeMega.scrollHeight}px`;
    }
  };

  const resetL2ToDefault = (megaPanel, panelContainer) => {
    const split = megaPanel.querySelector("[data-v3-default-l2]");

    if (!split || !split.dataset.v3DefaultL2) {
      return;
    }

    activateL2Tab(megaPanel, panelContainer, split.dataset.v3DefaultL2);
  };

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

      const measureActiveMega = () => {
        const activeMega = panelContainer.querySelector(".header-v3-mega.is-active");

        if (!activeMega) {
          return;
        }

        setPanelContainerHeight(activeMega.scrollHeight);
      };

      const resetOpenState = () => {
        const activeMega = panelContainer.querySelector(".header-v3-mega.is-active");

        if (activeMega) {
          resetL2ToDefault(activeMega, panelContainer);
        }

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

        syncPanelDock(menuRoot, panelContainer);

        window.requestAnimationFrame(() => {
          measureActiveMega();
        });
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

      panelContainer.addEventListener("mouseover", (event) => {
        if (window.innerWidth < DESKTOP_BREAKPOINT) {
          return;
        }

        const l2Link = event.target.closest("[data-v3-l2-tab]");

        if (!l2Link || !panelContainer.contains(l2Link)) {
          return;
        }

        const mega = l2Link.closest(".header-v3-mega");

        if (!mega || !mega.classList.contains("is-active")) {
          return;
        }

        const tabId = l2Link.dataset.v3L2Tab;

        if (!tabId || l2Link.classList.contains("is-active")) {
          return;
        }

        activateL2Tab(mega, panelContainer, tabId);
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

        syncPanelDock(menuRoot, panelContainer);
        measureActiveMega();
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
