import os
import re
import json
from datetime import datetime, date, time
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Configure SQLite Database with Flask-SQLAlchemy
db_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'fraudshield.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Database Models
class ScanHistory(db.Model):
    __tablename__ = 'scan_history'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)  # 'upi', 'qr', 'phishing', 'otp', 'loan'
    input = db.Column(db.Text, nullable=False)
    risk_score = db.Column(db.Integer, nullable=False)
    result = db.Column(db.String(50), nullable=False)  # 'safe', 'caution', 'danger'
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
            "input": self.input,
            "risk_score": self.risk_score,
            "result": self.result,
            "timestamp": self.timestamp.isoformat()
        }

class ReportedScams(db.Model):
    __tablename__ = 'reported_scams'
    id = db.Column(db.Integer, primary_key=True)
    input = db.Column(db.Text, nullable=False)
    scam_type = db.Column(db.String(100), nullable=False)
    reported_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "input": self.input,
            "scam_type": self.scam_type,
            "reported_at": self.reported_at.isoformat()
        }

# Create tables inside application context
with app.app_context():
    db.create_all()

# Initialize Gemini client if key is available and valid
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
HAS_REAL_API = False

# Avoid using the placeholder API key
if GEMINI_API_KEY and GEMINI_API_KEY != "your_api_key_here":
    try:
        import google.generativeai as genai
        genai.configure(api_key=GEMINI_API_KEY)
        HAS_REAL_API = True
        print("Gemini API initialized successfully in live mode.")
    except Exception as e:
        print(f"Error initializing Gemini client, running in local fallback mode: {e}")
else:
    print("No valid Gemini API key found. Running in Smart Mock Mode.")


# -------------------------------------------------------------
# Local Fallback Smart Rule Analyzer Logic
# -------------------------------------------------------------

def analyze_upi_local(upi_input):
    """
    Analyzes UPI ID or phone number locally with rule-based heuristics.
    Returns rich English and Kannada warning details.
    """
    upi_clean = upi_input.strip().lower()
    
    # 1. Demo Scenario: Fake PM Kisan Scheme
    if "pmkisan" in upi_clean or "pm-kisan" in upi_clean or upi_clean == "pmkisan-relief@ybl":
        return {
            "score": 95,
            "status": "danger",
            "category_en": "Government Impersonation",
            "category_kn": "ಸರ್ಕಾರಿ ಹೆಸರಿನ ವಂಚನೆ",
            "message_en": "CRITICAL DANGER: Fake Government Scheme Impersonation detected!",
            "message_kn": "ತೀವ್ರ ಅಪಾಯ: ನಕಲಿ ಸರ್ಕಾರಿ ಯೋಜನೆಯ ಹೆಸರು ಪತ್ತೆಯಾಗಿದೆ!",
            "details_en": [
                "The UPI address contains 'pmkisan' or 'relief' which is designed to look like the official PM-KISAN agricultural scheme.",
                "Official government relief funds use official government UPI addresses (typically ending in @sbi or @upi verified merchants), never ordinary '@ybl' or individual accounts.",
                "This is a common scam targeting rural farmers to steal their hard-earned money."
            ],
            "details_kn": [
                "ಯುಪಿಐ ವಿಳಾಸವು 'pmkisan' ಅಥವಾ 'relief' ಅನ್ನು ಒಳಗೊಂಡಿದೆ, ಇದು ಅಧಿಕೃತ ಪಿಎಂ-ಕಿಸಾನ್ ಕೃಷಿ ಯೋಜನೆಯಂತೆ ಕಾಣಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.",
                "ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪರಿಹಾರ ನಿಧಿಗಳು ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಯುಪಿಐ ವಿಳಾಸಗಳನ್ನು ಬಳಸುತ್ತವೆ (ಸಾಮಾನ್ಯವಾಗಿ @sbi ಅಥವಾ @upi ಪರಿಶೀಲಿಸಿದ ವ್ಯಾಪಾರಿಗಳು), ಎಂದಿಗೂ ಸಾಮಾನ್ಯ '@ybl' ಅಥವಾ ವೈಯಕ್ತಿಕ ಖಾತೆಗಳನ್ನು ಬಳಸುವುದಿಲ್ಲ.",
                "ಇದು ಗ್ರಾಮೀಣ ರೈತರ ಕಷ್ಟದ ಹಣವನ್ನು ದೋಚಲು ವಂಚಕರು ಬಳಸುವ ಸಾಮಾನ್ಯ ತಂತ್ರವಾಗಿದೆ."
            ],
            "steps_en": [
                "1. Do NOT transfer any money to this address.",
                "2. Report the contact on WhatsApp or SMS where you received this payment link.",
                "3. Block the number and tell your relatives that official government schemes never ask for payments over UPI."
            ],
            "steps_kn": [
                "1. ಈ ವಿಳಾಸಕ್ಕೆ ಯಾವುದೇ ಹಣವನ್ನು ವರ್ಗಾಯಿಸಬೇಡಿ.",
                "2. ಈ ಪಾವತಿ ಲಿಂಕ್ ಬಂದ ವಾಟ್ಸಾಪ್ ಅಥವಾ ಎಸ್‌ಎಂಎಸ್ ಸಂಪರ್ಕವನ್ನು ವರದಿ ಮಾಡಿ.",
                "3. ಸಂಖ್ಯೆಯನ್ನು ಬ್ಲಾಕ್ ಮಾಡಿ ಮತ್ತು ಅಧಿಕೃತ ಯೋಜನೆಗಳು ಎಂದಿಗೂ ಯುಪಿಐ ಮೂಲಕ ಹಣ ಕೇಳುವುದಿಲ್ಲ ಎಂಬುದನ್ನು ತಿಳಿಸಿ."
            ]
        }
        
    # 2. Demo Scenario: Verified Merchant
    if upi_clean == "merchant@icici" or upi_clean == "merchant@paytm" or upi_clean == "utility@sbi":
        return {
            "score": 5,
            "status": "safe",
            "message_en": "SAFE: This is a verified business merchant account.",
            "message_kn": "ಸುರಕ್ಷಿತ: ಇದು ಪರಿಶೀಲಿಸಲ್ಪಟ್ಟ ಅಧಿಕೃತ ವ್ಯಾಪಾರ ಖಾತೆಯಾಗಿದೆ.",
            "details_en": [
                "This UPI ID is registered to a standard bank merchant handle (@icici / @sbi).",
                "No suspicious high-pressure behavior or scam history is detected for this merchant account.",
                "Safe for regular, verified payments."
            ],
            "details_kn": [
                "ಈ ಯುಪಿಐ ಐಡಿ ಪ್ರಮಾಣಿತ ಬ್ಯಾಂಕ್ ವ್ಯಾಪಾರಿ ಹ್ಯಾಂಡಲ್‌ನಲ್ಲಿ ನೋಂದಾಯಿಸಲ್ಪಟ್ಟಿದೆ (@icici / @sbi).",
                "ಈ ವ್ಯಾಪಾರ ಖಾತೆಗೆ ಯಾವುದೇ ಶಂಕಾಸ್ಪದ ವಂಚನೆಯ ಇತಿಹಾಸ ಕಂಡುಬಂದಿಲ್ಲ.",
                "ನಿಯಮಿತ, ಪರಿಶೀಲಿಸಿದ ಪಾವತಿಗಳಿಗೆ ಸುರಕ್ಷಿತವಾಗಿದೆ."
            ],
            "tip_en": "Always verify amount and verified recipient name before confirming your secret PIN.",
            "tip_kn": "ನಿಮ್ಮ ರಹಸ್ಯ ಪಿನ್ ನಮೂದಿಸುವ ಮೊದಲು ಮೊತ್ತ ಮತ್ತು ಪರಿಶೀಲಿಸಿದ ಸ್ವೀಕೃತದಾರರ ಹೆಸರನ್ನು ಯಾವಾಗಲೂ ಪರಿಶೀಲಿಸಿ."
        }

    # 3. High Risk Keywords
    danger_keywords = ["lottery", "gift", "prize", "cashback", "win", "rewards", "lucky", "kbc", "phonepe-reward", "awas", "yojana", "police", "customs", "fine"]
    for kw in danger_keywords:
        if kw in upi_clean:
            return {
                "score": 88,
                "status": "danger",
                "category_en": "Fake Prize / Lottery Scam",
                "category_kn": "ನಕಲಿ ಬಹುಮಾನ / ಲಾಟರಿ ವಂಚನೆ",
                "message_en": f"WARNING: Suspected Prize / Scheme Scam UPI ID containing '{kw}'!",
                "message_kn": f"ಎಚ್ಚರಿಕೆ: ಬಹುಮಾನ ಅಥವಾ ಉಡುಗೊರೆ ಹೆಸರಿನಲ್ಲಿ ವಂಚಿಸುವ ಶಂಕಾಸ್ಪದ ಯುಪಿಐ ಐಡಿ. '{kw}' ಪದ ಪತ್ತೆಯಾಗಿದೆ!",
                "details_en": [
                    f"The payment address contains '{kw}', which is a typical hook used by cyber-criminals to attract victims with fake reward schemes.",
                    "Genuine platforms will never ask you to send money to a personal or random UPI address to receive a reward.",
                    "Do not transfer any money. It is highly likely to be a scam."
                ],
                "details_kn": [
                    f"ಪಾವತಿ ವಿಳಾಸವು '{kw}' ಅನ್ನು ಒಳಗೊಂಡಿದೆ, ಇದು ಸೈಬರ್ ಅಪರಾಧಿಗಳು ನಕಲಿ ಬಹುಮಾನ ಯೋಜನೆಗಳೊಂದಿಗೆ ಜನರನ್ನು ಆಕರ್ಷಿಸಲು ಬಳಸುವ ವಿಶಿಷ್ಟ ಪದವಾಗಿದೆ.",
                    "ನಿಜವಾದ ಸಂಸ್ಥೆಗಳು ಬಹುಮಾನವನ್ನು ನೀಡಲು ವೈಯಕ್ತಿಕ ಅಥವಾ ಯಾದೃಚ್ಛಿಕ ಯುಪಿಐ ವಿಳಾಸಕ್ಕೆ ಹಣವನ್ನು ಕಳುಹಿಸಲು ಎಂದಿಗೂ ಕೇಳುವುದಿಲ್ಲ.",
                    "ಯಾವುದೇ ಹಣವನ್ನು ವರ್ಗಾಯಿಸಬೇಡಿ. ಇದು ವಂಚನೆಯಾಗಿರುವ ಸಾಧ್ಯತೆ ತುಂಬಾ ಹೆಚ್ಚಿದೆ."
                ],
                "steps_en": [
                    "1. Never pay any fee to claim lotteries or scratch card rewards.",
                    "2. Scammers create accounts with words like 'rewards' to sound legitimate. Disregard immediately.",
                    "3. Inform your local police or report the incident on cybercrime.gov.in."
                ],
                "steps_kn": [
                    "1. ಲಾಟರಿ ಅಥವಾ ಸ್ಕ್ರ್ಯಾಚ್ ಕಾರ್ಡ್ ಬಹುಮಾನ ಪಡೆಯಲು ಯಾವುದೇ ಶುಲ್ಕ ಪಾವತಿಸಬೇಡಿ.",
                    "2. ವಂಚಕರು ನಂಬಿಕೆ ಮೂಡಿಸಲು 'ಬಹುಮಾನ' (rewards) ಪದಗಳನ್ನು ಬಳಸಿ ಖಾತೆ ತೆರೆಯುತ್ತಾರೆ. ತಕ್ಷಣ ತಿರಸ್ಕರಿಸಿ.",
                    "3. ನಿಮ್ಮ ಸ್ಥಳೀಯ ಪೊಲೀಸರಿಗೆ ತಿಳಿಸಿ ಅಥವಾ cybercrime.gov.in ನಲ್ಲಿ ದೂರು ದಾಖಲಿಸಿ."
                ]
            }

    # 4. Check if Phone Number
    phone_match = re.search(r'^\+?(91)?[6-9]\d{9}$', upi_clean.split('@')[0])
    if phone_match or upi_clean.isdigit():
        return {
            "score": 45,
            "status": "caution",
            "message_en": "CAUTION: Unverified Personal Phone / Number Transfer.",
            "message_kn": "ಎಚ್ಚರಿಕೆ: ಇದು ಪರಿಶೀಲಿಸದ ವೈಯಕ್ತಿಕ ಫೋನ್ ಸಂಖ್ಯೆ ವರ್ಗಾವಣೆಯಾಗಿದೆ.",
            "details_en": [
                "This payment is directly linked to an individual's phone number.",
                "Anyone can link their bank account to a phone number. It does not prove their identity.",
                "CRITICAL RULE: Call the person to verify their voice and identity before sending money. Do not pay if you received this number via WhatsApp from an unknown contact."
            ],
            "details_kn": [
                "ಈ ಪಾವತಿಯು ನೇರವಾಗಿ ವ್ಯಕ್ತಿಯ ಫೋನ್ ಸಂಖ್ಯೆಗೆ ಸಂಬಂಧಿಸಿದೆ.",
                "ಯಾರು ಬೇಕಾದರೂ ತಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಯನ್ನು ಫೋನ್ ಸಂಖ್ಯೆಗೆ ಲಿಂಕ್ ಮಾಡಬಹುದು. ಇದು ಅವರ ಗುರುತನ್ನು ಸಾಬೀತುಪಡಿಸುವುದಿಲ್ಲ.",
                "ಪ್ರಮುಖ ನಿಯಮ: ಹಣವನ್ನು ಕಳುಹಿಸುವ ಮೊದಲು ವ್ಯಕ್ತಿಗೆ ಕರೆ ಮಾಡಿ ಅವರ ಧ್ವನಿ ಮತ್ತು ಗುರುತನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ. ಅಪರಿಚಿತರಿಂದ ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಈ ಸಂಖ್ಯೆ ಬಂದಿದ್ದರೆ ಹಣ ಕಳುಹಿಸಬೇಡಿ."
            ]
        }

    # Default Case (General Unknown UPI)
    return {
        "score": 50,
        "status": "caution",
        "message_en": "CAUTION: Unknown Individual or Unregistered Address.",
        "message_kn": "ಎಚ್ಚರಿಕೆ: ಅಪರಿಚಿತ ವ್ಯಕ್ತಿ ಅಥವಾ ನೋಂದಾಯಿಸದ ಪಾವತಿ ವಿಳಾಸ.",
        "details_en": [
            "This is a standard custom personal UPI ID, not a verified business.",
            "Always double-check the recipient name displayed in your payment app (e.g. PhonePe, GPay, Paytm) before clicking 'Pay'.",
            "If someone created urgency by telling you your bank account, electricity bill, or phone service is expiring, do not pay."
        ],
        "details_kn": [
            "ಇದು ಸಾಮಾನ್ಯ ವೈಯಕ್ತಿಕ ಯುಪಿಐ ಐಡಿಯಾಗಿದೆ, ಪರಿಶೀಲಿಸಿದ ವ್ಯಾಪಾರವಲ್ಲ.",
            "ಪಾವತಿ ಮಾಡುವ ಮೊದಲು ನಿಮ್ಮ ಆ್ಯಪ್‌ನಲ್ಲಿ (PhonePe, GPay, Paytm) ತೋರಿಸುವ ಸ್ವೀಕೃತದಾರರ ಹೆಸರನ್ನು ಯಾವಾಗಲೂ ಪರಿಶೀಲಿಸಿ.",
            "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆ, ವಿದ್ಯುತ್ ಬಿಲ್ ಅಥವಾ ಫೋನ್ ಸೇವೆ ಅವಧಿ ಮುಗಿಯುತ್ತಿದೆ ಎಂದು ಹೇಳಿ ಯಾರಾದರೂ ತುರ್ತು ಒತ್ತಡ ಹೇರಿದ್ದರೆ, ಹಣ ಪಾವತಿಸಬೇಡಿ."
        ]
    }


def analyze_message_local(msg_input):
    """
    Analyzes WhatsApp messages, SMS, or URLs locally for scam patterns.
    """
    msg_clean = msg_input.strip().lower()
    
    # 1. Demo Scenario: Fake PM Awas Yojana
    if "pm awas yojana" in msg_clean or "awas yojana" in msg_clean or ("processing fee" in msg_clean and "claim" in msg_clean):
        return {
            "score": 98,
            "status": "danger",
            "category_en": "Government Subsidy Scam",
            "category_kn": "ಸರ್ಕಾರಿ ಸವಲತ್ತು ಯೋಜನೆ ವಂಚನೆ",
            "message_en": "CRITICAL DANGER: Fake Government Subsidy & Phishing Scam Detected!",
            "message_kn": "ತೀವ್ರ ಅಪಾಯ: ನಕಲಿ ಸರ್ಕಾರಿ ಸಹಾಯಧನ ಮತ್ತು ವಂಚನೆಯ ಸಂದೇಶ ಪತ್ತೆಯಾಗಿದೆ!",
            "details_en": [
                "This message asks for an upfront 'processing fee' or 'registration fee' to claim the government 'PM Awas Yojana' housing subsidy.",
                "FACT: The Government of India never asks for any upfront fees, processing charges, or UPI transfers to approve PM Awas Yojana or any other scheme.",
                "This is a classic 'advance-fee fraud' designed to steal money from rural citizens seeking government support."
            ],
            "details_kn": [
                "ಈ ಸಂದೇಶವು ಸರ್ಕಾರಿ 'ಪಿಎಂ ಆವಾಸ್ ಯೋಜನೆ' ವಸತಿ ಸಹಾಯಧನವನ್ನು ಪಡೆಯಲು ಮುಂಗಡ 'ಸಂಸ್ಕಾರ ಶುಲ್ಕ' (processing fee) ಅಥವಾ 'ನೋಂದಣಿ ಶುಲ್ಕ' ಕೇಳುತ್ತಿದೆ.",
                "ಸತ್ಯ: ಭಾರತ ಸರ್ಕಾರವು ಪಿಎಂ ಆವಾಸ್ ಯೋಜನೆ ಅಥವಾ ಯಾವುದೇ ಇತರ ಯೋಜನೆಯನ್ನು ಅನುಮೋದಿಸಲು ಯಾವುದೇ ಮುಂಗಡ ಶುಲ್ಕ ಅಥವಾ ಯುಪಿಐ ವರ್ಗಾವಣೆಗಳನ್ನು ಎಂದಿಗೂ ಕೇಳುವುದಿಲ್ಲ.",
                "ಇದು ಸರ್ಕಾರಿ ಸಹಾಯ ಪಡೆಯಲು ಬಯಸುವ ಗ್ರಾಮೀಣ ಜನರಿಂದ ಹಣವನ್ನು ದೋಚಲು ರೂಪಿಸಿದ ವಂಚನೆಯಾಗಿದೆ."
            ],
            "steps_en": [
                "1. Do NOT pay any processing fee or processing charge.",
                "2. Delete this WhatsApp forward and warn your family members immediately.",
                "3. File a complaint on the official portal cybercrime.gov.in."
            ],
            "steps_kn": [
                "1. ಯಾವುದೇ ಸಂಸ್ಕರಣಾ ಶುಲ್ಕ ಅಥವಾ ಮುಂಗಡ ಹಣವನ್ನು ಪಾವತಿಸಬೇಡಿ.",
                "2. ಈ ವಾಟ್ಸಾಪ್ ಸಂದೇಶವನ್ನು ತಕ್ಷಣ ಅಳಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಕುಟುಂಬದವರನ್ನು ಎಚ್ಚರಿಸಿ.",
                "3. ಅಧಿಕೃತ ಪೋರ್ಟಲ್ cybercrime.gov.in ನಲ್ಲಿ ದೂರು ದಾಖಲಿಸಿ."
            ],
            "tip_en": "⚠️ Do NOT pay any processing fee. Tell your family members that official schemes are only applied through authorized Gram Panchayat offices.",
            "tip_kn": "⚠️ ಯಾವುದೇ ಶುಲ್ಕ ಪಾವತಿಸಬೇಡಿ. ಅಧಿಕೃತ ಯೋಜನೆಗಳಿಗೆ ಗ್ರಾಮ್ ಪಂಚಾಯತ್ ಕಚೇರಿಗಳ ಮೂಲಕ ಮಾತ್ರ ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗುತ್ತದೆ ಎಂಬುದನ್ನು ತಿಳಿಸಿ."
        }

    # 2. Urgent KYC / Account Suspension Scam
    kyc_keywords = ["kyc", "blocked", "suspended", "electricity bill", "power cut", "eb bill", "bank account", "update document", "pan card"]
    if any(k in msg_clean for k in kyc_keywords):
        return {
            "score": 92,
            "status": "danger",
            "category_en": "KYC / Service Suspension Threat",
            "category_kn": "ಕೆವೈಸಿ / ಸೇವೆ ಸ್ಥಗಿತದ ಬೆದರಿಕೆ",
            "message_en": "HIGH RISK: Urgent Account Block / Service Suspension Scam!",
            "message_kn": "ಹೆಚ್ಚಿನ ಅಪಾಯ: ಖಾತೆ ಬ್ಲಾಕ್ ಅಥವಾ ವಿದ್ಯುತ್ ಸ್ಥಗಿತದ ಸುಳ್ಳು ಬೆದರಿಕೆ!",
            "details_en": [
                "The message uses 'Urgency Tactics' threatening that your bank account, SIM card, or electricity service will be blocked TONIGHT if you don't call a number or click a link.",
                "Banks or Electricity Boards (like BESCOM/HESCOM) never send simple WhatsApp messages with personal phone numbers for urgent payment or KYC updating.",
                "Scammers use fear to make you pay or share your banking OTP/Password."
            ],
            "details_kn": [
                "ನೀವು ತಕ್ಷಣ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡದಿದ್ದರೆ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆ, ಸಿಮ್ ಕಾರ್ಡ್ ಅಥವಾ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಇಂದು ರಾತ್ರಿಯೇ ಕಡಿತಗೊಳ್ಳುತ್ತದೆ ಎಂದು ಹೆದರಿಸುವ 'ತುರ್ತು ಒತ್ತಡದ ತಂತ್ರ' ಬಳಸಲಾಗಿದೆ.",
                "ಬ್ಯಾಂಕುಗಳು ಅಥವಾ ವಿದ್ಯುತ್ ಮಂಡಳಿಗಳು (BESCOM/HESCOM ನಂತಹವು) ತುರ್ತು ಪಾವತಿ ಅಥವಾ KYC ಗಾಗಿ ವೈಯಕ್ತಿಕ ಫೋನ್ ಸಂಖ್ಯೆಗಳೊಂದಿಗೆ ಸಾಮಾನ್ಯ ವಾಟ್ಸಾಪ್ ಸಂದೇಶಗಳನ್ನು ಕಳುಹಿಸುವುದಿಲ್ಲ.",
                "ವಂಚಕರು ನಿಮ್ಮಲ್ಲಿ ಭಯ ಹುಟ್ಟಿಸಿ ನಿಮ್ಮ ಬ್ಯಾಂಕಿಂಗ್ ಒಟಿಪಿ (OTP) ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ಕದಿಯಲು ಈ ರೀತಿ ಮಾಡುತ್ತಾರೆ."
            ],
            "steps_en": [
                "1. Do NOT click the link or call the personal phone number.",
                "2. Call the verified bank customer care number from their official website or visit your branch.",
                "3. Report the phone number to your service provider."
            ],
            "steps_kn": [
                "1. ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ ಅಥವಾ ಅದರಲ್ಲಿರುವ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಬೇಡಿ.",
                "2. ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ನಿಂದ ಬ್ಯಾಂಕ್ ಸಹಾಯವಾಣಿ ಪಡೆದು ಕರೆ ಮಾಡಿ ಅಥವಾ ಶಾಖೆಗೆ ಭೇಟಿ ನೀಡಿ.",
                "3. ಈ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಿಮ್ಮ ಸೇವಾ ಪೂರೈಕೆದಾರರಿಗೆ ವರದಿ ಮಾಡಿ."
            ]
        }

    # Default Case (General Message)
    return {
        "score": 40,
        "status": "caution",
        "message_en": "CAUTION: Unverified message. Be cautious of forwards.",
        "message_kn": "ಎಚ್ಚರಿಕೆ: ಪರಿಶೀಲಿಸದ ಸಂದೇಶ. ಮುನ್ನೆಚ್ಚರಿಕೆ ವಹಿಸಿ.",
        "details_en": [
            "This message does not match known threat patterns directly, but remains unverified.",
            "First-time internet users are often tricked by WhatsApp forward messages containing fake news or false claims."
        ],
        "details_kn": [
            "ಈ ಸಂದೇಶವು ನೇರವಾಗಿ ತಿಳಿದಿರುವ ಅಪಾಯದ ಮಾದರಿಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ, ಆದರೆ ಇದು ಇನ್ನೂ ಪರಿಶೀಲಿಸಲ್ಪಟ್ಟಿಲ್ಲ.",
            "ಗ್ರಾಮೀಣ ಭಾಗದ ಮುಗ್ಧ ಬಳಕೆದಾರರು ಹೆಚ್ಚಾಗಿ ಸುಳ್ಳು ಸುದ್ದಿ ಅಥವಾ ನಕಲಿ ಮಾಹಿತಿ ಹೊಂದಿರುವ ವಾಟ್ಸಾಪ್ ಫಾರ್ವರ್ಡ್ ಸಂದೇಶಗಳಿಂದ ಮೋಸಹೋಗುತ್ತಾರೆ."
        ]
    }


def analyze_qr_local(qr_input):
    """
    Analyzes QR Code string content locally.
    """
    qr_clean = qr_input.strip().lower()
    
    # Check if UPI payment link
    if qr_clean.startswith("upi://pay"):
        # Extract payee address 'pa' and payee name 'pn'
        pa_match = re.search(r'pa=([^&]+)', qr_clean)
        pa = pa_match.group(1) if pa_match else ""
        return analyze_upi_local(pa)
        
    # Check if web link
    if qr_clean.startswith("http://") or qr_clean.startswith("https://") or ".com" in qr_clean or ".info" in qr_clean:
        if "pmkisan" in qr_clean or "awas" in qr_clean or "scam" in qr_clean:
            return {
                "score": 96,
                "status": "danger",
                "category_en": "Phishing QR Link",
                "category_kn": "ನಕಲಿ ಜಾಲತಾಣ ಲಿಂಕ್ ಕ್ಯೂಆರ್",
                "message_en": "CRITICAL DANGER: Fraudulent QR Web Link Detected!",
                "message_kn": "ತೀವ್ರ ಅಪಾಯ: ಕ್ಯೂಆರ್ ಕೋಡ್‌ನಲ್ಲಿ ವಂಚನೆಯ ವೆಬ್ ಲಿಂಕ್ ಪತ್ತೆಯಾಗಿದೆ!",
                "details_en": [
                    "This QR code encodes a web address designed to mimic official government portals.",
                    "Scanning it opens a website that will ask you to login using your bank details or pay processing fees.",
                    "Official government portals will never spread official links using printed QR codes sent on WhatsApp."
                ],
                "details_kn": [
                    "ಈ ಕ್ಯೂಆರ್ ಕೋಡ್ ಅಧಿಕೃತ ಸರ್ಕಾರಿ ವೆಬ್‌ಸೈಟ್‌ಗಳಂತೆ ನಕಲು ಮಾಡುವ ಜಾಲತಾಣ ಲಿಂಕ್ ಅನ್ನು ಹೊಂದಿದೆ.",
                    "ಇದನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡುವುದರಿಂದ ತೆರೆದುಕೊಳ್ಳುವ ವೆಬ್‌ಸೈಟ್ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ವಿವರಗಳು ಅಥವಾ ಶುಲ್ಕಗಳನ್ನು ಕೇಳುತ್ತದೆ.",
                    "ಅಧಿಕೃತ ಸರ್ಕಾರಿ ನಿಗಮಗಳು ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಕ್ಯೂಆರ್ ಕೋಡ್ ಹಂಚಿಕೊಳ್ಳುವ ಮೂಲಕ ಅಧಿಕೃತ ಲಿಂಕ್ ನೀಡುವುದಿಲ್ಲ."
                ],
                "steps_en": [
                    "1. Do NOT click or open the link on your phone.",
                    "2. Delete the QR code image immediately.",
                    "3. Warn others in your family not to scan this printed image."
                ],
                "steps_kn": [
                    "1. ನಿಮ್ಮ ಫೋನ್‌ನಲ್ಲಿ ಈ ಲಿಂಕ್ ಅನ್ನು ಓಪನ್ ಮಾಡಬೇಡಿ.",
                    "2. ತಕ್ಷಣವೇ ಈ ಕ್ಯೂಆರ್ ಕೋಡ್ ಚಿತ್ರವನ್ನು ಅಳಿಸಿಹಾಕಿ.",
                    "3. ಈ ಮುದ್ರಿತ ಚಿತ್ರವನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡದಂತೆ ನಿಮ್ಮ ಮನೆಯ ಇತರರಿಗೂ ತಿಳಿಸಿ."
                ]
            }
        else:
            return {
                "score": 65,
                "status": "caution",
                "message_en": "CAUTION: Unverified Web Link in QR Code.",
                "message_kn": "ಎಚ್ಚರಿಕೆ: ಕ್ಯೂಆರ್ ಕೋಡ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸದ ವೆಬ್ ಲಿಂಕ್ ಇದೆ.",
                "details_en": [
                    "This QR code opens an external website.",
                    "Ensure you trust the brand or utility office who displayed this QR before entering details."
                ],
                "details_kn": [
                    "ಈ ಕ್ಯೂಆರ್ ಕೋಡ್ ಬಾಹ್ಯ ವೆಬ್‌ಸೈಟ್‌ಗೆ ನಿಮ್ಮನ್ನು ಕರೆದೊಯ್ಯುತ್ತದೆ.",
                    "ಯಾವುದೇ ವಿವರ ನೀಡುವ ಮುನ್ನ ಈ ಕ್ಯೂಆರ್ ಕೋಡ್ ಪ್ರದರ್ಶಿಸಿದ ಸಂಸ್ಥೆಯನ್ನು ನೀವು ನಂಬುತ್ತೀರಿ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ."
                ]
            }

    # Default Case
    return {
        "score": 50,
        "status": "caution",
        "message_en": "CAUTION: Standard QR Text Content.",
        "message_kn": "ಎಚ್ಚರಿಕೆ: ಸಾಮಾನ್ಯ ಕ್ಯೂಆರ್ ಪಠ್ಯ ಮಾಹಿತಿ.",
        "details_en": [
            "This QR code encodes plain text, not a direct bank transfer.",
            "Text encoded: " + qr_input[:100] + ("..." if len(qr_input) > 100 else "")
        ],
        "details_kn": [
            "ಈ ಕ್ಯೂಆರ್ ಕೋಡ್ ಕೇವಲ ಸರಳ ಪಠ್ಯವನ್ನು ಹೊಂದಿದೆ, ನೇರ ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆಯಲ್ಲ.",
            "ಪಠ್ಯ ಮಾಹಿತಿ: " + qr_input[:100]
        ]
    }


def analyze_otp_local(message_input):
    """
    Analyzes messages asking for OTPs.
    """
    msg_clean = message_input.strip().lower()
    otp_words = ["otp", "one time password", "verification code", "कोड", "ಒಟಿಪಿ", "ಪಿನ್", "pin", "ಪಾಸ್ವರ್ಡ್", "password", "unblock", "card is blocked"]
    
    if any(w in msg_clean for w in otp_words):
        return {
            "score": 97,
            "status": "danger",
            "category_en": "OTP & Credential Fraud",
            "category_kn": "ಒಟಿಪಿ ಮತ್ತು ಬ್ಯಾಂಕ್ ವಿವರ ಕದಿಯುವ ವಂಚನೆ",
            "message_en": "CRITICAL ALERT: OTP / Password Stealing Scam Detected!",
            "message_kn": "ತೀವ್ರ ಎಚ್ಚರಿಕೆ: ಒಟಿಪಿ ಅಥವಾ ರಹಸ್ಯ ಪಿನ್ ಕದಿಯುವ ವಂಚನೆ ಪತ್ತೆಯಾಗಿದೆ!",
            "details_en": [
                "The message asks you to share your OTP, secret banking PIN, or password.",
                "CRITICAL FACT: Official bank employees, police, or customer care will NEVER ask you for an OTP, password, or PIN under any circumstances.",
                "Scammers request OTPs to instantly empty your bank account or take over your WhatsApp account."
            ],
            "details_kn": [
                "ಸಂದೇಶವು ನಿಮ್ಮ ಒಟಿಪಿ (OTP), ರಹಸ್ಯ ಬ್ಯಾಂಕಿಂಗ್ ಪಿನ್ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ಅನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ಕೇಳುತ್ತಿದೆ.",
                "ಪ್ರಮುಖ ಸತ್ಯ: ಅಧಿಕೃತ ಬ್ಯಾಂಕ್ ಸಿಬ್ಬಂದಿ, ಪೊಲೀಸರು ಅಥವಾ ಗ್ರಾಹಕ ಸೇವೆಯವರು ನಿಮ್ಮ ಒಟಿಪಿ ಅಥವಾ ರಹಸ್ಯ ಪಿನ್ ಸಂಖ್ಯೆಯನ್ನು ಯಾವುದೇ ಪರಿಸ್ಥಿತಿಯಲ್ಲೂ ಕೇಳುವುದಿಲ್ಲ.",
                "ವಂಚಕರು ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಯಿಂದ ತಕ್ಷಣ ಹಣ ದೋಚಲು ಅಥವಾ ನಿಮ್ಮ ವಾಟ್ಸಾಪ್ ಖಾತೆಯನ್ನು ಹ್ಯಾಕ್ ಮಾಡಲು ಒಟಿಪಿ ಕೇಳುತ್ತಾರೆ."
            ],
            "steps_en": [
                "1. NEVER share this 4-digit or 6-digit code with anyone, even on phone calls.",
                "2. Cut the call or ignore the message immediately. Block the contact.",
                "3. If already shared, call your bank customer service immediately to lock your card and accounts."
            ],
            "steps_kn": [
                "1. ಅವರು ಯಾರೇ ಎಂದು ಹೇಳಿಕೊಂಡರೂ ೪ ಅಥವಾ ೬ ಅಂಕಿಯ ಒಟಿಪಿ ಕೋಡ್ ಅನ್ನು ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.",
                "2. ತಕ್ಷಣ ಫೋನ್ ಕಟ್ ಮಾಡಿ ಅಥವಾ ಸಂದೇಶವನ್ನು ನಿರ್ಲಕ್ಷಿಸಿ ಬ್ಲಾಕ್ ಮಾಡಿ.",
                "3. ಈಗಾಗಲೇ ಹಂಚಿಕೊಂಡಿದ್ದರೆ, ತಕ್ಷಣ ಬ್ಯಾಂಕ್‌ಗೆ ಕರೆ ಮಾಡಿ ನಿಮ್ಮ ಖಾತೆ ಮತ್ತು ಕಾರ್ಡ್ ಅನ್ನು ಲಾಕ್ ಮಾಡಿಸಿ."
            ]
        }

    return {
        "score": 40,
        "status": "caution",
        "message_en": "CAUTION: Unverified request. Keep your secrets safe.",
        "message_kn": "ಎಚ್ಚರಿಕೆ: ಪರಿಶೀಲಿಸದ ವಿನಂತಿ. ನಿಮ್ಮ ರಹಸ್ಯ ಸಂಖ್ಯೆಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿರಿಸಿ.",
        "details_en": [
            "This message does not explicitly request an OTP, but contains unverified claims.",
            "As a rule of gold: never share any numbers sent to your phone with anyone."
        ],
        "details_kn": [
            "ಈ ಸಂದೇಶವು ನೇರವಾಗಿ ಒಟಿಪಿ ಕೇಳುತ್ತಿಲ್ಲ, ಆದರೆ ಇದು ಪರಿಶೀಲಿಸದ ಮಾಹಿತಿಯನ್ನು ಹೊಂದಿದೆ.",
            "ಬಂಗಾರದ ನಿಯಮ: ನಿಮ್ಮ ಫೋನ್‌ಗೆ ಬಂದ ಯಾವುದೇ ರಹಸ್ಯ ಸಂಖ್ಯೆಯನ್ನು ಎಂದಿಗೂ ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ."
        ]
    }


def analyze_loan_app_local(app_input):
    """
    Analyzes predatory loan apps.
    """
    app_clean = app_input.strip().lower()
    predatory_keywords = ["cashexpress", "quickloan", "fastrupee", "instacash", "easyloan", "rupeeplus", "speedloan", "pocketmoney", "instant cash", "no document", "predatory", "loanapp"]
    
    if any(k in app_clean for k in predatory_keywords) or "loan" in app_clean or "rupee" in app_clean:
        return {
            "score": 96,
            "status": "danger",
            "category_en": "Predatory Loan App Scam",
            "category_kn": "ಕಾನೂನುಬಾಹಿರ ಲೂಟಿ ಸಾಲದ ಆಪ್ ವಂಚನೆ",
            "message_en": "CRITICAL WARNING: High-Risk Predatory / Illegal Lending App Detected!",
            "message_kn": "ತೀವ್ರ ಎಚ್ಚರಿಕೆ: ಹೆಚ್ಚಿನ ಅಪಾಯದ ಕಾನೂನುಬಾಹಿರ ಕಬಳಿಸುವ ಸಾಲದ ಆಪ್ ಪತ್ತೆಯಾಗಿದೆ!",
            "details_en": [
                "This loan app operates illegally and is not registered with the Reserve Bank of India (RBI).",
                "Predatory loan apps charge extremely high interest rates (often over 100% or double the amount in 7 days) and levy hidden charges.",
                "Crucially: During installation, these apps steal your private phone contacts and photos to blackmail and harass your family members."
            ],
            "details_kn": [
                "ಈ ಸಾಲದ ಆಪ್ ಕಾನೂನುಬಾಹಿರವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ ಮತ್ತು ಭಾರತೀಯ ರಿಸರ್ವ್ ಬ್ಯಾಂಕ್ (RBI) ನಲ್ಲಿ ನೋಂದಾಯಿಸಲ್ಪಟ್ಟಿಲ್ಲ.",
                "ಇವುಗಳು ಅತ್ಯಂತ ಹೆಚ್ಚಿನ ಬಡ್ಡಿದರಗಳನ್ನು ವಿಧಿಸುತ್ತವೆ (ಸಾಮಾನ್ಯವಾಗಿ ೭ ದಿನಗಳಲ್ಲಿ ಹಣವನ್ನು ದುಪ್ಪಟ್ಟು ಕೇಳುತ್ತವೆ) ಮತ್ತು ಅಡಗಿದ ಶುಲ್ಕಗಳನ್ನು ಹೇರುತ್ತವೆ.",
                "ಮುಖ್ಯವಾಗಿ: ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡುವಾಗ ಇವು ನಿಮ್ಮ ಸಂಪರ್ಕ ಪಟ್ಟಿ ಮತ್ತು ಗ್ಯಾಲರಿ ಪ್ರವೇಶಿಸಿ, ನಂತರ ಬ್ಲಾಕ್‌ಮೇಲ್ ಮಾಡಲು ಕುಟುಂಬದವರಿಗೆ ಫೋಟೋ ಕಳುಹಿಸಿ ಬೆದರಿಸುತ್ತವೆ."
            ],
            "steps_en": [
                "1. Do NOT download or install this app from any store or link.",
                "2. If already installed, immediately uninstall it, factory reset your phone, and alert your phone contacts that your details were compromised.",
                "3. Report the app directly on cybercrime.gov.in."
            ],
            "steps_kn": [
                "1. ಯಾವುದೇ ಆಪ್ ಸ್ಟೋರ್ ಅಥವಾ ಲಿಂಕ್‌ನಿಂದ ಈ ಆ್ಯಪ್ ಅನ್ನು ಡೌನ್‌ಲೋಡ್ ಅಥವಾ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಬೇಡಿ.",
                "2. ಈಗಾಗಲೇ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿದ್ದರೆ, ತಕ್ಷಣ ಅನ್‌ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ, ಫೋನ್ ರಿಸೆಟ್ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಸಂಪರ್ಕದಲ್ಲಿರುವವರಿಗೆ ಎಚ್ಚರಿಸಿ.",
                "3. ಈ ಆ್ಯಪ್ ಅನ್ನು ನೇರವಾಗಿ cybercrime.gov.in ನಲ್ಲಿ ವರದಿ ಮಾಡಿ."
            ],
            "alternatives_en": [
                "PM-SVANidhi Scheme: Official government zero-collateral loan up to ₹10,000 for street vendors.",
                "Mudra Loans: Official micro-business financing scheme via public banks (SBI, Canara Bank).",
                "Local Cooperative Credit Society: Registered local banking with fair interest rates."
            ],
            "alternatives_kn": [
                "ಪಿಎಂ-ಸ್ವನಿಧಿ ಯೋಜನೆ: ಸಣ್ಣ ಬೀದಿ ವ್ಯಾಪಾರಿಗಳಿಗಾಗಿ ಸರ್ಕಾರದ ಶೂನ್ಯ-ಜಾಮೀನು ₹೧೦,೦೦೦ ರವರೆಗಿನ ಅಧಿಕೃತ ಸಾಲ.",
                "ಮುದ್ರಾ ಸಾಲ: ಸಾರ್ವಜನಿಕ ಬ್ಯಾಂಕ್‌ಗಳ ಮೂಲಕ ಅಧಿಕೃತ ಕಿರು ವ್ಯವಹಾರ ಧನಸಹಾಯ ಯೋಜನೆ (SBI, Canara Bank ಇತ್ಯಾದಿ).",
                "ಸ್ಥಳೀಯ ಸಹಕಾರಿ ಪತ್ತಿನ ಸಂಘ: ನೋಂದಾಯಿತ ಸ್ಥಳೀಯ ಬ್ಯಾಂಕಿಂಗ್ ಮೂಲಕ ನ್ಯಾಯಯುತ ಬಡ್ಡಿಯ ಸಾಲ."
            ]
        }

    return {
        "score": 40,
        "status": "caution",
        "message_en": "CAUTION: Unverified Financial Provider. Verify RBI registration.",
        "message_kn": "ಎಚ್ಚರಿಕೆ: ಪರಿಶೀಲಿಸದ ಹಣಕಾಸು ಸಂಸ್ಥೆ. ಆರ್‌ಬಿಐ ನೋಂದಣಿ ಪರಿಶೀಲಿಸಿ.",
        "details_en": [
            "Always check if the loan provider is registered as a Non-Banking Financial Company (NBFC) on the RBI official website before signing documents."
        ],
        "details_kn": [
            "ಯಾವುದೇ ದಾಖಲೆಗೆ ಸಹಿ ಮಾಡುವ ಮುನ್ನ ಸಾಲ ನೀಡುವ ಸಂಸ್ಥೆಯು ಆರ್‌ಬಿಐ (RBI) ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ನೋಂದಾಯಿತ ಎನ್‌ಬಿಎಫ್‌ಸಿ (NBFC) ಆಗಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ."
        ]
    }


# -------------------------------------------------------------
# Gemini API Prompt Builders
# -------------------------------------------------------------

def query_gemini_upi(upi_input):
    """
    Sends the UPI ID/Phone number to Gemini API for real-time analysis.
    Fails gracefully to local logic on error.
    """
    prompt = f"""
    You are FraudShield, an AI assistant protecting first-time internet users in rural India.
    Analyze the following payment identifier (UPI ID or Phone number):
    Input: "{upi_input}"

    Rural users easily get confused, so keep your language extremely simple, avoiding technical jargon (like "spoofing", "credential harvesting", etc.).
    You MUST respond with a single valid JSON object containing exactly the following keys:
    1. "score": An integer from 0 to 100 representing the risk score (0 = perfectly safe, 100 = extremely dangerous scam).
    2. "status": A string which must be either "safe", "caution", or "danger".
       - "safe" for risk scores 0-20
       - "caution" for risk scores 21-70
       - "danger" for risk scores 71-100
    3. "message_en": A very simple, short warning/verdict message in English.
    4. "message_kn": A very simple, short warning/verdict message in Kannada. Keep it natural, easy to read for rural speakers.
    5. "details_en": An array of 2-3 bullet points in English explaining *why* this is flagged, written in very easy, simple terms.
    6. "details_kn": An array of 2-3 bullet points in Kannada explaining *why* this is flagged, written in very easy, simple terms.
    Optional fields for RED alerts:
    - "category_en": Specific scam type like "Government Impersonation", "Fake Prize", "KYC Scam".
    - "category_kn": Kannada scam type category.
    - "steps_en": An array of exactly 3 simple recovery action points.
    - "steps_kn": Kannada version of 3 steps.

    Example Output Format:
    {{
        "score": 85,
        "status": "danger",
        "category_en": "Government Impersonation",
        "category_kn": "ಸರ್ಕಾರಿ ಹೆಸರಿನ ವಂಚನೆ",
        "message_en": "Warning message...",
        "message_kn": "ಕನ್ನಡ ಎಚ್ಚರಿಕೆ...",
        "details_en": ["Detail 1", "Detail 2"],
        "details_kn": ["ಕನ್ನಡ ವಿವರ 1", "ಕನ್ನಡ ವಿವರ 2"],
        "steps_en": ["1. Step one", "2. Step two", "3. Step three"],
        "steps_kn": ["1. ಕನ್ನಡ ಹಂತ 1", "2. ಕನ್ನಡ ಹಂತ 2", "3. ಕನ್ನಡ ಹಂತ 3"]
    }}

    Remember: Respond with ONLY the raw JSON. No markdown backticks, no introduction, no extra text.
    """
    try:
        import google.generativeai as genai
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        content_text = response.text.strip()
        data = json.loads(content_text)
        return data
    except Exception as e:
        print(f"Error calling Gemini API for UPI, falling back: {e}")
        return analyze_upi_local(upi_input)


def query_gemini_message(msg_input):
    """
    Sends a WhatsApp message/URL to Gemini API for real-time analysis.
    Fails gracefully to local logic on error.
    """
    prompt = f"""
    You are FraudShield, an AI assistant protecting first-time internet users in rural India.
    Analyze the following WhatsApp message, SMS, or URL:
    Input: "{msg_input}"

    Check for fake government schemes, advance processing fees, urgent bank block/KYC threats, quick part-time job money scams, and suspicious links.
    Keep your explanations completely simple and friendly, avoiding complex technical cybersecurity terms.
    You MUST respond with a single valid JSON object containing exactly the following keys:
    1. "score": An integer from 0 to 100 representing the risk score (0 = safe, 100 = dangerous scam).
    2. "status": A string which must be either "safe", "caution", or "danger".
    3. "message_en": A very simple, short warning/verdict message in English.
    4. "message_kn": A very simple, short warning/verdict message in Kannada.
    5. "details_en": An array of 2-3 bullet points in English explaining *why* this is flagged.
    6. "details_kn": An array of 2-3 bullet points in Kannada explaining *why* this is flagged.
    7. "tip_en": A simple action advice under "What to do next" in English.
    8. "tip_kn": A simple action advice under "What to do next" in Kannada.
    Optional fields for RED alerts:
    - "category_en": scam type like "Government Subsidy Scam", "KYC Suspension Threat".
    - "category_kn": Kannada scam category.
    - "steps_en": An array of exactly 3 simple recovery action points.
    - "steps_kn": Kannada version of 3 steps.

    Remember: Respond with ONLY the raw JSON. No markdown backticks, no introduction, no extra text.
    """
    try:
        import google.generativeai as genai
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        content_text = response.text.strip()
        data = json.loads(content_text)
        return data
    except Exception as e:
        print(f"Error calling Gemini API for Message, falling back: {e}")
        return analyze_message_local(msg_input)


def query_gemini_qr(qr_input):
    """
    Sends the QR Code content to Gemini for risk analysis.
    """
    prompt = f"""
    You are FraudShield, an AI assistant protecting rural digital novices.
    Analyze the following string parsed from a scanned QR Code:
    Input: "{qr_input}"

    Determine if it contains a secure/standard payment address or a dangerous fraudulent endpoint/phishing website.
    Respond with a single valid JSON object containing exactly:
    1. "score": An integer from 0 to 100 representing risk.
    2. "status": "safe", "caution", or "danger".
    3. "message_en": English warning text.
    4. "message_kn": Kannada warning text.
    5. "details_en": array of 2-3 explainers.
    6. "details_kn": array of 2-3 Kannada explainers.
    7. "category_en": "Phishing QR Link", "Fake Pay Handle", "Unknown Merchant" or blank.
    8. "category_kn": Kannada version of category.
    9. "steps_en": Array of 3 recovery steps if danger, otherwise empty array.
    10. "steps_kn": Kannada version of 3 steps.
    """
    try:
        import google.generativeai as genai
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        content_text = response.text.strip()
        data = json.loads(content_text)
        return data
    except Exception as e:
        print(f"Error calling Gemini API for QR, falling back: {e}")
        return analyze_qr_local(qr_input)


def query_gemini_otp(otp_input):
    """
    Sends the OTP request message to Gemini for analysis.
    """
    prompt = f"""
    You are FraudShield, protecting users from OTP theft.
    Analyze this message text asking for an OTP/verification code:
    Input: "{otp_input}"

    Explain that banks never ask for OTPs and sharing OTP gives complete access to steal money.
    Respond with a single valid JSON object containing:
    1. "score": 0 to 100 risk.
    2. "status": "safe", "caution", or "danger".
    3. "message_en", "message_kn", "details_en", "details_kn".
    4. "category_en": "OTP & Credential Fraud".
    5. "category_kn": "ಒಟಿಪಿ ಮತ್ತು ವಿವರ ಕದಿಯುವ ವಂಚನೆ".
    6. "steps_en": Array of exactly 3 recovery action points.
    7. "steps_kn": Kannada version of 3 steps.
    """
    try:
        import google.generativeai as genai
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        content_text = response.text.strip()
        data = json.loads(content_text)
        return data
    except Exception as e:
        print(f"Error calling Gemini API for OTP, falling back: {e}")
        return analyze_otp_local(otp_input)


def query_gemini_loan_app(loan_input):
    """
    Sends loan app request to Gemini to rate predatory lending structures.
    """
    prompt = f"""
    You are FraudShield, checking if a loan app/Play Store link is a predatory, illegal lender.
    Input: "{loan_input}"

    Explain the high interest rates and illegal contacts-stealing blackmail tactics of fake loan apps.
    Provide government registered alternatives like PM-SVANidhi (micro loan for street vendors) and Mudra Loans.
    Respond with a single valid JSON object containing:
    1. "score": 0 to 100.
    2. "status": "safe", "caution", or "danger".
    3. "message_en", "message_kn", "details_en", "details_kn".
    4. "category_en": "Predatory Loan App Scam".
    5. "category_kn": "ಕಾನೂನುಬಾಹಿರ ಲೂಟಿ ಸಾಲದ ಆಪ್ ವಂಚನೆ".
    6. "steps_en": Array of exactly 3 recovery action points.
    7. "steps_kn": Kannada version of 3 steps.
    8. "alternatives_en": Array of 2-3 government/NBFC registered lending channels.
    9. "alternatives_kn": Kannada version of alternatives.
    """
    try:
        import google.generativeai as genai
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        content_text = response.text.strip()
        data = json.loads(content_text)
        return data
    except Exception as e:
        print(f"Error calling Gemini API for Loan App, falling back: {e}")
        return analyze_loan_app_local(loan_input)


# -------------------------------------------------------------
# Secure Anonymization / Masking Helper
# -------------------------------------------------------------

def mask_personal_data(input_type, val):
    val_clean = val.strip()
    if not val_clean:
        return val_clean
        
    if input_type == 'upi':
        if '@' in val_clean:
            parts = val_clean.split('@')
            user = parts[0]
            domain = parts[1]
            if len(user) <= 2:
                masked_user = '*' * len(user)
            else:
                masked_user = user[:2] + '*' * (len(user) - 4) + user[-2:] if len(user) >= 4 else user[0] + '*' * (len(user) - 1)
            return f"{masked_user}@{domain}"
        elif val_clean.isdigit():
            if len(val_clean) >= 6:
                return val_clean[:2] + '*' * (len(val_clean) - 4) + val_clean[-2:]
            return '*' * len(val_clean)
        else:
            return val_clean
    elif input_type == 'qr':
        if val_clean.startswith('upi://pay'):
            pa_match = re.search(r'pa=([^&]+)', val_clean)
            if pa_match:
                pa_val = pa_match.group(1)
                masked_pa = mask_personal_data('upi', pa_val)
                pn_match = re.search(r'pn=([^&]+)', val_clean)
                text_res = val_clean.replace(pa_val, masked_pa)
                if pn_match:
                    pn_val = pn_match.group(1)
                    text_res = text_res.replace(pn_val, "MaskedMerchant")
                return text_res
        return val_clean[:35] + "..." if len(val_clean) > 35 else val_clean
    elif input_type in ['phishing', 'otp']:
        text = re.sub(r'\b\d{10}\b', lambda m: m.group(0)[:2] + '******' + m.group(0)[-2:], val_clean)
        text = re.sub(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', 'masked_email@domain.com', text)
        return text[:45] + "..." if len(text) > 45 else text
    elif input_type == 'loan':
        return val_clean[:35] + "..." if len(val_clean) > 35 else val_clean
    return val_clean


# -------------------------------------------------------------
# REST Endpoints
# -------------------------------------------------------------

@app.route("/api/status", methods=["GET"])
def get_status():
    return jsonify({
        "status": "online",
        "api_mode": "Gemini API (Live)" if HAS_REAL_API else "Smart Mock Mode (Local Fallback)"
    })


@app.route("/api/analyze-upi", methods=["POST"])
def analyze_upi():
    data = request.get_json() or {}
    upi_input = data.get("upi", "").strip()
    
    if not upi_input:
        return jsonify({"error": "UPI ID or Phone number is required"}), 400
        
    if HAS_REAL_API:
        analysis = query_gemini_upi(upi_input)
    else:
        analysis = analyze_upi_local(upi_input)
        
    try:
        masked_val = mask_personal_data('upi', upi_input)
        history = ScanHistory(
            type='upi',
            input=masked_val,
            risk_score=analysis.get('score', 50),
            result=analysis.get('status', 'caution')
        )
        db.session.add(history)
        db.session.commit()
    except Exception as ex:
        print(f"Error logging UPI scan to database: {ex}")
        
    return jsonify(analysis)


@app.route("/api/analyze-message", methods=["POST"])
def analyze_message():
    data = request.get_json() or {}
    msg_input = data.get("message", "").strip()
    
    if not msg_input:
        return jsonify({"error": "Message or link content is required"}), 400
        
    if HAS_REAL_API:
        analysis = query_gemini_message(msg_input)
    else:
        analysis = analyze_message_local(msg_input)
        
    try:
        masked_val = mask_personal_data('phishing', msg_input)
        history = ScanHistory(
            type='phishing',
            input=masked_val,
            risk_score=analysis.get('score', 50),
            result=analysis.get('status', 'caution')
        )
        db.session.add(history)
        db.session.commit()
    except Exception as ex:
        print(f"Error logging Message scan to database: {ex}")
        
    return jsonify(analysis)


@app.route("/api/analyze-qr", methods=["POST"])
def analyze_qr():
    data = request.get_json() or {}
    qr_input = data.get("qr", "").strip()
    
    if not qr_input:
        return jsonify({"error": "QR Code data is required"}), 400
        
    if HAS_REAL_API:
        analysis = query_gemini_qr(qr_input)
    else:
        analysis = analyze_qr_local(qr_input)
        
    try:
        masked_val = mask_personal_data('qr', qr_input)
        history = ScanHistory(
            type='qr',
            input=masked_val,
            risk_score=analysis.get('score', 50),
            result=analysis.get('status', 'caution')
        )
        db.session.add(history)
        db.session.commit()
    except Exception as ex:
        print(f"Error logging QR scan to database: {ex}")
        
    return jsonify(analysis)


@app.route("/api/analyze-otp", methods=["POST"])
def analyze_otp():
    data = request.get_json() or {}
    otp_input = data.get("message", "").strip()
    
    if not otp_input:
        return jsonify({"error": "OTP message text is required"}), 400
        
    if HAS_REAL_API:
        analysis = query_gemini_otp(otp_input)
    else:
        analysis = analyze_otp_local(otp_input)
        
    try:
        masked_val = mask_personal_data('otp', otp_input)
        history = ScanHistory(
            type='otp',
            input=masked_val,
            risk_score=analysis.get('score', 50),
            result=analysis.get('status', 'caution')
        )
        db.session.add(history)
        db.session.commit()
    except Exception as ex:
        print(f"Error logging OTP scan to database: {ex}")
        
    return jsonify(analysis)


@app.route("/api/analyze-loan-app", methods=["POST"])
def analyze_loan_app():
    data = request.get_json() or {}
    loan_input = data.get("app", "").strip()
    
    if not loan_input:
        return jsonify({"error": "Loan App name or link is required"}), 400
        
    if HAS_REAL_API:
        analysis = query_gemini_loan_app(loan_input)
    else:
        analysis = analyze_loan_app_local(loan_input)
        
    try:
        masked_val = mask_personal_data('loan', loan_input)
        history = ScanHistory(
            type='loan',
            input=masked_val,
            risk_score=analysis.get('score', 50),
            result=analysis.get('status', 'caution')
        )
        db.session.add(history)
        db.session.commit()
    except Exception as ex:
        print(f"Error logging Loan scan to database: {ex}")
        
    return jsonify(analysis)


# -------------------------------------------------------------
# Database API Endpoints
# -------------------------------------------------------------

@app.route("/api/scans", methods=["GET"])
def get_recent_scans():
    try:
        recent = ScanHistory.query.order_by(ScanHistory.timestamp.desc()).limit(5).all()
        return jsonify([item.to_dict() for item in recent])
    except Exception as ex:
        print(f"Error fetching scans from database: {ex}")
        return jsonify([])


@app.route("/api/reports/today-count", methods=["GET"])
def get_today_reports_count():
    try:
        today_date = date.today()
        start_of_today = datetime.combine(today_date, time.min)
        count = ReportedScams.query.filter(ReportedScams.reported_at >= start_of_today).count()
        return jsonify({"count": count})
    except Exception as ex:
        print(f"Error fetching today reports count: {ex}")
        return jsonify({"count": 0})


@app.route("/api/reports", methods=["POST"])
def report_scam():
    data = request.get_json() or {}
    val = data.get("input", "").strip()
    scam_type = data.get("scam_type", "").strip()
    if not val:
        return jsonify({"error": "Report input is required"}), 400
    if not scam_type:
        scam_type = "General Scam"
        
    try:
        masked_val = mask_personal_data('upi', val) if '@' in val or val.isdigit() else mask_personal_data('phishing', val)
        report = ReportedScams(input=masked_val, scam_type=scam_type)
        db.session.add(report)
        db.session.commit()
        
        today_date = date.today()
        start_of_today = datetime.combine(today_date, time.min)
        count = ReportedScams.query.filter(ReportedScams.reported_at >= start_of_today).count()
        return jsonify({"success": True, "count": count})
    except Exception as ex:
        print(f"Error saving reported scam to database: {ex}")
        return jsonify({"success": False, "error": str(ex)}), 500


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    print(f"Starting FraudShield backend on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=True)
