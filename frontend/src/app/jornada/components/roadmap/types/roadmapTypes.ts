import { Node, Edge } from "@xyflow/react";
import {
  ConteudoJornadaResponse,
  Subtopico,
} from "@/app/jornada/service/types/conteudoJornadaResponse";

export interface RoadmapData {
  nodes: Node[];
  edges: Edge[];
}

export interface NodeData {
  label: string;
  checked: boolean;
  isLoading: boolean;
  sigla?: string;
  subNodeContent?: Subtopico;
  onCheck: (checked?: boolean) => Promise<void>;
}

export interface RoadmapHookProps {
  data: ConteudoJornadaResponse | undefined | void;
  idJornada: string | undefined;
  loadingMap?: { [key: string]: boolean };
  setLoadingMap?: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
}

export interface UpdateHandlerProps {
  idJornada?: string;
  queryClient: import("@tanstack/react-query").QueryClient;
  setPercentage: (value: number) => void;
  setLoadingMap?: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
}
