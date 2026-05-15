import type {
  CreateExercicioDto,
  CreateExercicioResponse,
  CorrigirExercicioResponse,
} from "@/app/jornada/service/types/exercicios";

type ExercicioGerado = {
  exercicio: {
    titulo: string;
    descricao: string;
    dica: string;
    entrada_exemplo: string;
    saida_esperada: string;
    nivel: string;
  };
};

const EXERCICIOS: Record<string, ExercicioGerado> = {
  "1-1": {
    exercicio: {
      titulo: "Mapeando o Perfil do Cliente Ideal",
      descricao:
        "Você tem uma ideia de negócio. Com base no que aprendeu sobre pesquisa de mercado, descreva em detalhes o perfil do seu cliente ideal (ICP — Ideal Customer Profile). Inclua: dados demográficos, comportamentos, principais dores e o que eles valorizam ao tomar uma decisão de compra.",
      dica: "Evite generalizações como 'todo mundo que quer economizar'. Seja o mais específico possível — um ICP bem definido tem nome, profissão, rotina e sonhos.",
      entrada_exemplo:
        "Ex: 'Minha ideia é um serviço de organização financeira para autônomos.'",
      saida_esperada:
        "Um parágrafo detalhado descrevendo o cliente ideal, incluindo pelo menos 3 dores específicas e 2 comportamentos observáveis.",
      nivel: "Iniciante",
    },
  },
  "1-2": {
    exercicio: {
      titulo: "Escrevendo Sua Proposta de Valor",
      descricao:
        "Usando o template estudado ('Para [cliente] que [problema], o [produto] é um [categoria] que [benefício]. Diferente de [alternativa], nosso produto [diferencial]'), escreva a proposta de valor do seu negócio ou de uma ideia que você queira desenvolver.",
      dica: "O diferencial deve ser real e verificável — não apenas 'melhor qualidade' ou 'mais barato'. Pense em algo que somente você oferece ou que você faz de forma genuinamente diferente.",
      entrada_exemplo: "Qualquer ideia de negócio ou produto que você tenha.",
      saida_esperada:
        "Uma proposta de valor completa seguindo o template, em 2–4 frases claras.",
      nivel: "Iniciante",
    },
  },
  "1-3": {
    exercicio: {
      titulo: "Desenhando Seu MVP em 30 Dias",
      descricao:
        "Escolha uma ideia de negócio (sua própria ou hipotética). Defina: 1) Qual é a hipótese mais arriscada que precisa ser validada? 2) Qual tipo de MVP você usaria para testá-la? 3) Quais seriam os 3 critérios de sucesso para o MVP? 4) Qual seria o plano de execução nos próximos 30 dias?",
      dica: "O MVP não é a versão 'barata' do produto final — é um experimento para aprender. Foque em validar a hipótese mais crítica, não em construir funcionalidades.",
      entrada_exemplo:
        "Ex: 'Quero validar se freelancers pagariam por um app de controle de contratos.'",
      saida_esperada:
        "Um plano de MVP em 4 tópicos: hipótese, tipo de MVP, critérios de sucesso e cronograma de 30 dias.",
      nivel: "Intermediário",
    },
  },
  "2-1": {
    exercicio: {
      titulo: "Preenchendo o Business Model Canvas",
      descricao:
        "Preencha os 9 blocos do Business Model Canvas para um negócio de sua escolha. Pode ser sua ideia atual, um negócio que admira ou um caso hipotético. Para cada bloco, escreva pelo menos 2 itens concretos.",
      dica: "Comece pelos blocos Segmento de Clientes e Proposta de Valor — eles são a âncora do modelo. Os outros blocos derivam dessas duas escolhas.",
      entrada_exemplo:
        "Blocos: Segmento de Clientes, Proposta de Valor, Canais, Relacionamento, Fontes de Receita, Recursos Principais, Atividades Principais, Parcerias, Estrutura de Custos.",
      saida_esperada:
        "Canvas preenchido com pelo menos 2 itens por bloco, de forma coerente entre si.",
      nivel: "Intermediário",
    },
  },
  "3-2": {
    exercicio: {
      titulo: "Criando Seu Pitch de Elevador",
      descricao:
        "Escreva seu pitch de elevador seguindo a estrutura de 5 partes: gancho, problema, solução, tração/prova e call to action. O pitch completo deve ter no máximo 150 palavras (equivalente a 60 segundos falados).",
      dica: "Leia em voz alta e cronometre. Se passar de 60 segundos, corte. Cada palavra precisa ganhar seu lugar. Evite jargões técnicos — qualquer pessoa deve entender.",
      entrada_exemplo:
        "Qualquer negócio real ou hipotético que você queira apresentar.",
      saida_esperada:
        "Pitch completo com as 5 partes identificadas, entre 100–150 palavras.",
      nivel: "Intermediário",
    },
  },
};

const EXERCICIO_GENERICO: ExercicioGerado = {
  exercicio: {
    titulo: "Reflexão Aplicada",
    descricao:
      "Com base no que você acabou de aprender neste tópico, descreva como você aplicaria esse conhecimento em um contexto real do seu dia a dia profissional ou em um negócio que você está desenvolvendo. Seja específico: cite um problema concreto que esse conhecimento ajudaria a resolver.",
    dica: "Conexão com a realidade é o que transforma conhecimento em competência. Quanto mais específico for seu exemplo, mais valioso será o aprendizado.",
    entrada_exemplo:
      "Qualquer situação profissional ou empreendedora que você esteja vivendo.",
    saida_esperada:
      "Uma resposta de 2–4 parágrafos conectando o conceito aprendido a uma situação real.",
    nivel: "Iniciante",
  },
};

export function getExercicioMock(dto: CreateExercicioDto): CreateExercicioResponse {
  const chave = dto.topico_id as unknown as string;
  const exercicioData = EXERCICIOS[chave] ?? EXERCICIO_GENERICO;

  return {
    status: "ok",
    linguagem: "Empreendedorismo",
    exercicio_id: `ex-${dto.jornada_id}-${dto.modulo_id}-${dto.topico_id}`,
    exercicio_gerado: JSON.stringify(exercicioData),
    dica: exercicioData.exercicio.dica,
    reutilizado: false,
  };
}

export function getCorrecaoMock(): CorrigirExercicioResponse {
  return {
    correcao: {
      avaliacao:
        "Boa resposta! Você demonstrou compreensão dos conceitos principais e soube conectá-los a um contexto prático.",
      melhorias: [
        "Tente ser ainda mais específico nos exemplos — números e dados concretos tornam a análise mais convincente.",
        "Considere explorar os possíveis obstáculos ou riscos da abordagem que você descreveu.",
        "Reflita sobre como você mediria o sucesso da estratégia que propôs.",
      ],
      cometario_final:
        "Você está no caminho certo! O próximo passo é colocar em prática algum desses aprendizados — mesmo que em escala pequena. A aplicação real é o que consolida o conhecimento.",
    },
  };
}
