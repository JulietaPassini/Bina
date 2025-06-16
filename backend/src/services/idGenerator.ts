export const generateShortId = (): string => {
  return Math.random().toString(36).substr(2, 8); // Genera un ID de 8 caracteres
};