import { MOCK_TERRAINS, MOCK_BOOKINGS } from "@/data/mock-booking";
import { Terrain, Booking } from "@/types/booking";

// Zib ga3 l-mلاعب
export async function getTerrains(): Promise<Terrain[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_TERRAINS), 400);
  });
}

// Zib mla3b b l-ID dialo (bach nchofo les slots dialo)
export async function getTerrainById(id: number): Promise<Terrain | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const terrain = MOCK_TERRAINS.find((t) => t.id === id);
      resolve(terrain);
    }, 300);
  });
}

// Zib l-Réservations dial wahed l-Customer (Pour l'affichage dyal QR Codes)
export async function getCustomerBookings(customerId: number): Promise<Booking[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const bookings = MOCK_BOOKINGS.filter((b) => b.customer.id === customerId);
      resolve(bookings);
    }, 500);
  });
}