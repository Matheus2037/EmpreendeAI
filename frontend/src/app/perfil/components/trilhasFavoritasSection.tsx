import { useFavoritas } from "@/hooks/useFavoritas";
import { TRILHAS_CARDS, TRILHAS_CONTEUDO } from "@/mocks/trilhas";
import { Download, Star, StarOff, Upload } from "lucide-react";
import { toast } from "sonner";

const TRILHA_IMPORTAR_UID = "trilha-6";

function exportarTrilha(uid: string) {
  const trilha = TRILHAS_CARDS.find((t) => t.uid === uid);
  const conteudo = TRILHAS_CONTEUDO[uid] ?? null;
  const payload = {
    versao: "1.0",
    exportadoEm: new Date().toISOString(),
    trilha,
    conteudo,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `trilha-${trilha?.linguagem.sigla ?? uid}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast.success(`Trilha "${trilha?.linguagem.nome}" exportada!`);
}

export function TrilhasFavoritasSection() {
  const { favoritas, toggleFavorita, importarTrilha, isImportada } = useFavoritas();

  const trilhasFavoritas = TRILHAS_CARDS.filter((t) => favoritas.includes(t.uid));

  function handleImportar() {
    const trilha = TRILHAS_CARDS.find((t) => t.uid === TRILHA_IMPORTAR_UID);
    if (!trilha) return;
    if (isImportada(TRILHA_IMPORTAR_UID)) {
      toast.info("Essa trilha já foi importada.");
      return;
    }
    importarTrilha(TRILHA_IMPORTAR_UID);
    toast.success(`Trilha "${trilha.linguagem.nome}" importada com sucesso!`);
  }

  return (
    <section className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Minhas Trilhas Favoritas</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {trilhasFavoritas.length} trilha{trilhasFavoritas.length !== 1 ? "s" : ""} favoritada{trilhasFavoritas.length !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          onClick={handleImportar}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors"
        >
          <Upload className="size-3.5" />
          Importar Trilha
        </button>
      </div>

      {trilhasFavoritas.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center text-muted-foreground">
          <Star className="size-8 opacity-30" />
          <p className="text-sm">Nenhuma trilha favoritada ainda.</p>
          <p className="text-xs">Acesse o Dashboard e favorite as trilhas que mais gosta.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {trilhasFavoritas.map((trilha) => (
            <div
              key={trilha.uid}
              className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors"
            >
              {/* Ícone colorido */}
              <div
                className="size-10 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold"
                style={{
                  backgroundColor: `${trilha.linguagem.cor}20`,
                  color: trilha.linguagem.cor,
                }}
              >
                {trilha.linguagem.nome[0]}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium truncate">{trilha.linguagem.nome}</p>
                  {isImportada(trilha.uid) && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 shrink-0">
                      Importada
                    </span>
                  )}
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: `${trilha.linguagem.cor}20`,
                      color: trilha.linguagem.cor,
                    }}
                  >
                    {trilha.status === "em_andamento"
                      ? "Em andamento"
                      : trilha.status === "concluida"
                      ? "Concluída"
                      : "Não iniciada"}
                  </span>
                </div>

                {/* Barra de progresso */}
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${trilha.progresso_percent}%`,
                        backgroundColor: trilha.linguagem.cor,
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {trilha.progresso_percent}%
                  </span>
                </div>
              </div>

              {/* Ações */}
              <div className="flex gap-1 shrink-0">
                <button
                  onClick={() => exportarTrilha(trilha.uid)}
                  title="Exportar trilha"
                  className="flex items-center justify-center size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Download className="size-4" />
                </button>
                <button
                  onClick={() => toggleFavorita(trilha.uid)}
                  title="Remover dos favoritos"
                  className="flex items-center justify-center size-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <StarOff className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
