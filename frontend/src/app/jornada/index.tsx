import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getConteudoJornadasById } from "./service/conteudoJornadas";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Briefcase, Lightbulb, TrendingUp, MessageCircle, BarChart2 } from "lucide-react";
import { LoadingJornada } from "./components/loadingJornada";
import { ChatJornada } from "./components/chat";
import { Roadmap } from "./components/roadmap";
import { PercentageProgressBar } from "./components/percentageProgressBar";
import { PercentageProgressProvider } from "./contexts/percentageProgress";

const ICONES: Record<string, React.ReactNode> = {
  empresa: <Briefcase className="size-10" />,
  softskills: <MessageCircle className="size-10" />,
  mvp: <Lightbulb className="size-10" />,
  financas: <BarChart2 className="size-10" />,
  vendas: <TrendingUp className="size-10" />,
  marketing: <BookOpen className="size-10" />,
};

export function JornadaPage() {
  const { idJornada } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["conteudoJornada", idJornada],
    queryFn: async () => {
      if (!idJornada) throw new Error("Id da trilha não encontrado");
      return await getConteudoJornadasById(idJornada);
    },
  });

  if (!idJornada) {
    toast.error("Id da trilha não encontrado");
    return null;
  }

  const sigla = data?.jornada.linguagem.sigla ?? "";
  const icone = ICONES[sigla] ?? <Briefcase className="size-10" />;
  const cor = data?.jornada.linguagem.cor ?? "#f97316";

  return isLoading ? (
    <LoadingJornada />
  ) : (
    <PercentageProgressProvider>
      <section className="flex justify-between items-center gap-5">
        <article className="flex gap-5 items-center w-[32rem]">
          <div
            className="size-16 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${cor}20`, color: cor }}
          >
            {icone}
          </div>

          <div className="flex flex-col justify-center gap-2 w-full">
            <h2 className="text-lg font-semibold">{data?.jornada.linguagem.nome}</h2>
            <div className="w-full h-2 bg-muted rounded-full relative">
              <PercentageProgressBar
                color={cor}
                percentage={data?.jornada.progresso_percent || 0}
              />
            </div>
            <span className="text-xs text-muted-foreground text-right">
              {data?.jornada.progresso_percent ?? 0}% concluído
            </span>
          </div>
        </article>

        <Link to="/dashboard">
          <Button size="lg" variant="outline">
            <ArrowLeft />
            Voltar
          </Button>
        </Link>
      </section>

      <div className="flex gap-10 h-full">
        <Roadmap data={data} />
        <ChatJornada />
      </div>
    </PercentageProgressProvider>
  );
}
