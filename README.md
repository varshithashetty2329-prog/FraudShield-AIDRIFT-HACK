# FraudShield-AIDRIFT-HACK
AI-powered fraud prevention for first-time digital users in rural India
# FraudShield 🛡️
### AI-Powered Fraud Prevention for First-Time Digital Users

> Built at **AI DRIFT — 6HR Hackathon** | SIT Mangaluru | 29 May 2026  
> Organized by Department of Artificial Intelligence & Machine Learning (AIML)

---

## Problem Statement
First-time digital users in rural India — farmers, daily-wage workers, and elderly citizens — are prime targets for UPI scams, phishing links, fake government scheme messages, and fraudulent QR codes. They lack the digital literacy to identify threats in real time.

---

## Our Solution
**FraudShield** is a bilingual (English + Kannada) AI-powered web app that acts as a real-time fraud guardian for new digital users.

---

## Features
- **UPI / Payment Risk Analyzer** — Paste a UPI ID or phone number and get an instant AI risk score (0–100) with a color-coded verdict
- **Message & Link Phishing Detector** — Paste any WhatsApp message or URL; AI detects scam patterns, fake govt scheme claims, and urgency tactics
- **Behavioral Safety Nudge** — Warns users before high-value transactions with simple, friendly confirmation prompts
- **Bilingual Alerts** — All warnings available in English and Kannada for rural accessibility

---

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React 18 |
| Backend | Python Flask |
| AI Engine | Claude API (claude-sonnet-4-20250514) |
| Styling | Tailwind CSS |
| Icons | Lucide React |

---

## Setup & Installation

### Prerequisites
- Node.js 18+
- Python 3.9+
- Anthropic API key

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
pip install flask anthropic flask-cors
python app.py
```

### Environment Variables
Create a `.env` file in the backend folder:
```
ANTHROPIC_API_KEY=your_api_key_here
```

---

## Demo Scenarios

| Input | Expected Result |
|---|---|
| UPI: `pmkisan-relief@ybl` | 🔴 DANGER — Fake govt scheme impersonation |
| Message: "Send ₹500 processing fee to claim PM Awas Yojana" | 🔴 DANGER — Phishing detected |
| UPI: `merchant@icici` | 🟢 SAFE — Standard registered merchant |
| Transaction ₹8,000 to unknown UPI | 🟡 NUDGE — Verify before sending |

---

## Social Impact
- Targets **400M+ first-time digital users** in rural India
- Bilingual support for **Kannada-speaking communities** in Karnataka
- Designed for users with **low digital literacy** — no technical jargon, icon-first UI
- Fully **defensive** — no offensive cybersecurity tools used

---



