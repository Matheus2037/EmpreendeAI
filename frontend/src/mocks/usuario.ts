export const USUARIO_MOCK = {
  uid: "mock-user-123",
  displayName: "Empreendedor Demo",
  email: "demo@empreende.ai",
  photoURL: null,
};

export const PERFIL_STORAGE_KEY = "empreende-ai:perfil";
export const FAVORITAS_STORAGE_KEY = "empreende-ai:favoritas";
export const IMPORTADAS_STORAGE_KEY = "empreende-ai:importadas";

export type PerfilLinks = {
  linkedin: string;
  portfolio: string;
  github: string;
  instagram: string;
};

export type PerfilEditavel = {
  bio: string;
  cargo: string;
  areaAtuacao: string;
  objetivo: string;
  habilidades: string[];
  links: PerfilLinks;
  bannerColorIndex: number;
};

export const PERFIL_DEFAULT: PerfilEditavel = {
  bio: "Empreendedor apaixonado por tecnologia e inovação. Buscando desenvolver habilidades para transformar ideias em negócios de impacto real. Acredito que aprendizado contínuo é o maior diferencial competitivo de qualquer empreendedor.",
  cargo: "Fundador & CEO",
  areaAtuacao: "Tecnologia & Inovação",
  objetivo: "Lançar meu primeiro produto digital até o final do ano",
  habilidades: ["Vendas", "Liderança", "Estratégia", "Produto"],
  links: {
    linkedin: "https://linkedin.com/in/empreendeai-demo",
    portfolio: "",
    github: "https://github.com/empreendeai-demo",
    instagram: "",
  },
  bannerColorIndex: 0,
};

export const BANNER_PRESETS = [
  { name: "Âmbar", color: "#f97316" },
  { name: "Azul", color: "#3b82f6" },
  { name: "Verde", color: "#10b981" },
  { name: "Roxo", color: "#8b5cf6" },
  { name: "Rosa", color: "#f43f5e" },
  { name: "Ardósia", color: "#64748b" },
];

export const AREAS_ATUACAO = [
  "Tecnologia & Inovação",
  "Marketing & Crescimento",
  "Vendas & Negócios",
  "Finanças & Investimentos",
  "Gestão & Liderança",
  "Design & Produto",
  "Recursos Humanos",
  "Operações & Logística",
  "Empreendedorismo",
  "Educação & Capacitação",
];

export const HABILIDADES_SUGERIDAS = [
  "Liderança",
  "Vendas",
  "Marketing",
  "Produto",
  "UX",
  "Gestão",
  "Estratégia",
  "Inovação",
  "Comunicação",
  "Finanças",
  "Growth",
  "Tecnologia",
];

export const STATS_MOCK = {
  trilhasConcluidas: 1,
  trilhasEmAndamento: 4,
  tempoAcumulado: "14h 30min",
  streak: 7,
  dataCadastro: "2025-01-15",
};
