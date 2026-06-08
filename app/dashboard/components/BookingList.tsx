"use client";

import { useState, useEffect } from "react";
import { Booking, BookingStatus, Role } from "@/types/booking";

export default function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  useEffect(() => {
    async function loadBookings() {
      try {
        const mockBookings: Booking[] = [
          {
            id: 1,
            qrCodeUuid: "BK-XYZ89762",
            bookingDate: "2026-06-05",
            status: BookingStatus.CONFIRMED,
            totalPrice: 350,
            customer: {
              id: 101,
              fullName: "Youssef El Alami",
              phone: "+212 661-234567",
              role: Role.CUSTOMER
            },
            slot: { id: 50, startTime: "19:00", endTime: "20:30" },
            terrain: { id: 1, name: "Terrain Annexe A (Foot 5)", city: "Casablanca", pricePerHour: 350 }
          },
          {
            id: 2,
            qrCodeUuid: "BK-ABC12345",
            bookingDate: "2026-06-06",
            status: BookingStatus.PENDING,
            totalPrice: 400,
            customer: {
              id: 102,
              fullName: "Amine Bouaza",
              phone: "+212 663-987654",
              role: Role.CUSTOMER
            },
            slot: { id: 51, startTime: "21:00", endTime: "22:30" },
            terrain: { id: 2, name: "Grand Terrain Wembley", city: "Rabat", pricePerHour: 400 }
          },
          {
            id: 3,
            qrCodeUuid: "BK-LMN45678",
            bookingDate: "2026-06-04",
            status: BookingStatus.CANCELLED,
            totalPrice: 300,
            customer: {
              id: 103,
              fullName: "Karim Benjelloun",
              phone: "+212 665-112233",
              role: Role.CUSTOMER
            },
            slot: { id: 52, startTime: "17:00", endTime: "18:00" },
            terrain: { id: 1, name: "Terrain Annexe A (Foot 5)", city: "Casablanca", pricePerHour: 350 }
          }
        ];

        setBookings(mockBookings);
      } catch (error) {
        console.error("Erreur lors du chargement des réservations", error);
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus === "ALL") return true;
    return b.status === filterStatus;
  });

  const totalRevenue = bookings
    .filter(b => b.status === BookingStatus.CONFIRMED)
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CONFIRMED:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Confirmé</span>;
      case BookingStatus.PENDING:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">En attente</span>;
      case BookingStatus.CANCELLED:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">Annulé</span>;
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-slate-400 font-medium animate-pulse">Chargement du tableau de bord...</div>;
  }

  return (
    <div className="space-y-6 px-1 sm:px-0">
      
      {/* 📊 STATS CARDS - Grid Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Revenus Confirmés</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{totalRevenue} DH</div>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Réservations</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{bookings.length}</div>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Taux d'annulation</span>
          <div className="text-2xl font-black text-rose-600 mt-1">
            {bookings.length > 0 ? Math.round((bookings.filter(b => b.status === BookingStatus.CANCELLED).length / bookings.length) * 100) : 0}%
          </div>
        </div>
      </div>

      {/* 🛠️ NAVIGATION DES FILTRES - Aligné verticalement sur Mobile */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">📋 Matchs réservés</h3>
        {/* Scroll horizontal fluide si l'écran mobile est trop petit */}
        <div className="w-full sm:w-auto overflow-x-auto no-scrollbar flex justify-start sm:justify-end">
          <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold min-w-max">
            {["ALL", "CONFIRMED", "PENDING", "CANCELLED"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-2 rounded-lg transition-all ${
                  filterStatus === status 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {status === "ALL" ? "Tous" : status === "CONFIRMED" ? "Confirmés" : status === "PENDING" ? "En attente" : "Annulés"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENEUR PRINCIPAL */}
      <div className="bg-white sm:border sm:border-slate-200 sm:rounded-2xl sm:shadow-sm overflow-hidden">
        
        {/* 📱 VUE MOBILE (Cartes empilées) - Affiché uniquement sur Mobile */}
        <div className="block md:hidden space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-10 bg-white border border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm">
              Aucune réservation trouvée.
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-black text-slate-950 block">#{booking.id}</span>
                    <span className="text-[10px] font-mono text-slate-400 block tracking-tight">{booking.qrCodeUuid}</span>
                  </div>
                  <div>{getStatusBadge(booking.status)}</div>
                </div>

                <div className="border-t border-b border-slate-100 py-2.5 space-y-1">
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Complexe & Client</div>
                  <div className="text-sm font-extrabold text-slate-900">{booking.terrain.name}</div>
                  <div className="text-xs text-slate-500">📍 {booking.terrain.city}</div>
                  <div className="text-xs text-slate-700 font-medium pt-1">👤 {booking.customer.fullName} ({booking.customer.phone})</div>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Date & Heure</span>
                    <span className="text-xs font-bold text-slate-900">{booking.bookingDate}</span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 ml-2 px-1.5 py-0.5 rounded">
                      {booking.slot.startTime} - {booking.slot.endTime}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-medium">Montant</span>
                    <span className="text-base font-black text-slate-950">{booking.totalPrice} DH</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 💻 VUE TABLETTE & DESKTOP (Tableau classique) - Masqué sur Mobile */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6">ID / Référence</th>
                <th className="py-4 px-6">Client</th>
                <th className="py-4 px-6">Terrain & Ville</th>
                <th className="py-4 px-6">Date & Horaire</th>
                <th className="py-4 px-6 text-right">Montant</th>
                <th className="py-4 px-6 text-center">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400 font-medium">
                    Aucune réservation trouvée pour ce filtre.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">#{booking.id}</div>
                      <div className="text-[11px] font-mono text-slate-400 tracking-tight mt-0.5">{booking.qrCodeUuid}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">{booking.customer.fullName}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{booking.customer.phone}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-800">{booking.terrain.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">📍 {booking.terrain.city}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-slate-900 font-semibold">{booking.bookingDate}</div>
                      <div className="text-xs text-emerald-600 font-bold bg-emerald-50 inline-block px-2 py-0.5 rounded-md mt-1">
                        ⏰ {booking.slot.startTime} - {booking.slot.endTime}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right font-black text-slate-900">
                      {booking.totalPrice} DH
                    </td>
                    <td className="py-4 px-6 text-center">
                      {getStatusBadge(booking.status)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}