"use client";

import { useState, useEffect } from "react";
import { sendEmail } from "./actions";

const hearts = ["💗", "💖", "💝", "💓", "💞", "🌹", "✨", "💍"];

function FloatingPetal({ style }) {
  return (
    <div
      style={{
        position: "fixed",
        fontSize: style.size,
        left: style.left,
        top: "-40px",
        animation: `fall ${style.duration}s linear ${style.delay}s infinite`,
        opacity: 0.85,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {style.emoji}
    </div>
  );
}

export default function ProposalPage() {
  const [step, setStep] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [petals, setPetals] = useState([]);
  const [sparkle, setSparkle] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replySubmitted, setReplySubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  useEffect(() => {
    const generated = Array.from({ length: 22 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 18 + 12}px`,
      duration: Math.random() * 6 + 7,
      delay: Math.random() * 10,
      emoji: hearts[Math.floor(Math.random() * hearts.length)],
      id: i,
    }));
    setPetals(generated);
  }, []);

  const noResponses = [
    "Are you sure? 🥺",
    "Please think again... 💔",
    "My heart is breaking... 😢",
    "One more chance? 🙏",
    "I'll wait forever for you... 🌹",
    "Okay fine... just kidding, say YES! 😂",
  ];

  const handleNo = () => {
    setNoCount((c) => Math.min(c + 1, noResponses.length - 1));
  };

  const handleYes = () => {
    setSparkle(true);
    setStep(3);
  };

  const sendReply = async () => {
    if (!replyText.trim()) return;
    
    setSending(true);
    setSendError("");
    
    try {
      const result = await sendEmail(replyText);
      
      if (result.success) {
        setReplySubmitted(true);
        console.log("📧 Email sent successfully!");
      } else {
        setSendError(result.error || "Failed to send. Please try again.");
      }
    } catch (error) {
      console.error("Email error:", error);
      setSendError("Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0d0209;
          overflow-x: hidden;
        }

        @keyframes fall {
          0%   { transform: translateY(-40px) rotate(0deg); opacity: 0.9; }
          80%  { opacity: 0.7; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.07); }
        }

        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px #e8a0b4, 0 0 40px #c96b8a; }
          50%       { text-shadow: 0 0 35px #f7c5d5, 0 0 70px #e8607a, 0 0 90px #c94466; }
        }

        @keyframes ringBounce {
          0%  { transform: translateY(0) rotate(-10deg); }
          30% { transform: translateY(-18px) rotate(8deg); }
          60% { transform: translateY(-6px) rotate(-4deg); }
          100%{ transform: translateY(0) rotate(0deg); }
        }

        @keyframes starBurst {
          0%   { opacity: 0; transform: scale(0.3) rotate(0deg); }
          50%  { opacity: 1; transform: scale(1.2) rotate(180deg); }
          100% { opacity: 1; transform: scale(1) rotate(360deg); }
        }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          position: relative;
          background-image: url('/WhatsApp Image 2026-01-01 at 21.15.05.jpeg');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          font-family: 'Cormorant Garamond', Georgia, serif;
          color: #f5d6df;
        }

        .page::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse at 20% 30%, rgba(180,30,70,0.35) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 70%, rgba(140,20,80,0.30) 0%, transparent 55%),
            rgba(13,2,9,0.55);
          z-index: 0;
          pointer-events: none;
        }

        .card {
          position: relative;
          z-index: 10;
          max-width: 580px;
          width: 100%;
          background: rgba(20,4,12,0.45);
          border: 1px solid rgba(220,120,150,0.25);
          border-radius: 24px;
          padding: 52px 44px;
          text-align: center;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          box-shadow:
            0 0 60px rgba(200,60,100,0.12),
            0 0 120px rgba(160,30,70,0.08),
            inset 0 1px 0 rgba(255,200,220,0.08);
          animation: fadeUp 0.9s ease both;
        }

        .icon {
          font-size: 64px;
          display: block;
          margin: 0 auto 24px;
          animation: pulse 2.5s ease-in-out infinite;
        }

        .icon-ring {
          font-size: 72px;
          display: block;
          margin: 0 auto 24px;
          animation: ringBounce 1.2s ease-out both;
        }

        h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.7rem, 5vw, 2.4rem);
          font-weight: 700;
          line-height: 1.3;
          color: #f9e0e8;
          margin-bottom: 16px;
          animation: glow 3s ease-in-out infinite;
        }

        h1.italic { font-style: italic; }

        .subtitle {
          font-size: 1.15rem;
          font-style: italic;
          color: rgba(245,214,223,0.7);
          line-height: 1.7;
          margin-bottom: 32px;
        }

        .divider {
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(220,130,155,0.6), transparent);
          margin: 28px auto;
        }

        .btn {
          display: inline-block;
          padding: 14px 36px;
          border-radius: 50px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
          margin: 8px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #c94466, #a82050, #8b1040);
          color: #fff;
          box-shadow: 0 6px 30px rgba(180,40,80,0.45);
        }
        .btn-primary:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 12px 40px rgba(200,50,90,0.55);
        }

        .btn-secondary {
          background: transparent;
          color: rgba(245,214,223,0.55);
          border: 1px solid rgba(220,120,150,0.2);
          font-size: 0.92rem;
        }
        .btn-secondary:hover {
          border-color: rgba(220,120,150,0.45);
          color: rgba(245,214,223,0.75);
        }

        .btn-yes {
          background: linear-gradient(135deg, #c94466, #a82050, #8b1040);
          color: #fff;
          font-size: 1.2rem;
          padding: 16px 52px;
          box-shadow: 0 6px 30px rgba(180,40,80,0.45);
        }
        .btn-yes:hover {
          transform: translateY(-3px) scale(1.06);
          box-shadow: 0 14px 45px rgba(200,50,90,0.6);
        }

        .btn-no {
          background: transparent;
          color: rgba(245,214,223,0.4);
          border: 1px solid rgba(220,120,150,0.15);
          font-size: 0.88rem;
          padding: 10px 24px;
          transition: all 0.5s ease;
        }
        .btn-no:hover { opacity: 0.6; }

        .no-msg {
          font-style: italic;
          color: rgba(245,180,200,0.75);
          font-size: 1rem;
          margin-top: 14px;
          animation: fadeUp 0.5s ease both;
          min-height: 1.5em;
        }

        .shimmer-text {
          background: linear-gradient(90deg, #f5c6d8, #fff, #f5c6d8, #e8909f, #f5c6d8);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite, glow 3s ease-in-out infinite;
        }

        .celebration {
          font-size: clamp(2rem, 8vw, 3.2rem);
          animation: starBurst 0.8s ease both;
          display: block;
          margin-bottom: 20px;
        }

        .final-msg {
          font-size: 1.25rem;
          color: rgba(245,220,230,0.9);
          line-height: 1.8;
          font-style: italic;
        }

        .step-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 32px;
        }
        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(220,120,150,0.3);
          transition: background 0.4s;
        }
        .dot.active { background: rgba(220,120,150,0.85); }
        .reply-box {
          margin-top: 28px;
          width: 100%;
        }

        .reply-label {
          font-size: 1rem;
          font-style: italic;
          color: rgba(245,200,215,0.8);
          margin-bottom: 12px;
          display: block;
        }

        .reply-input {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(220,120,150,0.35);
          border-radius: 12px;
          padding: 14px 18px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          color: #f9e0e8;
          outline: none;
          resize: none;
          transition: border-color 0.3s, box-shadow 0.3s;
          min-height: 90px;
        }

        .reply-input::placeholder {
          color: rgba(245,180,200,0.35);
          font-style: italic;
        }

        .reply-input:focus {
          border-color: rgba(220,80,120,0.65);
          box-shadow: 0 0 18px rgba(200,60,100,0.15);
        }

        .reply-submit {
          margin-top: 14px;
          background: linear-gradient(135deg, #c94466, #a82050, #8b1040);
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 11px 32px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.04em;
          box-shadow: 0 4px 20px rgba(180,40,80,0.4);
          transition: all 0.3s ease;
        }
        .reply-submit:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 28px rgba(200,50,90,0.5);
        }

        .reply-display {
          margin-top: 22px;
          padding: 16px 20px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(220,120,150,0.25);
          border-radius: 12px;
          font-size: 1.1rem;
          font-style: italic;
          color: #f9e0e8;
          line-height: 1.7;
          animation: fadeUp 0.6s ease both;
        }

        .reply-name {
          font-size: 0.85rem;
          color: rgba(220,130,155,0.7);
          margin-bottom: 6px;
          font-style: normal;
          letter-spacing: 0.05em;
        }

      `}</style>

      <div className="page">
        {petals.map((p) => (
          <FloatingPetal key={p.id} style={p} />
        ))}

        {step === 0 && (
          <div className="card">
            <span className="icon">🌸</span>
            <h1 className="italic">Sweety Will you be the forever my heart has been waiting for</h1>
            <div className="divider" />
            <p className="subtitle">
              Every laugh shared, every secret whispered, every moment spent with
              you has made my world brighter than I ever knew it could be.
              <br /><br />
              But somewhere along the way, friendship blossomed into something
              deeper — something I can no longer hold inside.
            </p>
            <button className="btn btn-primary" onClick={() => setStep(1)}>
              Continue reading… 🌹
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="card" key="step1">
            <span className="icon">💖</span>
            <h1>I have fallen completely in love with you</h1>
            <div className="divider" />
            <p className="subtitle">
              I love the way you make me feel understood without saying a word.
              I love your kindness, your laughter, your strength. I love you not
              just as my closest friend — but as the person I want beside me for
              every chapter of my life.
              <br /><br />
              You are my safe place and my greatest adventure, all at once.
            </p>
            <button className="btn btn-primary" onClick={() => setStep(2)}>
              There's something I want to ask you… 💍
            </button>
            <br />
            <button className="btn btn-secondary" onClick={() => setStep(0)}>
              ← Back
            </button>
            <div className="step-dots">
              {[0,1,2,3].map(i => <div key={i} className={`dot ${step >= i ? "active" : ""}`} />)}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card" key="step2">
            <span className="icon-ring">💍</span>
            <h1 className="shimmer-text">
              Will you be mine?
            </h1>
            <div className="divider" />
            <p className="subtitle">
              In you, I have found my forever. You are my best friend, my love,
              my home. I want to spend every morning waking up beside you and
              every evening falling more in love with you.
              <br /><br />
              Will you make me the happiest person alive?
            </p>

            <div style={{ marginTop: "8px" }}>
              <button className="btn btn-yes" onClick={handleYes}>
                Yes, I will! 💗
              </button>
              <br />
              <button className="btn btn-no" onClick={handleNo}>
                {noCount === 0 ? "I need to think…" : "No"}
              </button>
            </div>

            {noCount > 0 && (
              <p className="no-msg" key={noCount}>
                {noResponses[noCount - 1]}
              </p>
            )}

            <div className="step-dots">
              {[0,1,2,3].map(i => <div key={i} className={`dot ${step >= i ? "active" : ""}`} />)}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card" key="step3" style={{ animation: "fadeUp 0.8s ease both" }}>
            <span className="celebration">🎉💍🌹✨💖</span>
            <h1 style={{ fontSize: "clamp(2rem, 6vw, 2.8rem)" }}>
              YES!!! 💍
            </h1>
            <div className="divider" />
            <p className="final-msg">
              This is the beginning of our forever. Every dream, every
              adventure, every quiet evening — I want them all with you.
              <br /><br />
              Thank you for choosing me, just as I choose you — today,
              tomorrow, and always. ❤️
            </p>
            <div className="divider" />
            <p style={{ color: "rgba(245,180,200,0.6)", fontSize: "0.9rem", fontStyle: "italic" }}>
              Now go celebrate with the one you love! 🥂
            </p>

            <div className="reply-box">
              {!replySubmitted ? (
                <>
                  <span className="reply-label">💌 Your words for this moment…</span>
                  <textarea
                    className="reply-input"
                    placeholder="Write your heart out… 🌹"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    disabled={sending}
                  />
                  <br />
                  <button
                    className="reply-submit"
                    onClick={sendReply}
                    disabled={sending || !replyText.trim()}
                    style={{ opacity: sending ? 0.7 : 1 }}
                  >
                    {sending ? "Sending… 💫" : "Send To Gaurav💗"}
                  </button>
                  {sendError && (
                    <p style={{ color: "#ff6b8a", marginTop: "10px", fontSize: "0.9rem" }}>
                      {sendError}
                    </p>
                  )}
                </>
              ) : (
                <div className="reply-display">
                  <p className="reply-name">✨ Her reply (sent to your love!):</p>
                  <p>"{replyText}"</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}