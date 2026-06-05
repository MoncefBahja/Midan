"use client";

import { useState, useEffect } from "react";
import { getTerrains } from "@/lib/api";
import { Terrain } from "@/types/booking";
import Link from "next/link";

export default function TerrainsPage() {
  const [allTerrains, setAllTerrains] = useState<Terrain[]>([]);
  const [loading, setLoading] = useState(true);

  // L-State dial l-Filters
  const [searchName, setSearchName] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split("T")[0]; // "2026-06-04"
  });

  // 1. Fetch data
  useEffect(() => {
    async function loadTerrains() {
      const data = await getTerrains();
      setAllTerrains(data);
      setLoading(false);
    }
    loadTerrains();
  }, []);

  // 2. 🔥 Computed State: L-Filtrage Live
  const filteredTerrains = allTerrains.filter((terrain) => {
    const matchesName = searchName.trim() === "" || 
      terrain.name.toLowerCase().includes(searchName.toLowerCase());

    const matchesCity = selectedCity === "" || 
      terrain.city === selectedCity;

    const matchesDate = true; 

    return matchesName && matchesCity && matchesDate;
  });

  const uniqueCities = Array.from(new Set(allTerrains.map((t) => t.city)));

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    // Application du dégradé de fond identique à la Landing Page sur tout l'écran
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <main className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Réserver un Terrain</h1>
          <p className="text-slate-500 mt-2">Filtrez par nom, ville ou date pour trouver le terrain idéal.</p>
        </div>

        {/* Section l-Filtrage */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Input Nom */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Rechercher par nom</label>
            <input
              type="text"
              placeholder="Ex: Maracana, Indoor..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full px-4 py-2.5 border text-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition text-sm bg-slate-50/50"
            />
          </div>

          {/* Select Ville */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Ville</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-2.5 border text-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition text-sm bg-white"
            >
              <option value="">Toutes les villes</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Input Date */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Date du Match</label>
            <input
              type="date"
              value={selectedDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2.5 border text-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition text-sm bg-slate-50/50"
            />
          </div>
        </div>

        {/* Affichage */}
        {filteredTerrains.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-lg font-medium">Aucun terrain ne correspond à vos critères.</p>
            <button 
              onClick={() => { setSearchName(""); setSelectedCity(""); }}
              className="mt-4 text-sm text-emerald-600 font-semibold hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTerrains.map((terrain) => (
              <div key={terrain.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between">
                <div>
                  <div className="relative h-48 w-full bg-slate-100">
                    <img src={terrain.imageUrl} alt={terrain.name} className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {terrain.city}
                    </span>
                  </div>
                  <div className="p-5">
                    <h2 className="text-xl font-bold text-slate-900">{terrain.name}</h2>
                    <p className="text-sm text-slate-500 mt-1">Disponibilités prêtes</p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <span className="text-2xl font-black text-emerald-600">{terrain.pricePerHour}</span>
                      <span className="text-xs text-slate-500 font-semibold"> DH / Heure</span>
                    </div>
                    <Link 
                      href={`/terrains/${terrain.id}?date=${selectedDate}`}
                      className="bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 shadow-sm transition"
                    >
                      Voir les Slots
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}