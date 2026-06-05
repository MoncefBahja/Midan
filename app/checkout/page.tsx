"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react"; // 👈 1. ON AJOUTE SUSPENSE ICI
import { getTerrainById } from "@/lib/api";
import { Terrain, Slot } from "@/types/booking";
import Link from "next/link";

// 2. ON RENOMME VOTRE PAGE EN "CheckoutContent"
function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const terrainId = searchParams.get("terrainId");
  const slotId = searchParams.get("slotId");
  const dateFromUrl = searchParams.get("date");

  const date = dateFromUrl || new Date().toISOString().split("T")[0];

  const [terrain, setTerrain] = useState<Terrain | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  
  const [loading, setLoading] = useState(() => {
    return !!(terrainId && slotId);
  });
  
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "ONLINE">("CASH");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!terrainId || !slotId) return;

    async function loadData() {
      try {
        const terrainIdNumber = parseInt(terrainId!, 10);
        const data = await getTerrainById(terrainIdNumber);
        if (data) {
          setTerrain(data);
          const slot = data.slots?.find((s) => s.id === parseInt(slotId!, 10));
          if (slot) setSelectedSlot(slot);
        }
      } catch (error) {
        console.error("Erreur de chargement des données", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [terrainId, slotId]);

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const mockUuid = "BK-" + Math.random().toString(36).substr(2, 9).toUpperCase();
      router.push(`/checkout/success?uuid=${mockUuid}&terrain=${encodeURIComponent(terrain?.name || "")}`);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!terrain || !selectedSlot) {
    return (
      <div className="p-8 text-center min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl max-w-md text-slate-900">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">⚠️</div>
          <p className="text-slate-900 font-bold text-xl">Réservation invalide</p>
          <p className="text-sm text-slate-500 mt-2 mb-6">Le terrain ou le créneau horaire sélectionné n'est plus disponible ou n'existe pas.</p>
          <Link href="/terrains" className="w-full inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-3 rounded-xl transition shadow-md shadow-emerald-100">
            ← Retour aux terrains
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 antialiased">
      <main className="p-4 sm:p-8 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SECTION GAUCHE */}
        <div className="lg:col-span-2 space-y-6">
          <Link href={`/terrains/${terrain.id}`} className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition gap-2">
            ‹ Modifier le créneau horaire
          </Link>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Méthode de règlement</h1>
              <p className="text-sm text-slate-500 mt-1">Sélectionnez votre option de paiement pour valider le match.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <label className={`group flex items-start p-5 border rounded-2xl cursor-pointer transition-all duration-200 ${paymentMethod === "CASH" ? "border-emerald-600 bg-emerald-50/20 ring-1 ring-emerald-600 shadow-sm" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"}`}>
                <input type="radio" name="payment" checked={paymentMethod === "CASH"} onChange={() => setPaymentMethod("CASH")} className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300" />
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="block font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">Payer sur place (Cash)</span>
                    <span className="text-xl">💵</span>
                  </div>
                  <span className="block text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">Réglez directement auprès du responsable du complexe avant d'entrer sur le terrain.</span>
                </div>
              </label>

              <label className={`group flex items-start p-5 border rounded-2xl cursor-pointer transition-all duration-200 ${paymentMethod === "ONLINE" ? "border-emerald-600 bg-emerald-50/20 ring-1 ring-emerald-600 shadow-sm" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"}`}>
                <input type="radio" name="payment" checked={paymentMethod === "ONLINE"} onChange={() => setPaymentMethod("ONLINE")} className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300" />
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="block font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">Payer en ligne (Carte Bancaire)</span>
                    <div className="flex gap-1 text-lg opacity-80 group-hover:opacity-100 transition-opacity">💳</div>
                  </div>
                  <span className="block text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">Débit sécurisé immédiat via CMI.</span>
                  
                  {paymentMethod === "ONLINE" && (
                    <div className="mt-5 p-5 rounded-xl space-y-4 max-w-md bg-white/80 border border-slate-200/60 shadow-inner text-left">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Nom complet sur la carte</label>
                        <input type="text" placeholder="Ex: Karim Benjelloun" className="w-full px-3 py-2.5 border border-slate-200 bg-white rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-slate-900 font-medium" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Numéro de carte</label>
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-3 py-2.5 border border-slate-200 bg-white rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-slate-900 font-medium" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="MM/AA" className="w-full px-3 py-2.5 border border-slate-200 bg-white rounded-xl text-sm text-center" />
                        <input type="text" placeholder="CVC" className="w-full px-3 py-2.5 border border-slate-200 bg-white rounded-xl text-sm text-center" />
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* SECTION DROITE */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm sticky top-24 overflow-hidden">
            {terrain.imageUrl && (
              <div className="h-28 w-full relative">
                <img src={terrain.imageUrl} alt={terrain.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-6 space-y-6">
              <h2 className="text-lg font-black text-slate-900">Détails du match</h2>
              <div className="space-y-3 text-sm border-b pb-4">
                <div className="flex justify-between"><span>Terrain :</span><span className="font-bold">{terrain.name}</span></div>
                <div className="flex justify-between"><span>Date :</span><span className="font-bold">{date}</span></div>
                <div className="flex justify-between"><span>Créneau :</span><span className="font-bold">{selectedSlot.startTime} - {selectedSlot.endTime}</span></div>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-black text-emerald-600">{terrain.pricePerHour} DH</span>
              </div>
              <button onClick={handleConfirmBooking} disabled={isSubmitting} className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition">
                {isSubmitting ? "Chargement..." : "⚡ Valider ma réservation"}
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

// 3. 🔥 ON EXPORTE LA PAGE PRINCIPALE WRAPPÉE DANS UN COMPOSANT SUSPENSE
export default function CheckoutPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="text-center space-y-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="text-sm text-slate-500 font-semibold">Initialisation de votre paiement sécurisé...</p>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}