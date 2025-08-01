# BlindHire – Bias-Free Skills-First Hiring Platform

> **Mission:** Eliminate hiring bias by enabling companies to assess candidates purely on verified skill performance—no names, no photos, no degrees, no locations… until the final selection stage.

## Project Overview

BlindHire is a full-stack web application that transforms traditional hiring into a fair, inclusive, and meritocratic process. By anonymizing candidate profiles and emphasizing verified skill tests, BlindHire helps recruiters focus solely on what truly matters: **skills and performance**.

## Problem Statement

Traditional hiring is riddled with unconscious bias based on:
- Names
- Gender
- Educational background
- Geographic location
- Appearance

This leads to unfair rejections, especially for:
- Candidates from rural or remote areas
- Students from non-tier colleges
- Underrepresented groups in the workforce

### Our Solution

BlindHire offers a **skills-first, anonymous hiring platform**, where:
- Recruiters only see performance metrics and skill demos.
- Candidate identity (name, gender, photo, location, etc.) is revealed **only after shortlisting**.
- All assessments are **verified and trackable**, promoting trust and accountability.

---

## Tech Stack

### Frontend
- HTML5
- CSS3 (with glassmorphism and modern UI/UX)
- JavaScript (Vanilla JS)

### Backend
- Node.js
- Express.js

### Database
- MongoDB

---

## Features

### For Candidates:
- Anonymous sign up (system-generated candidate ID)
- Submit skill assessments, coding tests, and project demos
- Build a blind profile with skills, scores, and feedback
- Track progress and feedback without revealing personal details
- View test stats and application progress in a glassy, high-contrast dashboard

### For Employers:
- Post job roles with skill-based assessment criteria
- View anonymized candidate dashboards (no name, no gender, no college)
- Shortlist based solely on performance and verified skills
- Reveal candidate identity **only after final selection**
- Manage jobs, applications, and candidate pipelines

### Admin Panel:
- Manage job posts, candidate assessment pipelines, and reports

### Bias-Reduction Mechanisms:
- Anonymous skill submissions and job applications
- Skills-based evaluation (scoring, feedback, reveal system)
- Employers cannot see candidate identity until after evaluation
- Structured assessment and reveal workflow

---

## Folder Structure (Key)

```
BlindHire/
│
├── client/                # Frontend (HTML/CSS/JS)
│   ├── index.html         # Landing page
│   ├── employer.html      # Employer dashboard
│   ├── candidate.html     # Candidate dashboard
│   ├── admin.html         # Admin panel
│   ├── styles/
│   │   └── main.css       # Main styles (glassy UI, contrast, etc.)
│   ├── scripts/
│   │   ├── main.js
│   │   ├── employer.js
│   │   ├── candidate.js
│   │   └── ...
│   └── ... (other HTML pages)
│
├── server/                # Backend (Node.js/Express)
│   ├── app.js             # Entry point
│   ├── routes/            # API endpoints
│   ├── controllers/       # Business logic
│   ├── models/            # Mongoose models
│   └── middleware/        # Auth, validation, etc.
│
├── data/                  # Sample data, test data
├── config/                # DB and environment config
├── .env                   # Environment variables
├── package.json           # Project dependencies
├── README.md              # Project documentation
└── ...
```

---

## Setup & Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/blindhire.git
   cd blindhire
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment:**
   - Copy `.env.example` to `.env` and set your MongoDB URI and other secrets.
4. **Start the server:**
   ```bash
   npm start
   ```
5. **Open the app:**
   - Frontend: Open `client/index.html` in your browser for the landing page.
   - Dashboards: Use `/candidate.html` or `/employer.html` for respective dashboards.

---

## UI/UX Highlights
- Glassmorphism (glassy backgrounds, blur, and bright contrast)
- High-contrast, accessible text and badges
- Responsive design for all devices
- Modern, clean, and bias-free interface

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
[MIT](LICENSE)