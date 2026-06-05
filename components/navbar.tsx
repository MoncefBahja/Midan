"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // FIX HYDRATION : On initialise d'abord l'état à null pour que le serveur et le client démarrent à l'identique
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  // Synchronisation f les onglets awla mlli l-user kay-bdel session
  useEffect(() => {
    setMounted(true);

    const handleStorageChange = () => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      }
    };

    // Listeners l l-moteghayirat dyal localStorage
    window.addEventListener("storage", handleStorageChange);
    
    // Check dynamic mlli l-user kay-tsara f les pages
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [pathname]); // Synchro safe mlli t-bdel l-page

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Réserver un Terrain", href: "/terrains" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* 1. Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-black tracking-tight text-emerald-600 ">
              M<span className="text-slate-900">idan</span>
            </span>
          </Link>
        </div>

        {/* 2. Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 ${
                  isActive
                    ? "text-emerald-600 font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* 3. Auth Buttons */}
        <div className="flex items-center gap-4">
          {/* Si le composant n'est pas encore monté sur le client, on affiche un état neutre temporaire */}
          {!mounted ? (
            <div className="h-8 w-20 bg-slate-100 animate-pulse rounded-lg hidden sm:block"></div>
          ) : user ? (
            <>
              {/* TṢ7I7 HTML : Changé 'span' parent en 'div' (inline-block) pour respecter la sémantique React */}
              <div className="text-xs text-slate-500 font-semibold hidden sm:inline-block">
                Bonjour, <span className="text-slate-900 font-black">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm font-bold text-red-600 hover:text-red-700 transition"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              {/* 1. Link dial Connexion */}
              <Link
                href="/login?mode=login"
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
              >
                Connexion
              </Link>

              {/* 2. Link dial S'inscrire */}
              <Link
                href="/login?mode=register"
                className="hidden sm:inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-emerald-100 hover:bg-emerald-700 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                S'inscrire
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}