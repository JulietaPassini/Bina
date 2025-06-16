import React, { useState } from 'react';
import './Navigation.css';

type ViewType = "home" | "doctors" | "calendar" | "hours" | "form" | "delete" | "contacto";

interface NavigationProps {
  onRegisterClick: () => void;
  onDeleteClick: () => void;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  onRegisterClick,
  onDeleteClick,
  currentView,
  onNavigate
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <div className="nav-brand">
          <img 
            src="/logo.svg" 
            alt="Logo" 
            className="nav-logo" 
            onClick={() => onNavigate('home')} 
          />
          <span className="nav-brand-text">Clínica Médica <strong>BIHNA</strong></span>
        </div>

        <button 
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`menu-icon ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <button
            className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => {
              onNavigate('home');
              setIsMenuOpen(false);
            }}
          >
            Inicio
          </button>
          <button
            className={`nav-link ${['doctors', 'calendar', 'hours', 'form'].includes(currentView) ? 'active' : ''}`}
            onClick={() => {
              onRegisterClick();
              setIsMenuOpen(false);
            }}
          >
            Registrar Turno
          </button>
          <button
            className={`nav-link ${currentView === 'delete' ? 'active' : ''}`}
            onClick={() => {
              onDeleteClick();
              setIsMenuOpen(false);
            }}
          >
            Consultar Turno
          </button>
          <button
            className={`nav-link ${currentView === 'contacto' ? 'active' : ''}`}
            onClick={() => {
              onNavigate('contacto');
              setIsMenuOpen(false);
            }}
          >
            Contacto
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 