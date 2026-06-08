"use client";

import { useSearchParams } from "next/navigation";
import { useState, useRef, Suspense } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [isDownloading, setIsDownloading] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);
  
  // Récupération des paramètres dynamiques de la réservation
  const uuid = searchParams.get("uuid") || "BK-UNKNOWN";
  const terrainName = searchParams.get("terrain") || "ECOLE TAWHID / F6-1";
  const date = searchParams.get("date") || "sam. 6 juin 2026";
  const slot = searchParams.get("slot") || "18:00";
  
  const imageUrl = "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600";

  // Chaîne de texte brute encodée dans le QR Code
  const qrData = `Réservation: ${uuid}\nTerrain: ${terrainName}\nDate: ${date}\nHeure: ${slot}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`;

  const handleDownloadTicket = async () => {
    if (!ticketRef.current) return;
    try {
      setIsDownloading(true);
      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: "#f8fafc"
      });
      const imageBlob = canvas.toDataURL("image/jpeg", 0.95);
      const link = document.createElement("a");
      link.href = imageBlob;
      link.download = `Reservation-${uuid}.jpeg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erreur lors de la capture du ticket :", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-900 antialiased flex flex-col items-center justify-start p-0 sm:p-4">
      
      {/* --- ZONE DU TICKET COMPLÈTE --- */}
      <div 
        ref={ticketRef}
        id="ticket-reservation" 
        className="w-full max-w-md bg-slate-50 flex flex-col text-left min-h-screen sm:min-h-auto"
      >
        {/* Entête de l'application */}
        <div className="bg-white px-4 py-4 flex items-center border-b border-slate-100">
          <Link href="/terrains" className="text-xl font-bold p-1">‹</Link>
          <h2 className="text-xl font-medium text-center flex-1 pr-6 tracking-tight text-slate-900">
            Votre réservation
          </h2>
        </div>

        {/* Image du terrain */}
        <div className="w-full h-52 overflow-hidden relative bg-slate-200">
          <img 
            src={imageUrl} 
            alt={terrainName} 
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
          />
        </div>

        {/* Bloc d'informations détails Grid */}
        <div className="bg-white grid grid-cols-2 p-6 border-b border-slate-100 text-sm gap-y-2">
          {/* Colonne Gauche */}
          <div className="space-y-1">
            <span className="text-slate-400 block font-normal">Date</span>
            <span className="text-slate-800 font-medium block leading-tight">
              {date} <br /> à {slot}
            </span>
            <span className="text-slate-400 block pt-1">Terrain</span>
          </div>
          
          {/* Colonne Droite */}
          <div className="space-y-1 border-l border-slate-100 pl-4">
            <span className="text-slate-400 block font-normal">Activité</span>
            <span className="text-slate-800 font-bold block uppercase">FOOTBALL</span>
            <span className="text-slate-800 font-medium block">1h</span>
            <span className="text-slate-800 font-semibold block text-xs uppercase text-emerald-700 pt-1">
              {terrainName}
            </span>
          </div>
        </div>

        {/* Zone Centrée contenant le QR Code et le bouton Annuler */}
        <div className="flex-1 flex flex-col items-center justify-between p-8 bg-slate-50 min-h-[380px]">
          <div className="bg-white p-4 shadow-sm border border-slate-100 inline-block mt-4">
            <img 
              src={qrCodeUrl} 
              alt="QR Code Ticket" 
              className="w-56 h-56 mx-auto"
              crossOrigin="anonymous"
            />
          </div>

          {/* Bouton Annuler directement intégré au design rouge comme sur la photo */}
          <button className="w-full py-4 text-red-600 hover:text-red-700 font-normal text-xl transition text-center mt-8 bg-transparent border-none outline-none">
            Annuler ma réservation
          </button>
        </div>
        
      </div>

    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-900">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}