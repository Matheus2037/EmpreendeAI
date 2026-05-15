import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type ExperienciaStepProps = {
  experiencia: string;
  setExperiencia: (experiencia: string) => void;
  outroExperiencia: string;
  setOutroExperiencia: (outroExperiencia: string) => void;
};

export function ExperienciaStep({
  experiencia,
  setExperiencia,
  outroExperiencia,
  setOutroExperiencia,
}: ExperienciaStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Qual sua experiência específica na linguagem?
      </p>

      <Select value={experiencia} onValueChange={setExperiencia}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione sua experiência" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="nenhuma">Nenhuma</SelectItem>
          <SelectItem value="1 a 3 meses">1–3 meses</SelectItem>
          <SelectItem value="3 a 6 meses">3–6 meses</SelectItem>
          <SelectItem value="+6 meses">+6 meses</SelectItem>
          <SelectItem value="outro">Outro</SelectItem>
        </SelectContent>
      </Select>

      {experiencia === "outro" && (
        <Input
          placeholder="Defina seu tempo de experiência"
          value={outroExperiencia}
          onChange={(e) => setOutroExperiencia(e.target.value)}
        />
      )}
    </div>
  );
}
