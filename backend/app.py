import os
import re
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Initialize Anthropic client if key is available and valid
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
HAS_REAL_API = False

# Avoid using the placeholder API key
if ANTHROPIC_API_KEY and ANTHROPIC_API_KEY != "your_api_key_here":
    try:
        from anthropic import Anthropic
        client = Anthropic(api_key=ANTHROPIC_API_KEY)
        HAS_REAL_API = True
        print("Anthropic Client initialized successfully in live mode.")
    except Exception as e:
        print(f"Error initializing Anthropic client, running in local fallback mode: {e}")
else:
    print("No valid Anthropic API key found. Running in Smart Mock Mode.")


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
            ]
        }

    # 3. High Risk Keywords
    danger_keywords = ["lottery", "gift", "prize", "cashback", "win", "rewards", "lucky", "kbc", "phonepe-reward", "awas", "yojana", "police", "customs", "fine"]
    for kw in danger_keywords:
        if kw in upi_clean:
            return {
                "score": 88,
                "status": "danger",
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
            "tip_en": "⚠️ Do NOT pay any processing fee. Delete this message immediately. Tell your family members that official schemes are only applied through authorized Gram Panchayat offices, never over WhatsApp.",
            "tip_kn": "⚠️ ಯಾವುದೇ ಶುಲ್ಕವನ್ನು ಪಾವತಿಸಬೇಡಿ. ಈ ಸಂದೇಶವನ್ನು ತಕ್ಷಣವೇ ಅಳಿಸಿ. ಅಧಿಕೃತ ಯೋಜನೆಗಳಿಗೆ ಗ್ರಾಮ್ ಪಂಚಾಯತ್ ಕಚೇರಿಗಳ ಮೂಲಕ ಮಾತ್ರ ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗುತ್ತದೆ, ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಅಲ್ಲ ಎಂಬುದನ್ನು ನಿಮ್ಮ ಕುಟುಂಬದವರಿಗೆ ತಿಳಿಸಿ."
        }

    # 2. Urgent KYC / Account Suspension Scam
    kyc_keywords = ["kyc", "blocked", "suspended", "electricity bill", "power cut", "eb bill", "bank account", "update document", "pan card"]
    if any(k in msg_clean for k in kyc_keywords):
        return {
            "score": 92,
            "status": "danger",
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
            "tip_en": "⚠️ Never click the link. Never call the personal phone number mentioned in the message. Go to your local bank branch or electricity office directly to verify.",
            "tip_kn": "⚠️ ಸಂದೇಶದಲ್ಲಿರುವ ಲಿಂಕ್ ಅನ್ನು ಎಂದಿಗೂ ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ. ಅದರಲ್ಲಿರುವ ವೈಯಕ್ತಿಕ ಫೋನ್ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಬೇಡಿ. ಪರಿಶೀಲಿಸಲು ನೇರವಾಗಿ ನಿಮ್ಮ ಸ್ಥಳೀಯ ಬ್ಯಾಂಕ್ ಶಾಖೆ ಅಥವಾ ವಿದ್ಯುತ್ ಕಚೇರಿಗೆ ಹೋಗಿ."
        }

    # 3. Easy Job / Earn Money Scam
    job_keywords = ["part time", "earn rs", "work from home", "youtube like", "earn daily", "telegram task"]
    if any(j in msg_clean for j in job_keywords) or "earn" in msg_clean and "rs" in msg_clean:
        return {
            "score": 89,
            "status": "danger",
            "message_en": "HIGH RISK: Part-Time Job / Quick Money Scam!",
            "message_kn": "ಹೆಚ್ಚಿನ ಅಪಾಯ: ಪಾರ್ಟ್-ಟೈಮ್ ಕೆಲಸ ಅಥವಾ ಸುಲಭವಾಗಿ ಹಣ ಗಳಿಸುವ ಸುಳ್ಳು ಆಮಿಷ!",
            "details_en": [
                "Offers high payment (₹2,000 to ₹10,000 daily) for simple tasks like liking YouTube videos or review ratings.",
                "This is a 'Task Scam'. They will pay you a small amount first to build trust, then ask you to deposit thousands of rupees for 'VIP tasks' and steal all your money.",
                "Remember: No one gives high daily salaries for doing trivial online clicks."
            ],
            "details_kn": [
                "ಯೂಟ್ಯೂಬ್ ವೀಡಿಯೊಗಳನ್ನು ಲೈಕ್ ಮಾಡಲು ದಿನಕ್ಕೆ ₹೨,೦೦೦ ದಿಂದ ₹೧೦,೦೦೦ ರವರೆಗೆ ಸುಲಭವಾಗಿ ಹಣ ಗಳಿಸುವ ಆಮಿಷವನ್ನು ಇದು ತೋರಿಸುತ್ತದೆ.",
                "ಇದು 'ಟಾಸ್ಕ್ ವಂಚನೆ' ಆಗಿದೆ. ಅವರು ಮೊದಲು ನಂಬಿಕೆ ಮೂಡಿಸಲು ಸಣ್ಣ ಮೊತ್ತವನ್ನು ನೀಡುತ್ತಾರೆ, ನಂತರ 'ವಿಐಪಿ ಟಾಸ್ಕ್' ಗಾಗಿ ಸಾವಿರಾರು ರೂಪಾಯಿ ಡೆಪಾಸಿಟ್ ಮಾಡಲು ಕೇಳಿ ನಿಮ್ಮ ಹಣವನ್ನು ದೋಚುತ್ತಾರೆ.",
                "ನೆನಪಿಡಿ: ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಕೇವಲ ಕ್ಲಿಕ್ ಮಾಡುವುದಕ್ಕೆ ಯಾರೂ ಇಷ್ಟು ಹೆಚ್ಚಿನ ದಿನಗೂಲಿ ನೀಡುವುದಿಲ್ಲ."
            ],
            "tip_en": "⚠️ Ignore and block this number. Do not send any money or display your personal documents to these agencies.",
            "tip_kn": "⚠️ ಈ ಸಂಖ್ಯೆಯನ್ನು ನಿರ್ಲಕ್ಷಿಸಿ ಮತ್ತು ಬ್ಲಾಕ್ ಮಾಡಿ. ಈ ಏಜೆನ್ಸಿಗಳಿಗೆ ಯಾವುದೇ ಹಣವನ್ನು ಕಳುಹಿಸಬೇಡಿ ಅಥವಾ ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ದಾಖಲೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಬೇಡಿ."
        }

    # 4. Contains URL / Link
    url_pattern = re.compile(r'https?://[^\s]+')
    if url_pattern.search(upi_clean := msg_clean):
        return {
            "score": 75,
            "status": "caution",
            "message_en": "CAUTION: Unverified Web Link / Website URL Detected.",
            "message_kn": "ಎಚ್ಚರಿಕೆ: ಪರಿಶೀಲಿಸದ ವೆಬ್ ಲಿಂಕ್ ಪತ್ತೆಯಾಗಿದೆ.",
            "details_en": [
                "The message contains a link that will open an external website.",
                "Scammers create fake websites that look exactly like Google Pay, PhonePe, or government offices to steal your PIN or bank details.",
                "Avoid clicking links sent by unknown people."
            ],
            "details_kn": [
                "ಸಂದೇಶವು ಬಾಹ್ಯ ವೆಬ್‌ಸೈಟ್ ಅನ್ನು ತೆರೆಯುವ ಲಿಂಕ್ ಅನ್ನು ಒಳಗೊಂಡಿದೆ.",
                "ವಂಚಕರು ನಿಮ್ಮ ಪಿನ್ ಅಥವಾ ಬ್ಯಾಂಕ್ ವಿವರಗಳನ್ನು ಕದಿಯಲು ಗೂಗಲ್ ಪೇ, ಫೋನ್‌ಪೇ ಅಥವಾ ಸರ್ಕಾರಿ ಕಚೇರಿಗಳಂತೆಯೇ ಕಾಣುವ ನಕಲಿ ವೆಬ್‌ಸೈಟ್‌ಗಳನ್ನು ರಚಿಸುತ್ತಾರೆ.",
                "ಅಪರಿಚಿತ ವ್ಯಕ್ತಿಗಳು ಕಳುಹಿಸಿದ ಲಿಂಕ್‌ಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡುವುದನ್ನು ತಪ್ಪಿಸಿ."
            ],
            "tip_en": "⚠️ Check if the URL matches the official brand website (e.g. '.gov.in' for official Indian government, not '.info' or '.cc'). If in doubt, do not open.",
            "tip_kn": "⚠️ ವೆಬ್‌ಸೈಟ್ ವಿಳಾಸವು ಅಧಿಕೃತ ಬ್ರ್ಯಾಂಡ್ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ (ಉದಾಹರಣೆಗೆ ಅಧಿಕೃತ ಭಾರತ ಸರ್ಕಾರಕ್ಕೆ '.gov.in' ಇರಬೇಕು, '.info' ಅಥವಾ '.cc' ಅಲ್ಲ). ಸಂದೇಹವಿದ್ದರೆ ಲಿಂಕ್ ಓಪನ್ ಮಾಡಬೇಡಿ."
        }

    # Default Case (General Message)
    return {
        "score": 40,
        "status": "caution",
        "message_en": "CAUTION: Unverified message. Be cautious of forward forwards.",
        "message_kn": "ಎಚ್ಚರಿಕೆ: ಪರಿಶೀಲಿಸದ ಸಂದೇಶ. ಮುನ್ನೆಚ್ಚರಿಕೆ ವಹಿಸಿ.",
        "details_en": [
            "This message does not match known threat patterns directly, but remains unverified.",
            "First-time internet users are often tricked by WhatsApp forward messages containing fake news or false claims.",
            "Always consult a tech-savvy child, friend, or relative before taking action on forwarded messages."
        ],
        "details_kn": [
            "ಈ ಸಂದೇಶವು ನೇರವಾಗಿ ತಿಳಿದಿರುವ ಅಪಾಯದ ಮಾದರಿಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ, ಆದರೆ ಇದು ಇನ್ನೂ ಪರಿಶೀಲಿಸಲ್ಪಟ್ಟಿಲ್ಲ.",
            "ಗ್ರಾಮೀಣ ಭಾಗದ ಮುಗ್ಧ ಬಳಕೆದಾರರು ಹೆಚ್ಚಾಗಿ ಸುಳ್ಳು ಸುದ್ದಿ ಅಥವಾ ನಕಲಿ ಮಾಹಿತಿ ಹೊಂದಿರುವ ವಾಟ್ಸಾಪ್ ಫಾರ್ವರ್ಡ್ ಸಂದೇಶಗಳಿಂದ ಮೋಸಹೋಗುತ್ತಾರೆ.",
            "ಫಾರ್ವರ್ಡ್ ಮಾಡಿದ ಸಂದೇಶಗಳ ಮೇಲೆ ಯಾವುದೇ ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳುವ ಮೊದಲು ಯಾವಾಗಲೂ ಮನೆಯಲ್ಲಿರುವ ವಿದ್ಯಾವಂತ ಮಕ್ಕಳನ್ನು ಅಥವಾ ವಿಶ್ವಾಸಾರ್ಹ ಸ್ನೇಹಿತರನ್ನು ಸಂಪರ್ಕಿಸಿ."
        ],
        "tip_en": "⚠️ Do not forward this message further until you are 100% sure of its truthfulness.",
        "tip_kn": "⚠️ ಈ ಸಂದೇಶದ ಸತ್ಯಾಸತ್ಯತೆ ನಿಮಗೆ ೧೦೦% ಖಚಿತವಾಗುವವರೆಗೆ ಇದನ್ನು ಇತರರಿಗೆ ಫಾರ್ವರ್ಡ್ ಮಾಡಬೇಡಿ."
    }


# -------------------------------------------------------------
# Claude API Prompt Builders
# -------------------------------------------------------------

def query_claude_upi(upi_input):
    """
    Sends the UPI ID/Phone number to Claude API for real-time analysis.
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

    Example Output Format:
    {{
        "score": 85,
        "status": "danger",
        "message_en": "Warning message...",
        "message_kn": "ಕನ್ನಡ ಎಚ್ಚರಿಕೆ...",
        "details_en": ["Detail 1", "Detail 2"],
        "details_kn": ["ಕನ್ನಡ ವಿವರ 1", "ಕನ್ನಡ ವಿವರ 2"]
    }}

    Remember: Respond with ONLY the raw JSON. No markdown backticks, no introduction, no extra text.
    """
    try:
        # Using exact Claude models or fallbacks
        model = os.getenv("CLAUDE_MODEL", "claude-sonnet-4-20250514")
        # Fallback handling in case of model mismatches
        response = client.messages.create(
            model=model,
            max_tokens=1000,
            temperature=0,
            system="You are an expert cybersecurity scanner that communicates in ultra-simple rural-friendly English and Kannada. You always output raw JSON only.",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        # Parse output
        content_text = response.content[0].text.strip()
        # Clean potential markdown wrapping
        if content_text.startswith("```json"):
            content_text = content_text.replace("```json", "", 1).rstrip("`").strip()
        elif content_text.startswith("```"):
            content_text = content_text.strip("`").strip()
            
        data = json.loads(content_text)
        return data
    except Exception as e:
        print(f"Error calling Anthropic API for UPI, falling back: {e}")
        return analyze_upi_local(upi_input)


def query_claude_message(msg_input):
    """
    Sends a WhatsApp message/URL to Claude API for real-time analysis.
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
    7. "tip_en": A simple action advice under "What to do next" in English (e.g. "Do not click the link. Block the sender.").
    8. "tip_kn": A simple action advice under "What to do next" in Kannada.

    Remember: Respond with ONLY the raw JSON. No markdown backticks, no introduction, no extra text.
    """
    try:
        model = os.getenv("CLAUDE_MODEL", "claude-sonnet-4-20250514")
        response = client.messages.create(
            model=model,
            max_tokens=1000,
            temperature=0,
            system="You are an expert cyber fraud investigator communicating with rural Indian users in simple English and Kannada. You always output raw JSON only.",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        content_text = response.content[0].text.strip()
        if content_text.startswith("```json"):
            content_text = content_text.replace("```json", "", 1).rstrip("`").strip()
        elif content_text.startswith("```"):
            content_text = content_text.strip("`").strip()
            
        data = json.loads(content_text)
        return data
    except Exception as e:
        print(f"Error calling Anthropic API for Message, falling back: {e}")
        return analyze_message_local(msg_input)


# -------------------------------------------------------------
# REST Endpoints
# -------------------------------------------------------------

@app.route("/api/status", methods=["GET"])
def get_status():
    return jsonify({
        "status": "online",
        "api_mode": "Claude API (Live)" if HAS_REAL_API else "Smart Mock Mode (Local Fallback)"
    })


@app.route("/api/analyze-upi", methods=["POST"])
def analyze_upi():
    data = request.get_json() or {}
    upi_input = data.get("upi", "").strip()
    
    if not upi_input:
        return jsonify({"error": "UPI ID or Phone number is required"}), 400
        
    if HAS_REAL_API:
        analysis = query_claude_upi(upi_input)
    else:
        analysis = analyze_upi_local(upi_input)
        
    return jsonify(analysis)


@app.route("/api/analyze-message", methods=["POST"])
def analyze_message():
    data = request.get_json() or {}
    msg_input = data.get("message", "").strip()
    
    if not msg_input:
        return jsonify({"error": "Message or link content is required"}), 400
        
    if HAS_REAL_API:
        analysis = query_claude_message(msg_input)
    else:
        analysis = analyze_message_local(msg_input)
        
    return jsonify(analysis)


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    print(f"Starting FraudShield backend on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=True)
