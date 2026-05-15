import { useNavigate } from "react-router-dom";
import { JornadaResponse } from "../service/types/jornada";

export function LinguageCard({ data }: { data: JornadaResponse }) {
  const navigate = useNavigate();
  return (
    <article
      className="bg-accent p-5 rounded-lg flex flex-col gap-5 border border-border select-none cursor-pointer hover:scale-[1.03] transition-all duration-200 ease-in-out w-card"
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 50px ${data.linguagem.cor}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 transparent";
      }}
      onClick={() => navigate(`/jornada/${data.uid}`)}
    >
      <img src={data.linguagem.url} className="size-24 object-contain" />

      <h2 className="text-3xl ">{data.linguagem.nome}</h2>

      <div className="w-full h-2 bg-card rounded-sm relative">
        <div
          className="h-full rounded-sm"
          style={{
            backgroundColor: data.linguagem.cor,
            width: `${data.progresso_percent}%`,
          }}
        />

        <span className="absolute right-0 -top-7">
          {data.progresso_percent}%
        </span>
      </div>
    </article>
  );
}
