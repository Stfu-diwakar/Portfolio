// =============================================================================
// MAIN APPLICATION CONTROLLER - EXECUTIVE PORTFOLIO
// Precision Theme Engine, Case Studies, Interactive Demos & Recruiter Tools
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  renderCaseStudies();
  renderExperience();
  renderSkillsMatrix();
  renderEducation();
  renderCertifications();
  initContactForm();
  initResumeModal();
  initScrollReveal();
  initNavScrollSpy();

  // Initialize Developer CLI
  if (document.getElementById('developerCliContainer')) {
    window.cliInstance = new DeveloperCLI('developerCliContainer');
  }
});

// =============================================================================
// THEME ENGINE (DARK / LIGHT WITH SYSTEM PERSISTENCE)
// =============================================================================

function initThemeEngine() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  // Check saved or system preference
  const savedTheme = localStorage.getItem('executive_portfolio_theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark'); // Default to dark

  applyTheme(initialTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('executive_portfolio_theme', theme);

    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'bi bi-moon-stars-fill text-warning';
        if (toggleBtn) toggleBtn.setAttribute('title', 'Switch to Light Mode');
      } else {
        themeIcon.className = 'bi bi-sun-fill text-warning';
        if (toggleBtn) toggleBtn.setAttribute('title', 'Switch to Dark Mode');
      }
    }
  }
}

// =============================================================================
// CASE STUDIES & ARCHITECTURAL SYSTEMS
// =============================================================================

function renderCaseStudies(filter = 'all') {
  const container = document.getElementById('caseStudiesContainer');
  if (!container) return;

  const data = PORTFOLIO_DATA.caseStudies;
  const filtered = filter === 'all' 
    ? data 
    : data.filter(c => c.category.toLowerCase().includes(filter.toLowerCase()));

  container.innerHTML = filtered.map(cs => `
    <div class="case-study-card">
      <div class="case-study-header">
        <div class="d-flex align-items-center gap-2">
          <span class="case-study-badge">${cs.badge}</span>
          <span class="case-study-category">${cs.category}</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          ${cs.liveUrl ? `
            <a href="${cs.liveUrl}" target="_blank" class="btn btn-primary-tech btn-sm px-3 shadow-sm" title="Launch live deployed application">
              <i class="bi bi-play-circle-fill"></i> ${cs.liveLabel || 'Try App ↗'}
            </a>
          ` : ''}
          <a href="${cs.github}" target="_blank" class="btn btn-outline-tech btn-sm px-3">
            <i class="bi bi-github"></i> Code Repository
          </a>
        </div>
      </div>

      <h3 class="case-study-title">${cs.title}</h3>
      <div class="case-study-tagline">${cs.tagline}</div>

      <div class="row g-4 mb-3">
        <div class="col-lg-6">
          <div class="case-block-label"><i class="bi bi-exclamation-triangle-fill text-warning me-1"></i> Problem Statement</div>
          <p class="small text-secondary mb-0">${cs.problem}</p>
        </div>
        <div class="col-lg-6">
          <div class="case-block-label"><i class="bi bi-gear-wide-connected text-primary me-1"></i> Technical Architecture</div>
          <p class="small text-secondary mb-0">${cs.solution}</p>
        </div>
      </div>

      ${cs.benchmarks ? `
        <div class="case-block-label mt-3"><i class="bi bi-bar-chart-steps text-success me-1"></i> Empirical Model Evaluation Benchmarks</div>
        <div class="benchmark-table-wrap">
          <div class="table-responsive">
            <table class="table table-tech-benchmark">
              <thead>
                <tr>
                  <th>Model Algorithm</th>
                  <th>RMSE (kW)</th>
                  <th>MAE (kW)</th>
                  <th>MAPE (%)</th>
                  <th>R² Score</th>
                  <th>Outcome</th>
                </tr>
              </thead>
              <tbody>
                ${cs.benchmarks.map((b, idx) => `
                  <tr class="${idx === 0 ? 'top-performer' : ''}">
                    <td><strong>${b.model}</strong></td>
                    <td class="font-mono">${b.rmse}</td>
                    <td class="font-mono">${b.mae}</td>
                    <td class="font-mono">${b.mape}</td>
                    <td class="font-mono text-primary fw-bold">${b.r2}</td>
                    <td><span class="badge ${idx === 0 ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}">${b.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}

      <div class="case-block-label mt-3"><i class="bi bi-check2-circle text-primary me-1"></i> Engineering Outcomes & Impact</div>
      <ul class="mb-4 ps-3 small text-secondary">
        ${cs.impact.map(imp => `<li class="mb-1">${imp}</li>`).join('')}
      </ul>

      <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 pt-3 border-top border-secondary-subtle">
        <div class="d-flex flex-wrap gap-1">
          ${cs.stack.map(s => `<span class="badge-tech-tag">${s}</span>`).join('')}
        </div>
        <div class="d-flex align-items-center gap-3">
          ${cs.liveUrl ? `
            <a href="${cs.liveUrl}" target="_blank" class="small text-primary fw-bold text-decoration-none d-flex align-items-center gap-1">
              <i class="bi bi-lightning-charge-fill text-warning"></i> ${cs.liveLabel || 'Try Live Demo ↗'}
            </a>
          ` : ''}
          <a href="${cs.github}" target="_blank" class="small text-secondary text-decoration-none fw-semibold">
            Inspect Codebase <i class="bi bi-arrow-right ms-1"></i>
          </a>
        </div>
      </div>
    </div>
  `).join('');

  // Setup filter buttons
  const filterBtns = document.querySelectorAll('[data-case-filter]');
  filterBtns.forEach(btn => {
    btn.onclick = () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCaseStudies(btn.getAttribute('data-case-filter'));
    };
  });

  if (typeof initScrollReveal === 'function') {
    initScrollReveal();
  }
}

// =============================================================================
// PROFESSIONAL EXPERIENCE (GOOGLE XYZ FORMULA)
// =============================================================================

function renderExperience() {
  const container = document.getElementById('experienceTimeline');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.experience.map(exp => `
    <div class="experience-item">
      <div class="experience-dot"></div>
      <div class="experience-card">
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-1">
          <div>
            <h4 class="experience-role">${exp.role}</h4>
            <div class="experience-company">${exp.company} · <span class="text-muted fw-normal">${exp.location}</span></div>
          </div>
          <div class="text-end">
            <span class="badge bg-primary-subtle text-primary border border-primary-subtle">${exp.type}</span>
            <div class="experience-period mt-1">${exp.period} (${exp.duration})</div>
          </div>
        </div>

        <ul class="experience-highlights">
          ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>

        <div class="d-flex flex-wrap gap-1 pt-2 border-top border-secondary-subtle">
          ${exp.skills.map(s => `<span class="badge-tech-tag">${s}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// =============================================================================
// TECHNICAL SKILLS TAXONOMY
// =============================================================================

function renderSkillsMatrix() {
  const container = document.getElementById('skillsMatrixGrid');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.skillsMatrix.map(cat => `
    <div class="col-lg-6 mb-4">
      <div class="skill-matrix-card">
        <div class="skill-matrix-header">
          <div class="skill-matrix-icon"><i class="bi ${cat.icon}"></i></div>
          <h4 class="skill-matrix-title">${cat.category}</h4>
        </div>
        <div class="skill-entries-list">
          ${cat.skills.map(s => `
            <div class="skill-entry">
              <div class="skill-entry-top">
                <span class="skill-entry-name">${s.name}</span>
                <span class="skill-entry-level">${s.level}</span>
              </div>
              <div class="skill-entry-keywords">${s.keywords}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// =============================================================================
// EDUCATION & ACCREDITATIONS
// =============================================================================

function renderEducation() {
  const container = document.getElementById('educationContainer');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.education.map(edu => `
    <div class="col-md-6 mb-3">
      <div class="edu-card">
        <div class="d-flex align-items-center justify-content-between mb-2">
          <span class="badge bg-primary">${edu.period}</span>
          <span class="badge bg-secondary-subtle text-secondary border border-secondary-subtle">${edu.status}</span>
        </div>
        <h4 class="fw-bold mb-1">${edu.degree}</h4>
        <div class="text-primary fw-semibold mb-1">${edu.specialization}</div>
        <div class="small text-muted mb-2">${edu.institution} · ${edu.location}</div>
        <p class="small text-secondary mb-0">${edu.description}</p>
      </div>
    </div>
  `).join('');
}

function renderCertifications() {
  const container = document.getElementById('certificationsGrid');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.certifications.map(cert => `
    <div class="col-md-6 col-lg-3 mb-3">
      <div class="cert-pill-card">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <i class="bi bi-patch-check-fill text-primary fs-5"></i>
          <span class="font-mono small text-muted">${cert.year}</span>
        </div>
        <h6 class="fw-bold mb-1" style="font-size: 0.95rem;">${cert.title}</h6>
        <div class="small text-primary fw-semibold mb-2">${cert.issuer}</div>
        <p class="small text-muted mb-0" style="font-size: 0.78rem;">${cert.desc}</p>
      </div>
    </div>
  `).join('');
}

// =============================================================================
// SILKY SMOOTH SCROLL REVEAL & NAVIGATION SCROLL SPY
// =============================================================================

function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.case-study-card, .experience-item, .skill-matrix-card, .edu-card, .cert-pill-card, .contact-card-executive, .cli-window, .metric-item'
  );

  targets.forEach((el, idx) => {
    if (!el.classList.contains('reveal-on-scroll')) {
      el.classList.add('reveal-on-scroll');
      const staggerIndex = (idx % 4) + 1;
      el.classList.add(`stagger-${staggerIndex}`);
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach(el => observer.observe(el));
  } else {
    targets.forEach(el => el.classList.add('is-revealed'));
  }
}

function initNavScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.site-navbar .nav-link-item[href^="#"]');

  function onScroll() {
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// =============================================================================
// RESUME MODAL & CONTACT DISPATCH
// =============================================================================

function initResumeModal() {
  const viewResumeBtns = document.querySelectorAll('.btn-view-resume');
  const resumeModalEl = document.getElementById('resumeModal');

  viewResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (resumeModalEl) {
        const modal = new bootstrap.Modal(resumeModalEl);
        modal.show();
      }
    });
  });
}

function initContactForm() {
  const form = document.getElementById('executiveContactForm');
  const copyBtn = document.getElementById('copyEmailBtn');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email).then(() => {
        const originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="bi bi-check2-circle text-success me-1"></i> Copied to Clipboard!';
        setTimeout(() => copyBtn.innerHTML = originalHtml, 2000);
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName')?.value || 'Recruiter';
      const email = document.getElementById('contactEmail')?.value || '';
      const subject = document.getElementById('contactSubject')?.value || 'Engineering Opportunity';
      const message = document.getElementById('contactMessage')?.value || '';

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bi bi-send animate-pulse me-1"></i> Transmitting...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="bi bi-check-circle-fill text-success me-1"></i> Dispatched Successfully';
        }
        form.reset();

        // Direct mailto fallback
        const mailtoUrl = `mailto:${PORTFOLIO_DATA.profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
        window.open(mailtoUrl, '_blank');
      }, 1000);
    });
  }
}
