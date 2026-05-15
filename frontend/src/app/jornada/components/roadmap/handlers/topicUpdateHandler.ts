import { ConteudoJornadaResponse } from "@/app/jornada/service/types/conteudoJornadaResponse";
import { atualizaTopicoCompleto } from "@/app/jornada/service/conteudoJornadas";
import { AtualizaNodesResponse } from "@/app/jornada/service/types/atualizaNodesResponse";
import { UpdateHandlerProps } from "../types/roadmapTypes";

export class TopicUpdateHandler {
  private idJornada?: string;
  private queryClient: import("@tanstack/react-query").QueryClient;
  private setPercentage: (value: number) => void;
  private setLoadingMap?: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;

  constructor({
    idJornada,
    queryClient,
    setPercentage,
    setLoadingMap,
  }: UpdateHandlerProps) {
    this.idJornada = idJornada;
    this.queryClient = queryClient;
    this.setPercentage = setPercentage;
    this.setLoadingMap = setLoadingMap;
  }

  async handleTopicUpdate(
    nodeId: string,
    moduloUid: number,
    topicoUid: string
  ): Promise<void> {
    if (!this.idJornada || !this.setLoadingMap) return;

    this.setLoadingMap((prev) => ({ ...prev, [nodeId]: true }));

    try {
      const res = await atualizaTopicoCompleto(
        this.idJornada,
        moduloUid,
        topicoUid
      );
      if (!res) return;

      this.setPercentage(res.progresso_percent || 0);
      this.updateQueryData(res, nodeId);
    } catch (error) {
      console.error("Erro ao atualizar tópico:", error);
    }
  }

  private updateQueryData(res: AtualizaNodesResponse, nodeId: string): void {
    this.queryClient.setQueryData(
      ["conteudoJornada", this.idJornada],
      (oldData: ConteudoJornadaResponse | undefined) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          roadmap: oldData.roadmap.map((modulo) => {
            if (res.topicos_status.modulo_id === modulo.uid) {
              return {
                ...modulo,
                concluido: res.topicos_status.topicos.every(
                  (status) => status.finalizado
                ),
                subtopicos: modulo.subtopicos.map((sub, subIndex: number) => {
                  this.setLoadingMap!((prev) => ({
                    ...prev,
                    [nodeId]: false,
                  }));

                  return {
                    ...sub,
                    concluido: res.topicos_status.topicos[subIndex].finalizado,
                  };
                }),
              };
            }
            return modulo;
          }),
        };
      }
    );
  }
}
