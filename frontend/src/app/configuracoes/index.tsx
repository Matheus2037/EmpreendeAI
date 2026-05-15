import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";

type Tema = "claro" | "escuro";

export function ConfiguracoesPage() {
  const [tema, setTema] = useState<Tema>("escuro");

  return (
    <div className="max-w-2xl mx-auto w-full flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Configurações</h1>

      {/* Segurança */}
      <section className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5">
        <div>
          <h2 className="text-sm font-semibold">Segurança</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Altere sua senha de acesso</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor="senha-atual">
              Senha atual
            </label>
            <Input id="senha-atual" type="password" placeholder="••••••••" disabled />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor="nova-senha">
              Nova senha
            </label>
            <Input id="nova-senha" type="password" placeholder="••••••••" disabled />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor="confirmar-senha">
              Confirmar nova senha
            </label>
            <Input id="confirmar-senha" type="password" placeholder="••••••••" disabled />
          </div>
        </div>

        <div className="flex justify-end">
          <Button size="sm" disabled>
            Alterar senha
          </Button>
        </div>
      </section>

      {/* Notificações */}
      <section className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5">
        <div>
          <h2 className="text-sm font-semibold">Notificações</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Escolha quais notificações deseja receber
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {[
            {
              id: "notif-trilha",
              label: "Progresso nas trilhas",
              desc: "Receba lembretes para continuar suas trilhas de aprendizagem",
              defaultChecked: true,
            },
            {
              id: "notif-noticias",
              label: "Novidades e notícias",
              desc: "Fique por dentro das últimas notícias sobre empreendedorismo",
              defaultChecked: true,
            },
            {
              id: "notif-conteudos",
              label: "Novos conteúdos",
              desc: "Seja avisado quando novos conteúdos forem adicionados à plataforma",
              defaultChecked: false,
            },
          ].map(({ id, label, desc, defaultChecked }) => (
            <div key={id} className="flex items-start gap-3">
              <Checkbox id={id} defaultChecked={defaultChecked} className="mt-0.5" disabled />
              <div className="flex flex-col gap-0.5">
                <label htmlFor={id} className="text-sm font-medium cursor-default">
                  {label}
                </label>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button size="sm" disabled>
            Salvar preferências
          </Button>
        </div>
      </section>

      {/* Aparência */}
      <section className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5">
        <div>
          <h2 className="text-sm font-semibold">Aparência</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Escolha o tema da interface</p>
        </div>

        <div className="flex gap-3">
          {(["claro", "escuro"] as Tema[]).map((t) => (
            <button
              key={t}
              onClick={() => setTema(t)}
              className={cn(
                "flex flex-col items-center gap-2 px-6 py-4 rounded-xl border-2 transition-colors text-sm font-medium",
                tema === t
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:border-muted-foreground/40"
              )}
            >
              {t === "claro" ? <Sun className="size-5" /> : <Moon className="size-5" />}
              {t === "claro" ? "Claro" : "Escuro"}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          A alteração de tema estará disponível em breve.
        </p>
      </section>
    </div>
  );
}
