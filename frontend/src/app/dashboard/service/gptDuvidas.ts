import { getMockChatResponse } from "@/mocks/chat";

export async function tirarDuvidasGpt(jornadaId: string, pergunta: string) {
  console.info("Mock chat:", { jornadaId, pergunta });
  await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));
  return { resposta: getMockChatResponse(pergunta) };
}
