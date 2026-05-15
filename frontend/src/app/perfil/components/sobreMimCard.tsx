import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AREAS_ATUACAO,
  HABILIDADES_SUGERIDAS,
  type PerfilEditavel,
} from "@/mocks/usuario";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
  isEditing: boolean;
  data: PerfilEditavel;
  onChange: <K extends keyof PerfilEditavel>(key: K, value: PerfilEditavel[K]) => void;
};

export function SobreMimCard({ isEditing, data, onChange }: Props) {
  const [novaHabilidade, setNovaHabilidade] = useState("");

  function addHabilidade(h: string) {
    const clean = h.trim();
    if (!clean || data.habilidades.includes(clean) || data.habilidades.length >= 6) return;
    onChange("habilidades", [...data.habilidades, clean]);
    setNovaHabilidade("");
  }

  function removeHabilidade(h: string) {
    onChange("habilidades", data.habilidades.filter((x) => x !== h));
  }

  const sugeridas = HABILIDADES_SUGERIDAS.filter(
    (h) => !data.habilidades.includes(h)
  ).slice(0, 8);

  return (
    <section className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5">
      <h3 className="text-sm font-semibold">Sobre Mim</h3>

      {/* Bio */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Bio</span>
        {isEditing ? (
          <Textarea
            value={data.bio}
            onChange={(e) => onChange("bio", e.target.value)}
            rows={3}
            placeholder="Conte um pouco sobre você..."
            className="text-sm resize-none"
          />
        ) : (
          <p className="text-sm leading-relaxed">{data.bio || <span className="text-muted-foreground italic">Sem bio cadastrada.</span>}</p>
        )}
      </div>

      {/* Cargo + Área */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Cargo</span>
          {isEditing ? (
            <Input
              value={data.cargo}
              onChange={(e) => onChange("cargo", e.target.value)}
              placeholder="Ex: Fundador & CEO"
              className="text-sm"
            />
          ) : (
            <p className="text-sm font-medium">{data.cargo || <span className="text-muted-foreground italic">—</span>}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Área de atuação</span>
          {isEditing ? (
            <Select value={data.areaAtuacao} onValueChange={(v) => onChange("areaAtuacao", v)}>
              <SelectTrigger size="sm">
                <SelectValue placeholder="Selecione uma área" />
              </SelectTrigger>
              <SelectContent>
                {AREAS_ATUACAO.map((a) => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="text-sm font-medium">{data.areaAtuacao || <span className="text-muted-foreground italic">—</span>}</p>
          )}
        </div>
      </div>

      {/* Objetivo */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Objetivo na plataforma</span>
        {isEditing ? (
          <Input
            value={data.objetivo}
            onChange={(e) => onChange("objetivo", e.target.value)}
            placeholder="Ex: Lançar meu primeiro produto digital"
            className="text-sm"
          />
        ) : (
          <p className="text-sm italic text-muted-foreground">
            {data.objetivo ? `"${data.objetivo}"` : <span>—</span>}
          </p>
        )}
      </div>

      {/* Habilidades */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Habilidades & interesses{" "}
          <span className="normal-case font-normal">({data.habilidades.length}/6)</span>
        </span>

        <div className="flex flex-wrap gap-2">
          {data.habilidades.map((h) => (
            <span
              key={h}
              className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-medium"
            >
              {h}
              {isEditing && (
                <button
                  onClick={() => removeHabilidade(h)}
                  className="hover:text-destructive transition-colors ml-0.5"
                  aria-label={`Remover ${h}`}
                >
                  <X className="size-3" />
                </button>
              )}
            </span>
          ))}
        </div>

        {isEditing && (
          <div className="flex flex-col gap-2 mt-1">
            {data.habilidades.length < 6 && (
              <>
                <div className="flex gap-2">
                  <Input
                    value={novaHabilidade}
                    onChange={(e) => setNovaHabilidade(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addHabilidade(novaHabilidade)}
                    placeholder="Adicionar habilidade..."
                    className="text-sm h-8"
                  />
                  <button
                    onClick={() => addHabilidade(novaHabilidade)}
                    disabled={!novaHabilidade.trim()}
                    className={cn(
                      "px-3 h-8 text-xs rounded-md border transition-colors",
                      novaHabilidade.trim()
                        ? "border-primary text-primary hover:bg-primary/10"
                        : "border-border text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    Adicionar
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {sugeridas.map((h) => (
                    <button
                      key={h}
                      onClick={() => addHabilidade(h)}
                      className="text-xs text-muted-foreground border border-dashed border-border px-2 py-0.5 rounded-full hover:border-primary hover:text-primary transition-colors"
                    >
                      + {h}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
