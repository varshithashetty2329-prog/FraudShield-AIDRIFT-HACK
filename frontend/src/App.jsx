import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  MessageSquare, 
  Smartphone, 
  Volume2, 
  VolumeX, 
  QrCode, 
  KeyRound, 
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  AlertOctagon,
  LifeBuoy
} from 'lucide-react';

const TRANSLATIONS = {
  en: {
    title: "FraudShield 🛡️",
    subtitle: "AI-Powered Fraud Prevention for Rural India",
    tagline: "Your digital safety shield. Simple warnings in plain language. No complicated terms.",
    langSwitch: "ಕನ್ನಡದಲ್ಲಿ ಓದಿ (ಕನ್ನಡ)",
    tabs: {
      upi: "🔍 UPI / Phone Check",
      qr: "📷 QR Code Scanner",
      phishing: "✉️ WhatsApp Scan",
      otp: "🔑 OTP Scam Detector",
      loan: "💸 Fake Loan Checker",
      simulator: "📱 Safe Pay Simulator"
    },
    upi: {
      title: "UPI / Phone Risk Analyzer",
      description: "Before sending money to someone new, paste their UPI ID or Mobile Number here to check if they are safe.",
      inputPlaceholder: "Enter UPI ID or 10-digit Phone Number",
      btnCheck: "Check Safety Now",
      checking: "Checking safety...",
      riskScore: "Scam Risk Score",
      examples: "Quick Example Tests:",
      verdicts: {
        safe: "🟢 SAFE ACCOUNT (Very Low Risk)",
        caution: "🟡 CAUTION REQUIRED (Medium Risk)",
        danger: "🔴 EXTREME DANGER (High Scam Risk)"
      },
      warningTitle: "Why this is flagged:",
      audioBtn: "🔊 Listen to Warning (Audio)",
      audioStop: "⏹️ Stop Audio"
    },
    qr: {
      title: "QR Code Safety Scanner",
      description: "Did someone send you a QR code on WhatsApp or print it on a poster? Paste its link text OR upload the image to verify.",
      inputPlaceholder: "Paste the QR code link here...",
      uploadLabel: "Drop QR code image here or Click to upload",
      checking: "Reading QR code...",
      examples: "Try these examples:",
      btnCheck: "Scan QR Code"
    },
    phishing: {
      title: "WhatsApp Message & Link Detector",
      description: "Did you receive a suspicious WhatsApp message promising government money? Paste it here to scan for scams.",
      inputPlaceholder: "Paste the message or link here...",
      btnCheck: "Scan Message Now",
      scanning: "Scanning message...",
      nextStep: "What you must do next (Safe Advice):",
      audioBtn: "🔊 Listen to Advice (Audio)"
    },
    otp: {
      title: "OTP / Password Scam Detector",
      description: "Did someone send you a message asking to share a code, OTP, or PIN? Paste it here to verify.",
      inputPlaceholder: "Paste the OTP request message here...",
      btnCheck: "Scan for OTP Theft",
      scanning: "Scanning code request..."
    },
    loan: {
      title: "Fake Loan App Checker",
      description: "Type the name of a loan app or paste its Google Play link. Predatory lenders charge illegal interest and blackmail families.",
      inputPlaceholder: "Enter App Name or Play Store URL...",
      btnCheck: "Verify Loan App Safety",
      checking: "Checking app registry...",
      altsLabel: "🌿 Safe RBI & Government Alternatives:"
    },
    nudge: {
      title: "Safe Pay Simulator",
      description: "Try sending money below. If you send more than ₹5,000, our system will show you the safety nudge scammers hate.",
      recipientLabel: "Who are you paying? (UPI ID or Phone)",
      amountLabel: "Amount to Send (₹)",
      btnSend: "Pay Money Safely",
      modalTitle: "🛑 Stop! Think Before You Send Money!",
      modalUrgency: "Scammers create artificial hurry and scare you into transferring money. Read these safety rules:",
      modalCheck1: "Do you know this person in real life? (Have you met them face-to-face?)",
      modalCheck2: "Did they call saying your electricity, SIM, or bank will be blocked today?",
      modalCheck3: "Did they promise you a free lottery, PM Awas house, or online job salary?",
      btnCancel: "❌ NO, STOP! (Save my money)",
      btnConfirm: "Yes, I am 100% sure. Proceed.",
      verifySuccess: "✅ Payment Verified: Below ₹5,000 is safe from urgent high-value locks, but always verify recipients."
    },
    upgrades: {
      safePayTitle: "💳 Pay Safely via Official Apps",
      safePayMsg: "You can securely complete your payment by tapping below:",
      verifyTip: "⚠️ ALWAYS verify the recipient's verified name and amount on the screen before typing your secret UPI PIN!",
      scamCategory: "Scam Category:",
      recoveryTitle: "🛡️ What You Must Do Now (3 Action Steps):",
      reportLabel: "🚨 Report Scam on Government Cyber Portal",
      payTriggered: "Redirecting safely to [App]... Verify payee details before entering your PIN!",
      orText: "OR"
    },
    emergency: {
      title: "🚨 EMERGENCY ACTIONS (Rural Safety Helpline)",
      blockBtn: "🛑 BLOCK PAYMENT",
      blockDesc: "Close your payment app immediately",
      reportBtn: "🚨 REPORT FRAUD",
      reportDesc: "Report this fraud to Indian Cyber Crime portal",
      callBtn: "📞 CALL 1930",
      callDesc: "National Cyber Helpline (1930)",
      callSub: "Free helpline, available 24/7"
    },
    auth: {
      loginTitle: "Enter FraudShield 🛡️",
      loginSubtitle: "Sign in to your account for safe transactions",
      signupTitle: "Create Your Safety Account 🌿",
      signupSubtitle: "Join to save your scans and check safety risk",
      phoneLabel: "Phone Number (with +91)",
      phonePlaceholder: "Enter 10-digit phone number",
      passwordLabel: "Secret Password",
      passwordPlaceholder: "Enter password (min 6 characters)",
      nameLabel: "Full Name",
      namePlaceholder: "Enter your full name",
      villageLabel: "Village or City Name",
      villagePlaceholder: "Enter your village or city name",
      btnLogin: "Login Securely ➔",
      btnGoogle: "Sign in with Google",
      btnSignup: "Create My Account ➔",
      switchSignup: "New user? Create a free account",
      switchLogin: "Already have an account? Login here",
      googleRegistrationNote: "Google Account Connected! Please complete remaining details.",
      passwordNotRequired: "Password not required (Google Login)",
      welcome: "Welcome",
      location: "Location",
      logout: "Logout",
      errorPhone: "Please enter a valid 10-digit phone number",
      errorPassword: "Password must be at least 6 characters",
      errorName: "Name is required",
      errorVillage: "Village/City name is required",
      successRegister: "Account created successfully!",
      successLogin: "Logged in successfully!",
      phoneFormatHint: "Format: +919876543210 (Auto-adjusts digits)"
    },
    footer: "FraudShield 🛡️ — Empowers digital literacy in rural communities. SIT Mangaluru AIML Department Hackathon 2026."
  },
  kn: {
    title: "ಫ್ರಾಡ್‌ಶೀಲ್ಡ್ (FraudShield) 🛡️",
    subtitle: "ಗ್ರಾಮೀಣ ಭಾರತಕ್ಕಾಗಿ ಎಐ-ಚಾಲಿತ ವಂಚನೆ ತಡೆಗಟ್ಟುವಿಕೆ",
    tagline: "ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಭದ್ರತಾ ಕವಚ. ಯಾವುದೇ ಜಟಿಲ ಪದಗಳಿಲ್ಲದ ಸರಳ ಎಚ್ಚರಿಕೆಗಳು.",
    langSwitch: "Read in English (ಇಂಗ್ಲಿಷ್)",
    tabs: {
      upi: "🔍 ಯುಪಿಐ / ಫೋನ್",
      qr: "📷 ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನರ್",
      phishing: "✉️ ವಾಟ್ಸಾಪ್ ಪರಿಶೀಲನೆ",
      otp: "🔑 ಒಟಿಪಿ ವಂಚನೆ ಪತ್ತೆ",
      loan: "💸 ಸಾಲದ ಆಪ್ ಪರಿಶೀಲನೆ",
      simulator: "📱 ಪಾವತಿ ಸಿಮ್ಯುಲೇಟರ್"
    },
    upi: {
      title: "ಯುಪಿಐ / ಫೋನ್ ಅಪಾಯ ವಿಶ್ಲೇಷಕ",
      description: "ಹೊಸಬರಿಗೆ ಹಣ ಕಳುಹಿಸುವ ಮೊದಲು, ಅವರ ಯುಪಿಐ ಐಡಿ ಅಥವಾ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ಇಲ್ಲಿ ಹಾಕಿ ಅದು ಸುರಕ್ಷಿತವಾಗಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ.",
      inputPlaceholder: "ಯುಪಿಐ ಐಡಿ ಅಥವಾ ೧೦-ಅಂಕಿಯ ಫೋನ್ ಸಂಖ್ಯೆ ಹಾಕಿ",
      btnCheck: "ಈಗಲೇ ಸುರಕ್ಷತೆ ಪರಿಶೀಲಿಸಿ",
      checking: "ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",
      riskScore: "ವಂಚನೆಯ ಅಪಾಯದ ಅಂಕ",
      examples: "ತ್ವರಿತ ಪರೀಕ್ಷಾ ಉದಾಹರಣೆಗಳು:",
      verdicts: {
        safe: "🟢 ಸುರಕ್ಷಿತ ಖಾತೆ (ತುಂಬಾ ಕಡಿಮೆ ಅಪಾಯ)",
        caution: "🟡 ಎಚ್ಚರಿಕೆ ಅಗತ್ಯ (ಮಧ್ಯಮ ಅಪಾಯ)",
        danger: "🔴 ತೀವ್ರ ಅಪಾಯ (ಹೆಚ್ಚಿನ ವಂಚನೆ ಅಪಾಯ)"
      },
      warningTitle: "ಇದನ್ನು ಏಕೆ ಗುರುತಿಸಲಾಗಿದೆ:",
      audioBtn: "🔊 ಎಚ್ಚರಿಕೆಯನ್ನು ಆಲಿಸಿ (ಆಡಿಯೋ)",
      audioStop: "⏹️ ಆಡಿಯೋ ನಿಲ್ಲಿಸಿ"
    },
    qr: {
      title: "ಕ್ಯೂಆರ್ ಕೋಡ್ ಸುರಕ್ಷಾ ಸ್ಕ್ಯಾನರ್",
      description: "ಯಾರಾದರೂ ನಿಮಗೆ ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಕ್ಯೂಆರ್ ಕೋಡ್ ಕಳುಹಿಸಿದ್ದಾರೆಯೇ ಅಥವಾ ಭಿತ್ತಿಪತ್ರದಲ್ಲಿ ಮುದ್ರಿಸಲಾಗಿದೆಯೇ? ಪರಿಶೀಲಿಸಲು ಅದರ ಲಿಂಕ್ ಪೇಸ್ಟ್ ಮಾಡಿ ಅಥವಾ ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
      inputPlaceholder: "ಕ್ಯೂಆರ್ ಕೋಡ್ ಲಿಂಕ್ ಅನ್ನು ಇಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ...",
      uploadLabel: "ಕ್ಯೂಆರ್ ಕೋಡ್ ಚಿತ್ರವನ್ನು ಇಲ್ಲಿಗೆ ಎಳೆಯಿರಿ ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
      checking: "ಕ್ಯೂಆರ್ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",
      examples: "ಈ ಉದಾಹರಣೆಗಳನ್ನು ಪ್ರಯತ್ನಿಸಿ:",
      btnCheck: "ಕ್ಯೂಆರ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ"
    },
    phishing: {
      title: "ವಾಟ್ಸಾಪ್ ಸಂದೇಶ ಮತ್ತು ಲಿಂಕ್ ಪತ್ತೆಕಾರಕ",
      description: "ಸರ್ಕಾರದಿಂದ ಉಚಿತ ಹಣ ನೀಡುವ ಭರವಸೆ ನೀಡುವ ಶಂಕಾಸ್ಪದ ವಾಟ್ಸಾಪ್ ಸಂದೇಶ, ಎಸ್‌ಎಂಎಸ್ ಅಥವಾ ವೆಬ್ ಲಿಂಕ್ ಬಂದಿದೆಯೇ? ವಂಚನೆ ಪತ್ತೆಹಚ್ಚಲು ಇಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ.",
      inputPlaceholder: "ಸಂದೇಶ ಅಥವಾ ವೆಬ್ ಲಿಂಕ್ ಅನ್ನು ಇಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ...",
      btnCheck: "ಈಗಲೇ ಸಂದೇಶ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
      scanning: "ಸ್ಕ್ಯಾನ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
      nextStep: "ಮುಂದೆ ನೀವು ಮಾಡಬೇಕಾದ ಕೆಲಸ (ಸುರಕ್ಷಿತ ಸಲಹೆ):",
      audioBtn: "🔊 ಸಲಹೆಯನ್ನು ಆಲಿಸಿ (ಆಡಿಯೋ)"
    },
    otp: {
      title: "ಒಟಿಪಿ / ಪಾಸ್‌ವರ್ಡ್ ವಂಚನೆ ಪತ್ತೆಕಾರಕ",
      description: "ನಿಮ್ಮ ಮೊಬೈಲ್‌ಗೆ ಬಂದ ಒಟಿಪಿ, ರಹಸ್ಯ ಕೋಡ್ ಅಥವಾ ಪಿನ್ ಸಂಖ್ಯೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳುವಂತೆ ಯಾರಾದರೂ ಸಂದೇಶ ಕಳುಹಿಸಿದ್ದಾರೆಯೇ? ಪತ್ತೆಹಚ್ಚಲು ಇಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ.",
      inputPlaceholder: "ಒಟಿಪಿ ಕೇಳುವ ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ...",
      btnCheck: "ಒಟಿಪಿ ವಂಚನೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
      scanning: "ಒಟಿಪಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ..."
    },
    loan: {
      title: "ನಕಲಿ ಸಾಲದ ಆಪ್ ಪರಿಶೀಲನೆ",
      description: "ಯಾವುದೇ ಸಾಲದ ಆಪ್‌ನ ಹೆಸರು ಅಥವಾ ಗೂಗಲ್ ಪ್ಲೇ ಲಿಂಕ್ ಅನ್ನು ಟೈಪ್ ಮಾಡಿ. ಇವುಗಳು ಕಾನೂನುಬಾಹಿರ ಬಡ್ಡಿ ವಿಧಿಸಿ ಕುಟುಂಬದವರಿಗೆ ಬೆದರಿಕೆ ಹಾಕುತ್ತವೆ.",
      inputPlaceholder: "ಆಪ್ ಹೆಸರು ಅಥವಾ ಪ್ಲೇ ಸ್ಟೋರ್ ಲಿಂಕ್...",
      btnCheck: "ಸಾಲದ ಆಪ್ ಪರಿಶೀಲಿಸಿ",
      checking: "ಆಪ್ ನೋಂದಣಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",
      altsLabel: "🌿 ಸುರಕ್ಷಿತ ಸರ್ಕಾರಿ ಮತ್ತು ಆರ್‌ಬಿಐ ಸಾಲಗಳು:"
    },
    nudge: {
      title: "ಸುರಕ್ಷಿತ ಪಾವತಿ ಸಿಮ್ಯುಲೇಟರ್",
      description: "ಕೆಳಗೆ ಹಣ ಕಳುಹಿಸಲು ಪ್ರಯತ್ನಿಸಿ. ನೀವು ₹೫,೦೦೦ ಕ್ಕಿಂತ ಹೆಚ್ಚು ಕಳುಹಿಸಿದರೆ, ವಂಚಕರು ಇಷ್ಟಪಡದ ಸುರಕ್ಷತಾ ಎಚ್ಚರಿಕೆಯನ್ನು ನಮ್ಮ ವ್ಯವಸ್ಥೆಯು ನಿಮಗೆ ತೋರಿಸುತ್ತದೆ.",
      recipientLabel: "ಯಾರಿಗೆ ಹಣ ಕಳುಹಿಸುತ್ತಿದ್ದೀರಿ? (ಯುಪಿಐ ಐಡಿ ಅಥವಾ ಫೋನ್)",
      amountLabel: "ಕಳುಹಿಸಬೇಕಾದ ಹಣ (₹)",
      btnSend: "ಹಣವನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಪಾವತಿಸಿ",
      modalTitle: "🛑 ತಡೆಯಿರಿ! ಹಣ ಕಳುಹಿಸುವ ಮುನ್ನ ಆಲೋಚಿಸಿ!",
      modalUrgency: "ವಂಚಕರು ಸುಳ್ಳು ಆತುರವನ್ನು ಸೃಷ್ಟಿಸುತ್ತಾರೆ ಮತ್ತು ನಿಮ್ಮನ್ನು ಹೆದರಿಸಿ ಹಣ ಕದಿಯುತ್ತಾರೆ. ಈ ನಿಯಮಗಳನ್ನು ಓದಿ:",
      modalCheck1: "ಈ ವ್ಯಕ್ತಿ ನಿಜ ಜೀವನದಲ್ಲಿ ನಿಮಗೆ ಪರಿಚಯವಿದ್ದಾರೆಯೇ? (ಮುಖಾಮುಖಿ ಭೇಟಿಯಾಗಿದ್ದೀರಾ?)",
      modalCheck2: "ನಿಮ್ಮ ವಿದ್ಯುತ್ ಬಿಲ್, ಸಿಮ್ ಅಥವಾ ಬ್ಯಾಂಕ್ ಇಂದು ಬಂದ್ ಆಗುತ್ತದೆ ಎಂದು ಅವರು ಹೆದರಿಸಿದ್ದಾರೆಯೇ?",
      modalCheck3: "ಅವರು ನಿಮಗೆ ಉಚಿತ ಲಾಟರಿ, ಪಿಎಂ ಆವಾಸ್ ಮನೆ ಅಥವಾ ಆನ್‌ಲೈನ್ ಕೆಲಸದ ಆಮಿಷ ಒಡ್ಡಿದ್ದಾರೆಯೇ?",
      btnCancel: "❌ ಬೇಡ, ನಿಲ್ಲಿಸಿ! (ನನ್ನ ಹಣ ಉಳಿಸಿ)",
      btnConfirm: "ಹೌದು, ನನಗೆ ೧೦೦% ಖಚಿತವಿದೆ. ಮುಂದುವರಿಯಿರಿ.",
      verifySuccess: "✅ ಪಾವತಿ ದೃಢೀಕರಿಸಲಾಗಿದೆ: ₹೫,೦೦೦ ಕ್ಕಿಂತ ಕಡಿಮೆ ಹಣದ ವರ್ಗಾವಣೆಗೆ ತುರ್ತು ಎಚ್ಚರಿಕೆಯ ಅಗತ್ಯವಿಲ್ಲ, ಆದರೆ ಸ್ವೀಕೃತದಾರರನ್ನು ಯಾವಾಗಲೂ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ."
    },
    upgrades: {
      safePayTitle: "💳 ಅಧಿಕೃತ ಆ್ಯಪ್‌ಗಳ ಮೂಲಕ ಸುರಕ್ಷಿತವಾಗಿ ಪಾವತಿಸಿ",
      safePayMsg: "ಕೆಳಗೆ ಕ್ಲಿಕ್ ಮಾಡುವ ಮೂಲಕ ನಿಮ್ಮ ಪಾವತಿಯನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಪೂರ್ಣಗೊಳಿಸಬಹುದು:",
      verifyTip: "⚠️ ನಿಮ್ಮ ರಹಸ್ಯ ಯುಪಿಐ ಪಿನ್ ನಮೂದಿಸುವ ಮೊದಲು ಮೊತ್ತ ಮತ್ತು ಸ್ವೀಕೃತದಾರರ ಹೆಸರನ್ನು ಯಾವಾಗಲೂ ಪಾವತಿ ಪರದೆಯಲ್ಲಿ ಪರಿಶೀಲಿಸಿ!",
      scamCategory: "ವಂಚನೆಯ ವರ್ಗ:",
      recoveryTitle: "🛡️ ತಕ್ಷಣ ನೀವು ಮಾಡಬೇಕಾದ ೩ ಕೆಲಸಗಳು (ರಕ್ಷಣಾ ನಿಯಮಗಳು):",
      reportLabel: "🚨 ಸರ್ಕಾರಿ ಸೈಬರ್ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ವಂಚನೆ ವರದಿ ಮಾಡಿ",
      payTriggered: "ಅಧಿಕೃತ [App] ಆ್ಯಪ್‌ಗೆ ಸುರಕ್ಷಿತವಾಗಿ ಮರುನಿರ್ದೇಶಿಸಲಾಗುತ್ತಿದೆ... ಪಿನ್ ದಾಖಲಿಸುವ ಮುನ್ನ ಹೆಸರು ಪರಿಶೀಲಿಸಿ!",
      orText: "ಅಥವಾ"
    },
    emergency: {
      title: "🚨 ತುರ್ತು ಕ್ರಮಗಳು (ಗ್ರಾಮೀಣ ರಕ್ಷಣಾ ಸಹಾಯವಾಣಿ)",
      blockBtn: "🛑 ಪಾವತಿ ತಡೆಯಿರಿ",
      blockDesc: "ನಿಮ್ಮ ಪಾವತಿ ಆಪ್ ಅನ್ನು ತಕ್ಷಣವೇ ಮುಚ್ಚಿ",
      reportBtn: "🚨 ವಂಚನೆ ವರದಿ ಮಾಡಿ",
      reportDesc: "ಈ ವಂಚನೆಯನ್ನು ಭಾರತೀಯ ಸೈಬರ್ ಕ್ರೈಮ್ ಪೋರ್ಟಲ್‌ಗೆ ವರದಿ ಮಾಡಿ",
      callBtn: "📞 1930 ಗೆ ಕರೆ ಮಾಡಿ",
      callDesc: "ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಸಹಾಯವಾಣಿ (1930)",
      callSub: "ಉಚಿತ ಸಹಾಯವಾಣಿ, ದಿನದ 24 ಗಂಟೆಯೂ ಲಭ್ಯ"
    },
    auth: {
      loginTitle: "ಫ್ರಾಡ್‌ಶೀಲ್ಡ್ ಒಳಗೆ ಪ್ರವೇಶಿಸಿ 🛡️",
      loginSubtitle: "ಸುರಕ್ಷಿತ ವಹಿವಾಟುಗಳಿಗಾಗಿ ನಿಮ್ಮ ಖಾತೆಗೆ ಲಾಗಿನ್ ಮಾಡಿ",
      signupTitle: "ನಿಮ್ಮ ಸುರಕ್ಷತಾ ಖಾತೆ ರಚಿಸಿ 🌿",
      signupSubtitle: "ನಿಮ್ಮ ಪರಿಶೀಲನೆಗಳನ್ನು ಉಳಿಸಲು ಮತ್ತು ವಂಚನೆ ಅಪಾಯ ಪತ್ತೆಹಚ್ಚಲು ಸೇರಿಕೊಳ್ಳಿ",
      phoneLabel: "ಫೋನ್ ಸಂಖ್ಯೆ (+91 ಜೊತೆಗೆ)",
      phonePlaceholder: "೧೦-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಹಾಕಿ",
      passwordLabel: "ರಹಸ್ಯ ಪಾಸ್‌ವರ್ಡ್",
      passwordPlaceholder: "ಪಾಸ್‌ವರ್ಡ್ ಹಾಕಿ (ಕನಿಷ್ಠ ೬ ಅಕ್ಷರಗಳು)",
      nameLabel: "ಪೂರ್ಣ ಹೆಸರು",
      namePlaceholder: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ಬರೆಯಿರಿ",
      villageLabel: "ಗ್ರಾಮ ಅಥವಾ ನಗರದ ಹೆಸರು",
      villagePlaceholder: "ನಿಮ್ಮ ಗ್ರಾಮ ಅಥವಾ ನಗರದ ಹೆಸರು ಬರೆಯಿರಿ",
      btnLogin: "ಸುರಕ್ಷಿತವಾಗಿ ಲಾಗಿನ್ ಮಾಡಿ ➔",
      btnGoogle: "ಗೂಗಲ್ (Google) ಜೊತೆ ಸೈನ್ ಇನ್ ಮಾಡಿ",
      btnSignup: "ನನ್ನ ಖಾತೆ ರಚಿಸಿ ➔",
      switchSignup: "ಹೊಸ ಬಳಕೆದಾರರೇ? ಉಚಿತ ಖಾತೆಯನ್ನು ರಚಿಸಿ",
      switchLogin: "ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರಾ? ಇಲ್ಲಿ ಲಾಗಿನ್ ಮಾಡಿ",
      googleRegistrationNote: "ಗೂಗಲ್ ಖಾತೆ ಸಂಪರ್ಕಗೊಂಡಿದೆ! ದಯವಿಟ್ಟು ಉಳಿದ ವಿವರಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.",
      passwordNotRequired: "ಪಾಸ್‌ವರ್ಡ್ ಅಗತ್ಯವಿಲ್ಲ (ಗೂಗಲ್ ಲಾಗಿನ್)",
      welcome: "ಸ್ವಾಗತ",
      location: "ಸ್ಥಳ",
      logout: "ಹೊರಹೋಗಿ (Logout)",
      errorPhone: "ದಯವಿಟ್ಟು ಸರಿಯಾದ ೧೦-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ಹಾಕಿ",
      errorPassword: "ಪಾಸ್‌ವರ್ಡ್ ಕನಿಷ್ಠ ೬ ಅಕ್ಷರಗಳಾಗಿರಬೇಕು",
      errorName: "ಹೆಸರು ಅತ್ಯಗತ್ಯ",
      errorVillage: "ಗ್ರಾಮ ಅಥವಾ ನಗರದ ಹೆಸರು ಅತ್ಯಗತ್ಯ",
      successRegister: "ಖಾತೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ರಚಿಸಲಾಗಿದೆ!",
      successLogin: "ಯಶಸ್ವಿಯಾಗಿ ಲಾಗಿನ್ ಆಗಿದ್ದೀರಿ!",
      phoneFormatHint: "ಮಾದರಿ: +919876543210 (ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಹೊಂದಾಣಿಕೆಯಾಗುತ್ತದೆ)"
    },
    footer: "ಫ್ರಾಡ್‌ಶೀಲ್ಡ್ 🛡️ — ಗ್ರಾಮೀಣ ಸಮುದಾಯಗಳಲ್ಲಿ ಡಿಜಿಟಲ್ ಜಾಗೃತಿ ಮೂಡಿಸಲು ನೆರವಾಗುತ್ತದೆ. SIT ಮಂಗಳೂರು AIML ವಿಭಾಗ ಹ್ಯಾಕಥಾನ್ ೨೦೨೬."
  }
};

export default function App() {
  const API_URL = import.meta.env.VITE_API_URL || `${API_URL}`;
  const [lang, setLang] = useState('en'); 
  const [activeTab, setActiveTab] = useState('upi'); 
  
  // Accessibility States
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('fraudshield_dark_mode') === 'true';
  });
  const [largeText, setLargeText] = useState(() => {
    return localStorage.getItem('fraudshield_large_text') === 'true';
  });

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      localStorage.setItem('fraudshield_dark_mode', !prev);
      return !prev;
    });
  };

  const toggleLargeText = () => {
    setLargeText(prev => {
      localStorage.setItem('fraudshield_large_text', !prev);
      return !prev;
    });
  }; 
  
  // Authentication states
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fs_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authView, setAuthView] = useState('login'); // 'login', 'signup'
  const [authPhone, setAuthPhone] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authVillage, setAuthVillage] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(''); 
  
  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Database integrations state
  const [recentScans, setRecentScans] = useState([]);
  const [todayReportsCount, setTodayReportsCount] = useState(0);

  // Tab Results
  const [upiInput, setUpiInput] = useState('');
  const [upiResult, setUpiResult] = useState(null);
  const [upiLoading, setUpiLoading] = useState(false);

  const [qrInput, setQrInput] = useState('');
  const [qrResult, setQrResult] = useState(null);
  const [qrLoading, setQrLoading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');

  // Camera QR Scanning additions
  const [qrSubTab, setQrSubTab] = useState('camera'); // 'camera', 'upload', 'paste'
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const [messageInput, setMessageInput] = useState('');
  const [messageResult, setMessageResult] = useState(null);
  const [messageLoading, setMessageLoading] = useState(false);

  const [otpInput, setOtpInput] = useState('');
  const [otpResult, setOtpResult] = useState(null);
  const [otpLoading, setOtpLoading] = useState(false);

  const [loanInput, setLoanInput] = useState('');
  const [loanResult, setLoanResult] = useState(null);
  const [loanLoading, setLoanLoading] = useState(false);

  // Simulator state
  const [simRecipient, setSimRecipient] = useState('');
  const [simAmount, setSimAmount] = useState('');
  const [showNudgeModal, setShowNudgeModal] = useState(false);
  const [simMessage, setSimMessage] = useState('');
  const [confirmChecks, setConfirmChecks] = useState({
    knowPerson: false,
    noThreat: false,
    noPrize: false
  });

  // Database API fetch and report actions
  const fetchRecentScans = async (userId = null) => {
    try {
      const url = userId 
        ? `${API_URL}/api/scans?user_id=${userId}`
        : `${API_URL}/api/scans`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setRecentScans(data);
      }
    } catch (err) {
      console.warn("Error fetching scans from database:", err);
    }
  };

  const handleDeleteScan = async (scanId) => {
    try {
      const res = await fetch(`${API_URL}/api/scans/${scanId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        alert(lang === 'en' ? "Scan deleted" : "ತಪಾಸಣೆಯನ್ನು ಅಳಿಸಲಾಗಿದೆ");
        fetchRecentScans(user?.id);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete scan");
      }
    } catch (err) {
      console.error("Error deleting scan:", err);
      alert("Error deleting scan");
    }
  };

  const fetchTodayReportsCount = async () => {
    try {
      const res = await fetch(`${API_URL}/api/reports/today-count`);
      if (res.ok) {
        const data = await res.json();
        setTodayReportsCount(data.count || 0);
      }
    } catch (err) {
      console.warn("Error fetching reports count from database:", err);
    }
  };

  const handleReportScam = async (inputVal, scamType) => {
    if (!inputVal) return;
    try {
      const res = await fetch(`${API_URL}/api/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputVal, scam_type: scamType, user_id: user?.id })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setTodayReportsCount(data.count || 0);
          alert(lang === 'en'
            ? "🚨 Scam successfully reported to official databases! Thank you for protecting the community."
            : "🚨 ವಂಚನೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ವರದಿ ಮಾಡಲಾಗಿದೆ! ಸಮುದಾಯವನ್ನು ರಕ್ಷಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು."
          );
        }
      }
    } catch (err) {
      console.error("Error reporting scam:", err);
      alert("Error reporting scam. Please try again.");
    }
  };

  // Authentication Handlers
  const handlePhoneLogin = async (e) => {
    if (e) e.preventDefault();
    setAuthError('');
    
    // Validate phone number
    const cleanPhone = authPhone.trim().replace(/\s+/g, '');
    const phoneDigitsOnly = cleanPhone.replace(/^\+91/, '');
    if (!phoneDigitsOnly.match(/^\d{10}$/)) {
      setAuthError(activeTranslations.auth.errorPhone);
      return;
    }

    if (authPassword.length < 6) {
      setAuthError(activeTranslations.auth.errorPassword);
      return;
    }

    setAuthLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login-phone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone, password: authPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('fs_user', JSON.stringify(data.user));
        alert(activeTranslations.auth.successLogin);
      }
    } catch (err) {
      console.error("Phone login error:", err);
      setAuthError(err.message || 'Login failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    setAuthError('');

    if (!authName.trim()) {
      setAuthError(activeTranslations.auth.errorName);
      return;
    }

    const cleanPhone = authPhone.trim().replace(/\s+/g, '');
    const phoneDigitsOnly = cleanPhone.replace(/^\+91/, '');
    if (!phoneDigitsOnly.match(/^\d{10}$/)) {
      setAuthError(activeTranslations.auth.errorPhone);
      return;
    }

    if (!authVillage.trim()) {
      setAuthError(activeTranslations.auth.errorVillage);
      return;
    }

    if (authPassword.length < 6) {
      setAuthError(activeTranslations.auth.errorPassword);
      return;
    }

    setAuthLoading(true);
    try {
      const payload = {
        name: authName.trim(),
        phone: cleanPhone,
        village: authVillage.trim(),
        password: authPassword
      };

      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('fs_user', JSON.stringify(data.user));
        alert(activeTranslations.auth.successRegister);
        
        // Clear auth fields
        setAuthPhone('');
        setAuthPassword('');
        setAuthName('');
        setAuthVillage('');
      }
    } catch (err) {
      console.error("Registration error:", err);
      setAuthError(err.message || 'Registration failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('fs_user');
    // Clear auth fields
    setAuthPhone('');
    setAuthPassword('');
    setAuthName('');
    setAuthVillage('');
  };

  // Mount effect to fetch initial data
  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      if (active) {
        fetchRecentScans(user?.id);
        fetchTodayReportsCount();
      }
    }, 0);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [user]);

  const activeTranslations = TRANSLATIONS[lang];

  async function startCamera() {
    setCameraError(null);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access error:", err);
        setCameraError(lang === 'en' 
          ? "Unable to access device camera. Please check permissions or upload a photo instead."
          : "ಮೊಬೈಲ್ ಕ್ಯಾಮೆರಾ ತೆರೆಯಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಅನುಮತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ ಅಥವಾ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ."
        );
      }
    } else {
      setCameraError(lang === 'en'
        ? "Camera scanner is not supported on this browser."
        : "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಕ್ಯಾಮೆರಾ ಸ್ಕ್ಯಾನರ್ ಬೆಂಬಲಿಸುವುದಿಲ್ಲ."
      );
    }
  }

  function stopCamera() {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  }

  // Sync Camera stream capture with active tabs
  useEffect(() => {
    let active = true;
    let timer = null;
    if (activeTab === 'qr' && qrSubTab === 'camera') {
      timer = setTimeout(() => {
        if (active) {
          startCamera();
        }
      }, 0);
    } else {
      timer = setTimeout(() => {
        if (active) {
          stopCamera();
        }
      }, 0);
    }
    return () => {
      active = false;
      if (timer) clearTimeout(timer);
      stopCamera();
    };
  }, [activeTab, qrSubTab]);

  // Real-time canvas frame parsing animation loop
  useEffect(() => {
    let animationId = null;
    let isScanning = true;

    const tick = () => {
      if (!isScanning) return;
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      if (video && video.readyState === video.HAVE_ENOUGH_DATA && canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        if (window.jsQR) {
          const code = window.jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });
          
          if (code && code.data) {
            isScanning = false;
            console.log("QR Code Decoded live:", code.data);
            
            // Release tracks immediately
            if (cameraStream) {
              cameraStream.getTracks().forEach(track => track.stop());
              setCameraStream(null);
            }
            
            setQrInput(code.data);
            handleCheckQr(null, code.data);
            return;
          }
        }
      }
      
      if (isScanning && activeTab === 'qr' && qrSubTab === 'camera' && cameraStream) {
        animationId = requestAnimationFrame(tick);
      }
    };

    if (activeTab === 'qr' && qrSubTab === 'camera' && cameraStream) {
      animationId = requestAnimationFrame(tick);
    }

    return () => {
      isScanning = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [activeTab, qrSubTab, cameraStream]);

  function stopAudio() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  }

  function clearAllResults() {
    setUpiResult(null);
    setQrResult(null);
    setMessageResult(null);
    setOtpResult(null);
    setLoanResult(null);
    setSimMessage('');
    setUploadedFileName('');
  }

  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      if (active) {
        stopAudio();
        clearAllResults();
      }
    }, 0);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [activeTab, lang]);

  const playTTS = (text, targetLang) => {
    stopAudio();
    if (!window.speechSynthesis) {
      alert("Speech synthesis is not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    
    if (targetLang === 'kn') {
      const knVoice = voices.find(v => v.lang.includes('kn') || v.lang.includes('KN') || v.name.toLowerCase().includes('kannada'));
      if (knVoice) {
        utterance.voice = knVoice;
      }
      utterance.lang = 'kn-IN';
      utterance.rate = 0.8;
    } else {
      const enVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en-GB'));
      if (enVoice) {
        utterance.voice = enVoice;
      }
      utterance.lang = 'en-IN';
      utterance.rate = 0.85;
    }

    utterance.onend = () => {
      setIsPlayingAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
    };

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  const getSteps = (result) => {
    if (!result) return [];
    return lang === 'en'
      ? (result.steps_en || [
          "1. Do NOT click any links or scan this QR again.",
          "2. Delete the sender's message and block them immediately.",
          "3. Warn family members not to trust this scheme."
        ])
      : (result.steps_kn || [
          "1. ಯಾವುದೇ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ ಅಥವಾ ಕ್ಯೂಆರ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಬೇಡಿ.",
          "2. ಕಳುಹಿಸಿದವರ ಸಂದೇಶವನ್ನು ಅಳಿಸಿ ತಕ್ಷಣವೇ ಬ್ಲಾಕ್ ಮಾಡಿ.",
          "3. ಈ ಸುಳ್ಳು ಯೋಜನೆಯನ್ನು ನಂಬದಂತೆ ಕುಟುಂಬದವರಿಗೆ ಎಚ್ಚರಿಸಿ."
        ]);
  };

  const getActiveResult = () => {
    switch (activeTab) {
      case 'upi':
        return { result: upiResult, type: 'upi', steps: getSteps(upiResult) };
      case 'qr':
        return { result: qrResult, type: 'qr', steps: getSteps(qrResult) };
      case 'phishing':
        return { result: messageResult, type: 'phishing', steps: getSteps(messageResult) };
      case 'otp':
        return { result: otpResult, type: 'otp', steps: getSteps(otpResult) };
      case 'loan':
        return { result: loanResult, type: 'loan', steps: getSteps(loanResult) };
      default:
        return null;
    }
  };

  const handleHeaderTTS = () => {
    if (isPlayingAudio) {
      stopAudio();
      return;
    }
    const active = getActiveResult();
    if (!active || !active.result) {
      const welcomeText = lang === 'en'
        ? "Welcome to FraudShield. Please check a UPI ID, WhatsApp message, or QR code to verify safety first."
        : "ಫ್ರಾಡ್‌ಶೀಲ್ಡ್‌ಗೆ ಸ್ವಾಗತ. ದಯವಿಟ್ಟು ಸುರಕ್ಷತೆಯನ್ನು ಪರಿಶೀಲಿಸಲು ಯುಪಿಐ ಐಡಿ ಅಥವಾ ಕ್ಯೂಆರ್ ಕೋಡ್ ಅನ್ನು ಮೊದಲು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.";
      playTTS(welcomeText, lang);
      return;
    }
    
    const { result, type, steps } = active;
    let speechText = lang === 'en'
      ? `${result.message_en}. reasons. ${(result.details_en || []).join('. ')}`
      : `${result.message_kn}. ಕಾರಣಗಳು. ${(result.details_kn || []).join('. ')}`;
    
    if (result.status === 'danger') {
      const safetyStepsSpeech = lang === 'en'
        ? `. Recovery action steps: ${steps.join('. ')}`
        : `. ತಕ್ಷಣ ನೀವು ಮಾಡಬೇಕಾದ ೩ ಕೆಲಸಗಳು: ${steps.join('. ')}`;
      speechText += safetyStepsSpeech;
    }
    
    if (type === 'loan' && (lang === 'en' ? result.alternatives_en : result.alternatives_kn)) {
      const alts = lang === 'en' ? result.alternatives_en : result.alternatives_kn;
      const alternativesSpeech = lang === 'en'
        ? `. Safer official alternatives: ${alts.join('. ')}`
        : `. ಸುರಕ್ಷಿತ ಅಧಿಕೃತ ಪರ್ಯಾಯಗಳು: ${alts.join('. ')}`;
      speechText += alternativesSpeech;
    }

    playTTS(speechText, lang);
  };

  // -------------------------------------------------------------
  // Dynamic Rule-Based Local Fallback Logic (Identical to Backend)
  // -------------------------------------------------------------
  const getLocalUpiAnalysis = (upi) => {
    const u = upi.trim().toLowerCase();
    if ("pmkisan" in u || "pm-kisan" in u || u === "pmkisan-relief@ybl") {
      return {
        score: 95,
        status: "danger",
        category_en: "Government Impersonation",
        category_kn: "ಸರ್ಕಾರಿ ಹೆಸರಿನ ವಂಚನೆ",
        message_en: "CRITICAL DANGER: Fake Government Scheme Impersonation detected!",
        message_kn: "ತೀವ್ರ ಅಪಾಯ: ನಕಲಿ ಸರ್ಕಾರಿ ಯೋಜನೆಯ ಹೆಸರು ಪತ್ತೆಯಾಗಿದೆ!",
        details_en: [
          "The UPI address contains 'pmkisan' or 'relief' which is designed to look like the official PM-KISAN agricultural scheme.",
          "Official government relief funds use official government UPI addresses, never '@ybl' or individual handles.",
          "This is a common scam targeting rural farmers to steal their hard-earned money."
        ],
        details_kn: [
          "ಯುಪಿಐ ವಿಳಾಸವು 'pmkisan' ಅಥವಾ 'relief' ಅನ್ನು ಒಳಗೊಂಡಿದೆ, ಇದು ಅಧಿಕೃತ ಪಿಎಂ-ಕಿಸಾನ್ ಕೃಷಿ ಯೋಜನೆಯಂತೆ ಕಾಣಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.",
          "ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪರಿಹಾರ ನಿಧಿಗಳು ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಯುಪಿಐ ವಿಳಾಸಗಳನ್ನು ಬಳಸುತ್ತವೆ, ಎಂದಿಗೂ ಸಾಮಾನ್ಯ '@ybl' ಅಥವಾ ವೈಯಕ್ತಿಕ ಖಾತೆಗಳನ್ನು ಬಳಸುವುದಿಲ್ಲ.",
          "ಇದು ಗ್ರಾಮೀಣ ರೈತರ ಕಷ್ಟದ ಹಣವನ್ನು ದೋಚಲು ವಂಚಕರು ಬಳಸುವ ಸಾಮಾನ್ಯ ತಂತ್ರವಾಗಿದೆ."
        ],
        steps_en: [
          "1. Do NOT transfer any money to this address.",
          "2. Report the contact on WhatsApp where you received this payment link.",
          "3. Inform your local Gram Panchayat or relative immediately."
        ],
        steps_kn: [
          "1. ಈ ವಿಳಾಸಕ್ಕೆ ಯಾವುದೇ ಹಣವನ್ನು ವರ್ಗಾಯಿಸಬೇಡಿ.",
          "2. ಈ ಪಾವತಿ ಲಿಂಕ್ ಬಂದ ವಾಟ್ಸಾಪ್ ಸಂಪರ್ಕವನ್ನು ವರದಿ ಮಾಡಿ.",
          "3. ತಕ್ಷಣವೇ ನಿಮ್ಮ ಸ್ಥಳೀಯ ಗ್ರಾಮ್ ಪಂಚಾಯತ್ ಅಥವಾ ವಿಶ್ವಾಸಾರ್ಹರಿಗೆ ತಿಳಿಸಿ."
        ]
      };
    }
    
    if (u === "merchant@icici" || u === "merchant@paytm" || u === "utility@sbi") {
      return {
        score: 5,
        status: "safe",
        message_en: "SAFE: This is a verified business merchant account.",
        message_kn: "ಸುರಕ್ಷಿತ: ಇದು ಪರಿಶೀಲಿಸಲ್ಪಟ್ಟ ಅಧಿಕೃತ ವ್ಯಾಪಾರ ಖಾತೆಯಾಗಿದೆ.",
        details_en: [
          "This UPI ID is registered to a standard bank merchant handle (@icici / @sbi).",
          "No suspicious high-pressure behavior or scam history is detected for this merchant account."
        ],
        details_kn: [
          "ಈ ಯುಪಿಐ ಐಡಿ ಪ್ರಮಾಣಿತ ಬ್ಯಾಂಕ್ ವ್ಯಾಪಾರಿ ಹ್ಯಾಂಡಲ್‌ನಲ್ಲಿ ನೋಂದಾಯಿಸಲ್ಪಟ್ಟಿದೆ (@icici / @sbi).",
          "ಈ ವ್ಯಾಪಾರ ಖಾತೆಗೆ ಯಾವುದೇ ಶಂಕಾಸ್ಪದ ವಂಚನೆಯ ಇತಿಹಾಸ ಕಂಡುಬಂದಿಲ್ಲ."
        ]
      };
    }

    const isPhone = /^\+?(91)?[6-9]\d{9}$/.test(u.split('@')[0]) || /^\d{10}$/.test(u);
    if (isPhone) {
      return {
        score: 45,
        status: "caution",
        message_en: "CAUTION: Unverified Personal Phone / Number Transfer.",
        message_kn: "ಎಚ್ಚರಿಕೆ: ಇದು ಪರಿಶೀಲಿಸದ ವೈಯಕ್ತಿಕ ಫೋನ್ ಸಂಖ್ಯೆ ವರ್ಗಾವಣೆಯಾಗಿದೆ.",
        details_en: [
          "This payment is directly linked to an individual's phone number.",
          "CRITICAL RULE: Call the person to verify their voice and identity before sending money."
        ],
        details_kn: [
          "ಈ ಪಾವತಿಯು ನೇರವಾಗಿ ವ್ಯಕ್ತಿಯ ಫೋನ್ ಸಂಖ್ಯೆಗೆ ಸಂಬಂಧಿಸಿದೆ.",
          "ಪ್ರಮುಖ ನಿಯಮ: ಹಣವನ್ನು ಕಳುಹಿಸುವ ಮೊದಲು ವ್ಯಕ್ತಿಗೆ ಕರೆ ಮಾಡಿ ಅವರ ಧ್ವನಿ ಮತ್ತು ಗುರುತನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ."
        ]
      };
    }

    return {
      score: 50,
      status: "caution",
      message_en: "CAUTION: Unknown Individual or Unregistered Address.",
      message_kn: "ಎಚ್ಚರಿಕೆ: ಅಪರಿಚಿತ ವ್ಯಕ್ತಿ ಅಥವಾ ನೋಂದಾಯಿಸದ ಪಾವತಿ ವಿಳಾಸ.",
      details_en: [
        "This is a standard custom personal UPI ID, not a verified business.",
        "Always double-check the recipient name displayed in your payment app before confirming."
      ],
      details_kn: [
        "ಇದು ಸಾಮಾನ್ಯ ವೈಯಕ್ತಿಕ ಯುಪಿಐ ಐಡಿಯಾಗಿದೆ, ಪರಿಶೀಲಿಸಿದ ವ್ಯಾಪಾರವಲ್ಲ.",
        "ಪಾವತಿ ಮಾಡುವ ಮೊದಲು ನಿಮ್ಮ ಆ್ಯಪ್‌ನಲ್ಲಿ ತೋರಿಸುವ ಸ್ವೀಕೃತದಾರರ ಹೆಸರನ್ನು ಯಾವಾಗಲೂ ಪರಿಶೀಲಿಸಿ."
      ]
    };
  };

  const getLocalQrAnalysis = (qr) => {
    const q = qr.trim();
    const q_lower = q.toLowerCase();
    
    // 1. Check if UPI payment link
    if (q_lower.startsWith("upi://pay")) {
      const paMatch = q.match(/pa=([^&]+)/i);
      const pa = paMatch ? paMatch[1] : "";
      return getLocalUpiAnalysis(pa);
    } else if (q_lower.includes("@") && !q_lower.includes(" ") && !q_lower.startsWith("http")) {
      return getLocalUpiAnalysis(q);
    }

    // 2. Check if phone number
    const phoneClean = q_lower.replace("tel:", "").replace("+91", "").replace(/ /g, "").trim();
    const isPhone = /^\+?(91)?[6-9]\d{9}$/.test(phoneClean) || /^\d{10}$/.test(phoneClean);
    if (isPhone && phoneClean.length >= 10 && phoneClean.length <= 12) {
      return {
        score: 45,
        status: "caution",
        category_en: "Personal Phone Transfer Link",
        category_kn: "ವೈಯಕ್ತಿಕ ಫೋನ್ ಸಂಖ್ಯೆ ಕ್ಯೂಆರ್",
        message_en: `CAUTION: Phone Number detected in QR Code (${phoneClean}).`,
        message_kn: `ಎಚ್ಚರಿಕೆ: ಕ್ಯೂಆರ್ ಕೋಡ್‌ನಲ್ಲಿ ಫೋನ್ ಸಂಖ್ಯೆ ಪತ್ತೆಯಾಗಿದೆ (${phoneClean}).`,
        details_en: [
          "This QR encodes a direct mobile transfer phone number.",
          "Anyone can generate a QR code with a phone number; it does not guarantee a safe business or utility identity.",
          "ALWAYS call the person to verify their voice and identity before sending any money. Do not pay if you received this QR from an unknown contact."
        ],
        details_kn: [
          "ಈ ಕ್ಯೂಆರ್ ಕೋಡ್ ನೇರ ಮೊಬೈಲ್ ಹಣ ವರ್ಗಾವಣೆಯ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ಹೊಂದಿದೆ.",
          "ಯಾರು ಬೇಕಾದರೂ ಫೋನ್ ಸಂಖ್ಯೆಯೊಂದಿಗೆ ಕ್ಯೂಆರ್ ಕೋಡ್ ರಚಿಸಬಹುದು; ಇದು ಅವರ ಅಧಿಕೃತತೆಯನ್ನು ಸಾಬೀತುಪಡಿಸುವುದಿಲ್ಲ.",
          "ಹಣ ಕಳುಹಿಸುವ ಮೊದಲು ವ್ಯಕ್ತಿಗೆ ಕರೆ ಮಾಡಿ ಅವರ ಧ್ವನಿ ಮತ್ತು ಗುರುತನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ. ಅಪರಿಚಿತರಿಂದ ಕ್ಯೂಆರ್ ಬಂದಿದ್ದರೆ ಹಣ ವರ್ಗಾಯಿಸಬೇಡಿ."
        ]
      };
    }

    // 3. Check if web link
    const isUrl = (
      q_lower.startsWith("http://") || 
      q_lower.startsWith("https://") || 
      [".com", ".info", ".in", ".org", ".net", ".xyz", ".club"].some(ext => q_lower.includes(ext)) ||
      /[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/.test(q_lower)
    );
    if (isUrl) {
      let domain = q;
      const urlMatch = q.match(/https?:\/\/(?:www\.)?([^/]+)/i);
      if (urlMatch) {
        domain = urlMatch[1];
      }

      const suspiciousKeywords = ["kyc", "update", "verify", "free", "prize", "lucky", "gift", "pmkisan", "awas", "yojana", "lottery", "win", "reward", "cashback"];
      const foundKeywords = suspiciousKeywords.filter(kw => q_lower.includes(kw));

      if (q_lower.includes("pmkisan") || q_lower.includes("awas") || q_lower.includes("yojana")) {
        return {
          score: 96,
          status: "danger",
          category_en: "Phishing QR Link",
          category_kn: "ನಕಲಿ ಜಾಲತಾಣ ಲಿಂಕ್ ಕ್ಯೂಆರ್",
          message_en: "CRITICAL DANGER: Fraudulent Government Scheme Phishing Link Detected!",
          message_kn: "ತೀವ್ರ ಅಪಾಯ: ಕ್ಯೂಆರ್ ಕೋಡ್‌ನಲ್ಲಿ ವಂಚನೆಯ ವೆಬ್ ಲಿಂಕ್ ಪತ್ತೆಯಾಗಿದೆ!",
          details_en: [
            `The QR link encodes a web address '${domain}' designed to impersonate official government schemes.`,
            "Scanning it will redirect you to a fake site asking for your bank credentials or charging processing fees.",
            "FACT: Genuine government departments do not issue links via printed QR codes distributed on WhatsApp."
          ],
          details_kn: [
            `ಕ್ಯೂಆರ್ ಲಿಂಕ್ '${domain}' ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಹೆಸರನ್ನು ಬಳಸಿ ವಂಚಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.`,
            "ಇದನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡುವುದರಿಂದ ತೆರೆದುಕೊಳ್ಳುವ ನಕಲಿ ವೆಬ್‌ಸೈಟ್ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ವಿವರಗಳು ಅಥವಾ ಶುಲ್ಕಗಳನ್ನು ಕೇಳುತ್ತದೆ.",
            "ಸತ್ಯ: ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಇಲಾಖೆಗಳು ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಕ್ಯೂಆರ್ ಕೋಡ್ ಹಂಚಿಕೊಳ್ಳುವುದಿಲ್ಲ."
          ],
          steps_en: [
            "1. Do NOT click or open this web address on your mobile.",
            "2. Immediately delete this QR image to protect your bank accounts.",
            "3. Warn family members that government benefits are never claimed through QR codes."
          ],
          steps_kn: [
            "1. ನಿಮ್ಮ ಮೊಬೈಲ್‌ನಲ್ಲಿ ಈ ಲಿಂಕ್ ಅನ್ನು ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ತೆರೆಯಬೇಡಿ.",
            "2. ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗಳ ಸುರಕ್ಷತೆಗಾಗಿ ತಕ್ಷಣ ಈ ಕ್ಯೂಆರ್ ಚಿತ್ರವನ್ನು ಅಳಿಸಿಹಾಕಿ.",
            "3. ಸರ್ಕಾರಿ ಸೌಲಭ್ಯಗಳನ್ನು ಕ್ಯೂಆರ್ ಕೋಡ್ ಮೂಲಕ ಪಡೆಯಲಾಗುವುದಿಲ್ಲ ಎಂದು ಮನೆಯವರಿಗೆ ತಿಳಿಸಿ."
          ]
        };
      } else if (foundKeywords.length > 0) {
        const kwStr = foundKeywords.join(", ");
        return {
          score: 89,
          status: "danger",
          category_en: "Phishing Website Link",
          category_kn: "ನಕಲಿ ಜಾಲತಾಣ ಲಿಂಕ್ ಕ್ಯೂಆರ್",
          message_en: `WARNING: High-Risk QR Link Containing Phishing Terms (${kwStr})!`,
          message_kn: `ಎಚ್ಚರಿಕೆ: ಹೆಚ್ಚಿನ ಅಪಾಯದ ಕ್ಯೂಆರ್ ಲಿಂಕ್! ಶಂಕಾಸ್ಪದ ಪದಗಳು ಪತ್ತೆಯಾಗಿವೆ (${kwStr})!`,
          details_en: [
            `This QR code contains a web link '${domain}' that features suspicious words associated with cyber scams.`,
            "Scammers use terms like 'KYC', 'verify', or 'free' to trick you into entering personal banking passwords or OTPs.",
            "Do not open this URL under any circumstances."
          ],
          details_kn: [
            `ಈ ಕ್ಯೂಆರ್ ಕೋಡ್ '${domain}' ಜಾಲತಾಣ ಲಿಂಕ್ ಅನ್ನು ಹೊಂದಿದ್ದು, ವಂಚನೆಗೆ ಬಳಸುವ ಶಂಕಾಸ್ಪದ ಪದಗಳನ್ನು ಒಳಗೊಂಡಿದೆ.`,
            "ನಿಮ್ಮ ಬ್ಯಾಂಕಿಂಗ್ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಒಟಿಪಿ ಕದಿಯಲು ವಂಚಕರು 'ಕೆವೈಸಿ (KYC)', 'ಪರಿಶೀಲನೆ (verify)' ಅಥವಾ 'ಉಚಿತ (free)' ಪದಗಳನ್ನು ಬಳಸುತ್ತಾರೆ.",
            "ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ಈ ಲಿಂಕ್ ಅನ್ನು ಓಪನ್ ಮಾಡಬೇಡಿ."
          ],
          steps_en: [
            "1. Close this scanner page and do NOT open the link.",
            "2. Check official bank channels or utility offices directly if they requested updates.",
            "3. Report the sender's mobile number if received from an unknown WhatsApp contact."
          ],
          steps_kn: [
            "1. ಈ ಸ್ಕ್ಯಾನರ್ ಪುಟವನ್ನು ಮುಚ್ಚಿ ಮತ್ತು ಆ ಲಿಂಕ್ ಅನ್ನು ಓಪನ್ ಮಾಡಬೇಡಿ.",
            "2. ಮಾಹಿತಿ ಅಪ್‌ಡೇಟ್ ಮಾಡಲು ನಿಮ್ಮ ಅಧಿಕೃತ ಬ್ಯಾಂಕ್ ಅಥವಾ ಕಚೇರಿಯನ್ನು ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ.",
            "3. ಅಪರಿಚಿತ ವಾಟ್ಸಾಪ್ ಖಾತೆಯಿಂದ ಬಂದಿದ್ದರೆ ಕಳುಹಿಸಿದವರ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ಬ್ಲಾಕ್ ಮಾಡಿ."
          ]
        };
      } else {
        return {
          score: 60,
          status: "caution",
          category_en: "Unverified QR Web Link",
          category_kn: "ಪರಿಶೀಲಿಸದ ಜಾಲತಾಣ ಲಿಂಕ್",
          message_en: "CAUTION: Unverified Web Link in QR Code.",
          message_kn: "ಎಚ್ಚರಿಕೆ: ಕ್ಯೂಆರ್ ಕೋಡ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸದ ವೆಬ್ ಲಿಂಕ್ ಇದೆ.",
          details_en: [
            `This QR code opens an external web address: '${domain}'.`,
            "FraudShield cannot verify the absolute safety of this website registry.",
            "Ensure you fully trust the provider who printed or shared this QR before entering any private information."
          ],
          details_kn: [
            `ಈ ಕ್ಯೂಆರ್ ಕೋಡ್ ಬಾಹ್ಯ ಜಾಲತಾಣಕ್ಕೆ ಕರೆದೊಯ್ಯುತ್ತದೆ: '${domain}'.`,
            "ಫ್ರಾಡ್‌ಶೀಲ್ಡ್ ಈ ವೆಬ್‌ಸೈಟ್‌ನ ಸುರಕ್ಷತೆಯನ್ನು ಖಚಿತಪಡಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.",
            "ಯಾವುದೇ ಖಾಸಗಿ ಮಾಹಿತಿ ನೀಡುವ ಮುನ್ನ ಕ್ಯೂಆರ್ ನೀಡಿದವರನ್ನು ನೀವು ನಂಬುತ್ತೀರಿ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ."
          ]
        };
      }
    }

    // 4. Default Case
    return {
      score: 50,
      status: "caution",
      category_en: "Standard QR Text Content",
      category_kn: "ಸಾಮಾನ್ಯ ಕ್ಯೂಆರ್ ಪಠ್ಯ ಮಾಹಿತಿ",
      message_en: "CAUTION: Standard QR Text Content.",
      message_kn: "ಎಚ್ಚರಿಕೆ: ಸಾಮಾನ್ಯ ಕ್ಯೂಆರ್ ಪಠ್ಯ ಮಾಹಿತಿ.",
      details_en: [
        "This QR code encodes plain text, not a direct bank transfer.",
        "Text encoded: " + q.substring(0, 100) + (q.length > 100 ? "..." : "")
      ],
      details_kn: [
        "ಈ ಕ್ಯೂಆರ್ ಕೋಡ್ ಕೇವಲ ಸರಳ ಪಠ್ಯವನ್ನು ಹೊಂದಿದೆ, ನೇರ ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆಯಲ್ಲ.",
        "ಪಠ್ಯ ಮಾಹಿತಿ: " + q.substring(0, 100) + (q.length > 100 ? "..." : "")
      ]
    };
  };

  const getLocalMessageAnalysis = (msg) => {
    const m = msg.trim().toLowerCase();
    if (m.includes("pm awas yojana") || m.includes("awas yojana") || (m.includes("processing fee") && m.includes("claim"))) {
      return {
        score: 98,
        status: "danger",
        category_en: "Government Subsidy Scam",
        category_kn: "ಸರ್ಕಾರಿ ಸವಲತ್ತು ಯೋಜನೆ ವಂಚನೆ",
        message_en: "CRITICAL DANGER: Fake Government Subsidy & Phishing Scam Detected!",
        message_kn: "ತೀವ್ರ ಅಪಾಯ: ನಕಲಿ ಸರ್ಕಾರಿ ಸಹಾಯಧನ ಮತ್ತು ವಂಚನೆಯ ಸಂದೇಶ ಪತ್ತೆಯಾಗಿದೆ!",
        details_en: [
          "This message asks for an upfront 'processing fee' or 'registration fee' to claim the government 'PM Awas Yojana' housing subsidy.",
          "FACT: The Government of India never asks for any upfront fees, processing charges, or UPI transfers to approve PM Awas Yojana.",
          "This is a classic 'advance-fee fraud' designed to steal money."
        ],
        details_kn: [
          "ಈ ಸಂದೇಶವು ಸರ್ಕಾರಿ 'ಪಿಎಂ ಆವಾಸ್ ಯೋಜನೆ' ವಸತಿ ಸಹಾಯಧನವನ್ನು ಪಡೆಯಲು ಮುಂಗಡ 'ಸಂಸ್ಕಾರ ಶುಲ್ಕ' ಕೇಳುತ್ತಿದೆ.",
          "ಸತ್ಯ: ಭಾರತ ಸರ್ಕಾರವು ಪಿಎಂ ಆವಾಸ್ ಯೋಜನೆಯನ್ನು ಅನುಮೋದಿಸಲು ಯಾವುದೇ ಮುಂಗಡ ಶುಲ್ಕಗಳನ್ನು ಕೇಳುವುದಿಲ್ಲ.",
          "ಇದು ಸರ್ಕಾರಿ ಸಹಾಯ ಪಡೆಯಲು ಬಯಸುವ ಗ್ರಾಮೀಣ ಜನರಿಂದ ಹಣವನ್ನು ದೋಚಲು ರೂಪಿಸಿದ ವಂಚನೆಯಾಗಿದೆ."
        ],
        steps_en: [
          "1. Do NOT pay any processing fee or registration fee.",
          "2. Delete this WhatsApp forward and warn your family members immediately.",
          "3. File a complaint on the official portal cybercrime.gov.in."
        ],
        steps_kn: [
          "1. ಯಾವುದೇ ಸಂಸ್ಕರಣಾ ಶುಲ್ಕ ಅಥವಾ ಮುಂಗಡ ಹಣವನ್ನು ಪಾವತಿಸಬೇಡಿ.",
          "2. ಈ ವಾಟ್ಸಾಪ್ ಸಂದೇಶವನ್ನು ತಕ್ಷಣ ಅಳಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಕುಟುಂಬದವರನ್ನು ಎಚ್ಚರಿಸಿ.",
          "3. ಅಧಿಕೃತ ಪೋರ್ಟಲ್ cybercrime.gov.in ನಲ್ಲಿ ದೂರು ದಾಖಲಿಸಿ."
        ]
      };
    }

    const kyc_keywords = ["kyc", "blocked", "suspended", "electricity", "power cut", "eb bill", "bank account", "pan card"];
    if (kyc_keywords.some(k => m.includes(k))) {
      return {
        score: 92,
        status: "danger",
        category_en: "KYC / Block Threat",
        category_kn: "ಕೆವೈಸಿ / ಬ್ಲಾಕ್ ಬೆದರಿಕೆ",
        message_en: "HIGH RISK: Urgent Account Block / Service Suspension Scam!",
        message_kn: "ಹೆಚ್ಚಿನ ಅಪಾಯ: ಖಾತೆ ಬ್ಲಾಕ್ ಅಥವಾ ವಿದ್ಯುತ್ ಸ್ಥಗಿತದ ಸುಳ್ಳು ಬೆದರಿಕೆ!",
        details_en: [
          "The message uses 'Urgency Tactics' threatening SIM card or electricity service block TONIGHT.",
          "Banks or Electricity Boards never send simple WhatsApp messages with personal phone numbers."
        ],
        details_kn: [
          "ನೀವು ತಕ್ಷಣ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡದಿದ್ದರೆ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಇಂದು ರಾತ್ರಿಯೇ ಕಡಿತಗೊಳ್ಳುತ್ತದೆ ಎಂದು ಬೆದರಿಸುವ ತಂತ್ರ ಬಳಸಲಾಗಿದೆ.",
          "ಬ್ಯಾಂಕುಗಳು ಅಥವಾ ಇಲಾಖೆಗಳು ವೈಯಕ್ತಿಕ ಫೋನ್ ಸಂಖ್ಯೆಗಳೊಂದಿಗೆ ಸಾಮಾನ್ಯ ವಾಟ್ಸಾಪ್ ಸಂದೇಶಗಳನ್ನು ಕಳುಹಿಸುವುದಿಲ್ಲ."
        ],
        steps_en: [
          "1. Do NOT click the link or call the personal phone number.",
          "2. Visit your local bank branch or electricity office directly to verify.",
          "3. Block the sender immediately."
        ],
        steps_kn: [
          "1. ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ ಅಥವಾ ಅದರಲ್ಲಿರುವ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಬೇಡಿ.",
          "2. ನೇರವಾಗಿ ನಿಮ್ಮ ಸ್ಥಳೀಯ ಬ್ಯಾಂಕ್ ಶಾಖೆ ಅಥವಾ ವಿದ್ಯುತ್ ಕಚೇರಿಗೆ ಹೋಗಿ ಪರಿಶೀಲಿಸಿ.",
          "3. ತಕ್ಷಣವೇ ಕಳುಹಿಸಿದವರನ್ನು ಬ್ಲಾಕ್ ಮಾಡಿ."
        ]
      };
    }

    return {
      score: 40,
      status: "caution",
      message_en: "CAUTION: Unverified message. Be cautious of forward forwards.",
      message_kn: "ಎಚ್ಚರಿಕೆ: ಪರಿಶೀಲಿಸದ ಸಂದೇಶ. ಮುನ್ನೆಚ್ಚರಿಕೆ ವಹಿಸಿ.",
      details_en: [
        "This message does not match known threat patterns directly, but remains unverified."
      ],
      details_kn: [
        "ಈ ಸಂದೇಶವು ನೇರವಾಗಿ ತಿಳಿದಿರುವ ಅಪಾಯದ ಮಾದರಿಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ."
      ]
    };
  };

  const getLocalOtpAnalysis = (otp) => {
    const o = otp.trim().toLowerCase();
    const otp_words = ["otp", "one time password", "verification", "code", "ಕೋಡ್", "ಒಟಿಪಿ", "ಪಿನ್", "pin", "ಪಾಸ್ವರ್ಡ್", "password"];
    
    if (otp_words.some(w => o.includes(w))) {
      return {
        score: 97,
        status: "danger",
        category_en: "OTP & Credential Fraud",
        category_kn: "ಒಟಿಪಿ ಮತ್ತು ವಿವರ ಕದಿಯುವ ವಂಚನೆ",
        message_en: "CRITICAL ALERT: OTP / Password Stealing Scam Detected!",
        message_kn: "ತೀವ್ರ ಎಚ್ಚರಿಕೆ: ಒಟಿಪಿ ಅಥವಾ ರಹಸ್ಯ ಪಿನ್ ಕದಿಯುವ ವಂಚನೆ ಪತ್ತೆಯಾಗಿದೆ!",
        details_en: [
          "The message asks you to share your OTP, secret banking PIN, or password.",
          "CRITICAL FACT: Official bank employees, police, or customer care will NEVER ask you for an OTP under any circumstances.",
          "Sharing OTP gives scammers complete access to empty your bank account instantly."
        ],
        details_kn: [
          "ಸಂದೇಶವು ನಿಮ್ಮ ಒಟಿಪಿ (OTP), ರಹಸ್ಯ ಬ್ಯಾಂಕಿಂಗ್ ಪಿನ್ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ಅನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ಕೇಳುತ್ತಿದೆ.",
          "ಪ್ರಮುಖ ಸತ್ಯ: ಅಧಿಕೃತ ಬ್ಯಾಂಕ್ ಸಿಬ್ಬಂದಿ ಅಥವಾ ಗ್ರಾಹಕ ಸೇವೆಯವರು ನಿಮ್ಮ ಒಟಿಪಿ ಸಂಖ್ಯೆಯನ್ನು ಎಂದಿಗೂ ಕೇಳುವುದಿಲ್ಲ.",
          "ವಂಚಕರು ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಯಿಂದ ತಕ್ಷಣ ಹಣ ದೋಚಲು ಒಟಿಪಿ ಕೇಳುತ್ತಾರೆ."
        ],
        steps_en: [
          "1. NEVER share this 4-digit or 6-digit code with anyone, even on phone calls.",
          "2. Hang up or ignore the message immediately. Block the number.",
          "3. If already shared, call your bank customer service immediately to lock your card and accounts."
        ],
        steps_kn: [
          "1. ಅವರು ಯಾರೇ ಎಂದು ಹೇಳಿಕೊಂಡರೂ ೪ ಅಥವಾ ೬ ಅಂಕಿಯ ಒಟಿಪಿ ಕೋಡ್ ಅನ್ನು ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.",
          "2. ತಕ್ಷಣ ಫೋನ್ ಕಟ್ ಮಾಡಿ ಅಥವಾ ಸಂದೇಶವನ್ನು ಬ್ಲಾಕ್ ಮಾಡಿ.",
          "3. ಈಗಾಗಲೇ ಹಂಚಿಕೊಂಡಿದ್ದರೆ, ತಕ್ಷಣ ಬ್ಯಾಂಕ್‌ಗೆ ಕರೆ ಮಾಡಿ ನಿಮ್ಮ ಖಾತೆಯನ್ನು ಬ್ಲಾಕ್ ಮಾಡಿಸಿ."
        ]
      };
    }
    return {
      score: 40,
      status: "caution",
      message_en: "CAUTION: Suspicious text block. Never share verification codes.",
      message_kn: "ಎಚ್ಚರಿಕೆ: ಶಂಕಾಸ್ಪದ ಸಂದೇಶ. ರಹಸ್ಯ ಸಂಖ್ಯೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.",
      details_en: [
        "This text contains a security warning request. Keep all verification details private."
      ],
      details_kn: [
        "ಈ ಸಂದೇಶವು ಭದ್ರತಾ ವಿನಂತಿಯನ್ನು ಹೊಂದಿರಬಹುದು. ರಹಸ್ಯ ವಿವರಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿರಿಸಿ."
      ]
    };
  };

  const getLocalLoanAnalysis = (loan) => {
    const l = loan.trim().toLowerCase();
    const predatory = ["cashexpress", "quickloan", "fastrupee", "instacash", "easyloan", "rupeeplus", "speedloan", "pocketmoney", "loan", "rupee"];
    
    if (predatory.some(k => l.includes(k))) {
      return {
        score: 96,
        status: "danger",
        category_en: "Predatory Loan App Scam",
        category_kn: "ಕಾನೂನುಬಾಹಿರ ಲೂಟಿ ಸಾಲದ ಆಪ್ ವಂಚನೆ",
        message_en: "CRITICAL WARNING: High-Risk Predatory / Illegal Lending App Detected!",
        message_kn: "ತೀವ್ರ ಎಚ್ಚರಿಕೆ: ಹೆಚ್ಚಿನ ಅಪಾಯದ ಕಾನೂನುಬಾಹಿರ ಕಬಳಿಸುವ ಸಾಲದ ಆಪ್ ಪತ್ತೆಯಾಗಿದೆ!",
        details_en: [
          "This loan app operates illegally and is not registered with the Reserve Bank of India (RBI).",
          "Predatory loan apps charge extremely high interest rates (weekly double rates) and levy hidden charges.",
          "Crucially: These apps steal your private phone contacts and photos to blackmail and harass your family members."
        ],
        details_kn: [
          "ಈ ಸಾಲದ ಆಪ್ ಕಾನೂನುಬಾಹಿರವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ ಮತ್ತು ಆರ್‌ಬಿಐ (RBI) ನಲ್ಲಿ ನೋಂದಾಯಿಸಲ್ಪಟ್ಟಿಲ್ಲ.",
          "ಇವುಗಳು ಅತ್ಯಂತ ಹೆಚ್ಚಿನ ಕಾನೂನುಬಾಹಿರ ಬಡ್ಡಿದರಗಳನ್ನು ವಿಧಿಸುತ್ತವೆ (ಸಾಮಾನ್ಯವಾಗಿ ೭ ದಿನಗಳಲ್ಲಿ ದುಪ್ಪಟ್ಟು).",
          "ಮುಖ್ಯವಾಗಿ: ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡುವಾಗ ಇವು ನಿಮ್ಮ ಸಂಪರ್ಕ ಪಟ್ಟಿ ಕದ್ದು, ನಂತರ ಬ್ಲಾಕ್‌ಮೇಲ್ ಮಾಡಲು ಕುಟುಂಬದವರಿಗೆ ಹೆದರಿಸಿ ಬೆದರಿಸುತ್ತವೆ."
        ],
        steps_en: [
          "1. Do NOT download or install this app from any store or link.",
          "2. If installed, immediately uninstall it, backup your phone, and perform a factory reset.",
          "3. Alert your phone contacts that your details were compromised by a fraud app."
        ],
        steps_kn: [
          "1. ಯಾವುದೇ ಆಪ್ ಸ್ಟೋರ್‌ನಿಂದ ಈ ಆ್ಯಪ್ ಅನ್ನು ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಬೇಡಿ.",
          "2. ಈಗಾಗಲೇ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿದ್ದರೆ, ತಕ್ಷಣ ಅನ್‌ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ, ಫೋನ್ ರಿಸೆಟ್ ಮಾಡಿ.",
          "3. ಈ ಆ್ಯಪ್‌ನಿಂದ ನಿಮ್ಮ ಸಂಪರ್ಕ ವಿವರ ಸೋರಿಕೆಯಾಗಿದೆ ಎಂದು ನಿಮ್ಮ ಪಟ್ಟಿಯಲ್ಲಿರುವವರಿಗೆ ಎಚ್ಚರಿಸಿ."
        ],
        alternatives_en: [
          "PM-SVANidhi Scheme: Official government zero-collateral loan up to ₹10,000 for street vendors.",
          "Mudra Loans: Official micro-business financing scheme via public banks (SBI, Canara Bank).",
          "Local Cooperative Credit Society: Registered local cooperative credit society with fair interest."
        ],
        alternatives_kn: [
          "ಪಿಎಂ-ಸ್ವನಿಧಿ ಯೋಜನೆ: ಸಣ್ಣ ಬೀದಿ ವ್ಯಾಪಾರಿಗಳಿಗಾಗಿ ಸರ್ಕಾರದ ಶೂನ್ಯ-ಜಾಮೀನು ₹೧೦,೦೦೦ ರವರೆಗಿನ ಅಧಿಕೃತ ಸಾಲ.",
          "ಮುದ್ರಾ ಸಾಲ: ಸಾರ್ವಜನಿಕ ಬ್ಯಾಂಕ್‌ಗಳ ಮೂಲಕ ಅಧಿಕೃತ ಕಿರು ವ್ಯವಹಾರ ಧನಸಹಾಯ ಯೋಜನೆ (SBI, Canara Bank).",
          "ಸ್ಥಳೀಯ ಸಹಕಾರಿ ಪತ್ತಿನ ಸಂಘ: ನೋಂದಾಯಿತ ಸ್ಥಳೀಯ ಸಹಕಾರಿ ಪತ್ತಿನ ಸಂಘದ ಸಾಲಗಳು."
        ]
      };
    }
    return {
      score: 40,
      status: "caution",
      message_en: "CAUTION: Unverified App. Verify RBI NBFC registration before borrowing.",
      message_kn: "ಎಚ್ಚರಿಕೆ: ಪರಿಶೀಲಿಸದ ಸಾಲದ ಸಂಸ್ಥೆ. ನೋಂದಣಿ ದೃಢೀಕರಿಸಿ.",
      details_en: [
        "Always verify that the lending app is officially partnered with an RBI registered NBFC before uploading ID documents."
      ],
      details_kn: [
        "ನಿಮ್ಮ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡುವ ಮೊದಲು ಸಾಲ ನೀಡುವ ಆಪ್ ಆರ್‌ಬಿಐ ನೋಂದಾಯಿತ ಎನ್‌ಬಿಎಫ್‌ಸಿ ಜೊತೆ ಪಾಲುದಾರಿಕೆ ಹೊಂದಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ."
      ]
    };
  };

  // -------------------------------------------------------------
  // API Call Actions
  // -------------------------------------------------------------
  const handleCheckUpi = async (e, directVal = null) => {
    if (e) e.preventDefault();
    const val = directVal !== null ? directVal : upiInput;
    if (!val.trim()) return;

    setUpiLoading(true);
    setUpiResult(null);
    stopAudio();

    try {
      const response = await fetch(`${API_URL}/api/analyze-upi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ upi: val, user_id: user?.id })
      });
      if (!response.ok) throw new Error("Offline");
      const data = await response.json();
      setUpiResult(data);
    } catch (err) {
      console.warn("Using local rules:", err);
      setTimeout(() => setUpiResult(getLocalUpiAnalysis(val)), 500);
    } finally {
      setUpiLoading(false);
      setTimeout(() => fetchRecentScans(user?.id), 800);
    }
  };

  async function handleCheckQr(e, directVal = null) {
    if (e) e.preventDefault();
    const val = directVal !== null ? directVal : qrInput;
    if (!val.trim()) return;

    setQrLoading(true);
    setQrResult(null);
    stopAudio();

    try {
      const response = await fetch(`${API_URL}/api/analyze-qr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qr: val, user_id: user?.id })
      });
      if (!response.ok) throw new Error("Offline");
      const data = await response.json();
      setQrResult(data);
    } catch (err) {
      console.warn("Using local rules:", err);
      setTimeout(() => setQrResult(getLocalQrAnalysis(val)), 500);
    } finally {
      setQrLoading(false);
      setTimeout(() => fetchRecentScans(user?.id), 800);
    }
  }

  const handleCheckMessage = async (e, directVal = null) => {
    if (e) e.preventDefault();
    const val = directVal !== null ? directVal : messageInput;
    if (!val.trim()) return;

    setMessageLoading(true);
    setMessageResult(null);
    stopAudio();

    try {
      const response = await fetch(`${API_URL}/api/analyze-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: val, user_id: user?.id })
      });
      if (!response.ok) throw new Error("Offline");
      const data = await response.json();
      setMessageResult(data);
    } catch (err) {
      console.warn("Using local rules:", err);
      setTimeout(() => setMessageResult(getLocalMessageAnalysis(val)), 500);
    } finally {
      setMessageLoading(false);
      setTimeout(() => fetchRecentScans(user?.id), 800);
    }
  };

  const handleCheckOtp = async (e, directVal = null) => {
    if (e) e.preventDefault();
    const val = directVal !== null ? directVal : otpInput;
    if (!val.trim()) return;

    setOtpLoading(true);
    setOtpResult(null);
    stopAudio();

    try {
      const response = await fetch(`${API_URL}/api/analyze-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: val, user_id: user?.id })
      });
      if (!response.ok) throw new Error("Offline");
      const data = await response.json();
      setOtpResult(data);
    } catch (err) {
      console.warn("Using local rules:", err);
      setTimeout(() => setOtpResult(getLocalOtpAnalysis(val)), 500);
    } finally {
      setOtpLoading(false);
      setTimeout(() => fetchRecentScans(user?.id), 800);
    }
  };

  const handleCheckLoan = async (e, directVal = null) => {
    if (e) e.preventDefault();
    const val = directVal !== null ? directVal : loanInput;
    if (!val.trim()) return;

    setLoanLoading(true);
    setLoanResult(null);
    stopAudio();

    try {
      const response = await fetch(`${API_URL}/api/analyze-loan-app`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ app: val, user_id: user?.id })
      });
      if (!response.ok) throw new Error("Offline");
      const data = await response.json();
      setLoanResult(data);
    } catch (err) {
      console.warn("Using local rules:", err);
      setTimeout(() => setLoanResult(getLocalLoanAnalysis(val)), 500);
    } finally {
      setLoanLoading(false);
      setTimeout(() => fetchRecentScans(user?.id), 800);
    }
  };

  // Mock File Upload Reader
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const fname = file.name.toLowerCase();
    
    // Auto simulate qr text scan depending on filename
    let simulatedText = "upi://pay?pa=merchant@icici&pn=VerifiedMerchant";
    if (fname.includes("pmkisan") || fname.includes("scam") || fname.includes("relief") || fname.includes("awas")) {
      simulatedText = "upi://pay?pa=pmkisan-relief@ybl&pn=PMKisanRelief";
    }

    setQrInput(simulatedText);
    handleCheckQr(null, simulatedText);
  };

  const handleSimulatePayment = (e) => {
    e.preventDefault();
    if (!simRecipient.trim() || !simAmount.trim()) return;

    const amt = parseFloat(simAmount);
    setSimMessage('');
    
    if (amt > 5000) {
      setConfirmChecks({
        knowPerson: false,
        noThreat: false,
        noPrize: false
      });
      setShowNudgeModal(true);
    } else {
      setSimMessage(activeTranslations.nudge.verifySuccess);
    }
  };

  const handleConfirmNudge = () => {
    setShowNudgeModal(false);
    const msg = lang === 'en' 
      ? `✅ Payment practice approved: Transfer of ₹${simAmount} to ${simRecipient} successfully simulated! Keep these safety rules in mind.`
      : `✅ ಪಾವತಿ ಅಭ್ಯಾಸ ಯಶಸ್ವಿಯಾಗಿದೆ: ${simRecipient} ಗೆ ₹${simAmount} ಕಳುಹಿಸುವ ಪ್ರಾಯೋಗಿಕ ವರ್ಗಾವಣೆ ಯಶಸ್ವಿ! ಈ ರಕ್ಷಣಾ ನಿಯಮಗಳನ್ನು ನೆನಪಿಡಿ.`;
    setSimMessage(msg);
  };

  const extractUpiId = (input) => {
    if (!input) return '';
    const trimmed = input.trim();
    if (trimmed.includes('pa=')) {
      const match = trimmed.match(/[?&]pa=([^&]+)/);
      if (match) {
        try {
          return decodeURIComponent(match[1]).trim();
        } catch {
          return match[1].trim();
        }
      }
    }
    return trimmed;
  };

  const extractMerchantName = (input) => {
    if (!input) return 'Merchant';
    const trimmed = input.trim();
    if (trimmed.includes('pn=')) {
      const match = trimmed.match(/[?&]pn=([^&]+)/);
      if (match) {
        try {
          return decodeURIComponent(match[1]).trim();
        } catch {
          return match[1].trim();
        }
      }
    }
    return 'Merchant';
  };

  const handlePayRedirect = (app, rawInput) => {
    const upiId = extractUpiId(rawInput);
    if (!upiId) {
      alert(lang === 'en' ? "Could not find a valid UPI ID to pay." : "ಪಾವತಿಸಲು ಮಾನ್ಯವಾದ UPI ID ಕಂಡುಬಂದಿಲ್ಲ.");
      return;
    }

    const pn = extractMerchantName(rawInput);
    const literalUpiId = upiId;
    const encodedPn = encodeURIComponent(pn);

    const infoText = activeTranslations.upgrades.payTriggered.replace("[App]", app);
    alert(infoText);

    let deepLinkUrl;
    let playStoreUrl;

    switch (app) {
      case 'GPay':
        deepLinkUrl = `tez://upi/pay?pa=${literalUpiId}&pn=${encodedPn}`;
        playStoreUrl = 'https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.paisa.user';
        break;
      case 'PhonePe':
        deepLinkUrl = `phonepe://pay?pa=${literalUpiId}`;
        playStoreUrl = 'https://play.google.com/store/apps/details?id=com.phonepe.app';
        break;
      case 'Paytm':
        deepLinkUrl = `paytmmp://pay?pa=${literalUpiId}`;
        playStoreUrl = 'https://play.google.com/store/apps/details?id=net.one97.paytm';
        break;
      case 'BHIM UPI':
        deepLinkUrl = `upi://pay?pa=${literalUpiId}`;
        playStoreUrl = 'https://play.google.com/store/apps/details?id=in.org.npci.upiapp';
        break;
      default:
        return;
    }

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (!isMobile) {
      window.open(playStoreUrl, '_blank');
    } else {
      const start = Date.now();
      window.location.href = deepLinkUrl;
      setTimeout(() => {
        if (!document.hidden && Date.now() - start < 3000) {
          window.location.href = playStoreUrl;
        }
      }, 2000);
    }
  };

  const getStatusColorClasses = (status) => {
    switch (status) {
      case 'safe':
        return {
          bg: 'bg-emerald-50 border-emerald-300 text-emerald-950',
          badge: 'bg-emerald-500 text-white',
          text: 'text-emerald-700',
          accent: 'border-emerald-500',
          meter: 'bg-emerald-500'
        };
      case 'caution':
        return {
          bg: 'bg-amber-50 border-amber-300 text-amber-950',
          badge: 'bg-amber-500 text-slate-900',
          text: 'text-amber-700',
          accent: 'border-amber-500',
          meter: 'bg-amber-500'
        };
      case 'danger':
      default:
        return {
          bg: 'bg-rose-50 border-rose-300 text-rose-950',
          badge: 'bg-rose-500 text-white',
          text: 'text-rose-700',
          accent: 'border-rose-500',
          meter: 'bg-rose-600'
        };
    }
  };

  // Upgraded Result Card Component
  const renderResultCard = (result, type, rawInput) => {
    if (!result) return null;
    const styles = getStatusColorClasses(result.status);
    
    // Auto populate steps if danger but backend didn't supply them
    const steps = lang === 'en'
      ? (result.steps_en || [
          "1. Do NOT click any links or scan this QR again.",
          "2. Delete the sender's message and block them immediately.",
          "3. Warn family members not to trust this scheme."
        ])
      : (result.steps_kn || [
          "1. ಯಾವುದೇ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ ಅಥವಾ ಕ್ಯೂಆರ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಬೇಡಿ.",
          "2. ಕಳುಹಿಸಿದವರ ಸಂದೇಶವನ್ನು ಅಳಿಸಿ ತಕ್ಷಣವೇ ಬ್ಲಾಕ್ ಮಾಡಿ.",
          "3. ಈ ಸುಳ್ಳು ಯೋಜನೆಯನ್ನು ನಂಬದಂತೆ ಕುಟುಂಬದವರಿಗೆ ಎಚ್ಚರಿಸಿ."
        ]);

    const displayCategory = lang === 'en' ? result.category_en : result.category_kn;
    const alternatives = lang === 'en' ? result.alternatives_en : result.alternatives_kn;

    return (
      <div className={`mt-6 rounded-3xl p-5 border-2 ${styles.bg} shadow-lg space-y-6 transition-all duration-300`}>
        
        {/* Scanned QR Content Indicator */}
        {type === 'qr' && (
          <div className="bg-slate-100 border border-slate-300 rounded-2xl p-4.5">
            <h5 className="text-sm font-black uppercase tracking-wider text-slate-600 mb-1.5">
              {lang === 'en' ? "🔍 Found Inside QR Code:" : "🔍 ಕ್ಯೂಆರ್ ಕೋಡ್‌ನಲ್ಲಿ ಪತ್ತೆಯಾದ ಮಾಹಿತಿ:"}
            </h5>
            <p className="text-base font-extrabold text-slate-800 break-all select-all">
              {rawInput}
            </p>
          </div>
        )}
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6 pb-5 border-b border-black/10">
          
          {/* Speedometer Visualizer */}
          <div className="flex flex-col items-center">
            <div className="gauge-container">
              <div className="gauge-body"></div>
              <div 
                className={`gauge-fill ${styles.meter}`}
                style={{ transform: `rotate(${result.score * 1.8}deg)` }}
              ></div>
              <div className="gauge-cover">
                <span className="text-2xl font-black text-slate-800">{result.score}</span>
                <span className="text-xs font-bold text-slate-500 ml-0.5 mb-1">/100</span>
              </div>
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 mt-2">
              {activeTranslations.upi.riskScore}
            </span>
          </div>

          {/* Verdict Box */}
          <div className="text-center sm:text-right flex flex-col items-center sm:items-end gap-2">
            
            {/* Scam Type Badge for RED alerts */}
            {result.status === 'danger' && displayCategory && (
              <span className="text-xs font-black uppercase tracking-widest text-rose-600 bg-rose-100 border border-rose-300 px-3 py-1 rounded-full animate-pulse">
                {activeTranslations.upgrades.scamCategory} {displayCategory}
              </span>
            )}

            <span className={`text-lg sm:text-xl font-black px-5 py-2 rounded-full ${styles.badge}`}>
              {result.status === 'safe' && activeTranslations.upi.verdicts.safe}
              {result.status === 'caution' && activeTranslations.upi.verdicts.caution}
              {result.status === 'danger' && activeTranslations.upi.verdicts.danger}
            </span>
            
            <p className="text-base sm:text-lg font-extrabold max-w-sm">
              {lang === 'en' ? result.message_en : result.message_kn}
            </p>
          </div>
        </div>

        {/* Explainers list */}
        <div className="space-y-3">
          <h4 className="text-base font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <ShieldAlert className="w-5 h-5 text-slate-600" />
            {activeTranslations.upi.warningTitle}
          </h4>
          <ul className="space-y-3.5 pl-2">
            {(lang === 'en' ? result.details_en : result.details_kn).map((detail, idx) => (
              <li key={idx} className="text-base sm:text-lg font-bold flex items-start gap-2.5">
                <span className="text-emerald-600 text-lg mt-0.5">🔹</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Upgraded Feature 5: RED (Danger) Action Checklist and Report button */}
        {result.status === 'danger' && (
          <div className="space-y-4 pt-4 border-t border-black/10">
            <div className="bg-rose-100/90 border border-rose-300 rounded-2xl p-4.5 space-y-3">
              <h5 className="text-base sm:text-lg font-black text-rose-950 flex items-center gap-2">
                <AlertOctagon className="w-6 h-6 text-rose-600 animate-bounce" />
                {activeTranslations.upgrades.recoveryTitle}
              </h5>
              
              <div className="grid grid-cols-1 gap-2.5 pl-1.5">
                {steps.map((step, idx) => (
                  <p key={idx} className="text-base sm:text-lg font-extrabold text-rose-900">
                    {step}
                  </p>
                ))}
              </div>
            </div>

            {/* Direct Official Reporting Portal Trigger */}
            <button
              onClick={() => {
                handleReportScam(rawInput, displayCategory || "Scam Detected");
                window.open("https://cybercrime.gov.in", "_blank");
              }}
              className="w-full bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 active:scale-95 transition-all text-white font-black py-4.5 rounded-2xl text-base sm:text-lg shadow-md border-2 border-red-500 flex items-center justify-center gap-2.5 cursor-pointer text-center"
            >
              <span>🚨</span>
              <span>{activeTranslations.upgrades.reportLabel}</span>
            </button>
          </div>
        )}

        {/* Upgraded Loan Alternatives Block */}
        {type === 'loan' && alternatives && alternatives.length > 0 && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4.5 space-y-3 pt-4">
            <h5 className="text-base sm:text-lg font-black text-emerald-950 flex items-center gap-2">
              <LifeBuoy className="w-6 h-6 text-emerald-600" />
              {activeTranslations.loan.altsLabel}
            </h5>
            <ul className="space-y-2.5 pl-2.5">
              {alternatives.map((alt, idx) => (
                <li key={idx} className="text-base font-extrabold text-emerald-900 flex items-start gap-2">
                  <span className="text-emerald-600">🌿</span>
                  <span>{alt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Upgraded Feature 4: GREEN (Safe) official checkout launchers and PIN alert */}
        {result.status === 'safe' && (
          <div className="space-y-4 pt-4 border-t border-black/10">
            <div className="bg-emerald-100/90 border border-emerald-300 rounded-2xl p-4.5 space-y-4">
              <h5 className="text-base sm:text-lg font-black text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                {activeTranslations.upgrades.safePayTitle}
              </h5>
              <p className="text-sm font-bold text-emerald-800">
                {activeTranslations.upgrades.safePayMsg}
              </p>

              {/* Payment brand buttons row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => handlePayRedirect('GPay', rawInput)}
                  className="bg-[#4285F4] hover:bg-[#357ae8] text-white font-black py-3.5 rounded-xl text-base shadow-sm border border-blue-400 transition-all active:scale-95 text-center cursor-pointer"
                >
                  Pay via GPay
                </button>
                <button
                  onClick={() => handlePayRedirect('PhonePe', rawInput)}
                  className="bg-[#5f259f] hover:bg-[#4d1e82] text-white font-black py-3.5 rounded-xl text-base shadow-sm border border-purple-400 transition-all active:scale-95 text-center cursor-pointer"
                >
                  PhonePe
                </button>
                <button
                  onClick={() => handlePayRedirect('Paytm', rawInput)}
                  className="bg-[#00baf2] hover:bg-[#009ed1] text-white font-black py-3.5 rounded-xl text-base shadow-sm border border-sky-400 transition-all active:scale-95 text-center cursor-pointer"
                >
                  Paytm
                </button>
                <button
                  onClick={() => handlePayRedirect('BHIM UPI', rawInput)}
                  className="bg-[#e47911] hover:bg-[#cc6c0d] text-white font-black py-3.5 rounded-xl text-base shadow-sm border border-orange-400 transition-all active:scale-95 text-center cursor-pointer"
                >
                  BHIM UPI
                </button>
              </div>
            </div>

            {/* Verification critical warning banner */}
            <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-4.5">
              <p className="text-base sm:text-lg font-black text-amber-950 leading-snug">
                {activeTranslations.upgrades.verifyTip}
              </p>
            </div>
          </div>
        )}

        {/* Upgraded Feature: Emergency Actions block for Danger (RED) or Caution (YELLOW) */}
        {(result.status === 'danger' || result.status === 'caution') && (
          <div className="space-y-4 pt-4 border-t border-black/10">
            <div className="bg-red-50/80 border border-red-200 rounded-3xl p-5 space-y-4 shadow-sm">
              <h5 className="text-base sm:text-lg font-black text-red-950 flex items-center gap-2">
                <span>🚨</span>
                <span>{activeTranslations.emergency.title}</span>
              </h5>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. BLOCK PAYMENT */}
                <button
                  onClick={() => alert(lang === 'en' ? "Close your payment app immediately" : "ನಿಮ್ಮ ಪಾವತಿ ಆಪ್ ಅನ್ನು ತಕ್ಷಣವೇ ಮುಚ್ಚಿ")}
                  className="w-full bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white font-black py-4.5 rounded-2xl text-base sm:text-lg shadow-md border border-red-500 flex flex-col items-center justify-center p-3.5 cursor-pointer text-center"
                >
                  <span className="text-xl sm:text-2xl mb-1">🛑</span>
                  <span className="font-extrabold">{activeTranslations.emergency.blockBtn}</span>
                  <span className="text-xs font-bold opacity-90 mt-1">{activeTranslations.emergency.blockDesc}</span>
                </button>

                {/* 2. REPORT FRAUD */}
                <button
                  onClick={() => {
                    alert(lang === 'en' ? "Report this fraud to Indian Cyber Crime portal" : "ಈ ವಂಚನೆಯನ್ನು ಭಾರತೀಯ ಸೈಬರ್ ಕ್ರೈಮ್ ಪೋರ್ಟಲ್‌ಗೆ ವರದಿ ಮಾಡಿ");
                    window.open("https://cybercrime.gov.in", "_blank");
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white font-black py-4.5 rounded-2xl text-base sm:text-lg shadow-md border border-orange-400 flex flex-col items-center justify-center p-3.5 cursor-pointer text-center"
                >
                  <span className="text-xl sm:text-2xl mb-1">🚨</span>
                  <span className="font-extrabold">{activeTranslations.emergency.reportBtn}</span>
                  <span className="text-xs font-bold opacity-90 mt-1">{activeTranslations.emergency.reportDesc}</span>
                </button>

                {/* 3. CALL 1930 */}
                <a
                  href="tel:1930"
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white font-black py-4.5 rounded-2xl text-base sm:text-lg shadow-md border border-blue-500 flex flex-col items-center justify-center p-3.5 cursor-pointer text-center no-underline decoration-transparent"
                >
                  <span className="text-xl sm:text-2xl mb-1">📞</span>
                  <span className="font-extrabold">{activeTranslations.emergency.callBtn}</span>
                  <span className="text-xs font-bold opacity-90 mt-1">{activeTranslations.emergency.callDesc}</span>
                  <span className="text-[10px] font-bold opacity-80 mt-0.5">{activeTranslations.emergency.callSub}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Text-To-Speech Speaker Button */}
        <div className="pt-2 flex justify-center sm:justify-start">
          {isPlayingAudio ? (
            <button
              onClick={stopAudio}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 active:scale-95 text-white font-bold px-6 py-3 rounded-2xl text-base shadow-md border-2 border-slate-700 cursor-pointer"
            >
              <VolumeX className="w-6 h-6 animate-pulse text-rose-400" />
              <span>{activeTranslations.upi.audioStop}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                let speechText = lang === 'en'
                  ? `${result.message_en}. reasons. ${result.details_en.join('. ')}`
                  : `${result.message_kn}. ಕಾರಣಗಳು. ${result.details_kn.join('. ')}`;
                
                if (result.status === 'danger') {
                  const safetyStepsSpeech = lang === 'en'
                    ? `. Recovery action steps: ${steps.join('. ')}`
                    : `. ತಕ್ಷಣ ನೀವು ಮಾಡಬೇಕಾದ ೩ ಕೆಲಸಗಳು: ${steps.join('. ')}`;
                  speechText += safetyStepsSpeech;
                }
                
                if (type === 'loan' && alternatives) {
                  const alternativesSpeech = lang === 'en'
                    ? `. Safer official alternatives: ${alternatives.join('. ')}`
                    : `. ಸುರಕ್ಷಿತ ಅಧಿಕೃತ ಪರ್ಯಾಯಗಳು: ${alternatives.join('. ')}`;
                  speechText += alternativesSpeech;
                }

                playTTS(speechText, lang);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-base sm:text-lg shadow-md border-2 border-amber-400 cursor-pointer"
            >
              <Volume2 className="w-6 h-6 text-slate-950 animate-bounce" />
              <span>{activeTranslations.upi.audioBtn}</span>
            </button>
          )}
        </div>

      </div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-grid-pattern bg-[#fcfdfa] pb-12 flex flex-col font-sans">
        {/* Dynamic Header */}
        <header className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-800 text-white shadow-lg z-30">
          <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-full safety-pulse">
                <QrCode className="w-8 h-8 text-emerald-200" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2">
                  {activeTranslations.title}
                </h1>
                <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                  {activeTranslations.subtitle}
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setLang(lang === 'en' ? 'kn' : 'en')}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 active:scale-95 transition-all text-slate-950 font-bold px-5 py-2.5 rounded-full text-base shadow-md border-2 border-amber-300 cursor-pointer"
            >
              <span>🔄</span>
              {lang === 'en' ? 'ಕನ್ನಡದಲ್ಲಿ ಓದಿ (ಕನ್ನಡ)' : 'Read in English (ಇಂಗ್ಲಿಷ್)'}
            </button>
          </div>
        </header>

        {/* Auth Forms Panel */}
        <main className="flex-grow max-w-md w-full mx-auto px-4 mt-12 flex items-center justify-center">
          <div className="w-full bg-white/85 backdrop-blur-xl border border-emerald-100 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* Soft background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-3xl opacity-50 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-100 rounded-full blur-3xl opacity-50 -z-10"></div>

            {authView === 'login' ? (
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mb-2 flex items-center gap-2">
                  🛡️ {activeTranslations.auth.loginTitle}
                </h2>
                <p className="text-sm font-medium text-slate-500 mb-6">
                  {activeTranslations.auth.loginSubtitle}
                </p>

                {authError && (
                  <div className="mb-5 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-bold">
                    ⚠️ {authError}
                  </div>
                )}

                <form onSubmit={handlePhoneLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">
                      {activeTranslations.auth.phoneLabel}
                    </label>
                    <input
                      type="text"
                      value={authPhone}
                      onChange={(e) => setAuthPhone(e.target.value)}
                      placeholder={activeTranslations.auth.phonePlaceholder}
                      className="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-slate-800 placeholder-slate-400 font-bold px-4 py-3 rounded-2xl transition-all outline-none text-base"
                      required
                    />
                    <p className="text-[10px] text-slate-400 mt-1 font-semibold">
                      {activeTranslations.auth.phoneFormatHint}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">
                      {activeTranslations.auth.passwordLabel}
                    </label>
                    <input
                      type="password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder={activeTranslations.auth.passwordPlaceholder}
                      className="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-slate-800 placeholder-slate-400 font-bold px-4 py-3 rounded-2xl transition-all outline-none text-base"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 active:scale-[0.98] disabled:opacity-50 text-white font-extrabold text-lg px-6 py-4 rounded-2xl shadow-lg cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    {authLoading ? activeTranslations.upi.checking : activeTranslations.auth.btnLogin}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => {
                      setAuthView('signup');
                      setAuthError('');
                    }}
                    className="text-emerald-600 hover:text-emerald-700 font-bold text-sm bg-none border-none cursor-pointer outline-none hover:underline"
                  >
                    {activeTranslations.auth.switchSignup}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mb-2 flex items-center gap-2">
                  🌿 {activeTranslations.auth.signupTitle}
                </h2>
                <p className="text-sm font-medium text-slate-500 mb-6">
                  {activeTranslations.auth.signupSubtitle}
                </p>

                {authError && (
                  <div className="mb-5 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-bold">
                    ⚠️ {authError}
                  </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">
                      {activeTranslations.auth.nameLabel}
                    </label>
                    <input
                      type="text"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder={activeTranslations.auth.namePlaceholder}
                      className="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-slate-800 placeholder-slate-400 font-bold px-4 py-3 rounded-2xl transition-all outline-none text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">
                      {activeTranslations.auth.phoneLabel}
                    </label>
                    <input
                      type="text"
                      value={authPhone}
                      onChange={(e) => setAuthPhone(e.target.value)}
                      placeholder={activeTranslations.auth.phonePlaceholder}
                      className="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-slate-800 placeholder-slate-400 font-bold px-4 py-3 rounded-2xl transition-all outline-none text-base"
                      required
                    />
                    <p className="text-[10px] text-slate-400 mt-1 font-semibold">
                      {activeTranslations.auth.phoneFormatHint}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">
                      {activeTranslations.auth.villageLabel}
                    </label>
                    <input
                      type="text"
                      value={authVillage}
                      onChange={(e) => setAuthVillage(e.target.value)}
                      placeholder={activeTranslations.auth.villagePlaceholder}
                      className="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-slate-800 placeholder-slate-400 font-bold px-4 py-3 rounded-2xl transition-all outline-none text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">
                      {activeTranslations.auth.passwordLabel}
                    </label>
                    <input
                      type="password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder={activeTranslations.auth.passwordPlaceholder}
                      className="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-slate-800 placeholder-slate-400 font-bold px-4 py-3 rounded-2xl transition-all outline-none text-base"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 active:scale-[0.98] disabled:opacity-50 text-white font-extrabold text-lg px-6 py-4 rounded-2xl shadow-lg cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    {authLoading ? activeTranslations.upi.checking : activeTranslations.auth.btnSignup}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => {
                      setAuthView('login');
                      setAuthError('');
                    }}
                    className="text-emerald-600 hover:text-emerald-700 font-bold text-sm bg-none border-none cursor-pointer outline-none hover:underline"
                  >
                    {activeTranslations.auth.switchLogin}
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

        <footer className="mt-12 text-center py-6 border-t border-slate-100 max-w-4xl mx-auto px-4 text-xs sm:text-sm font-bold text-slate-400">
          {activeTranslations.footer}
        </footer>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-grid-pattern pb-12 flex flex-col font-sans transition-all duration-300 ${darkMode ? 'bg-slate-950 text-slate-100 dark-theme-styles' : 'bg-[#fcfdfa] text-slate-900'} ${largeText ? 'large-text-styles text-lg' : ''}`}>
      
      {/* Dynamic Header */}
      <header className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-800 text-white shadow-lg sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-full safety-pulse">
              <QrCode className="w-8 h-8 text-emerald-200" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2">
                {activeTranslations.title}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                {activeTranslations.subtitle}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {/* User Profile Panel inside Header */}
            <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-2 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-extrabold text-sm shadow-sm select-none">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
                  {activeTranslations.auth.welcome}!
                </p>
                <p className="text-sm font-black text-white">
                  {user.name} <span className="text-[10px] bg-emerald-500/30 text-emerald-200 font-bold px-2 py-0.5 rounded-full ml-1 select-none">📍 {user.village}</span>
                </p>
              </div>
            </div>

            {/* Accessibility Buttons inline next to Kannada Toggle */}
            <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-2xl border border-white/15">
              {/* 1. Dark Mode Toggle */}
              <button 
                onClick={toggleDarkMode}
                title={lang === 'en' ? "Toggle Dark Mode" : "ಕಪ್ಪು ವಿನ್ಯಾಸ ಬದಲಿಸಿ"}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95 cursor-pointer text-base ${darkMode ? 'bg-indigo-600 text-white border border-indigo-400' : 'bg-transparent text-emerald-100 hover:bg-white/10'}`}
              >
                🌙
              </button>

              {/* 2. Large Text Mode Toggle */}
              <button 
                onClick={toggleLargeText}
                title={lang === 'en' ? "Toggle Large Text" : "ದೊಡ್ಡ ಅಕ್ಷರ ಶೈಲಿ"}
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm transition-all active:scale-95 cursor-pointer ${largeText ? 'bg-teal-500 text-white border border-teal-300' : 'bg-transparent text-emerald-100 hover:bg-white/10'}`}
              >
                A+
              </button>

              {/* 3. Text to Speech reads result */}
              <button 
                onClick={handleHeaderTTS}
                title={lang === 'en' ? "Listen to Verdict" : "ಫಲಿತಾಂಶ ಆಲಿಸಿ"}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95 cursor-pointer text-base ${isPlayingAudio ? 'bg-amber-500 text-slate-950 border border-amber-300 animate-pulse' : 'bg-transparent text-emerald-100 hover:bg-white/10'}`}
              >
                🔊
              </button>
            </div>

            <button 
              onClick={() => setLang(lang === 'en' ? 'kn' : 'en')}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 active:scale-95 transition-all text-slate-950 font-black px-4 py-2 rounded-2xl text-sm shadow-md border-2 border-amber-300 cursor-pointer"
            >
              🔄 {lang === 'en' ? 'ಕನ್ನಡ' : 'English'}
            </button>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-1 bg-rose-600 hover:bg-rose-700 active:scale-95 transition-all text-white font-black px-4 py-2 rounded-2xl text-sm shadow-md border border-rose-500 cursor-pointer"
            >
              🚪 {activeTranslations.auth.logout}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Welcome Banner */}
      <section className="bg-emerald-50 border-b border-emerald-100 py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <h2 className="text-lg sm:text-xl font-bold text-emerald-950 text-center md:text-left flex-grow">
            👋 {activeTranslations.tagline}
          </h2>
          
          <div className="bg-white border-2 border-emerald-300 rounded-2xl px-5 py-2.5 shadow-sm flex items-center gap-3 shrink-0 animate-pulse">
            <span className="text-2xl">🛡️</span>
            <div className="text-left">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                {lang === 'en' ? 'Community Safety' : 'ಸಮುದಾಯದ ಸುರಕ್ಷತೆ'}
              </p>
              <p className="text-sm sm:text-base font-black text-slate-800">
                {lang === 'en' 
                  ? `Scams Reported Today: ${todayReportsCount}` 
                  : `ಇಂದು ವರದಿ ಮಾಡಲಾದ ವಂಚನೆಗಳು: ${todayReportsCount}`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-grow max-w-4xl w-full mx-auto px-4 mt-6">
        
        {/* Navigation Tabs (Upgraded from 3 to 6 tabs) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl mb-6 shadow-inner border border-slate-200">
          
          {/* Tab 1: UPI */}
          <button
            onClick={() => setActiveTab('upi')}
            className={`py-3 px-2 rounded-xl text-center font-bold text-sm sm:text-base transition-all duration-200 active:scale-95 flex flex-col sm:flex-row justify-center items-center gap-1.5 cursor-pointer ${
              activeTab === 'upi'
                ? 'bg-white text-emerald-950 shadow-md border border-emerald-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span>🔍</span>
            <span>{activeTranslations.tabs.upi}</span>
          </button>

          {/* Tab 2: QR Scanner */}
          <button
            onClick={() => { setActiveTab('qr'); setQrSubTab('camera'); }}
            className={`py-3 px-2 rounded-xl text-center font-bold text-sm sm:text-base transition-all duration-200 active:scale-95 flex flex-col sm:flex-row justify-center items-center gap-1.5 cursor-pointer ${
              activeTab === 'qr'
                ? 'bg-white text-emerald-950 shadow-md border border-emerald-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span>📷</span>
            <span>{activeTranslations.tabs.qr}</span>
          </button>

          {/* Tab 3: Phishing */}
          <button
            onClick={() => setActiveTab('phishing')}
            className={`py-3 px-2 rounded-xl text-center font-bold text-sm sm:text-base transition-all duration-200 active:scale-95 flex flex-col sm:flex-row justify-center items-center gap-1.5 cursor-pointer ${
              activeTab === 'phishing'
                ? 'bg-white text-emerald-950 shadow-md border border-emerald-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span>✉️</span>
            <span>{activeTranslations.tabs.phishing}</span>
          </button>

          {/* Tab 4: OTP scam */}
          <button
            onClick={() => setActiveTab('otp')}
            className={`py-3 px-2 rounded-xl text-center font-bold text-sm sm:text-base transition-all duration-200 active:scale-95 flex flex-col sm:flex-row justify-center items-center gap-1.5 cursor-pointer ${
              activeTab === 'otp'
                ? 'bg-white text-emerald-950 shadow-md border border-emerald-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span>🔑</span>
            <span>{activeTranslations.tabs.otp}</span>
          </button>

          {/* Tab 5: Fake Loan App */}
          <button
            onClick={() => setActiveTab('loan')}
            className={`py-3 px-2 rounded-xl text-center font-bold text-sm sm:text-base transition-all duration-200 active:scale-95 flex flex-col sm:flex-row justify-center items-center gap-1.5 cursor-pointer ${
              activeTab === 'loan'
                ? 'bg-white text-emerald-950 shadow-md border border-emerald-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span>💸</span>
            <span>{activeTranslations.tabs.loan}</span>
          </button>

          {/* Tab 6: Simulator */}
          <button
            onClick={() => setActiveTab('simulator')}
            className={`py-3 px-2 rounded-xl text-center font-bold text-sm sm:text-base transition-all duration-200 active:scale-95 flex flex-col sm:flex-row justify-center items-center gap-1.5 cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-white text-emerald-950 shadow-md border border-emerald-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span>📱</span>
            <span>{activeTranslations.tabs.simulator}</span>
          </button>

        </div>

        {/* -------------------------------------------------------------
            TAB 1: UPI ID / PHONE RISK ANALYZER
           ------------------------------------------------------------- */}
        {activeTab === 'upi' && (
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-emerald-100/50 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-700">
                <Smartphone className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {activeTranslations.upi.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mt-1">
                  {activeTranslations.upi.description}
                </p>
              </div>
            </div>

            <form onSubmit={handleCheckUpi} className="space-y-4">
              <label className="block text-base font-bold text-slate-700">
                {lang === 'en' ? 'Paste UPI ID or Mobile Number here:' : 'ಯುಪಿಐ ಐಡಿ ಅಥವಾ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ಇಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ:'}
              </label>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={upiInput}
                  onChange={(e) => setUpiInput(e.target.value)}
                  placeholder={activeTranslations.upi.inputPlaceholder}
                  className="flex-grow p-4 border-2 border-slate-300 rounded-2xl text-base sm:text-lg focus:border-emerald-600 focus:outline-none font-medium shadow-inner"
                  required
                />
                
                <button
                  type="submit"
                  disabled={upiLoading}
                  className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all text-white font-black text-base sm:text-lg px-8 py-4 rounded-2xl disabled:bg-slate-400 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {upiLoading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>{activeTranslations.upi.checking}</span>
                    </>
                  ) : (
                    <>
                      <span>{activeTranslations.upi.btnCheck}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>



            {renderResultCard(upiResult, 'upi', upiInput)}

          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 2: QR CODE SAFETY SCANNER (NEW)
           ------------------------------------------------------------- */}
        {activeTab === 'qr' && (
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-emerald-100/50 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-700">
                <QrCode className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {activeTranslations.qr.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mt-1">
                  {activeTranslations.qr.description}
                </p>
              </div>
            </div>

            {/* Sub Tabs Selection */}
            <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl mb-4 border border-slate-200 w-fit">
              <button
                type="button"
                onClick={() => setQrSubTab('camera')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                  qrSubTab === 'camera'
                    ? 'bg-white text-emerald-955 shadow-sm border border-slate-300'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/30'
                }`}
              >
                <span>📷</span>
                <span>{lang === 'en' ? 'Camera' : 'ಕ್ಯಾಮೆರಾ'}</span>
              </button>
              <button
                type="button"
                onClick={() => setQrSubTab('upload')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                  qrSubTab === 'upload'
                    ? 'bg-white text-emerald-955 shadow-sm border border-slate-300'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/30'
                }`}
              >
                <span>🖼️</span>
                <span>{lang === 'en' ? 'Upload Photo' : 'ಫೋಟೋ ಅಪ್‌ಲೋಡ್'}</span>
              </button>
              <button
                type="button"
                onClick={() => setQrSubTab('paste')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                  qrSubTab === 'paste'
                    ? 'bg-white text-emerald-955 shadow-sm border border-slate-300'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/30'
                }`}
              >
                <span>🔗</span>
                <span>{lang === 'en' ? 'Paste Link' : 'ಲಿಂಕ್ ಪೇಸ್ಟ್'}</span>
              </button>
            </div>

            {/* Sub-Tab 1: CAMERA scanning preview */}
            {qrSubTab === 'camera' && (
              <div className="space-y-4">
                {cameraError ? (
                  <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl text-amber-900 font-extrabold text-sm sm:text-base">
                    ⚠️ {cameraError}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    {/* Glowing Viewfinder frame */}
                    <div className="relative border-4 border-emerald-500 rounded-3xl overflow-hidden bg-slate-900 shadow-2xl max-w-sm w-full h-[240px] flex items-center justify-center">
                      
                      {/* Video capture */}
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />

                      {/* Viewfinder Neon Box Overlay */}
                      <div className="absolute inset-4 border-2 border-emerald-400/70 rounded-2xl pointer-events-none flex items-center justify-center">
                        <div className="w-10 h-10 border-t-4 border-l-4 border-emerald-400 absolute top-0 left-0"></div>
                        <div className="w-10 h-10 border-t-4 border-r-4 border-emerald-400 absolute top-0 right-0"></div>
                        <div className="w-10 h-10 border-b-4 border-l-4 border-emerald-400 absolute bottom-0 left-0"></div>
                        <div className="w-10 h-10 border-b-4 border-r-4 border-emerald-400 absolute bottom-0 right-0"></div>
                      </div>

                      {/* Sweeping Laser Line Animation */}
                      <div className="absolute left-4 right-4 h-1.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-lg shadow-emerald-400/80 laser-sweep-line pointer-events-none"></div>
                    </div>
                    
                    <p className="text-base sm:text-lg font-black text-slate-700 animate-pulse text-center">
                      🔍 {lang === 'en' ? 'Point camera at QR code' : 'ಕ್ಯೂಆರ್ ಕೋಡ್‌ನತ್ತ ಕ್ಯಾಮೆರಾ ಹಿಡಿಯಿರಿ'}
                    </p>
                  </div>
                )}
                {/* Hidden canvas for extraction */}
                <canvas ref={canvasRef} className="hidden" />
              </div>
            )}

            {/* Sub-Tab 2: UPLOAD PHOTO dropzone */}
            {qrSubTab === 'upload' && (
              <div className="relative border-3 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center bg-slate-50 transition-all cursor-pointer group flex flex-col justify-center items-center h-48">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🖼️</span>
                <span className="text-base font-bold text-slate-600 group-hover:text-emerald-700">
                  {uploadedFileName ? `📂 ${uploadedFileName}` : activeTranslations.qr.uploadLabel}
                </span>
              </div>
            )}

            {/* Sub-Tab 3: PASTE LINK input */}
            {qrSubTab === 'paste' && (
              <form onSubmit={handleCheckQr} className="space-y-4">
                <label className="block text-base font-bold text-slate-700">
                  {lang === 'en' ? 'Paste decoded QR Link here:' : 'ಕ್ಯೂಆರ್ ಕೋಡ್‌ನ ಲಿಂಕ್ ಪೇಸ್ಟ್ ಮಾಡಿ:'}
                </label>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={qrInput}
                    onChange={(e) => setQrInput(e.target.value)}
                    placeholder={activeTranslations.qr.inputPlaceholder}
                    className="flex-grow p-4 border-2 border-slate-300 rounded-2xl text-base sm:text-lg focus:border-emerald-600 focus:outline-none font-medium shadow-inner"
                    required
                  />
                  
                  <button
                    type="submit"
                    disabled={qrLoading}
                    className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all text-white font-black text-base sm:text-lg px-8 py-4 rounded-2xl disabled:bg-slate-400 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {qrLoading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>{activeTranslations.qr.checking}</span>
                      </>
                    ) : (
                      <>
                        <span>{activeTranslations.qr.btnCheck}</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}



            {renderResultCard(qrResult, 'qr', qrInput)}

          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 3: MESSAGE / LINK PHISHING DETECTOR
           ------------------------------------------------------------- */}
        {activeTab === 'phishing' && (
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-emerald-100/50 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-700">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {activeTranslations.phishing.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mt-1">
                  {activeTranslations.phishing.description}
                </p>
              </div>
            </div>

            <form onSubmit={handleCheckMessage} className="space-y-4">
              <label className="block text-base font-bold text-slate-700">
                {lang === 'en' ? 'Paste message text or Website URL below:' : 'ಸಂದೇಶ ಪಠ್ಯ ಅಥವಾ ವೆಬ್ ಲಿಂಕ್ ಅನ್ನು ಕೆಳಗೆ ಪೇಸ್ಟ್ ಮಾಡಿ:'}
              </label>

              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder={activeTranslations.phishing.inputPlaceholder}
                rows={4}
                className="w-full p-4 border-2 border-slate-300 rounded-2xl text-base sm:text-lg focus:border-emerald-600 focus:outline-none font-medium shadow-inner"
                required
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={messageLoading}
                  className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all text-white font-black text-base sm:text-lg px-8 py-4 rounded-2xl disabled:bg-slate-400 shadow-md flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
                >
                  {messageLoading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>{activeTranslations.phishing.scanning}</span>
                    </>
                  ) : (
                    <>
                      <span>{activeTranslations.phishing.btnCheck}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>



            {renderResultCard(messageResult, 'phishing', messageInput)}

          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 4: OTP SCAM DETECTOR (NEW)
           ------------------------------------------------------------- */}
        {activeTab === 'otp' && (
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-emerald-100/50 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-700">
                <KeyRound className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {activeTranslations.otp.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mt-1">
                  {activeTranslations.otp.description}
                </p>
              </div>
            </div>

            <form onSubmit={handleCheckOtp} className="space-y-4">
              <label className="block text-base font-bold text-slate-700">
                {lang === 'en' ? 'Paste the message asking for code/OTP:' : 'ಒಟಿಪಿ ಅಥವಾ ಕೋಡ್ ಕೇಳುವ ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ:'}
              </label>

              <textarea
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                placeholder={activeTranslations.otp.inputPlaceholder}
                rows={3}
                className="w-full p-4 border-2 border-slate-300 rounded-2xl text-base sm:text-lg focus:border-emerald-600 focus:outline-none font-medium shadow-inner"
                required
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={otpLoading}
                  className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all text-white font-black text-base sm:text-lg px-8 py-4 rounded-2xl disabled:bg-slate-400 shadow-md flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
                >
                  {otpLoading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>{activeTranslations.otp.scanning}</span>
                    </>
                  ) : (
                    <>
                      <span>{activeTranslations.otp.btnCheck}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>



            {renderResultCard(otpResult, 'otp', otpInput)}

          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 5: FAKE LOAN APP CHECKER (NEW)
           ------------------------------------------------------------- */}
        {activeTab === 'loan' && (
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-emerald-100/50 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-700">
                <TrendingDown className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {activeTranslations.loan.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mt-1">
                  {activeTranslations.loan.description}
                </p>
              </div>
            </div>

            <form onSubmit={handleCheckLoan} className="space-y-4">
              <label className="block text-base font-bold text-slate-700">
                {lang === 'en' ? 'Type app name or Play Store link:' : 'ಸಾಲ ನೀಡುವ ಆಪ್‌ನ ಹೆಸರು ಅಥವಾ ಲಿಂಕ್ ಹಾಕಿ:'}
              </label>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={loanInput}
                  onChange={(e) => setLoanInput(e.target.value)}
                  placeholder={activeTranslations.loan.inputPlaceholder}
                  className="flex-grow p-4 border-2 border-slate-300 rounded-2xl text-base sm:text-lg focus:border-emerald-600 focus:outline-none font-medium shadow-inner"
                  required
                />
                
                <button
                  type="submit"
                  disabled={loanLoading}
                  className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all text-white font-black text-base sm:text-lg px-8 py-4 rounded-2xl disabled:bg-slate-400 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loanLoading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>{activeTranslations.loan.checking}</span>
                    </>
                  ) : (
                    <>
                      <span>{activeTranslations.loan.btnCheck}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>



            {renderResultCard(loanResult, 'loan', loanInput)}

          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 6: BEHAVIORAL SAFETY NUDGE SIMULATOR
           ------------------------------------------------------------- */}
        {activeTab === 'simulator' && (
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-emerald-100/50 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-700">
                <Smartphone className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {activeTranslations.nudge.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mt-1">
                  {activeTranslations.nudge.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              
              {/* Phone Frame Simulator */}
              <div className="bg-[#f0f6f0] border-4 border-slate-800 rounded-[36px] p-6 shadow-2xl relative max-w-sm mx-auto w-full">
                
                {/* Phone Speaker Notch */}
                <div className="w-32 h-5 bg-slate-800 absolute top-0 left-1/2 transform -translate-x-1/2 rounded-b-xl flex items-center justify-center">
                  <div className="w-12 h-1 bg-slate-600 rounded-full"></div>
                </div>

                <div className="pt-4 space-y-6">
                  <div className="text-center pb-3 border-b border-slate-300">
                    <span className="text-xs font-black uppercase text-emerald-800 tracking-wider">
                      Village Gramin Pay Wallet
                    </span>
                  </div>

                  <form onSubmit={handleSimulatePayment} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-600 uppercase tracking-wider">
                        {activeTranslations.nudge.recipientLabel}
                      </label>
                      <input
                        type="text"
                        value={simRecipient}
                        onChange={(e) => setSimRecipient(e.target.value)}
                        placeholder="e.g. unknown-account@ybl"
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl text-base font-bold text-slate-800 focus:outline-none focus:border-emerald-600"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-600 uppercase tracking-wider">
                        {activeTranslations.nudge.amountLabel}
                      </label>
                      
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-lg font-black text-slate-500">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={simAmount}
                          onChange={(e) => setSimAmount(e.target.value)}
                          placeholder="e.g. 6000"
                          className="w-full p-3 pl-8 bg-white border border-slate-300 rounded-xl text-lg font-black text-slate-800 focus:outline-none focus:border-emerald-600"
                          required
                        />
                      </div>
                      
                      <div className="flex gap-2 pt-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setSimRecipient('pmkisan-relief@ybl');
                            setSimAmount('8000');
                          }}
                          className="px-2.5 py-1 text-2xs font-extrabold bg-rose-100 text-rose-800 rounded-md border border-rose-200 active:scale-95 transition-all text-xs cursor-pointer"
                        >
                          ₹8,000 preset
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSimRecipient('relative-help@ybl');
                            setSimAmount('3000');
                          }}
                          className="px-2.5 py-1 text-2xs font-extrabold bg-emerald-100 text-emerald-800 rounded-md border border-emerald-200 active:scale-95 transition-all text-xs cursor-pointer"
                        >
                          ₹3,000 preset
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all text-white font-black py-4.5 rounded-2xl text-base shadow-md border-2 border-emerald-500 cursor-pointer"
                    >
                      {activeTranslations.nudge.btnSend}
                    </button>
                  </form>

                  {simMessage && (
                    <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-emerald-900 font-extrabold text-sm sm:text-base shadow-inner">
                      {simMessage}
                    </div>
                  )}

                </div>
              </div>

              {/* Informative Explanation Side Card */}
              <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-5 space-y-4">
                <h4 className="text-lg font-black text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  {lang === 'en' ? 'How the Nudge protects you:' : 'ಸುರಕ್ಷತಾ ಎಚ್ಚರಿಕೆ ಹೇಗೆ ರಕ್ಷಿಸುತ್ತದೆ:'}
                </h4>
                
                <p className="text-base font-bold text-slate-600">
                  {lang === 'en' 
                    ? "Scammers use High-Pressure urgency to trick you. They will tell you that a transaction must be done immediately or something bad will happen. High amount transactions (above ₹5,000) are highly targeted by fraudsters."
                    : "ವಂಚಕರು ನಿಮ್ಮ ಮೇಲೆ ಒತ್ತಡ ಹೇರಿ ಹೆದರಿಸುತ್ತಾರೆ. ತಕ್ಷಣ ಹಣ ಕಳುಹಿಸದಿದ್ದರೆ ತೊಂದರೆಯಾಗುತ್ತದೆ ಎಂದು ಸುಳ್ಳು ಹೇಳುತ್ತಾರೆ. ₹೫,೦೦೦ ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಮೊತ್ತದ ವರ್ಗಾವಣೆಗಳನ್ನು ಇವರು ಗುರಿಯಾಗಿಸುತ್ತಾರೆ."}
                </p>
                
                <div className="bg-white border border-slate-200 p-4 rounded-2xl">
                  <h5 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">
                    {lang === 'en' ? 'Safety Rule' : 'ಸುರಕ್ಷತಾ ನಿಯಮ'}
                  </h5>
                  <p className="text-base sm:text-lg font-black text-slate-900">
                    {lang === 'en' 
                      ? "⚠️ Never send high value payments to people you have only met on WhatsApp or phone calls."
                      : "⚠️ ಕೇವಲ ವಾಟ್ಸಾಪ್ ಅಥವಾ ಫೋನ್ ಕಾಲ್ ಮೂಲಕ ಪರಿಚಯವಾದವರಿಗೆ ಎಂದಿಗೂ ಹೆಚ್ಚಿನ ಹಣವನ್ನು ವರ್ಗಾಯಿಸಬೇಡಿ."}
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* RECENT SCANS DASHBOARD (NEW) */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <div className="bg-[#f8faf6] border-2 border-slate-200/80 rounded-3xl p-6 space-y-5 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">📋</span>
                <div className="text-left">
                  <h3 className="text-lg sm:text-xl font-black text-slate-800">
                    {lang === 'en' ? 'Recent Security Checks' : 'ಇತ್ತೀಚಿನ ಸುರಕ್ಷತಾ ತಪಾಸಣೆಗಳು'}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-slate-500">
                    {lang === 'en' 
                      ? 'Anonymized list of last 5 scans. Personal data is always masked.' 
                      : 'ಕೊನೆಯ ೫ ತಪಾಸಣೆಗಳ ಅನಾಮಧೇಯ ಪಟ್ಟಿ. ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ ಎಂದಿಗೂ ಸುರಕ್ಷಿತವಾಗಿರುತ್ತದೆ.'}
                  </p>
                </div>
              </div>
              
              <button
                onClick={fetchRecentScans}
                className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-600 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>🔄</span>
                {lang === 'en' ? 'Refresh' : 'ನವೀಕರಿಸಿ'}
              </button>
            </div>

            {recentScans.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-300 rounded-2xl py-8 text-center">
                <p className="text-sm font-bold text-slate-400">
                  {lang === 'en' 
                    ? '🛡️ No scans checked yet. Your history will be recorded securely here.' 
                    : '🛡️ ಯಾವುದೇ ತಪಾಸಣೆ ಮಾಡಲಾಗಿಲ್ಲ. ನಿಮ್ಮ ಸುರಕ್ಷಿತ ಇತಿಹಾಸ ಇಲ್ಲಿ ದಾಖಲಾಗುತ್ತದೆ.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentScans.map((scan) => {
                  let badgeColor = "bg-emerald-100 text-emerald-800 border-emerald-300";
                  if (scan.result === 'caution') badgeColor = "bg-amber-100 text-amber-800 border-amber-300";
                  if (scan.result === 'danger') badgeColor = "bg-rose-100 text-rose-800 border-rose-300";
                  
                  let typeLabel = scan.type.toUpperCase();
                  let icon = "🔍";
                  if (scan.type === 'qr') { icon = "📷"; typeLabel = lang === 'en' ? "QR SCAN" : "ಕ್ಯೂಆರ್ ಸ್ಕ್ಯಾನ್"; }
                  if (scan.type === 'phishing') { icon = "✉️"; typeLabel = lang === 'en' ? "WHATSAPP" : "ವಾಟ್ಸಾಪ್"; }
                  if (scan.type === 'otp') { icon = "🔑"; typeLabel = lang === 'en' ? "OTP DETECTOR" : "ಒಟಿಪಿ ತಪಾಸಣೆ"; }
                  if (scan.type === 'loan') { icon = "💸"; typeLabel = lang === 'en' ? "LOAN CHECK" : "ಸಾಲದ ಆಪ್"; }
                  if (scan.type === 'upi') { icon = "🔍"; typeLabel = lang === 'en' ? "UPI CHECK" : "ಯುಪಿಐ ತಪಾಸಣೆ"; }

                  return (
                    <div 
                      key={scan.id} 
                      className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col justify-between gap-3 hover:shadow-md hover:border-emerald-200 transition-all duration-200 text-left"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{icon}</span>
                          <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
                            {typeLabel}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${badgeColor}`}>
                            {scan.result.toUpperCase()}
                          </span>
                          <button
                            onClick={() => handleDeleteScan(scan.id)}
                            title={lang === 'en' ? "Delete Scan" : "ತಪಾಸಣೆ ಅಳಿಸಿ"}
                            className="text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 p-1.5 rounded-full transition-all cursor-pointer"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                          </button>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-2.5 text-slate-700 font-extrabold text-xs sm:text-sm break-all border border-slate-100 select-all">
                        {scan.input}
                      </div>

                      <div className="flex justify-between items-center gap-4 text-[10px] text-slate-400 font-extrabold">
                        <div className="flex items-center gap-1.5 w-full max-w-[120px]">
                          <span className="shrink-0">{lang === 'en' ? 'Risk:' : 'ಅಪಾಯ:'}</span>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                            <div 
                              className={`h-full ${scan.result === 'danger' ? 'bg-rose-500' : scan.result === 'caution' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                              style={{ width: `${scan.risk_score}%` }}
                            ></div>
                          </div>
                          <span className="shrink-0 text-slate-600 font-black">{scan.risk_score}</span>
                        </div>
                        
                        <span className="shrink-0">
                          {new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </main>

      {/* BEHAVIORAL SAFETY NUDGE MODAL DIALOG */}
      {showNudgeModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-4 border-rose-500 shadow-2xl max-w-lg w-full p-6 animate-scale-up space-y-6">
            
            <div className="flex items-start gap-3.5 pb-4 border-b border-slate-100">
              <div className="bg-rose-100 p-2.5 rounded-2xl text-rose-600 mt-1 shrink-0">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-rose-950 leading-tight">
                  {activeTranslations.nudge.modalTitle}
                </h3>
                <p className="text-sm font-bold text-slate-500 mt-1">
                  {lang === 'en' ? 'Amount to Send:' : 'ವರ್ಗಾಯಿಸುತ್ತಿರುವ ಹಣ:'} <span className="text-rose-600 font-extrabold text-lg">₹{simAmount}</span>
                </p>
              </div>
            </div>

            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
              <p className="text-base sm:text-lg font-bold text-rose-900 leading-snug">
                ⚠️ <strong>{activeTranslations.nudge.modalUrgency}</strong>
              </p>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3 p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer font-bold text-base sm:text-lg">
                <input
                  type="checkbox"
                  checked={confirmChecks.knowPerson}
                  onChange={(e) => setConfirmChecks({ ...confirmChecks, knowPerson: e.target.checked })}
                  className="w-6 h-6 border-2 border-slate-400 rounded-md text-emerald-600 mt-0.5 shrink-0 cursor-pointer"
                />
                <span>{activeTranslations.nudge.modalCheck1}</span>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer font-bold text-base sm:text-lg">
                <input
                  type="checkbox"
                  checked={confirmChecks.noThreat}
                  onChange={(e) => setConfirmChecks({ ...confirmChecks, noThreat: e.target.checked })}
                  className="w-6 h-6 border-2 border-slate-400 rounded-md text-emerald-600 mt-0.5 shrink-0 cursor-pointer"
                />
                <span>{activeTranslations.nudge.modalCheck2}</span>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer font-bold text-base sm:text-lg">
                <input
                  type="checkbox"
                  checked={confirmChecks.noPrize}
                  onChange={(e) => setConfirmChecks({ ...confirmChecks, noPrize: e.target.checked })}
                  className="w-6 h-6 border-2 border-slate-400 rounded-md text-emerald-600 mt-0.5 shrink-0 cursor-pointer"
                />
                <span>{activeTranslations.nudge.modalCheck3}</span>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  setShowNudgeModal(false);
                  const msg = lang === 'en'
                    ? "❌ Good choice! Transaction stopped. Scammers will try to pressure you, but stopping saved your money!"
                    : "❌ ಉತ್ತಮ ಆಯ್ಕೆ! ಪಾವತಿಯನ್ನು ನಿಲ್ಲಿಸಲಾಗಿದೆ. ವಂಚಕರು ನಿಮ್ಮ ಮೇಲೆ ಒತ್ತಡ ಹೇರಲು ಪ್ರಯತ್ನಿಸುತ್ತಾರೆ, ಆದರೆ ಅದನ್ನು ನಿಲ್ಲಿಸಿದ್ದು ನಿಮ್ಮ ಹಣವನ್ನು ಉಳಿಸಿದೆ!";
                  setSimMessage(msg);
                }}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-black py-4.5 rounded-2xl text-base sm:text-lg border-2 border-rose-500 shadow-md active:scale-95 transition-all text-center cursor-pointer"
              >
                {activeTranslations.nudge.btnCancel}
              </button>

              <button
                onClick={handleConfirmNudge}
                disabled={!(confirmChecks.knowPerson && confirmChecks.noThreat && confirmChecks.noPrize)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:bg-slate-100 text-slate-800 font-extrabold py-4.5 rounded-2xl text-base sm:text-lg border border-slate-300 shadow-sm active:scale-95 transition-all text-center cursor-pointer"
              >
                {activeTranslations.nudge.btnConfirm}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 py-6 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center space-y-1.5">
          <p className="text-xs sm:text-sm font-bold text-slate-500">
            {activeTranslations.footer}
          </p>
          <p className="text-2xs font-extrabold text-slate-400 tracking-wider uppercase">
            🛡️ AI DRIFT SIT MANGALURU AIML HACKATHON 2026
          </p>
        </div>
      </footer>

    </div>
  );
}
