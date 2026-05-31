import DashboardPage from "./pages/DashboardPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { useAuth } from "./hooks/useAuth.js";
import { useTheme } from "./hooks/useTheme.js";

export default function App() {
  const { checking, authenticated, user, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  if (checking) {
    return (
      <main className="app-loading">
        <span className="spinner" aria-hidden="true" />
      </main>
    );
  }

  if (!authenticated) {
    return <LoginPage onLogin={login} onToggleTheme={toggleTheme} theme={theme} />;
  }

  return <DashboardPage onLogout={logout} onToggleTheme={toggleTheme} theme={theme} user={user} />;
}
