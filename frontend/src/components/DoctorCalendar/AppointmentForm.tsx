import { useState } from "react";
import { Doctor } from "../../types";

interface Props {
  doctor: Doctor;
  selectedDate: Date;
  selectedHour: string;
  onConfirm: () => void;
}

const AppointmentForm = ({ doctor, selectedDate, selectedHour, onConfirm }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appointmentId, setAppointmentId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    patient_name: "",
    patient_email: "",
    patient_phone: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validar campos
    if (!formData.patient_name || !formData.patient_email || !formData.patient_phone) {
      setError("Por favor complete todos los campos");
      setLoading(false);
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.patient_email)) {
      setError("Por favor ingrese un email válido");
      setLoading(false);
      return;
    }

    const appointmentData = {
      doctor_id: doctor.id,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedHour,
      ...formData
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        const data = await response.json();
        setAppointmentId(data.id);
        setShowPopup(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al guardar el turno.");
      }
    } catch (err) {
      console.error("Error al realizar el fetch:", err);
      setError("Error al guardar el turno. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    onConfirm();
  };

  return (
    <>
      <form className="appointment-form" onSubmit={handleSubmit}>
        <h3>Confirmar cita</h3>
        <p>
          <strong>Doctor:</strong> {doctor.nombre}
        </p>
        <p>
          <strong>Fecha:</strong> {selectedDate.toISOString().split("T")[0]}
        </p>
        <p>
          <strong>Hora:</strong> {selectedHour}
        </p>

        <div className="form-group">
          <label htmlFor="patient_name">Nombre completo:</label>
          <input
            type="text"
            id="patient_name"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleInputChange}
            required
            placeholder="Ingrese su nombre completo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="patient_email">Email:</label>
          <input
            type="email"
            id="patient_email"
            name="patient_email"
            value={formData.patient_email}
            onChange={handleInputChange}
            required
            placeholder="Ingrese su email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="patient_phone">Teléfono:</label>
          <input
            type="tel"
            id="patient_phone"
            name="patient_phone"
            value={formData.patient_phone}
            onChange={handleInputChange}
            required
            placeholder="Ingrese su teléfono"
          />
        </div>

        <button type="submit" disabled={loading || appointmentId !== null}>
          {loading ? "Guardando..." : "Confirmar"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>

      {showPopup && appointmentId && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>¡Turno Registrado con Éxito!</h3>
            <p>Tu ID de turno es: <strong>{appointmentId}</strong></p>
            <p>Guarda este ID para futuras consultas</p>
            <button className="popup-button" onClick={handleFinish}>
              Volver al Inicio
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentForm;