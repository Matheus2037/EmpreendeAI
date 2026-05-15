import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/auth";
import { getJornadasByUserId } from "./service/jornadas";
import { LinguageCard } from "./components/linguageCard";
import { AddJourneyModal } from "./addJourneyModal";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import type { JornadaResponse, StatusJornada } from "./service/types/jornada";

type FiltroStatus = "todas" | StatusJornada;
type Ordenacao = "mais_recentes" | "mais_antigas" | "a_z" | "z_a" | "mais_acessadas";

const LABEL_STATUS: Record<FiltroStatus, string> = {
  todas: "Todas",
  em_andamento: "Em andamento",
  nao_iniciada: "Não iniciadas",
  concluida: "Concluídas",
};

const LABEL_ORDENACAO: Record<Ordenacao, string> = {
  mais_recentes: "Mais recentes",
  mais_antigas: "Mais antigas",
  a_z: "Nome A–Z",
  z_a: "Nome Z–A",
  mais_acessadas: "Mais acessadas",
};

function filtrarEOrdenar(
  dados: JornadaResponse[],
  filtro: FiltroStatus,
  ordenacao: Ordenacao
): JornadaResponse[] {
  let resultado = filtro === "todas" ? dados : dados.filter((j) => j.status === filtro);

  return resultado.slice().sort((a, b) => {
    switch (ordenacao) {
      case "mais_recentes":
        return (b.dataUltimoAcesso ?? b.dataCriacao ?? "").localeCompare(
          a.dataUltimoAcesso ?? a.dataCriacao ?? ""
        );
      case "mais_antigas":
        return (a.dataCriacao ?? "").localeCompare(b.dataCriacao ?? "");
      case "a_z":
        return (a.linguagem?.nome ?? "").localeCompare(b.linguagem?.nome ?? "");
      case "z_a":
        return (b.linguagem?.nome ?? "").localeCompare(a.linguagem?.nome ?? "");
      case "mais_acessadas":
        return (b.quantidadeAcessos ?? 0) - (a.quantidadeAcessos ?? 0);
    }
  });
}

export function DashboardPage() {
  const { currentUser } = useAuthContext();
  const [filtro, setFiltro] = useState<FiltroStatus>("todas");
  const [ordenacao, setOrdenacao] = useState<Ordenacao>("mais_recentes");

  const { data, isLoading } = useQuery({
    queryKey: ["jornadas"],
    queryFn: getJornadasByUserId,
  });

  const dadosFiltrados = data ? filtrarEOrdenar(data, filtro, ordenacao) : [];

  return (
    <>
      <section className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <img
            src={
              currentUser?.photoURL ||
              `https://ui-avatars.com/api/?name=${currentUser?.displayName}&background=0f172a&color=fff`
            }
            alt="User avatar"
            className="size-14 rounded-full"
          />
          <div>
            <p className="text-sm text-muted-foreground">Bem-vindo de volta,</p>
            <h3 className="font-semibold text-lg">{currentUser?.displayName}</h3>
          </div>
        </div>

        <AddJourneyModal />
      </section>

      <section>
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Suas trilhas de aprendizagem
            {data && (
              <span className="ml-2 normal-case text-xs">
                ({dadosFiltrados.length} de {data.length})
              </span>
            )}
          </h4>

          <div className="flex gap-2">
            <Select value={filtro} onValueChange={(v) => setFiltro(v as FiltroStatus)}>
              <SelectTrigger size="sm" className="w-44">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(LABEL_STATUS) as FiltroStatus[]).map((k) => (
                  <SelectItem key={k} value={k}>
                    {LABEL_STATUS[k]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={ordenacao} onValueChange={(v) => setOrdenacao(v as Ordenacao)}>
              <SelectTrigger size="sm" className="w-44">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(LABEL_ORDENACAO) as Ordenacao[]).map((k) => (
                  <SelectItem key={k} value={k}>
                    {LABEL_ORDENACAO[k]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 justify-start pb-10">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="w-card h-48 rounded-xl" />
            ))
          ) : dadosFiltrados.length > 0 ? (
            dadosFiltrados.map((jornada) => (
              <LinguageCard key={jornada.uid} data={jornada} />
            ))
          ) : (
            <div className="flex flex-col items-center gap-3 py-16 w-full text-center text-muted-foreground">
              <span className="text-4xl">🔍</span>
              <p className="text-base font-medium">Nenhuma trilha encontrada.</p>
              <p className="text-sm">Tente ajustar os filtros ou crie uma nova trilha.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
