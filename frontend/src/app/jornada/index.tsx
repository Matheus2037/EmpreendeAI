import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getConteudoJornadasById } from "./service/conteudoJornadas";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { LoadingJornada } from "./components/loadingJornada";
import { ChatJornada } from "./components/chat";
import { Roadmap } from "./components/roadmap";
import { PercentageProgressBar } from "./components/percentageProgressBar";
import { PercentageProgressProvider } from "./contexts/percentageProgress";

export function JornadaPage() {
  const { idJornada } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["conteudoJornada", idJornada],
    queryFn: async () => {
      if (!idJornada) {
        throw new Error("Id da jornada não encontrado");
      }
      return await getConteudoJornadasById(idJornada);
    },
  });

  if (!idJornada) {
    toast.error("Id da jornada não encontrado");
    return null;
  }

  return isLoading ? (
    <LoadingJornada />
  ) : (
    <PercentageProgressProvider>
      <section className="flex justify-between items-center gap-5">
        <article className="flex gap-5 w-[28rem]">
          <img
            src={data?.jornada.linguagem.url}
            className="size-18 object-contain"
          />

          <div className="flex flex-col justify-center gap-4 w-full">
            <h2 className="text-lg ">{data?.jornada.linguagem.nome}</h2>{" "}
            <div className="w-full h-2 bg-card rounded-sm relative">
              <PercentageProgressBar
                color={data?.jornada.linguagem.cor}
                percentage={data?.jornada.progresso_percent || 0}
              />
            </div>
            <span className="absolute right-0 -top-7">
              {data?.jornada.progresso_percent}%
            </span>
          </div>
        </article>

        <Link to="/dashboard">
          <Button size="lg" variant="secondary">
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
