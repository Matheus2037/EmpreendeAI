import { JornadaResponse } from "@/app/dashboard/service/types/jornada";

export interface ConteudoJornadaResponse {
  uid: string;
  jornada: JornadaResponse;
  roadmap: Roadmap[];
}

interface Roadmap {
  uid: number;
  title: string;
  concluido: boolean;
  subtopicos: Subtopico[];
}

export interface Subtopico {
  uid: string;
  title: string;
  concluido: boolean;
  conteudo: Conteudo;
}

interface Conteudo {
  topico: string;
  detalhes: string;
  anexos: Anexo[];
  exemplos: Exemplos[];
}

interface Anexo {
  tipo: "video" | "documentacao";
  url: string;
}

interface Exemplos {
  titulo: string;
  codigo: string;
}
