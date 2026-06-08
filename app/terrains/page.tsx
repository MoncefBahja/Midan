"use client";

import { useState, useEffect } from "react";
import { getTerrains } from "@/lib/api";
import { Terrain } from "@/types/booking";
import Link from "next/link";

export default function TerrainsPage() {
  const [allTerrains, setAllTerrains] = useState<Terrain[]>([]);
  const [loading, setLoading] = useState(true);

  // State des filtres
  const [searchName, setSearchName] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  // State de pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Chargement des données initiales
  useEffect(() => {
    async function loadTerrains() {
      const data = await getTerrains();
      setAllTerrains(data);
      setLoading(false);
    }
    loadTerrains();
  }, []);

  // Filtrage en temps réel
  const filteredTerrains = allTerrains.filter((terrain) => {
    const matchesName = searchName.trim() === "" || 
      terrain.name.toLowerCase().includes(searchName.toLowerCase());

    const matchesCity = selectedCity === "" || 
      terrain.city === selectedCity;

    return matchesName && matchesCity;
  });

  // Calculs de pagination
  const totalItems = filteredTerrains.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTerrains = filteredTerrains.slice(indexOfFirstItem, indexOfLastItem);

  const uniqueCities = Array.from(new Set(allTerrains.map((t) => t.city)));

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-emerald-600 border-t-transparent"></div>
          <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Chargement des complexes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 antialiased selection:bg-emerald-500/10">
      <main className="px-4 py-6 sm:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Header de la page */}
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950">
            Trouver un Terrain
          </h1>
        </div>

        {/* Section Filtrage */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-md shadow-slate-100/50 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          {/* Recherche par nom */}
          <div className="space-y-1.5">
            <label className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Rechercher un complexe
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3.5 flex items-center text-slate-400 text-sm pointer-events-none">🔍</span>
              <input
                type="text"
                placeholder="Ex: Maracana, City Foot..."
                value={searchName}
                onChange={(e) => {
                  setSearchName(e.target.value);
                  setCurrentPage(1); // Réinitialisation propre ici au changement
                }}
                className="w-full pl-9 pr-4 py-2.5 sm:py-3 border border-slate-200 text-slate-800 font-medium rounded-xl focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition text-sm bg-slate-50/40 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Sélection de Ville */}
          <div className="space-y-1.5">
            <label className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Localisation
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3.5 flex items-center text-slate-400 text-sm pointer-events-none">📍</span>
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setCurrentPage(1); // Réinitialisation propre ici au changement
                }}
                className="w-full pl-9 pr-4 py-2.5 sm:py-3 border border-slate-200 text-slate-800 font-medium rounded-xl focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition text-sm bg-white appearance-none cursor-pointer"
              >
                <option value="">Toutes les villes</option>
                {uniqueCities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <span className="absolute inset-y-0 right-3.5 flex items-center text-slate-400 pointer-events-none text-xs">▼</span>
            </div>
          </div>

          {/* Sélection de la Date */}
          <div className="space-y-1.5">
            <label className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Date de la rencontre
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3.5 flex items-center text-slate-400 text-sm pointer-events-none">📅</span>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setCurrentPage(1); // Réinitialisation propre ici au changement
                }}
                className="w-full pl-9 pr-4 py-2.5 sm:py-3 border border-slate-200 text-slate-800 font-medium rounded-xl focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition text-sm bg-slate-50/40 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Grille de Terrains */}
        {totalItems === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 p-6">
            <div className="text-3xl mb-3">🏟️</div>
            <p className="text-slate-900 text-base font-bold">Aucun terrain trouvé</p>
            <p className="text-slate-400 text-xs mt-1 max-w-xs mx-auto">Modifiez vos filtres ou élargissez vos recherches pour trouver une disponibilité.</p>
            <button 
              onClick={() => { setSearchName(""); setSelectedCity(""); setCurrentPage(1); }}
              className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-bold rounded-xl transition"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {currentTerrains.map((terrain) => (
                <div 
                  key={terrain.id} 
                  className="group bg-white border border-slate-200/70 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300/80 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Container Image */}
                    <div className="relative h-48 sm:h-52 w-full bg-slate-100 overflow-hidden">
                      <img 
                        src={terrain.imageUrl} 
                        alt={terrain.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-3 left-3 bg-slate-950/70 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm tracking-wide">
                        📍 {terrain.city}
                      </div>
                      {/* <div className="absolute bottom-3 right-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                        Disponible
                      </div> */}
                    </div>

                    {/* Contenu textuel */}
                    <div className="p-5 space-y-2">
                      <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-emerald-700 transition-colors">
                        {terrain.name}
                      </h2>
                      {/* <div className="flex items-center gap-1 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                        <span>⚽ Football</span>
                        <span>•</span>
                        <span>1 Heure Minimum</span>
                      </div> */}
                    </div>
                  </div>

                  {/* Footer de la carte */}
                  <div className="p-5 pt-0">
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <div>
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-xl sm:text-2xl font-black text-slate-950">{terrain.pricePerHour}</span>
                          <span className="text-xs text-slate-900 font-bold">DH</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block -mt-0.5">par heure</span>
                      </div>

                      <Link 
                        href={`/terrains/${terrain.id}?date=${selectedDate}`}
                        className="inline-flex items-center justify-center bg-slate-900 hover:bg-emerald-600 text-white font-bold px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all duration-200 active:scale-95"
                      >
                        Réserver ⚡
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-200 pt-6 px-2">
              
                <div className="flex flex-1 sm:flex-none justify-between sm:justify-end gap-2 w-full">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition active:scale-95 disabled:opacity-40 disabled:pointer-events-none shadow-sm flex-1 sm:flex-none"
                  >
                    « Précédent
                  </button>

                  <div className="hidden sm:flex items-center gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 inline-flex items-center justify-center text-sm font-bold rounded-xl transition ${
                          currentPage === page
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition active:scale-95 disabled:opacity-40 disabled:pointer-events-none shadow-sm flex-1 sm:flex-none"
                  >
                    Suivant »
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}