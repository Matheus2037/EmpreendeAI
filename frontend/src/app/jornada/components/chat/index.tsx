import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal } from "lucide-react";
import { MensagemEnviada } from "./mensagemEnviada";
import { MensagemRecebida } from "./mensagemRecebida";
import { useEffect, useRef, useState } from "react";
import { tirarDuvidasGpt } from "@/app/dashboard/service/gptDuvidas";
import { useParams } from "react-router-dom";

export function ChatJornada() {
  const { idJornada } = useParams();
  const [conversa, setConversa] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversa]);

  useEffect(() => {
    if (!isLoading && conversa.length) {
      textAreaRef.current?.focus();
    }
  }, [isLoading, conversa]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const pergunta = formData.get("pergunta") as string;

    if (!pergunta.trim() || !idJornada) return;

    setConversa((conversas) => [...conversas, pergunta]);
    setIsLoading(true);

    const formElement = e.target as HTMLFormElement;
    formElement.reset();

    await tirarDuvidasGpt(idJornada, pergunta)
      .then((response) => {
        if (response)
          setConversa((prevConversas) => [...prevConversas, response.resposta]);
      })
      .catch(() => {
        if (textAreaRef.current) {
          setConversa((prevConversa) => prevConversa.slice(0, -1));
          textAreaRef.current.value = pergunta;
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <section className="size-full max-h-[calc(100vh-270px)] max-w-[26rem] h-full bg-card rounded-xl p-6 flex flex-col">
      <h2 className="text-xl font-semibold text-center mb-6">
        Pergunte sobre a trilha 😁
      </h2>

      <div className="space-y-4 flex-1 min-h-0 overflow-y-auto">
        {conversa.map((mensagem, index) => {
          return index % 2 === 0 ? (
            <MensagemEnviada key={index}>{mensagem}</MensagemEnviada>
          ) : (
            <MensagemRecebida key={index}>{mensagem}</MensagemRecebida>
          );
        })}

        {isLoading && (
          <MensagemRecebida>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-current rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-current rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </MensagemRecebida>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form className="mt-6 flex gap-4 items-center" onSubmit={handleSubmit}>
        <Textarea
          ref={textAreaRef}
          name="pergunta"
          className="h-18 resize-none"
          placeholder="Digite sua pergunta..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
          disabled={isLoading}
        />
        <Button className="rounded-full size-12" disabled={isLoading}>
          <SendHorizonal />
        </Button>
      </form>
    </section>
  );
}
