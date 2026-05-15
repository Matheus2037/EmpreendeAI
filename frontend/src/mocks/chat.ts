const RESPOSTAS: Array<{ palavras: string[]; resposta: string }> = [
  {
    palavras: ["canvas", "bmc", "modelo de negócio", "modelo de negocio"],
    resposta:
      "O Business Model Canvas é uma ferramenta visual dividida em 9 blocos que descrevem como uma empresa cria, entrega e captura valor. Os blocos mais importantes para começar são: Segmento de Clientes (quem você atende), Proposta de Valor (o que você oferece) e Fontes de Receita (como você ganha dinheiro). Recomendo preencher o canvas em post-its e revisá-lo toda semana — ele vai mudar muito nos primeiros meses.",
  },
  {
    palavras: ["mvp", "produto mínimo", "versão inicial", "primeiro produto"],
    resposta:
      "MVP significa Minimum Viable Product — a versão mais simples do seu produto que ainda entrega valor real e permite aprender com clientes reais. O erro mais comum é querer fazer um MVP 'completo'. Comece com o mínimo absoluto: pode ser uma landing page, um atendimento via WhatsApp ou até um processo manual. O objetivo é aprender, não impressionar.",
  },
  {
    palavras: ["validar", "validação", "testar ideia", "pesquisa"],
    resposta:
      "Validar uma ideia significa reunir evidências de que existe um problema real e que pessoas pagariam pela sua solução — antes de investir tempo e dinheiro construindo algo. A forma mais eficaz é conversar diretamente com 10–20 potenciais clientes. Pergunte sobre os problemas deles, não sobre a sua ideia. Ouça mais do que fale.",
  },
  {
    palavras: ["precificação", "preço", "quanto cobrar", "valor"],
    resposta:
      "Precificar é uma das decisões mais importantes e menos intuitivas do empreendimento. Evite o erro de basear o preço apenas nos seus custos — o preço deve refletir o valor percebido pelo cliente. Uma fórmula básica: some seus custos diretos + proporcional dos custos fixos, aplique a margem desejada. Depois pesquise o mercado e ajuste com base no posicionamento que você quer.",
  },
  {
    palavras: ["pitch", "apresentação", "apresentar", "investidor"],
    resposta:
      "Um bom pitch tem 5 elementos: 1) Gancho — algo que prende a atenção em 5 segundos; 2) Problema — a dor real do cliente; 3) Solução — como você resolve de forma única; 4) Tração — prova de que está funcionando (usuários, receita, contratos); 5) Call to action — o que você quer que a pessoa faça agora. Pratique em voz alta até conseguir fazer em 60 segundos.",
  },
  {
    palavras: ["comunicação", "comunicar", "falar", "apresentar"],
    resposta:
      "Comunicação eficaz é uma habilidade que se aprende. Três princípios fundamentais: 1) Conheça seu público — adapte a linguagem e o nível de profundidade; 2) Estruture antes de falar — use começo, meio e fim; 3) Escute mais do que fala — a comunicação é uma via de mão dupla. Para apresentações, pratique pelo menos 3 vezes em voz alta antes.",
  },
  {
    palavras: ["liderança", "líder", "equipe", "time"],
    resposta:
      "Liderança não é sobre cargo — é sobre influência. Os líderes mais eficazes adaptam seu estilo à situação: mais diretivos em crises, mais participativos em decisões estratégicas, mais coach quando o objetivo é desenvolver a equipe. O primeiro passo para se tornar um líder melhor é desenvolver autoconsciência — entender seus pontos fortes e limitações.",
  },
  {
    palavras: ["conflito", "desentendimento", "briga", "problema com"],
    resposta:
      "Conflitos bem gerenciados fortalecem equipes — conflitos mal gerenciados as destroem. Quando surgir um conflito: 1) Ouça as duas partes separadamente antes de qualquer intervenção; 2) Foque no problema, não nas pessoas; 3) Busque soluções que atendam os interesses de ambos os lados, não apenas posições. A maioria dos conflitos tem raiz em expectativas não alinhadas ou falhas de comunicação.",
  },
  {
    palavras: ["feedback", "avaliação", "retorno", "crítica"],
    resposta:
      "Feedback construtivo deve ser específico, focado em comportamentos observáveis (não em julgamentos de personalidade) e orientado ao futuro. Use o modelo SBI: Situação (contexto), Comportamento (o que foi observado) e Impacto (qual foi o efeito). Ao receber feedback, resista ao impulso de se defender — ouça com curiosidade e pergunte exemplos concretos.",
  },
  {
    palavras: ["financeiro", "finanças", "fluxo de caixa", "dinheiro"],
    resposta:
      "O controle financeiro é o que separa negócios que sobrevivem dos que fecham nos primeiros anos. Comece com o básico: separe conta pessoal da conta do negócio, registre todas as entradas e saídas, projete o fluxo de caixa dos próximos 3 meses. Conheça seu ponto de equilíbrio — o faturamento mínimo para cobrir todos os custos.",
  },
];

const RESPOSTA_PADRAO =
  "Essa é uma ótima pergunta! Para responder de forma mais precisa, precisaria de mais contexto sobre a sua situação específica. Mas de forma geral: pesquise referências de quem já enfrentou esse desafio, teste em pequena escala antes de comprometer muitos recursos, e meça os resultados para aprender e ajustar. Se quiser aprofundar, reformule a pergunta com mais detalhes sobre o seu contexto.";

export function getMockChatResponse(pergunta: string): string {
  const texto = pergunta.toLowerCase();

  for (const item of RESPOSTAS) {
    if (item.palavras.some((p) => texto.includes(p))) {
      return item.resposta;
    }
  }

  return RESPOSTA_PADRAO;
}
