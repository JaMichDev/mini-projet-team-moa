import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#fff',
    },
    secondary: {
      main: '#7c3aed',
      light: '#a78bfa',
      dark: '#6d28d9',
      contrastText: '#fff',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    warning: {
      main: '#f59e0b',
      light: '#fcd34d',
      dark: '#d97706',
    },
    info: {
      main: '#0ea5e9',
      light: '#38bdf8',
      dark: '#0284c7',
    },
    success: {
      main: '#10b981',
      light: '#6ee7b7',
      dark: '#059669',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      disabled: '#cbd5e1',
    },
    divider: '#e2e8f0',
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    h1: {
      fontSize: 'clamp(28px, 4vw, 38px)',
      fontWeight: 800,
      letterSpacing: '-0.01em',
      lineHeight: 1.15,
    },
    h2: {
      fontSize: '24px',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '20px',
      fontWeight: 700,
    },
    h4: {
      fontSize: '18px',
      fontWeight: 700,
    },
    h5: {
      fontSize: '16px',
      fontWeight: 700,
    },
    h6: {
      fontSize: '14px',
      fontWeight: 700,
    },
    body1: {
      fontSize: '16px',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '14px',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
    caption: {
      fontSize: '12px',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 700,
          padding: '10px 18px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 28px rgba(37, 99, 235, 0.3)',
          },
        },
        contained: {
          boxShadow: '0 10px 24px rgba(37, 99, 235, 0.25)',
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
          border: '1px solid #e2e8f0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '&:hover fieldset': {
              borderColor: '#cbd5e1',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2563eb',
              boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.12)',
            },
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '& thead': {
            backgroundColor: '#f8fafc',
          },
          '& tbody tr:hover': {
            backgroundColor: '#f8fafc',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#f8fafc',
          '& th': {
            fontWeight: 700,
            textTransform: 'uppercase',
            fontSize: '12px',
            letterSpacing: '0.04em',
            color: '#475569',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#f1f5f9',
          padding: '12px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: '13px',
        },
        filledDefault: {
          backgroundColor: '#eef2ff',
          color: '#3730a3',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#bbdefb',
      dark: '#1976d2',
      contrastText: '#0b1220',
    },
    secondary: {
      main: '#ce93d8',
      light: '#f8bbd0',
      dark: '#ab47bc',
      contrastText: '#0b1220',
    },
    error: {
      main: '#f87171',
      light: '#fca5a5',
      dark: '#dc2626',
    },
    warning: {
      main: '#fbbf24',
      light: '#fcd34d',
      dark: '#d97706',
    },
    info: {
      main: '#38bdf8',
      light: '#bae6fd',
      dark: '#0284c7',
    },
    success: {
      main: '#4ade80',
      light: '#86efac',
      dark: '#16a34a',
    },
    background: {
      default: '#0b1220',
      paper: '#111827',
    },
    text: {
      primary: '#e5e7eb',
      secondary: '#cbd5e1',
      disabled: '#6b7280',
    },
    divider: '#1f2937',
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    h1: {
      fontSize: 'clamp(28px, 4vw, 38px)',
      fontWeight: 800,
      letterSpacing: '-0.01em',
      lineHeight: 1.15,
      color: '#e5e7eb',
    },
    h2: {
      fontSize: '24px',
      fontWeight: 700,
      color: '#e5e7eb',
    },
    h3: {
      fontSize: '20px',
      fontWeight: 700,
      color: '#e5e7eb',
    },
    body1: {
      fontSize: '16px',
      lineHeight: 1.5,
      color: '#cbd5e1',
    },
    body2: {
      fontSize: '14px',
      lineHeight: 1.6,
      color: '#cbd5e1',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 700,
          padding: '10px 18px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.4)',
          },
        },
        contained: {
          boxShadow: '0 10px 24px rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: '#111827',
          border: '1px solid #1f2937',
          boxShadow: '0 14px 28px rgba(0, 0, 0, 0.35)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: '#111827',
          border: '1px solid #1f2937',
          boxShadow: '0 14px 28px rgba(0, 0, 0, 0.35)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            backgroundColor: '#1f2937',
            color: '#e5e7eb',
            '&:hover fieldset': {
              borderColor: '#4b5563',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#90caf9',
              boxShadow: '0 0 0 3px rgba(144, 202, 249, 0.2)',
            },
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '& thead': {
            backgroundColor: '#1f2937',
          },
          '& tbody tr:hover': {
            backgroundColor: 'rgba(144, 202, 249, 0.06)',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#1f2937',
          '& th': {
            fontWeight: 700,
            textTransform: 'uppercase',
            fontSize: '12px',
            letterSpacing: '0.04em',
            color: '#cbd5e1',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#1f2937',
          padding: '12px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: '13px',
        },
        filledDefault: {
          backgroundColor: '#1f2937',
          color: '#90caf9',
        },
      },
    },
  },
});
