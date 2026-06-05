"use client";

import { useState, Suspense } from "react"; // 👈 On ajoute Suspense
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// 1. On déplace toute votre logique et UI dans ce sous-composant
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Derived State (Machi state local)
  const mode = searchParams.get("mode");
  const isLogin = mode !== "register"; 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("user", JSON.stringify({ email, name: "Joueur Pro" }));
      router.push("/");
      router.refresh();
    }, 1000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("user", JSON.stringify({ email, name: fullName || "Nouveau Joueur" }));
      router.push("/");
      router.refresh();
    }, 1000);
  };

  return (
    <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-md space-y-6 relative z-20">
      
      <Link href="/" className="text-xs text-green-600 hover:underline font-medium inline-block cursor-pointer">
        ← Retour à l'accueil
      </Link>

      {isLogin ? (
        /* --- VIEW 1: CONNEXION --- */
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Connexion à MidanSaaS</h1>
            <p className="text-sm text-gray-500 mt-1">Accédez à vos réservations de terrains</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Adresse Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@gmail.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 outline-none focus:border-green-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 outline-none focus:border-green-500 bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-green-700 transition shadow-sm disabled:bg-gray-400 cursor-pointer"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <div className="text-center border-t pt-4">
            <button
              type="button"
              onClick={() => router.push("/login?mode=register")}
              className="text-xs text-green-600 hover:text-green-700 font-bold underline cursor-pointer py-2 block w-full relative z-30"
            >
              Nouveau sur MidanSaaS ? Créez un compte
            </button>
          </div>
        </div>
      ) : (
        /* --- VIEW 2: INSCRIPTION --- */
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Créer un compte</h1>
            <p className="text-sm text-gray-500 mt-1">Rejoignez la communauté des joueurs</p>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Nom Complet</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Youssef El..."
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 outline-none focus:border-green-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Adresse Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@gmail.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 outline-none focus:border-green-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm text-gray-900 outline-none focus:border-green-500 bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-green-700 transition shadow-sm disabled:bg-gray-400 cursor-pointer"
            >
              {loading ? "Création..." : "S'inscrire"}
            </button>
          </form>

          <div className="text-center border-t pt-4">
            <button
              type="button"
              onClick={() => router.push("/login?mode=login")}
              className="text-xs text-green-600 hover:text-green-700 font-bold underline cursor-pointer py-2 block w-full relative z-30"
            >
              Déjà inscrit ? Connectez-vous ici
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 2. 🔥 L'EXPORT COMPOSANT PRINCIPAL SÉCURISÉ POUR LE PRERENDERING NEXT.JS
export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12 relative z-10">
      <Suspense 
        fallback={
          <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-md text-center py-12 space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-sm text-gray-500 font-medium">Chargement du portail d'accès...</p>
          </div>
        }
      >
        <LoginContent />
      </Suspense>
    </main>
  );
}