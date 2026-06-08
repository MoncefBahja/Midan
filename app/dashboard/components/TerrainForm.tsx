"use client";

import { useState } from "react";

interface SlotInput {
  startTime: string;
  endTime: string;
}

export default function TerrainForm() {
  // States du terrain
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  // State des slots (initialisé avec un créneau vide)
  const [slots, setSlots] = useState<SlotInput[]>([{ startTime: "09:00", endTime: "10:00" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Ajouter un nouveau champ slot vide
  const handleAddSlot = () => {
    setSlots([...slots, { startTime: "18:00", endTime: "19:00" }]);
  };

  // Supprimer un créneau spécifique
  const handleRemoveSlot = (index: number) => {
    const updatedSlots = slots.filter((_, i) => i !== index);
    setSlots(updatedSlots);
  };

  // Mettre à jour les heures d'un slot
  const handleSlotChange = (index: number, field: keyof SlotInput, value: string) => {
    const updatedSlots = [...slots];
    updatedSlots[index][field] = value;
    setSlots(updatedSlots);
  };

  // Soumission finale vers le Backend (Spring Boot)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    const payload = {
      name,
      city,
      pricePerHour: parseFloat(pricePerHour),
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2", // Fallback image
      slots
    };

    console.log("Payload envoyé à Spring Boot :", payload);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("🎉 Le terrain et ses créneaux ont été créés avec succès !");
      // Reset du formulaire
      setName("");
      setCity("");
      setPricePerHour("");
      setImageUrl("");
      setSlots([{ startTime: "09:00", endTime: "10:00" }]);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 px-2 sm:px-0">
      
      {/* Alert Success */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs sm:text-sm font-medium shadow-sm animate-fadeIn">
          {successMessage}
        </div>
      )}

      {/* SECTION 1: Infos Générales */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
        <h3 className="text-sm sm:text-base font-black text-slate-900 border-b border-slate-100 pb-2">
          💾 Informations Générales
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Nom du Terrain</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Terrain Annexe Wembley" 
              className="w-full px-3 py-2.5 border border-slate-200 bg-slate-50/30 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition font-medium text-slate-800" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Ville</label>
            <input 
              type="text" 
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ex: Casablanca" 
              className="w-full px-3 py-2.5 border border-slate-200 bg-slate-50/30 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition font-medium text-slate-800" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Prix par Heure (DH)</label>
            <input 
              type="number" 
              required
              value={pricePerHour}
              onChange={(e) => setPricePerHour(e.target.value)}
              placeholder="Ex: 350" 
              className="w-full px-3 py-2.5 border border-slate-200 bg-slate-50/30 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition font-medium text-slate-800" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">URL de l'image (Lien internet)</label>
            <input 
              type="url" 
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Ex: https://lien-image.com/foot.jpg" 
              className="w-full px-3 py-2.5 border border-slate-200 bg-slate-50/30 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition font-medium text-slate-800" 
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Configuration des Slots (Dynamique & Responsive Élevé) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-row items-center justify-between border-b border-slate-100 pb-3 gap-2">
          <h3 className="text-sm sm:text-base font-black text-slate-900">⏰ Horaires & Créneaux</h3>
          <button
            type="button"
            onClick={handleAddSlot}
            className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-xl transition active:scale-95"
          >
            + <span className="hidden xs:inline">Ajouter un créneau</span><span className="xs:hidden">Créneau</span>
          </button>
        </div>

        {slots.length === 0 ? (
          <p className="text-xs sm:text-sm text-slate-400 text-center py-6 border border-dashed border-slate-100 rounded-xl">
            Aucun créneau configuré. Le terrain sera invisible.
          </p>
        ) : (
          <div className="space-y-3">
            {slots.map((slot, index) => (
              <div 
                key={index} 
                className="flex flex-col sm:flex-row sm:items-center gap-3 bg-slate-50 p-3.5 sm:p-3 rounded-xl border border-slate-200/60 animate-fadeIn relative"
              >
                {/* Numérotation de ligne */}
                <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto">
                  <span className="text-xs font-black text-slate-400 sm:w-6">#{index + 1}</span>
                  {/* Bouton supprimer visible uniquement sur mobile à côté du numéro */}
                  <button
                    type="button"
                    onClick={() => handleRemoveSlot(index)}
                    className="sm:hidden text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-lg transition"
                  >
                    Supprimer 🗑️
                  </button>
                </div>
                
                {/* Inputs de sélection du temps */}
                <div className="grid grid-cols-2 gap-3 flex-1 w-full">
                  <div className="flex flex-col xs:flex-row xs:items-center gap-1.5 xs:gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide xs:w-5">De</span>
                    <input 
                      type="time" 
                      required
                      value={slot.startTime}
                      onChange={(e) => handleSlotChange(index, "startTime", e.target.value)}
                      className="w-full px-2.5 py-2 sm:py-1.5 border border-slate-200 bg-white rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 font-bold text-slate-800 text-center sm:text-left cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col xs:flex-row xs:items-center gap-1.5 xs:gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide xs:w-4">À</span>
                    <input 
                      type="time" 
                      required
                      value={slot.endTime}
                      onChange={(e) => handleSlotChange(index, "endTime", e.target.value)}
                      className="w-full px-2.5 py-2 sm:py-1.5 border border-slate-200 bg-white rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 font-bold text-slate-800 text-center sm:text-left cursor-pointer"
                    />
                  </div>
                </div>

                {/* Bouton supprimer classique - Caché sur mobile, affiché à partir de sm */}
                <button
                  type="button"
                  onClick={() => handleRemoveSlot(index)}
                  className="hidden sm:inline-flex text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition active:scale-95"
                  title="Supprimer ce créneau"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Validation finale - Bouton pleine largeur sur mobile */}
      <div className="flex items-center justify-end w-full">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-xl font-bold text-white text-sm transition-all duration-200 shadow-md ${
            isSubmitting 
              ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none" 
              : "bg-slate-900 hover:bg-emerald-600 shadow-slate-100 hover:shadow-lg active:scale-98"
          }`}
        >
          {isSubmitting ? "Création en cours..." : "🚀 Publier le Terrain"}
        </button>
      </div>

    </form>
  );
}