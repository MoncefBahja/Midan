"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react"; // 👈 Ajout de Suspense
import { getTerrainById } from "@/lib/api";
import { Terrain, Slot } from "@/types/booking";
import Link from "next/link";

// 1. Déplacer toute votre logique actuelle dans ce sous-composant
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
        
        {/* SECTION GAUCHE: Formulaire de Paiement */}
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
              {/* Option CASH */}
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

              {/* Option ONLINE */}
              <label className={`group flex items-start p-5 border rounded-2xl cursor-pointer transition-all duration-200 ${paymentMethod === "ONLINE" ? "border-emerald-600 bg-emerald-50/20 ring-1 ring-emerald-600 shadow-sm" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"}`}>
                <input type="radio" name="payment" checked={paymentMethod === "ONLINE"} onChange={() => setPaymentMethod("ONLINE")} className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300" />
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="block font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">Payer en ligne (Carte Bancaire)</span>
                    <div className="flex gap-1 text-lg opacity-80 group-hover:opacity-100 transition-opacity">💳</div>
                  </div>
                  <span className="block text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">Débit sécurisé immédiat via CMI. Idéal pour garantir la disponibilité de votre session.</span>
                  
                  {paymentMethod === "ONLINE" && (
                    <div className="mt-5 p-5 rounded-xl space-y-4 max-w-md bg-white/80 border border-slate-200/60 shadow-inner animate-fadeIn text-left">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Nom complet sur la carte</label>
                        <input type="text" placeholder="Ex: Karim Benjelloun" className="w-full px-3 py-2.5 border border-slate-200 bg-white rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-slate-900 placeholder-slate-400 font-medium" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Numéro de carte</label>
                        <div className="relative">
                          <input type="text" placeholder="0000 0000 0000 0000" className="w-full pl-3 pr-10 py-2.5 border border-slate-200 bg-white rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-slate-900 placeholder-slate-400 font-medium tracking-widest" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">🔒 Secure</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Expiration</label>
                          <input type="text" placeholder="MM/AA" className="w-full px-3 py-2.5 border border-slate-200 bg-white rounded-xl text-sm text-center outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-slate-900 placeholder-slate-400 font-medium" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Code CVC</label>
                          <input type="text" placeholder="123" className="w-full px-3 py-2.5 border border-slate-200 bg-white rounded-xl text-sm text-center outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-slate-900 placeholder-slate-400 font-medium" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* SECTION DROITE: Résumé de la Réservation */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm sticky top-24 overflow-hidden">
            {terrain.imageUrl && (
              <div className="h-28 w-full relative bg-slate-100 border-b border-slate-100">
                <img src={terrain.imageUrl} alt={terrain.name} className="w-full h-full object-cover brightness-95" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                  <span className="text-white text-xs font-bold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">📍 {terrain.city}</span>
                </div>
              </div>
            )}

            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">Détails du match</h2>
                <p className="text-xs text-slate-400 mt-0.5">Vérifiez vos informations de session</p>
              </div>
              
              <div className="space-y-3 text-sm border-b border-slate-100 pb-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Complexe/Terrain :</span>
                  <span className="font-bold text-slate-900">{terrain.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Date sélectionnée :</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-100/50 px-2.5 py-1 rounded-xl text-xs">📅 {date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Créneau horaire :</span>
                  <span className="font-bold text-slate-900 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-xl text-xs">⏰ {selectedSlot.startTime} - {selectedSlot.endTime}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Tarif horaire base</span>
                  <span className="font-semibold text-slate-700">{terrain.pricePerHour} DH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Frais de service SaaS</span>
                  <span className="font-semibold text-emerald-600">Offert ✨</span>
                </div>
                <div className="flex justify-between items-baseline pt-4 border-t border-slate-100">
                  <span className="text-base font-black text-slate-900">Montant total</span>
                  <div className="text-right">
                    <span className="text-3xl font-black text-emerald-600 tracking-tight">{terrain.pricePerHour}</span>
                    <span className="text-xs text-slate-500 font-bold"> DH</span>
                  </div>
                </div>
              </div>

              <button onClick={handleConfirmBooking} disabled={isSubmitting} className={`w-full py-3.5 rounded-xl font-bold text-white text-center flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${isSubmitting ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100 hover:shadow-lg hover:-translate-y-0.5"}`}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-400"></div>
                    Traitement sécurisé...
                  </>
                ) : (
                  "⚡ Valider ma réservation"
                )}
              </button>
              
              <div className="flex items-center justify-center gap-1 text-[10px] text-center text-slate-400 font-medium">
                <span>🛡️ Paiement crypté & Données protégées</span>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

// 2. 🔥 EXPORT PRINCIPAL SÉCURISÉ POUR NEXT.JS BUILD
export default function CheckoutPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            <p className="text-sm font-semibold text-slate-500">Chargement de la session de paiement sécurisée...</p>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}