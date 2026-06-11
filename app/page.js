"use client";

import { useEffect, useState } from "react";
import { sendEmail } from "./actions";

const hearts = ["💗", "💖", "💝", "💓", "💞", "🌹", "✨"];

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

const pages = [
  {
    id: 1,
    icon: "💗",
    title: "Happy One Month\nMeri Jaan Sweety 💖",
    content: (
      <>
        Ek mahina pehle tune "haan" kaha tha —<br />
        aur tab se ab tak hum sirf tumhara intezaar<br />
        kar rahe hain kab mere Sweety 💖 idhar aayegi.
        <br /><br />
        Aur humko uss tarah apna loge<br />
        jaise hum chahte hain... 🌹
      </>
    ),
  },
  {
    id: 2,
    icon: "🥀",
    title: "Ek Mahine Ka Ehsaas",
    content: (
      <>
        Ek mahine mein tumne mujhe yeh ehsaas diya<br />
        ki koi kisi ka intezaar karna bhi<br />
        kitna khoobsurat hota hai. 💞
        <br /><br />
        Mana thodi takraar hui —<br />
        par woh tumko paane ke chakkar mein<br />
        tumse lad baithe... 🌹
        <br /><br />
        <em>Sorry Meri Jaan 💖</em>
      </>
    ),
  },
  {
    id: 3,
    icon: "✈️",
    title: "Milna Chahte The...",
    content: (
      <>
        Hum tumse milke yeh pehla mahina<br />
        tumhare saath bitaana chahte the —<br />
        isliye aana chahte the... 🌹
        <br /><br />
        Tum Kya Ho Mere Liye Nahi Bata Sakte Hum,<br />
        par tumhara khayal har pal paas rakhta hai. 💗
      </>
    ),
  },
  {
    id: 4,
    icon: "🌙",
    title: "5 Saal",
    content: (
      <>
        Meri sacchi choti si duniya mein<br />
        hum sachchi 5 saal baad kisi ko laaye —<br />
        kyunki 5 saal lage yeh dhundhne mein<br />
        ki kaun hai jo mera dil kabhi nahi torega. 💔➡️💗
        <br /><br />
        Humko tumhare alawa sachchi kisi pe<br />
        bharosa nahi hota tha...
        <br /><br />
        Hum chahte to kisi aur ko chun lete —<br />
        lekin darr tha ki chod diya jaayega...
        <br /><br />
        Tum humein safe place lagte the,<br />
        isliye hum yahan aaye. 🌹
        <br />
        isliye Itna efforts kr rahe hai
      </>
    ),
  },
  {
    id: 5,
    icon: "🤝",
    title: "Hum .....",
    content: (
      <>
        Humko pata hai kya takleef aa rahi hai —<br />
        tumhare aur hamare feelings ke beech mein.<br />
        Tum kuch keh nahi pa rahe ho,<br />
        par hum jaante hain. 💗
        <br /><br />
        Hum chahte hain — mera haath pakad ke<br />
        ab baadho mere saath, poori tarah aage. 🌹
        <br /><br />
        Hum kabhi Prince ko tum se alag nahi karenge<br />
        jab tak tum na chahna — <em>I Promise Love.</em>
        <br /><br />
        Usse baat karo — par mere banke. 💞<br />
        Hum tumhari har feeling samajhte hain,<br />
        isliye Alag nahi krna chhate <br />
        isliye tumhare saath hain. 💖
      </>
    ),
  },
  {
    id: 6,
    icon: "💌",
    title: "Ab Keh Do Na...",
    content: (
      <>
        Hum chahte hain ab apna kal chunno —<br />
        tum mere saath, humko poori tarah<br />
        apne mann mein rakh ke. 💗
        <br /><br />
        Jaise tumko rakhna chahiye. 🌹
        <br /><br />
        Tumko pata hai hum tumko<br />
        bahut chahte hain. 💖
        <br /><br />
        Yeh sab milke kehna chahte the —<br />
        nahi keh paye, isliye likh rahe hain.
        <br /><br />
        <strong>Meri Jaan, apna lo humko poore mann se.<br />
        Please... I Love You. 💗</strong> <br />
        <strong>Keh Nahi Pa Rahe Likh ke Bhej Do.<br />
        Please... I Love You. 💗</strong>
      </>
    ),
    isLast: true,
  },
];

export default function ProposalPage() {
  const [petals, setPetals] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [replyText, setReplyText] = useState("");
  const [replySubmitted, setReplySubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const generated = Array.from({ length: 24 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 18 + 12}px`,
      duration: Math.random() * 6 + 7,
      delay: Math.random() * 10,
      emoji: hearts[Math.floor(Math.random() * hearts.length)],
      id: i,
    }));
    setPetals(generated);
  }, []);

  const goToPage = (index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentPage(index);
      setAnimating(false);
    }, 300);
  };

  const sendReply = async () => {
    if (!replyText.trim()) return;
    setSending(true);
    setSendError("");
    try {
      const result = await sendEmail(replyText, "Yes");
      if (result.success) {
        setReplySubmitted(true);
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
  

  const page = pages[currentPage];
  const isFirst = currentPage === 0;
  const isLast = currentPage === pages.length - 1;

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
          0% { transform: translateY(-40px) rotate(0deg); opacity: 0.9; }
          80% { opacity: 0.7; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-20px); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.07); }
        }

        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px #e8a0b4, 0 0 40px #c96b8a; }
          50% { text-shadow: 0 0 35px #f7c5d5, 0 0 70px #e8607a; }
        }

        .page {
          min-height: 100vh;
          display: flex;
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
          overflow: hidden;
        }

        .page::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse at 20% 30%, rgba(180,30,70,0.35) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 70%, rgba(140,20,80,0.30) 0%, transparent 55%),
            rgba(13,2,9,0.60);
          z-index: 0;
          pointer-events: none;
        }

        .card {
          position: relative;
          z-index: 10;
          max-width: 560px;
          width: 100%;
          background: rgba(20,4,12,0.48);
          border: 1px solid rgba(220,120,150,0.25);
          border-radius: 24px;
          padding: 52px 40px;
          text-align: center;
          backdrop-filter: blur(7px);
          -webkit-backdrop-filter: blur(7px);
          box-shadow:
            0 0 60px rgba(200,60,100,0.15),
            0 0 120px rgba(160,30,70,0.10),
            inset 0 1px 0 rgba(255,200,220,0.08);
        }

        .card-inner {
          animation: fadeUp 0.5s ease both;
        }

        .card-inner.exit {
          animation: fadeOut 0.3s ease both;
        }

        .icon {
          display: block;
          margin: 0 auto 24px;
          font-size: 68px;
          animation: pulse 2.4s ease-in-out infinite;
        }

        h1 {
          margin-bottom: 16px;
          color: #f9e0e8;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.6rem, 6vw, 2.6rem);
          font-style: italic;
          font-weight: 700;
          line-height: 1.3;
          animation: glow 3s ease-in-out infinite;
          white-space: pre-line;
        }

        .subtitle {
          margin-bottom: 30px;
          color: rgba(245,214,223,0.76);
          font-size: 1.15rem;
          font-style: italic;
          line-height: 1.85;
        }

        .divider {
          width: 82px;
          height: 1px;
          margin: 28px auto;
          background: linear-gradient(90deg, transparent, rgba(220,130,155,0.65), transparent);
        }

        .page-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 28px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(220,120,150,0.28);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: #c94466;
          transform: scale(1.3);
          box-shadow: 0 0 8px rgba(200,60,100,0.6);
        }

        .nav-row {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-top: 32px;
          flex-wrap: wrap;
        }

        .btn {
          min-width: 132px;
          padding: 14px 34px;
          border: none;
          border-radius: 999px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn:hover:not(:disabled) {
          transform: translateY(-3px) scale(1.04);
        }

        .btn:disabled {
          cursor: not-allowed;
          opacity: 0.4;
        }

        .btn-yes {
          background: linear-gradient(135deg, #c94466, #a82050, #8b1040);
          color: #fff;
          box-shadow: 0 6px 30px rgba(180,40,80,0.45);
        }

        .btn-prev {
          background: rgba(255,255,255,0.05);
          color: rgba(245,214,223,0.82);
          border: 1px solid rgba(220,120,150,0.28);
        }

        .reply-box {
          width: 100%;
          margin-top: 30px;
          animation: fadeUp 0.5s ease both;
        }

        .reply-label {
          display: block;
          margin-bottom: 12px;
          color: rgba(245,200,215,0.86);
          font-size: 1.04rem;
          font-style: italic;
        }

        .reply-input {
          width: 100%;
          min-height: 118px;
          padding: 14px 18px;
          border: 1px solid rgba(220,120,150,0.35);
          border-radius: 14px;
          outline: none;
          background: rgba(255,255,255,0.07);
          color: #f9e0e8;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.08rem;
          resize: none;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .reply-input::placeholder {
          color: rgba(245,180,200,0.38);
          font-style: italic;
        }

        .reply-input:focus {
          border-color: rgba(220,80,120,0.68);
          box-shadow: 0 0 18px rgba(200,60,100,0.16);
        }

        .reply-submit {
          margin-top: 16px;
          background: linear-gradient(135deg, #c94466, #a82050, #8b1040);
          color: #fff;
          box-shadow: 0 5px 24px rgba(180,40,80,0.42);
        }

        .error {
          margin-top: 12px;
          color: #ff7b97;
          font-size: 0.95rem;
        }

        .reply-display {
          margin-top: 22px;
          padding: 18px 20px;
          border: 1px solid rgba(220,120,150,0.25);
          border-radius: 14px;
          background: rgba(255,255,255,0.06);
          color: #f9e0e8;
          font-size: 1.08rem;
          font-style: italic;
          line-height: 1.7;
          animation: fadeUp 0.5s ease both;
        }

        .page-label {
          font-size: 0.82rem;
          color: rgba(245,180,200,0.40);
          letter-spacing: 0.08em;
          margin-bottom: 20px;
          font-style: italic;
        }

        @media (max-width: 520px) {
          .card { padding: 42px 24px; }
          .btn  { width: 100%; }
        }
      `}</style>

      <main className="page">
        {petals.map((petal) => (
          <FloatingPetal key={petal.id} style={petal} />
        ))}

        <section className="card">
          <div className={`card-inner ${animating ? "exit" : ""}`}>

            <div className="page-dots">
              {pages.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === currentPage ? "active" : ""}`}
                  onClick={() => goToPage(i)}
                />
              ))}
            </div>

            <p className="page-label">{currentPage + 1} / {pages.length}</p>

            <span className="icon">{page.icon}</span>
            <h1>{page.title}</h1>
            <div className="divider" />
            <p className="subtitle">{page.content}</p>

            {!isLast && (
              <div className="nav-row">
                {!isFirst && (
                  <button className="btn btn-prev" onClick={() => goToPage(currentPage - 1)}>
                    ← Peeche
                  </button>
                )}
                <button className="btn btn-yes" onClick={() => goToPage(currentPage + 1)}>
                  Aage → 💗
                </button>
              </div>
            )}

            {isLast && (
              <>
                <div className="reply-box">
                  {!replySubmitted ? (
                    <>
                      <label className="reply-label" htmlFor="reply">
                        💌 Tumhara Gaurav
                      </label>
                      <textarea
                        id="reply"
                        className="reply-input"
                        placeholder="Kehhhhh Do Sweety ... 💌"
                        value={replyText}
                        onChange={(event) => setReplyText(event.target.value)}
                        disabled={sending}
                      />
                      <br />
                      <button
                        className="btn reply-submit"
                        onClick={sendReply}
                        disabled={sending || !replyText.trim()}
                        style={{ opacity: sending || !replyText.trim() ? 0.68 : 1 }}
                      >
                        {sending ? "Bhej rahe hain..." : "Bhejo Gaurav Ko 💗"}
                      </button>
                      {sendError && <p className="error">{sendError}</p>}
                    </>
                  ) : (
                    <div className="reply-display">
                      Gaurav ko tera message mil gaya 💌
                      <br />
                      &ldquo;{replyText}&rdquo;
                    </div>
                  )}
                </div>

                <div className="nav-row">
                  <button className="btn btn-prev" onClick={() => goToPage(currentPage - 1)}>
                    ← Peeche
                  </button>
                </div>
              </>
            )}

          </div>
        </section>
      </main>
    </>
  );
}
