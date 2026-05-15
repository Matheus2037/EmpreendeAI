import { useNavigate } from "react-router-dom";
import { JornadaResponse } from "../service/types/jornada";
import { BookOpen, Briefcase, Lightbulb, TrendingUp, MessageCircle, BarChart2 } from "lucide-react";

const ICONES: Record<string, React.ReactNode> = {
  empresa: <Briefcase className="size-10" />,
  softskills: <MessageCircle className="size-10" />,
  mvp: <Lightbulb className="size-10" />,
  financas: <BarChart2 className="size-10" />,
  vendas: <TrendingUp className="size-10" />,
  marketing: <BookOpen className="size-10" />,
};

export function LinguageCard({ data }: { data: JornadaResponse }) {
  const navigate = useNavigate();
  const icone = ICONES[data.linguagem.sigla] ?? <Briefcase className="size-10" />;

  return (
    <article
      className="bg-card p-5 rounded-xl flex flex-col gap-5 border border-border select-none cursor-pointer hover:scale-[1.03] transition-all duration-200 ease-in-out w-card"
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 40px ${data.linguagem.cor}35`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 transparent";
      }}
      onClick={() => navigate(`/trilha/${data.uid}`)}
    >
      <div
        className="size-16 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${data.linguagem.cor}20`, color: data.linguagem.cor }}
      >
        {icone}
      </div>

      <h2 className="text-lg font-semibold leading-snug">{data.linguagem.nome}</h2>

      <div className="w-full h-2 bg-muted rounded-full relative mt-auto">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            backgroundColor: data.linguagem.cor,
            width: `${data.progresso_percent}%`,
          }}
        />
        <span className="text-xs text-muted-foreground mt-1 block text-right">
          {data.progresso_percent}% concluído
        </span>
      </div>
    </article>
  );
}
