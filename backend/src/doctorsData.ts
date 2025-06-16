// src/data/doctorsData.ts

type Doctor =  {
    id: number;
    nombre: string;
    especialidad: string;
    imagen: string;
    descripcion: string;
  }
  
const doctorsData: Doctor[] = [
    {
      id: 1,
      nombre: "Dra. Sofía Martínez",
      especialidad: "Dermatología",
      imagen: "https://media.istockphoto.com/id/2074983548/vector/default-placeholder-doctor-portrait-photo-avatar-on-gray-background-greyscale-female.jpg?s=612x612&w=0&k=20&c=kRx9BZpeg3WruAKBRDfBrd03P6sWyLW2PzLRUaQnueE=",
      descripcion: "Especialista en cuidado de la piel con más de 10 años de experiencia en tratamientos estéticos y dermatológicos."
    },
    {
      id: 2,
      nombre: "Dr. Nicolás Pereyra",
      especialidad: "Cirugía Plástica",
      imagen: "https://www.shutterstock.com/image-vector/default-placeholder-doctor-halflength-portrait-600nw-1058724875.jpg",
      descripcion: "Reconocido cirujano plástico con enfoque en procedimientos mínimamente invasivos y naturales."
    },
    {
      id: 3,
      nombre: "Dra. Valentina Ruiz",
      especialidad: "Medicina Estética",
      imagen: "https://media.istockphoto.com/id/986667870/vector/default-placeholder-doctor-half-length-portrait.jpg?s=612x612&w=0&k=20&c=nVV9gbYeFJWfFu7RBPyARSicOorNmI9sahp-owIou_M=",
      descripcion: "Experta en tratamientos faciales y corporales personalizados, buscando siempre realzar la belleza natural del paciente."
    },
    {
      id: 4,
      nombre: "Dr. Tomás Aguirre",
      especialidad: "Nutrición y Bienestar",
      imagen: "https://st3.depositphotos.com/9998432/19176/v/450/depositphotos_191768074-stock-illustration-default-placeholder-doctor-half-length.jpg",
      descripcion: "Médico nutricionista con un enfoque integral en salud, estética y bienestar general."
    },
    {
      id: 5,
      nombre: "Dra. Camila Torres",
      especialidad: "Cosmetología Médica",
      imagen: "https://img.freepik.com/premium-vector/default-placeholder-doctor-portrait-photo-avatar-gray-background-greyscale_885953-619.jpg",
      descripcion: "Especializada en técnicas de rejuvenecimiento facial no invasivas y en el cuidado avanzado de la piel."
    }
  ]

  export default doctorsData
  