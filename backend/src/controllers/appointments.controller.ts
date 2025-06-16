import { Request, Response, NextFunction } from "express";
import { Appointment } from "../models/appointment.model";
import doctorsData from "../doctorsData";
import { generateShortId } from "../services/idGenerator"; // Importa la función desde el servicio
import { validateAppointment } from "../services/appointmentValidator";

export let appointments: Appointment[] = [];

export const getAll = async (req: Request, res: Response) => {
  res.json(appointments);
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { doctor_id, date, time, patient_name, patient_email, patient_phone } = req.body;

    // Validar campos requeridos
    if (!doctor_id || !date || !time || !patient_name || !patient_email || !patient_phone) {
      res.status(400).json({
        message: "Todos los campos son requeridos",
        missingFields: {
          doctor_id: !doctor_id,
          date: !date,
          time: !time,
          patient_name: !patient_name,
          patient_email: !patient_email,
          patient_phone: !patient_phone,
        },
      });
      return;
    }

    // Validar la fecha y hora del turno
    const validation = validateAppointment(doctor_id, date, time, appointments);
    if (!validation.valid) {
      res.status(400).json({ message: validation.message });
      return;
    }

    // Generar un ID único usando generateShortId
    const newAppointment: Appointment = {
      id: generateShortId(),
      doctor_id,
      date,
      time,
      patient_name,
      patient_email,
      patient_phone,
    };

    appointments.push(newAppointment);
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error("Error al crear la cita:", error);
    res.status(500).json({ message: "Error al crear la cita" });
  }
};

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id; 
    const updatedData = req.body;

    const appointmentIndex = appointments.findIndex(a => a.id === id);

    if (appointmentIndex === -1) {
      res.status(404).json({ message: "Cita no encontrada" });
      return;
    }

    appointments[appointmentIndex] = {
      ...appointments[appointmentIndex],
      ...updatedData
    };

    res.status(200).json(appointments[appointmentIndex]);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response) => { // Falta chequear
  const id = req.params.id; 
  appointments = appointments.filter(a => a.id !== id);
  res.status(204).send();
};

export const getDoctorAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctorId = parseInt(req.params.doctorId);
    const doctorAppointments = appointments
      .filter(appointment => appointment.doctor_id === doctorId)
      .map(({ id, date, time, doctor_id }) => ({
        id,
        date,
        time,
        doctor_id
      }));
    
    res.json(doctorAppointments);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las citas del doctor" });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Buscar el turno directamente
    const appointment = appointments.find(a => a.id === id);
    
    if (!appointment) {
      res.status(404).json({ 
        message: "Turno no encontrado",
        id: id
      });
      return;
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error en getById:', error);
    res.status(500).json({ 
      message: "Error al obtener el turno",
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const getAppointmentWithDoctor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Buscar el turno
    const appointment = appointments.find(a => a.id === id);
    
    if (!appointment) {
      res.status(404).json({ 
        message: "Turno no encontrado",
        id: id
      });
      return;
    }

    // Buscar la información del doctor
    const doctor = doctorsData.find(d => d.id === appointment.doctor_id);
    
    // Crear un objeto con la información del turno y el doctor
    const appointmentWithDoctor = {
      ...appointment,
      doctor: doctor ? {
        id: doctor.id,
        nombre: doctor.nombre,
        especialidad: doctor.especialidad
      } : null
    };

    res.status(200).json(appointmentWithDoctor);
  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener el turno con información del doctor",
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};


