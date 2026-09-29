/**
 * Compact Floating Timeline Scrubber & Chronostratigraphic Dock
 * Streamlined, high-performance component based on the IUGS International Chronostratigraphic Scale.
 * Ultra-compact footprint that preserves maximum 3D globe visibility.
 */
export class Timeline {
  constructor(containerElement, periods, onPeriodChange) {
    this.container = containerElement;
    this.periods = periods;
    this.onPeriodChange = onPeriodChange;
    this.currentIndex = 0;

    this.isPlaying = false;
    this.playInterval = null;
    this.playSpeedMs = 2800; // time per geological period in auto-play

    this._render();
    this._attachEvents();
  }

  _render() {
    this.container.innerHTML = `
      <div class="timeline-hud glass-panel compact-dock" id="timeline-hud">
        <!-- Main Compact Control Row -->
        <div class="timeline-compact-row">
          <!-- Playback Controls -->
          <div class="timeline-ctrl-group">
            <button id="btn-prev-period" class="timeline-btn-mini" title="Periodo anterior más antiguo (Tecla ←)" aria-label="Anterior">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polygon points="19 20 9 12 19 4 19 20"></polygon>
                <line x1="5" y1="19" x2="5" y2="5"></line>
              </svg>
            </button>

            <button id="btn-play-pause" class="timeline-btn-play" title="Reproducir / Pausar deriva continental (Espacio)" aria-label="Reproducir">
              <svg id="icon-play" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6 4 19 12 6 20 6 4"></polygon>
              </svg>
              <svg id="icon-pause" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display:none;">
                <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                <rect x="14" y="4" width="4" height="16" rx="1"></rect>
              </svg>
            </button>

            <button id="btn-next-period" class="timeline-btn-mini" title="Periodo siguiente más reciente (Tecla →)" aria-label="Siguiente">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polygon points="5 4 15 12 5 20 5 4"></polygon>
                <line x1="19" y1="5" x2="19" y2="19"></line>
              </svg>
            </button>

            <div class="timeline-speed-mini">
              <button class="btn-speed active" data-speed="2800" title="Velocidad normal">1x</button>
              <button class="btn-speed" data-speed="1400" title="Velocidad rápida">2x</button>
            </div>
          </div>

          <!-- Active Period Pill in Center -->
          <div class="timeline-period-info">
            <span class="period-dot-indicator" id="period-dot-indicator"></span>
            <span class="period-badge-mini" id="current-iugs-badge">Cenozoico</span>
            <strong class="period-title-mini" id="current-period-title">Presente (Holoceno)</strong>
            <span class="period-era-tag-mini" id="current-period-era">0 Ma (Cuaternario)</span>
          </div>

          <!-- Time Readout & Eras Quick Access -->
          <div class="timeline-time-info">
            <div class="time-badge-prominent">
              <span class="time-num-compact" id="current-time-ma">0</span>
              <span class="time-unit-compact">Ma</span>
            </div>
            <button id="btn-timeline-eras" class="timeline-eras-shortcut" title="Abrir selector de todas las eras geológicas">
              <span>Atlas Eras</span>
            </button>
          </div>
        </div>

        <!-- Scrubber Track & Milestone pips -->
        <div class="scrubber-wrapper-compact">
          <div class="iugs-color-track" id="iugs-track"></div>
          <input 
            type="range" 
            id="timeline-slider" 
            class="timeline-slider" 
            min="0" 
            max="${this.periods.length - 1}" 
            step="1" 
            value="0" 
            aria-label="Línea de tiempo geológica"
          />
          <div class="timeline-hover-bubble" id="timeline-hover-bubble" style="display: none;"></div>
          
          <div class="scrubber-milestones" id="scrubber-milestones">
            <span class="milestone-label" data-ma="0" title="Presente">0 Ma (Hoy)</span>
            <span class="milestone-label" data-ma="66" title="Impacto Chicxulub / Dinosaurios">66 Ma (K-Pg)</span>
            <span class="milestone-label" data-ma="200" title="Fractura de Pangea">200 Ma (Tr-J)</span>
            <span class="milestone-label" data-ma="250" title="Gran Mortandad del Pérmico">250 Ma (P-Tr)</span>
            <span class="milestone-label" data-ma="540" title="Explosión Cámbrica">540 Ma (Cámbrico)</span>
            <span class="milestone-label" data-ma="750" title="Tierra Bola de Nieve">750 Ma (Rodinia)</span>
          </div>
        </div>
      </div>
    `;

    this._populateIUGSTracks();
  }

  _populateIUGSTracks() {
    const track = this.container.querySelector('#iugs-track');
    if (!track) return;
    track.innerHTML = '';

    this.periods.forEach((p, index) => {
      const segment = document.createElement('div');
      segment.className = 'iugs-segment';
      segment.style.backgroundColor = p.iugsColor;
      segment.style.flex = '1';
      segment.title = `${p.name} • ${p.timeMa} Ma (${p.era})`;
      track.appendChild(segment);
    });
  }

  _attachEvents() {
    const slider = this.container.querySelector('#timeline-slider');
    const btnPlay = this.container.querySelector('#btn-play-pause');
    const btnPrev = this.container.querySelector('#btn-prev-period');
    const btnNext = this.container.querySelector('#btn-next-period');
    const speedButtons = this.container.querySelectorAll('.btn-speed');
    const btnEras = this.container.querySelector('#btn-timeline-eras');
    const scrubberWrapper = this.container.querySelector('.scrubber-wrapper-compact');
    const hoverBubble = this.container.querySelector('#timeline-hover-bubble');

    slider.addEventListener('input', (e) => {
      this.pause();
      const index = parseInt(e.target.value, 10);
      this.goToIndex(index);
    });

    btnPlay.addEventListener('click', () => {
      this.togglePlay();
    });

    btnPrev.addEventListener('click', () => {
      this.pause();
      // Moving older = increase index (0Ma -> 750Ma)
      if (this.currentIndex < this.periods.length - 1) {
        this.goToIndex(this.currentIndex + 1);
      }
    });

    btnNext.addEventListener('click', () => {
      this.pause();
      // Moving newer = decrease index (750Ma -> 0Ma)
      if (this.currentIndex > 0) {
        this.goToIndex(this.currentIndex - 1);
      }
    });

    // Milestone quick jumps
    const milestones = this.container.querySelectorAll('.milestone-label');
    milestones.forEach(m => {
      m.addEventListener('click', () => {
        const ma = parseInt(m.dataset.ma, 10);
        let closestIdx = 0;
        let minDiff = Infinity;
        this.periods.forEach((p, i) => {
          const diff = Math.abs(p.timeMa - ma);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = i;
          }
        });
        this.pause();
        this.goToIndex(closestIdx);
      });
    });

    // Speed selector
    speedButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        speedButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.playSpeedMs = parseInt(btn.dataset.speed, 10);
        if (this.isPlaying) {
          this.pause();
          this.play();
        }
      });
    });

    // Eras Modal shortcut
    if (btnEras) {
      btnEras.addEventListener('click', () => {
        const erasDialog = document.getElementById('eras-dialog');
        if (erasDialog) erasDialog.showModal();
      });
    }

    // Hover tooltip preview on scrubber
    if (scrubberWrapper && hoverBubble) {
      scrubberWrapper.addEventListener('mousemove', (e) => {
        const rect = scrubberWrapper.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const idx = Math.round(ratio * (this.periods.length - 1));
        const p = this.periods[idx];
        if (p) {
          hoverBubble.style.display = 'block';
          hoverBubble.style.left = `${ratio * 100}%`;
          hoverBubble.innerHTML = `<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${p.iugsColor};margin-right:5px;box-shadow:0 0 6px ${p.iugsColor};"></span>${p.name} • <strong>${p.timeMa} Ma</strong>`;
        }
      });

      scrubberWrapper.addEventListener('mouseleave', () => {
        hoverBubble.style.display = 'none';
      });
    }

    // Global keyboard shortcuts: Space to play/pause, Left/Right arrow keys
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        this.togglePlay();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.pause();
        if (this.currentIndex < this.periods.length - 1) {
          this.goToIndex(this.currentIndex + 1);
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.pause();
        if (this.currentIndex > 0) {
          this.goToIndex(this.currentIndex - 1);
        }
      }
    });
  }

  goToIndex(index) {
    if (index < 0 || index >= this.periods.length) return;
    this.currentIndex = index;
    const period = this.periods[this.currentIndex];

    // Update UI elements
    const slider = this.container.querySelector('#timeline-slider');
    if (slider) slider.value = index;

    const badge = this.container.querySelector('#current-iugs-badge');
    const title = this.container.querySelector('#current-period-title');
    const timeMa = this.container.querySelector('#current-time-ma');
    const eraTag = this.container.querySelector('#current-period-era');
    const dot = this.container.querySelector('#period-dot-indicator');

    if (badge) {
      badge.textContent = period.era;
      badge.style.backgroundColor = period.iugsColor;
      badge.style.color = '#111827';
    }
    if (dot) {
      dot.style.backgroundColor = period.iugsColor;
      dot.style.boxShadow = `0 0 10px ${period.iugsColor}`;
    }
    if (title) title.textContent = period.name;
    if (timeMa) timeMa.textContent = period.timeMa;
    if (eraTag) eraTag.textContent = `${period.timeMa} Ma • ${period.period}`;

    // Fire callback
    if (this.onPeriodChange) {
      this.onPeriodChange(period, index);
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.isPlaying = true;
    const iconPlay = this.container.querySelector('#icon-play');
    const iconPause = this.container.querySelector('#icon-pause');
    const btnPlay = this.container.querySelector('#btn-play-pause');

    if (iconPlay) iconPlay.style.display = 'none';
    if (iconPause) iconPause.style.display = 'block';
    if (btnPlay) btnPlay.title = 'Pausar (Espacio)';

    // If at the oldest point, loop to present day
    if (this.currentIndex >= this.periods.length - 1) {
      this.goToIndex(0);
    }

    this.playInterval = setInterval(() => {
      let nextIndex = this.currentIndex + 1;
      if (nextIndex >= this.periods.length) {
        nextIndex = 0; // loop back
      }
      this.goToIndex(nextIndex);
    }, this.playSpeedMs);
  }

  pause() {
    this.isPlaying = false;
    if (this.playInterval) {
      clearInterval(this.playInterval);
      this.playInterval = null;
    }
    const iconPlay = this.container.querySelector('#icon-play');
    const iconPause = this.container.querySelector('#icon-pause');
    const btnPlay = this.container.querySelector('#btn-play-pause');

    if (iconPlay) iconPlay.style.display = 'block';
    if (iconPause) iconPause.style.display = 'none';
    if (btnPlay) btnPlay.title = 'Reproducir deriva continental (Espacio)';
  }
}
