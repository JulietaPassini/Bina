import { Appointment } from "../models/appointment.model";

export const validateAppointment = (
  doctor_id: number,
  date: string,
  time: string,
  appointments: Appointment[]
): { valid: boolean; message?: string } => {
  const now = new Date();
  const appointmentDate = new Date(`${date}T${time}`);

  // Verificar que la fecha y hora no sean menores a la fecha y hora actual
  if (appointmentDate < now) {
    return { valid: false, message: "La fecha y hora del turno no pueden ser menores a la actual." };
  }

  // Verificar que la fecha no sea sábado o domingo
  const dayOfWeek = new Date(date).getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return { valid: false, message: "No se pueden agendar turnos los sábados o domingos." };
  }

  // Verificar que no exista ya un turno con la misma fecha y hora
  const conflictingAppointment = appointments.find(
    (appt) => appt.doctor_id === doctor_id && appt.date === date && appt.time === time
  );
  if (conflictingAppointment) {
    return { valid: false, message: "Ya existe un turno para esta fecha y hora." };
  }

  return { valid: true }; // Si pasa todas las validaciones, es válido
};