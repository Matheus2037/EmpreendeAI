import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Linguagem } from "../../service/types/linguagens";

type LanguagesStepsProps = {
  language: string | null;
  setLanguage: (language: string) => void;
  data?: Linguagem[] | void;
};

export function LanguagesStep({ language, setLanguage, data }: LanguagesStepsProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Escolha a área de aprendizagem que você quer desenvolver
      </p>
      <Select value={language ?? ""} onValueChange={setLanguage}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione uma área" />
        </SelectTrigger>
        <SelectContent>
          {data?.map((area) => (
            <SelectItem key={area.uid} value={area.nome}>
              {area.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
