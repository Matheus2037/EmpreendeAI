import { ConteudoJornadaResponse } from "@/app/jornada/service/types/conteudoJornadaResponse";
import { atualizaModuloCompleto } from "@/app/jornada/service/conteudoJornadas";
import { UpdateHandlerProps } from "../types/roadmapTypes";

export class ModuleUpdateHandler {
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

  async handleModuleUpdate(
    nodeId: string,
    moduloUid: number,
    checked: boolean
  ): Promise<void> {
    if (!this.idJornada || !this.setLoadingMap) return;

    this.setLoadingMap((prev) => ({ ...prev, [nodeId]: true }));

    try {
      const res = await atualizaModuloCompleto(this.idJornada, moduloUid);
      if (!res) return;

      this.setPercentage(res.progresso_percent || 0);
      this.updateQueryData(res, moduloUid, checked, nodeId);
    } catch (error) {
      console.error("Erro ao atualizar módulo:", error);
    }
  }
  private updateQueryData(
    res: import("@/app/jornada/service/types/atualizaNodesResponse").AtualizaNodesResponse,
    moduloUid: number,
    checked: boolean,
    nodeId: string
  ): void {
    this.queryClient.setQueryData(
      ["conteudoJornada", this.idJornada],
      (oldData: ConteudoJornadaResponse | undefined) => {
        if (!oldData || !this.setLoadingMap) return oldData;

        return {
          ...oldData,
          roadmap: oldData.roadmap.map((modulo) => {
            if (res.topicos_status.modulo_id === modulo.uid) {
              return {
                ...modulo,
                concluido: checked,
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
