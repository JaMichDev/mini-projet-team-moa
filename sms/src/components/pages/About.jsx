import { aproposInfo } from '../../data/index.js';

export default function About() {
  const { title, description, contact, stats } = aproposInfo;
  const { email, phone, programmeur } = contact;
  const { totalEtudiants, totalMatieres, totalNotes, global, parMatiere } = stats;

  return (
    <main className="Main page-content apropos-page">
      <div className="apropos-header">
        <h1>ℹ️ À propos du Projet</h1>
        <p className="apropos-description">{description}</p>
      </div>

      <div className="apropos-container">
        
        {/* Title Section */}
        <section className="apropos-section">
          <h2>🎓 {title}</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
            La Faculté des Sciences de l'Université d'État d'Haïti propose depuis 1999 un Master
            (MBDS - Bases de Données et Intégration de Systèmes) en partenariat avec l'Université de Nice Sophia Antipolis.
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', marginTop: '16px' }}>
            Cette plateforme web permet de gérer efficacement les étudiants, cours et notes avec un système
            d'authentification sécurisé par JWT et contrôle d'accès basé sur les rôles (Admin, Scolarité, Étudiant).
          </p>
        </section>

        {/* Technology Stack Section */}
        <section className="apropos-section">
          <h2>🚀 Technologies utilisées</h2>
          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
            <div className="stat-card" style={{ textAlign: 'center', padding: '20px' }}>
              <div className="stat-icon" style={{ fontSize: '2.5rem' }}>⚛️</div>
              <div className="stat-content">
                <p className="stat-label">React + Vite</p>
              </div>
            </div>
            <div className="stat-card" style={{ textAlign: 'center', padding: '20px' }}>
              <div className="stat-icon" style={{ fontSize: '2.5rem' }}>🟢</div>
              <div className="stat-content">
                <p className="stat-label">Node.js + Express</p>
              </div>
            </div>
            <div className="stat-card" style={{ textAlign: 'center', padding: '20px' }}>
              <div className="stat-icon" style={{ fontSize: '2.5rem' }}>🍃</div>
              <div className="stat-content">
                <p className="stat-label">MongoDB</p>
              </div>
            </div>
            <div className="stat-card" style={{ textAlign: 'center', padding: '20px' }}>
              <div className="stat-icon" style={{ fontSize: '2.5rem' }}>🔐</div>
              <div className="stat-content">
                <p className="stat-label">JWT Auth</p>
              </div>
            </div>
          </div>
        </section>

        {/* Global Statistics Section */}
        <section className="apropos-section">
          <h2>📊 Statistiques globales</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <p className="stat-label">Étudiants</p>
                <p className="stat-value">{totalEtudiants}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-content">
                <p className="stat-label">Cours</p>
                <p className="stat-value">{totalMatieres}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-content">
                <p className="stat-label">Notes enregistrées</p>
                <p className="stat-value">{totalNotes}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <p className="stat-label">Moyenne générale</p>
                <p className="stat-value">{global.moyenne}/100</p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Statistics Section */}
        <section className="apropos-section">
          <h2>📈 Statistiques détaillées</h2>
          <div className="stats-detailed">
            <div className="stat-item">
              <span className="stat-icon-text">📊</span>
              <span className="stat-label">Moyenne</span>
              <span className="stat-value">{global.moyenne}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon-text">⬆️</span>
              <span className="stat-label">Maximum</span>
              <span className="stat-value">{global.max}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon-text">⬇️</span>
              <span className="stat-label">Minimum</span>
              <span className="stat-value">{global.min}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon-text">📍</span>
              <span className="stat-label">Médiane</span>
              <span className="stat-value">{global.median}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon-text">📉</span>
              <span className="stat-label">Écart-type</span>
              <span className="stat-value">{global.standardDeviation}</span>
            </div>
          </div>
        </section>

        {/* Performance by Course Section */}
        <section className="apropos-section">
          <h2>📚 Performance par cours</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #e6eef8' }}>Cours</th>
                <th style={{ textAlign: 'right', padding: 8, borderBottom: '1px solid #e6eef8' }}>Records</th>
                <th style={{ textAlign: 'right', padding: 8, borderBottom: '1px solid #e6eef8' }}>Average</th>
                <th style={{ textAlign: 'right', padding: 8, borderBottom: '1px solid #e6eef8' }}>Max</th>
                <th style={{ textAlign: 'right', padding: 8, borderBottom: '1px solid #e6eef8' }}>Min</th>
                <th style={{ textAlign: 'right', padding: 8, borderBottom: '1px solid #e6eef8' }}>Median</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(parMatiere).map(([course, { count, moyenne, max, min, median }]) => (
                <tr key={course}>
                  <td style={{ padding: 8, borderBottom: '1px solid #f1f5f9' }}>{course}</td>
                  <td style={{ padding: 8, textAlign: 'right', borderBottom: '1px solid #f1f5f9' }}>{count}</td>
                  <td style={{ padding: 8, textAlign: 'right', borderBottom: '1px solid #f1f5f9' }}>{moyenne}</td>
                  <td style={{ padding: 8, textAlign: 'right', borderBottom: '1px solid #f1f5f9' }}>{max}</td>
                  <td style={{ padding: 8, textAlign: 'right', borderBottom: '1px solid #f1f5f9' }}>{min}</td>
                  <td style={{ padding: 8, textAlign: 'right', borderBottom: '1px solid #f1f5f9' }}>{median}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Contact Section */}
        <section className="apropos-section contact-section">
          <h2>📞 Contact</h2>
          <div className="contact-info">
            <p><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></p>
            <p><strong>Phone:</strong> <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></p>
            <p><strong>Developer:</strong> <a href={`prog:${programmeur}`}>{programmeur}</a></p>
          </div>
        </section>
      </div>
    </main>
  );
}