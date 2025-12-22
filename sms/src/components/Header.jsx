import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, IconButton, useTheme as useMuiTheme } from '@mui/material';
import { menuItems } from '../config/menuConfig';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const { themeMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="Header" style={{ backgroundColor: muiTheme.palette.background.paper, borderColor: muiTheme.palette.divider }}>
      <div className="header-container">
        <div className="brand">
          <img src="/logoMBDS.png" alt="Logo MBDS" className="logo" />
          <div className="brand-text">
            <h1 className="title" style={{ color: muiTheme.palette.text.primary }}>Gestion Académique</h1>
            <p className="subtitle" style={{ color: muiTheme.palette.text.secondary }}>Plateforme de Gestion des Données</p>
          </div>
        </div>

        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`} style={{ backgroundColor: muiTheme.palette.background.paper }}>
          <ul className="nav-list">
            <li className="nav-item">
              <button
                type="button"
                className="nav-link theme-switch"
                onClick={toggleTheme}
                style={{
                  '--color': themeMode === 'dark' ? '#90caf9' : '#2563eb',
                  color: muiTheme.palette.text.primary,
                  borderColor: muiTheme.palette.divider,
                  backgroundColor: muiTheme.palette.background.paper,
                }}
              >
                <span className="nav-icon">{themeMode === 'dark' ? '🌙' : '☀️'}</span>
                <span className="nav-text">
                  <span className="nav-label">{themeMode === 'dark' ? 'Mode sombre' : 'Mode clair'}</span>
                  <span className="nav-description">Basculer l’apparence</span>
                </span>
                <span className="nav-arrow">→</span>
              </button>
            </li>
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    '--color': item.color,
                    color: muiTheme.palette.text.primary,
                    borderColor: muiTheme.palette.divider,
                    backgroundColor: muiTheme.palette.background.paper,
                  }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">
                    <span className="nav-label">{item.label}</span>
                    <span className="nav-description">{item.description}</span>
                  </span>
                  <span className="nav-arrow">→</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="auth-bar" style={{ borderTop: `1px solid ${muiTheme.palette.divider}` }}>
            {isAuthenticated ? (
              <>
                <span className="user-info" style={{ color: muiTheme.palette.text.primary }}>
                  {user?.username} {user?.role && `(${(user.role || '').toLowerCase()})`}
                </span>
                <button className="logout-btn" onClick={handleLogout}>
                  🚪 Déconnexion
                </button>
              </>
            ) : (
              <button
                className="login-btn"
                onClick={() => navigate('/login')}
                style={{
                  background: muiTheme.palette.primary.main,
                  color: muiTheme.palette.primary.contrastText,
                }}
              >
                Se connecter
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}