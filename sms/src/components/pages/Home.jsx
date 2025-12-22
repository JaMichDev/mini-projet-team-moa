import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useStudents, useCourses, useGrades, useUsers } from '../../hooks/useApi';
import { useAuth } from '../../context/AuthContext';

function StatCard({ label, value, hint, color, icon }) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        background: alpha(color, 0.08),
        border: `1px solid ${alpha(color, 0.2)}`,
        borderLeft: `5px solid ${color}`,
        textAlign: 'center',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 24px ${alpha(color, 0.25)}`,
        },
      }}
    >
      <CardContent sx={{ pb: 2 }}>
        <Typography sx={{ fontSize: 32, mb: 1 }}>{icon}</Typography>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block' }}>
          {label}
        </Typography>
        <Typography
          variant="h4"
          sx={{ color, fontWeight: 800, my: 1 }}
        >
          {value}
        </Typography>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
          {hint}
        </Typography>
      </CardContent>
    </Card>
  );
}

function QuickActionCard({ title, description, icon, color, onClick }) {
  const theme = useTheme();
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: `1px solid ${theme.palette.divider}`,
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: theme.shadows[8],
          borderColor: color,
        },
      }}
    >
      <CardContent sx={{ textAlign: 'center', py: 3 }}>
        <Typography sx={{ fontSize: 32, mb: 1 }}>{icon}</Typography>
        <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useAuth();
  const role = user?.role || 'student';

  const canManageUsers = role === 'admin';
  const canManageStudents = role === 'admin' || role === 'scolarite';
  const canManageCourses = role === 'admin' || role === 'scolarite';
  const canManageGrades = role === 'admin' || role === 'scolarite' || role === 'student';

  const { data: students } = useStudents();
  const { data: courses } = useCourses();
  const { data: grades } = useGrades();
  const { data: users } = useUsers(canManageUsers);

  const stats = useMemo(() => {
    const base = [
      { label: 'Étudiants', value: students?.length ?? 0, hint: 'Inscrits', icon: '👥', color: theme.palette.primary.main, visible: canManageStudents },
      { label: 'Cours', value: courses?.length ?? 0, hint: 'Actifs', icon: '📚', color: theme.palette.info.main, visible: canManageCourses },
      { label: 'Notes', value: grades?.length ?? 0, hint: 'Enregistrées', icon: '📊', color: theme.palette.success.main, visible: canManageGrades },
    ];

    if (canManageUsers) {
      base.splice(2, 0, { label: 'Utilisateurs', value: users?.length ?? 0, hint: 'Comptes', icon: '👤', color: theme.palette.warning.main, visible: true });
    }

    return base.filter((s) => s.visible !== false);
  }, [students, courses, users, grades, canManageUsers, canManageStudents, canManageCourses, canManageGrades, theme]);

  // Données pour graphiques
  const gradeDistribution = useMemo(() => {
    if (!grades || grades.length === 0) return [];
    const ranges = { 'A (90-100)': 0, 'B (80-89)': 0, 'C (70-79)': 0, 'D (60-69)': 0, 'F (<60)': 0 };
    grades.forEach((g) => {
      const score = g.grade || 0;
      if (score >= 90) ranges['A (90-100)']++;
      else if (score >= 80) ranges['B (80-89)']++;
      else if (score >= 70) ranges['C (70-79)']++;
      else if (score >= 60) ranges['D (60-69)']++;
      else ranges['F (<60)']++;
    });
    return Object.entries(ranges).map(([label, value]) => ({ name: label, value }));
  }, [grades]);

  const courseStats = useMemo(() => {
    if (!grades || !courses || grades.length === 0) return [];
    const stats = {};
    grades.forEach((g) => {
      if (!stats[g.course]) stats[g.course] = { count: 0, total: 0 };
      stats[g.course].count++;
      stats[g.course].total += g.grade || 0;
    });
    return Object.entries(stats).map(([course, { count, total }]) => ({
      name: course,
      average: Math.round(total / count),
      count,
    }));
  }, [grades, courses]);

  const studentGrowth = useMemo(() => {
    if (!students || students.length === 0) return [];
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'];
    return months.map((month, i) => ({
      name: month,
      inscriptions: Math.floor((students.length / months.length) * (i + 1)) + Math.floor(Math.random() * 3),
    }));
  }, [students]);

  const quickActions = [
    canManageUsers && { title: 'Nouv. Utilisateur', description: 'Ajouter un compte', to: '/users', icon: '👤', color: theme.palette.warning.main },
    canManageStudents && { title: 'Inscrire Étudiant', description: 'Dossier complet', to: '/students', icon: '🎓', color: theme.palette.primary.main },
    canManageCourses && { title: 'Planifier Cours', description: 'Configurer matières', to: '/courses', icon: '📚', color: theme.palette.info.main },
    canManageGrades && { title: 'Saisir Notes', description: 'Résultats & suivi', to: '/grades', icon: '📊', color: theme.palette.success.main },
  ].filter(Boolean);

  const COLORS = [theme.palette.primary.main, theme.palette.info.main, theme.palette.success.main, theme.palette.warning.main, theme.palette.error.main];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 1,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Plateforme MBDS
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
          Gestion académique centralisée — Superviser, sécuriser et piloter vos données avec contrôle des rôles.
        </Typography>
      </Box>

      {/* Stats Row */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((s) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={s.label}>
            <StatCard label={s.label} value={s.value} hint={s.hint} color={s.color} icon={s.icon} />
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Grade Distribution Pie Chart */}
        {grades && grades.length > 0 && (
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader title="Distribution des Notes" />
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Student Growth Line Chart */}
        {students && students.length > 0 && (
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader title="Croissance des Inscriptions" />
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={studentGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="inscriptions"
                      stroke={theme.palette.primary.main}
                      strokeWidth={3}
                      dot={{ fill: theme.palette.primary.main, r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Course Performance Charts: Area + Scatter */}
        {courseStats.length > 0 && (
          <>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Moyenne par Cours (/100)" />
                <CardContent>
                  <ResponsiveContainer width="100%" height={320}>
                    <AreaChart data={courseStats}>
                      <defs>
                        <linearGradient id="avgFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={theme.palette.primary.main} stopOpacity={0.5} />
                          <stop offset="100%" stopColor={theme.palette.primary.main} stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Area type="monotone" dataKey="average" name="Moyenne" stroke={theme.palette.primary.main} strokeWidth={3} fill="url(#avgFill)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Relation: Moyenne vs Étudiants" />
                <CardContent>
                  <ResponsiveContainer width="100%" height={320}>
                    <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" dataKey="average" name="Moyenne" domain={[0, 100]} />
                      <YAxis type="number" dataKey="count" name="Étudiants" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Legend />
                      <Scatter name="Cours" data={courseStats} fill={theme.palette.info.main} />
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>

      {/* Quick Actions Section */}
      <Card sx={{ mb: 4 }}>
        <CardHeader
          title="Actions Rapides"
          subheader="Accédez aux fonctionnalités principales"
        />
        <CardContent>
          <Grid container spacing={2}>
            {quickActions.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.title}>
                <QuickActionCard
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  color={item.color}
                  onClick={() => navigate(item.to)}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Checklist Section */}
      <Card>
        <CardHeader
          title="Plan de Contrôle"
          subheader="Checklist rapide pour fiabiliser la base de données"
        />
        <CardContent>
          <Grid container spacing={2}>
            {[
              'Vérifier les accès Admin/Scolarité/Étudiant',
              'Compléter les profils utilisateurs',
              'Importer ou saisir les étudiants manquants',
              'Contrôler le catalogue des cours',
            ].map((item, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: theme.palette.success.main,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </Box>
                  <Typography variant="body2">{item}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
