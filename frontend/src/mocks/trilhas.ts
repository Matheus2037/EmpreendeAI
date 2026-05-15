import type { JornadaResponse } from "@/app/dashboard/service/types/jornada";
import type { ConteudoJornadaResponse } from "@/app/jornada/service/types/conteudoJornadaResponse";

export const TRILHAS_CARDS: JornadaResponse[] = [
  {
    uid: "trilha-1",
    linguagem: {
      uid: "area-1",
      nome: "Minha Primeira Empresa",
      cor: "#f97316",
      url: "",
      sigla: "empresa",
    },
    progresso_percent: 35,
  },
  {
    uid: "trilha-2",
    linguagem: {
      uid: "area-2",
      nome: "Comunicação & Liderança",
      cor: "#3b82f6",
      url: "",
      sigla: "softskills",
    },
    progresso_percent: 10,
  },
  {
    uid: "trilha-3",
    linguagem: {
      uid: "area-3",
      nome: "Do MVP ao Primeiro Cliente",
      cor: "#8b5cf6",
      url: "",
      sigla: "mvp",
    },
    progresso_percent: 0,
  },
];

export const TRILHAS_CONTEUDO: Record<string, ConteudoJornadaResponse> = {
  "trilha-1": {
    uid: "trilha-1",
    jornada: TRILHAS_CARDS[0],
    roadmap: [
      {
        uid: 1,
        title: "Validação da Ideia",
        concluido: true,
        subtopicos: [
          {
            uid: "1-1",
            title: "Pesquisa de Mercado",
            concluido: true,
            conteudo: {
              topico: "Como identificar e validar seu mercado-alvo",
              detalhes:
                "Antes de investir tempo e dinheiro, é essencial entender quem são seus clientes potenciais, quais são suas dores reais e se existe demanda suficiente para o seu produto ou serviço. Uma boa pesquisa de mercado combina dados quantitativos (tamanho do mercado, tendências) com dados qualitativos (entrevistas, observações).",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=4Mdo_QLndN8",
                },
                {
                  tipo: "documentacao",
                  url: "https://sebrae.com.br/sites/PortalSebrae/artigos/como-fazer-pesquisa-de-mercado",
                },
              ],
              exemplos: [
                {
                  titulo: "Caso: Validação antes do lançamento",
                  codigo:
                    "Uma empreendedora tinha a ideia de criar uma loja de marmitas fitness. Antes de alugar um espaço, ela entrevistou 50 pessoas no bairro, criou um formulário online e testou vendas via WhatsApp por 30 dias. Com os dados em mãos, ajustou o cardápio e o preço antes de abrir oficialmente — economizando meses de prejuízo.",
                },
              ],
            },
          },
          {
            uid: "1-2",
            title: "Proposta de Valor",
            concluido: true,
            conteudo: {
              topico: "Articular claramente o que torna sua oferta única",
              detalhes:
                "A proposta de valor é a promessa que você faz ao cliente: qual problema você resolve, como você resolve melhor do que a concorrência e qual benefício concreto o cliente obtém. Uma boa proposta de valor é específica, mensurável e orientada ao cliente — não ao produto.",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=q8d9uuO1Cf4",
                },
              ],
              exemplos: [
                {
                  titulo: "Template de proposta de valor",
                  codigo:
                    "Para [cliente-alvo] que [problema/necessidade], o [nome do produto] é um [categoria] que [benefício principal]. Diferente de [alternativa atual], nosso produto [diferencial único].\n\nExemplo: Para pequenos restaurantes que perdem vendas por não terem delivery organizado, o MenuFácil é um sistema de gestão que automatiza pedidos online. Diferente de apps de terceiros que cobram 30% de comissão, nossa solução cobra uma taxa fixa mensal.",
                },
              ],
            },
          },
          {
            uid: "1-3",
            title: "MVP Enxuto",
            concluido: false,
            conteudo: {
              topico: "Lançar a versão mínima viável do seu produto",
              detalhes:
                "O MVP (Minimum Viable Product) é a versão mais simples do seu produto que ainda entrega valor real ao cliente e permite coletar aprendizados. O objetivo não é lançar algo perfeito, mas aprender o máximo possível com o mínimo de investimento. Um MVP pode ser uma landing page, um protótipo manual ou até um atendimento via WhatsApp.",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=1hTI4z2ijc4",
                },
                {
                  tipo: "documentacao",
                  url: "https://endeavor.org.br/estrategia-e-gestao/mvp/",
                },
              ],
              exemplos: [
                {
                  titulo: "Tipos de MVP e quando usar cada um",
                  codigo:
                    "1. MVP Concierge: você realiza o serviço manualmente para validar a demanda antes de automatizar.\n2. MVP Landing Page: crie uma página explicando o produto e capture e-mails de interessados.\n3. MVP Produto Físico: produza 10–20 unidades artesanalmente e venda para clientes reais.\n4. MVP Wizard of Oz: pareça automatizado por fora, mas o trabalho é feito manualmente por dentro.",
                },
              ],
            },
          },
        ],
      },
      {
        uid: 2,
        title: "Modelo de Negócio",
        concluido: false,
        subtopicos: [
          {
            uid: "2-1",
            title: "Business Model Canvas",
            concluido: false,
            conteudo: {
              topico: "Visualizar o modelo de negócio em 9 blocos",
              detalhes:
                "O Business Model Canvas (BMC) é uma ferramenta visual que permite mapear, descrever e testar o modelo de negócio de uma empresa em uma única página. Ele é composto por 9 blocos: Segmentos de Clientes, Proposta de Valor, Canais, Relacionamento, Fontes de Receita, Recursos Principais, Atividades Principais, Parcerias e Estrutura de Custos.",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=IP0cUBWTgpY",
                },
                {
                  tipo: "documentacao",
                  url: "https://www.sebrae.com.br/sites/PortalSebrae/artigos/o-que-e-business-model-canvas",
                },
              ],
              exemplos: [
                {
                  titulo: "Como preencher o BMC — dicas práticas",
                  codigo:
                    "Comece pelos blocos mais importantes: 1) Segmento de Clientes — quem são seus clientes? 2) Proposta de Valor — o que você entrega a eles? 3) Canais — como você os alcança? Depois complete os demais blocos. Revise o canvas a cada semana conforme aprende mais sobre seu negócio.",
                },
              ],
            },
          },
          {
            uid: "2-2",
            title: "Fontes de Receita",
            concluido: false,
            conteudo: {
              topico: "Definir como e quanto o negócio vai ganhar",
              detalhes:
                "As fontes de receita descrevem como a empresa captura valor de seus clientes. Os modelos mais comuns incluem: venda direta, assinatura recorrente, taxa por uso, licenciamento, publicidade, freemium e marketplace. Entender qual modelo se encaixa melhor ao seu segmento é decisivo para a viabilidade financeira.",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=VDvr08sCPOc",
                },
              ],
              exemplos: [
                {
                  titulo: "Comparativo de modelos de receita",
                  codigo:
                    "Venda única: simples, mas sem recorrência.\nAssinatura: previsibilidade de caixa, exige retenção.\nFreemium: volume de usuários gratuitos → converte fração em pagante.\nMarketplace: cresce com o ecossistema, take-rate sobre transações.",
                },
              ],
            },
          },
          {
            uid: "2-3",
            title: "Estrutura de Custos",
            concluido: false,
            conteudo: {
              topico: "Mapear todos os custos do negócio",
              detalhes:
                "A estrutura de custos descreve todos os gastos necessários para operar o modelo de negócio. Custos podem ser fixos (independem do volume) ou variáveis (escalam com a produção). Separar custos diretos de indiretos e entender o ponto de equilíbrio (break-even) são etapas fundamentais para saber quando o negócio será sustentável.",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=i8YMk_EHzEM",
                },
              ],
              exemplos: [
                {
                  titulo: "Planilha mental de custos",
                  codigo:
                    "Fixos: aluguel, salário, assinaturas de software.\nVariáveis: matéria-prima, comissão de vendas, embalagem.\nPonto de equilíbrio = Custos Fixos ÷ (Preço unitário − Custo variável unitário).",
                },
              ],
            },
          },
        ],
      },
      {
        uid: 3,
        title: "Primeiras Vendas",
        concluido: false,
        subtopicos: [
          {
            uid: "3-1",
            title: "Abordagem ao Cliente",
            concluido: false,
            conteudo: {
              topico: "Técnicas de prospecção e primeiro contato",
              detalhes:
                "Vender é uma habilidade que pode ser aprendida. A abordagem ao cliente começa muito antes da primeira conversa: entender o perfil ideal, pesquisar o contexto da pessoa ou empresa e personalizar a mensagem. No primeiro contato, o foco deve ser em escutar e entender o problema do cliente, não em falar sobre o produto.",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=8qoKUMXNDzE",
                },
              ],
              exemplos: [
                {
                  titulo: "Script de primeiro contato",
                  codigo:
                    "1. Personalização: mencione algo específico da realidade do cliente.\n2. Valor imediato: ofereça uma informação útil antes de pedir algo.\n3. Pergunta aberta: termine com uma pergunta que convida ao diálogo.\nEx: 'Vi que sua loja está crescendo nas redes. Muitas lojas no seu segmento têm dificuldade em converter seguidores em clientes — isso é algo que você enfrenta também?'",
                },
              ],
            },
          },
          {
            uid: "3-2",
            title: "Pitch de Elevador",
            concluido: false,
            conteudo: {
              topico: "Apresentar seu negócio em 60 segundos",
              detalhes:
                "O pitch de elevador é uma apresentação breve e impactante do seu negócio — curta o suficiente para ser feita durante uma viagem de elevador. Um bom pitch responde: o que você faz, para quem, qual problema resolve e por que você é diferente. Deve despertar curiosidade, não explicar tudo.",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=bZTWx2bftaw",
                },
              ],
              exemplos: [
                {
                  titulo: "Estrutura de um pitch eficaz",
                  codigo:
                    "1. Gancho (5s): dado surpreendente ou pergunta provocativa.\n2. Problema (10s): a dor real do cliente.\n3. Solução (15s): como você resolve de forma única.\n4. Tração (10s): prova social ou resultado concreto.\n5. Call to action (5s): o que você quer que a pessoa faça agora.",
                },
              ],
            },
          },
          {
            uid: "3-3",
            title: "Precificação",
            concluido: false,
            conteudo: {
              topico: "Definir o preço certo para seu produto ou serviço",
              detalhes:
                "Precificar corretamente é um dos maiores desafios do empreendedor iniciante. Muitos erram ao basear o preço apenas nos custos, esquecendo o valor percebido pelo cliente e o posicionamento de mercado. Existem três abordagens principais: custo + margem, preço de mercado e valor percebido.",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=NkYLzSZVoGo",
                },
                {
                  tipo: "documentacao",
                  url: "https://sebrae.com.br/sites/PortalSebrae/artigos/como-precificar-seu-produto-ou-servico",
                },
              ],
              exemplos: [
                {
                  titulo: "Fórmula base de precificação",
                  codigo:
                    "Preço mínimo = (Custo direto + Custo fixo proporcional) ÷ (1 − Margem desejada%)\n\nExemplo: produto custa R$20 para produzir, custos fixos mensais são R$3.000 e você vende 150 unidades/mês.\nCusto fixo por unidade = R$3.000 ÷ 150 = R$20\nPreço mínimo com 30% de margem = (R$20 + R$20) ÷ 0,70 = R$57,14",
                },
              ],
            },
          },
        ],
      },
    ],
  },

  "trilha-2": {
    uid: "trilha-2",
    jornada: TRILHAS_CARDS[1],
    roadmap: [
      {
        uid: 1,
        title: "Comunicação Assertiva",
        concluido: false,
        subtopicos: [
          {
            uid: "1-1",
            title: "Escuta Ativa",
            concluido: true,
            conteudo: {
              topico: "Ouvir para entender, não para responder",
              detalhes:
                "A escuta ativa é a capacidade de ouvir com total atenção, sem julgamentos e sem preparar a resposta enquanto o outro fala. É uma das habilidades mais valorizadas no mercado de trabalho e a base de qualquer relação profissional sólida. Envolve contato visual, linguagem corporal aberta, perguntas de aprofundamento e paráfrase.",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=BQ4JuQFEOEw",
                },
              ],
              exemplos: [
                {
                  titulo: "Técnica do espelho",
                  codigo:
                    "Repita as últimas palavras do que a pessoa disse em forma de pergunta: 'Você está dizendo que o prazo é o principal problema?' Isso demonstra atenção e convida o interlocutor a aprofundar o raciocínio.",
                },
              ],
            },
          },
          {
            uid: "1-2",
            title: "Comunicação Não-Violenta",
            concluido: false,
            conteudo: {
              topico: "Expressar necessidades sem gerar conflitos",
              detalhes:
                "A Comunicação Não-Violenta (CNV), desenvolvida por Marshall Rosenberg, propõe uma forma de se expressar que conecta em vez de separar. O modelo tem 4 componentes: Observação (fatos sem julgamento), Sentimento (como me sinto), Necessidade (o que preciso) e Pedido (ação concreta e possível).",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=JoGsJDHxJLo",
                },
              ],
              exemplos: [
                {
                  titulo: "Comparativo: CNV vs comunicação reativa",
                  codigo:
                    "Reativo: 'Você sempre entrega tudo atrasado!'\nCNV: 'Percebi que o relatório chegou dois dias depois do combinado (observação). Fiquei preocupado pois precisamos fechar os números da semana (sentimento/necessidade). Podemos alinhar um prazo que funcione para os dois?' (pedido)",
                },
              ],
            },
          },
          {
            uid: "1-3",
            title: "Feedback Construtivo",
            concluido: false,
            conteudo: {
              topico: "Dar e receber feedback de forma produtiva",
              detalhes:
                "Feedback é uma das ferramentas mais poderosas de desenvolvimento. Saber dar feedback de forma clara, específica e orientada ao comportamento (não à pessoa) é uma competência essencial para líderes e profissionais de alto desempenho. Igualmente importante é aprender a receber feedback sem defensividade.",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=v1Tq_tU2A2A",
                },
              ],
              exemplos: [
                {
                  titulo: "Modelo SBI de feedback",
                  codigo:
                    "S — Situação: descreva o contexto específico.\nB — Comportamento: cite o comportamento observado (não a intenção).\nI — Impacto: explique o efeito que teve.\n\nEx: 'Na reunião de ontem (S), você interrompeu o colega 3 vezes (B), o que fez a equipe perder o raciocínio e a reunião se estendeu 30 minutos (I).'",
                },
              ],
            },
          },
        ],
      },
      {
        uid: 2,
        title: "Liderança na Prática",
        concluido: false,
        subtopicos: [
          {
            uid: "2-1",
            title: "Estilos de Liderança",
            concluido: false,
            conteudo: {
              topico: "Conhecer e adaptar seu estilo de liderança",
              detalhes:
                "Não existe um estilo único de liderança ideal para todas as situações. Os principais estilos são: autocrático (decisão centralizada), democrático (participativo), coaching (desenvolvimento da equipe) e laissez-faire (autonomia). Líderes de alta performance adaptam seu estilo conforme a maturidade da equipe e a urgência da situação.",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=rHwsHqLBYlU",
                },
              ],
              exemplos: [
                {
                  titulo: "Quando usar cada estilo",
                  codigo:
                    "Crise/urgência → Autocrático (decisão rápida necessária).\nEquipe experiente → Laissez-faire (confiança e autonomia).\nDesenvolvimento individual → Coaching (foco no crescimento).\nDecisão estratégica → Democrático (aproveitar conhecimento coletivo).",
                },
              ],
            },
          },
          {
            uid: "2-2",
            title: "Delegação Eficaz",
            concluido: false,
            conteudo: {
              topico: "Delegar tarefas sem perder o controle",
              detalhes:
                "A delegação é a habilidade de transferir responsabilidades para outras pessoas de forma estruturada, mantendo a visibilidade do progresso e garantindo a qualidade do resultado. Delegar bem é diferente de simplesmente passar tarefas — envolve clareza do objetivo, definição de critérios de sucesso e check-ins regulares.",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=oX7rl5Lp_54",
                },
              ],
              exemplos: [
                {
                  titulo: "Os 5 níveis de delegação",
                  codigo:
                    "1. Faça exatamente o que eu disse.\n2. Pesquise e me apresente opções, eu decido.\n3. Recomende uma opção, eu aprovo antes de agir.\n4. Decida e aja, mas me informe imediatamente.\n5. Decida e aja, me informe apenas na revisão periódica.",
                },
              ],
            },
          },
          {
            uid: "2-3",
            title: "Gestão de Conflitos",
            concluido: false,
            conteudo: {
              topico: "Transformar conflitos em oportunidades de crescimento",
              detalhes:
                "Conflitos são inevitáveis em qualquer ambiente de trabalho. O que diferencia líderes eficazes é a capacidade de abordar conflitos de forma direta, imparcial e focada na solução. Ignorar conflitos é a pior estratégia — eles tendem a escalar e corroer o clima organizacional.",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=7h1R5xvdnhU",
                },
              ],
              exemplos: [
                {
                  titulo: "Framework para resolução de conflitos",
                  codigo:
                    "1. Reúna as partes separadamente primeiro para entender cada perspectiva.\n2. Identifique o problema real (nem sempre é o que parece na superfície).\n3. Facilite uma conversa focada em interesses, não em posições.\n4. Co-crie uma solução que funcione para os dois lados.\n5. Defina compromissos claros e acompanhe.",
                },
              ],
            },
          },
        ],
      },
    ],
  },

  "trilha-3": {
    uid: "trilha-3",
    jornada: TRILHAS_CARDS[2],
    roadmap: [
      {
        uid: 1,
        title: "Do Problema à Solução",
        concluido: false,
        subtopicos: [
          {
            uid: "1-1",
            title: "Design Thinking",
            concluido: false,
            conteudo: {
              topico: "Resolver problemas com foco no usuário",
              detalhes:
                "O Design Thinking é uma abordagem centrada no ser humano para resolver problemas complexos. Suas etapas são: Empatizar (entender profundamente o usuário), Definir (articular o problema real), Idear (gerar muitas soluções sem julgamento), Prototipar (criar versões rápidas e baratas) e Testar (validar com usuários reais).",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=gHGN6L5QX-4",
                },
              ],
              exemplos: [
                {
                  titulo: "Aplicando Design Thinking em 1 dia",
                  codigo:
                    "Manhã: entreviste 5 clientes potenciais (20 min cada) sobre suas rotinas e dores.\nTarde: agrupe os insights em padrões e defina o problema central em uma frase.\nFim do dia: esboce 3 soluções diferentes em papel e mostre para 2 pessoas.\nNo dia seguinte: itere com base no feedback.",
                },
              ],
            },
          },
          {
            uid: "1-2",
            title: "Jobs To Be Done",
            concluido: false,
            conteudo: {
              topico: "Entender o trabalho real que o cliente quer realizar",
              detalhes:
                "A teoria Jobs To Be Done (JTBD), popularizada por Clayton Christensen, afirma que as pessoas não compram produtos — elas 'contratam' soluções para realizar um 'trabalho' em suas vidas. Entender esse trabalho profundamente (funcional, emocional e social) permite criar produtos e mensagens muito mais eficazes.",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=sfGtd2bZenI",
                },
              ],
              exemplos: [
                {
                  titulo: "O milkshake que mudou um negócio",
                  codigo:
                    "A McDonald's queria aumentar as vendas de milkshake. Ao pesquisar JTBD, descobriram que a maioria das vendas ocorria de manhã, por pessoas em viagens longas de carro sozinhas. O 'trabalho' não era 'tomar um milkshake' — era 'ter algo para fazer durante a viagem e saciar a fome até o almoço'. A solução foi tornar o milkshake mais espesso para durar mais.",
                },
              ],
            },
          },
        ],
      },
      {
        uid: 2,
        title: "Construindo o MVP",
        concluido: false,
        subtopicos: [
          {
            uid: "2-1",
            title: "Priorização de Features",
            concluido: false,
            conteudo: {
              topico: "Decidir o que construir primeiro",
              detalhes:
                "Um dos erros mais comuns de founders é tentar construir tudo ao mesmo tempo. A priorização eficaz usa frameworks como a Matriz de Eisenhower (urgente × importante) ou o método MoSCoW (Must have, Should have, Could have, Won't have) para focar no que realmente importa para a primeira versão.",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=RvTv5UKhFSM",
                },
              ],
              exemplos: [
                {
                  titulo: "MoSCoW aplicado a um produto digital",
                  codigo:
                    "Must: cadastro de usuário, funcionalidade core, pagamento.\nShould: notificações, histórico de atividades.\nCould: temas visuais, exportação de dados.\nWon't (agora): app mobile, integração com terceiros.",
                },
              ],
            },
          },
          {
            uid: "2-2",
            title: "Métricas do MVP",
            concluido: false,
            conteudo: {
              topico: "Medir o que importa desde o início",
              detalhes:
                "Definir as métricas corretas antes de lançar o MVP evita a armadilha de medir vaidades (curtidas, pageviews) em vez de indicadores que revelam aprendizados reais. As métricas mais úteis para um MVP são: taxa de ativação, retenção de 7/30 dias, Net Promoter Score e receita recorrente.",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=n_yHZ_vKjno",
                },
              ],
              exemplos: [
                {
                  titulo: "Framework AARRR (Pirate Metrics)",
                  codigo:
                    "Acquisition: como os usuários chegam até você?\nActivation: qual % tem uma boa primeira experiência?\nRetention: qual % volta a usar?\nReferral: qual % indica para outros?\nRevenue: qual % converte em pagamento?\n\nFoque em Activation e Retention primeiro — são as mais reveladoras para um MVP.",
                },
              ],
            },
          },
        ],
      },
      {
        uid: 3,
        title: "Conquistando os Primeiros Clientes",
        concluido: false,
        subtopicos: [
          {
            uid: "3-1",
            title: "Marketing de Conteúdo",
            concluido: false,
            conteudo: {
              topico: "Atrair clientes com conteúdo relevante",
              detalhes:
                "O marketing de conteúdo consiste em criar e distribuir conteúdo valioso e relevante para atrair e reter clientes potenciais. Para startups e pequenas empresas, é uma das estratégias mais custo-efetivas: em vez de interromper o público com anúncios, você educa, inspira ou entretém — construindo autoridade e confiança ao longo do tempo.",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=Kdl_aPDiAv8",
                },
              ],
              exemplos: [
                {
                  titulo: "Estratégia de conteúdo para fase inicial",
                  codigo:
                    "Semana 1-4: documente sua jornada de criação do produto (build in public).\nSemana 5-8: responda as 10 perguntas mais frequentes dos seus primeiros usuários.\nSemana 9-12: publique estudos de caso dos primeiros resultados.\nFormato: comece com um canal só — LinkedIn, Instagram ou blog — e vá bem nele antes de expandir.",
                },
              ],
            },
          },
          {
            uid: "3-2",
            title: "Vendas Consultivas",
            concluido: false,
            conteudo: {
              topico: "Vender resolvendo problemas, não empurrando produto",
              detalhes:
                "A venda consultiva é uma abordagem onde o vendedor atua como consultor, focando em entender o problema do cliente antes de apresentar a solução. É especialmente eficaz para produtos ou serviços complexos, ticket médio alto ou ciclo de vendas longo. A chave é fazer as perguntas certas e ouvir mais do que falar.",
              anexos: [
                {
                  tipo: "video",
                  url: "https://www.youtube.com/watch?v=OmKGCRRkqo4",
                },
              ],
              exemplos: [
                {
                  titulo: "Framework SPIN de vendas",
                  codigo:
                    "S — Situação: 'Como você gerencia X hoje?'\nP — Problema: 'Quais dificuldades você enfrenta nesse processo?'\nI — Implicação: 'O que acontece quando esse problema não é resolvido?'\nN — Need-payoff: 'Se você resolvesse isso, como impactaria seu negócio?'\n\nO cliente chega à conclusão de que precisa da sua solução — você não precisa forçar.",
                },
              ],
            },
          },
        ],
      },
    ],
  },
};
