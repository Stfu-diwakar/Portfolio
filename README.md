# Diwakar Jha | AI & Machine Learning Developer

<p align="center">
  <strong>Building practical AI, machine learning, and full-stack solutions.</strong><br/>
  MCA (AI & ML) student at Chandigarh University · Aspiring ML Engineer
</p>

<p align="center">
  <a href="https://github.com/Stfu-diwakar"><img src="https://img.shields.io/badge/GitHub-Explore%20Projects-181717?style=for-the-badge&logo=github" alt="GitHub"/></a>
  <a href="https://energy-consumption-forecasting-cna1.onrender.com/"><img src="https://img.shields.io/badge/Live%20Demo-Energy%20Forecasting-0F9D58?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Energy Forecasting live demo"/></a>
  <a href="mailto:"><img src="https://img.shields.io/badge/Contact-Get%20in%20Touch-4A6CF7?style=for-the-badge&logo=gmail&logoColor=white" alt="Contact"/></a>
</p>

---

## About

I’m **Diwakar Jha**, an AI & Machine Learning postgraduate student focused on building useful, explainable, and deployable software. My work spans machine learning, NLP, computer vision, generative AI, data applications, and full-stack development.

This portfolio brings together selected projects, engineering experiments, experience, skills, and a downloadable resume. It is designed to help recruiters, collaborators, and fellow developers quickly understand what I build and how I approach technical problems.

## At a Glance

| Focus | Highlights |
|---|---|
| Education | MCA in Artificial Intelligence & Machine Learning, Chandigarh University |
| Core interests | Machine Learning, NLP, Generative AI, Computer Vision |
| Development | Python, Streamlit, Flask, FastAPI, JavaScript |
| Model evaluation | Smart Home Energy Forecasting: reported XGBoost R² of **0.9870** |
| Community | GeeksforGeeks Campus Mantri, Chandigarh University |
| Open source | Projects and experiments across AI/ML and software development |

---

## Featured Projects

A selection of projects demonstrating applied machine learning, software engineering, and problem-solving.

### 1. Smart Home Energy Consumption Forecasting & Optimization AI

A time-series forecasting and energy optimization project that compares statistical and machine learning approaches to predict household energy consumption.

- Models: ARIMA, XGBoost, and LSTM.
- Data: 8,760 hourly observations.
- Reported XGBoost performance: **R² = 0.9870**.
- Includes forecasting visualizations and peak-demand optimization concepts.
- **[Open live demo](https://energy-consumption-forecasting-cna1.onrender.com/)**

### 2. Election Process Education Assistant

A civic-education application designed to make election-related information easier to understand.

- Natural-language question answering powered by Google Gemini.
- Containerized application architecture.
- Focus on accessible civic information and guided learning.

### 3. CNN Image Classifier

A computer-vision project that classifies images using a convolutional neural network.

- Conv2D and MaxPooling2D layers.
- Dropout regularization.
- Streamlit interface with prediction confidence visualization.

### 4. PIC CHECKER — AI Media Forensics

A media-inspection tool that extracts image metadata to help identify clues about how an image may have been created.

- FastAPI-based REST service.
- EXIF and PNG metadata inspection.
- Detects available metadata associated with tools such as Stable Diffusion and Midjourney.

### 5. !-SPAM — Spam & Phishing Detection

A text-classification project for identifying potentially unwanted or malicious messages.

- NLP preprocessing and TF-IDF feature extraction.
- Machine learning classification pipeline.
- Reported model accuracy: **98.4%** on the project's evaluation data.

### 6. Real-Time Stock Market Dashboard

A financial-data visualization application built to explore market movement and technical indicators.

- Streamlit and Plotly dashboard.
- Market data retrieval with yfinance.
- Candlestick charts and technical indicators.

### 7. Autonomous Mobile Robot Route Optimization

A pathfinding project comparing search strategies in a dynamic 2D grid environment.

- A* with Manhattan and Euclidean heuristics.
- Breadth-First Search baseline.
- Obstacle-aware route exploration.

### 8. Smart Venue & Stadium Operations Assistant

A concept application for visualizing venue operations and exploring crowd-flow insights.

- Folium-based spatial visualizations.
- Queue-latency prediction concepts.
- Firebase synchronization.

---

## Experience & Community

My experience includes internships and practical learning across AI/ML, Generative AI, and business intelligence, along with student-community involvement.

- **GeeksforGeeks Campus Mantri** — Chandigarh University (January 2026 – June 2026).
- **Internship experience** — AI/ML, Generative AI, and Business Intelligence roles and training with organizations including TBI-GEU, Codec Technologies, DecodeLabs, and Enginow.

For role-specific responsibilities, outcomes, and dates, please refer to the experience section of the portfolio and my resume.

---

## Technical Skills

| Area | Tools & Technologies |
|---|---|
| Programming | Python, SQL, C++, JavaScript |
| Machine Learning | Scikit-learn, XGBoost, TensorFlow / Keras |
| NLP & Generative AI | Sentence Transformers, spaCy, TF-IDF, LLM APIs |
| Computer Vision | CNNs, image processing, metadata analysis |
| Web & APIs | Streamlit, Flask, FastAPI, HTML, CSS |
| Data & Visualization | NumPy, Pandas, Plotly, Matplotlib |
| Databases & Tools | SQLite, Firebase, Git, GitHub, Docker |

---

## Portfolio Features

- **Project showcase** — selected AI/ML and software projects with technical context.
- **Developer terminal** — an interactive command-line-style interface with commands such as `summary`, `projects`, `skills`, `benchmarks`, `resume`, and `contact`.
- **Dedicated resume page** — standalone resume view with PDF display, download, and print support.
- **Responsive interface** — layouts designed for desktop and mobile screens.
- **Theme switching** — dark and light appearance options.
- **Motion details** — scroll reveals, navigation tracking, and subtle card interactions.

## Resume

The repository includes a dedicated `resume.html` page and a PDF resume.

To update the resume:

1. Export the latest resume as a PDF.
2. Name the file `resume.pdf`.
3. Replace the existing `resume.pdf` in the repository root.
4. Commit and push the change.

The portfolio's resume page and download links are configured to use this file. Keep the filename unchanged so existing links continue to work.

---

## Run Locally

### Requirements

- Node.js and npm (for the Node server), or Python (for the simple static server).

### Option 1: Node.js

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

### Option 2: Python

From the repository root, run:

```bash
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

---

## Deployment

This repository includes Render configuration files.

### Render Static Site

1. Push the repository to GitHub.
2. In the [Render Dashboard](https://dashboard.render.com/), choose **New → Static Site**.
3. Connect this repository and select the `main` branch.
4. Set the publish directory to `.`.
5. Leave the build command empty if the site is plain static HTML/CSS/JS.
6. Deploy the site.

### Render Web Service

If deploying with the included Node server:

1. Create a new **Web Service** in Render and connect the repository.
2. Select the Node runtime.
3. Use `npm install` as the build command.
4. Use `npm start` as the start command.
5. Deploy and verify the health-check endpoint if configured.

Choose the deployment type that matches the repository's current configuration.

---

## Repository Structure

```text
.
├── index.html                  # Main portfolio page
├── resume.html                 # Standalone resume page
├── resume.pdf                  # Current resume PDF
├── Diwakar_Jha_Resume.pdf      # Backup resume PDF
├── server.js                   # Node.js HTTP server
├── package.json                # Node project configuration
├── render.yaml                 # Render deployment blueprint
├── css/
│   └── style.css               # Portfolio styles
└── js/
    ├── data.js                 # Portfolio content and metrics
    ├── terminal.js             # Interactive terminal
    └── main.js                 # UI behavior and interactions
```

---

## Connect

I’m interested in opportunities and collaborations involving **AI/ML, NLP, Generative AI, and software development**.

<p align="center">
  <a href="https://www.linkedin.com/in/diwakar-jha-064130229/"><img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>
  <a href="https://github.com/Stfu-diwakar"><img src="https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
</p>

<p align="center">
  <strong>Thanks for visiting!</strong><br/>
  <sub>Built with curiosity, continuous learning, and a passion for applied AI.</sub>
</p>
