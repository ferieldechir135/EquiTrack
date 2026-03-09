import { useState, useEffect } from "react";

const C = {
  green: "#1C3A2E",
  greenMid: "#2D5A42",
  greenLight: "#3D6B52",
  gold: "#C9A84C",
  beige: "#F5F0E0",
  beigeDeep: "#EDE5C8",
  beigeCard: "#E8E0C8",
  text: "#1C3A2E",
  textMid: "rgba(28,58,46,0.6)",
  textFaint: "rgba(28,58,46,0.38)",
  red: "#B05A2A",
};

const authApi = {
  register: (data) =>
    fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(async (r) => {
      if (!r.ok) throw new Error(await r.text());
      return r.json();
    }),
  login: (data) =>
    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(async (r) => {
      if (!r.ok) throw new Error(await r.text());
      return r.json();
    }),
};

function Deco({ size, x, y, opacity, delay }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1px solid rgba(201,168,76,${opacity})`,
        animation: `floatUp 7s ease-in-out ${delay}s infinite alternate`,
        pointerEvents: "none",
      }}
    />
  );
}

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  const reset = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleSubmit = async () => {
    setError("");
    if (!email || !password)
      return setError("Veuillez remplir tous les champs.");
    if (mode === "register") {
      if (password !== confirmPassword)
        return setError("Les mots de passe ne correspondent pas.");
      if (password.length < 6)
        return setError("Le mot de passe doit contenir au moins 6 caractères.");
    }
    setLoading(true);
    try {
      const data =
        mode === "login"
          ? await authApi.login({ email, password })
          : await authApi.register({ email, password });
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      onLogin(data.token, data.user);
    } catch (err) {
      try {
        setError(JSON.parse(err.message).error || err.message);
      } catch {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (name) => ({
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: `1.5px solid ${focused === name ? C.gold : C.beigeCard}`,
    backgroundColor: focused === name ? "#fff" : C.beigeDeep,
    fontSize: 13,
    fontFamily: "'Georgia', serif",
    color: C.text,
    outline: "none",
    boxSizing: "border-box",
    transition: "all 0.2s",
    boxShadow: focused === name ? `0 0 0 3px rgba(201,168,76,0.12)` : "none",
  });

  const labelStyle = {
    display: "block",
    marginBottom: 6,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: C.textFaint,
    fontFamily: "'Georgia', serif",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&display=swap');
        @keyframes floatUp {
          from { transform: translateY(0px); opacity: 0.5; }
          to   { transform: translateY(-20px); opacity: 1; }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .auth-input::placeholder { color: rgba(28,58,46,0.3); font-style: italic; }
        .auth-submit:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); box-shadow: 0 10px 28px rgba(28,58,46,0.28) !important; }
        .auth-submit:active:not(:disabled) { transform: translateY(0); }
        .auth-tab:hover { opacity: 0.8; }
        .auth-link:hover { opacity: 0.7; }
      `}</style>

      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
          fontFamily: "'Georgia', serif",
        }}
      >
        {/* ══ LEFT — green panel ══ */}
        <div
          style={{
            width: "44%",
            backgroundColor: C.green,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            animation: mounted ? "fadeInLeft 0.65s ease both" : "none",
          }}
        >
          {/* decorative rings */}
          <Deco size={380} x={-18} y={-12} opacity={0.05} delay={0} />
          <Deco size={240} x={-8} y={-4} opacity={0.09} delay={1.2} />
          <Deco size={300} x={68} y={68} opacity={0.05} delay={0.6} />
          <Deco size={180} x={72} y={74} opacity={0.1} delay={2} />
          <Deco size={120} x={55} y={-6} opacity={0.07} delay={1.8} />
          <Deco size={90} x={8} y={82} opacity={0.08} delay={3.2} />

          {/* right border gold gradient */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 2,
              height: "100%",
              background: `linear-gradient(to bottom, transparent 0%, ${C.gold} 40%, ${C.gold} 60%, transparent 100%)`,
              opacity: 0.35,
            }}
          />

          {/* main content */}
          <div
            style={{
              zIndex: 1,
              textAlign: "center",
              padding: "0 52px",
              maxWidth: 360,
            }}
          >
            {/* horse icon circle */}
            <div
              style={{
                width: 82,
                height: 82,
                borderRadius: "50%",
                border: `2px solid rgba(201,168,76,0.35)`,
                backgroundColor: "#E8E0C8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 38,
                margin: "0 auto 28px",
                animation: "fadeUp 0.8s 0.2s ease both",
              }}
            >
              <img
                src="/public/logo_EquiTrack_nobkrd.png"
                alt="🐴"
                width="55"
                height="55"
              />
            </div>

            {/* brand name */}
            <div
              style={{
                fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                fontSize: 52,
                fontWeight: 700,
                fontStyle: "italic",
                color: C.gold,
                letterSpacing: 4,
                textTransform: "uppercase",
                lineHeight: 1,
                marginBottom: 10,
                animation: "fadeUp 0.8s 0.35s ease both",
              }}
            >
              EquiTrack
            </div>

            <div
              style={{
                fontSize: 10,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "rgba(201,168,76,0.5)",
                marginBottom: 44,
                animation: "fadeUp 0.8s 0.45s ease both",
              }}
            >
              Stable Management
            </div>

            {/* divider */}
            <div
              style={{
                width: 44,
                height: 1,
                backgroundColor: C.gold,
                margin: "0 auto 38px",
                opacity: 0.3,
                animation: "fadeUp 0.8s 0.5s ease both",
              }}
            />

            {/* feature list */}
            {[
              ["🐎", "Horse Management"],
              ["📅", "Schedule & Events"],
              ["💰", "Financial Tracking"],
              ["👥", "Team & Riders"],
            ].map(([icon, label], i) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 16,
                  textAlign: "left",
                  animation: `fadeUp 0.7s ${0.6 + i * 0.1}s ease both`,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    flexShrink: 0,
                    backgroundColor: "rgba(201,168,76,0.09)",
                    border: "1px solid rgba(201,168,76,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 17,
                  }}
                >
                  {icon}
                </div>
                <span
                  style={{
                    fontSize: 14,
                    color: "rgba(245,240,224,0.68)",
                    letterSpacing: 0.4,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* footer */}
          <div
            style={{
              position: "absolute",
              bottom: 22,
              fontSize: 9,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: "rgba(201,168,76,0.25)",
            }}
          >
            © 2026 EquiTrack
          </div>
        </div>

        {/* ══ RIGHT — beige form panel ══ */}
        <div
          style={{
            flex: 1,
            backgroundColor: C.beige,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 56px",
            animation: mounted ? "fadeInRight 0.65s ease both" : "none",
          }}
        >
          <div style={{ width: "100%", maxWidth: 390 }}>
            {/* heading */}
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                  fontSize: 34,
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: 8,
                  letterSpacing: 0.5,
                }}
              >
                {mode === "login" ? "Welcome" : "Create an account."}
              </div>
              <div style={{ fontSize: 14, color: C.textMid, lineHeight: 1.5 }}>
                {mode === "login"
                  ? "Log in to your management dashboard."
                  : "Join EquiTrack today."}
              </div>
            </div>

            {/* tab toggle */}
            <div
              style={{
                display: "flex",
                backgroundColor: C.beigeDeep,
                borderRadius: 12,
                padding: 4,
                marginBottom: 28,
                border: `1px solid ${C.beigeCard}`,
              }}
            >
              {[
                ["login", "Login"],
                ["register", "Register"],
              ].map(([m, lbl]) => (
                <button
                  key={m}
                  className="auth-tab"
                  onClick={() => {
                    setMode(m);
                    reset();
                  }}
                  style={{
                    flex: 1,
                    padding: "9px 0",
                    border: "none",
                    borderRadius: 9,
                    cursor: "pointer",
                    fontSize: 12,
                    letterSpacing: 1,
                    fontFamily: "'Georgia', serif",
                    transition: "all 0.2s",
                    backgroundColor: mode === m ? C.green : "transparent",
                    color: mode === m ? C.gold : C.textMid,
                    fontWeight: mode === m ? "bold" : "normal",
                    boxShadow:
                      mode === m ? "0 2px 10px rgba(28,58,46,0.18)" : "none",
                  }}
                >
                  {lbl}
                </button>
              ))}
            </div>

            {/* email */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>email adress</label>
              <input
                className="auth-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="vous@gmail.com"
                style={inputStyle("email")}
              />
            </div>

            {/* password */}
            <div style={{ marginBottom: mode === "register" ? 16 : 24 }}>
              <label style={labelStyle}>Password</label>
              <input
                className="auth-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="••••••••"
                style={inputStyle("password")}
              />
            </div>

            {/* confirm password */}
            {mode === "register" && (
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Confirm Password</label>
                <input
                  className="auth-input"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocused("confirm")}
                  onBlur={() => setFocused(null)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="••••••••"
                  style={inputStyle("confirm")}
                />
              </div>
            )}

            {/* error */}
            {error && (
              <div
                style={{
                  backgroundColor: "rgba(176,90,42,0.07)",
                  border: `1px solid rgba(176,90,42,0.28)`,
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontSize: 12,
                  color: C.red,
                  marginBottom: 16,
                  fontStyle: "italic",
                }}
              >
                ⚠ {error}
              </div>
            )}

            {/* submit */}
            <button
              className="auth-submit"
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%",
                padding: "13px",
                backgroundColor: loading ? "rgba(28,58,46,0.35)" : C.green,
                color: C.gold,
                border: "none",
                borderRadius: 10,
                fontSize: 12,
                fontWeight: "bold",
                letterSpacing: 2.5,
                textTransform: "uppercase",
                fontFamily: "'Georgia', serif",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.25s",
                boxShadow: "0 4px 18px rgba(28,58,46,0.18)",
              }}
            >
              {loading
                ? "loading..."
                : mode === "login"
                  ? "Login"
                  : "Create an account."}
            </button>

            {/* switch mode */}
            <div
              style={{
                textAlign: "center",
                marginTop: 22,
                fontSize: 13,
                color: C.textMid,
              }}
            >
              {mode === "login"
                ? "Don’t have an account yet? "
                : "Already have an account? "}
              <span
                className="auth-link"
                onClick={() => {
                  setMode(mode === "login" ? "register" : "login");
                  reset();
                }}
                style={{
                  color: C.greenMid,
                  cursor: "pointer",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  transition: "opacity 0.2s",
                }}
              >
                {mode === "login" ? "Sign in" : "Login"}
              </span>
            </div>

            {/* footer note */}
            <div
              style={{
                marginTop: 40,
                paddingTop: 22,
                borderTop: `1px solid ${C.beigeCard}`,
                textAlign: "center",
                fontSize: 10,
                color: C.textFaint,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              Secure access · Data protected
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
