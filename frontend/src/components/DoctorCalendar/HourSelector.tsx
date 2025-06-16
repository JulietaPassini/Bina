import { useEffect, useState } from "react";
import { Appointment, Doctor } from "../../types";
import { WORKING_HOURS } from "../../constants";

interface Props {
  selectedDate: Date;
  selectedHour: string | null;
  setSelectedHour: (hour: string) => void;
  doctor: Doctor;
}

const HourSelector = ({ selectedDate, selectedHour, setSelectedHour, doctor }: Props) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/appointments/doctor/${doctor.id}`);
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          console.error("Error al obtener los turnos");
        }
      } catch (error) {
        console.error("Error al realizar el fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctor.id]);

  const isHourDisabled = (hour: string): boolean => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    // Verificar si la fecha es anterior a hoy
    if (formattedDate < today) {
      return true;
    }

    // Verificar si la hora ya pasó en el día actual
    if (formattedDate === today) {
      const [hourPart, minutePart] = hour.split(":");
      const hour24 = hour.includes("PM") && hourPart !== "12" ? parseInt(hourPart) + 12 : parseInt(hourPart);
      const selectedTime = hour24 * 60 + parseInt(minutePart);
      const currentTime = now.getHours() * 60 + now.getMinutes();

      if (selectedTime <= currentTime) {
        return true;
      }
    }

    // Verificar si la hora está ocupada
    return appointments.some(
      (appt) => appt.doctor_id === doctor.id && appt.date === formattedDate && appt.time === hour
    );
  };

  const getHourClassName = (hour: string): string => {
    const baseClass = "hour-item";
    const isDisabled = isHourDisabled(hour);
    const isSelected = selectedHour === hour;

    if (isDisabled) {
      return `${baseClass} disabled`;
    }
    if (isSelected) {
      return `${baseClass} selected`;
    }
    return baseClass;
  };

  if (loading) {
    return <p>Cargando horas disponibles...</p>;
  }

  return (
    <div className="hour-selector">
      <h3>Horas disponibles</h3>
      <ul className="hour-list">
        {WORKING_HOURS.map((hour) => (
          <li
            key={hour}
            className={getHourClassName(hour)}
            onClick={() => !isHourDisabled(hour) && setSelectedHour(hour)}
          >
            {hour}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HourSelector;