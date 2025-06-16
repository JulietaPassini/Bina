import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Banner.css';

interface BannerProps {
  onRegisterClick: () => void;
  onDeleteClick: () => void;
  isRegisterSelected: boolean;
}

const Banner: React.FC<BannerProps> = ({ onRegisterClick, onDeleteClick, isRegisterSelected }) => {
  return (
    <div className="banner">
      <TransitionGroup>
        <CSSTransition
          key={isRegisterSelected ? 'register' : 'delete'}
          timeout={500}
          classNames="section-transition"
        >
          <div className="banner-content">
            <h1>Bienvenido a Nuestra Clínica</h1>
            <p>Gestiona tus turnos médicos de manera rápida y sencilla</p>
            <div className="banner-actions">
              <button
                className={`banner-button ${isRegisterSelected ? 'selected' : ''}`}
                onClick={onRegisterClick}
              >
                <span className="button-icon">📅</span>
                Registrar Turno
              </button>
              <button
                className={`banner-button ${!isRegisterSelected ? 'selected' : ''}`}
                onClick={onDeleteClick}
              >
                <span className="button-icon">🔍</span>
                Consultar Turno
              </button>
            </div>
          </div>
        </CSSTransition>
      </TransitionGroup>
      <div className="banner-decoration">
        <div className="decoration-circle"></div>
        <div className="decoration-circle"></div>
        <div className="decoration-circle"></div>
      </div>
    </div>
  );
};

export default Banner; 