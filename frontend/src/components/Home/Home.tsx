import React from 'react';
import './Home.css';

interface HomeProps {
  onRegisterClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onRegisterClick }) => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenido a Nuestro Consultorio</h1>
          <p>Profesionales especializados con gran calidez humana</p>
          <button className="button-primary" onClick={onRegisterClick}>
            Sacar Turno
          </button>
        </div>
      </section>

      <section className="services-section">
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <h3 className="service-title">Atención Personalizada</h3>
            <p className="service-description">
              Cuidamos tu salud con un enfoque personalizado y dedicado a tus necesidades específicas
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
                <path d="M8 14h.01"/>
                <path d="M12 14h.01"/>
                <path d="M16 14h.01"/>
                <path d="M8 18h.01"/>
                <path d="M12 18h.01"/>
                <path d="M16 18h.01"/>
              </svg>
            </div>
            <h3 className="service-title">Turnos Online</h3>
            <p className="service-description">
              Sistema de reservas simple y eficiente disponible las 24 horas
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7h6V5a3 3 0 0 0-3-3z"/>
                <path d="M19 9h-1v3h1a3 3 0 1 0 0-6h-1v3z"/>
                <path d="M5 9h1v3H5a3 3 0 1 1 0-6h1v3z"/>
                <path d="M8 21h8"/>
                <path d="M12 17v4"/>
              </svg>
            </div>
            <h3 className="service-title">Especialidades Médicas</h3>
            <p className="service-description">
              Equipo multidisciplinario de especialistas para un cuidado integral
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>¿Necesitas un Turno?</h2>
          <p>Agenda tu consulta ahora mismo con nuestros profesionales</p>
          <button className="button-primary" onClick={onRegisterClick}>
            Reservar Consulta
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home; 