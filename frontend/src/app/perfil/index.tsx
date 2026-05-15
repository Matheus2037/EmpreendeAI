import { useAuthContext } from "@/contexts/auth";
import {
  BANNER_PRESETS,
  PERFIL_DEFAULT,
  PERFIL_STORAGE_KEY,
  STATS_MOCK,
  USUARIO_MOCK,
  type PerfilEditavel,
  type PerfilLinks,
} from "@/mocks/usuario";
import { Button } from "@/components/ui/button";
import { SobreMimCard } from "./components/sobreMimCard";
import { LinksCard } from "./components/linksCard";
import { TrilhasFavoritasSection } from "./components/trilhasFavoritasSection";
import { BookOpen, CalendarDays, Camera, Clock, Flame, Pencil, Trophy, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

function getInitials(name?: string | null) {
  if (!name) return "U";
  return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function loadPerfil(): PerfilEditavel {
  try {
    const raw = localStorage.getItem(PERFIL_STORAGE_KEY);
    if (raw) return { ...PERFIL_DEFAULT, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return PERFIL_DEFAULT;
}

function savePerfil(data: PerfilEditavel) {
  localStorage.setItem(PERFIL_STORAGE_KEY, JSON.stringify(data));
}

export function PerfilPage() {
  const { currentUser } = useAuthContext();

  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState<PerfilEditavel>(loadPerfil);
  const [draft, setDraft] = useState<PerfilEditavel>(loadPerfil);

  const nome = currentUser?.displayName ?? USUARIO_MOCK.displayName;
  const email = currentUser?.email ?? USUARIO_MOCK.email;

  const bannerColor =
    BANNER_PRESETS[draft.bannerColorIndex]?.color ?? BANNER_PRESETS[0].color;

  function updateField<K extends keyof PerfilEditavel>(key: K, value: PerfilEditavel[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function updateLink(key: keyof PerfilLinks, value: string) {
    setDraft((d) => ({ ...d, links: { ...d.links, [key]: value } }));
  }

  function handleSave() {
    savePerfil(draft);
    setSaved(draft);
    setIsEditing(false);
  }

  function handleCancel() {
    setDraft(saved);
    setIsEditing(false);
  }

  return (
    <div className="max-w-2xl mx-auto w-full flex flex-col gap-5">
      <h1 className="text-xl font-semibold">Meu Perfil</h1>

      {/* ── Banner + Avatar + Header ── */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {/* Banner */}
        <div
          className="h-32 relative"
          style={{
            background: `linear-gradient(135deg, ${bannerColor}55 0%, ${bannerColor}15 100%)`,
          }}
        >
          {isEditing && (
            <div className="absolute bottom-2.5 right-3 flex items-center gap-1.5">
              <span className="text-xs text-white/70 mr-1">Cor do banner:</span>
              {BANNER_PRESETS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => updateField("bannerColorIndex", i)}
                  title={p.name}
                  className={cn(
                    "size-5 rounded-full border-2 transition-all",
                    draft.bannerColorIndex === i
                      ? "border-white scale-125 shadow-md"
                      : "border-white/30 hover:border-white/70"
                  )}
                  style={{ backgroundColor: p.color }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Avatar + controles */}
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-9 mb-4">
            {/* Avatar */}
            <div className="relative">
              <div className="size-18 rounded-2xl bg-primary/20 text-primary flex items-center justify-center text-2xl font-bold border-4 border-card select-none">
                {getInitials(nome)}
              </div>
              {isEditing && (
                <button
                  title="Trocar foto (simulado)"
                  className="absolute -bottom-1 -right-1 size-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Camera className="size-3 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Botões editar / salvar / cancelar */}
            {isEditing ? (
              <div className="flex gap-2 pb-1">
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="size-3.5" />
                  Cancelar
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Salvar alterações
                </Button>
              </div>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)} className="mb-1">
                <Pencil className="size-3.5" />
                Editar Perfil
              </Button>
            )}
          </div>

          {/* Nome + email + objetivo */}
          <h2 className="text-lg font-semibold leading-tight">{nome}</h2>
          <p className="text-sm text-muted-foreground">{email}</p>
          {draft.objetivo && (
            <p className="text-sm text-muted-foreground italic mt-1">
              "{draft.objetivo}"
            </p>
          )}
        </div>
      </div>

      {/* ── Sobre Mim ── */}
      <SobreMimCard isEditing={isEditing} data={draft} onChange={updateField} />

      {/* ── Links ── */}
      <LinksCard isEditing={isEditing} links={draft.links} onChange={updateLink} />

      {/* ── Estatísticas (somente leitura) ── */}
      <section className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
        <h3 className="text-sm font-semibold">Estatísticas</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatItem
            icon={<Flame className="size-4 text-orange-500" />}
            value={`🔥 ${STATS_MOCK.streak} dias`}
            label="Sequência ativa"
          />
          <StatItem
            icon={<Trophy className="size-4 text-yellow-500" />}
            value={String(STATS_MOCK.trilhasConcluidas)}
            label="Trilhas concluídas"
          />
          <StatItem
            icon={<BookOpen className="size-4 text-primary" />}
            value={String(STATS_MOCK.trilhasEmAndamento)}
            label="Em andamento"
          />
          <StatItem
            icon={<Clock className="size-4 text-muted-foreground" />}
            value={STATS_MOCK.tempoAcumulado}
            label="Tempo acumulado"
          />
          <StatItem
            icon={<CalendarDays className="size-4 text-muted-foreground" />}
            value={formatDate(STATS_MOCK.dataCadastro)}
            label="Membro desde"
            wide
          />
        </div>
      </section>

      {/* ── Trilhas Favoritas ── */}
      <TrilhasFavoritasSection />
    </div>
  );
}

function StatItem({
  icon,
  value,
  label,
  wide,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 p-3 rounded-xl bg-muted/40 border border-border",
        wide && "sm:col-span-2"
      )}
    >
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}
