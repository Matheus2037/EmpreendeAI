export type AtualizaNodesResponse = {
  sucesso: boolean;
  mensagem: string;
  progresso_percent: number;
  topicos_status: Topicosstatus;
};

interface Topicosstatus {
  modulo_id: number;
  topicos: Topico[];
}

interface Topico {
  topico_id: number;
  finalizado: boolean;
}
