import { getTerrainById } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";

interface TerrainDetailsPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ date?: string }>;
}

export default async function TerrainDetailsPage({ params, searchParams }: TerrainDetailsPageProps) {
  // 1. Récupérer l-ID w la Date men l-URL
  const { id } = await params;
  const { date } = await searchParams;
  
  const terrainId = parseInt(id, 10);
  
  // 2. Fetch t-terrain b l-ID dialo
  const terrain = await getTerrainById(terrainId);

  if (!terrain) {
    notFound();
  }

  return (
    // Conteneur global avec le même fond dégradé que la Landing Page
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <main className="p-8 max-w-5xl mx-auto">
        {/* Retour en arrière */}
        <Link href="/terrains" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline font-semibold mb-6 inline-block transition">
          ← Retour aux terrains
        </Link>

        {/* --- Section Details du Terrain --- */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm md:flex mb-8">
          <div className="md:w-1/3 h-48 md:h-auto relative bg-slate-100">
            <img src={terrain.imageUrl} alt={terrain.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-6 md:w-2/3 flex flex-col justify-between">
            <div>
              <span className="text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-full font-semibold">{terrain.city}</span>
              <h1 className="text-2xl font-black text-slate-900 mt-2">{terrain.name}</h1>
              <p className="text-sm text-slate-500 mt-1">Terrain géré par {terrain.owner?.fullName}</p>
            </div>
            
            <div className="border-t border-slate-100 pt-4 mt-4 flex items-center justify-between">
              <div>
                <span className="text-2xl font-black text-emerald-600">{terrain.pricePerHour}</span>
                <span className="text-sm text-slate-500 font-semibold"> DH / Heure</span>
              </div>
              {date && (
                <div className="text-sm text-slate-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 font-medium">
                  Date choisie : <span className="text-emerald-700 font-bold">{date}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- Section Affichage des Slots --- */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Horaires Disponibles (Slots)</h2>
          <p className="text-sm text-slate-500 mb-6">Sélectionnez un créneau horaire pour finaliser votre réservation.</p>

          {!terrain.slots || terrain.slots.length === 0 ? (
            <p className="text-slate-500 text-center py-6">Aucun créneau horaire disponible pour ce terrain.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {terrain.slots.map((slot) => {
                const isBookedSimulated = slot.id === 2; 

                return (
                  <div key={slot.id} className="relative">
                    {isBookedSimulated ? (
                      // Slot Réservé (Disabled UI)
                      <div className="border border-slate-200 bg-slate-100 text-slate-400 p-4 rounded-xl text-center cursor-not-allowed">
                        <span className="block font-semibold text-sm line-through">{slot.startTime} - {slot.endTime}</span>
                        <span className="text-[10px] uppercase font-bold text-red-500 mt-1 block">Réservé</span>
                      </div>
                    ) : (
                      // Slot Disponible (Action Link)
                      <Link
                        href={`/checkout?terrainId=${terrain.id}&slotId=${slot.id}&date=${date || new Date().toISOString().split('T')[0]}`}
                        className="border border-slate-200 bg-white text-slate-700 hover:border-emerald-600 hover:bg-emerald-50/40 p-4 rounded-xl text-center block transition group shadow-sm"
                      >
                        <span className="block font-bold text-slate-900 group-hover:text-emerald-700">{slot.startTime} - {slot.endTime}</span>
                        <span className="text-[10px] uppercase font-bold text-emerald-600 mt-1 block group-hover:underline">Réserver</span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}