// =============================================================================
// DEVELOPER CLI EMULATOR FOR TECHNICAL RECRUITERS & HIRING MANAGERS
// High-signal command-line console providing instant engineering data
// =============================================================================

class DeveloperCLI {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.output = this.container.querySelector('.cli-terminal-body');
    this.input = this.container.querySelector('.cli-input');
    this.history = [];
    this.historyIndex = -1;

    this.bindEvents();
    this.printWelcome();
  }

  bindEvents() {
    if (!this.input) return;

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = this.input.value.trim();
        if (cmd) {
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          this.executeCommand(cmd);
          this.input.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      }
    });

    this.container.addEventListener('click', () => {
      if (this.input) this.input.focus();
    });
  }

  printWelcome() {
    this.writeLine(`<span style="color: #38bdf8; font-weight: 700;">Diwakar Jha [Developer Workstation CLI v2.4]</span>`);
    this.writeLine(`Type <span style="color: #fbbf24;">'help'</span> to view available commands, or click any command shortcut above.\n`);
  }

  writeLine(html) {
    const line = document.createElement('div');
    line.className = 'cli-line';
    line.innerHTML = html;
    this.output.appendChild(line);
    this.output.scrollTop = this.output.scrollHeight;
  }

  runCommandDirect(cmd) {
    if (this.input) this.input.value = cmd;
    this.executeCommand(cmd);
    if (this.input) this.input.value = '';
  }

  executeCommand(rawCmd) {
    const cmd = rawCmd.toLowerCase().trim();
    this.writeLine(`<span class="cli-prompt">diwakar@workstation:~$</span> <span style="color: #f8fafc;">${rawCmd}</span>`);

    switch (cmd) {
      case 'help':
        this.writeLine(`
<span style="color: #34d399; font-weight: 600;">Available Developer Commands:</span>
  <span style="color: #38bdf8;">summary</span>       - Executive candidate overview & core metrics
  <span style="color: #38bdf8;">benchmarks</span>    - Multi-model time-series evaluation (XGBoost vs LSTM vs ARIMA)
  <span style="color: #38bdf8;">projects</span>      - Architectural case studies & GitHub repositories
  <span style="color: #38bdf8;">experience</span>    - Verified industry internships in Google XYZ format
  <span style="color: #38bdf8;">skills</span>        - Technical skills matrix & proficiency taxonomy
  <span style="color: #38bdf8;">education</span>     - Graduate and undergraduate university credentials
  <span style="color: #38bdf8;">resume</span>        - View & download official PDF resume
  <span style="color: #38bdf8;">contact</span>       - Direct recruiter communication channels
  <span style="color: #38bdf8;">hire</span>          - Fast-track interview scheduling dispatch
  <span style="color: #38bdf8;">clear</span>         - Clear the terminal console
`);
        break;

      case 'summary':
      case 'bio':
      case 'about':
        this.writeLine(`
<span style="color: #fbbf24; font-weight: 600;">CANDIDATE:</span> ${PORTFOLIO_DATA.profile.name}
<span style="color: #fbbf24; font-weight: 600;">ROLE:</span>      ${PORTFOLIO_DATA.profile.title}
<span style="color: #fbbf24; font-weight: 600;">EDUCATION:</span> ${PORTFOLIO_DATA.profile.subtitle}
<span style="color: #fbbf24; font-weight: 600;">LOCATION:</span>  ${PORTFOLIO_DATA.profile.location}

<span style="color: #94a3b8;">${PORTFOLIO_DATA.profile.summary}</span>
`);
        break;

      case 'benchmarks':
      case 'metrics':
        this.writeLine(`<span style="color: #34d399; font-weight: 600;">=== TIME-SERIES FORECASTING MODEL BENCHMARKS (HEMS) ===</span>`);
        this.writeLine(`Dataset: 8,760 hourly observations with multi-appliance telemetry & weather degree hours.`);
        this.writeLine(`--------------------------------------------------------------------------------`);
        this.writeLine(`Algorithm           | RMSE (kW) | MAE (kW)  | MAPE (%) | R² Score | Result`);
        this.writeLine(`--------------------------------------------------------------------------------`);
        this.writeLine(`XGBoost Regressor   | 0.4292    | 0.3065    | 5.69%    | 0.9870   | ★ Top Model`);
        this.writeLine(`Keras Stacked LSTM  | 1.2140    | 0.8947    | 19.39%   | 0.8962   | Sequence Fit`);
        this.writeLine(`ARIMA Baseline      | 3.8148    | 3.1597    | 79.03%   | -0.0262  | Baseline`);
        this.writeLine(`--------------------------------------------------------------------------------`);
        this.writeLine(`Outcome: Automated peak load shifting yielded 30% to 50% peak demand reduction.\n`);
        break;

      case 'projects':
      case 'case-studies':
        this.writeLine(`<span style="color: #34d399; font-weight: 600;">=== ARCHITECTURAL CASE STUDIES ===</span>`);
        PORTFOLIO_DATA.caseStudies.forEach((cs, i) => {
          this.writeLine(`[${i + 1}] <span style="color: #38bdf8; font-weight: 600;">${cs.title}</span> (${cs.category})`);
          this.writeLine(`    ${cs.tagline}`);
          this.writeLine(`    Stack: <span style="color: #c084fc;">${cs.stack.join(', ')}</span>`);
          if (cs.liveUrl) {
            this.writeLine(`    🚀 <span style="color: #34d399; font-weight: 600;">Live App:</span> <a href="${cs.liveUrl}" target="_blank" style="color: #34d399; text-decoration: underline;">${cs.liveUrl} ↗</a>`);
          }
          this.writeLine(`    Repository: <a href="${cs.github}" target="_blank" style="color: #60a5fa; text-decoration: underline;">${cs.github}</a>\n`);
        });
        break;

      case 'experience':
      case 'exp':
        this.writeLine(`<span style="color: #34d399; font-weight: 600;">=== VERIFIED INDUSTRY EXPERIENCE (GOOGLE XYZ FORMAT) ===</span>`);
        PORTFOLIO_DATA.experience.forEach(exp => {
          this.writeLine(`• <span style="color: #fbbf24; font-weight: 600;">${exp.role}</span> @ ${exp.company} (${exp.period})`);
          exp.highlights.forEach(h => {
            this.writeLine(`  - ${h}`);
          });
          this.writeLine(`  Stack: ${exp.skills.join(' · ')}\n`);
        });
        break;

      case 'skills':
        this.writeLine(`<span style="color: #34d399; font-weight: 600;">=== TECHNICAL SKILLS TAXONOMY ===</span>`);
        PORTFOLIO_DATA.skillsMatrix.forEach(cat => {
          this.writeLine(`<span style="color: #fbbf24;">[${cat.category}]</span>`);
          cat.skills.forEach(s => {
            this.writeLine(`  • ${s.name.padEnd(36)} [${s.level}] — ${s.keywords}`);
          });
        });
        break;

      case 'education':
      case 'edu':
        this.writeLine(`<span style="color: #34d399; font-weight: 600;">=== ACADEMIC CREDENTIALS ===</span>`);
        PORTFOLIO_DATA.education.forEach(edu => {
          this.writeLine(`🎓 <span style="color: #fbbf24; font-weight: 600;">${edu.degree}</span> - ${edu.specialization}`);
          this.writeLine(`   ${edu.institution}, ${edu.location} [${edu.period}]`);
          this.writeLine(`   ${edu.description}\n`);
        });
        break;

      case 'resume':
      case 'cv':
        this.writeLine(`
<span style="color: #34d399; font-weight: 600;">=== OFFICIAL CANDIDATE RESUME ===</span>
📄 <strong>Standalone Interactive Page:</strong> <a href="${PORTFOLIO_DATA.profile.resumeUrl || 'resume.html'}" target="_blank" style="color: #38bdf8; text-decoration: underline;">Open resume.html ↗</a>
📥 <strong>Direct PDF Download:</strong> <a href="${PORTFOLIO_DATA.profile.resumePdf || 'resume.pdf'}" download="Diwakar_Jha_Resume.pdf" style="color: #fbbf24; text-decoration: underline;">Download resume.pdf ↓</a>
`);
        window.open(PORTFOLIO_DATA.profile.resumeUrl || 'resume.html', '_blank');
        break;

      case 'contact':
        this.writeLine(`
<span style="color: #34d399; font-weight: 600;">=== RECRUITER CONTACT FREQUENCIES ===</span>
📧 Email:    <a href="mailto:${PORTFOLIO_DATA.profile.email}" style="color: #38bdf8;">${PORTFOLIO_DATA.profile.email}</a>
📞 Phone:    ${PORTFOLIO_DATA.profile.phone}
💼 LinkedIn: <a href="${PORTFOLIO_DATA.profile.linkedin}" target="_blank" style="color: #38bdf8;">${PORTFOLIO_DATA.profile.linkedin}</a>
🐙 GitHub:   <a href="${PORTFOLIO_DATA.profile.github}" target="_blank" style="color: #38bdf8;">${PORTFOLIO_DATA.profile.github}</a>
📍 Location: ${PORTFOLIO_DATA.profile.location}
`);
        break;

      case 'hire':
        this.writeLine(`
<span style="color: #c084fc; font-weight: 600;">=== FAST-TRACK RECRUITMENT DISPATCH ===</span>
Candidate: Diwakar Jha
Status:    Actively Interviewing for Machine Learning Engineer & AI Developer Roles.
Dispatch an interview invitation:
<a href="mailto:${PORTFOLIO_DATA.profile.email}?subject=Interview%20Invitation%20for%20Diwakar%20Jha" class="btn btn-sm btn-outline-info my-2">Send Interview Dispatch Email 🚀</a>
`);
        break;

      case 'clear':
      case 'cls':
        this.output.innerHTML = '';
        break;

      default:
        this.writeLine(`<span style="color: #f87171;">Command not found: '${rawCmd}'. Type 'help' to see valid commands.</span>`);
        break;
    }
  }
}

window.DeveloperCLI = DeveloperCLI;
