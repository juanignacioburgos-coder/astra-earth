/**
 * FullCatalogModal.js
 * Enciclopedia Paleobiológica Completa (57 Especies)
 * High-performance, full-window dialog featuring live search, multi-criteria filtering
 * (Era, Habitat, Diet, Sorting), and direct interactive actions:
 * 1. "Ver en Globo 3D": jumps timeline to exact era, applies PALEOMAP texture, and projects 3D species zone.
 * 2. "Ficha Técnica": opens the deep-dive anatomical and holotype inspection modal.
 */
export class FullCatalogModal {
  constructor({ dialogElement, fauna, periods, onSelectSpeciesOnGlobe, onOpenSpecimenModal }) {
    this.dialog = dialogElement;
    this.fauna = fauna || [];
    this.periods = periods || [];
    this.onSelectSpeciesOnGlobe = onSelectSpeciesOnGlobe;
    this.onOpenSpecimenModal = onOpenSpecimenModal;

    // Filter and Sort State
    this.searchQuery = '';
    this.selectedEra = 'all';       // 'all' | 'cenozoico' | 'mesozoico' | 'paleozoico' | 'precambrico'
    this.selectedEnv = 'all';       // 'all' | 'terrestrial' | 'marine' | 'aerial' | 'amphibious'
    this.selectedDiet = 'all';      // 'all' | 'carnivore' | 'herbivore' | 'piscivore' | 'omnivore'
    this.sortBy = 'time-desc';      // 'time-desc' | 'time-asc' | 'name-asc' | 'size-desc'

    // Cache period lookup per species
    this.speciesPeriodMap = new Map();
    this._precomputePeriodMappings();

    this._initDom();
    this._attachEvents();
  }

  /**
   * Precomputes the optimal geological period for each species
   */
  _precomputePeriodMappings() {
    this.fauna.forEach(sp => {
      const { period, index } = this.getBestPeriodForSpecies(sp);
      this.speciesPeriodMap.set(sp.id, { period, index });
    });
  }

  /**
   * Resolves the most accurate geological period in this.periods for a given species
   */
  getBestPeriodForSpecies(sp) {
    if (!this.periods || this.periods.length === 0) {
      return { period: null, index: -1 };
    }

    // 1. Match by periodId / name keywords
    if (sp.periodId) {
      const pId = sp.periodId.toLowerCase();
      const idx = this.periods.findIndex(p => {
        const pName = (p.period || p.name || p.id).toLowerCase();
        return p.id.toLowerCase().includes(pId) || pId.includes(p.id.toLowerCase()) || pName.includes(pId) ||
          (pId.includes('cretac') && pName.includes('cretác')) ||
          (pId.includes('juras') && pName.includes('jurás')) ||
          (pId.includes('trias') && pName.includes('triás')) ||
          (pId.includes('perm') && pName.includes('pérm')) ||
          (pId.includes('carbon') && pName.includes('carb')) ||
          (pId.includes('devon') && pName.includes('devón')) ||
          (pId.includes('silur') && pName.includes('silúr')) ||
          (pId.includes('ordov') && pName.includes('ordov')) ||
          (pId.includes('camb') && pName.includes('cámb')) ||
          (pId.includes('ediac') && pName.includes('ediac')) ||
          (pId.includes('pleist') && pName.includes('pleist')) ||
          (pId.includes('eocen') && pName.includes('eocen'));
      });
      if (idx !== -1) {
        return { period: this.periods[idx], index: idx };
      }
    }

    // 2. Fallback to middle timestamp proximity
    const midMa = (sp.startMa !== undefined && sp.endMa !== undefined) ? 
      (sp.startMa + sp.endMa) / 2 : (sp.startMa || 0);

    let bestIdx = 0;
    let minDiff = Math.abs(this.periods[0].timeMa - midMa);

    for (let i = 1; i < this.periods.length; i++) {
      const diff = Math.abs(this.periods[i].timeMa - midMa);
      if (diff < minDiff) {
        minDiff = diff;
        bestIdx = i;
      }
    }

    return { period: this.periods[bestIdx], index: bestIdx };
  }

  /**
   * Determines the geological era of a species
   */
  getSpeciesEra(sp) {
    const ma = (sp.startMa !== undefined && sp.endMa !== undefined) ? 
      (sp.startMa + sp.endMa) / 2 : (sp.startMa || 0);

    if (ma < 66) return 'cenozoico';
    if (ma >= 66 && ma < 252) return 'mesozoico';
    if (ma >= 252 && ma <= 541) return 'paleozoico';
    return 'precambrico';
  }

  _initDom() {
    if (!this.dialog) return;

    this.dialog.innerHTML = `
      <div class="dialog-card full-catalog-card">
        <!-- Catalog Header -->
        <div class="dialog-header catalog-dialog-header">
          <div class="catalog-title-group">
            <div class="catalog-badge">
              <span class="catalog-pulse-beacon"></span>
              <span>Atlas Paleobiológico Global</span>
            </div>
            <h2 class="catalog-main-title">Enciclopedia Completa de Especies Fósiles</h2>
            <p class="catalog-subtitle">
              Catálogo exhaustivo de <strong>${this.fauna.length} especies</strong> reconstruidas científicamente desde el Precámbrico hasta el Pleistoceno.
            </p>
          </div>

          <div class="catalog-header-actions">
            <button id="btn-catalog-back" class="btn-dialog-back" title="Volver al globo terráqueo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <span>Volver al Globo</span>
            </button>
            <button id="btn-close-catalog" class="btn-close-circle" aria-label="Cerrar catálogo" title="Cerrar (Esc)">&times;</button>
          </div>
        </div>

        <!-- Sticky Filter & Search Toolbar -->
        <div class="catalog-toolbar">
          <!-- Live Search Input -->
          <div class="catalog-search-row">
            <div class="catalog-search-wrapper">
              <svg class="catalog-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" id="catalog-search-input" placeholder="Buscar por nombre científico, común, yacimiento, descubridor o anatomía..." autocomplete="off" spellcheck="false" />
              <button id="btn-catalog-clear-search" class="btn-catalog-clear" title="Limpiar búsqueda" style="display: none;">&times;</button>
            </div>

            <!-- Stats & Counter -->
            <div class="catalog-counter-badge" id="catalog-counter-badge">
              Mostrando <strong id="catalog-count-visible">${this.fauna.length}</strong> de ${this.fauna.length} especies
            </div>
          </div>

          <!-- Geological Era Pills -->
          <div class="catalog-era-pills" id="catalog-era-pills">
            <button class="catalog-era-btn active" data-era="all">
              <span>Todas las Eras</span>
              <span class="era-chip-count">${this.fauna.length}</span>
            </button>
            <button class="catalog-era-btn era-cenozoico" data-era="cenozoico">
              <span class="era-dot" style="background: #F9F97F;"></span>
              <span>Cenozoico (0 - 66 Ma)</span>
              <span class="era-chip-count" id="count-era-cenozoico">0</span>
            </button>
            <button class="catalog-era-btn era-mesozoico" data-era="mesozoico">
              <span class="era-dot" style="background: #67C5CA;"></span>
              <span>Mesozoico (66 - 252 Ma)</span>
              <span class="era-chip-count" id="count-era-mesozoico">0</span>
            </button>
            <button class="catalog-era-btn era-paleozoico" data-era="paleozoico">
              <span class="era-dot" style="background: #99C08D;"></span>
              <span>Paleozoico (252 - 541 Ma)</span>
              <span class="era-chip-count" id="count-era-paleozoico">0</span>
            </button>
            <button class="catalog-era-btn era-precambrico" data-era="precambrico">
              <span class="era-dot" style="background: #F74370;"></span>
              <span>Precámbrico (&gt; 541 Ma)</span>
              <span class="era-chip-count" id="count-era-precambrico">0</span>
            </button>
          </div>

          <!-- Secondary Filter Controls: Ecosystem, Diet, Sort & Reset -->
          <div class="catalog-filters-row">
            <div class="catalog-select-group">
              <label for="catalog-select-env">Ecosistema:</label>
              <select id="catalog-select-env" class="catalog-select">
                <option value="all">Todos los Hábitats</option>
                <option value="terrestrial">🌲 Terrestre</option>
                <option value="marine">🌊 Marino</option>
                <option value="aerial">🪽 Volador</option>
                <option value="amphibious">🦎 Anfibio</option>
              </select>
            </div>

            <div class="catalog-select-group">
              <label for="catalog-select-diet">Dieta:</label>
              <select id="catalog-select-diet" class="catalog-select">
                <option value="all">Todas las Dietas</option>
                <option value="carnivore">🥩 Carnívoro</option>
                <option value="herbivore">🌿 Herbívoro</option>
                <option value="piscivore">🐟 Piscívoro</option>
                <option value="omnivore">🦐 Filtrador / Omnívoro</option>
              </select>
            </div>

            <div class="catalog-select-group">
              <label for="catalog-select-sort">Ordenar por:</label>
              <select id="catalog-select-sort" class="catalog-select">
                <option value="time-desc">⏳ Más recientes primero (0 → 750 Ma)</option>
                <option value="time-asc">⌛ Más antiguos primero (750 → 0 Ma)</option>
                <option value="name-asc">🔤 Nombre común (A - Z)</option>
                <option value="size-desc">📏 Mayor tamaño estimado</option>
              </select>
            </div>

            <button id="btn-catalog-reset-filters" class="btn-catalog-reset" title="Restablecer todos los filtros">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
              <span>Restablecer Filtros</span>
            </button>
          </div>
        </div>

        <!-- Scrollable Species Grid Viewport -->
        <div class="catalog-grid-viewport" id="catalog-grid-viewport">
          <div class="catalog-cards-grid" id="catalog-cards-grid">
            <!-- Rendered dynamically -->
          </div>
          <div class="catalog-empty-state" id="catalog-empty-state" style="display: none;">
            <div class="empty-icon">🦖</div>
            <h3>No se encontraron especies</h3>
            <p>No hay especies catalogadas que coincidan con los criterios de búsqueda y filtros seleccionados.</p>
            <button id="btn-empty-reset" class="btn-catalog-reset-prominent">Ver las 57 Especies</button>
          </div>
        </div>

        <!-- Catalog Footer with Keyboard Shortcut Hint -->
        <div class="catalog-footer">
          <div class="catalog-shortcut-hint">
            <span>💡 <strong>Consejo de navegación:</strong> Presiona <code>[C]</code> en cualquier momento para abrir/cerrar este catálogo. Haz clic en <strong>Ver en Globo 3D</strong> para viajar en el tiempo geológico directamente a su ecosistema.</span>
          </div>
          <button id="btn-catalog-close-bottom" class="btn-catalog-done">Cerrar Catálogo</button>
        </div>
      </div>
    `;

    // Compute era counts
    this._updateEraPillCounts();
  }

  _updateEraPillCounts() {
    let ceno = 0, meso = 0, paleo = 0, prec = 0;
    this.fauna.forEach(sp => {
      const era = this.getSpeciesEra(sp);
      if (era === 'cenozoico') ceno++;
      else if (era === 'mesozoico') meso++;
      else if (era === 'paleozoico') paleo++;
      else if (era === 'precambrico') prec++;
    });

    const elCeno = this.dialog.querySelector('#count-era-cenozoico');
    const elMeso = this.dialog.querySelector('#count-era-mesozoico');
    const elPaleo = this.dialog.querySelector('#count-era-paleozoico');
    const elPrec = this.dialog.querySelector('#count-era-precambrico');

    if (elCeno) elCeno.textContent = ceno;
    if (elMeso) elMeso.textContent = meso;
    if (elPaleo) elPaleo.textContent = paleo;
    if (elPrec) elPrec.textContent = prec;
  }

  _attachEvents() {
    if (!this.dialog) return;

    // Close buttons
    const btnClose = this.dialog.querySelector('#btn-close-catalog');
    const btnBack = this.dialog.querySelector('#btn-catalog-back');
    const btnCloseBottom = this.dialog.querySelector('#btn-catalog-close-bottom');

    const doClose = () => this.close();

    if (btnClose) btnClose.addEventListener('click', doClose);
    if (btnBack) btnBack.addEventListener('click', doClose);
    if (btnCloseBottom) btnCloseBottom.addEventListener('click', doClose);

    // Backdrop click
    this.dialog.addEventListener('click', (e) => {
      if (e.target === this.dialog) doClose();
    });

    // Search input
    const searchInput = this.dialog.querySelector('#catalog-search-input');
    const clearSearchBtn = this.dialog.querySelector('#btn-catalog-clear-search');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        if (clearSearchBtn) {
          clearSearchBtn.style.display = this.searchQuery ? 'block' : 'none';
        }
        this.render();
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        this.searchQuery = '';
        clearSearchBtn.style.display = 'none';
        this.render();
        if (searchInput) searchInput.focus();
      });
    }

    // Era Buttons
    const eraContainer = this.dialog.querySelector('#catalog-era-pills');
    if (eraContainer) {
      eraContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.catalog-era-btn');
        if (!btn) return;
        const era = btn.dataset.era;
        if (era) {
          this.selectedEra = era;
          eraContainer.querySelectorAll('.catalog-era-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.render();
        }
      });
    }

    // Selects: Env, Diet, Sort
    const selectEnv = this.dialog.querySelector('#catalog-select-env');
    const selectDiet = this.dialog.querySelector('#catalog-select-diet');
    const selectSort = this.dialog.querySelector('#catalog-select-sort');

    if (selectEnv) {
      selectEnv.addEventListener('change', (e) => {
        this.selectedEnv = e.target.value;
        this.render();
      });
    }

    if (selectDiet) {
      selectDiet.addEventListener('change', (e) => {
        this.selectedDiet = e.target.value;
        this.render();
      });
    }

    if (selectSort) {
      selectSort.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        this.render();
      });
    }

    // Reset button
    const btnReset = this.dialog.querySelector('#btn-catalog-reset-filters');
    const btnEmptyReset = this.dialog.querySelector('#btn-empty-reset');

    const resetFilters = () => {
      this.searchQuery = '';
      this.selectedEra = 'all';
      this.selectedEnv = 'all';
      this.selectedDiet = 'all';
      this.sortBy = 'time-desc';

      if (searchInput) searchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.style.display = 'none';
      if (selectEnv) selectEnv.value = 'all';
      if (selectDiet) selectDiet.value = 'all';
      if (selectSort) selectSort.value = 'time-desc';

      if (eraContainer) {
        eraContainer.querySelectorAll('.catalog-era-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.era === 'all');
        });
      }

      this.render();
    };

    if (btnReset) btnReset.addEventListener('click', resetFilters);
    if (btnEmptyReset) btnEmptyReset.addEventListener('click', resetFilters);

    // Event delegation on cards grid for fast actions
    const grid = this.dialog.querySelector('#catalog-cards-grid');
    if (grid) {
      grid.addEventListener('click', (e) => {
        // 1. "Ver en Globo 3D"
        const btnGlobe = e.target.closest('.btn-card-flyto');
        if (btnGlobe) {
          const spId = btnGlobe.dataset.speciesId;
          const sp = this.fauna.find(s => s.id === spId);
          if (sp) {
            const mapping = this.speciesPeriodMap.get(sp.id) || this.getBestPeriodForSpecies(sp);
            this.close();
            if (this.onSelectSpeciesOnGlobe) {
              this.onSelectSpeciesOnGlobe(sp, mapping.period, mapping.index);
            }
          }
          return;
        }

        // 2. "Ficha Técnica" or clicking card image/title
        const btnSpecimen = e.target.closest('.btn-card-specimen, .catalog-card-image-wrap, .catalog-card-header');
        if (btnSpecimen) {
          const card = e.target.closest('.catalog-card');
          if (!card) return;
          const spId = card.dataset.speciesId;
          const sp = this.fauna.find(s => s.id === spId);
          if (sp) {
            const mapping = this.speciesPeriodMap.get(sp.id) || this.getBestPeriodForSpecies(sp);
            if (this.onOpenSpecimenModal) {
              this.onOpenSpecimenModal(sp, mapping.period);
            }
          }
        }
      });
    }
  }

  /**
   * Filters and sorts the full species list
   */
  getFilteredSpecies() {
    let list = this.fauna.slice();

    // 1. Search Query Filter
    if (this.searchQuery) {
      const q = this.searchQuery;
      list = list.filter(sp => {
        const name = (sp.commonName || sp.name || '').toLowerCase();
        const sci = (sp.scientificName || '').toLowerCase();
        const clade = (sp.clade || sp.group || '').toLowerCase();
        const desc = (sp.description || '').toLowerCase();
        const formation = (sp.discovery?.geologicalFormation || '').toLowerCase();
        const discoverer = (sp.discovery?.discoverer || '').toLowerCase();
        const country = (sp.discovery?.modernCountry || '').toLowerCase();
        const paleoLocations = Array.isArray(sp.paleoLocation) ? sp.paleoLocation.join(' ').toLowerCase() : '';
        const waterBody = (sp.paleogeography?.waterBody || '').toLowerCase();
        const landmass = (sp.paleogeography?.landmass || '').toLowerCase();

        return name.includes(q) || sci.includes(q) || clade.includes(q) || 
               desc.includes(q) || formation.includes(q) || discoverer.includes(q) || 
               country.includes(q) || paleoLocations.includes(q) || 
               waterBody.includes(q) || landmass.includes(q);
      });
    }

    // 2. Era Filter
    if (this.selectedEra !== 'all') {
      list = list.filter(sp => this.getSpeciesEra(sp) === this.selectedEra);
    }

    // 3. Ecosystem / Environment Filter
    if (this.selectedEnv !== 'all') {
      list = list.filter(sp => (sp.environment || 'terrestrial') === this.selectedEnv);
    }

    // 4. Diet Filter
    if (this.selectedDiet !== 'all') {
      list = list.filter(sp => {
        const diet = (sp.diet || '').toLowerCase();
        if (this.selectedDiet === 'carnivore') return diet.includes('carnívor') || diet.includes('depredador');
        if (this.selectedDiet === 'herbivore') return diet.includes('herbívor') || diet.includes('plantas');
        if (this.selectedDiet === 'piscivore') return diet.includes('piscívor') || diet.includes('peces');
        if (this.selectedDiet === 'omnivore') return diet.includes('omnívor') || diet.includes('filtrador') || diet.includes('sedimentívoro');
        return true;
      });
    }

    // 5. Sorting
    list.sort((a, b) => {
      if (this.sortBy === 'time-desc') {
        const maA = a.startMa !== undefined ? a.startMa : 0;
        const maB = b.startMa !== undefined ? b.startMa : 0;
        return maA - maB; // Lowest Ma (most recent) first
      } else if (this.sortBy === 'time-asc') {
        const maA = a.startMa !== undefined ? a.startMa : 0;
        const maB = b.startMa !== undefined ? b.startMa : 0;
        return maB - maA; // Highest Ma (oldest) first
      } else if (this.sortBy === 'name-asc') {
        const nameA = (a.commonName || a.name || '').localeCompare(b.commonName || b.name || '');
        return nameA;
      } else if (this.sortBy === 'size-desc') {
        const lenA = a.metrics?.lengthMeters || parseFloat(a.length) || 0;
        const lenB = b.metrics?.lengthMeters || parseFloat(b.length) || 0;
        return lenB - lenA;
      }
      return 0;
    });

    return list;
  }

  /**
   * Renders the cards grid according to current filters
   */
  render() {
    const grid = this.dialog.querySelector('#catalog-cards-grid');
    const emptyState = this.dialog.querySelector('#catalog-empty-state');
    const countVisibleEl = this.dialog.querySelector('#catalog-count-visible');
    if (!grid) return;

    const filtered = this.getFilteredSpecies();

    if (countVisibleEl) {
      countVisibleEl.textContent = filtered.length;
    }

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    grid.innerHTML = filtered.map(sp => {
      const mapping = this.speciesPeriodMap.get(sp.id) || this.getBestPeriodForSpecies(sp);
      const period = mapping.period;
      const periodColor = period?.iugsColor || '#ffd700';
      const periodName = period?.period || period?.name || sp.periodId || 'Era Geológica';

      const common = sp.commonName || sp.name;
      const scientific = sp.scientificName || sp.name;
      const clade = sp.clade || sp.group || 'Vertebrata';
      const imgUrl = sp.media ? sp.media.imageUrl : (sp.image || 'assets/species/allosaurus.jpg');
      
      const env = sp.environment || 'terrestrial';
      const envLabel = env === 'marine' ? '🌊 Marino' : 
                       (env === 'aerial' ? '🪽 Volador' : 
                       (env === 'amphibious' ? '🦎 Anfibio' : '🌲 Terrestre'));

      const diet = sp.diet || 'Desconocido';
      const dietShort = diet.split(' ')[0];
      const dietClass = diet.toLowerCase().includes('carnívoro') ? 'diet-carnivore' :
                        diet.toLowerCase().includes('herbívoro') ? 'diet-herbivore' :
                        diet.toLowerCase().includes('piscívoro') ? 'diet-piscivore' : 'diet-marine';

      const lenStr = sp.metrics?.lengthMeters ? `${sp.metrics.lengthMeters} m` : (sp.length || 'N/D');
      const wtStr = sp.metrics?.weightTons !== undefined ? 
        (sp.metrics.weightTons >= 1 ? `${sp.metrics.weightTons} ton` : `${Math.round(sp.metrics.weightTons * 1000)} kg`) : 
        (sp.weight || 'N/D');

      const formation = sp.discovery?.geologicalFormation || (Array.isArray(sp.paleoLocation) ? sp.paleoLocation.join(', ') : 'Yacimiento no especificado');
      const discoverer = sp.discovery?.discoverer ? `${sp.discovery.discoverer} (${sp.discovery.yearDiscovered || ''})` : '';

      return `
        <div class="catalog-card" data-species-id="${sp.id}" style="--period-accent: ${periodColor}">
          <!-- Image Wrapper with Overlays -->
          <div class="catalog-card-image-wrap" title="Clic para ver ficha técnica">
            <img src="./${imgUrl}" alt="${scientific}" class="catalog-card-img" loading="lazy" onerror="this.src='./favicon.svg'; this.style.opacity=0.35;" />
            
            <div class="catalog-card-overlay-top">
              <span class="catalog-era-tag" style="background-color: ${periodColor}">
                ${periodName}
              </span>
              <span class="catalog-env-tag env-${env}">${envLabel}</span>
            </div>

            <div class="catalog-card-overlay-bottom">
              <span class="catalog-time-tag">⏳ Hace ${sp.startMa} - ${sp.endMa} Ma</span>
              <span class="catalog-diet-tag ${dietClass}">${dietShort}</span>
            </div>
          </div>

          <!-- Card Content Body -->
          <div class="catalog-card-body">
            <div class="catalog-card-header">
              <div class="catalog-card-titles">
                <h3 class="catalog-card-common">${common}</h3>
                <div class="catalog-card-sci">${scientific}</div>
              </div>
              <span class="catalog-clade-badge">${clade.split(' ')[0]}</span>
            </div>

            <!-- Metric Stats Row -->
            <div class="catalog-stats-row">
              <div class="catalog-stat-pill">
                <span class="stat-icon">📏</span>
                <span class="stat-val"><strong>Longitud:</strong> ${lenStr}</span>
              </div>
              <div class="catalog-stat-pill">
                <span class="stat-icon">⚖️</span>
                <span class="stat-val"><strong>Peso:</strong> ${wtStr}</span>
              </div>
            </div>

            <!-- Geological & Discovery Metadata -->
            <div class="catalog-meta-box">
              <div class="catalog-meta-item">
                <span class="meta-icon">⛏️</span>
                <span class="meta-text" title="${formation}"><strong>Yacimiento:</strong> ${formation}</span>
              </div>
              ${discoverer ? `
                <div class="catalog-meta-item">
                  <span class="meta-icon">👤</span>
                  <span class="meta-text" title="${discoverer}"><strong>Descubridor:</strong> ${discoverer}</span>
                </div>
              ` : ''}
            </div>

            <!-- Description Snippet -->
            <p class="catalog-card-desc">${sp.description}</p>

            <!-- Card Bottom Actions -->
            <div class="catalog-card-actions">
              <button class="btn-card-flyto" data-species-id="${sp.id}" title="Viajar a esta era y ver distribución en el Globo 3D">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="3"></circle>
                  <line x1="22" y1="12" x2="18" y2="12"></line>
                  <line x1="6" y1="12" x2="2" y2="12"></line>
                  <line x1="12" y1="6" x2="12" y2="2"></line>
                  <line x1="12" y1="22" x2="12" y2="18"></line>
                </svg>
                <span>Ver en Globo 3D</span>
              </button>

              <button class="btn-card-specimen" data-species-id="${sp.id}" title="Abrir ficha anatómica y científica">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                <span>Ficha Técnica</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Opens the catalog modal
   */
  open() {
    if (!this.dialog) return;
    this.render();
    this.dialog.showModal();

    // Scroll grid to top
    const viewport = this.dialog.querySelector('#catalog-grid-viewport');
    if (viewport) viewport.scrollTop = 0;

    // Focus search input
    setTimeout(() => {
      const input = this.dialog.querySelector('#catalog-search-input');
      if (input) input.focus();
    }, 150);
  }

  /**
   * Closes the catalog modal
   */
  close() {
    if (this.dialog && typeof this.dialog.close === 'function') {
      this.dialog.close();
    }
  }

  /**
   * Checks whether the catalog modal is currently open
   */
  isOpen() {
    return this.dialog && this.dialog.open;
  }
}
