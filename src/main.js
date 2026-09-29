import './style.css';
import { GlobeScene } from './scene/GlobeScene.js';
import { Timeline } from './ui/Timeline.js';
import { Sidebar } from './ui/Sidebar.js';
import { FullCatalogModal } from './ui/FullCatalogModal.js';
import { PaleoAI } from './utils/PaleoAI.js';

class AncientEarthApp {
  constructor() {
    this.periods = [];
    this.fauna = [];
    this.cities = [];
    this.tectonicsData = null;
    this.activeCity = null;
    this.currentPeriodIndex = 0;
    this.currentPeriod = null;
    this.selectedSpecies = null;
    this.extinctions = [];
    this.currentExtinction = null;
    this.isExtinctionHudOpen = false;
    this.globeScene = null;
    this.timeline = null;
    this.sidebar = null;
    this.fullCatalogModal = null;
    this.paleoAI = null;

    this.init();
  }

  async init() {
    try {
      // 1. Fetch geological, paleobiological, city, tectonics & extinctions datasets
      const [periodsRes, faunaRes, citiesRes, tectonicsRes, extinctionsRes] = await Promise.all([
        fetch('./data/fauna_flora.json'),
        fetch('./data/fauna.json'),
        fetch('./data/cities.json'),
        fetch('./data/tectonics.json'),
        fetch('./data/extinctions.json')
      ]);

      if (!periodsRes.ok) {
        throw new Error(`Failed to load geological data: ${periodsRes.statusText}`);
      }
      if (!faunaRes.ok) {
        throw new Error(`Failed to load fauna catalog: ${faunaRes.statusText}`);
      }

      const periodsData = await periodsRes.json();
      this.periods = periodsData.periods;
      this.fauna = await faunaRes.json();
      if (citiesRes.ok) {
        this.cities = await citiesRes.json();
      }
      if (tectonicsRes.ok) {
        this.tectonicsData = await tectonicsRes.json();
      }
      if (extinctionsRes.ok) {
        const extData = await extinctionsRes.json();
        this.extinctions = extData.extinctions || [];
      }

      // Initialize PaleoAI Scientific Intelligence Engine
      this.paleoAI = new PaleoAI({
        periods: this.periods,
        fauna: this.fauna,
        extinctions: this.extinctions,
        cities: this.cities
      });

      // 2. Initialize Three.js Scene
      const globeContainer = document.getElementById('globe-container');
      this.globeScene = new GlobeScene(
        globeContainer, 
        (speciesHit) => {
          // When user clicks a 3D pin marker on the globe
          if (speciesHit) {
            this.selectSpecies(speciesHit);
            if (this.sidebar) {
              this.sidebar.highlightFossil(speciesHit);
            }
          }
        },
        (boundaryHit) => {
          this._onTectonicBoundarySelected(boundaryHit);
        },
        (plateHit) => {
          this._onTectonicPlateSelected(plateHit);
        }
      );

      if (this.tectonicsData) {
        this.globeScene.setTectonicsData(this.tectonicsData);
      }

      // 3. Initialize Sidebar
      const sidebarMount = document.getElementById('sidebar-mount');
      this.sidebar = new Sidebar(
        sidebarMount,
        (speciesData) => {
          // "Ver Zona de Distribución" trigger from species card
          this.selectSpecies(speciesData);
        },
        (speciesData, period) => {
          // Open HD Specimen Inspection Modal
          this._openSpecimenModal(speciesData, period);
        },
        () => {
          // Reset zone: restore all points
          this.resetSpeciesSelection();
        },
        () => {
          // Open full catalog modal
          this.openFullCatalog();
        }
      );

      // 3.1. Initialize Full Catalog Modal (Enciclopedia de 57 Especies)
      const fullCatalogDialog = document.getElementById('full-catalog-dialog');
      if (fullCatalogDialog) {
        this.fullCatalogModal = new FullCatalogModal({
          dialogElement: fullCatalogDialog,
          fauna: this.fauna,
          periods: this.periods,
          onSelectSpeciesOnGlobe: (species, targetPeriod, periodIndex) => {
            this.selectSpeciesFromCatalog(species, targetPeriod, periodIndex);
          },
          onOpenSpecimenModal: (species, period) => {
            this._openSpecimenModal(species, period || this.currentPeriod);
          }
        });
      }

      // 4. Initialize Timeline Scrubber (executes filtering strictly on slider event, never in RAF)
      const timelineMount = document.getElementById('timeline-mount');
      this.timeline = new Timeline(timelineMount, this.periods, (period, index) => {
        this.onPeriodChange(period, index);
      });

      // 5. Setup Header Navigation & Luxury Actions
      this._setupHeaderActions();

      // 6. Setup Specimen Modal Events
      this._setupSpecimenModalEvents();

      // 7. Setup Concierge AI Assistant
      this._setupConciergeActions();

      // 8. Populate Geological Eras Dialog
      this._populateErasDialog();

      // 9. Setup Continental Drift City Search & Dialog
      this._setupCitySearch();
      this._setupCityDriftDialog();

      // 10. Setup 3D Tectonic Plates & Boundaries Controls
      this._setupTectonicsControls();

      // 11. Setup 3D Mass Extinctions Simulation Controls
      this._setupExtinctionControls();

      // 12. Load Initial Period (Present Day 0 Ma)
      const initialPeriod = this.periods[0];
      this.currentPeriod = initialPeriod;
      const initialFauna = this.filterFauna(initialPeriod.timeMa, initialPeriod);
      await this.globeScene.setPeriod(initialPeriod, initialFauna);
      this.sidebar.update(initialPeriod, initialFauna, null);

      // Start in clean Google Earth mode (unobstructed 3D Earth at Present Day 0 Ma)
      const sidebarPanel = document.getElementById('sidebar-panel');
      if (sidebarPanel) {
        sidebarPanel.classList.add('closed');
      }
      if (this.sidebar) {
        this.sidebar.isOpen = false;
      }
      document.body.classList.add('explorer-mode-active');
      const navHero = document.getElementById('nav-btn-hero');
      if (navHero) navHero.classList.add('active');
      this.globeScene.resetView();

      // Pre-warm adjacent periods for silky scrubbing
      this.globeScene.textureManager.prefetchPeriods(this.periods, 0, 3);

      console.info(`[AncientEarthApp] Engine initialized with ${this.fauna.length} cataloged fossil species across ${this.periods.length} geological periods.`);
    } catch (err) {
      console.error('[AncientEarthApp] Error initializing application:', err);
    }
  }

  /**
   * Filters the fauna catalog by targetMa (millions of years ago)
   * Mathematical condition: startMa >= (targetMa - tolerance) && endMa <= (targetMa + tolerance)
   * Executed strictly on slider event, never per animation frame.
   */
  filterFauna(targetMa, period = null) {
    if (!this.fauna || this.fauna.length === 0) return [];

    // For Present Day (0 Ma / Holocene / Quaternary), strictly include species of the Quaternary (<= 5.0 Ma start, <= 0.05 Ma end)
    // and period-specific species (Glyptodon, Smilodon, Mammuthus, Megatherium, Macrauchenia, Mastodonte, etc.).
    // Prevent Neogene/Miocene creatures like Megalodon (extinct 3.6 Ma ago) or Archaic cyanobacteria from leaking into Present.
    // Strictly rely on canonical this.fauna to prevent duplicate species markers on the 3D globe.
    if (targetMa === 0 || (period && (period.id === 'present_0ma' || period.id === 'quaternary'))) {
      return this.fauna.filter(sp => {
        const start = sp.startMa !== undefined ? sp.startMa : 0;
        const end = sp.endMa !== undefined ? sp.endMa : 999;
        const pId = (sp.periodId || '').toLowerCase();
        return (start <= 5.0) && (end <= 0.05 || pId.includes('cuaternario') || pId.includes('holoceno') || pId.includes('pleistoceno'));
      });
    }

    // Realistic geological tolerance calibrated to era spans
    const tol = Math.min(28, Math.max(8, targetMa * 0.10));

    let filtered = this.fauna.filter(sp => {
      const s = sp.startMa ?? 0;
      const e = sp.endMa ?? 0;
      return (s >= (targetMa - tol)) && (e <= (targetMa + tol));
    });

    // Complement with exact periodId match for historical fidelity
    if (period && period.id) {
      const pId = period.id.toLowerCase();
      const periodMatches = this.fauna.filter(sp => {
        if (!sp.periodId) return false;
        const fP = sp.periodId.toLowerCase();
        return pId.includes(fP) || fP.includes(pId) ||
          (pId.includes('cretaceous') && fP.includes('cretacico')) ||
          (pId.includes('jurassic') && fP.includes('jurasico')) ||
          (pId.includes('triassic') && fP.includes('triasico')) ||
          (pId.includes('permian') && fP.includes('permico')) ||
          (pId.includes('carboniferous') && fP.includes('carbonifero')) ||
          (pId.includes('devonian') && fP.includes('devonico')) ||
          (pId.includes('silurian') && fP.includes('silurico')) ||
          (pId.includes('ordovician') && fP.includes('ordovicico')) ||
          (pId.includes('cambrian') && fP.includes('cambrico')) ||
          (pId.includes('ediacaran') && fP.includes('ediacarico')) ||
          (pId.includes('cryogenian') && fP.includes('criogenico'));
      });

      const map = new Map();
      [...filtered, ...periodMatches].forEach(item => map.set(item.id, item));
      filtered = Array.from(map.values());
    }

    return filtered;
  }

  /**
   * Selects a single species: projects its geographic distribution zone and smooth focuses on it
   */
  selectSpecies(sp) {
    if (!sp || !this.currentPeriod) return;
    this.selectedSpecies = sp;
    this.globeScene.showSpeciesZone(sp, this.currentPeriod.iugsColor);
    const activeFauna = this.filterFauna(this.currentPeriod.timeMa, this.currentPeriod);
    this.sidebar.update(this.currentPeriod, activeFauna, this.selectedSpecies);
  }

  /**
   * Clears species selection: restores individual point markers for all active fauna
   */
  resetSpeciesSelection() {
    this.selectedSpecies = null;
    if (!this.currentPeriod) return;
    const activeFauna = this.filterFauna(this.currentPeriod.timeMa, this.currentPeriod);
    this.globeScene.showAllSpeciesPoints(activeFauna, this.currentPeriod.iugsColor);
    this.sidebar.update(this.currentPeriod, activeFauna, null);
  }

  _setupHeaderActions() {
    // Brand Home & Nav links (Reset to global overview)
    const brandHome = document.getElementById('brand-home');
    const navBtnHero = document.getElementById('nav-btn-hero');
    if (brandHome) brandHome.addEventListener('click', () => this.resetToHomeView());
    if (navBtnHero) navBtnHero.addEventListener('click', () => this.resetToHomeView());

    const navBtnEras = document.getElementById('nav-btn-eras');
    const erasDialog = document.getElementById('eras-dialog');
    const btnCloseEras = document.getElementById('btn-close-eras');
    if (navBtnEras && erasDialog) {
      navBtnEras.addEventListener('click', () => erasDialog.showModal());
    }
    if (btnCloseEras && erasDialog) {
      btnCloseEras.addEventListener('click', () => erasDialog.close());
    }
    if (erasDialog) {
      erasDialog.addEventListener('click', (e) => {
        if (e.target === erasDialog) erasDialog.close();
      });
    }

    const navBtnCatalog = document.getElementById('nav-btn-catalog');
    if (navBtnCatalog) {
      navBtnCatalog.addEventListener('click', () => {
        this.openFullCatalog();
      });
    }

    const navBtnFossil = document.getElementById('nav-btn-fossil');
    if (navBtnFossil) {
      navBtnFossil.addEventListener('click', () => {
        this.openPaleobiology();
      });
    }

    // Global keyboard shortcuts: [C] for Full Catalog, [F] for Paleobiology
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'c' || e.key === 'C') {
        if (this.fullCatalogModal && this.fullCatalogModal.isOpen()) {
          this.fullCatalogModal.close();
        } else {
          this.openFullCatalog();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        this.openPaleobiology();
      }
    });

    const navBtnTimeline = document.getElementById('nav-btn-timeline');
    if (navBtnTimeline) {
      navBtnTimeline.addEventListener('click', () => {
        const navBtnFossil = document.getElementById('nav-btn-fossil');
        if (navBtnFossil) navBtnFossil.classList.remove('active');
        this.enterExplorerMode();
      });
    }

    // Methodology & Info Dialog
    const navBtnMethodology = document.getElementById('nav-btn-methodology');
    const btnHeroGuide = document.getElementById('btn-hero-guide');
    const infoDialog = document.getElementById('info-dialog');
    const btnCloseDialog = document.getElementById('btn-close-dialog');

    if (navBtnMethodology && infoDialog) {
      navBtnMethodology.addEventListener('click', () => infoDialog.showModal());
    }
    if (btnHeroGuide && infoDialog) {
      btnHeroGuide.addEventListener('click', () => infoDialog.showModal());
    }
    if (btnCloseDialog && infoDialog) {
      btnCloseDialog.addEventListener('click', () => infoDialog.close());
    }
    if (infoDialog) {
      infoDialog.addEventListener('click', (e) => {
        if (e.target === infoDialog) infoDialog.close();
      });
    }

    // Fullscreen Toggle
    const btnFullscreen = document.getElementById('btn-fullscreen');
    if (btnFullscreen) {
      btnFullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      });
    }

    // Setup Mobile Navigation Drawer
    this._setupMobileNavigation();
  }

  _setupMobileNavigation() {
    const btnMobileMenu = document.getElementById('btn-mobile-menu');
    const drawer = document.getElementById('mobile-nav-drawer');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    const btnCloseDrawer = document.getElementById('btn-close-mobile-drawer');

    const openDrawer = () => {
      if (drawer) drawer.classList.add('active');
      if (backdrop) backdrop.classList.add('active');
    };

    const closeDrawer = () => {
      if (drawer) drawer.classList.remove('active');
      if (backdrop) backdrop.classList.remove('active');
    };

    if (btnMobileMenu) btnMobileMenu.addEventListener('click', openDrawer);
    if (btnCloseDrawer) btnCloseDrawer.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    // Links inside mobile drawer
    const bindDrawerLink = (id, callback) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', () => {
          closeDrawer();
          callback();
        });
      }
    };

    bindDrawerLink('mobile-nav-home', () => this.resetToHomeView());
    bindDrawerLink('mobile-nav-catalog', () => this.openFullCatalog());
    bindDrawerLink('mobile-nav-eras', () => {
      const erasDialog = document.getElementById('eras-dialog');
      if (erasDialog) erasDialog.showModal();
    });
    bindDrawerLink('mobile-nav-fossil', () => this.openPaleobiology());
    bindDrawerLink('mobile-nav-timeline', () => this.enterExplorerMode());
    bindDrawerLink('mobile-nav-tectonics', () => {
      const btnTect = document.getElementById('btn-toggle-tectonics-header');
      if (btnTect) btnTect.click();
    });
    bindDrawerLink('mobile-nav-extinctions', () => {
      const btnExt = document.getElementById('btn-toggle-extinctions-header');
      if (btnExt) btnExt.click();
    });
    bindDrawerLink('mobile-nav-city-drift', () => {
      const cityDialog = document.getElementById('city-drift-dialog');
      if (cityDialog) cityDialog.showModal();
    });
    bindDrawerLink('mobile-nav-methodology', () => {
      const infoDialog = document.getElementById('info-dialog');
      if (infoDialog) infoDialog.showModal();
    });

    // Mobile Paleontology Search (Species, Fossils, Eras)
    const mobileSpInput = document.getElementById('mobile-species-search-input');
    const mobileSpSuggestions = document.getElementById('mobile-species-suggestions');
    const mobileSpClearBtn = document.getElementById('btn-clear-species-mobile');

    if (mobileSpInput && mobileSpSuggestions) {
      mobileSpInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (mobileSpClearBtn) mobileSpClearBtn.style.display = query ? 'block' : 'none';

        if (!query) {
          mobileSpSuggestions.style.display = 'none';
          mobileSpSuggestions.innerHTML = '';
          return;
        }

        const matches = (this.fauna || []).filter(sp => {
          const common = (sp.commonName || '').toLowerCase();
          const sci = (sp.scientificName || sp.name || '').toLowerCase();
          const grp = (sp.clade || sp.group || '').toLowerCase();
          const env = (sp.environment || '').toLowerCase();
          const pId = (sp.periodId || '').toLowerCase();
          return common.includes(query) || sci.includes(query) || grp.includes(query) || env.includes(query) || pId.includes(query);
        }).slice(0, 6);

        if (matches.length > 0) {
          mobileSpSuggestions.innerHTML = matches.map(sp => {
            const common = sp.commonName || sp.name;
            const sci = sp.scientificName || sp.name;
            const era = sp.timeRange || (sp.startMa !== undefined ? `${sp.startMa} Ma` : '');
            const imgUrl = sp.media ? sp.media.imageUrl : (sp.image || 'assets/species/allosaurus.jpg');
            return `
              <div class="species-suggestion-item" data-species-id="${sp.id}">
                <img src="./${imgUrl}" class="species-sug-thumb" alt="${common}" onerror="this.src='./favicon.svg'; this.style.opacity=0.4;" />
                <div class="species-sug-info">
                  <div class="species-sug-name">${common}</div>
                  <div class="species-sug-meta">${sci} • ⏳ ${era}</div>
                </div>
              </div>
            `;
          }).join('');
          mobileSpSuggestions.style.display = 'block';
        } else {
          mobileSpSuggestions.style.display = 'none';
        }
      });

      mobileSpSuggestions.addEventListener('click', (e) => {
        const item = e.target.closest('.species-suggestion-item');
        if (!item) return;
        const spId = item.dataset.speciesId;
        const sp = (this.fauna || []).find(s => s.id === spId);
        if (sp) {
          closeDrawer();
          mobileSpInput.value = sp.commonName || sp.name;
          mobileSpSuggestions.style.display = 'none';
          
          // Find matching period and select species
          let targetPeriod = this.periods[0];
          let periodIndex = 0;
          if (this.fullCatalogModal && typeof this.fullCatalogModal.getBestPeriodForSpecies === 'function') {
            const res = this.fullCatalogModal.getBestPeriodForSpecies(sp);
            targetPeriod = res.period;
            periodIndex = res.index;
          } else {
            const targetMa = (sp.startMa !== undefined && sp.endMa !== undefined) ? (sp.startMa + sp.endMa) / 2 : (sp.startMa || 0);
            let minDiff = Infinity;
            this.periods.forEach((p, idx) => {
              const diff = Math.abs(p.timeMa - targetMa);
              if (diff < minDiff) {
                minDiff = diff;
                targetPeriod = p;
                periodIndex = idx;
              }
            });
          }
          this.selectSpeciesFromCatalog(sp, targetPeriod, periodIndex);
        }
      });

      if (mobileSpClearBtn) {
        mobileSpClearBtn.addEventListener('click', () => {
          mobileSpInput.value = '';
          mobileSpClearBtn.style.display = 'none';
          mobileSpSuggestions.style.display = 'none';
        });
      }
    }
  }

  /**
   * Sets up the dedicated City Drift Curiosity & Geographic Reference Dialog
   */
  _setupCityDriftDialog() {
    const dialog = document.getElementById('city-drift-dialog');
    const btnClose = document.getElementById('btn-close-city-dialog');
    const input = document.getElementById('dialog-city-search-input');
    const clearBtn = document.getElementById('btn-clear-city-dialog');
    const suggestions = document.getElementById('dialog-city-suggestions');
    const chipsContainer = document.getElementById('popular-cities-chips');

    if (btnClose && dialog) {
      btnClose.addEventListener('click', () => dialog.close());
    }

    if (input && suggestions) {
      input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';

        if (!query) {
          suggestions.style.display = 'none';
          suggestions.innerHTML = '';
          return;
        }

        const matches = (this.cities || []).filter(c =>
          c.name.toLowerCase().includes(query) ||
          c.country.toLowerCase().includes(query)
        ).slice(0, 6);

        if (matches.length > 0) {
          suggestions.innerHTML = matches.map(c => `
            <div class="city-suggestion-item" data-city-name="${c.name}">
              <div class="city-sug-name">${c.name}</div>
              <div class="city-sug-country">${c.country} • Placa ${c.plate}</div>
            </div>
          `).join('');
          suggestions.style.display = 'block';
        } else {
          suggestions.style.display = 'none';
        }
      });

      suggestions.addEventListener('click', (e) => {
        const item = e.target.closest('.city-suggestion-item');
        if (!item) return;
        const cityName = item.dataset.cityName;
        const city = (this.cities || []).find(c => c.name === cityName);
        if (city) {
          if (dialog) dialog.close();
          this.selectCity(city);
          input.value = `${city.name}, ${city.country}`;
          suggestions.style.display = 'none';
        }
      });

      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          input.value = '';
          clearBtn.style.display = 'none';
          suggestions.style.display = 'none';
        });
      }
    }

    // Popular city chips click
    if (chipsContainer) {
      chipsContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.city-chip');
        if (!chip) return;
        const targetName = chip.dataset.city;
        const city = (this.cities || []).find(c => c.name.toLowerCase() === targetName.toLowerCase());
        if (city) {
          if (dialog) dialog.close();
          this.selectCity(city);
        }
      });
    }
  }

  /**
   * Enters Paleobiology mode: navigates to Explorer, opens sidebar, smoothly scrolls
   * to the species gallery, applies glowing pulse, and focuses the fauna search box.
   */
  openPaleobiology() {
    this.enterExplorerMode();

    const navHero = document.getElementById('nav-btn-hero');
    const navTimeline = document.getElementById('nav-btn-timeline');
    const navBtnFossil = document.getElementById('nav-btn-fossil');
    if (navHero) navHero.classList.remove('active');
    if (navTimeline) navTimeline.classList.remove('active');
    if (navBtnFossil) navBtnFossil.classList.add('active');

    const sidebarPanel = document.getElementById('sidebar-panel');
    if (sidebarPanel) {
      sidebarPanel.classList.remove('closed');
      if (this.sidebar) this.sidebar.isOpen = true;
    }

    setTimeout(() => {
      const faunaSection = document.getElementById('sidebar-fauna-section');
      if (faunaSection) {
        faunaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        faunaSection.classList.remove('highlight-pulse');
        void faunaSection.offsetWidth; // Force CSS reflow
        faunaSection.classList.add('highlight-pulse');
        setTimeout(() => faunaSection.classList.remove('highlight-pulse'), 2500);
      }

      const spInput = document.getElementById('input-species-filter');
      if (spInput) {
        spInput.focus();
      }
    }, 120);
  }

  /**
   * Opens the full 57-species paleobiological encyclopedia modal
   */
  openFullCatalog() {
    if (this.fullCatalogModal) {
      this.fullCatalogModal.open();
    }
  }

  /**
   * Directly teleports the globe view to the target geological period of the species,
   * updates the timeline scrubber, applies PALEOMAP texture, and projects the species zone.
   */
  async selectSpeciesFromCatalog(species, targetPeriod, periodIndex) {
    if (!species) return;

    // 1. If species belongs to a different period, move the timeline scrubber
    if (periodIndex !== -1 && this.timeline && this.currentPeriodIndex !== periodIndex) {
      this.timeline.pause();
      this.timeline.goToIndex(periodIndex);
    }

    // 2. Activate Explorer Mode & open sidebar
    this.enterExplorerMode();

    // 3. Highlight distribution zone and focus camera
    setTimeout(() => {
      this.selectSpecies(species);
      if (this.sidebar) {
        this.sidebar.highlightFossil(species);
      }
    }, 320);
  }

  _setupConciergeActions() {
    const flyout = document.getElementById('concierge-flyout');
    const btnAvatar = document.getElementById('btn-concierge-avatar');
    const btnQuery = document.getElementById('btn-bubble-query');
    const btnCloseFlyout = document.getElementById('btn-close-flyout');
    const chatForm = document.getElementById('chat-input-form');
    const chatInput = document.getElementById('chat-user-input');
    const suggestionsCarousel = document.getElementById('chat-suggestions');
    const btnSettings = document.getElementById('btn-chat-settings');
    const settingsTray = document.getElementById('chat-settings-tray');
    const inputKey = document.getElementById('input-gemini-key');
    const btnSaveKey = document.getElementById('btn-save-gemini-key');

    const toggleFlyout = () => {
      if (!flyout) return;
      const isOpen = flyout.classList.toggle('active');
      if (isOpen && chatInput) {
        setTimeout(() => chatInput.focus(), 150);
      }
    };

    if (btnAvatar) btnAvatar.addEventListener('click', toggleFlyout);
    if (btnQuery) btnQuery.addEventListener('click', toggleFlyout);
    if (btnCloseFlyout) btnCloseFlyout.addEventListener('click', () => flyout.classList.remove('active'));

    // Suggestion chips
    if (suggestionsCarousel) {
      suggestionsCarousel.addEventListener('click', (e) => {
        const chip = e.target.closest('.chat-suggestion-chip');
        if (!chip) return;
        const q = chip.getAttribute('data-query');
        if (q) {
          this._executeChatMessage(q);
        }
      });
    }

    // Chat form submission
    if (chatForm && chatInput) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = chatInput.value.trim();
        if (msg) {
          this._executeChatMessage(msg);
          chatInput.value = '';
        }
      });
    }

    // Optional Gemini API Key Configuration
    if (btnSettings && settingsTray) {
      btnSettings.addEventListener('click', () => {
        const isHidden = settingsTray.style.display === 'none';
        settingsTray.style.display = isHidden ? 'block' : 'none';
      });
    }

    if (inputKey && this.paleoAI && this.paleoAI.apiKey) {
      inputKey.value = this.paleoAI.apiKey;
    }

    if (btnSaveKey && inputKey) {
      btnSaveKey.addEventListener('click', () => {
        if (this.paleoAI) {
          this.paleoAI.setApiKey(inputKey.value);
        }
        btnSaveKey.textContent = '¡Guardada!';
        setTimeout(() => { btnSaveKey.textContent = 'Guardar'; }, 1500);
        if (settingsTray) settingsTray.style.display = 'none';
      });
    }
  }

  async _executeChatMessage(query) {
    const messagesLog = document.getElementById('chat-messages-log');
    const viewport = document.getElementById('chat-viewport');
    if (!messagesLog) return;

    // 1. Append User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user-message';
    userMsg.innerHTML = `
      <div class="chat-msg-avatar">👤</div>
      <div class="chat-msg-content">
        <div class="chat-msg-author">Tú</div>
        <p>${this._escapeHtml(query)}</p>
      </div>
    `;
    messagesLog.appendChild(userMsg);
    if (viewport) viewport.scrollTop = viewport.scrollHeight;

    // 2. Append Thinking Indicator
    const thinkingMsg = document.createElement('div');
    thinkingMsg.className = 'chat-message bot-message bot-thinking';
    thinkingMsg.id = 'bot-thinking-bubble';
    thinkingMsg.innerHTML = `
      <div class="chat-msg-avatar">🦖</div>
      <div class="chat-msg-content">
        <div class="chat-msg-author">PaleoGuía IA</div>
        <p><em>Consultando el atlas geológico...</em></p>
      </div>
    `;
    messagesLog.appendChild(thinkingMsg);
    if (viewport) viewport.scrollTop = viewport.scrollHeight;

    // 3. Process Query through PaleoAI
    let result = null;
    try {
      if (this.paleoAI) {
        result = await this.paleoAI.ask(query);
      }
    } catch (err) {
      console.error('[PaleoAI Error]', err);
    }

    // Remove thinking indicator
    const thinkingEl = document.getElementById('bot-thinking-bubble');
    if (thinkingEl) thinkingEl.remove();

    if (!result || !result.text) {
      result = {
        text: 'Disculpa, no pude procesar esa consulta en este momento. Intenta preguntarme por dinosaurios, Pangea o las 5 grandes extinciones masivas.',
        actions: []
      };
    }

    // 4. Append Bot Response
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-message bot-message';
    
    let actionsHtml = '';
    if (result.actions && result.actions.length > 0) {
      actionsHtml = `
        <div class="chat-actions-container">
          ${result.actions.map((act, i) => `
            <button class="chat-action-btn" data-act-idx="${i}">
              ${this._escapeHtml(act.label || 'Ver en 3D')}
            </button>
          `).join('')}
        </div>
      `;
    }

    botMsg.innerHTML = `
      <div class="chat-msg-avatar">🦖</div>
      <div class="chat-msg-content">
        <div class="chat-msg-author">PaleoGuía IA</div>
        ${this._formatMarkdown(result.text)}
        ${actionsHtml}
      </div>
    `;
    messagesLog.appendChild(botMsg);

    // 5. Bind Action Buttons
    if (result.actions && result.actions.length > 0) {
      const actBtns = botMsg.querySelectorAll('.chat-action-btn');
      actBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.actIdx, 10);
          const act = result.actions[idx];
          if (act) {
            this._handleConciergeAction(act);
          }
        });
      });
    }

    if (viewport) viewport.scrollTop = viewport.scrollHeight;
  }

  _handleConciergeAction(act) {
    if (!act) return;

    if (act.type === 'SET_PERIOD') {
      let targetIndex = -1;
      if (act.periodId) {
        targetIndex = this.periods.findIndex(p => p.id === act.periodId || p.id.includes(act.periodId));
      }
      if (targetIndex === -1 && act.timeMa !== undefined) {
        let minDiff = Infinity;
        this.periods.forEach((p, i) => {
          const diff = Math.abs(p.timeMa - act.timeMa);
          if (diff < minDiff) {
            minDiff = diff;
            targetIndex = i;
          }
        });
      }
      if (targetIndex !== -1 && this.timeline) {
        this.timeline.pause();
        this.timeline.goToIndex(targetIndex);
        this.enterExplorerMode();
      }
    } else if (act.type === 'OPEN_EXTINCTION') {
      const headerExtBtn = document.getElementById('btn-toggle-extinctions-header');
      if (headerExtBtn && !this.isExtinctionHudOpen) {
        headerExtBtn.click();
      }
      if (act.extinctionId) {
        this.selectExtinctionEvent(act.extinctionId, true);
      }
    } else if (act.type === 'HIGHLIGHT_SPECIES') {
      if (act.speciesName) {
        const found = this.fauna.find(sp => 
          (sp.scientificName && sp.scientificName.toLowerCase().includes(act.speciesName.toLowerCase())) ||
          (sp.commonName && sp.commonName.toLowerCase().includes(act.speciesName.toLowerCase())) ||
          (sp.name && sp.name.toLowerCase().includes(act.speciesName.toLowerCase()))
        );
        if (found) {
          this.selectSpecies(found);
          this._openSpecimenModal(found, this.currentPeriod || this.periods[0]);
        }
      }
    } else if (act.type === 'TOGGLE_TECTONICS') {
      if (this.globeScene && !this.globeScene.isTectonicsVisible()) {
        const headerBtn = document.getElementById('btn-toggle-tectonics-header');
        if (headerBtn) headerBtn.click();
      }
    } else if (act.type === 'SEARCH_CITY') {
      const city = this.cities.find(c => c.name.toLowerCase().includes(act.cityName.toLowerCase()));
      if (city) {
        this.selectCity(city);
      }
    } else if (act.type === 'OPEN_CATALOG') {
      this.openFullCatalog();
    }
  }

  _escapeHtml(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  _formatMarkdown(text) {
    if (!text) return '';
    let html = this._escapeHtml(text);

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="chat-msg-h3">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h3 class="chat-msg-h2">$1</h3>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italics
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Bullet lists
    html = html.replace(/^\s*[\*\-]\s+(.*$)/gim, '<li class="chat-msg-li">$1</li>');
    html = html.replace(/(<li class="chat-msg-li">.*<\/li>(\n|$) *)+/g, (match) => {
      return `<ul class="chat-msg-ul">${match}</ul>`;
    });

    // Paragraphs
    const blocks = html.split(/\n{2,}/);
    html = blocks.map(block => {
      block = block.trim();
      if (!block) return '';
      if (block.startsWith('<h') || block.startsWith('<ul')) return block;
      return `<p>${block.replace(/\n/g, '<br/>')}</p>`;
    }).join('');

    return html;
  }

  _populateErasDialog() {
    const mount = document.getElementById('eras-list-mount');
    const erasDialog = document.getElementById('eras-dialog');
    if (!mount) return;

    mount.innerHTML = '';
    this.periods.forEach((period, idx) => {
      const card = document.createElement('button');
      card.className = 'era-card-item';
      card.style.borderLeft = `4px solid ${period.iugsColor}`;
      card.innerHTML = `
        <span class="era-card-period">${period.name}</span>
        <span class="era-card-time">${period.timeMa} Ma • ${period.era}</span>
      `;
      card.addEventListener('click', () => {
        if (erasDialog) erasDialog.close();
        if (this.timeline) {
          this.timeline.pause();
          this.timeline.goToIndex(idx);
          this.enterExplorerMode();
        }
      });
      mount.appendChild(card);
    });
  }

  enterExplorerMode(openSidebar = false) {
    document.body.classList.add('explorer-mode-active');
    const sidebarPanel = document.getElementById('sidebar-panel');
    if (sidebarPanel && openSidebar) {
      sidebarPanel.classList.remove('closed');
      if (this.sidebar) this.sidebar.isOpen = true;
    }
    if (this.globeScene) this.globeScene.resetView();

    const navHero = document.getElementById('nav-btn-hero');
    const navTimeline = document.getElementById('nav-btn-timeline');
    const navBtnFossil = document.getElementById('nav-btn-fossil');
    if (navHero) navHero.classList.remove('active');
    if (navTimeline && (!navBtnFossil || !navBtnFossil.classList.contains('active'))) {
      navTimeline.classList.add('active');
    }
  }

  resetToHomeView() {
    this.resetSpeciesSelection();
    // Close sidebar panel so the user enjoys the clean, unobstructed 3D Google Earth view
    const sidebarPanel = document.getElementById('sidebar-panel');
    if (sidebarPanel) {
      sidebarPanel.classList.add('closed');
    }
    if (this.sidebar) {
      this.sidebar.isOpen = false;
    }

    if (this.globeScene) this.globeScene.resetView();
    const navHero = document.getElementById('nav-btn-hero');
    const navTimeline = document.getElementById('nav-btn-timeline');
    const navBtnFossil = document.getElementById('nav-btn-fossil');
    if (navHero) navHero.classList.add('active');
    if (navTimeline) navTimeline.classList.remove('active');
    if (navBtnFossil) navBtnFossil.classList.remove('active');
  }

  enterHeroMode() {
    this.resetToHomeView();
  }

  _setupSpecimenModalEvents() {
    const dialog = document.getElementById('specimen-dialog');
    const btnClose = document.getElementById('btn-close-specimen');
    const btnBack = document.getElementById('btn-back-specimen');
    const btnBackFooter = document.getElementById('btn-specimen-back-footer');

    const handleClose = () => {
      if (dialog && typeof dialog.close === 'function') {
        dialog.close();
      }
    };

    if (btnClose) btnClose.addEventListener('click', handleClose);
    if (btnBack) btnBack.addEventListener('click', handleClose);
    if (btnBackFooter) btnBackFooter.addEventListener('click', handleClose);

    if (dialog) {
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) handleClose();
      });
    }
  }

  _openSpecimenModal(sp, period) {
    const dialog = document.getElementById('specimen-dialog');
    if (!dialog) return;

    // Elements
    const badge = document.getElementById('specimen-modal-period');
    const commonName = document.getElementById('specimen-modal-common');
    const sciName = document.getElementById('specimen-modal-sci');
    const img = document.getElementById('specimen-modal-img');
    const fossilSite = document.getElementById('specimen-modal-fossil-site');
    const licenseNote = document.getElementById('specimen-modal-license');

    const diet = document.getElementById('specimen-modal-diet');
    const range = document.getElementById('specimen-modal-range');
    const group = document.getElementById('specimen-modal-group');
    const envBadge = document.getElementById('specimen-modal-env');

    const length = document.getElementById('specimen-modal-length');
    const weight = document.getElementById('specimen-modal-weight');
    const loc = document.getElementById('specimen-modal-loc');
    const desc = document.getElementById('specimen-modal-desc');
    const btnFlyto = document.getElementById('btn-specimen-flyto');

    // Populate
    if (badge) {
      badge.textContent = `${period.era} • ${period.period}`;
      badge.style.backgroundColor = period.iugsColor;
    }
    if (commonName) commonName.textContent = sp.commonName || sp.name;
    if (sciName) sciName.textContent = sp.scientificName || sp.name;
    
    const imgUrl = sp.media ? sp.media.imageUrl : (sp.image || 'assets/species/allosaurus.jpg');
    if (img) img.src = `./${imgUrl}`;

    const siteText = Array.isArray(sp.paleoLocation) ? sp.paleoLocation.join(', ') : (sp.fossilSite || 'No documentado');
    if (fossilSite) fossilSite.textContent = `Yacimiento / Ubicación: ${siteText}`;

    if (licenseNote) {
      if (sp.media && sp.media.imageLicense) {
        licenseNote.textContent = `Licencia: ${sp.media.imageLicense} • Autor: ${sp.media.imageAuthor || 'Reconstrucción Paleontológica'}`;
      } else {
        licenseNote.textContent = 'Licencia: Creative Commons / Dominio Público';
      }
    }

    const cladeTop = document.getElementById('specimen-modal-clade-top');
    const discovererEl = document.getElementById('specimen-modal-discoverer');
    const describedByEl = document.getElementById('specimen-modal-describedby');
    const formationEl = document.getElementById('specimen-modal-formation');
    const museumEl = document.getElementById('specimen-modal-museum');
    const paleoHeader = document.getElementById('specimen-modal-paleo-header');
    const paleoContext = document.getElementById('specimen-modal-paleo-context');
    const paleoBiome = document.getElementById('specimen-modal-biome');
    const scaleRatio = document.getElementById('specimen-scale-ratio');
    const scaleBar = document.getElementById('specimen-scale-bar');
    const scaleHumanBar = document.getElementById('specimen-scale-human-bar');
    const scaleTag = document.getElementById('specimen-scale-tag');
    const scaleCreatureName = document.getElementById('scale-creature-name');
    const btnBackHeader = document.getElementById('btn-back-specimen');
    const btnBackFooter = document.getElementById('btn-specimen-back-footer');

    if (diet) diet.textContent = sp.diet || 'Desconocido';
    if (range) range.textContent = `${sp.startMa} - ${sp.endMa} Ma`;
    if (group) group.textContent = sp.clade || sp.group || 'Vertebrata';
    if (cladeTop) cladeTop.textContent = `${sp.clade || sp.group || 'Vertebrata'} • Hace ${sp.startMa}-${sp.endMa} Ma`;

    // Environment pill
    if (envBadge) {
      const isMarine = sp.environment === 'marine';
      const isAerial = sp.environment === 'aerial';
      const isAmphibious = sp.environment === 'amphibious';
      envBadge.textContent = isMarine ? '🌊 Marino' : (isAerial ? '🪽 Volador' : (isAmphibious ? '🦎 Anfibio' : '🌲 Terrestre'));
      envBadge.className = `env-pill ${sp.environment || 'terrestrial'}`;
    }

    const lenNum = sp.metrics?.lengthMeters || (typeof sp.length === 'number' ? sp.length : parseFloat(sp.length) || 1.8);
    const lenStr = sp.metrics?.lengthMeters ? `${sp.metrics.lengthMeters} m` : (sp.length || 'N/D');
    const wtStr = sp.metrics?.weightTons !== undefined ? 
      (sp.metrics.weightTons >= 1 ? `${sp.metrics.weightTons} ton` : `${Math.round(sp.metrics.weightTons * 1000)} kg`) : 
      (sp.weight || 'N/D');

    if (length) length.textContent = lenStr;
    if (weight) weight.textContent = wtStr;
    if (loc) loc.textContent = siteText;
    if (desc) desc.textContent = sp.description;

    // Dual Human vs Specimen Scale Comparison (Human = 1.80m)
    if (scaleCreatureName) {
      scaleCreatureName.textContent = sp.commonName || sp.name;
    }
    if (scaleTag) {
      scaleTag.textContent = lenStr;
    }

    if (scaleRatio) {
      if (lenNum >= 1.8) {
        const ratio = (lenNum / 1.8).toFixed(1);
        scaleRatio.textContent = `${ratio}x mayor que un humano`;
        scaleRatio.className = 'scale-ratio-badge ratio-larger';
      } else {
        const ratio = (1.8 / Math.max(0.01, lenNum)).toFixed(1);
        scaleRatio.textContent = `${ratio}x menor que un humano`;
        scaleRatio.className = 'scale-ratio-badge ratio-smaller';
      }
    }

    // Proportional dual bars calculation (max calibrated smoothly)
    const maxScale = Math.max(lenNum * 1.15, 3.6);
    const humanPct = Math.min(100, Math.max(4, (1.8 / maxScale) * 100));
    const creaturePct = Math.min(100, Math.max(6, (lenNum / maxScale) * 100));

    if (scaleHumanBar) scaleHumanBar.style.width = `${humanPct}%`;
    if (scaleBar) scaleBar.style.width = `${creaturePct}%`;

    // Historical Discovery Information
    const disc = sp.discovery || {};
    if (discovererEl) discovererEl.textContent = disc.discoverer ? `${disc.discoverer} (${disc.yearDiscovered || ''})` : 'Expedición geológica';
    if (describedByEl) describedByEl.textContent = disc.describedBy || sp.scientificName;
    if (formationEl) formationEl.textContent = disc.geologicalFormation || siteText;
    if (museumEl) museumEl.textContent = `${disc.typeSpecimen || 'Holotipo'} • ${disc.museum || 'Colección Paleontológica'}`;

    // Ancestral Paleogeography Information
    const paleo = sp.paleogeography || {};
    if (paleoHeader) {
      paleoHeader.textContent = sp.environment === 'marine' ? 
        '🌊 Cuenca Oceánica / Mar Ancestral' : 
        (sp.environment === 'aerial' ? '🪽 Cielos y Ecosistemas Aéreos de la Era' : '🌲 Masa Continental y Llanuras Ancestrales');
    }
    if (paleoContext) {
      paleoContext.textContent = paleo.waterBody || paleo.landmass || siteText;
    }
    if (paleoBiome) {
      paleoBiome.textContent = paleo.depthOrBiome || paleo.paleoZoneDescription || 'Hábitat característico del periodo geológico';
    }

    // Modal Exit & Explore Actions
    if (btnBackHeader) {
      btnBackHeader.onclick = () => dialog.close();
    }
    if (btnBackFooter) {
      btnBackFooter.onclick = () => dialog.close();
    }

    if (btnFlyto) {
      btnFlyto.onclick = () => {
        dialog.close();
        if (this.fullCatalogModal && this.fullCatalogModal.isOpen()) {
          this.fullCatalogModal.close();
        }
        if (this.fullCatalogModal) {
          const mapping = this.fullCatalogModal.speciesPeriodMap?.get(sp.id) || this.fullCatalogModal.getBestPeriodForSpecies(sp);
          if (mapping && mapping.index !== -1 && this.currentPeriodIndex !== mapping.index && this.timeline) {
            this.timeline.pause();
            this.timeline.goToIndex(mapping.index);
          }
        }
        this.enterExplorerMode();
        setTimeout(() => {
          this.selectSpecies(sp);
          if (this.sidebar) {
            this.sidebar.highlightFossil(sp);
          }
        }, 280);
      };
    }

    // Reset scroll of details container
    const infoCol = dialog.querySelector('.specimen-modal-info');
    if (infoCol) infoCol.scrollTop = 0;

    dialog.showModal();
  }

  /**
   * Synchronized handler when the timeline period changes
   * Executed strictly on timeline slider input/change event
   */
  async onPeriodChange(period, index) {
    this.currentPeriodIndex = index;
    this.currentPeriod = period;
    this.selectedSpecies = null; // Clear individual species isolation on time scrub

    // Filter fauna for this specific geological time
    const activeFauna = this.filterFauna(period.timeMa, period);

    // Update Sidebar
    if (this.sidebar) {
      this.sidebar.update(period, activeFauna, null);
    }

    // Update 3D Globe with asynchronous texture transition & updated 3D species point pins
    if (this.globeScene) {
      await this.globeScene.setPeriod(period, activeFauna);
      // Pre-warm neighbor textures
      this.globeScene.textureManager.prefetchPeriods(this.periods, index, 2);
    }

    // Update active city position across continental drift
    if (this.activeCity && this.globeScene) {
      const cityPos = this.globeScene.updateCityPeriod(this.activeCity, period.timeMa);
      this._updateCityHud(this.activeCity, period, cityPos);
    }

    // Update Tectonics HUD if active
    this._updateTectonicsHud(period);

    // Update PaleoAI active context
    if (this.paleoAI) {
      this.paleoAI.setContext({ currentPeriod: period });
    }
  }

  /**
   * Configures the city search bar, suggestions dropdown, and drifting HUD
   */
  _setupCitySearch() {
    const searchInput = document.getElementById('city-search-input');
    const clearBtn = document.getElementById('btn-clear-city');
    const suggestionsDropdown = document.getElementById('city-suggestions');
    const activeCityHud = document.getElementById('active-city-hud');
    const closeHudBtn = document.getElementById('btn-close-city-hud');

    if (!searchInput || !suggestionsDropdown) return;

    const renderSuggestions = (query) => {
      const q = (query || '').trim().toLowerCase();
      if (!q) {
        suggestionsDropdown.style.display = 'none';
        suggestionsDropdown.innerHTML = '';
        return;
      }

      const matches = this.cities.filter(c => {
        return c.name.toLowerCase().includes(q) ||
               c.country.toLowerCase().includes(q) ||
               (c.plate && c.plate.toLowerCase().includes(q));
      });

      if (matches.length === 0) {
        suggestionsDropdown.innerHTML = `
          <div class="city-no-results">
            No se encontraron ciudades con "${query}". Ciudades disponibles: Buenos Aires, Madrid, Ciudad de México, Bogotá, Santiago, Nueva York, Londres, Tokio, Sídney, El Cairo...
          </div>
        `;
        suggestionsDropdown.style.display = 'block';
        return;
      }

      suggestionsDropdown.innerHTML = matches.map(c => `
        <button class="city-suggestion-item" data-city-id="${c.id}">
          <div class="suggestion-main">
            <span class="city-pin-icon">📍</span>
            <strong class="city-name">${c.name}</strong>
            <span class="city-country">${c.country}</span>
          </div>
          <div class="suggestion-sub">Placa: ${c.plate}</div>
        </button>
      `).join('');

      suggestionsDropdown.style.display = 'block';

      // Click on suggestion
      const items = suggestionsDropdown.querySelectorAll('.city-suggestion-item');
      items.forEach(item => {
        item.addEventListener('click', () => {
          const cityId = item.dataset.cityId;
          const city = this.cities.find(c => c.id === cityId);
          if (city) {
            this.selectCity(city);
          }
        });
      });
    };

    searchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      if (clearBtn) clearBtn.style.display = val ? 'flex' : 'none';
      renderSuggestions(val);
    });

    searchInput.addEventListener('focus', (e) => {
      if (e.target.value.trim()) {
        renderSuggestions(e.target.value);
      } else {
        // Show all popular cities if blank
        suggestionsDropdown.innerHTML = `
          <div class="city-suggestions-header">CIUDADES EMBLEMÁTICAS EN EL TIEMPO</div>
          ${this.cities.map(c => `
            <button class="city-suggestion-item" data-city-id="${c.id}">
              <div class="suggestion-main">
                <span class="city-pin-icon">📍</span>
                <strong class="city-name">${c.name}</strong>
                <span class="city-country">${c.country}</span>
              </div>
              <div class="suggestion-sub">Placa: ${c.plate}</div>
            </button>
          `).join('')}
        `;
        suggestionsDropdown.style.display = 'block';
        const items = suggestionsDropdown.querySelectorAll('.city-suggestion-item');
        items.forEach(item => {
          item.addEventListener('click', () => {
            const cityId = item.dataset.cityId;
            const city = this.cities.find(c => c.id === cityId);
            if (city) {
              this.selectCity(city);
            }
          });
        });
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.clearActiveCity();
      });
    }

    if (closeHudBtn) {
      closeHudBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.clearActiveCity();
      });
    }

    // Close suggestions dropdown when clicking outside
    document.addEventListener('click', (e) => {
      const searchBox = document.getElementById('city-search-box');
      if (searchBox && !searchBox.contains(e.target)) {
        suggestionsDropdown.style.display = 'none';
      }
    });

    // Clicking HUD re-centers camera on active city
    if (activeCityHud) {
      activeCityHud.addEventListener('click', (e) => {
        if (e.target.closest('#btn-close-city-hud')) return;
        if (this.activeCity && this.globeScene && this.currentPeriod) {
          const pos = this.globeScene.updateCityPeriod(this.activeCity, this.currentPeriod.timeMa);
          if (pos) {
            this.globeScene.focusOnCoordinate(pos.lat, pos.lon, 9.8);
          }
        }
      });
    }
  }

  selectCity(city) {
    if (!city || !this.currentPeriod) return;
    this.activeCity = city;

    const searchInput = document.getElementById('city-search-input');
    const clearBtn = document.getElementById('btn-clear-city');
    const suggestionsDropdown = document.getElementById('city-suggestions');

    if (searchInput) searchInput.value = `${city.name}, ${city.country}`;
    if (clearBtn) clearBtn.style.display = 'flex';
    if (suggestionsDropdown) suggestionsDropdown.style.display = 'none';

    // Set 3D marker and fly camera smoothly
    const pos = this.globeScene.setCity(city, this.currentPeriod.timeMa);

    // Update HUD
    this._updateCityHud(city, this.currentPeriod, pos);

    // If in hero landing, transition into explorer view so user sees 3D globe and controls clearly
    this.enterExplorerMode();
  }

  _updateCityHud(city, period, pos) {
    const activeCityHud = document.getElementById('active-city-hud');
    if (!activeCityHud) return;

    const hudTitle = document.getElementById('city-hud-title');
    const hudPlate = document.getElementById('city-hud-plate');
    const hudCoords = document.getElementById('city-coords-text');
    const hudContext = document.getElementById('city-hud-context');

    if (hudTitle) hudTitle.textContent = `${city.name} (${city.country})`;
    if (hudPlate) hudPlate.textContent = `Placa: ${city.plate}`;

    if (pos) {
      const latDir = pos.lat >= 0 ? 'N' : 'S';
      const lonDir = pos.lon >= 0 ? 'E' : 'O';
      const latStr = `${Math.abs(pos.lat).toFixed(1)}° ${latDir}`;
      const lonStr = `${Math.abs(pos.lon).toFixed(1)}° ${lonDir}`;
      if (hudCoords) hudCoords.textContent = `${latStr}, ${lonStr} • Hace ${period.timeMa} Ma`;
      if (hudContext) hudContext.textContent = pos.context || 'Posición paleogeográfica en esta era';
    }

    activeCityHud.style.display = 'block';
  }

  clearActiveCity() {
    this.activeCity = null;
    if (this.globeScene) {
      this.globeScene.clearCity();
    }
    const searchInput = document.getElementById('city-search-input');
    const clearBtn = document.getElementById('btn-clear-city');
    const suggestionsDropdown = document.getElementById('city-suggestions');
    const activeCityHud = document.getElementById('active-city-hud');

    if (searchInput) searchInput.value = '';
    if (clearBtn) clearBtn.style.display = 'none';
    if (suggestionsDropdown) suggestionsDropdown.style.display = 'none';
    if (activeCityHud) activeCityHud.style.display = 'none';
  }

  /**
   * Sets up UI buttons, keyboard shortcuts, and HUD updates for 3D Tectonic Plates & Boundaries
   */
  _setupTectonicsControls() {
    const toggleFlyoutBtn = document.getElementById('flyout-toggle-tectonics');
    const stateTectonics = document.getElementById('state-tectonics');
    const headerBtn = document.getElementById('btn-toggle-tectonics-header');
    const closeHudBtn = document.getElementById('btn-close-tectonics-hud');
    const hud = document.getElementById('tectonics-hud');

    const handleToggle = () => {
      if (!this.globeScene) return;
      const isVisible = this.globeScene.toggleTectonics();
      if (stateTectonics) {
        stateTectonics.textContent = isVisible ? 'ON' : 'OFF';
        stateTectonics.classList.toggle('off', !isVisible);
      }
      if (headerBtn) {
        headerBtn.classList.toggle('active', isVisible);
      }
      if (hud) {
        hud.style.display = isVisible ? 'block' : 'none';
        if (isVisible && this.currentPeriod) {
          this._updateTectonicsHud(this.currentPeriod);
        }
      }
    };

    if (toggleFlyoutBtn) {
      toggleFlyoutBtn.addEventListener('click', handleToggle);
    }
    if (headerBtn) {
      headerBtn.addEventListener('click', handleToggle);
    }
    if (closeHudBtn) {
      closeHudBtn.addEventListener('click', () => {
        if (this.globeScene && this.globeScene.isTectonicsVisible()) {
          handleToggle();
        }
      });
    }

    // Keyboard shortcut [P] for Tectonic Plates & Faults
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'p' || e.key === 'P') {
        handleToggle();
      }
    });
  }

  _updateTectonicsHud(period) {
    const hud = document.getElementById('tectonics-hud');
    if (!hud || hud.style.display === 'none') return;

    const periodNameEl = document.getElementById('tectonics-period-name');
    const countEl = document.getElementById('tectonics-features-count');
    const titleEl = document.getElementById('tectonics-hud-title');

    if (periodNameEl) periodNameEl.textContent = `${period.name} (${period.timeMa} Ma)`;
    if (titleEl) titleEl.textContent = 'Placas Tectónicas & Paleofallas';

    if (this.tectonicsData && this.tectonicsData.periods && this.tectonicsData.periods[period.id]) {
      const pData = this.tectonicsData.periods[period.id];
      const boundCount = pData.boundaries ? pData.boundaries.length : 0;
      const plateCount = pData.plates ? pData.plates.length : 0;
      if (countEl) {
        countEl.textContent = `${boundCount} Límites / Fallas • ${plateCount} Paleoplacas`;
      }
    } else {
      if (countEl) countEl.textContent = '0 Fallas • 0 Placas';
    }
  }

  _onTectonicBoundarySelected(b) {
    const hud = document.getElementById('tectonics-hud');
    if (!hud) return;
    hud.style.display = 'block';

    const titleEl = document.getElementById('tectonics-hud-title');
    if (titleEl) titleEl.textContent = `Falla: ${b.name}`;

    const contextEl = document.getElementById('tectonics-selected-detail');
    if (contextEl) {
      contextEl.innerHTML = `
        <div class="tectonics-detail-box">
          <strong>Tipo:</strong> ${b.type.toUpperCase()} | <strong>Velocidad:</strong> ${b.motionRate}<br/>
          <span>${b.description}</span>
        </div>
      `;
    }
  }

  _onTectonicPlateSelected(p) {
    const hud = document.getElementById('tectonics-hud');
    if (!hud) return;
    hud.style.display = 'block';

    const titleEl = document.getElementById('tectonics-hud-title');
    if (titleEl) titleEl.textContent = `Placa: ${p.name}`;

    const contextEl = document.getElementById('tectonics-selected-detail');
    if (contextEl) {
      contextEl.innerHTML = `
        <div class="tectonics-detail-box">
          <strong>Tipo:</strong> ${p.type.toUpperCase()} | <strong>Movimiento:</strong> ${p.motion}<br/>
          <span>${p.context}</span>
        </div>
      `;
    }
  }

  /**
   * Sets up 3D Mass Extinction Simulation Controls & Interactive HUD
   */
  _setupExtinctionControls() {
    const headerBtn = document.getElementById('btn-toggle-extinctions-header');
    const flyoutBtn = document.getElementById('flyout-toggle-extinctions');
    const stateExtinctions = document.getElementById('state-extinctions');
    const closeHudBtn = document.getElementById('btn-close-extinction-hud');
    const hud = document.getElementById('extinction-hud');

    const btnPlay = document.getElementById('btn-extinction-play');
    const btnReplay = document.getElementById('btn-extinction-replay');
    const scrubber = document.getElementById('extinction-scrubber');
    const scrubberFill = document.getElementById('extinction-scrubber-fill');
    const timeCur = document.getElementById('extinction-playback-current');
    const timeTot = document.getElementById('extinction-playback-total');
    const phaseBadge = document.getElementById('extinction-phase-badge');
    const phaseDetail = document.getElementById('extinction-phase-detail');

    const btnSyncEra = document.getElementById('btn-sync-extinction-era');
    const btnFocusEpicenter = document.getElementById('btn-focus-extinction-epicenter');
    const speedButtons = document.querySelectorAll('.btn-speed');

    const handleToggle = (forceState = null) => {
      this.isExtinctionHudOpen = forceState !== null ? forceState : !this.isExtinctionHudOpen;

      if (hud) {
        hud.style.display = this.isExtinctionHudOpen ? 'block' : 'none';
      }
      if (headerBtn) {
        headerBtn.classList.toggle('active', this.isExtinctionHudOpen);
      }
      if (stateExtinctions) {
        stateExtinctions.textContent = this.isExtinctionHudOpen ? 'ON' : 'OFF';
        stateExtinctions.classList.toggle('off', !this.isExtinctionHudOpen);
      }

      if (this.isExtinctionHudOpen) {
        // If opening and no event loaded yet, load the iconic K-Pg Chicxulub impact
        if (!this.currentExtinction && this.extinctions.length > 0) {
          this.selectExtinctionEvent(this.extinctions[0].id, true);
        }
      } else {
        // If closing, pause simulation and reset effects so globe returns to pristine state
        if (this.globeScene) {
          this.globeScene.resetExtinctionSimulation();
        }
      }
    };

    if (headerBtn) headerBtn.addEventListener('click', () => handleToggle());
    if (flyoutBtn) flyoutBtn.addEventListener('click', () => handleToggle());
    if (closeHudBtn) closeHudBtn.addEventListener('click', () => handleToggle(false));

    // Keyboard shortcut [E] for Extinctions 3D
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'e' || e.key === 'E') {
        handleToggle();
      }
    });

    // Populate Big 5 selector chips
    const chipsMount = document.getElementById('extinction-event-chips');
    if (chipsMount && this.extinctions.length > 0) {
      chipsMount.innerHTML = this.extinctions.map((ext, idx) => {
        let icon = '🌋';
        if (ext.simulationType === 'asteroid_impact') icon = '☄️';
        else if (ext.simulationType === 'hirnantian_glaciation') icon = '❄️';
        else if (ext.simulationType === 'oceanic_anoxia') icon = '🌊';
        return `
          <button class="extinction-chip ${idx === 0 ? 'active' : ''}" data-extinction-id="${ext.id}">
            <span>${icon}</span>
            <span>${ext.name.split(' (')[0]} (${ext.timeMa} Ma)</span>
          </button>
        `;
      }).join('');

      const chips = chipsMount.querySelectorAll('.extinction-chip');
      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          const extId = chip.dataset.extinctionId;
          this.selectExtinctionEvent(extId, true);
        });
      });
    }

    // Connect 3D Simulation Engine Callbacks
    const manager = this.globeScene.getExtinctionManager();
    if (manager) {
      manager.setCallbacks({
        onProgress: (progress, time, duration) => {
          if (scrubber) {
            scrubber.value = (progress * 100).toFixed(1);
          }
          if (scrubberFill) {
            scrubberFill.style.width = `${progress * 100}%`;
          }
          if (timeCur) {
            timeCur.textContent = `${time.toFixed(1)}s`;
          }
          if (timeTot) {
            timeTot.textContent = `${duration.toFixed(1)}s`;
          }
        },
        onPhaseChange: (phaseObj, phaseIdx, totalPhases) => {
          if (phaseBadge) {
            phaseBadge.textContent = `Fase ${phaseIdx + 1}/${totalPhases}`;
          }
          if (phaseDetail && phaseObj) {
            phaseDetail.textContent = `${phaseObj.phase} • ${phaseObj.detail}`;
          }
          const phaseCardTitle = document.getElementById('phase-card-title');
          const phaseCardDesc = document.getElementById('phase-card-desc');
          if (phaseCardTitle && phaseObj) {
            phaseCardTitle.textContent = `Fase ${phaseIdx + 1} de ${totalPhases}: ${phaseObj.phase}`;
          }
          if (phaseCardDesc && phaseObj) {
            phaseCardDesc.textContent = phaseObj.detail;
          }
        },
        onStateChange: (stateName) => {
          const playIcon = document.getElementById('extinction-play-icon');
          const playText = document.getElementById('extinction-play-text');
          if (stateName === 'PLAYING') {
            if (playIcon) playIcon.textContent = '⏸';
            if (playText) playText.textContent = 'Pausar Simulación';
          } else if (stateName === 'PAUSED' || stateName === 'READY') {
            if (playIcon) playIcon.textContent = '▶';
            if (playText) playText.textContent = 'Continuar Simulación';
          } else if (stateName === 'FINISHED') {
            if (playIcon) playIcon.textContent = '↺';
            if (playText) playText.textContent = 'Reproducir de Nuevo';
          } else {
            if (playIcon) playIcon.textContent = '▶';
            if (playText) playText.textContent = 'Iniciar Simulación 3D';
          }
        }
      });
    }

    // Subnavigation Tabs (Simulación & Fases / Telemetría & Evidencias / Impacto Biológico)
    const subnavButtons = document.querySelectorAll('.extinction-subnav-btn');
    const tabContents = document.querySelectorAll('.extinction-tab-content');
    subnavButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.subtab;
        subnavButtons.forEach(b => b.classList.toggle('active', b === btn));
        tabContents.forEach(tab => {
          tab.classList.toggle('active', tab.id === `extinction-tab-${targetTab}`);
        });
      });
    });

    // Step Phase Controls (⏮ Fase Anterior / ⏭ Siguiente Fase)
    const btnPhasePrev = document.getElementById('btn-phase-prev');
    const btnPhaseNext = document.getElementById('btn-phase-next');
    if (btnPhasePrev) {
      btnPhasePrev.addEventListener('click', () => {
        if (!manager || !this.currentExtinction || !this.currentExtinction.environmentalPhases) return;
        const phases = this.currentExtinction.environmentalPhases;
        const curIdx = Math.max(0, manager.currentPhaseIndex !== -1 ? manager.currentPhaseIndex : 0);
        const targetIdx = Math.max(0, curIdx - 1);
        const targetProgress = targetIdx / phases.length;
        manager.seek(targetProgress);
        if (scrubber) scrubber.value = (targetProgress * 100).toFixed(1);
        if (scrubberFill) scrubberFill.style.width = `${targetProgress * 100}%`;
      });
    }
    if (btnPhaseNext) {
      btnPhaseNext.addEventListener('click', () => {
        if (!manager || !this.currentExtinction || !this.currentExtinction.environmentalPhases) return;
        const phases = this.currentExtinction.environmentalPhases;
        const curIdx = Math.max(0, manager.currentPhaseIndex !== -1 ? manager.currentPhaseIndex : 0);
        const targetIdx = Math.min(phases.length - 1, curIdx + 1);
        const targetProgress = Math.min(0.99, (targetIdx / phases.length) + 0.02);
        manager.seek(targetProgress);
        if (scrubber) scrubber.value = (targetProgress * 100).toFixed(1);
        if (scrubberFill) scrubberFill.style.width = `${targetProgress * 100}%`;
      });
    }

    // Play/Pause button
    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        if (!manager) return;
        if (manager.state === 'FINISHED') {
          manager.seek(0);
          manager.start();
        } else {
          manager.togglePlay();
        }
      });
    }

    // Replay button
    if (btnReplay) {
      btnReplay.addEventListener('click', () => {
        if (!manager) return;
        manager.seek(0);
        manager.start();
      });
    }

    // Scrubber drag / seek
    if (scrubber) {
      scrubber.addEventListener('input', (e) => {
        if (!manager) return;
        manager.pause();
        const norm = parseFloat(e.target.value) / 100;
        manager.seek(norm);
        if (scrubberFill) scrubberFill.style.width = `${norm * 100}%`;
      });
    }

    // Playback Speed buttons
    speedButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        speedButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const spd = parseFloat(btn.dataset.speed || '1');
        if (manager) manager.playbackSpeed = spd;
      });
    });

    // Synchronize Globe to Era button
    if (btnSyncEra) {
      btnSyncEra.addEventListener('click', () => {
        if (!this.currentExtinction) return;
        this._syncGlobeToExtinctionEra(this.currentExtinction);
      });
    }

    // Focus Camera on Epicenter button
    if (btnFocusEpicenter) {
      btnFocusEpicenter.addEventListener('click', () => {
        if (!this.currentExtinction || !this.currentExtinction.coordinates) return;
        const coords = this.currentExtinction.coordinates;
        this.globeScene.focusOnCoordinate(coords.lat, coords.lon, 10.5);
      });
    }
  }

  /**
   * Synchronizes the geological globe and timeline to match the active extinction era
   */
  _syncGlobeToExtinctionEra(event) {
    if (!event || !this.timeline) return;

    // Find closest period in this.periods
    let matchIdx = this.periods.findIndex(p => p.id === event.periodId);
    if (matchIdx === -1) {
      // Find by closest numerical timeMa
      let minDiff = Infinity;
      this.periods.forEach((p, idx) => {
        const diff = Math.abs(p.timeMa - event.timeMa);
        if (diff < minDiff) {
          minDiff = diff;
          matchIdx = idx;
        }
      });
    }

    if (matchIdx !== -1) {
      this.timeline.goToIndex(matchIdx);
      // Smoothly re-focus camera on impact / volcanic coordinates after period transition starts
      setTimeout(() => {
        if (event.coordinates) {
          this.globeScene.focusOnCoordinate(event.coordinates.lat, event.coordinates.lon, 10.5);
        }
      }, 350);
    }
  }

  /**
   * Selects and loads a mass extinction event into the 3D engine and HUD
   */
  selectExtinctionEvent(eventId, autoFocus = true) {
    const event = this.extinctions.find(e => e.id === eventId);
    if (!event) return;
    this.currentExtinction = event;

    // 1. Update Chips active state
    const chips = document.querySelectorAll('.extinction-chip');
    chips.forEach(c => {
      c.classList.toggle('active', c.dataset.extinctionId === eventId);
    });

    // 2. Update Banner Card
    const badgeEl = document.getElementById('extinction-period-badge');
    const titleEl = document.getElementById('extinction-event-title');
    const subtitleEl = document.getElementById('extinction-event-subtitle');
    const btnSyncEra = document.getElementById('btn-sync-extinction-era');

    if (badgeEl) badgeEl.textContent = `Hace ${event.timeMa} Ma • Duración: ${event.duration}`;
    if (titleEl) titleEl.textContent = event.name;
    if (subtitleEl) subtitleEl.textContent = event.subtitle;
    if (btnSyncEra) btnSyncEra.textContent = `🪐 Sincronizar Globo (${event.timeMa} Ma)`;

    // 3. Update Telemetry Grid with full educational scientific Spanish labels
    const telemetryMount = document.getElementById('extinction-telemetry-items');
    if (telemetryMount && event.physicsTelemetry) {
      const keys = Object.keys(event.physicsTelemetry);
      const labels = {
        projectile: 'Causante / Agente Geológico',
        diameter: 'Diámetro del Bólido',
        entrySpeed: 'Velocidad de Entrada',
        impactAngle: 'Ángulo de Trayectoria',
        kineticEnergy: 'Energía Cinética Liberada',
        craterDiameter: 'Estructura del Cráter',
        megaTsunami: 'Megatsunami Resultante',
        lavaVolume: 'Volumen Basáltico Emitido',
        coveredArea: 'Superficie de Magma',
        co2Emissions: 'Gases de Efecto Invernadero (CO₂/CH₄)',
        oceanAcidification: 'Acidificación Oceánica',
        globalWarming: 'Anomalía Térmica Global',
        coalCombustion: 'Combustión Piroclástica de Cuencas de Carbón',
        so2Emissions: 'Emisión de Dióxido de Azufre (SO₂)',
        thermalSurge: 'Pico Térmico Marino Ecuatorial',
        ozoneDepletion: 'Destrucción del Ozono Estratosférico',
        h2sPoisoning: 'Euxinia y Sulfuro Tóxico (H₂S)',
        trigger: 'Mecanismo Detonante Principal',
        soilWeathering: 'Meteorización Silicatada Continental',
        algalBlooms: 'Proliferación Masiva de Algas Eutróficas',
        blackShaleDeposition: 'Depósito de Pizarras Negras Orgánicas',
        seaLevelFluctuation: 'Oscilaciones del Nivel Marino',
        glacierExtent: 'Extensión Glaciar Polar',
        seaLevelDrop: 'Caída Eustática del Nivel del Mar',
        temperaturePlunge: 'Descenso Térmico Oceánico',
        ringShadow: 'Sombra del Anillo Asteroidal Terrestre',
        toxicGas: 'Gases Tóxicos Liberados',
        anoxicSpread: 'Expansión de Zonas Muertas',
        euxinicConditions: 'Condiciones Euxínicas (H₂S)',
        iceCapExtent: 'Casquetes Polares',
        asteroidRingShadow: 'Sombra del Anillo Orbital',
        temperatureDrop: 'Enfriamiento Global'
      };

      telemetryMount.innerHTML = keys.map(k => `
        <div class="telemetry-row">
          <span class="telemetry-k">${labels[k] || k.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
          <span class="telemetry-v">${event.physicsTelemetry[k]}</span>
        </div>
      `).join('');
    }

    // 4. Update Geological & Stratigraphic Evidence List
    const evidenceMount = document.getElementById('extinction-evidence-list');
    if (evidenceMount) {
      const evidenceData = {
        'k-pg-chicxulub': [
          { title: 'Capa Global de Iridio', desc: 'Anomalía geoquímica de iridio de origen asteroidal descubierta en Gubbio (Italia) y Stevns Klint (Dinamarca).' },
          { title: 'Cuarzo de Choque (Shocked Quartz)', desc: 'Láminas de deformación planar microscópicas en silicatos expuestos a presiones superiores a 10 Gigapascales.' },
          { title: 'Microtectitas y Esférulas Vítreas', desc: 'Gotas de roca silicatada fundida eyectadas a la atmósfera superior que condensaron en vuelo balístico.' },
          { title: 'Pico de Helechos (Fern Spike)', desc: 'Reemplazo masivo de polen de plantas con flores por esporas de helechos pioneros post-cataclismo.' },
          { title: 'Núcleo IODP-ICDP 364', desc: 'Perforación marina del anillo de picos del cráter que demostró fluidificación instantánea de la corteza continental.' }
        ],
        'tr-j-camp': [
          { title: 'Basaltos Continentales CAMP', desc: 'Colosales derrames basálticos preservados en cuatro continentes a lo largo de 11 millones de km².' },
          { title: 'Excursión Negativa de δ¹³C', desc: 'Desplazamiento isotópico abrupto reflejando inyección masiva de carbono ligero termogénico a la atmósfera.' },
          { title: 'Caída de Densidad Estomática', desc: 'Hojas fósiles de coníferas y ginkgos con menor número de estomas, prueba directa de hipercapnia (alto CO₂).' },
          { title: 'Picos de Mercurio (Hg/TOC)', desc: 'Sedimentos del límite Tr-J en todo el mundo enriquecidos en mercurio volcánico de alta persistencia.' }
        ],
        'p-tr-siberian-traps': [
          { title: 'Basaltos de Inundación de Siberia', desc: '4 millones de km³ de magma basáltico en Tunguska que intruyeron estratos gruesos de carbón fósil.' },
          { title: 'Zona Muerta Ecuatorial (>40°C)', desc: 'Termometría isotópica de oxígeno en conodontos evidencia mares letalmente calientes en la cuenca de Nanpanjiang.' },
          { title: 'Pólenes Mutados y Malformados', desc: 'Granos de polen bisaccados con mutaciones teratogénicas masivas por radiación ultravioleta UV-B.' },
          { title: 'Isorrenieratano y Biomarcadores Euxínicos', desc: 'Pigmentos fósiles de bacterias verdes del azufre indican que la zona anóxica con H₂S llegó a la superficie marina.' },
          { title: 'Excursión Negativa Extrema de δ¹³C', desc: 'Caída de más de 4‰ en los carbonatos marinos globales, marcando la desestabilización del ciclo del carbono.' }
        ],
        'late-devonian-kellwasser': [
          { title: 'Pizarras Negras de Kellwasser', desc: 'Estratos de lutitas bituminosas ricas en carbono orgánico depositadas en fondos oceánicos sin oxígeno.' },
          { title: 'Meteorización de Bosques Primitivos', desc: 'La radiación de las primeras plantas con raíces profundas (Archaeopteris) aceleró el intemperismo químico de nutrientes.' },
          { title: 'Excursión Positiva de δ¹³C', desc: 'Fuerte enriquecimiento en carbono-13 causado por el enterramiento acelerado de materia orgánica vegetal no degradada.' },
          { title: 'Provincia Ígnea de Viluy', desc: 'Basaltos de inundación coetáneos en la actual Yakutia (Siberia Oriental) que perturbaron el clima global.' }
        ],
        'ordovician-silurian-glaciation': [
          { title: 'Tilitas y Estrías Glaciares del Sahara', desc: 'Depósitos morrénicos en el norte de Gondwana (actual Argelia y Libia) formados por un inmenso casquete polar.' },
          { title: 'Excursiones Positivas de δ¹⁸O y δ¹³C', desc: 'Enfriamiento oceánico simultáneo con el secuestro de aguas oceánicas en los casquetes de hielo continentales.' },
          { title: 'Discordancias por Caída Eustática', desc: 'Drenaje global de las plataformas continentales marinas someras con un descenso del nivel del mar mayor a 100 m.' },
          { title: 'Condritas L Ordovícicas y Anillo Asteroidal', desc: 'Pico anómalo de meteoritos fósiles y firmas de osmio extraterrestre en sedimentos marinos de 466 Ma (Tomkins et al. 2024).' }
        ]
      };

      const items = evidenceData[event.id] || [
        { title: 'Registro Estratigráfico', desc: 'Anomalías sedimentarias y fósiles documentadas en cortes geológicos de referencia global (GSSP).' }
      ];

      evidenceMount.innerHTML = items.map(it => `
        <div class="evidence-item">
          <span class="evidence-dot"></span>
          <div>
            <strong>${it.title}:</strong>
            <span>${it.desc}</span>
          </div>
        </div>
      `).join('');
    }

    // 5. Update Casualty Meters
    const totalEl = document.getElementById('extinction-casualty-total');
    const marineLossEl = document.getElementById('extinction-marine-loss');
    const terrLossEl = document.getElementById('extinction-terrestrial-loss');
    const barMarine = document.getElementById('bar-marine-loss');
    const barTerr = document.getElementById('bar-terrestrial-loss');

    if (totalEl) totalEl.textContent = `~${event.casualtyPercent}%`;
    if (marineLossEl) marineLossEl.textContent = `${event.marineLoss}%`;
    if (terrLossEl) terrLossEl.textContent = `${event.terrestrialLoss}%`;
    if (barMarine) barMarine.style.width = `${event.marineLoss}%`;
    if (barTerr) barTerr.style.width = `${event.terrestrialLoss}%`;

    // 6. Update Victims vs Survivors
    const victimsMount = document.getElementById('extinction-victims-list');
    const survivorsMount = document.getElementById('extinction-survivors-list');

    if (victimsMount && event.victims) {
      victimsMount.innerHTML = event.victims.map(v => `<li class="bio-taxa-item">${v}</li>`).join('');
    }
    if (survivorsMount && event.survivors) {
      survivorsMount.innerHTML = event.survivors.map(s => `<li class="bio-taxa-item">${s}</li>`).join('');
    }

    // 7. Update Scientific Context
    const sciContextEl = document.getElementById('extinction-science-context');
    if (sciContextEl && event.scientificContext) {
      sciContextEl.textContent = event.scientificContext;
    }

    // 8. Reset Simulation Player & Update Didactic Phase Card
    const phaseBadge = document.getElementById('extinction-phase-badge');
    const phaseDetail = document.getElementById('extinction-phase-detail');
    const phaseCardTitle = document.getElementById('phase-card-title');
    const phaseCardDesc = document.getElementById('phase-card-desc');
    const timeCur = document.getElementById('extinction-playback-current');
    const scrubber = document.getElementById('extinction-scrubber');
    const scrubberFill = document.getElementById('extinction-scrubber-fill');
    const playIcon = document.getElementById('extinction-play-icon');
    const playText = document.getElementById('extinction-play-text');

    if (event.environmentalPhases && event.environmentalPhases.length > 0) {
      const firstPhase = event.environmentalPhases[0];
      if (phaseBadge) phaseBadge.textContent = `Fase 1/${event.environmentalPhases.length}`;
      if (phaseDetail) phaseDetail.textContent = `${firstPhase.phase} • ${firstPhase.detail}`;
      if (phaseCardTitle) phaseCardTitle.textContent = `Fase 1 de ${event.environmentalPhases.length}: ${firstPhase.phase}`;
      if (phaseCardDesc) phaseCardDesc.textContent = firstPhase.detail;
    } else {
      if (phaseBadge) phaseBadge.textContent = 'Fase 1/1';
      if (phaseDetail) phaseDetail.textContent = 'Fase Cataclísmica';
      if (phaseCardTitle) phaseCardTitle.textContent = 'Secuencia Didáctica';
      if (phaseCardDesc) phaseCardDesc.textContent = 'Evolución geofísica del evento de extinción masiva.';
    }

    if (timeCur) timeCur.textContent = '0.0s';
    if (scrubber) scrubber.value = 0;
    if (scrubberFill) scrubberFill.style.width = '0%';
    if (playIcon) playIcon.textContent = '▶';
    if (playText) playText.textContent = 'Iniciar Simulación 3D';

    // 9. Load 3D scene elements into Three.js manager
    if (this.globeScene) {
      this.globeScene.loadExtinctionEvent(event);
      if (autoFocus && event.coordinates) {
        this.globeScene.focusOnCoordinate(event.coordinates.lat, event.coordinates.lon, 10.5);
      }
    }
  }
}

// Start application
window.addEventListener('DOMContentLoaded', () => {
  new AncientEarthApp();
});
