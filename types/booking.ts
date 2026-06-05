export enum Role {
  ADMIN = "ADMIN",
  OWNER = "OWNER",
  CUSTOMER = "CUSTOMER"
}

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED"
}

export interface User {
  id: number;
  phone: string;
  fullName: string;
  email?: string;
  role: Role;
  terrains?: Terrain[];
}

export interface Terrain {
  id: number;
  name: string;
  city: string;
  locationUrl?: string;
  imageUrl?: string;
  pricePerHour: number;
  owner?: User;
  slots?: Slot[];
}

export interface Slot {
  id: number;
  startTime: string; // Formated b7al "18:00"
  endTime: string;   // Formated b7al "19:00"
  terrain?: Terrain;
}

export interface Booking {
  id: number;
  qrCodeUuid: string; // Ghadi nkhdmo bih f Next.js l QR Code
  bookingDate: string; // Formated b7al "2026-06-04"
  status: BookingStatus;
  customer: User;
  slot: Slot;
  terrain: Terrain;
  totalPrice: number;
}