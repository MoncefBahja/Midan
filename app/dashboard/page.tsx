"use client";

import { useState } from "react";
import Link from "next/link";
import TerrainForm from "./components/TerrainForm";
import BookingList from "./components/BookingList";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"bookings" | "add-terrain">("bookings");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 antialiased">
      {/* Header */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition">
              ← Retour au site
            </Link>
            <span className="text-slate-300">|</span>
            <h1 className="text-base font-black text-slate-900 tracking-tight">Console d'Administration</h1>
          </div>
          
          {/* Menu de navigation des onglets */}
          <div className="flex gap-2 border-slate-200">
            <button 
              onClick={() => setActiveTab("bookings")}
              className={`text-xs font-bold px-3 py-2 rounded-xl transition ${
                activeTab === "bookings" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              📊 Réservations
            </button>
            <button 
              onClick={() => setActiveTab("add-terrain")}
              className={`text-xs font-bold px-3 py-2 rounded-xl transition ${
                activeTab === "add-terrain" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              ➕ Ajouter un terrain
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 sm:p-8">
        
        {activeTab === "bookings" ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Tableau des Réservations Clients</h2>
              <p className="text-sm text-slate-500 mt-0.5">Suivez l'état de remplissage de vos complexes sportifs en temps réel.</p>
            </div>
            <BookingList />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Ajouter un nouveau terrain</h2>
              <p className="text-sm text-slate-500 mt-0.5">Créez un complexe et assignez-lui ses plages horaires de disponibilité.</p>
            </div>
            <TerrainForm />
          </div>
        )}

      </main>
    </div>
  );
}