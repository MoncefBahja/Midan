"use client";

import { useState } from "react";
import Link from "next/link";
import TerrainForm from "./components/TerrainForm";
import BookingList from "./components/BookingList";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"bookings" | "add-terrain">("bookings");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 antialiased">
      
      {/* 📱 En-tête Adaptatif (Hauteur automatique sur Mobile, Fixe sur PC) */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-sm shadow-slate-100/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-0 sm:h-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          
          {/* Logo, Titre & Retour */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-start border-b border-slate-100 pb-2 sm:pb-0 sm:border-none">
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/" className="text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-800 transition whitespace-nowrap">
                ← <span className="hidden xs:inline">Retour</span>
              </Link>
              <span className="text-slate-300 text-xs sm:text-sm">|</span>
              <h1 className="text-xs sm:text-base font-black text-slate-900 tracking-tight truncate max-w-[180px] xs:max-w-none">
                Console Admin
              </h1>
            </div>
          </div>
          
          {/* 🛠️ Sélecteur d'onglets (Pleine largeur sur mobile pour un meilleur confort tactile) */}
          <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl w-full sm:w-auto text-center">
            <button 
              onClick={() => setActiveTab("bookings")}
              className={`text-xs font-bold px-3 py-2.5 sm:py-2 rounded-lg transition-all flex-1 sm:flex-none whitespace-nowrap ${
                activeTab === "bookings" 
                  ? "bg-slate-900 text-white shadow-sm" 
                  : "text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              📊 Réservations
            </button>
            <button 
              onClick={() => setActiveTab("add-terrain")}
              className={`text-xs font-bold px-3 py-2.5 sm:py-2 rounded-lg transition-all flex-1 sm:flex-none whitespace-nowrap ${
                activeTab === "add-terrain" 
                  ? "bg-slate-900 text-white shadow-sm" 
                  : "text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              ➕ Terrain
            </button>
          </div>

        </div>
      </header>

      {/* 💻 Contenu principal (Marges ajustées pour petits écrans) */}
      <main className="max-w-6xl mx-auto p-4 sm:p-8">
        
        {activeTab === "bookings" ? (
          <div className="space-y-4 sm:space-y-6">
            <div className="px-1 sm:px-0">
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                Tableau des Réservations
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                Suivez l'état de remplissage de vos complexes sportifs en temps réel.
              </p>
            </div>
            <BookingList />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <div className="px-1 sm:px-0">
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                Ajouter un nouveau terrain
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                Créez un complexe et assignez-lui ses plages horaires de disponibilité.
              </p>
            </div>
            <TerrainForm />
          </div>
        )}

      </main>
    </div>
  );
}