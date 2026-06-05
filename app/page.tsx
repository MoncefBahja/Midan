import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <div className="text-center max-w-3xl space-y-8 py-12">
        
        {/* Badge Pro */}
        <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full shadow-sm">
          🚀 Solution pour Complexes Sportifs
        </span>
        
        {/* Titre Principal */}
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-none">
          Gérez vos terrains de sport <br />
          <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            en pilote automatique
          </span>
        </h1>
        
        {/* Description */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal">
          La plateforme professionnelle de réservation et de gestion pour vos terrains de foot, padel, tennis et bien plus. Optimisez votre taux d'occupation dès aujourd'hui.
        </p>

        {/* Boutons d'Action (CTA) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            href="/terrains" 
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-200 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Voir les Terrains Disponibles
          </Link>
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl shadow-sm transition-all duration-200"
          >
            Espace Gestionnaire
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-slate-200/60 max-w-2xl mx-auto text-left">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800">⚡ Réservation Flash</h3>
            <p className="text-sm text-slate-500">Vos clients réservent et paient en ligne en moins de 30 secondes.</p>
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800">📊 Planning Dynamique</h3>
            <p className="text-sm text-slate-500">Évitez les doublons grâce à une synchronisation en temps réel.</p>
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800">📈 Statistiques</h3>
            <p className="text-sm text-slate-500">Suivez vos revenus et les heures creuses pour maximiser vos gains.</p>
          </div>
        </div>

      </div>
    </main>
  );
}