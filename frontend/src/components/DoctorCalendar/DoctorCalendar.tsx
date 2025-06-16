import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { Doctor, Appointment } from "../../types";
import { WORKING_HOURS } from "../../constants";
import { CSSTransition } from "react-transition-group";
import "./DCalendar.css";

interface DoctorCalendarProps {
  doctor: Doctor;
  onDateSelect: (date: Date) => void;
}

function DoctorCalendar({ doctor, onDateSelect }: DoctorCalendarProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/appointments/doctor/${doctor.id}`);
        if (!response.ok) {
          throw new Error("Error al cargar las citas");
        }
        const data = await response.json();
        setAppointments(data);
        setShowAnimation(true);
      } catch (error) {
        console.error("Error al obtener citas:", error);
        setError("No se pudieron cargar las citas. Por favor, intente más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctor.id]);

  const isDateDisabled = (date: Date): boolean => {
    const formattedDate = date.toISOString().split("T")[0];
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const dayOfWeek = date.getDay(); 

    // Deshabilitar sábados (6) y domingos (0)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return true;
    }

    // Deshabilitar días pasados
    if (formattedDate < today) {
      return true;
    }

    // Si es el día actual, verificar si todas las horas ya pasaron
    if (formattedDate === today) {
      const lastWorkingHour = WORKING_HOURS[WORKING_HOURS.length - 1];
      const [lastHourStr, lastMinuteStr] = lastWorkingHour.split(":");
      const lastHour = parseInt(lastHourStr);
      const lastMinute = parseInt(lastMinuteStr);
      const isPM = lastWorkingHour.includes("PM");
      const lastHour24 = isPM && lastHour !== 12 ? lastHour + 12 : lastHour;

      if (currentHour > lastHour24 || (currentHour === lastHour24 && currentMinutes >= lastMinute)) {
        return true;
      }
    }

    // Verificar si todas las horas están ocupadas para este día
    const dayAppointments = appointments.filter(appt => appt.date === formattedDate);
    const occupiedHours = dayAppointments.map(appt => appt.time);
    const allHoursOccupied = WORKING_HOURS.every(hour => occupiedHours.includes(hour));

    return allHoursOccupied;
  };

  

  const tileContent = () => {
    return <div className="tile-content"></div>;
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="calendar-section">
      <h2>Calendario para {doctor.nombre}</h2>
      {loading ? (
        <div className="loading-spinner">Cargando calendario...</div>
      ) : (
        <CSSTransition
          in={showAnimation}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <div className="calendar-container">
            <Calendar
              onChange={(value) => {
                if (value instanceof Date) {
                  setSelectedDate(value);
                  onDateSelect(value);
                }
              }}
              value={selectedDate}
              tileDisabled={({ date }) => isDateDisabled(date)}
              tileContent={tileContent}
              minDate={new Date()}
              className="custom-calendar"
              nextLabel="→"
              prevLabel="←"
              next2Label={null}
              prev2Label={null}
            />
          </div>
        </CSSTransition>
      )}
    </div>
  );
}

export default DoctorCalendar;