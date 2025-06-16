import { useEffect, useState } from "react";
import { Doctor } from "./types";

interface DoctorsProps {
  onDoctorSelect: (doctor: Doctor) => void;
}

function Doctors({ onDoctorSelect }: DoctorsProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/doctors`)
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error al obtener doctores:", error));
  }, []);

  return (
    <div className="doctors-container">
      <h1>Doctores Disponibles</h1>
      <div className="doctors-grid">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="doctor-card"
            onClick={() => onDoctorSelect(doctor)} 
          >
            <img src={doctor.imagen} alt={doctor.nombre} />
            <h2>{doctor.nombre}</h2>
            <p>{doctor.especialidad}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctors;