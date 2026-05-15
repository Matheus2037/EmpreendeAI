import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { Bell, BookOpen, Home, LayoutDashboard, LogOut, Newspaper, Settings, TrendingUp, UserRound } from "lucide-react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/auth";
import { NOTIFICACOES, type Notificacao } from "@/mocks/notificacoes";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const MOCK_MODE = import.meta.env.VITE_MOCK_AUTH === "true";

const ICONE_NOTIF: Record<Notificacao["tipo"], React.ReactNode> = {
  trilha: <TrendingUp className="size-4 text-primary shrink-0" />,
  noticia: <Newspaper className="size-4 text-blue-400 shrink-0" />,
  conteudo: <BookOpen className="size-4 text-emerald-400 shrink-0" />,
  sistema: <Bell className="size-4 text-muted-foreground shrink-0" />,
};

const NAV_LINKS = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/dashboard", label: "Trilhas", icon: LayoutDashboard },
  { to: "/noticias", label: "Notícias", icon: Newspaper },
  { to: "/conteudos", label: "Conteúdos", icon: BookOpen },
];

function getInitials(name?: string | null) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

export function PrivateLayout() {
  const queryClient = useQueryClient();
  const { logout, currentUser } = useAuthContext();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const naoLidas = NOTIFICACOES.filter((n) => !n.lida).length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    queryClient.clear();
    if (MOCK_MODE) {
      logout();
      navigate("/");
    } else {
      signOut(auth);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-6">
          <Link to="/home" className="flex items-center gap-1 select-none shrink-0">
            <span className="text-lg font-bold text-primary">Empreende</span>
            <span className="text-lg font-bold text-foreground">AI</span>
          </Link>

          <nav className="flex items-center gap-1">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )
                }
              >
                <Icon className="size-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <div ref={notifRef} className="relative">
              <button
                className="relative flex items-center justify-center size-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setNotifOpen((v) => !v)}
              >
                <Bell className="size-5" />
                {naoLidas > 0 && (
                  <span className="absolute top-1 right-1 size-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center leading-none">
                    {naoLidas}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                    <span className="font-semibold text-sm">Notificações</span>
                    {naoLidas > 0 && (
                      <span className="text-xs text-muted-foreground">{naoLidas} não lidas</span>
                    )}
                  </div>
                  <ul className="max-h-80 overflow-y-auto divide-y divide-border">
                    {NOTIFICACOES.map((notif) => (
                      <li
                        key={notif.uid}
                        className={cn(
                          "flex gap-3 px-4 py-3 text-sm",
                          !notif.lida && "bg-primary/5"
                        )}
                      >
                        <span className="mt-0.5">{ICONE_NOTIF[notif.tipo]}</span>
                        <div className="flex flex-col gap-1">
                          <p className={cn("leading-snug", !notif.lida && "font-medium")}>
                            {notif.mensagem}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {new Date(notif.data).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div ref={accountRef} className="relative">
              <button
                onClick={() => setAccountOpen((v) => !v)}
                className="flex items-center justify-center size-9 rounded-full bg-primary/15 text-primary hover:bg-primary/25 transition-colors text-xs font-bold select-none"
                aria-label="Menu da conta"
              >
                {getInitials(currentUser?.displayName)}
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="font-semibold text-sm truncate">{currentUser?.displayName}</p>
                    <p className="text-xs text-muted-foreground truncate">{currentUser?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/perfil"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <UserRound className="size-4 text-muted-foreground" />
                      Meu Perfil
                    </Link>
                    <Link
                      to="/configuracoes"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Settings className="size-4 text-muted-foreground" />
                      Configurações
                    </Link>
                  </div>
                  <div className="border-t border-border py-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors w-full"
                    >
                      <LogOut className="size-4" />
                      Sair
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-5 py-8">
        <Outlet />
      </main>
    </div>
  );
}
