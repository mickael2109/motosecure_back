import { coordonne } from "../data/coordonne";

function toRad(degree: number): number {
  return (degree * Math.PI) / 180;
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Rayon de la Terre en mètres

  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a = Math.sin(Δφ / 2) ** 2 +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance en mètres
}


export function calculateTotalDistance(coordinates: { lat: number; long: number }[]): number {
  if (coordinates.length < 2) return 0;

  let total = 0;
  for (let i = 0; i < coordinates.length - 1; i++) {
    const start = coordinates[i];
    const end = coordinates[i + 1];

    total += haversineDistance(start.lat, start.long, end.lat, end.long);
    
  }

  return total; // en mètres
}


// Utilisation
const start = coordonne[0];
const end = coordonne[coordonne.length - 1];

export const distanceMeters = haversineDistance(start.lat, start.long, end.lat, end.long);
