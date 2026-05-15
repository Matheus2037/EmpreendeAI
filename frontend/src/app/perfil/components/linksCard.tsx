import { Input } from "@/components/ui/input";
import type { PerfilLinks } from "@/mocks/usuario";
import { ExternalLink, Github, Globe, Instagram, Linkedin } from "lucide-react";

type Props = {
  isEditing: boolean;
  links: PerfilLinks;
  onChange: (key: keyof PerfilLinks, value: string) => void;
};

const LINK_CONFIG: {
  key: keyof PerfilLinks;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
}[] = [
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: <Linkedin className="size-4" />,
    placeholder: "https://linkedin.com/in/seu-perfil",
  },
  {
    key: "portfolio",
    label: "Portfólio / Site",
    icon: <Globe className="size-4" />,
    placeholder: "https://seusite.com.br",
  },
  {
    key: "github",
    label: "GitHub",
    icon: <Github className="size-4" />,
    placeholder: "https://github.com/seu-usuario",
  },
  {
    key: "instagram",
    label: "Rede social",
    icon: <Instagram className="size-4" />,
    placeholder: "https://instagram.com/seu-usuario",
  },
];

export function LinksCard({ isEditing, links, onChange }: Props) {
  const linksPreenchidos = LINK_CONFIG.filter(({ key }) => !!links[key]);

  if (!isEditing && linksPreenchidos.length === 0) return null;

  return (
    <section className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
      <h3 className="text-sm font-semibold">Links & Presença Digital</h3>

      {isEditing ? (
        <div className="flex flex-col gap-3">
          {LINK_CONFIG.map(({ key, label, icon, placeholder }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                {icon}
                {label}
              </span>
              <Input
                value={links[key]}
                onChange={(e) => onChange(key, e.target.value)}
                placeholder={placeholder}
                className="text-sm"
                type="url"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {linksPreenchidos.map(({ key, label, icon }) => (
            <a
              key={key}
              href={links[key]}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors"
            >
              {icon}
              {label}
              <ExternalLink className="size-3 opacity-50" />
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
