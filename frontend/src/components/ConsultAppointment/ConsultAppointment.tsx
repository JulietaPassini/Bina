import { useState } from 'react';
import { Appointment } from '../../types';
import './ConsultAppointment.css';

interface AppointmentWithDoctor extends Appointment {
  doctor: {
    id: number;
    nombre: string;
    especialidad: string;
  } | null;
}

const ConsultAppointment = () => {
  const [appointmentId, setAppointmentId] = useState<string>('');
  const [appointment, setAppointment] = useState<AppointmentWithDoctor | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [availableIds, setAvailableIds] = useState<string[]>([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAppointment(null);
    setSuccessMessage(null);
    setAvailableIds([]);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/appointments/${appointmentId}`);
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 404) {
          setError(`No se encontró ningún turno con el ID ${appointmentId}`);
          if (data.availableIds) {
            setAvailableIds(data.availableIds);
          }
        } else {
          setError('Error al buscar el turno');
        }
        return;
      }

      setAppointment(data);
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!appointment) return;
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (!appointment) return;

    setDeleting(true);
    setError(null);
    setSuccessMessage(null);
    setShowDeletePopup(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/appointments/${appointment.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el turno');
      }

      setSuccessMessage('Turno eliminado exitosamente');
      setAppointment(null);
      setAppointmentId('');
    } catch (err) {
      setError('Error al eliminar el turno');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="consult-appointment">
      <h2>Consultar Turno</h2>
      <form onSubmit={handleSearch} className="search-form">
        <div className="input-group">
          <input
            type="text"
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
            placeholder="Ingrese el ID del turno"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </form>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          {availableIds.length > 0 && (
            <div>
              <p>IDs de turnos disponibles:</p>
              <ul>
                {availableIds.map(id => (
                  <li key={id}>{id}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {appointment && (
        <div className="appointment-details">
          <h3>Detalles del Turno</h3>
          <div className="detail-item">
            <span className="label">ID:</span>
            <span className="value">{appointment.id}</span>
          </div>
          <div className="detail-item">
            <span className="label">Fecha:</span>
            <span className="value">{appointment.date}</span>
          </div>
          <div className="detail-item">
            <span className="label">Hora:</span>
            <span className="value">{appointment.time}</span>
          </div>
          <div className="detail-item">
            <span className="label">Doctor:</span>
            <span className="value">
              {appointment.doctor ? `${appointment.doctor.nombre} - ${appointment.doctor.especialidad}` : 'Doctor no encontrado'}
            </span>
          </div>
          <div className="detail-item">
            <span className="label">Nombre del Paciente:</span>
            <span className="value">{appointment.patient_name}</span>
          </div>
          <div className="detail-item">
            <span className="label">Email del Paciente:</span>
            <span className="value">{appointment.patient_email}</span>
          </div>
          <div className="detail-item">
            <span className="label">Teléfono del Paciente:</span>
            <span className="value">{appointment.patient_phone}</span>
          </div>
          <button 
            className="delete-button"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Eliminando...' : 'Eliminar Turno'}
          </button>
        </div>
      )}

      {showDeletePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Confirmar Eliminación</h3>
            <p>¿Está seguro que desea eliminar este turno?</p>
            <div className="popup-buttons">
              <button className="popup-button cancel" onClick={() => setShowDeletePopup(false)}>
                Cancelar
              </button>
              <button className="popup-button confirm" onClick={confirmDelete}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultAppointment; 