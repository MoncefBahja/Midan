"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [isDownloading, setIsDownloading] = useState(false);
  
  const uuid = searchParams.get("uuid") || "BK-UNKNOWN";
  const terrainName = searchParams.get("terrain") || "Terrain non spécifié";
  const date = searchParams.get("date") || "";
  const slot = searchParams.get("slot") || "";
  const method = searchParams.get("method") || "CASH";

  // Chaîne de texte encodée dans le QR Code
  const qrData = `Réservation: ${uuid}\nTerrain: ${terrainName}\nDate: ${date}\nCréneau: ${slot}\nPaiement: ${method}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`;

  // Fonction magique pour télécharger l'image du QR Code
  const handleDownloadQr = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      
      // Création d'un lien temporaire dans le DOM pour forcer le téléchargement
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `QR-Reservation-${uuid}.png`;
      document.body.appendChild(link);
      link.click();
      
      // Nettoyage
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Erreur lors du téléchargement du QR Code :", error);
      alert("Impossible de télécharger le QR code automatiquement. Vous pouvez faire un clic droit / appui long sur l'image pour l'enregistrer.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 antialiased flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl max-w-md w-full text-center space-y-6">
        
        {/* Icône Succès */}
        <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-3xl animate-bounce">
          ⚽
        </div>

        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Réservation Confirmée !</h1>
          <p className="text-sm text-slate-500 mt-1">Votre match est enregistré. Présentez ce QR code à l'entrée.</p>
        </div>

        {/* Bloc Ticket / QR Code */}
        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-5 space-y-5 relative">
          
          {/* Le QR Code */}
          <div className="bg-white p-4 rounded-xl inline-block shadow-inner border border-slate-100 mx-auto">
            <img 
              src={qrCodeUrl} 
              alt="QR Code de réservation" 
              className="w-44 h-44 mx-auto"
            />
          </div>

          {/* 🔥 BOUTON DE TÉLÉCHARGEMENT DU QR CODE */}
          <div>
            <button
              onClick={handleDownloadQr}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 hover:bg-emerald-100/80 px-4 py-2 rounded-xl transition active:scale-95 disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-emerald-700"></div>
                  Téléchargement...
                </>
              ) : (
                <>
                  📥 Télécharger le QR Code
                </>
              )}
            </button>
          </div>

          {/* Code de réservation */}
          <div className="text-center pt-2 border-t border-slate-200/60">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Référence</span>
            <span className="font-mono text-lg font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100 inline-block mt-0.5">
              {uuid}
            </span>
          </div>

          {/* Détails du récapitulatif */}
          <div className="border-t border-slate-200/60 pt-4 text-left text-xs space-y-2.5 text-slate-600">
            <div className="flex justify-between">
              <span className="font-medium text-slate-400">Terrain :</span>
              <span className="font-bold text-slate-800">{terrainName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-slate-400">Date :</span>
              <span className="font-bold text-slate-800">📅 {date}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-slate-400">Horaire :</span>
              <span className="font-bold text-slate-800">⏰ {slot}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-slate-400">Règlement :</span>
              <span className="font-bold text-slate-800">
                {method === "CASH" ? "💵 Sur place (Cash)" : "💳 Payé en ligne"}
              </span>
            </div>
          </div>
        </div>

        {/* Bouton de retour */}
        <div className="pt-2">
          <Link 
            href="/terrains" 
            className="w-full inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-3.5 rounded-xl transition shadow-md"
          >
            Retour à l'accueil
          </Link>
        </div>

      </div>
    </div>
  );
}

// Export avec protection Suspense
export default function SuccessPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}