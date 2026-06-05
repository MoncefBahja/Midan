import { User, Terrain, Slot, Booking, Role, BookingStatus } from "@/types/booking";

// 1. Mock Users
export const MOCK_USERS: Record<string, User> = {
  owner1: { id: 1, fullName: "Moncef", phone: "0612345678", email: "moncef@saas.com", role: Role.OWNER },
  customer1: { id: 2, fullName: "Amine", phone: "0687654321", email: "amine@mail.com", role: Role.CUSTOMER },
  customer2: { id: 3, fullName: "Karim", phone: "0698765432", email: "karim@mail.com", role: Role.CUSTOMER },
  customer3: { id: 3, fullName: "nada", phone: "0687654321", email: "karim@mail.com", role: Role.CUSTOMER },
  customer4: { id: 3, fullName: "salm", phone: "06E8765431", email: "karim@mail.com", role: Role.CUSTOMER }

};

// 2. Mock Slots
export const MOCK_SLOTS: Slot[] = [
  { id: 1, startTime: "17:00", endTime: "18:00" },
  { id: 2, startTime: "18:00", endTime: "19:00" },
  { id: 3, startTime: "19:00", endTime: "20:00" },
  { id: 4, startTime: "20:00", endTime: "21:00" },
  { id: 5, startTime: "21:00", endTime: "22:00" },
  { id: 6, startTime: "22:00", endTime: "23:00" },
  { id: 7, startTime: "23:00", endTime: "24:00" },
    { id: 8, startTime: "12:00", endTime: "13:00" },

]

// 3. Mock Terrains
export const MOCK_TERRAINS: Terrain[] = [
  {
    id: 1,
    name: "Stade Plein Air - Maracana",
    city: "Rabat",
    pricePerHour: 300,
    imageUrl: "https://img.freepik.com/photos-gratuite/stade-piste_1417-1664.jpg?semt=ais_hybrid&w=740&q=80",
    locationUrl: "https://maps.google.com",
    owner: MOCK_USERS.owner1,
    slots: MOCK_SLOTS
  },
  {
    id: 2,
    name: "Complexe Foot Indoor",
    city: "Casablanca",
    pricePerHour: 450,
    imageUrl: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600",
    locationUrl: "https://maps.google.com",
    owner: MOCK_USERS.owner1,
    slots: MOCK_SLOTS.slice(1, 3) // 3ndha ghir 2 slots
  },
  {
    id:3,
    name: "Complexe Foot Indoor",
    city: "Tanger",
    pricePerHour: 450,
    imageUrl: "https://media.istockphoto.com/id/1403780865/fr/photo/terrain-de-football-au-coucher-du-soleil.jpg?s=612x612&w=0&k=20&c=wRi6Je-hFt1ndNGK7VtCtuzJgRVh3jV22M5U9x2x3CU=",
    locationUrl: "https://maps.google.com",
    owner: MOCK_USERS.owner1,
    slots: MOCK_SLOTS.slice(1, 3) // 3ndha ghir 2 slots
  },
  {
    id: 4,
    name: "Complexe Foot Indoor",
    city: "Casablanca",
    pricePerHour: 450,
    imageUrl: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600",
    locationUrl: "https://maps.google.com",
    owner: MOCK_USERS.owner1,
    slots: MOCK_SLOTS.slice(1, 3) // 3ndha ghir 2 slots
  },
  {
    id: 5,
    name: "Complexe Foot Indoor",
    city: "Casablanca",
    pricePerHour: 450,
    imageUrl: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600",
    locationUrl: "https://maps.google.com",
    owner: MOCK_USERS.owner1,
    slots: MOCK_SLOTS.slice(1, 3) // 3ndha ghir 2 slots
  },
  {
    id: 6,
    name: "Complexe Foot Indoor",
    city: "Casablanca",
    pricePerHour: 450,
    imageUrl: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600",
    locationUrl: "https://maps.google.com",
    owner: MOCK_USERS.owner1,
    slots: MOCK_SLOTS.slice(1, 3) // 3ndha ghir 2 slots
  },
  {
    id: 7,
    name: "Complexe Foot Indoor",
    city: "Casablanca",
    pricePerHour: 450,
    imageUrl: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600",
    locationUrl: "https://maps.google.com",
    owner: MOCK_USERS.owner1,
    slots: MOCK_SLOTS.slice(1, 3) // 3ndha ghir 2 slots
  },
  {
    id: 8,
    name: "Complexe Foot Indoor",
    city: "Casablanca",
    pricePerHour: 450,
    imageUrl: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600",
    locationUrl: "https://maps.google.com",
    owner: MOCK_USERS.owner1,
    slots: MOCK_SLOTS.slice(1, 3) // 3ndha ghir 2 slots
  },
  {
    id: 9,
    name: "Complexe Foot Indoor",
    city: "Casablanca",
    pricePerHour: 450,
    imageUrl: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600",
    locationUrl: "https://maps.google.com",
    owner: MOCK_USERS.owner1,
    slots: MOCK_SLOTS.slice(1, 3) // 3ndha ghir 2 slots
  },
  {
    id: 10,
    name: "Complexe Foot Indoor",
    city: "Casablanca",
    pricePerHour: 450,
    imageUrl: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600",
    locationUrl: "https://maps.google.com",
    owner: MOCK_USERS.owner1,
    slots: MOCK_SLOTS.slice(1, 3) // 3ndha ghir 2 slots
  },{
    id: 11,
    name: "Complexe Foot Indoor",
    city: "Casablanca",
    pricePerHour: 450,
    imageUrl: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600",
    locationUrl: "https://maps.google.com",
    owner: MOCK_USERS.owner1,
    slots: MOCK_SLOTS.slice(1, 3) // 3ndha ghir 2 slots
  }

];

// 4. Mock Bookings
export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 1,
    qrCodeUuid: "d3b07384-d113-4ec4-a556-e7e0e7a499a2",
    bookingDate: "2026-06-05",
    status: BookingStatus.CONFIRMED,
    customer: MOCK_USERS.customer1,
    terrain: MOCK_TERRAINS[0],
    slot: MOCK_SLOTS[1], // 18:00 -> 19:00
    totalPrice: 300
  }
  
];
