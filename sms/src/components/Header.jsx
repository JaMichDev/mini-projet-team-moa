import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Divider, Typography, useTheme as useMuiTheme } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { menuItems } from '../config/menuConfig';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated, logout, user } = useAuth();
  const { themeMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const navigate = useNavigate();

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setAnchorEl(null);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    handleSettingsClose();
  };

  const handleLogout = () => {
    handleSettingsClose();
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

          <div className="auth-bar">
            {isAuthenticated ? (
              <>
                <IconButton
                  onClick={handleSettingsClick}
                  sx={{
                    color: muiTheme.palette.text.primary,
                    border: `2px solid ${muiTheme.palette.divider}`,
                    borderRadius: '8px',
                    padding: '8px',
                    '&:hover': {
                      borderColor: muiTheme.palette.primary.main,
                      backgroundColor: muiTheme.palette.action.hover,
                    },
                  }}
                >
                  <SettingsIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleSettingsClose}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      minWidth: 250,
                      mt: 1.5,
                      borderRadius: 2,
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <Box sx={{ px: 2, py: 1.5, borderBottom: `1px solid ${muiTheme.palette.divider}` }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <PersonIcon sx={{ color: muiTheme.palette.primary.main, fontSize: 20 }} />
                      <Typography variant="subtitle1" fontWeight={600}>
                        {user?.username}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', ml: 3.5 }}>
                      Rôle: {user?.role || 'Utilisateur'}
                    </Typography>
                  </Box>
                  
                  <MenuItem onClick={handleThemeToggle} sx={{ py: 1.5, gap: 2 }}>
                    <ListItemIcon>
                      {themeMode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                    </ListItemIcon>
                    <ListItemText primary={themeMode === 'dark' ? 'Mode clair' : 'Mode sombre'} />
                  </MenuItem>
                  
                  <Divider />
                  
                  <MenuItem onClick={handleLogout} sx={{ py: 1.5, gap: 2, color: 'error.main' }}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" sx={{ color: 'error.main' }} />
                    </ListItemIcon>
                    <ListItemText primary="Déconnexion" />
                  </MenuItem>
                </Menu>
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