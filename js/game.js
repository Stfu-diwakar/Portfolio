// =============================================================================
// GAMIFICATION ENGINE - XP, ACHIEVEMENTS, ARCADE GAME & CONFETTI
// Drives interactive progression, trophies, arcade mini-game, and Konami secrets
// =============================================================================

class GameEngine {
  constructor() {
    this.xp = parseInt(localStorage.getItem('player_xp') || '0', 10);
    this.level = 1;
    this.levelTitles = [
      { minXp: 0, level: 1, title: "Curious Cadet", maxNext: 150 },
      { minXp: 150, level: 2, title: "Code Sorcerer", maxNext: 350 },
      { minXp: 350, level: 3, title: "Model Engineer", maxNext: 600 },
      { minXp: 600, level: 4, title: "Data Architect", maxNext: 900 },
      { minXp: 900, level: 5, title: "AI Grandmaster", maxNext: 1200 }
    ];

    // Load saved achievements
    const savedUnlocked = JSON.parse(localStorage.getItem('unlocked_achievements') || '[]');
    this.achievements = PORTFOLIO_DATA.achievements.map(a => ({
      ...a,
      unlocked: savedUnlocked.includes(a.id)
    }));

    this.visitedZones = new Set(JSON.parse(localStorage.getItem('visited_zones') || '[]'));
    this.arcadeHighScore = parseInt(localStorage.getItem('arcade_high_score') || '0', 10);

    this.calculateLevel();
  }

  init() {
    this.updateHUD();
    this.initScrollWatcher();
    this.initKonamiCode();
    this.initConfettiCanvas();

    // First Steps Achievement
    setTimeout(() => {
      this.unlockAchievement('first_steps');
    }, 1200);
  }

  calculateLevel() {
    let current = this.levelTitles[0];
    for (let i = 0; i < this.levelTitles.length; i++) {
      if (this.xp >= this.levelTitles[i].minXp) {
        current = this.levelTitles[i];
      }
    }
    const prevLevel = this.level;
    this.level = current.level;
    this.currentRank = current;

    if (this.level > prevLevel && prevLevel > 0) {
      this.onLevelUp(this.level, current.title);
    }
  }

  addXP(amount, reason = "Action completed") {
    const oldLevel = this.level;
    this.xp += amount;
    localStorage.setItem('player_xp', this.xp);

    window.soundFX && window.soundFX.playXpGain();
    this.showFloatingXP(amount, reason);
    this.calculateLevel();
    this.updateHUD();
  }

  onLevelUp(newLevel, title) {
    window.soundFX && window.soundFX.playLevelUp();
    this.triggerConfetti();

    this.showToast({
      title: "🎉 LEVEL UP!",
      message: `You reached Level ${newLevel}: ${title}!`,
      icon: "bi-stars",
      type: "level-up"
    });
  }

  unlockAchievement(id) {
    const ach = this.achievements.find(a => a.id === id);
    if (!ach || ach.unlocked) return;

    ach.unlocked = true;
    const unlockedIds = this.achievements.filter(a => a.unlocked).map(a => a.id);
    localStorage.setItem('unlocked_achievements', JSON.stringify(unlockedIds));

    this.addXP(ach.xp, `Achievement: ${ach.name}`);
    window.soundFX && window.soundFX.playAchievement();
    this.triggerConfetti();

    this.showToast({
      title: `🏆 UNLOCKED: ${ach.name}`,
      message: `${ach.desc} (+${ach.xp} XP)`,
      icon: ach.icon || "bi-trophy-fill",
      type: "achievement"
    });

    this.updateHUD();
    this.renderTrophyModal();
  }

  updateHUD() {
    const levelEl = document.getElementById('hudLevel');
    const rankEl = document.getElementById('hudRank');
    const xpTextEl = document.getElementById('hudXpText');
    const xpBarEl = document.getElementById('hudXpBar');
    const trophyCountEl = document.getElementById('hudTrophyCount');

    if (levelEl) levelEl.textContent = `LVL ${this.level}`;
    if (rankEl) rankEl.textContent = this.currentRank.title;

    const currentFloor = this.currentRank.minXp;
    const nextCeiling = this.currentRank.maxNext;
    const progressInLevel = Math.max(0, this.xp - currentFloor);
    const totalLevelSpan = Math.max(1, nextCeiling - currentFloor);
    const percent = Math.min(100, Math.round((progressInLevel / totalLevelSpan) * 100));

    if (xpTextEl) xpTextEl.textContent = `${this.xp} XP`;
    if (xpBarEl) xpBarEl.style.width = `${percent}%`;

    const unlockedCount = this.achievements.filter(a => a.unlocked).length;
    if (trophyCountEl) trophyCountEl.textContent = `${unlockedCount}/${this.achievements.length}`;
  }

  showFloatingXP(amount, reason) {
    const container = document.getElementById('xpToastContainer');
    if (!container) return;

    const el = document.createElement('div');
    el.className = 'xp-float-pill';
    el.innerHTML = `<span class="xp-val">+${amount} XP</span> <span class="xp-reason">${reason}</span>`;
    container.appendChild(el);

    setTimeout(() => {
      el.classList.add('fade-out');
      setTimeout(() => el.remove(), 400);
    }, 2400);
  }

  showToast({ title, message, icon, type }) {
    const container = document.getElementById('gameNotificationContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `game-toast-card toast-${type}`;
    toast.innerHTML = `
      <div class="toast-icon-wrap">
        <i class="bi ${icon}"></i>
      </div>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-desc">${message}</div>
      </div>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('visible'), 20);

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 500);
    }, 4500);
  }

  initScrollWatcher() {
    const sections = ['hero', 'skills', 'quests', 'projects', 'arcade', 'terminal', 'certifications', 'contact'];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id && !this.visitedZones.has(id)) {
            this.visitedZones.add(id);
            localStorage.setItem('visited_zones', JSON.stringify(Array.from(this.visitedZones)));
            this.addXP(30, `Explored ${id.toUpperCase()} sector`);

            if (this.visitedZones.size >= 6) {
              this.unlockAchievement('lore_master');
            }
          }
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(secId => {
      const el = document.getElementById(secId);
      if (el) observer.observe(el);
    });
  }

  initKonamiCode() {
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let index = 0;

    window.addEventListener('keydown', (e) => {
      const key = e.key;
      if (key.toLowerCase() === code[index].toLowerCase()) {
        index++;
        if (index === code.length) {
          index = 0;
          this.triggerGodMode();
        }
      } else {
        index = 0;
      }
    });
  }

  triggerGodMode() {
    this.unlockAchievement('konami_god');
    this.addXP(200, "Secret Konami Code Activated!");
    this.triggerConfetti(200);

    document.body.classList.add('god-mode-active');
    setTimeout(() => {
      document.body.classList.remove('god-mode-active');
    }, 4000);

    this.showToast({
      title: "🎮 CHEAT CODE ACTIVATED!",
      message: "Konami Code recognized! Supercharged with +200 XP!",
      icon: "bi-joystick",
      type: "achievement"
    });
  }

  // Pure Canvas Confetti
  initConfettiCanvas() {
    this.confettiCanvas = document.getElementById('confettiCanvas');
    if (!this.confettiCanvas) return;
    this.confettiCtx = this.confettiCanvas.getContext('2d');
    this.confettiParticles = [];

    const resize = () => {
      this.confettiCanvas.width = window.innerWidth;
      this.confettiCanvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
  }

  triggerConfetti(count = 75) {
    if (!this.confettiCanvas || !this.confettiCtx) return;

    const colors = ['#00f2fe', '#4facfe', '#38ef7d', '#ff0844', '#ffb199', '#f6d365', '#fda085'];
    for (let i = 0; i < count; i++) {
      this.confettiParticles.push({
        x: Math.random() * this.confettiCanvas.width,
        y: -10 - Math.random() * 50,
        r: Math.random() * 6 + 3,
        d: Math.random() * count,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
        speed: Math.random() * 4 + 3
      });
    }

    if (!this.confettiRunning) {
      this.confettiRunning = true;
      this.animateConfetti();
    }
  }

  animateConfetti() {
    if (!this.confettiParticles.length) {
      this.confettiRunning = false;
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
      return;
    }

    this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

    for (let i = this.confettiParticles.length - 1; i >= 0; i--) {
      const p = this.confettiParticles[i];
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += p.speed;
      p.x += Math.sin(p.d) * 1.5;
      p.tilt = Math.sin(p.tiltAngle) * 12;

      this.confettiCtx.beginPath();
      this.confettiCtx.lineWidth = p.r;
      this.confettiCtx.strokeStyle = p.color;
      this.confettiCtx.moveTo(p.x + p.tilt + p.r, p.y);
      this.confettiCtx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
      this.confettiCtx.stroke();

      if (p.y > this.confettiCanvas.height + 20) {
        this.confettiParticles.splice(i, 1);
      }
    }

    requestAnimationFrame(() => this.animateConfetti());
  }

  renderTrophyModal() {
    const list = document.getElementById('trophyCardsGrid');
    if (!list) return;

    list.innerHTML = this.achievements.map(a => `
      <div class="trophy-card ${a.unlocked ? 'unlocked' : 'locked'}">
        <div class="trophy-badge-icon">
          <i class="bi ${a.unlocked ? a.icon : 'bi-lock-fill'}"></i>
        </div>
        <div class="trophy-meta">
          <div class="trophy-name">${a.name}</div>
          <div class="trophy-desc">${a.unlocked ? a.desc : 'Objective classified · Explore to unlock'}</div>
          <div class="trophy-reward">
            <span class="badge ${a.unlocked ? 'bg-success' : 'bg-secondary'}">+${a.xp} XP</span>
            ${a.unlocked ? '<span class="text-success ms-2"><i class="bi bi-check-circle-fill"></i> Unlocked</span>' : '<span class="text-muted ms-2"><i class="bi bi-lock"></i> Locked</span>'}
          </div>
        </div>
      </div>
    `).join('');
  }
}

// =============================================================================
// PLAYABLE ARCADE MINI-GAME: "AI DATA STREAM DEFENDER"
// =============================================================================

class ArcadeMiniGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.running = false;
    this.score = 0;
    this.lives = 3;
    this.timeLeft = 25;
    this.items = [];
    this.paddle = { x: 200, width: 90, height: 16, speed: 8 };
    this.keys = { left: false, right: false };
    this.animationFrameId = null;
    this.timerInterval = null;

    this.bindEvents();
    this.renderStandbyScreen();
  }

  bindEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        this.keys.left = true;
      }
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        this.keys.right = true;
      }
      // Start with Space or Enter if not already running
      if (!this.running && (e.key === ' ' || e.key === 'Enter')) {
        const rect = this.canvas.getBoundingClientRect();
        // Only if canvas is in or near viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          e.preventDefault();
          this.start();
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') this.keys.left = false;
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') this.keys.right = false;
    });

    // Click on canvas to start if not running
    this.canvas.addEventListener('click', (e) => {
      if (!this.running) {
        window.soundFX && window.soundFX.playClick();
        this.start();
      }
    });

    // Mouse / Touch movement on canvas
    const handleMove = (clientX) => {
      if (!this.running) return;
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const mouseX = (clientX - rect.left) * scaleX;
      this.paddle.x = Math.max(0, Math.min(this.canvas.width - this.paddle.width, mouseX - this.paddle.width / 2));
    };

    this.canvas.addEventListener('mousemove', (e) => handleMove(e.clientX));

    this.canvas.addEventListener('touchstart', (e) => {
      if (!this.running) {
        this.start();
        return;
      }
      if (e.touches.length) handleMove(e.touches[0].clientX);
    }, { passive: true });

    this.canvas.addEventListener('touchmove', (e) => {
      if (!this.running) return;
      if (e.touches.length) {
        handleMove(e.touches[0].clientX);
        e.preventDefault();
      }
    }, { passive: false });

    // Mobile on-screen direction buttons
    const btnLeft = document.getElementById('arcadeBtnLeft');
    const btnRight = document.getElementById('arcadeBtnRight');

    const bindButton = (btn, key) => {
      if (!btn) return;
      const press = (e) => { e.preventDefault(); this.keys[key] = true; };
      const release = (e) => { e.preventDefault(); this.keys[key] = false; };
      btn.addEventListener('mousedown', press);
      btn.addEventListener('mouseup', release);
      btn.addEventListener('mouseleave', release);
      btn.addEventListener('touchstart', press, { passive: false });
      btn.addEventListener('touchend', release, { passive: false });
    };

    bindButton(btnLeft, 'left');
    bindButton(btnRight, 'right');
  }

  renderStandbyScreen() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Subtle Grid Background
    this.ctx.strokeStyle = 'rgba(0, 242, 254, 0.08)';
    this.ctx.lineWidth = 1;
    for (let x = 0; x < this.canvas.width; x += 35) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    for (let y = 0; y < this.canvas.height; y += 35) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }

    // Title
    this.ctx.shadowColor = '#00f2fe';
    this.ctx.shadowBlur = 18;
    this.ctx.fillStyle = '#00f2fe';
    this.ctx.font = 'bold 26px "Space Grotesk", sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText("DATA STREAM DEFENDER", this.canvas.width / 2, 110);

    // Subtitle
    this.ctx.shadowBlur = 0;
    this.ctx.fillStyle = '#94a3b8';
    this.ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    this.ctx.fillText("Catch 🟢 Clean Data (+15) and ⚡ Model Weights (+25)", this.canvas.width / 2, 155);
    this.ctx.fillText("Dodge 👾 Bug Packets (-20 & Lose Heart)", this.canvas.width / 2, 185);

    // Start Prompt Button Pill
    this.ctx.shadowColor = '#38ef7d';
    this.ctx.shadowBlur = 12;
    this.ctx.fillStyle = '#38ef7d';
    this.ctx.beginPath();
    const bx = this.canvas.width / 2 - 130;
    const by = 240;
    if (this.ctx.roundRect) {
      this.ctx.roundRect(bx, by, 260, 48, 12);
    } else {
      this.ctx.rect(bx, by, 260, 48);
    }
    this.ctx.fill();

    this.ctx.shadowBlur = 0;
    this.ctx.fillStyle = '#070913';
    this.ctx.font = 'bold 15px "Space Grotesk", sans-serif';
    this.ctx.fillText("▶ CLICK TO START GAME", this.canvas.width / 2, by + 30);
  }

  start() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    this.score = 0;
    this.lives = 3;
    this.timeLeft = 25;
    this.items = [];
    this.running = true;
    this.paddle.x = this.canvas.width / 2 - this.paddle.width / 2;

    const overlay = document.getElementById('arcadeGameOverOverlay');
    if (overlay) overlay.classList.add('d-none');

    const startBtn = document.getElementById('arcadeStartBtn');
    if (startBtn) {
      startBtn.innerHTML = '<i class="bi bi-controller me-1"></i> Game In Progress...';
      startBtn.disabled = true;
    }

    this.updateHUD();

    this.timerInterval = setInterval(() => {
      if (!this.running) return;
      this.timeLeft--;
      this.updateHUD();
      if (this.timeLeft <= 0) {
        this.gameOver(true);
      }
    }, 1000);

    this.lastSpawn = performance.now();
    this.loop();
  }

  spawnItem() {
    const types = [
      { type: 'clean_data', symbol: '🟢', label: 'Clean Data', points: 15, isGood: true, color: '#00f2fe' },
      { type: 'model_weight', symbol: '⚡', label: 'Weight', points: 25, isGood: true, color: '#38ef7d' },
      { type: 'neural_spark', symbol: '🔮', label: 'Gemini Spark', points: 40, isGood: true, color: '#f6d365' },
      { type: 'bug', symbol: '👾', label: 'Bug/Leak', points: -20, isGood: false, color: '#ff4b4b' }
    ];

    const pick = types[Math.floor(Math.random() * types.length)];
    this.items.push({
      ...pick,
      x: Math.random() * (this.canvas.width - 50) + 25,
      y: 0,
      radius: 15,
      speed: Math.random() * 2.5 + 2.5
    });
  }

  updateHUD() {
    const scoreEl = document.getElementById('arcadeScore');
    const livesEl = document.getElementById('arcadeLives');
    const timerEl = document.getElementById('arcadeTimer');

    if (scoreEl) scoreEl.textContent = this.score;
    if (livesEl) livesEl.innerHTML = '❤️'.repeat(Math.max(0, this.lives));
    if (timerEl) timerEl.textContent = `${this.timeLeft}s`;
  }

  loop() {
    if (!this.running) return;

    // Movement
    if (this.keys.left) this.paddle.x = Math.max(0, this.paddle.x - this.paddle.speed);
    if (this.keys.right) this.paddle.x = Math.min(this.canvas.width - this.paddle.width, this.paddle.x + this.paddle.speed);

    // Spawning
    if (performance.now() - this.lastSpawn > 500) {
      this.spawnItem();
      this.lastSpawn = performance.now();
    }

    // Update items
    const paddleY = this.canvas.height - 28;
    for (let i = this.items.length - 1; i >= 0; i--) {
      const it = this.items[i];
      it.y += it.speed;

      // Collision with paddle
      if (
        it.y + it.radius >= paddleY &&
        it.y - it.radius <= paddleY + this.paddle.height &&
        it.x >= this.paddle.x - 12 &&
        it.x <= this.paddle.x + this.paddle.width + 12
      ) {
        if (it.isGood) {
          this.score += it.points;
          window.soundFX && window.soundFX.playGameCatch();
        } else {
          this.score = Math.max(0, this.score + it.points);
          this.lives--;
          window.soundFX && window.soundFX.playGameHit();
          if (this.lives <= 0) {
            this.gameOver(false);
            return;
          }
        }
        this.items.splice(i, 1);
        this.updateHUD();
        continue;
      }

      // Off screen bottom
      if (it.y > this.canvas.height + 25) {
        this.items.splice(i, 1);
      }
    }

    this.render();
    this.animationFrameId = requestAnimationFrame(() => this.loop());
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Subtle Grid Background
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    this.ctx.lineWidth = 1;
    for (let x = 0; x < this.canvas.width; x += 35) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }

    // Paddle (Cyber Catcher)
    const paddleY = this.canvas.height - 28;
    const grad = this.ctx.createLinearGradient(this.paddle.x, paddleY, this.paddle.x + this.paddle.width, paddleY);
    grad.addColorStop(0, '#00f2fe');
    grad.addColorStop(1, '#4facfe');

    this.ctx.shadowColor = '#00f2fe';
    this.ctx.shadowBlur = 14;
    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    if (this.ctx.roundRect) {
      this.ctx.roundRect(this.paddle.x, paddleY, this.paddle.width, this.paddle.height, 8);
    } else {
      this.ctx.rect(this.paddle.x, paddleY, this.paddle.width, this.paddle.height);
    }
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    // Items
    for (const it of this.items) {
      this.ctx.shadowColor = it.color;
      this.ctx.shadowBlur = 10;
      this.ctx.font = '22px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(it.symbol, it.x, it.y);
      this.ctx.shadowBlur = 0;
    }
  }

  gameOver(survived) {
    this.running = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    window.soundFX && window.soundFX.playGameOver();

    const overlay = document.getElementById('arcadeGameOverOverlay');
    const finalScoreEl = document.getElementById('arcadeFinalScore');
    const verdictEl = document.getElementById('arcadeVerdict');
    const startBtn = document.getElementById('arcadeStartBtn');

    if (finalScoreEl) finalScoreEl.textContent = this.score;
    if (verdictEl) {
      if (this.score >= 100) {
        verdictEl.textContent = "🏆 Victory! High Accuracy Model Trained!";
        verdictEl.className = "text-success fw-bold fs-5";
        window.gameEngine.unlockAchievement('play_arcade');
        window.gameEngine.addXP(100, "Arcade Mastery (100+ Score)");
      } else {
        verdictEl.textContent = survived ? "Training Window Complete!" : "Overfitting / Packet Loss!";
        verdictEl.className = "text-warning fw-bold fs-5";
        window.gameEngine.addXP(30, "Arcade Participation");
      }
    }

    if (overlay) overlay.classList.remove('d-none');
    if (startBtn) {
      startBtn.disabled = false;
      startBtn.innerHTML = '<i class="bi bi-play-circle-fill me-1"></i> Start Training Session';
    }
  }
}

// Global Instances
window.gameEngine = new GameEngine();
