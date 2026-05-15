import { useAuthContext } from "@/contexts/auth";
import { USUARIO_MOCK } from "@/mocks/usuario";
import { Briefcase, Calendar, Mail, MapPin } from "lucide-react";

function getInitials(name?: string | null) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function PerfilPage() {
  const { currentUser } = useAuthContext();

  const nome = currentUser?.displayName ?? USUARIO_MOCK.displayName;
  const email = currentUser?.email ?? USUARIO_MOCK.email;

  return (
    <div className="max-w-2xl mx-auto w-full flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Meu Perfil</h1>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary/30 to-primary/10" />

        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-10 mb-4">
            <div className="size-20 rounded-2xl bg-primary/20 text-primary flex items-center justify-center text-2xl font-bold border-4 border-card shrink-0">
              {getInitials(nome)}
            </div>
            <div className="pb-1">
              <h2 className="text-lg font-semibold leading-tight">{nome}</h2>
              <p className="text-sm text-muted-foreground">{USUARIO_MOCK.cargo}</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            {USUARIO_MOCK.bio}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="size-4 shrink-0" />
              <span className="truncate">{email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="size-4 shrink-0" />
              <span>{USUARIO_MOCK.areaAtuacao}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0" />
              <span>Brasil</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="size-4 shrink-0" />
              <span>Membro desde {formatDate(USUARIO_MOCK.dataCadastro)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-sm font-semibold mb-4">Resumo de atividade</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold text-primary">6</span>
            <span className="text-xs text-muted-foreground">Trilhas ativas</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold text-primary">52</span>
            <span className="text-xs text-muted-foreground">Acessos totais</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold text-primary">35%</span>
            <span className="text-xs text-muted-foreground">Progresso médio</span>
          </div>
        </div>
      </div>
    </div>
  );
}
