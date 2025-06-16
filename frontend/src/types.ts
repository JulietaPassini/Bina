export interface Doctor {
    id: number;
    nombre: string;
    especialidad: string;
    imagen: string;
    descripcion: string;
  }
  
  export interface Appointment {
    id: number;
    date: string;
    time: string;
    doctor_id: number;
    patient_name?: string;
    patient_email?: string;
    patient_phone?: string;
  }