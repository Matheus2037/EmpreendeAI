import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateExercicioResponse } from "../../service/types/exercicios";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-typescript";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { corrigirExercicio } from "../../service/exercicios";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
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
  sigla,
  moduloId,
  subId,
}: ExercicioDialogProps) {
  const { idJornada } = useParams();
  const [userCode, setUserCode] = useState("");
  const [isLoading, setIsLoadig] = useState(false);
  const [correcao, setCorrecao] = useState<CorrigirExercicioResponse | null>(
    null
  );

  const exercicio = useMemo(() => {
    if (!data) return null;
    const { exercicio } = JSON.parse(data.exercicio_gerado) as ExercicioGerado;
    return exercicio;
  }, [data]);

  if (!data || !exercicio) return null;

  async function handleSubmit() {
    setIsLoadig(true);
    await corrigirExercicio({
      resposta_usuario: userCode,
      exercicio_id: data?.exercicio_id,
      jornada_id: idJornada,
      modulo_id: moduloId,
      topico_id: subId,
    })
      .then((res) => {
        if (res) setCorrecao(res);
      })
      .finally(() => setIsLoadig(false));
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-5xl max-h-[70vh] overflow-y-auto p-0 bg-[#18181b] text-white rounded-xl border border-[#27272a] shadow-2xl">
        <div className="p-8">
          <DialogHeader>
            <DialogTitle className="capitalize text-lg text-[#b3b3b3] tracking-wide mb-2">
              {data.linguagem}
            </DialogTitle>
          </DialogHeader>

          <div className="mb-2">
            <span className="inline-block bg-white text-black rounded-full px-4 py-1 text-sm font-semibold shadow mb-2">
              Nível: {exercicio.nivel}
            </span>
          </div>

          <h1 className="font-bold text-2xl mb-2 text-white">
            {exercicio.titulo}
          </h1>
          <p className="mb-6 text-[#d4d4d8] text-base">{exercicio.descricao}</p>

          <div className="flex flex-col gap-4 mb-6">
            <div className="bg-white/10 text-[#b3b3b3] rounded-lg p-4 shadow">
              <span className="font-semibold text-sm mb-1 block text-white">
                Dica:
              </span>
              <span className="text-base break-words">{exercicio.dica}</span>
            </div>
            <div className="bg-white/10 text-[#b3b3b3] rounded-lg p-4 shadow">
              <span className="font-semibold text-sm mb-1 block text-white">
                Entrada Exemplo:
              </span>
              <span className="text-base break-words">
                {exercicio.entrada_exemplo}
              </span>
            </div>
            <div className="bg-white/10 text-[#b3b3b3] rounded-lg p-4 shadow">
              <span className="font-semibold text-sm mb-1 block text-white">
                Saída Esperada:
              </span>
              <span className="text-base break-words">
                {exercicio.saida_esperada}
              </span>
            </div>
          </div>

          {/* Editor de código editável */}
          <div className="mb-4">
            <span className="font-semibold text-sm mb-1 block text-white">
              Seu código:
            </span>
            <Editor
              value={userCode}
              onValueChange={setUserCode}
              highlight={(code) =>
                Prism.highlight(
                  code,
                  Prism.languages[sigla] || Prism.languages.javascript,
                  sigla
                )
              }
              padding={12}
              style={{
                fontFamily: "Fira Mono, Consolas, monospace",
                fontSize: 16,
                background: "#23272e",
                color: "#fff",
                borderRadius: 8,
                minHeight: 120,
              }}
            />
          </div>

          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Corrigir o exercicio"
            )}
          </Button>

          {/* Exibição da correção */}
          {correcao && (
            <div className="mt-6 flex flex-col gap-4">
              <div
                className={`${
                  correcao.correcao.avaliacao.includes("corret")
                    ? "bg-green-100 border-green-500"
                    : "bg-red-100 border-red-500"
                } p-4 rounded`}
              >
                <span
                  className={`font-bold ${
                    correcao.correcao.avaliacao.includes("corret")
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  Avaliação:
                </span>
                <p
                  className={`${
                    correcao.correcao.avaliacao.includes("corret")
                      ? "text-green-900"
                      : "text-red-900"
                  } text-green-900 capitalize`}
                >
                  {correcao.correcao.avaliacao}
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <span className="font-bold text-blue-800">
                  Melhorias sugeridas:
                </span>
                <ul className="list-disc ml-5 text-blue-900">
                  {correcao.correcao.melhorias.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-100 border-l-4 border-gray-400 p-4 rounded">
                <span className="font-bold text-gray-800">
                  Comentário final:
                </span>
                <p className="text-gray-900">
                  {correcao.correcao.cometario_final}
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
