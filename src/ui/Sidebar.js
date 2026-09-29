/**
 * Enhanced Sidebar Component:
 * Features rich Paleofauna Encyclopedia with museum paleoart,
 * geographic distribution zone controls, planetary telemetry, and flora/fauna records.
 */
export class Sidebar {
  constructor(containerElement, onLocateSpecies = null, onSelectSpecies = null, onResetZone = null, onOpenFullCatalog = null) {
    this.container = containerElement;
    this.onLocateSpecies = onLocateSpecies;
    this.onSelectSpecies = onSelectSpecies;
    this.onResetZone = onResetZone;
    this.onOpenFullCatalog = onOpenFullCatalog;
    this.isOpen = true;
    this.currentPeriod = null;
    this.activeFauna = [];
    this.selectedSpecies = null;
    this.ecoFilter = 'all';
    this.searchQuery = '';

    this._renderBase();
  }

  _getFilteredFauna() {
    return this.activeFauna.filter(sp => {
      // 1. Ecosystem filter
      if (this.ecoFilter !== 'all') {
        const env = sp.environment || 'terrestrial';
        if (this.ecoFilter === 'marine' && env !== 'marine') return false;
        if (this.ecoFilter === 'terrestrial' && env !== 'terrestrial' && env !== 'amphibious') return false;
        if (this.ecoFilter === 'aerial' && env !== 'aerial') return false;
      }

      // 2. Search query filter
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase().trim();
        const common = (sp.commonName || sp.name || '').toLowerCase();
        const sci = (sp.scientificName || '').toLowerCase();
        const clade = (sp.clade || sp.group || '').toLowerCase();
        const formation = (sp.discovery?.geologicalFormation || '').toLowerCase();
        const discoverer = (sp.discovery?.discoverer || '').toLowerCase();
        const water = (sp.paleogeography?.waterBody || '').toLowerCase();
        const land = (sp.paleogeography?.landmass || '').toLowerCase();
        return common.includes(q) || sci.includes(q) || clade.includes(q) ||
               formation.includes(q) || discoverer.includes(q) || water.includes(q) || land.includes(q);
      }

      return true;
    });
  }

  _renderBase() {
    this.container.innerHTML = `
      <aside class="sidebar-panel glass-panel" id="sidebar-panel">
        <!-- Toggle button -->
        <button id="sidebar-toggle" class="sidebar-toggle-btn" title="Ocultar/Mostrar panel" aria-label="Alternar panel">
          <svg class="toggle-icon-open" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <div class="sidebar-content" id="sidebar-content">
          <!-- Dynamic period details will be injected here -->
        </div>
      </aside>
    `;

    const toggleBtn = this.container.querySelector('#sidebar-toggle');
    const panel = this.container.querySelector('#sidebar-panel');
    toggleBtn.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      panel.classList.toggle('closed', !this.isOpen);
    });
  }

  /**
   * Updates sidebar content with the selected period data and filtered fauna
   * @param {Object} period Period definition from fauna_flora.json
   * @param {Array} activeFauna Filtered list of Paleofauna species for this period/time
   * @param {Object|null} selectedSpecies Currently selected species whose zone is displayed
   */
  update(period, activeFauna = null, selectedSpecies = null) {
    this.currentPeriod = period;
    this.activeFauna = activeFauna || period.species || [];
    this.selectedSpecies = selectedSpecies;

    const content = this.container.querySelector('#sidebar-content');
    if (!content) return;

    // Atmospheric calculations
    const o2Val = parseInt(period.atmosphere?.o2, 10) || 21;
    const o2Percent = Math.min(100, Math.max(0, (o2Val / 38) * 100));
    const tempVal = period.climate?.temperature ?? 15;
    const tempPercent = Math.min(100, Math.max(5, ((tempVal + 50) / 85) * 100));

    content.innerHTML = `
      <!-- Period Header -->
      <div class="sidebar-header" style="border-left-color: ${period.iugsColor}">
        <div class="period-era-tag" style="background-color: ${period.iugsColor}">
          ${period.era} • ${period.period}
        </div>
        <h2 class="sidebar-period-name">${period.name}</h2>
        <div class="sidebar-time-badge">
          <span class="pulse-dot" style="background-color: ${period.iugsColor}"></span>
          Hace ${period.timeMa} Millones de Años (${period.eon})
        </div>
      </div>

      <!-- Active Distribution Zone Banner if species is isolated -->
      ${this.selectedSpecies ? `
        <div class="active-zone-banner" style="border-color: ${period.iugsColor}">
          <div class="active-zone-info">
            <span class="active-zone-beacon" style="background-color: ${period.iugsColor}"></span>
            <div>
              <div class="active-zone-label">ZONA DE DISTRIBUCIÓN EN GLOBO 3D</div>
              <strong class="active-zone-name">${this.selectedSpecies.commonName || this.selectedSpecies.name}</strong>
              <span class="active-zone-sub">(${this.selectedSpecies.scientificName || this.selectedSpecies.name})</span>
            </div>
          </div>
          <button id="btn-reset-zone" class="btn-reset-zone" title="Mostrar puntos de todas las especies de esta era">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <span>Ver Todas (${this.activeFauna.length})</span>
          </button>
        </div>
      ` : ''}

      <!-- Species Gallery Section (Paleofauna Catalog) -->
      <div class="sidebar-section" id="sidebar-fauna-section">
        <div class="section-header-row">
          <h3 class="section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Fauna de esta Era (${this.activeFauna.length})
          </h3>
          <button id="btn-open-catalog-sidebar" class="btn-catalog-sidebar" title="Abrir catálogo enciclopédico de las 57 especies (Tecla C)">
            📚 Catálogo Completo (57)
          </button>
        </div>

        <!-- Ecosystem Filter Tabs -->
        <div class="sidebar-eco-filters">
          <button class="eco-tab ${this.ecoFilter === 'all' ? 'active' : ''}" data-eco="all">Todos (${this.activeFauna.length})</button>
          <button class="eco-tab ${this.ecoFilter === 'marine' ? 'active' : ''}" data-eco="marine">🌊 Marinos</button>
          <button class="eco-tab ${this.ecoFilter === 'terrestrial' ? 'active' : ''}" data-eco="terrestrial">🌲 Terrestres</button>
          <button class="eco-tab ${this.ecoFilter === 'aerial' ? 'active' : ''}" data-eco="aerial">🪽 Voladores</button>
        </div>

        <!-- Quick Species Search Box -->
        <div class="sidebar-species-search-box">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" id="input-species-filter" placeholder="Buscar especie, yacimiento o mar..." value="${this.searchQuery}" autocomplete="off" spellcheck="false" />
          ${this.searchQuery ? '<button id="btn-clear-sp-filter" class="btn-sp-clear" title="Limpiar filtro">&times;</button>' : ''}
        </div>

        <div class="species-cards-container">
          ${this._getFilteredFauna().length > 0 ? this._getFilteredFauna().map(sp => {
            const isSelected = this.selectedSpecies && this.selectedSpecies.id === sp.id;
            const imgUrl = sp.media ? sp.media.imageUrl : (sp.image || 'assets/species/allosaurus.jpg');
            const common = sp.commonName || sp.name;
            const scientific = sp.scientificName || sp.name;
            const clade = sp.clade || sp.group || 'Vertebrata';
            const diet = sp.diet || 'Desconocido';
            const dietClass = diet.toLowerCase().includes('carnívoro') ? 'diet-carnivore' :
                              diet.toLowerCase().includes('herbívoro') ? 'diet-herbivore' :
                              diet.toLowerCase().includes('piscívoro') ? 'diet-piscivore' : 'diet-marine';
            
            const len = sp.metrics?.lengthMeters ? `${sp.metrics.lengthMeters} m` : (sp.length || 'N/D');
            const wt = sp.metrics?.weightTons !== undefined ? 
              (sp.metrics.weightTons >= 1 ? `${sp.metrics.weightTons} t` : `${Math.round(sp.metrics.weightTons * 1000)} kg`) : 
              (sp.weight || 'N/D');
            const coords = sp.paleoCoordinates || sp.coordinates;
            const lat = coords ? coords.lat : (sp.lat || 0);
            const lng = coords ? (coords.lng ?? coords.lon ?? 0) : (sp.lon || 0);
            const env = sp.environment || 'terrestrial';
            const envLabel = env === 'marine' ? '🌊 Marino' : (env === 'aerial' ? '🪽 Volador' : (env === 'amphibious' ? '🦎 Anfibio' : '🌲 Terrestre'));
            const formation = sp.discovery?.geologicalFormation || (Array.isArray(sp.paleoLocation) ? sp.paleoLocation.join(', ') : (sp.fossilSite || 'Global'));
            const paleoHabitat = sp.paleogeography?.waterBody || sp.paleogeography?.landmass || 'Pangea';
            const discoverer = sp.discovery?.discoverer || '';
            const yearDisc = sp.discovery?.yearDiscovered || '';

            return `
              <div class="species-card ${isSelected ? 'selected' : ''}" data-species-id="${sp.id}">
                <div class="species-img-wrapper" title="Clic para ver ficha paleontológica completa">
                  <img src="./${imgUrl}" alt="${scientific}" class="species-img" loading="lazy" onerror="this.src='./favicon.svg'; this.style.opacity=0.35;" />
                  
                  <div class="species-tags-overlay">
                    <span class="species-env-tag env-${env}">${envLabel}</span>
                    <span class="species-diet-badge ${dietClass}">${diet.split(' ')[0]}</span>
                  </div>

                  <span class="species-era-pill">⏳ ${sp.startMa ? `${sp.startMa}-${sp.endMa} Ma` : (sp.timeRange || '')}</span>

                  ${isSelected ? `<span class="badge-active-zone">📍 En Pantalla 3D</span>` : ''}
                </div>
                
                <div class="species-info">
                  <div class="species-title-row">
                    <div>
                      <h4 class="species-common-name">${common}</h4>
                      <div class="species-scientific-name">${scientific}</div>
                    </div>
                    <span class="species-group-tag">${clade.split(' ')[0]}</span>
                  </div>
                  
                  <div class="species-stats-row">
                    <span class="spec-stat"><strong>📏</strong> ${len}</span>
                    <span class="spec-stat"><strong>⚖️</strong> ${wt}</span>
                  </div>

                  <!-- Ancestral Paleogeography & Geological Formation -->
                  <div class="species-paleo-box">
                    <div class="paleo-item">
                      <span class="paleo-icon">🌍</span>
                      <div class="paleo-text"><strong>Hábitat:</strong> ${paleoHabitat}</div>
                    </div>
                    <div class="paleo-item">
                      <span class="paleo-icon">⛏️</span>
                      <div class="paleo-text"><strong>Yacimiento:</strong> ${formation}</div>
                    </div>
                    ${discoverer ? `
                      <div class="paleo-item paleo-subtle">
                        <span class="paleo-icon">👤</span>
                        <div class="paleo-text"><strong>Descubierto por:</strong> ${discoverer} ${yearDisc ? `(${yearDisc})` : ''}</div>
                      </div>
                    ` : ''}
                  </div>

                  <p class="species-desc">${sp.description}</p>

                  <div class="species-actions">
                    <button class="btn-locate-zone ${isSelected ? 'active' : ''}" data-species-id="${sp.id}" data-lat="${lat}" data-lng="${lng}" title="Visualizar ubicación y cuenca fósil en el globo 3D">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>${isSelected ? '✓ En Globo 3D' : 'Ver en Globo 3D'}</span>
                    </button>

                    <button class="btn-view-specimen" data-species-id="${sp.id}" title="Ver ficha técnica completa">
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
          }).join('') : '<p class="text-muted">No se registran especies con los filtros seleccionados para este intervalo temporal.</p>'}
        </div>
      </div>

      <!-- Planetary Conditions & Telemetry -->
      <div class="sidebar-section telemetry-card">
        <h3 class="section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
          </svg>
          Condiciones Planetarias y Clima
        </h3>
        
        <div class="telemetry-grid">
          <div class="stat-box">
            <span class="stat-label">Temperatura Media</span>
            <div class="stat-value-group">
              <span class="stat-value ${tempVal < 0 ? 'text-cold' : 'text-warm'}">${tempVal > 0 ? '+' : ''}${tempVal}°C</span>
              <span class="stat-sub">${period.climate?.tempDelta || ''}</span>
            </div>
            <div class="stat-bar-track">
              <div class="stat-bar-fill ${tempVal < 0 ? 'bar-cold' : 'bar-warm'}" style="width: ${tempPercent}%"></div>
            </div>
          </div>

          <div class="stat-box">
            <span class="stat-label">Oxígeno Atmosférico (O₂)</span>
            <div class="stat-value-group">
              <span class="stat-value text-cyan">${period.atmosphere?.o2 || '21%'}</span>
              <span class="stat-sub">Hoy: 21%</span>
            </div>
            <div class="stat-bar-track">
              <div class="stat-bar-fill bar-cyan" style="width: ${o2Percent}%"></div>
            </div>
          </div>

          <div class="stat-box">
            <span class="stat-label">Dióxido de Carbono (CO₂)</span>
            <div class="stat-value-group">
              <span class="stat-value text-amber">${period.atmosphere?.co2 || '420 ppm'}</span>
              <span class="stat-sub">Presión: ${period.atmosphere?.pressure || '1.0 atm'}</span>
            </div>
          </div>

          <div class="stat-box">
            <span class="stat-label">Nivel del Mar Relativo</span>
            <div class="stat-value-group">
              <span class="stat-value text-blue">${period.climate?.seaLevel || 'Normal'}</span>
            </div>
          </div>
        </div>

        <p class="climate-summary-text">${period.climate?.description || ''}</p>
      </div>

      <!-- Predominant Flora -->
      ${period.flora && period.flora.length > 0 ? `
        <div class="sidebar-section">
          <h3 class="section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L12 22"></path>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            Flora Predominante
          </h3>
          <ul class="bio-list flora-list">
            ${period.flora.map(item => `
              <li class="bio-item">
                <span class="bio-bullet flora-bullet">🌿</span>
                <span>${item}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}

      <!-- Major Tectonic & Evolutionary Events -->
      ${period.events && period.events.length > 0 ? `
        <div class="sidebar-section">
          <h3 class="section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            Hitos Geológicos y Tectónicos
          </h3>
          <div class="events-card">
            ${period.events.map(ev => `
              <div class="event-item">
                <span class="event-arrow">➔</span>
                <span>${ev}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;

    this._attachEventListeners(content);
  }

  _attachEventListeners(content) {
    // Open full catalog modal button
    const btnOpenCatalog = content.querySelector('#btn-open-catalog-sidebar');
    if (btnOpenCatalog) {
      btnOpenCatalog.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onOpenFullCatalog) {
          this.onOpenFullCatalog();
        }
      });
    }

    // Ecosystem quick filter tabs
    const ecoTabs = content.querySelectorAll('.eco-tab');
    ecoTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.stopPropagation();
        this.ecoFilter = tab.dataset.eco;
        this.update(this.currentPeriod, this.activeFauna, this.selectedSpecies);
      });
    });

    // Species search input and clear button
    const spInput = content.querySelector('#input-species-filter');
    const clearSpBtn = content.querySelector('#btn-clear-sp-filter');
    if (spInput) {
      spInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.update(this.currentPeriod, this.activeFauna, this.selectedSpecies);
        const newInput = this.container.querySelector('#input-species-filter');
        if (newInput) {
          newInput.focus();
          newInput.setSelectionRange(newInput.value.length, newInput.value.length);
        }
      });
    }
    if (clearSpBtn) {
      clearSpBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.searchQuery = '';
        this.update(this.currentPeriod, this.activeFauna, this.selectedSpecies);
      });
    }

    // Reset distribution zone button
    const btnResetZone = content.querySelector('#btn-reset-zone');
    if (btnResetZone) {
      btnResetZone.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onResetZone) {
          this.onResetZone();
        }
      });
    }

    // Locate / select geographic distribution zone on 3D globe
    const zoneBtns = content.querySelectorAll('.btn-locate-zone');
    zoneBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const spId = btn.dataset.speciesId;
        const sp = this.activeFauna.find(s => s.id === spId);
        if (sp && this.onLocateSpecies) {
          this.onLocateSpecies(sp);
        }
      });
    });

    // View HD specimen modal
    const viewSpecimenBtns = content.querySelectorAll('.btn-view-specimen, .species-img-wrapper');
    viewSpecimenBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.species-card');
        const spId = card ? card.dataset.speciesId : null;
        if (spId) {
          const sp = this.activeFauna.find(s => s.id === spId);
          if (sp && this.onSelectSpecies) {
            this.onSelectSpecies(sp, this.currentPeriod);
          }
        }
      });
    });
  }

  highlightFossil(siteData) {
    const cards = this.container.querySelectorAll('.species-card');
    cards.forEach(card => {
      const title = card.querySelector('.species-common-name, .species-scientific-name');
      const targetName = siteData.commonName || siteData.name || siteData.scientificName || '';
      if (title && title.textContent.toLowerCase().includes(targetName.toLowerCase())) {
        card.classList.add('highlighted');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => card.classList.remove('highlighted'), 2800);
      }
    });
  }
}
