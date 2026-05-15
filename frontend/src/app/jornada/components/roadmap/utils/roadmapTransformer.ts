import { Node, Edge } from "@xyflow/react";
import { ConteudoJornadaResponse } from "@/app/jornada/service/types/conteudoJornadaResponse";
import { ModuleUpdateHandler } from "../handlers/moduleUpdateHandler";
import { TopicUpdateHandler } from "../handlers/topicUpdateHandler";
import { RoadmapData } from "../types/roadmapTypes";

export function transformRoadmapData(
  data: ConteudoJornadaResponse | undefined | void,
  handlers: {
    moduleHandler: ModuleUpdateHandler;
    topicHandler: TopicUpdateHandler;
  },
  loadingMap: { [key: string]: boolean } = {}
): RoadmapData {
  if (!data?.roadmap) return { nodes: [], edges: [] };
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let yBase = 0;

  data.roadmap.forEach((modulo, i: number) => {
    const parentId = `modulo-${i}`;

    // Nó do módulo (pai)
    nodes.push({
      id: parentId,
      type: "custom",
      data: {
        label: modulo.title,
        isLoading: loadingMap[parentId] || false,
        checked: modulo.concluido,
        onCheck: async (checked = true) =>
          await handlers.moduleHandler.handleModuleUpdate(
            parentId,
            modulo.uid,
            checked
          ),
      },
      position: { x: 0, y: yBase + 50 },
    });

    // Subtópicos (filhos)
    modulo.subtopicos.forEach((sub, j: number) => {
      const childId = `modulo-${i}-sub-${j}`;

      nodes.push({
        id: childId,
        type: "custom",
        data: {
          label: sub.title,
          sigla: data.jornada.linguagem.sigla,
          checked: sub.concluido,
          isLoading: loadingMap[childId] || false,
          subNodeContent: sub,
          onCheck: async () =>
            await handlers.topicHandler.handleTopicUpdate(
              childId,
              modulo.uid,
              sub.uid
            ),
          moduloId: modulo.uid,
          subId: sub.uid,
        },
        position: { x: 450, y: yBase + 50 + j * 100 },
      });

      edges.push({
        id: `e-${parentId}-${childId}`,
        source: parentId,
        target: childId,
      });
    });

    // Atualiza yBase para o próximo módulo
    yBase += Math.max(1, modulo.subtopicos.length) * 100 + 50;
  });

  return { nodes, edges };
}
