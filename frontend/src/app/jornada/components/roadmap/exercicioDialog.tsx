import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateExercicioResponse } from "../../service/types/exercicios";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { corrigirExercicio } from "../../service/exercicios";
import { useParams } from "react-router-dom";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import type { CorrigirExercicioResponse } from "../../service/types/exercicios";

type ExercicioDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CreateExercicioResponse | null;
  sigla: string;
  moduloId: number;
  subId: number;
};

type ExercicioGerado = {
  exercicio: {
    descricao: string;
    dica: string;
    entrada_exemplo: string;
    nivel: string;
    saida_esperada: string;
    titulo: string;
  };
};

export function ExercicioDialog({
  open,
  data,
  onOpenChange,
  moduloId,
  subId,
}: ExercicioDialogProps) {
  const { idJornada } = useParams();
  const [resposta, setResposta] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [correcao, setCorrecao] = useState<CorrigirExercicioResponse | null>(null);

  const exercicio = useMemo(() => {
    if (!data) return null;
    const { exercicio } = JSON.parse(data.exercicio_gerado) as ExercicioGerado;
    return exercicio;
  }, [data]);

  if (!data || !exercicio) return null;

  async function handleSubmit() {
    setIsLoading(true);
    await corrigirExercicio({
      resposta_usuario: resposta,
      exercicio_id: data?.exercicio_id,
      jornada_id: idJornada,
      modulo_id: moduloId,
      topico_id: subId,
    })
      .then((res) => {
        if (res) setCorrecao(res);
      })
      .finally(() => setIsLoading(false));
  }

  const isPositive = correcao?.correcao.avaliacao.toLowerCase().includes("boa") ||
    correcao?.correcao.avaliacao.toLowerCase().includes("corret") ||
    correcao?.correcao.avaliacao.toLowerCase().includes("parabéns");

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) { setResposta(""); setCorrecao(null); } }}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
              {exercicio.nivel}
            </span>
          </div>
          <DialogTitle className="text-xl leading-snug">{exercicio.titulo}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {exercicio.descricao}
          </p>

          <div className="grid grid-cols-1 gap-3">
            <div className="bg-muted rounded-lg p-4">
              <p className="text-xs font-semibold uppercase tracking-wide mb-1">Dica</p>
              <p className="text-sm">{exercicio.dica}</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-xs font-semibold uppercase tracking-wide mb-1">Exemplo de contexto</p>
              <p className="text-sm text-muted-foreground">{exercicio.entrada_exemplo}</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-xs font-semibold uppercase tracking-wide mb-1">O que se espera</p>
              <p className="text-sm text-muted-foreground">{exercicio.saida_esperada}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Sua resposta</p>
            <Textarea
              placeholder="Escreva sua resposta aqui…"
              value={resposta}
              onChange={(e) => setResposta(e.target.value)}
              className="min-h-[140px] resize-none"
              disabled={!!correcao}
            />
          </div>

          {!correcao && (
            <Button
              onClick={handleSubmit}
              disabled={isLoading || resposta.trim().length < 10}
              className="w-full"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Verificar resposta"}
            </Button>
          )}

          {correcao && (
            <div className="space-y-4 pt-2 border-t border-border">
              <div className={`flex items-start gap-3 p-4 rounded-lg ${isPositive ? "bg-green-50 dark:bg-green-950/30" : "bg-amber-50 dark:bg-amber-950/30"}`}>
                {isPositive
                  ? <CheckCircle className="size-5 text-green-600 shrink-0 mt-0.5" />
                  : <AlertCircle className="size-5 text-amber-600 shrink-0 mt-0.5" />}
                <p className={`text-sm font-medium ${isPositive ? "text-green-800 dark:text-green-300" : "text-amber-800 dark:text-amber-300"}`}>
                  {correcao.correcao.avaliacao}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Pontos para aprimorar</p>
                <ul className="space-y-1">
                  {correcao.correcao.melhorias.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <p className="text-xs font-semibold uppercase tracking-wide mb-1">Comentário final</p>
                <p className="text-sm text-muted-foreground">{correcao.correcao.cometario_final}</p>
              </div>

              <Button variant="outline" className="w-full" onClick={() => { setCorrecao(null); setResposta(""); }}>
                Tentar novamente
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
