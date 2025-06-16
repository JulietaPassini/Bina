const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const noticias = [
  {
    id: 1,
    titulo: "Novedades en Tecnología",
    imagen: "https://via.placeholder.com/300",
    descripcion: "Descubre las últimas tendencias en tecnología este 2025.",
  },
  {
    id: 2,
    titulo: "Deportes Hoy",
    imagen: "https://via.placeholder.com/300",
    descripcion: "Resultados de los partidos más importantes de la semana.",
  },
  {
    id: 3,
    titulo: "Ciencia y Descubrimientos",
    imagen: "https://via.placeholder.com/300",
    descripcion: "Un nuevo hallazgo promete cambiar el mundo.",
  }
];

app.get('/api/noticias', (req, res) => {
  res.json(noticias);
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
