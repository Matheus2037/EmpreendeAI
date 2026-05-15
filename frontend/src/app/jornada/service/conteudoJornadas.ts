import { TRILHAS_CONTEUDO } from "@/mocks/trilhas";
import type { ConteudoJornadaResponse } from "./types/conteudoJornadaResponse";
import type { AtualizaNodesResponse } from "./types/atualizaNodesResponse";

export async function getConteudoJornadasById(
  idJornada: string
): Promise<ConteudoJornadaResponse> {
  await new Promise((r) => setTimeout(r, 500));
  const trilha = TRILHAS_CONTEUDO[idJornada];
  if (!trilha) throw new Error(`Trilha "${idJornada}" não encontrada`);
  return trilha;
}

export async function atualizaModuloCompleto(
  jornada_id: string,
  modulo_id: number
): Promise<AtualizaNodesResponse> {
  await new Promise((r) => setTimeout(r, 300));
  const trilha = TRILHAS_CONTEUDO[jornada_id];
  const modulo = trilha?.roadmap.find((m) => m.uid === modulo_id);
  const todosFinalizados = modulo?.subtopicos.every((t) => t.concluido) ?? false;

  if (modulo) {
    modulo.subtopicos.forEach((t) => {
      t.concluido = !todosFinalizados;
    });
  }

  const total = trilha?.roadmap.flatMap((m) => m.subtopicos).length ?? 0;
  const concluidos =
    trilha?.roadmap.flatMap((m) => m.subtopicos).filter((t) => t.concluido).length ?? 0;
  const progresso_percent = total > 0 ? Math.round((concluidos / total) * 100) : 0;

  return {
    sucesso: true,
    mensagem: todosFinalizados
      ? "Módulo desmarcado"
      : "Módulo concluído",
    progresso_percent,
    topicos_status: {
      modulo_id,
      topicos:
        modulo?.subtopicos.map((t, i) => ({
          topico_id: i,
          finalizado: t.concluido,
        })) ?? [],
    },
  };
}

export async function atualizaTopicoCompleto(
  jornada_id: string,
  modulo_id: number,
  topico_id: string
): Promise<AtualizaNodesResponse> {
  await new Promise((r) => setTimeout(r, 300));
  const trilha = TRILHAS_CONTEUDO[jornada_id];
  const modulo = trilha?.roadmap.find((m) => m.uid === modulo_id);
  const topico = modulo?.subtopicos.find((t) => t.uid === topico_id);

  if (topico) topico.concluido = !topico.concluido;

  const total = trilha?.roadmap.flatMap((m) => m.subtopicos).length ?? 0;
  const concluidos =
    trilha?.roadmap.flatMap((m) => m.subtopicos).filter((t) => t.concluido).length ?? 0;
  const progresso_percent = total > 0 ? Math.round((concluidos / total) * 100) : 0;

  return {
    sucesso: true,
    mensagem: topico?.concluido ? "Tópico concluído" : "Tópico desmarcado",
    progresso_percent,
    topicos_status: {
      modulo_id,
      topicos:
        modulo?.subtopicos.map((t, i) => ({
          topico_id: i,
          finalizado: t.concluido,
        })) ?? [],
    },
  };
}
