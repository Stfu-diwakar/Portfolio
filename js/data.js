// =============================================================================
// DIWAKAR JHA - PROFESSIONAL PORTFOLIO DATA ARCHITECTURE
// Structured for Engineering Recruiters, Technical Leads & Hiring Managers
// =============================================================================

const PORTFOLIO_DATA = {
  profile: {
    name: "Diwakar Jha",
    title: "Machine Learning Engineer · AI Systems Developer",
    subtitle: "MCA (Artificial Intelligence & Machine Learning) Candidate @ Chandigarh University | GeeksforGeeks Campus Mantri",
    headline: "Building high-performance machine learning pipelines, time-series forecasting architectures, and autonomous generative AI systems.",
    summary: "Motivated Master of Computer Applications (AI & ML) student with proven practical experience across 4 technical internships in Machine Learning, Generative AI, and Business Intelligence. Skilled in developing scalable software solutions, training high-accuracy predictive models (XGBoost R² = 0.9870), integrating modern LLM APIs, and architecting robust backend automation pipelines. Strong foundation in software engineering fundamentals, object-oriented programming, data structures, and statistical rigor.",
    location: "Kharar, Punjab, India (Open to Relocation & Remote)",
    email: "diwakarjha42037@gmail.com",
    phone: "+91 8102617280",
    linkedin: "https://www.linkedin.com/in/diwakar-jha-064130229",
    github: "https://github.com/Stfu-diwakar",
    resumePdf: "resume.pdf",
    resumeUrl: "resume.html",
    metrics: [
      { label: "Top Model Accuracy", value: "0.9870 R²", desc: "XGBoost Smart Home Load Forecasting" },
      { label: "Industry Internships", value: "4 Roles", desc: "ML, GenAI, and Data Analytics" },
      { label: "Technical Leadership", value: "6 Months", desc: "GeeksforGeeks Campus Mantri @ CU" },
      { label: "Open Source Codebases", value: "18+ Repos", desc: "Python, C++, Streamlit & Flask" }
    ]
  },

  caseStudies: [
    {
      id: "energy-forecasting-ai",
      title: "Smart Home Energy Consumption Forecasting & Optimization AI",
      tagline: "End-to-End Time-Series ML & Deep Learning Pipeline with Intelligent HEMS Peak Shaving",
      category: "Machine Learning / Systems",
      featured: true,
      badge: "Flagship Research Project",
      github: "https://github.com/Stfu-diwakar/Energy-Consumption-Forecasting-Optimization-AI",
      liveUrl: null,
      problem: "Traditional residential energy grids suffer from severe peak-hour demand stress and high consumer utility costs under dynamic Time-of-Use (ToU) tariffs. Accurately forecasting non-linear, multi-appliance household load and automatically scheduling high-draw appliances without manual intervention is critical.",
      solution: "Engineered an end-to-end time-series forecasting and Home Energy Management System (HEMS). Synthesized 8,760 hourly telemetry observations correlating weather cooling/heating degree hours with sub-metered appliances (HVAC, EV Charger, Solar PV, Battery BESS). Built an automated multi-model pipeline comparing ARIMA, XGBoost, and Keras Stacked LSTM Networks, coupled with an automated peak load shifting algorithm.",
      benchmarks: [
        { model: "XGBoost Regressor", rmse: "0.4292 kW", mae: "0.3065 kW", mape: "5.69%", r2: "0.9870", status: "Top Performer 🌟" },
        { model: "Keras Stacked LSTM", rmse: "1.2140 kW", mae: "0.8947 kW", mape: "19.39%", r2: "0.8962", status: "Sequence Capture ⚡" },
        { model: "ARIMA Baseline", rmse: "3.8148 kW", mae: "3.1597 kW", mape: "79.03%", r2: "-0.0262", status: "Linear Benchmark 📊" }
      ],
      impact: [
        "Achieved a 0.9870 R² score and 5.69% MAPE with gradient-boosted decision trees over non-linear lag and weather interactions.",
        "Automated EV charger load shifting from on-peak ($0.32/kWh) to off-peak ($0.10/kWh), reducing peak grid draw by 30% to 50%.",
        "Solar PV self-consumption paired with battery energy storage (BESS) achieved an estimated 25% to 45% reduction in total electricity costs.",
        "Deployed an interactive Flask REST API dashboard with real-time Chart.js visual telemetry and custom CSV batch inference."
      ],
      stack: ["Python", "XGBoost", "Keras / TensorFlow", "ARIMA", "Flask", "Pandas", "NumPy", "Scikit-Learn", "Chart.js"]
    },
    {
      id: "election-process-assistant",
      title: "Election Process Education Assistant & Civic AI Platform",
      tagline: "AI-Powered Civic Platform Architecture Containerized with Docker & Gemini 2.5 Flash",
      category: "Generative AI & Cloud",
      featured: true,
      badge: "Civic AI Platform",
      github: "https://github.com/Stfu-diwakar/Election_process_edu",
      liveUrl: null,
      problem: "Understanding complex civic procedures, voter registration requirements, and electoral certifications is intimidating and confusing for first-time and regional voters, with fragmented educational information.",
      solution: "Architected a full-stack civic education platform powered by Google Gemini 2.5 Flash and Flask, containerized with Docker and configured for cloud deployment. Features an interactive democratic lifecycle timeline and an intelligent natural language civics assistant.",
      impact: [
        "Architected containerized microservice with Docker and lightweight Flask REST endpoints with sub-second API round-trips.",
        "Implemented real-time prompt-engineered conversational agent utilizing Gemini 2.5 Flash for neutral, factual voter guidance.",
        "Engineered full responsive UI with accessible mobile layout and automated containerized CI/CD workflow."
      ],
      stack: ["Python", "Flask", "Google Gemini 2.5 Flash", "Docker", "JavaScript", "HTML5/CSS3"]
    },
    {
      id: "image-classification-cnn",
      title: "Convolutional Neural Network (CNN) Image Classifier",
      tagline: "Deep Learning Computer Vision Architecture with Real-Time Inference Stream",
      category: "Computer Vision & Deep Learning",
      featured: true,
      badge: "Deep Learning",
      github: "https://github.com/Stfu-diwakar/Image_Classification_CNN",
      liveUrl: null,
      problem: "Visual binary classification under varying lighting, background occlusion, and object orientations requires convolutional feature representation with spatial invariance.",
      solution: "Engineered an end-to-end deep learning pipeline training a Convolutional Neural Network (CNN) in TensorFlow/Keras. Includes multi-stage Conv2D and MaxPooling2D layers, dropout regularization to prevent overfitting, image augmentation, and an interactive Streamlit UI with live confidence calibration meters.",
      impact: [
        "Trained high-accuracy binary classification model with normalized 150x150 input tensor preprocessing.",
        "Integrated interactive Streamlit web dashboard providing instant image upload, probability distribution, and visual progress gauges.",
        "Modularized architecture separating model checkpoints, training notebooks, and serving layers for rapid deployment."
      ],
      stack: ["Python", "TensorFlow", "Keras", "Convolutional Neural Networks", "Streamlit", "NumPy", "Pillow"]
    },
    {
      id: "pic-checker-forensics",
      title: "PIC CHECKER — AI Media Forensics & Deepfake Detection Engine",
      tagline: "FastAPI REST Microservice for Synthetic Image Signature & EXIF Chunk Analysis",
      category: "AI Safety & Forensics",
      featured: true,
      badge: "FastAPI Microservice",
      github: "https://github.com/Stfu-diwakar/PIC_CHECKER",
      liveUrl: null,
      problem: "The rapid proliferation of hyper-realistic generative images (Stable Diffusion, Midjourney, Niji Journey) creates urgent verification challenges for digital trust, disinformation defense, and media integrity.",
      solution: "Developed an asynchronous FastAPI REST microservice that performs dual-tier forensic inspection: automated extraction and decoding of metadata parameter tags (step counts, software signatures) paired with visual artifact heuristic scoring to calculate synthetic media probability.",
      impact: [
        "Engineered sub-50ms REST API endpoints accepting arbitrary multi-format image uploads via Uvicorn.",
        "Implemented metadata pattern recognition targeting Stable Diffusion generation parameters and Midjourney markers.",
        "Configured robust CORS security and structured JSON payload reporting with explainable reasoning tags."
      ],
      stack: ["Python", "FastAPI", "Uvicorn", "Image Forensics", "Metadata Analysis", "REST API", "Pillow"]
    },
    {
      id: "spam-nlp-classifier",
      title: "!-SPAM — Machine Learning Threat & Phishing Detection System",
      tagline: "High-Throughput Linguistic Feature Extraction & Text Classification Pipeline",
      category: "Natural Language Processing",
      featured: false,
      badge: "NLP Classification",
      github: "https://github.com/Stfu-diwakar/Spam_or_ham",
      liveUrl: null,
      problem: "Communication vectors are vulnerable to deceptive spam and phishing attacks, requiring low-latency NLP inference with balanced precision-recall to protect enterprise communications without blocking legitimate mail.",
      solution: "Constructed a high-throughput NLP classification engine utilizing TF-IDF vectorization and Scikit-Learn classifiers. Features custom token extraction, uppercase-to-lowercase ratio calculations, punctuation density markers, and a responsive dark-mode Streamlit dashboard with confidence meters.",
      impact: [
        "Achieved 98.4% classification accuracy across multi-thousand SMS/email test datasets.",
        "Ultra-low latency inference (< 15ms) suitable for real-time edge or serverless deployment.",
        "Engineered an interactive Streamlit UI with instant visual verdict cards and confidence progress telemetry."
      ],
      stack: ["Python", "Scikit-Learn", "TF-IDF Vectorization", "NLP", "Pandas", "NumPy", "Streamlit"]
    },
    {
      id: "stock-analytics-dashboard",
      title: "Real-Time Stock Market Telemetry & Technical Volatility Dashboard",
      tagline: "High-Frequency Financial Data Stream with Interactive Candlestick Telemetry",
      category: "Financial Analytics",
      featured: false,
      badge: "Financial Tech",
      github: "https://github.com/Stfu-diwakar/Stock_dashboard_live",
      liveUrl: null,
      problem: "Retail traders and quantitative analysts require low-latency financial telemetry visualization with dynamic technical indicator overlays (SMA, EMA, RSI) without heavyweight subscription software.",
      solution: "Engineered a live interactive financial analytics dashboard leveraging Streamlit, Plotly, and yfinance. Features real-time stock ticker streams, multi-asset comparative overlays (AAPL, MSFT, GOOG, META, TSLA), adjustable auto-refresh intervals (5–60s), and technical indicator calculations.",
      impact: [
        "Rendered high-frequency interactive candlestick and moving-average charts with sub-second recalculation.",
        "Implemented multi-timeframe historical volatility and risk-adjusted return calculations.",
        "Designed a glassmorphic responsive UI with dark/light mode toggle for high-readability market analysis."
      ],
      stack: ["Python", "Streamlit", "Plotly", "yfinance", "Pandas", "Technical Analysis"]
    },
    {
      id: "autonomous-robot-pathfinder",
      title: "Autonomous Mobile Robot Dynamic Path Planning & Route Optimization",
      tagline: "Heuristic Grid Search Architecture Comparing A* (Manhattan/Euclidean) vs. BFS",
      category: "Robotics & Algorithms",
      featured: false,
      badge: "Path Planning AI",
      github: "https://github.com/Stfu-diwakar",
      liveUrl: null,
      problem: "Automated Guided Vehicles (AGVs) in dynamic warehouse environments require computationally optimal collision-free path finding while minimizing runtime overhead and node expansions.",
      solution: "Architected a modular simulation environment evaluating Breadth-First Search (BFS) against A* Heuristic Search using Manhattan and Euclidean distance heuristics over non-convex obstacle fields. Features real-time step visualization, node traversal counters, and animated robot trajectory execution.",
      impact: [
        "Reduced node expansion overhead by over 65% comparing A* with Manhattan heuristic against standard BFS.",
        "Implemented guaranteed shortest-path mathematical proofs with obstacle density stress testing up to 35%.",
        "Generated animated Matplotlib visual playback depicting path exploration and kinematic trajectory execution."
      ],
      stack: ["Python", "A* Algorithm", "Breadth-First Search", "Graph Theory", "Heuristic Optimization", "Matplotlib", "NumPy"]
    },
    {
      id: "smart-venue-assistant",
      title: "Smart Venue & Stadium Operations Assistant",
      tagline: "Spatial Navigation, Crowd Density Estimation & Queue Optimization System",
      category: "IoT & Spatial Analytics",
      featured: false,
      badge: "Spatial Intelligence",
      github: "https://github.com/Stfu-diwakar",
      liveUrl: null,
      problem: "Major sports stadiums and convention venues suffer from severe crowd congestion, unmanaged entrance gate queues, and lack of real-time directional guidance for attendees.",
      solution: "Engineered an integrated spatial analytics system combining Folium interactive maps, wait-time prediction algorithms, Firebase real-time database synchronization, and an AI-powered conversational assistant to optimize attendee routing.",
      impact: [
        "Built predictive queue latency model optimizing attendee gate distribution across active stadium gates.",
        "Integrated interactive Folium spatial mapping with dynamic crowd density heatmaps.",
        "Coupled real-time Firebase backend streams with intuitive Streamlit command-and-control dashboard."
      ],
      stack: ["Python", "Streamlit", "Folium", "Firebase", "Plotly", "Queue Analytics", "Spatial AI"]
    }
  ],

  experience: [
    {
      role: "AI-Enabled Business Intelligence Intern",
      company: "TBI GEU",
      period: "June 2026 – July 2026",
      duration: "2 mos",
      location: "India (Hybrid)",
      type: "Internship",
      highlights: [
        "Evaluated multi-dimensional datasets, trend charts, and quantitative claims to drive data-informed decision making across operational business units.",
        "Verified mathematical calculations and assessed statistical validity across reports, systematically eliminating conceptual errors in data interpretation.",
        "Conducted quantitative logic reviews and automated summarization workflows, annotating statistical discrepancies before executive report sign-off."
      ],
      skills: ["Data Analytics", "Quantitative Logic", "Business Intelligence", "Python", "Data Validation"]
    },
    {
      role: "GeeksforGeeks Campus Mantri (Campus Ambassador)",
      company: "GeeksforGeeks @ Chandigarh University",
      period: "January 2026 – June 2026",
      duration: "6 mos",
      location: "Punjab, India",
      type: "Leadership & Community",
      highlights: [
        "Appointed as official campus ambassador representing GeeksforGeeks across Chandigarh University's engineering student body.",
        "Spearheaded technical learning initiatives, orchestrating university-wide coding contests, workshops, and algorithmic problem-solving cohorts.",
        "Served as key liaison connecting university students with GeeksforGeeks development resources, expanding active community participation by over 40%."
      ],
      skills: ["Technical Leadership", "Community Outreach", "Event Management", "Algorithmic Mentorship"]
    },
    {
      role: "Artificial Intelligence Intern",
      company: "Codec Technologies India",
      period: "March 2026 – April 2026",
      duration: "2 mos",
      location: "Remote / India",
      type: "Internship",
      highlights: [
        "Developed Python-based artificial intelligence modules to resolve real-world enterprise workflow challenges.",
        "Built automated end-to-end data preprocessing, feature normalization, and cleaning pipelines for multi-source data ingestion.",
        "Applied supervised machine learning algorithms using Scikit-Learn and Pandas, participating in agile sprint reviews and collaborative Git workflows."
      ],
      skills: ["Python", "Machine Learning", "Scikit-Learn", "Data Preprocessing", "Git Collaboration"]
    },
    {
      role: "Generative AI Intern",
      company: "DecodeLabs",
      period: "February 2026 – March 2026",
      duration: "2 mos",
      location: "Virtual / India",
      type: "Internship",
      highlights: [
        "Designed and implemented automated generative workflows leveraging modern LLM APIs and prompt engineering methodologies.",
        "Developed backend service logic for AI-assisted content synthesis and automated information extraction applications.",
        "Integrated REST API automation to streamline data transformations, significantly accelerating multi-step internal engineering workflows."
      ],
      skills: ["Generative AI", "LLM APIs", "Prompt Engineering", "REST APIs", "Python"]
    },
    {
      role: "Artificial Intelligence & Machine Learning Intern",
      company: "Enginow",
      period: "January 2026 – February 2026",
      duration: "2 mos",
      location: "Remote / India",
      type: "Internship",
      highlights: [
        "Constructed and tuned predictive machine learning models using Python, Scikit-Learn, and scientific computing packages.",
        "Conducted thorough data preprocessing, exploratory data analysis (EDA), and iterative feature engineering.",
        "Validated analytical assumptions by checking p-values, confidence intervals, and regression residuals, ensuring statistical integrity."
      ],
      skills: ["Machine Learning", "Statistical Modeling", "Feature Engineering", "Scikit-Learn", "Model Evaluation"]
    }
  ],

  skillsMatrix: [
    {
      category: "Machine Learning & AI",
      icon: "bi-cpu-fill",
      skills: [
        { name: "Supervised & Unsupervised Learning", level: "Advanced", keywords: "Classification, Regression, Clustering, Scikit-Learn" },
        { name: "Time-Series Forecasting", level: "Expert", keywords: "XGBoost, Keras Stacked LSTM, ARIMA, SARIMAX" },
        { name: "Natural Language Processing (NLP)", level: "Advanced", keywords: "TF-IDF Vectorization, Text Processing, Sentiment, Spam" },
        { name: "Generative AI & LLM Integration", level: "Advanced", keywords: "Gemini API, Anthropic Claude, Prompt Optimization, Agentic Workflows" },
        { name: "Data Manipulation & Feature Engineering", level: "Expert", keywords: "Pandas, NumPy, Rolling Stats, Lag Features, Scaling" }
      ]
    },
    {
      category: "Programming & Core Engineering",
      icon: "bi-code-slash",
      skills: [
        { name: "Python (Core Language)", level: "Expert", keywords: "Scientific computing, backend scripting, automation, OOP" },
        { name: "C++ & C", level: "Proficient", keywords: "Object-Oriented Programming, Memory Management, Algorithms" },
        { name: "Java", level: "Intermediate", keywords: "Foundational OOP, Data Structures, Core Java" },
        { name: "JavaScript (ES6+)", level: "Proficient", keywords: "Modern frontend DOM, asynchronous routines, client logic" },
        { name: "Data Structures & Algorithms", level: "Advanced", keywords: "Searching, Sorting, Hash Maps, Trees, Dynamic Programming" }
      ]
    },
    {
      category: "Backend, Cloud & Databases",
      icon: "bi-server",
      skills: [
        { name: "REST API Architecture", level: "Advanced", keywords: "Flask, RESTful endpoints, API integration, JSON pipelines" },
        { name: "Interactive Web UI & Dashboards", level: "Expert", keywords: "Streamlit, Bootstrap 5, HTML5, CSS3 Glassmorphism" },
        { name: "Relational & NoSQL Databases", level: "Proficient", keywords: "PostgreSQL, MySQL, MongoDB, Complex Queries" },
        { name: "Cloud & Developer Tooling", level: "Advanced", keywords: "Google Cloud Platform (GCP), Git, GitHub, VS Code, Colab" },
        { name: "Workflow Automation", level: "Advanced", keywords: "Make.com, Webhooks, Cron Schedules, API Pipelines" }
      ]
    },
    {
      category: "Quantitative Logic & Analytics",
      icon: "bi-graph-up",
      skills: [
        { name: "Statistical Modeling & Inference", level: "Advanced", keywords: "Hypothesis Testing, Causal Inference, Regression Diagnostics" },
        { name: "Data Visualization & Storytelling", level: "Advanced", keywords: "Matplotlib, Plotly, Chart.js, KPI Dashboards" },
        { name: "Model Evaluation & Benchmarking", level: "Expert", keywords: "RMSE, MAE, MAPE, R², Cross-Validation, Overfitting Control" }
      ]
    }
  ],

  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      specialization: "Artificial Intelligence & Machine Learning",
      institution: "Chandigarh University",
      location: "Punjab, India",
      period: "2025 – 2027 (Expected)",
      status: "Currently Enrolled · In Progress",
      description: "Rigorous graduate coursework emphasizing Deep Learning, Advanced Machine Learning, Natural Language Processing, Statistical Computing, and Big Data Architecture."
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      specialization: "Computer Science",
      institution: "T. M. Bhagalpur University (T.M.B.U.)",
      location: "Bihar, India",
      period: "2021 – 2024",
      status: "Graduated with Honors",
      description: "Comprehensive foundational studies in Object-Oriented Software Development (C++, Java), Relational Database Management Systems (SQL), Operating Systems, and Discrete Mathematics."
    }
  ],

  certifications: [
    {
      title: "Tata GenAI Powered Data Analytics",
      issuer: "Tata Group & Forage",
      year: "2026",
      desc: "Applied Generative AI and predictive modeling to corporate data workflows and business optimization."
    },
    {
      title: "Deloitte Australia - Technology Job Simulation",
      issuer: "Deloitte & Forage",
      year: "2026",
      desc: "Completed enterprise technology consulting simulation in system architecture and client solutions."
    },
    {
      title: "Mastering Machine Learning: From Beginner to Expert",
      issuer: "Professional AI Specialization",
      year: "2026",
      desc: "Supervised learning, deep neural networks, hyperparameter optimization, and gradient boosting."
    },
    {
      title: "Certificate of Participation – GCET Hackathon",
      issuer: "Galgotias CET Hackathon",
      year: "2026",
      desc: "Competed in high-intensity software hackathon engineering practical solutions under sprint deadlines."
    },
    {
      title: "Certificate of Participation – Tata Crucible Campus Quiz",
      issuer: "Tata Group",
      year: "2025",
      desc: "National campus knowledge competition testing technological innovation and business acumen."
    },
    {
      title: "Foundations of Project Management",
      issuer: "Professional Certification",
      year: "2025",
      desc: "Agile methodologies, sprint cycles, cross-functional coordination, and documentation integrity."
    },
    {
      title: "CS105: Introduction to Python",
      issuer: "Computer Science Curriculum",
      year: "2025",
      desc: "Core algorithms, data structures, and functional programming paradigms in Python."
    },
    {
      title: "Social Intelligence in the Age of AI",
      issuer: "AI Ethics & Dynamics",
      year: "2025",
      desc: "Human-AI collaboration paradigms, ethical modeling, and conversational ergonomics."
    }
  ]
};

// Expose globally for vanilla browser context
window.PORTFOLIO_DATA = PORTFOLIO_DATA;
