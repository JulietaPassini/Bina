import './Contacto.css';

const Contacto = () => {
  return (
    <div className="contacto-container">
      <div className="contacto-info">
        <h1>Contacto</h1>
        <p>Estamos aquí para ayudarte. No dudes en contactarnos.</p>
        
        <div className="info-items">
          <div className="info-item">
            <span className="icon">📍</span>
            <div>
              <h3>Dirección</h3>
              <p>Av. Principal 123, Ciudad</p>
            </div>
          </div>
          
          <div className="info-item">
            <span className="icon">📞</span>
            <div>
              <h3>Teléfono</h3>
              <p>+54 123 456 7890</p>
            </div>
          </div>
          
          <div className="info-item">
            <span className="icon">✉️</span>
            <div>
              <h3>Email</h3>
              <p>contacto@consultorio.com</p>
            </div>
          </div>
          
          <div className="info-item">
            <span className="icon">⏰</span>
            <div>
              <h3>Horario de Atención</h3>
              <p>Lunes a Viernes: 9:00 - 16:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto; 