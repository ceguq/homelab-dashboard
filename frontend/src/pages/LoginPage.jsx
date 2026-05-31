import { useState } from "react";

export default function LoginPage({ onLogin, onToggleTheme, theme }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await onLogin(username.trim(), password);
    } catch (err) {
      setError(err.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <button className="icon-button theme-button login-theme-toggle" onClick={onToggleTheme} title="Toggle theme" type="button">
        <i className={`ti ti-${theme === "dark" ? "sun" : "moon"}`} aria-hidden="true" />
      </button>

      <section className="login-panel">
        <div className="login-brand">
          <span className="login-brand-mark">
            <i className="ti ti-home-shield" aria-hidden="true" />
          </span>
          <div>
            <p>Homelab Dashboard</p>
            <h1>Secure Access</h1>
          </div>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <span>Username</span>
            <input
              autoComplete="username"
              autoFocus
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin"
              required
              type="text"
              value={username}
            />
          </label>

          <label>
            <span>Password</span>
            <input
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              required
              type="password"
              value={password}
            />
          </label>

          {error && (
            <div className="login-error" role="alert">
              <i className="ti ti-alert-triangle" aria-hidden="true" />
              {error}
            </div>
          )}

          <button className="login-button" disabled={loading} type="submit">
            {loading ? <span className="spinner" aria-hidden="true" /> : <i className="ti ti-login-2" aria-hidden="true" />}
            <span>{loading ? "Memeriksa..." : "Masuk"}</span>
          </button>
        </form>
      </section>
    </main>
  );
}
