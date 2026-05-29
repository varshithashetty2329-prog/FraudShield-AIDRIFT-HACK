import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  MessageSquare, 
  Smartphone, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  ExternalLink, 
  X, 
  ArrowRight, 
  HelpCircle,
  HelpCircle as InfoIcon,
  ChevronRight,
  UserCheck
} from 'lucide-react';

const TRANSLATIONS = {
  en: {
    title: "FraudShield",
    subtitle: "AI-Powered Fraud Prevention for Rural India",
    tagline: "Your digital safety shield. Simple warnings in plain language. No complicated terms.",
    langSwitch: "ಕನ್ನಡದಲ್ಲಿ ಓದಿ (ಕನ್ನಡ)",
    tabs: {
      upi: "🔍 UPI ID / Phone Check",
      phishing: "✉️ Message / Link Check",
      simulator: "📱 Safe Pay Simulator"
    },
    upi: {
      title: "UPI / Phone Risk Analyzer",
      description: "Before sending money to someone new, paste their UPI ID or Mobile Number here to check if they are safe.",
      inputPlaceholder: "Enter UPI ID (e.g. pmkisan-relief@ybl) or 10-digit Phone Number",
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
    phishing: {
      title: "WhatsApp Message & Link Detector",
      description: "Did you receive a suspicious WhatsApp message, SMS, or web link promising government money? Paste it here to scan for scams.",
      inputPlaceholder: "Paste the message or link here...",
      btnCheck: "Scan Message Now",
      scanning: "Scanning message...",
      nextStep: "What you must do next (Safe Advice):",
      audioBtn: "🔊 Listen to Advice (Audio)"
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
    footer: "FraudShield 🛡️ — Empowers digital literacy in rural communities. Sit Mangaluru AIML Department Hackathon 2026."
  },
  kn: {
    title: "ಫ್ರಾಡ್‌ಶೀಲ್ಡ್ (FraudShield) 🛡️",
    subtitle: "ಗ್ರಾಮೀಣ ಭಾರತಕ್ಕಾಗಿ ಎಐ-ಚಾಲಿತ ವಂಚನೆ ತಡೆಗಟ್ಟುವಿಕೆ",
    tagline: "ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಭದ್ರತಾ ಕವಚ. ಯಾವುದೇ ಜಟಿಲ ಪದಗಳಿಲ್ಲದ ಸರಳ ಎಚ್ಚರಿಕೆಗಳು.",
    langSwitch: "Read in English (ಇಂಗ್ಲಿಷ್)",
    tabs: {
      upi: "🔍 ಯುಪಿಐ ಐಡಿ / ಫೋನ್ ಪರಿಶೀಲನೆ",
      phishing: "✉️ ಸಂದೇಶ / ಲಿಂಕ್ ಪರಿಶೀಲನೆ",
      simulator: "📱 ಸುರಕ್ಷಿತ ಪಾವತಿ ಸಿಮ್ಯುಲೇಟರ್"
    },
    upi: {
      title: "ಯುಪಿಐ / ಫೋನ್ ಅಪಾಯ ವಿಶ್ಲೇಷಕ",
      description: "ಹೊಸಬರಿಗೆ ಹಣ ಕಳುಹಿಸುವ ಮೊದಲು, ಅವರ ಯುಪಿಐ ಐಡಿ ಅಥವಾ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ಇಲ್ಲಿ ಹಾಕಿ ಅದು ಸುರಕ್ಷಿತವಾಗಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ.",
      inputPlaceholder: "ಯುಪಿಐ ಐಡಿ (ಉದಾ: pmkisan-relief@ybl) ಅಥವಾ ೧೦-ಅಂಕಿಯ ಫೋನ್ ಸಂಖ್ಯೆ ಹಾಕಿ",
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
    phishing: {
      title: "ವಾಟ್ಸಾಪ್ ಸಂದೇಶ ಮತ್ತು ಲಿಂಕ್ ಪತ್ತೆಕಾರಕ",
      description: "ಸರ್ಕಾರದಿಂದ ಉಚಿತ ಹಣ ನೀಡುವ ಭರವಸೆ ನೀಡುವ ಶಂಕಾಸ್ಪದ ವಾಟ್ಸಾಪ್ ಸಂದೇಶ, ಎಸ್‌ಎಂಎಸ್ ಅಥವಾ ವೆಬ್ ಲಿಂಕ್ ಬಂದಿದೆಯೇ? ವಂಚನೆ ಪತ್ತೆಹಚ್ಚಲು ಇಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ.",
      inputPlaceholder: "ಸಂದೇಶ ಅಥವಾ ವೆಬ್ ಲಿಂಕ್ ಅನ್ನು ಇಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ...",
      btnCheck: "ಈಗಲೇ ಸಂದೇಶ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
      scanning: "ಸ್ಕ್ಯಾನ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
      nextStep: "ಮುಂದೆ ನೀವು ಮಾಡಬೇಕಾದ ಕೆಲಸ (ಸುರಕ್ಷಿತ ಸಲಹೆ):",
      audioBtn: "🔊 ಸಲಹೆಯನ್ನು ಆಲಿಸಿ (ಆಡಿಯೋ)"
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
    footer: "ಫ್ರಾಡ್‌ಶೀಲ್ಡ್ 🛡️ — ಗ್ರಾಮೀಣ ಸಮುದಾಯಗಳಲ್ಲಿ ಡಿಜಿಟಲ್ ಜಾಗೃತಿ ಮೂಡಿಸಲು ನೆರವಾಗುತ್ತದೆ. SIT ಮಂಗಳೂರು AIML ವಿಭಾಗ ಹ್ಯಾಕಥಾನ್ ೨೦೨೬."
  }
};

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' or 'kn'
  const [activeTab, setActiveTab] = useState('upi'); // 'upi', 'phishing', 'simulator'
  
  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState(null);

  // Feature 1: UPI Risk Analyzer state
  const [upiInput, setUpiInput] = useState('');
  const [upiResult, setUpiResult] = useState(null);
  const [upiLoading, setUpiLoading] = useState(false);

  // Feature 2: Phishing Detector state
  const [messageInput, setMessageInput] = useState('');
  const [messageResult, setMessageResult] = useState(null);
  const [messageLoading, setMessageLoading] = useState(false);

  // Feature 3: Safe Pay Simulator state
  const [simRecipient, setSimRecipient] = useState('');
  const [simAmount, setSimAmount] = useState('');
  const [showNudgeModal, setShowNudgeModal] = useState(false);
  const [simMessage, setSimMessage] = useState('');
  const [confirmChecks, setConfirmChecks] = useState({
    knowPerson: false,
    noThreat: false,
    noPrize: false
  });

  const activeTranslations = TRANSLATIONS[lang];

  // Stop any speaking audio on tab or language change
  useEffect(() => {
    stopAudio();
  }, [activeTab, lang]);

  const stopAudio = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setCurrentUtterance(null);
  };

  const playTTS = (text, targetLang) => {
    stopAudio();
    if (!window.speechSynthesis) {
      alert("Text-to-speech is not supported on this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    // Try to find native Kannada or English voices
    const voices = window.speechSynthesis.getVoices();
    if (targetLang === 'kn') {
      // Find Kannada voice, typical matches: kn-IN, Noto Sans Kannada, etc.
      const knVoice = voices.find(v => v.lang.includes('kn') || v.lang.includes('KN') || v.name.toLowerCase().includes('kannada'));
      if (knVoice) {
        utterance.voice = knVoice;
      }
      utterance.lang = 'kn-IN';
      utterance.rate = 0.85; // Speak slightly slower for rural users
    } else {
      const enVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en-US'));
      if (enVoice) {
        utterance.voice = enVoice;
      }
      utterance.lang = 'en-IN';
      utterance.rate = 0.9;
    }

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setCurrentUtterance(null);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setCurrentUtterance(null);
    };

    setCurrentUtterance(utterance);
    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
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
        message_en: "CRITICAL DANGER: Fake Government Scheme Impersonation detected!",
        message_kn: "ತೀವ್ರ ಅಪಾಯ: ನಕಲಿ ಸರ್ಕಾರಿ ಯೋಜನೆಯ ಹೆಸರು ಪತ್ತೆಯಾಗಿದೆ!",
        details_en: [
          "The UPI address contains 'pmkisan' or 'relief' which is designed to look like the official PM-KISAN agricultural scheme.",
          "Official government relief funds use official government UPI addresses (typically ending in @sbi or @upi verified merchants), never ordinary '@ybl' or individual accounts.",
          "This is a common scam targeting rural farmers to steal their hard-earned money."
        ],
        details_kn: [
          "ಯುಪಿಐ ವಿಳಾಸವು 'pmkisan' ಅಥವಾ 'relief' ಅನ್ನು ಒಳಗೊಂಡಿದೆ, ಇದು ಅಧಿಕೃತ ಪಿಎಂ-ಕಿಸಾನ್ ಕೃಷಿ ಯೋಜನೆಯಂತೆ ಕಾಣಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.",
          "ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪರಿಹಾರ ನಿಧಿಗಳು ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಯುಪಿಐ ವಿಳಾಸಗಳನ್ನು ಬಳಸುತ್ತವೆ (ಸಾಮಾನ್ಯವಾಗಿ @sbi ಅಥವಾ @upi ಪರಿಶೀಲಿಸಿದ ವ್ಯಾಪಾರಿಗಳು), ಎಂದಿಗೂ ಸಾಮಾನ್ಯ '@ybl' ಅಥವಾ ವೈಯಕ್ತಿಕ ಖಾತೆಗಳನ್ನು ಬಳಸುವುದಿಲ್ಲ.",
          "ಇದು ಗ್ರಾಮೀಣ ರೈತರ ಕಷ್ಟದ ಹಣವನ್ನು ದೋಚಲು ವಂಚಕರು ಬಳಸುವ ಸಾಮಾನ್ಯ ತಂತ್ರವಾಗಿದೆ."
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
          "No suspicious high-pressure behavior or scam history is detected for this merchant account.",
          "Safe for regular, verified payments."
        ],
        details_kn: [
          "ಈ ಯುಪಿಐ ಐಡಿ ಪ್ರಮಾಣಿತ ಬ್ಯಾಂಕ್ ವ್ಯಾಪಾರಿ ಹ್ಯಾಂಡಲ್‌ನಲ್ಲಿ ನೋಂದಾಯಿಸಲ್ಪಟ್ಟಿದೆ (@icici / @sbi).",
          "ಈ ವ್ಯಾಪಾರ ಖಾತೆಗೆ ಯಾವುದೇ ಶಂಕಾಸ್ಪದ ವಂಚನೆಯ ಇತಿಹಾಸ ಕಂಡುಬಂದಿಲ್ಲ.",
          "ನಿಯಮಿತ, ಪರಿಶೀಲಿಸಿದ ಪಾವತಿಗಳಿಗೆ ಸುರಕ್ಷಿತವಾಗಿದೆ."
        ]
      };
    }

    const danger_keywords = ["lottery", "gift", "prize", "cashback", "win", "rewards", "lucky", "kbc", "phonepe-reward", "awas", "yojana", "police", "customs", "fine"];
    for (let kw of danger_keywords) {
      if (u.includes(kw)) {
        return {
          score: 88,
          status: "danger",
          message_en: `WARNING: Suspected Prize / Scheme Scam UPI ID containing '${kw}'!`,
          message_kn: `ಎಚ್ಚರಿಕೆ: ಬಹುಮಾನ ಅಥವಾ ಉಡುಗೊರೆ ಹೆಸರಿನಲ್ಲಿ ವಂಚಿಸುವ ಶಂಕಾಸ್ಪದ ಯುಪಿಐ ಐಡಿ. '${kw}' ಪದ ಪತ್ತೆಯಾಗಿದೆ!`,
          details_en: [
            `The payment address contains '${kw}', which is a typical hook used by cyber-criminals to attract victims with fake reward schemes.`,
            "Genuine platforms will never ask you to send money to a personal or random UPI address to receive a reward.",
            "Do not transfer any money. It is highly likely to be a scam."
          ],
          details_kn: [
            `ಪಾವತಿ ವಿಳಾಸವು '${kw}' ಅನ್ನು ಒಳಗೊಂಡಿದೆ, ಇದು ಸೈಬರ್ ಅಪರಾಧಿಗಳು ನಕಲಿ ಬಹುಮಾನ ಯೋಜನೆಗಳೊಂದಿಗೆ ಜನರನ್ನು ಆಕರ್ಷಿಸಲು ಬಳಸುವ ವಿಶಿಷ್ಟ ಪದವಾಗಿದೆ.`,
            "ನಿಜವಾದ ಸಂಸ್ಥೆಗಳು ಬಹುಮಾನವನ್ನು ನೀಡಲು ವೈಯಕ್ತಿಕ ಅಥವಾ ಯಾದೃಚ್ಛಿಕ ಯುಪಿಐ ವಿಳಾಸಕ್ಕೆ ಹಣವನ್ನು ಕಳುಹಿಸಲು ಎಂದಿಗೂ ಕೇಳುವುದಿಲ್ಲ.",
            "ಯಾವುದೇ ಹಣವನ್ನು ವರ್ಗಾಯಿಸಬೇಡಿ. ಇದು ವಂಚನೆಯಾಗಿರುವ ಸಾಧ್ಯತೆ ತುಂಬಾ ಹೆಚ್ಚಿದೆ."
          ]
        };
      }
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
          "Anyone can link their bank account to a phone number. It does not prove their identity.",
          "CRITICAL RULE: Call the person to verify their voice and identity before sending money. Do not pay if you received this number via WhatsApp from an unknown contact."
        ],
        details_kn: [
          "ಈ ಪಾವತಿಯು ನೇರವಾಗಿ ವ್ಯಕ್ತಿಯ ಫೋನ್ ಸಂಖ್ಯೆಗೆ ಸಂಬಂಧಿಸಿದೆ.",
          "ಯಾರು ಬೇಕಾದರೂ ತಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಯನ್ನು ಫೋನ್ ಸಂಖ್ಯೆಗೆ ಲಿಂಕ್ ಮಾಡಬಹುದು. ಇದು ಅವರ ಗುರುತನ್ನು ಸಾಬೀತುಪಡಿಸುವುದಿಲ್ಲ.",
          "ಪ್ರಮುಖ ನಿಯಮ: ಹಣವನ್ನು ಕಳುಹಿಸುವ ಮೊದಲು ವ್ಯಕ್ತಿಗೆ ಕರೆ ಮಾಡಿ ಅವರ ಧ್ವನಿ ಮತ್ತು ಗುರುತನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ. ಅಪರಿಚಿತರಿಂದ ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಈ ಸಂಖ್ಯೆ ಬಂದಿದ್ದರೆ ಹಣ ಕಳುಹಿಸಬೇಡಿ."
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
        "Always double-check the recipient name displayed in your payment app (e.g. PhonePe, GPay, Paytm) before clicking 'Pay'.",
        "If someone created urgency by telling you your bank account, electricity bill, or phone service is expiring, do not pay."
      ],
      details_kn: [
        "ಇದು ಸಾಮಾನ್ಯ ವೈಯಕ್ತಿಕ ಯುಪಿಐ ಐಡಿಯಾಗಿದೆ, ಪರಿಶೀಲಿಸಿದ ವ್ಯಾಪಾರವಲ್ಲ.",
        "ಪಾವತಿ ಮಾಡುವ ಮೊದಲು ನಿಮ್ಮ ಆ್ಯಪ್‌ನಲ್ಲಿ (PhonePe, GPay, Paytm) ತೋರಿಸುವ ಸ್ವೀಕೃತದಾರರ ಹೆಸರನ್ನು ಯಾವಾಗಲೂ ಪರಿಶೀಲಿಸಿ.",
        "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆ, ವಿದ್ಯುತ್ ಬಿಲ್ ಅಥವಾ ಫೋನ್ ಸೇವೆ ಅವಧಿ ಮುಗಿಯುತ್ತಿದೆ ಎಂದು ಹೇಳಿ ಯಾರಾದರೂ ತುರ್ತು ಒತ್ತಡ ಹೇರಿದ್ದರೆ, ಹಣ ಪಾವತಿಸಬೇಡಿ."
      ]
    };
  };

  const getLocalMessageAnalysis = (msg) => {
    const m = msg.trim().toLowerCase();
    if (m.includes("pm awas yojana") || m.includes("awas yojana") || (m.includes("processing fee") && m.includes("claim"))) {
      return {
        score: 98,
        status: "danger",
        message_en: "CRITICAL DANGER: Fake Government Subsidy & Phishing Scam Detected!",
        message_kn: "ತೀವ್ರ ಅಪಾಯ: ನಕಲಿ ಸರ್ಕಾರಿ ಸಹಾಯಧನ ಮತ್ತು ವಂಚನೆಯ ಸಂದೇಶ ಪತ್ತೆಯಾಗಿದೆ!",
        details_en: [
          "This message asks for an upfront 'processing fee' or 'registration fee' to claim the government 'PM Awas Yojana' housing subsidy.",
          "FACT: The Government of India never asks for any upfront fees, processing charges, or UPI transfers to approve PM Awas Yojana or any other scheme.",
          "This is a classic 'advance-fee fraud' designed to steal money from rural citizens seeking government support."
        ],
        details_kn: [
          "ಈ ಸಂದೇಶವು ಸರ್ಕಾರಿ 'ಪಿಎಂ ಆವಾಸ್ ಯೋಜನೆ' ವಸತಿ ಸಹಾಯಧನವನ್ನು ಪಡೆಯಲು ಮುಂಗಡ 'ಸಂಸ್ಕಾರ ಶುಲ್ಕ' (processing fee) ಅಥವಾ 'ನೋಂದಣಿ ಶುಲ್ಕ' ಕೇಳುತ್ತಿದೆ.",
          "ಸತ್ಯ: ಭಾರತ ಸರ್ಕಾರವು ಪಿಎಂ ಆವಾಸ್ ಯೋಜನೆ ಅಥವಾ ಯಾವುದೇ ಇತರ ಯೋಜನೆಯನ್ನು ಅನುಮೋದಿಸಲು ಯಾವುದೇ ಮುಂಗಡ ಶುಲ್ಕ ಅಥವಾ ಯುಪಿಐ ವರ್ಗಾವಣೆಗಳನ್ನು ಎಂದಿಗೂ ಕೇಳುವುದಿಲ್ಲ.",
          "ಇದು ಸರ್ಕಾರಿ ಸಹಾಯ ಪಡೆಯಲು ಬಯಸುವ ಗ್ರಾಮೀಣ ಜನರಿಂದ ಹಣವನ್ನು ದೋಚಲು ರೂಪಿಸಿದ ವಂಚನೆಯಾಗಿದೆ."
        ],
        tip_en: "⚠️ Do NOT pay any processing fee. Delete this message immediately. Tell your family members that official schemes are only applied through authorized Gram Panchayat offices, never over WhatsApp.",
        tip_kn: "⚠️ ಯಾವುದೇ ಶುಲ್ಕವನ್ನು ಪಾವತಿಸಬೇಡಿ. ಈ ಸಂದೇಶವನ್ನು ತಕ್ಷಣವೇ ಅಳಿಸಿ. ಅಧಿಕೃತ ಯೋಜನೆಗಳಿಗೆ ಗ್ರಾಮ್ ಪಂಚಾಯತ್ ಕಚೇರಿಗಳ ಮೂಲಕ ಮಾತ್ರ ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗುತ್ತದೆ, ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಅಲ್ಲ ಎಂಬುದನ್ನು ನಿಮ್ಮ ಕುಟುಂಬದವರಿಗೆ ತಿಳಿಸಿ."
      };
    }

    const kyc_keywords = ["kyc", "blocked", "suspended", "electricity", "power cut", "eb bill", "bank account", "pan card"];
    if (kyc_keywords.some(k => m.includes(k))) {
      return {
        score: 92,
        status: "danger",
        message_en: "HIGH RISK: Urgent Account Block / Service Suspension Scam!",
        message_kn: "ಹೆಚ್ಚಿನ ಅಪಾಯ: ಖಾತೆ ಬ್ಲಾಕ್ ಅಥವಾ ವಿದ್ಯುತ್ ಸ್ಥಗಿತದ ಸುಳ್ಳು ಬೆದರಿಕೆ!",
        details_en: [
          "The message uses 'Urgency Tactics' threatening that your bank account, SIM card, or electricity service will be blocked TONIGHT if you don't call a number or click a link.",
          "Banks or Electricity Boards (like BESCOM/HESCOM) never send simple WhatsApp messages with personal phone numbers for urgent payment or KYC updating.",
          "Scammers use fear to make you pay or share your banking OTP/Password."
        ],
        details_kn: [
          "ನೀವು ತಕ್ಷಣ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡದಿದ್ದರೆ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆ, ಸಿಮ್ ಕಾರ್ಡ್ ಅಥವಾ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಇಂದು ರಾತ್ರಿಯೇ ಕಡಿತಗೊಳ್ಳುತ್ತದೆ ಎಂದು ಹೆದರಿಸುವ 'ತುರ್ತು ಒತ್ತಡದ ತಂತ್ರ' ಬಳಸಲಾಗಿದೆ.",
          "ಬ್ಯಾಂಕುಗಳು ಅಥವಾ ವಿದ್ಯುತ್ ಮಂಡಳಿಗಳು (BESCOM/HESCOM ನಂತಹವು) ತುರ್ತು ಪಾವತಿ ಅಥವಾ KYC ಗಾಗಿ ವೈಯಕ್ತಿಕ ಫೋನ್ ಸಂಖ್ಯೆಗಳೊಂದಿಗೆ ಸಾಮಾನ್ಯ ವಾಟ್ಸಾಪ್ ಸಂದೇಶಗಳನ್ನು ಕಳುಹಿಸುವುದಿಲ್ಲ.",
          "ವಂಚಕರು ನಿಮ್ಮಲ್ಲಿ ಭಯ ಹುಟ್ಟಿಸಿ ನಿಮ್ಮ ಬ್ಯಾಂಕಿಂಗ್ ಒಟಿಪಿ (OTP) ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ಕದಿಯಲು ಈ ರೀತಿ ಮಾಡುತ್ತಾರೆ."
        ],
        tip_en: "⚠️ Never click the link. Never call the personal phone number mentioned in the message. Go to your local bank branch or electricity office directly to verify.",
        tip_kn: "⚠️ ಸಂದೇಶದಲ್ಲಿರುವ ಲಿಂಕ್ ಅನ್ನು ಎಂದಿಗೂ ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ. ಅದರಲ್ಲಿರುವ ವೈಯಕ್ತಿಕ ಫೋನ್ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಬೇಡಿ. ಪರಿಶೀಲಿಸಲು ನೇರವಾಗಿ ನಿಮ್ಮ ಸ್ಥಳೀಯ ಬ್ಯಾಂಕ್ ಶಾಖೆ ಅಥವಾ ವಿದ್ಯುತ್ ಕಚೇರಿಗೆ ಹೋಗಿ."
      };
    }

    const job_keywords = ["part time", "earn rs", "work from home", "youtube like", "earn daily", "telegram task"];
    if (job_keywords.some(j => m.includes(j)) || (m.includes("earn") && m.includes("rs"))) {
      return {
        score: 89,
        status: "danger",
        message_en: "HIGH RISK: Part-Time Job / Quick Money Scam!",
        message_kn: "ಹೆಚ್ಚಿನ ಅಪಾಯ: ಪಾರ್ಟ್-ಟೈಮ್ ಕೆಲಸ ಅಥವಾ ಸುಲಭವಾಗಿ ಹಣ ಗಳಿಸುವ ಸುಳ್ಳು ಆಮಿಷ!",
        details_en: [
          "Offers high payment (₹2,000 to ₹10,000 daily) for simple tasks like liking YouTube videos or review ratings.",
          "This is a 'Task Scam'. They will pay you a small amount first to build trust, then ask you to deposit thousands of rupees for 'VIP tasks' and steal all your money.",
          "Remember: No one gives high daily salaries for doing trivial online clicks."
        ],
        details_kn: [
          "ಯೂಟ್ಯೂಬ್ ವೀಡಿಯೊಗಳನ್ನು ಲೈಕ್ ಮಾಡಲು ದಿನಕ್ಕೆ ₹೨,೦೦೦ ದಿಂದ ₹೧ಣ,೦೦೦ ರವರೆಗೆ ಸುಲಭವಾಗಿ ಹಣ ಗಳಿಸುವ ಆಮಿಷವನ್ನು ಇದು ತೋರಿಸುತ್ತದೆ.",
          "ಇದು 'ಟಾಸ್ಕ್ ವಂಚನೆ' ಆಗಿದೆ. ಅವರು ಮೊದಲು ನಂಬಿಕೆ ಮೂಡಿಸಲು ಸಣ್ಣ ಮೊತ್ತವನ್ನು ನೀಡುತ್ತಾರೆ, ನಂತರ 'ವಿಐಪಿ ಟಾಸ್ಕ್' ಗಾಗಿ ಸಾವಿರಾರು ರೂಪಾಯಿ ಡೆಪಾಸಿಟ್ ಮಾಡಲು ಕೇಳಿ ನಿಮ್ಮ ಹಣವನ್ನು ದೋಚುತ್ತಾರೆ.",
          "ನೆನಪಿಡಿ: ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಕೇವಲ ಕ್ಲಿಕ್ ಮಾಡುವುದಕ್ಕೆ ಯಾರೂ ಇಷ್ಟು ಹೆಚ್ಚಿನ ದಿನಗೂಲಿ lifestyle ನೀಡುವುದಿಲ್ಲ."
        ],
        tip_en: "⚠️ Ignore and block this number. Do not send any money or display your personal documents to these agencies.",
        tip_kn: "⚠️ ಈ ಸಂಖ್ಯೆಯನ್ನು ನಿರ್ಲಕ್ಷಿಸಿ ಮತ್ತು ಬ್ಲಾಕ್ ಮಾಡಿ. ಈ ಏಜೆನ್ಸಿಗಳಿಗೆ ಯಾವುದೇ ಹಣವನ್ನು ಕಳುಹಿಸಬೇಡಿ ಅಥವಾ ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ದಾಖಲೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಬೇಡಿ."
      };
    }

    if (m.includes("http://") || m.includes("https://") || m.includes(".com") || m.includes(".info") || m.includes(".xyz")) {
      return {
        score: 75,
        status: "caution",
        message_en: "CAUTION: Unverified Web Link / Website URL Detected.",
        message_kn: "ಎಚ್ಚರಿಕೆ: ಪರಿಶೀಲಿಸದ ವೆಬ್ ಲಿಂಕ್ ಪತ್ತೆಯಾಗಿದೆ.",
        details_en: [
          "The message contains a link that will open an external website.",
          "Scammers create fake websites that look exactly like Google Pay, PhonePe, or government offices to steal your PIN or bank details.",
          "Avoid clicking links sent by unknown people."
        ],
        details_kn: [
          "ಸಂದೇಶವು ಬಾಹ್ಯ ವೆಬ್‌ಸೈಟ್ ಅನ್ನು ತೆರೆಯುವ ಲಿಂಕ್ ಅನ್ನು ಒಳಗೊಂಡಿದೆ.",
          "ವಂಚಕರು ನಿಮ್ಮ ಪಿನ್ ಅಥವಾ ಬ್ಯಾಂಕ್ ವಿವರಗಳನ್ನು ಕದಿಯಲು ಗೂಗಲ್ ಪೇ, ಫೋನ್‌ಪೇ ಅಥವಾ ಸರ್ಕಾರಿ ಕಚೇರಿಗಳಂತೆಯೇ ಕಾಣುವ ನಕಲಿ ವೆಬ್‌ಸೈಟ್‌ಗಳನ್ನು ರಚಿಸುತ್ತಾರೆ.",
          "ಅಪರಿಚಿತ ವ್ಯಕ್ತಿಗಳು ಕಳುಹಿಸಿದ ಲಿಂಕ್‌ಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡುವುದನ್ನು ತಪ್ಪಿಸಿ."
        ],
        tip_en: "⚠️ Check if the URL matches the official brand website (e.g. '.gov.in' for official Indian government, not '.info' or '.cc'). If in doubt, do not open.",
        tip_kn: "⚠️ ವೆಬ್‌ಸೈಟ್ ವಿಳಾಸವು ಅಧಿಕೃತ ಬ್ರ್ಯಾಂಡ್ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ (ಉದಾಹರಣೆಗೆ ಅಧಿಕೃತ ಭಾರತ ಸರ್ಕಾರಕ್ಕೆ '.gov.in' ಇರಬೇಕು, '.info' ಅಥವಾ '.cc' ಅಲ್ಲ). ಸಂದೇಹವಿದ್ದರೆ ಲಿಂಕ್ ಓಪನ್ ಮಾಡಬೇಡಿ."
      };
    }

    return {
      score: 40,
      status: "caution",
      message_en: "CAUTION: Unverified message. Be cautious of forward forwards.",
      message_kn: "ಎಚ್ಚರಿಕೆ: ಪರಿಶೀಲಿಸದ ಸಂದೇಶ. ಮುನ್ನೆಚ್ಚರಿಕೆ ವಹಿಸಿ.",
      details_en: [
        "This message does not match known threat patterns directly, but remains unverified.",
        "First-time internet users are often tricked by WhatsApp forward messages containing fake news or false claims.",
        "Always consult a tech-savvy child, friend, or relative before taking action on forwarded messages."
      ],
      details_kn: [
        "ಈ ಸಂದೇಶವು ನೇರವಾಗಿ ತಿಳಿದಿರುವ ಅಪಾಯದ ಮಾದರಿಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ, ಆದರೆ ಇದು ಇನ್ನೂ ಪರಿಶೀಲಿಸಲ್ಪಟ್ಟಿಲ್ಲ.",
        "ಗ್ರಾಮೀಣ ಭಾಗದ ಮುಗ್ಧ ಬಳಕೆದಾರರು ಹೆಚ್ಚಾಗಿ ಸುಳ್ಳು ಸುದ್ದಿ ಅಥವಾ ನಕಲಿ ಮಾಹಿತಿ ಹೊಂದಿರುವ ವಾಟ್ಸಾಪ್ ಫಾರ್ವರ್ಡ್ ಸಂದೇಶಗಳಿಂದ ಮೋಸಹೋಗುತ್ತಾರೆ.",
        "ಫಾರ್ವರ್ಡ್ ಮಾಡಿದ ಸಂದೇಶಗಳ ಮೇಲೆ ಯಾವುದೇ ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳುವ ಮೊದಲು ಯಾವಾಗಲೂ ಮನೆಯಲ್ಲಿರುವ ವಿದ್ಯಾವಂತ ಮಕ್ಕಳನ್ನು ಅಥವಾ ವಿಶ್ವಾಸಾರ್ಹ ಸ್ನೇಹಿತರನ್ನು ಸಂಪರ್ಕಿಸಿ."
      ],
      tip_en: "⚠️ Do not forward this message further until you are 100% sure of its truthfulness.",
      tip_kn: "⚠️ ಈ ಸಂದೇಶದ ಸತ್ಯಾಸತ್ಯತೆ ನಿಮಗೆ ೧೦೦% ಖಚಿತವಾಗುವವರೆಗೆ ಇದನ್ನು ಇತರರಿಗೆ ಫಾರ್ವರ್ಡ್ ಮಾಡಬೇಡಿ."
    };
  };

  // -------------------------------------------------------------
  // API Call Actions
  // -------------------------------------------------------------
  const handleCheckUpi = async (e, directVal = null) => {
    if (e) e.preventDefault();
    const upiVal = directVal !== null ? directVal : upiInput;
    if (!upiVal.trim()) return;

    setUpiLoading(true);
    setUpiResult(null);
    stopAudio();

    try {
      const response = await fetch('http://localhost:5000/api/analyze-upi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ upi: upiVal })
      });
      if (!response.ok) throw new Error("Server error");
      const data = await response.json();
      setUpiResult(data);
    } catch (err) {
      console.warn("Backend unavailable, using client-side smart rules:", err);
      // Perfect graceful fallback
      setTimeout(() => {
        setUpiResult(getLocalUpiAnalysis(upiVal));
      }, 600);
    } finally {
      setUpiLoading(false);
    }
  };

  const handleCheckMessage = async (e, directVal = null) => {
    if (e) e.preventDefault();
    const msgVal = directVal !== null ? directVal : messageInput;
    if (!msgVal.trim()) return;

    setMessageLoading(true);
    setMessageResult(null);
    stopAudio();

    try {
      const response = await fetch('http://localhost:5000/api/analyze-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msgVal })
      });
      if (!response.ok) throw new Error("Server error");
      const data = await response.json();
      setMessageResult(data);
    } catch (err) {
      console.warn("Backend unavailable, using client-side smart rules:", err);
      // Perfect graceful fallback
      setTimeout(() => {
        setMessageResult(getLocalMessageAnalysis(msgVal));
      }, 600);
    } finally {
      setMessageLoading(false);
    }
  };

  const handleSimulatePayment = (e) => {
    e.preventDefault();
    if (!simRecipient.trim() || !simAmount.trim()) return;

    const amt = parseFloat(simAmount);
    setSimMessage('');
    
    if (amt > 5000) {
      // Trigger Behavioral Safety Nudge Modal
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
      ? `✅ Payment simulator approved: Transfer of ₹${simAmount} to ${simRecipient} successfully practiced! Always remember these safety checks.`
      : `✅ ಪಾವತಿ ಅಭ್ಯಾಸ ಯಶಸ್ವಿಯಾಗಿದೆ: ${simRecipient} ಗೆ ₹${simAmount} ಕಳುಹಿಸುವ ಅಭ್ಯಾಸ ಯಶಸ್ವಿ! ಈ ರಕ್ಷಣಾ ನಿಯಮಗಳನ್ನು ಯಾವಾಗಲೂ ನೆನಪಿಡಿ.`;
    setSimMessage(msg);
  };

  // Helper for UI styling classes
  const getStatusColorClasses = (status) => {
    switch (status) {
      case 'safe':
        return {
          bg: 'bg-emerald-50 border-emerald-300 text-emerald-900',
          badge: 'bg-emerald-500 text-white',
          text: 'text-emerald-600',
          accent: 'border-emerald-500',
          meter: 'bg-emerald-500'
        };
      case 'caution':
        return {
          bg: 'bg-amber-50 border-amber-300 text-amber-900',
          badge: 'bg-amber-500 text-white',
          text: 'text-amber-600',
          accent: 'border-amber-500',
          meter: 'bg-amber-500'
        };
      case 'danger':
        default:
        return {
          bg: 'bg-rose-50 border-rose-300 text-rose-900',
          badge: 'bg-rose-500 text-white',
          text: 'text-rose-600',
          accent: 'border-rose-500',
          meter: 'bg-rose-600'
        };
    }
  };

  return (
    <div className="min-h-screen bg-grid-pattern bg-[#fcfdfa] pb-12 flex flex-col font-sans">
      
      {/* Top Banner and Language Toggle */}
      <header className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-800 text-white shadow-lg sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-full safety-pulse">
              <ShieldCheck className="w-8 h-8 text-emerald-200" />
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
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 active:scale-95 transition-all text-slate-950 font-bold px-5 py-2.5 rounded-full text-base shadow-md border-2 border-amber-300"
          >
            <span>🔄</span>
            {lang === 'en' ? 'ಕನ್ನಡದಲ್ಲಿ ಓದಿ (ಕನ್ನಡ)' : 'Read in English (ಇಂಗ್ಲಿಷ್)'}
          </button>
        </div>
      </header>

      {/* Hero Welcome Message */}
      <section className="bg-emerald-50 border-b border-emerald-100 py-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-lg sm:text-xl font-bold text-emerald-950">
            👋 {activeTranslations.tagline}
          </h2>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="flex-grow max-w-4xl w-full mx-auto px-4 mt-6">
        
        {/* Navigation Tabs */}
        <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl mb-6 shadow-inner border border-slate-200">
          <button
            onClick={() => setActiveTab('upi')}
            className={`py-3 px-2 rounded-xl text-center font-bold text-sm sm:text-lg transition-all duration-200 active:scale-95 flex flex-col sm:flex-row justify-center items-center gap-1.5 ${
              activeTab === 'upi'
                ? 'bg-white text-emerald-900 shadow-md border border-emerald-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span className="text-base sm:text-xl">🔍</span>
            <span className="hidden sm:inline">{lang === 'en' ? 'UPI / Phone Check' : 'ಯುಪಿಐ / ಫೋನ್ ಪರಿಶೀಲನೆ'}</span>
            <span className="sm:hidden">{lang === 'en' ? 'UPI Check' : 'ಯುಪಿಐ ಚೆಕ್'}</span>
          </button>

          <button
            onClick={() => setActiveTab('phishing')}
            className={`py-3 px-2 rounded-xl text-center font-bold text-sm sm:text-lg transition-all duration-200 active:scale-95 flex flex-col sm:flex-row justify-center items-center gap-1.5 ${
              activeTab === 'phishing'
                ? 'bg-white text-emerald-900 shadow-md border border-emerald-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span className="text-base sm:text-xl">✉️</span>
            <span className="hidden sm:inline">{lang === 'en' ? 'Message / Link Check' : 'ಸಂದೇಶ ಪರಿಶೀಲನೆ'}</span>
            <span className="sm:hidden">{lang === 'en' ? 'Msg Check' : 'ಸಂದೇಶ'}</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`py-3 px-2 rounded-xl text-center font-bold text-sm sm:text-lg transition-all duration-200 active:scale-95 flex flex-col sm:flex-row justify-center items-center gap-1.5 ${
              activeTab === 'simulator'
                ? 'bg-white text-emerald-900 shadow-md border border-emerald-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span className="text-base sm:text-xl">📱</span>
            <span className="hidden sm:inline">{lang === 'en' ? 'Safe Pay Simulator' : 'ಸುರಕ್ಷಿತ ಪಾವತಿ'}</span>
            <span className="sm:hidden">{lang === 'en' ? 'Pay Practice' : 'ಸಿಮ್ಯುಲೇಟರ್'}</span>
          </button>
        </div>

        {/* -------------------------------------------------------------
            TAB 1: UPI ID / PAYMENT RISK ANALYZER
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
                  className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all text-white font-black text-base sm:text-lg px-8 py-4 rounded-2xl disabled:bg-slate-400 shadow-md flex items-center justify-center gap-2"
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

            {/* Quick Demo Examples */}
            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2.5">
                {activeTranslations.upi.examples}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setUpiInput('pmkisan-relief@ybl');
                    handleCheckUpi(null, 'pmkisan-relief@ybl');
                  }}
                  className="px-4 py-2 text-xs sm:text-sm font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-full border border-rose-200 active:scale-95 transition-all"
                >
                  🛑 pmkisan-relief@ybl (Fake scheme)
                </button>
                <button
                  onClick={() => {
                    setUpiInput('merchant@icici');
                    handleCheckUpi(null, 'merchant@icici');
                  }}
                  className="px-4 py-2 text-xs sm:text-sm font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-full border border-emerald-200 active:scale-95 transition-all"
                >
                  🟢 merchant@icici (Safe Merchant)
                </button>
                <button
                  onClick={() => {
                    setUpiInput('9876543210');
                    handleCheckUpi(null, '9876543210');
                  }}
                  className="px-4 py-2 text-xs sm:text-sm font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-full border border-amber-200 active:scale-95 transition-all"
                >
                  🟡 9876543210 (Personal phone)
                </button>
              </div>
            </div>

            {/* Visual Risk Analyzer Result Card */}
            {upiResult && (
              <div className={`mt-6 rounded-3xl p-5 border-2 ${getStatusColorClasses(upiResult.status).bg} transition-all duration-300 shadow-md space-y-6`}>
                
                {/* Score and Verdict Header */}
                <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6 pb-5 border-b border-black/10">
                  
                  {/* Gauge Speedometer Visualizer */}
                  <div className="flex flex-col items-center">
                    <div className="gauge-container">
                      <div className="gauge-body"></div>
                      <div 
                        className={`gauge-fill ${getStatusColorClasses(upiResult.status).meter}`}
                        style={{
                          transform: `rotate(${upiResult.score * 1.8}deg)`
                        }}
                      ></div>
                      <div className="gauge-cover">
                        <span className="text-2xl font-black text-slate-800">{upiResult.score}</span>
                        <span className="text-xs font-bold text-slate-500 ml-0.5 mb-1">/100</span>
                      </div>
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500 mt-2">
                      {activeTranslations.upi.riskScore}
                    </span>
                  </div>

                  {/* High Level Verdict */}
                  <div className="text-center sm:text-right flex flex-col items-center sm:items-end gap-2">
                    <span className={`text-xl sm:text-2xl font-black px-5 py-2 rounded-full ${getStatusColorClasses(upiResult.status).badge}`}>
                      {upiResult.status === 'safe' && activeTranslations.upi.verdicts.safe}
                      {upiResult.status === 'caution' && activeTranslations.upi.verdicts.caution}
                      {upiResult.status === 'danger' && activeTranslations.upi.verdicts.danger}
                    </span>
                    
                    <p className="text-base sm:text-lg font-extrabold max-w-sm">
                      {lang === 'en' ? upiResult.message_en : upiResult.message_kn}
                    </p>
                  </div>
                </div>

                {/* Explanation Bullets */}
                <div className="space-y-3">
                  <h4 className="text-base font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <ShieldAlert className="w-5 h-5 text-slate-600" />
                    {activeTranslations.upi.warningTitle}
                  </h4>
                  
                  <ul className="space-y-3.5 pl-2">
                    {(lang === 'en' ? upiResult.details_en : upiResult.details_kn).map((detail, idx) => (
                      <li key={idx} className="text-base sm:text-lg font-bold flex items-start gap-2.5">
                        <span className="text-emerald-600 text-lg mt-0.5">🔹</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Audio Assistance Controls */}
                <div className="pt-4 flex justify-center sm:justify-start">
                  {isPlayingAudio ? (
                    <button
                      onClick={stopAudio}
                      className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 active:scale-95 text-white font-bold px-6 py-3 rounded-2xl text-base shadow-md border-2 border-slate-700"
                    >
                      <VolumeX className="w-6 h-6 animate-pulse text-rose-400" />
                      <span>{activeTranslations.upi.audioStop}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => playTTS(
                        lang === 'en'
                          ? `${upiResult.message_en}. Reasons. ${upiResult.details_en.join('. ')}`
                          : `${upiResult.message_kn}. ಕಾರಣಗಳು. ${upiResult.details_kn.join('. ')}`,
                        lang
                      )}
                      className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-base sm:text-lg shadow-md border-2 border-amber-400"
                    >
                      <Volume2 className="w-6 h-6 text-slate-950" />
                      <span>{activeTranslations.upi.audioBtn}</span>
                    </button>
                  )}
                </div>

              </div>
            )}

          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 2: MESSAGE / LINK PHISHING DETECTOR
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
                  className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all text-white font-black text-base sm:text-lg px-8 py-4 rounded-2xl disabled:bg-slate-400 shadow-md flex items-center justify-center gap-2 w-full sm:w-auto"
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

            {/* Quick Demo Examples */}
            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2.5">
                {activeTranslations.upi.examples}
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    const txt = "Send ₹500 processing fee to claim PM Awas Yojana housing subsidy immediately!";
                    setMessageInput(txt);
                    handleCheckMessage(null, txt);
                  }}
                  className="text-left px-4 py-3 text-xs sm:text-sm font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-2xl border border-rose-200 active:scale-95 transition-all w-full flex items-center gap-2"
                >
                  🛑 "Send ₹500 fee to claim PM Awas Yojana..." (Fake scheme fee scam)
                </button>
                <button
                  onClick={() => {
                    const txt = "URGENT: Your electricity power will be disconnected at 9:30 PM today because of your unpaid bill. Call our manager at 9876543210.";
                    setMessageInput(txt);
                    handleCheckMessage(null, txt);
                  }}
                  className="text-left px-4 py-3 text-xs sm:text-sm font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-2xl border border-rose-200 active:scale-95 transition-all w-full flex items-center gap-2"
                >
                  🛑 "URGENT: Your electricity power will be disconnected..." (Threat KYC scam)
                </button>
                <button
                  onClick={() => {
                    const txt = "Congratulations! You are selected for part-time job from home, earning ₹8,000 daily by liking videos. Click: easy-job.info";
                    setMessageInput(txt);
                    handleCheckMessage(null, txt);
                  }}
                  className="text-left px-4 py-3 text-xs sm:text-sm font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-2xl border border-amber-200 active:scale-95 transition-all w-full flex items-center gap-2"
                >
                  🟡 "Congratulations! You are selected for part-time job..." (Work scam link)
                </button>
              </div>
            </div>

            {/* Message Scan Results */}
            {messageResult && (
              <div className={`mt-6 rounded-3xl p-5 border-2 ${getStatusColorClasses(messageResult.status).bg} transition-all duration-300 shadow-md space-y-6`}>
                
                {/* Result Header */}
                <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6 pb-5 border-b border-black/10">
                  <div className="flex flex-col items-center">
                    <div className="gauge-container">
                      <div className="gauge-body"></div>
                      <div 
                        className={`gauge-fill ${getStatusColorClasses(messageResult.status).meter}`}
                        style={{
                          transform: `rotate(${messageResult.score * 1.8}deg)`
                        }}
                      ></div>
                      <div className="gauge-cover">
                        <span className="text-2xl font-black text-slate-800">{messageResult.score}</span>
                        <span className="text-xs font-bold text-slate-500 ml-0.5 mb-1">/100</span>
                      </div>
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500 mt-2">
                      {activeTranslations.upi.riskScore}
                    </span>
                  </div>

                  <div className="text-center sm:text-right flex flex-col items-center sm:items-end gap-2">
                    <span className={`text-xl sm:text-2xl font-black px-5 py-2 rounded-full ${getStatusColorClasses(messageResult.status).badge}`}>
                      {messageResult.status === 'safe' && activeTranslations.upi.verdicts.safe}
                      {messageResult.status === 'caution' && activeTranslations.upi.verdicts.caution}
                      {messageResult.status === 'danger' && activeTranslations.upi.verdicts.danger}
                    </span>
                    
                    <p className="text-base sm:text-lg font-extrabold max-w-sm">
                      {lang === 'en' ? messageResult.message_en : messageResult.message_kn}
                    </p>
                  </div>
                </div>

                {/* Explanation Bullets */}
                <div className="space-y-3">
                  <h4 className="text-base font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <ShieldAlert className="w-5 h-5 text-slate-600" />
                    {activeTranslations.upi.warningTitle}
                  </h4>
                  
                  <ul className="space-y-3.5 pl-2">
                    {(lang === 'en' ? messageResult.details_en : messageResult.details_kn).map((detail, idx) => (
                      <li key={idx} className="text-base sm:text-lg font-bold flex items-start gap-2.5">
                        <span className="text-emerald-600 text-lg mt-0.5">🔹</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highlighted What to Do Next Advice */}
                {messageResult.tip_en && (
                  <div className="bg-amber-100/90 border-2 border-amber-300 rounded-2xl p-4.5 space-y-2">
                    <h5 className="text-base font-black text-amber-950 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-700" />
                      {activeTranslations.phishing.nextStep}
                    </h5>
                    <p className="text-base sm:text-lg font-bold text-amber-900">
                      {lang === 'en' ? messageResult.tip_en : messageResult.tip_kn}
                    </p>
                  </div>
                )}

                {/* TTS Controls */}
                <div className="pt-2 flex justify-center sm:justify-start">
                  {isPlayingAudio ? (
                    <button
                      onClick={stopAudio}
                      className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 active:scale-95 text-white font-bold px-6 py-3 rounded-2xl text-base shadow-md border-2 border-slate-700"
                    >
                      <VolumeX className="w-6 h-6 animate-pulse text-rose-400" />
                      <span>{activeTranslations.upi.audioStop}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => playTTS(
                        lang === 'en'
                          ? `${messageResult.message_en}. Explanation. ${messageResult.details_en.join('. ')}. Advice. ${messageResult.tip_en}`
                          : `${messageResult.message_kn}. ಕಾರಣಗಳು. ${messageResult.details_kn.join('. ')}. ಸಲಹೆ. ${messageResult.tip_kn}`,
                        lang
                      )}
                      className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-base sm:text-lg shadow-md border-2 border-amber-400"
                    >
                      <Volume2 className="w-6 h-6 text-slate-950" />
                      <span>{activeTranslations.phishing.audioBtn}</span>
                    </button>
                  )}
                </div>

              </div>
            )}

          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 3: BEHAVIORAL SAFETY NUDGE SIMULATOR
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
                  {/* Bank/Wallet Header Mock */}
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
                      
                      {/* Interactive presets helper */}
                      <div className="flex gap-2 pt-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setSimRecipient('pmkisan-relief@ybl');
                            setSimAmount('8000');
                          }}
                          className="px-2.5 py-1 text-2xs font-extrabold bg-rose-100 text-rose-800 rounded-md border border-rose-200 active:scale-95 transition-all text-xs"
                        >
                          ₹8,000 preset
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSimRecipient('relative-help@ybl');
                            setSimAmount('3000');
                          }}
                          className="px-2.5 py-1 text-2xs font-extrabold bg-emerald-100 text-emerald-800 rounded-md border border-emerald-200 active:scale-95 transition-all text-xs"
                        >
                          ₹3,000 preset
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all text-white font-black py-4.5 rounded-2xl text-base shadow-md border-2 border-emerald-500"
                    >
                      {activeTranslations.nudge.btnSend}
                    </button>
                  </form>

                  {/* Simulator Success Output */}
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
                  <UserCheck className="w-6 h-6 text-emerald-600" />
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

      </main>

      {/* -------------------------------------------------------------
          BEHAVIORAL SAFETY NUDGE MODAL DIALOG
         ------------------------------------------------------------- */}
      {showNudgeModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-4 border-rose-500 shadow-2xl max-w-lg w-full p-6 animate-scale-up space-y-6">
            
            {/* Modal Header */}
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

            {/* Urgency Alert Warning */}
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
              <p className="text-base sm:text-lg font-bold text-rose-900 leading-snug">
                ⚠️ <strong>{activeTranslations.nudge.modalUrgency}</strong>
              </p>
            </div>

            {/* Safety Checkbox verification */}
            <div className="space-y-4">
              <label className="flex items-start gap-3 p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer font-bold text-base sm:text-lg">
                <input
                  type="checkbox"
                  checked={confirmChecks.knowPerson}
                  onChange={(e) => setConfirmChecks({ ...confirmChecks, knowPerson: e.target.checked })}
                  className="w-6 h-6 border-2 border-slate-400 rounded-md text-emerald-600 mt-0.5 shrink-0"
                />
                <span>{activeTranslations.nudge.modalCheck1}</span>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer font-bold text-base sm:text-lg">
                <input
                  type="checkbox"
                  checked={confirmChecks.noThreat}
                  onChange={(e) => setConfirmChecks({ ...confirmChecks, noThreat: e.target.checked })}
                  className="w-6 h-6 border-2 border-slate-400 rounded-md text-emerald-600 mt-0.5 shrink-0"
                />
                <span>{activeTranslations.nudge.modalCheck2}</span>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer font-bold text-base sm:text-lg">
                <input
                  type="checkbox"
                  checked={confirmChecks.noPrize}
                  onChange={(e) => setConfirmChecks({ ...confirmChecks, noPrize: e.target.checked })}
                  className="w-6 h-6 border-2 border-slate-400 rounded-md text-emerald-600 mt-0.5 shrink-0"
                />
                <span>{activeTranslations.nudge.modalCheck3}</span>
              </label>
            </div>

            {/* Modal Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  setShowNudgeModal(false);
                  const msg = lang === 'en'
                    ? "❌ Good choice! Transaction stopped. Scammers will try to pressure you, but stopping saved your money!"
                    : "❌ ಉತ್ತಮ ಆಯ್ಕೆ! ಪಾವತಿಯನ್ನು ನಿಲ್ಲಿಸಲಾಗಿದೆ. ವಂಚಕರು ನಿಮ್ಮ ಮೇಲೆ ಒತ್ತಡ ಹೇರಲು ಪ್ರಯತ್ನಿಸುತ್ತಾರೆ, ಆದರೆ ಅದನ್ನು ನಿಲ್ಲಿಸಿದ್ದು ನಿಮ್ಮ ಹಣವನ್ನು ಉಳಿಸಿದೆ!";
                  setSimMessage(msg);
                }}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-black py-4.5 rounded-2xl text-base sm:text-lg border-2 border-rose-500 shadow-md active:scale-95 transition-all text-center"
              >
                {activeTranslations.nudge.btnCancel}
              </button>

              <button
                onClick={handleConfirmNudge}
                disabled={!(confirmChecks.knowPerson && confirmChecks.noThreat && confirmChecks.noPrize)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:bg-slate-100 text-slate-800 font-extrabold py-4.5 rounded-2xl text-base sm:text-lg border border-slate-300 shadow-sm active:scale-95 transition-all text-center"
              >
                {activeTranslations.nudge.btnConfirm}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Footer Branding */}
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
