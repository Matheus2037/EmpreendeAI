import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePercentageProgress } from "@/app/jornada/contexts/percentageProgress";
import { ConteudoJornadaResponse } from "../../../service/types/conteudoJornadaResponse";
import { ModuleUpdateHandler } from "../handlers/moduleUpdateHandler";
import { TopicUpdateHandler } from "../handlers/topicUpdateHandler";
import { transformRoadmapData } from "../utils/roadmapTransformer";
import { RoadmapData } from "../types/roadmapTypes";

/**
 * Hook para gerenciar os dados do roadmap e suas interações
 */
export function useRoadmapData(
  data: ConteudoJornadaResponse | undefined | void,
  idJornada: string | undefined,
  loadingMap?: { [key: string]: boolean },
  setLoadingMap?: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >
): RoadmapData {
  const { setPercentage } = usePercentageProgress();
  const queryClient = useQueryClient();

  // Cria os handlers para atualização de módulos e tópicos
  const moduleHandler = useMemo(
    () =>
      new ModuleUpdateHandler({
        idJornada,
        queryClient,
        setPercentage,
        setLoadingMap,
      }),
    [idJornada, queryClient, setPercentage, setLoadingMap]
  );

  const topicHandler = useMemo(
    () =>
      new TopicUpdateHandler({
        idJornada,
        queryClient,
        setPercentage,
        setLoadingMap,
      }),
    [idJornada, queryClient, setPercentage, setLoadingMap]
  );

  // Transforma os dados da API em estrutura para o componente de visualização
  return useMemo(() => {
    const handlers = {
      moduleHandler,
      topicHandler,
    };

    return transformRoadmapData(data, handlers, loadingMap || {});
  }, [data, moduleHandler, topicHandler, loadingMap]);
}
