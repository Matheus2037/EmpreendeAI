import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { Subtopico } from "../../service/types/conteudoJornadaResponse";
import { Button } from "@/components/ui/button";
import { ExercicioDialog } from "./exercicioDialog";
import { useState } from "react";
import { Loader2, BookOpen, Link as LinkIcon, PlayCircle } from "lucide-react";
import { gerarExercicio } from "../../service/exercicios";
import { useParams } from "react-router-dom";
import { CreateExercicioResponse } from "../../service/types/exercicios";

type DetalhesSubtopicoProps = {
  children?: React.ReactNode;
  subNodeContent?: Subtopico;
  sigla: string;
  moduloId: number;
  subId: number;
};

export function DetalhesSubtopico({
  children,
  subNodeContent: data,
  moduloId,
  subId,
}: DetalhesSubtopicoProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isLoadingExercicio, setIsLoadingExercicio] = useState(false);
  const [exercicio, setExercicio] = useState<null | CreateExercicioResponse>(null);
  const { idJornada } = useParams();

  async function handleGerarExercicio() {
    setIsLoadingExercicio(true);
    await gerarExercicio({
      jornada_id: idJornada!,
      modulo_id: moduloId,
      topico_id: subId,
    })
      .then((res) => {
        setIsOpenDialog(true);
        if (res) setExercicio(res);
      })
      .finally(() => setIsLoadingExercicio(false));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data?.title}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto space-y-5">
          <Button
            className="w-full"
            onClick={handleGerarExercicio}
            disabled={isLoadingExercicio}
          >
            {isLoadingExercicio ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Praticar este tópico"
            )}
          </Button>

          <ExercicioDialog
            open={isOpenDialog}
            onOpenChange={setIsOpenDialog}
            data={exercicio}
            sigla=""
            moduloId={moduloId}
            subId={subId}
          />

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Conteúdo
            </p>
            <p className="text-sm leading-relaxed">{data?.conteudo.topico}</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Aprofundamento
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {data?.conteudo.detalhes}
            </p>
          </div>

          {data?.conteudo.exemplos && data.conteudo.exemplos.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Casos Práticos
              </p>
              {data.conteudo.exemplos.map((exemplo, i) => (
                <div key={i} className="bg-muted rounded-lg p-4 space-y-1">
                  <p className="text-sm font-medium">{exemplo.titulo}</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                    {exemplo.codigo}
                  </p>
                </div>
              ))}
            </div>
          )}

          {data?.conteudo.anexos && data.conteudo.anexos.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Recursos
              </p>
              <ul className="space-y-3">
                {data.conteudo.anexos.map((anexo, i) => (
                  <li key={i}>
                    {anexo.tipo === "video" ? (
                      <div className="space-y-2">
                        <div className="w-full aspect-video rounded-lg overflow-hidden">
                          <iframe
                            src={anexo.url.replace("watch?v=", "embed/")}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Vídeo do tópico"
                            loading="lazy"
                          />
                        </div>
                        <a
                          className="flex items-center gap-1 text-xs text-primary hover:underline"
                          href={anexo.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <PlayCircle className="size-3" />
                          Assistir no YouTube
                        </a>
                      </div>
                    ) : (
                      <a
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                        href={anexo.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <LinkIcon className="size-4" />
                        <BookOpen className="size-4" />
                        {anexo.url}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
