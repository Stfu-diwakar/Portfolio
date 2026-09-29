# 🚀 Diwakar Jha — Machine Learning Engineer & AI Systems Developer
Link : https://energy-consumption-forecasting-cna1.onrender.com/
A Google hiring-manager-grade engineering portfolio for **Diwakar Jha** (MCA AI & ML student @ Chandigarh University, Aspiring ML Engineer, and GeeksforGeeks Campus Mantri).

Engineered to showcase architectural rigor, empirical modeling benchmarks ($R^2 = 0.9870$), production-ready full-stack case studies, and quantitative impact (Google XYZ format).

---

## 🌟 Key Engineering Highlights

- **📊 High-Impact Quantitative Metrics**:
  - **0.9870 $R^2$ Score**: Achieved on Smart Home Energy Forecasting using XGBoost over 8,760 hourly telemetry observations.
  - **4+ Industry Internships**: Machine Learning, Generative AI, and Business Intelligence roles at TBI GEU, Codec Technologies, DecodeLabs, and Enginow.
  - **18+ Open Source Repositories**: Covering Python, Scikit-Learn, Streamlit, Flask, and C++.
  - **6 Months Campus Leadership**: Official GeeksforGeeks Campus Mantri at Chandigarh University (January 2026 – June 2026).
- **🏛️ In-Depth Architectural Case Studies & Live Deployments**:
  - **Smart Home Energy Forecasting & Optimization AI (HEMS)**: Multi-model comparative pipeline (ARIMA baseline vs. XGBoost vs. Keras Stacked LSTM 24-hr sequence network) coupled with automated peak load shifting (30–50% peak demand reduction, 25–45% electricity cost savings).
  - **Election Process Education Assistant & Civic AI Platform**: Docker-containerized civic education architecture featuring Google Gemini 2.5 Flash natural language assistant.
  - **Convolutional Neural Network (CNN) Image Classifier**: Deep learning computer vision pipeline with Conv2D/MaxPooling2D, dropout regularization, and real-time Streamlit confidence meter.
  - **PIC CHECKER — AI Media Forensics & Deepfake Detection Engine**: FastAPI REST microservice inspecting EXIF and PNG chunk metadata for Stable Diffusion and Midjourney parameters.
  - **!-SPAM — Machine Learning Threat & Phishing Detection System**: NLP classification engine with TF-IDF vectorization, 98.4% accuracy, and sub-15ms inference latency.
  - **Real-Time Stock Market Telemetry Dashboard**: Streamlit, Plotly, and yfinance engine with real-time candlestick telemetry and technical indicators.
  - **Autonomous Mobile Robot Route Optimization**: A* Heuristic Search (Manhattan/Euclidean) vs BFS on dynamic 2D obstacle grid environments.
  - **Smart Venue & Stadium Operations Assistant**: Folium spatial heatmaps, queue latency prediction, and Firebase synchronization.
- **💼 Verified Work Experience (Google XYZ Format)**:
  - *Accomplished [X], as measured by [Y], by doing [Z]* across all 5 career milestones.
- **⌨️ Developer CLI Workstation Console**:
  - Interactive terminal emulator tailored for technical interviewers (`summary`, `benchmarks`, `projects`, `experience`, `skills`, `resume`, `contact`, `hire`).
- **📄 Dedicated Standalone Resume System & 1-Click PDF Download**:
  - **Standalone Interactive Page (`resume.html`)**: Embeds full-fidelity PDF viewer, clean printable HTML document format, theme toggle, and print support.
  - **1-Step Resume Updates**: To update credentials anytime, simply overwrite `resume.pdf` in the root folder. All links, embeds, and downloads update immediately across the entire site.
  - **Direct Download**: Fast access to `resume.pdf` with download triggers.
- **✨ Silky Smooth UI & Responsive Micro-Animations**:
  - Subtle scroll-reveal (`IntersectionObserver`) with staggered grid transitions.
  - High-precision dark/light theme switching with system persistence.
  - Active navigation scroll-spy and soft-elevation card interactions.
- **🌓 Dual Dark / Light Theme Engine**:
  - Modern, accessible, high-contrast design inspired by Google DeepMind and Linear.

---

## 📄 How to Update Your Resume Anytime

The portfolio is built with a decoupled, modular resume architecture:

1. Export your latest resume as a PDF.
2. Rename it to **`resume.pdf`** (or overwrite `resume.pdf` in the project root directory).
3. That's it! 
   - `resume.html` (the dedicated resume page) will display the new PDF.
   - All download buttons on the navbar, hero section, developer CLI, and footer will instantly serve your new resume.
   - No HTML or code edits needed.

---

## 🚀 Instant Deployment on Render

This repository is pre-configured for seamless deployment on [Render](https://render.com):

### Option 1: Static Site (Recommended & Free)
1. Push this repository to GitHub.
2. In [Render Dashboard](https://dashboard.render.com), click **New +** $\rightarrow$ **Static Site**.
3. Select your repository.
4. Settings:
   - **Name**: `diwakar-portfolio`
   - **Branch**: `main`
   - **Build Command**: *(leave blank)*
   - **Publish Directory**: `.`
5. Click **Create Static Site**.

### Option 2: Web Service (Node.js)
1. In Render, select **New +** $\rightarrow$ **Web Service**.
2. Select your repository. Render automatically reads `package.json`:
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/healthz`
3. Click **Create Web Service**.

---

## 💻 Local Execution

Run locally with Node.js:
```bash
npm start
```
Navigate to **`http://localhost:3000`** in your browser.

Or with Python:
```bash
python -m http.server 8000
```
Navigate to **`http://localhost:8000`**.

---

## 📂 Repository Structure

```
├── index.html                  # Executive semantic HTML5 architecture
├── resume.html                 # Dedicated standalone resume page (PDF + HTML sheet)
├── resume.pdf                  # Canonical candidate resume PDF (swappable anytime)
├── Diwakar_Jha_Resume.pdf      # Original backup resume PDF
├── server.js                   # Zero-dependency production HTTP server (Render-ready)
├── package.json                # Project & deployment configuration
├── render.yaml                 # Render Infrastructure-as-Code blueprint
├── .gitignore                  # Git ignore rules
├── css/
│   └── style.css               # Clean executive design system with scroll-reveal & smooth UI
└── js/
    ├── data.js                 # Structured candidate data, benchmarks & metrics
    ├── terminal.js             # Developer CLI console emulator
    └── main.js                 # Theme engine, scroll reveal, scroll spy & controller
```
