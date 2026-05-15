import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { PlusIcon, Rocket } from "lucide-react";
import { useState } from "react";
import { LanguagesStep } from "./components/stepsModal/languagesStep";
import { ObjetivosStep } from "./components/stepsModal/objetivosStep";
import { NivelStep } from "./components/stepsModal/nivelStep";
import { ExperienciaStep } from "./components/stepsModal/experienciaStep";
import { DificuldadeStep } from "./components/stepsModal/dificuldadeStep";
import { EstiloAprendizadoStep } from "./components/stepsModal/estiloAprendizadoStep";
import { DisponibilidadeStep } from "./components/stepsModal/disponibilidadeStep";
import { MetaProjetoStep } from "./components/stepsModal/metaProjetoStep";
import type { Option } from "@/components/ui/multipleSelector";
import { newJornada } from "./service/jornadas";
import { useQuery } from "@tanstack/react-query";
import { getLinguagens } from "./service/linguagens";

export function AddJourneyModal() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    language: "" as string,
    objetivos: [] as Option[],
    nivel: "",
    experiencia: "",
    outroExperiencia: "",
    dificuldade: "",
    estilosAprendizado: [] as Option[],
    disponibilidade: "",
    metaProjeto: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const { data } = useQuery({
    queryKey: ["linguagens"],
    queryFn: getLinguagens,
  });

  const handleStartJourney = async () => {
    setIsCreating(true);
    await newJornada({
      linguagem: formData.language,
      dificuldades: [formData.dificuldade],
      disponibilidade: formData.disponibilidade,
      estilos_aprendizagem: formData.estilosAprendizado.map((e) => e.value),
      experiencia_linguagem: formData.outroExperiencia ?? formData.experiencia,
      conhecimento_logica: [],
      meta_pessoal: [formData.metaProjeto],
      nivel_programacao: formData.nivel,
      objetivo_final: formData.objetivos.map((o) => o.value).join(", "),
      complemento: "",
    }).then(() => {
      setOpen(false);
      setIsCreating(false);
      queryClient.invalidateQueries({ queryKey: ["jornadas"] });
    });
  };

  const stepContents = [
    <LanguagesStep
      key="step-0"
      language={formData.language}
      setLanguage={(language) => setFormData((p) => ({ ...p, language }))}
      data={data}
    />,
    <ObjetivosStep
      key="step-1"
      objetivos={formData.objetivos}
      setObjetivos={(objetivos) => setFormData((p) => ({ ...p, objetivos }))}
    />,
    <NivelStep
      key="step-2"
      nivel={formData.nivel}
      setNivel={(nivel) => setFormData((p) => ({ ...p, nivel }))}
    />,
    <ExperienciaStep
      key="step-3"
      experiencia={formData.experiencia}
      setExperiencia={(experiencia) => setFormData((p) => ({ ...p, experiencia }))}
      outroExperiencia={formData.outroExperiencia}
      setOutroExperiencia={(outroExperiencia) =>
        setFormData((p) => ({ ...p, outroExperiencia }))
      }
    />,
    <DificuldadeStep
      key="step-4"
      dificuldade={formData.dificuldade}
      setDificuldade={(dificuldade) => setFormData((p) => ({ ...p, dificuldade }))}
    />,
    <EstiloAprendizadoStep
      key="step-5"
      estilosAprendizado={formData.estilosAprendizado}
      setEstilosAprendizado={(estilosAprendizado) =>
        setFormData((p) => ({ ...p, estilosAprendizado }))
      }
    />,
    <DisponibilidadeStep
      key="step-6"
      disponibilidade={formData.disponibilidade}
      setDisponibilidade={(disponibilidade) =>
        setFormData((p) => ({ ...p, disponibilidade }))
      }
    />,
    <MetaProjetoStep
      key="step-7"
      metaProjeto={formData.metaProjeto}
      setMetaProjeto={(metaProjeto) => setFormData((p) => ({ ...p, metaProjeto }))}
    />,
  ];

  const stepValidations = [
    !!formData.language,
    !!formData.objetivos.length,
    !!formData.nivel,
    !!formData.experiencia &&
      (formData.experiencia !== "outro" || !!formData.outroExperiencia),
    !!formData.dificuldade,
    !!formData.estilosAprendizado.length,
    !!formData.disponibilidade,
    true,
  ];

  const resetForm = () => {
    setCurrentStep(0);
    setFormData({
      language: "",
      objetivos: [],
      nivel: "",
      experiencia: "",
      outroExperiencia: "",
      dificuldade: "",
      estilosAprendizado: [],
      disponibilidade: "",
      metaProjeto: "",
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          <PlusIcon />
          Nova Trilha
        </Button>
      </DialogTrigger>

      <DialogContent
        aria-describedby="dialog-nova-trilha"
        onInteractOutside={!isCreating ? (e) => e.preventDefault() : undefined}
      >
        {!isCreating ? (
          <>
            <DialogHeader>
              <DialogTitle>Criar nova trilha</DialogTitle>
              <DialogDescription />
            </DialogHeader>

            <div className="flex gap-1 mt-2 mb-4">
              {stepContents.map((_, i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      i <= currentStep ? "var(--color-primary)" : "var(--color-muted)",
                  }}
                />
              ))}
            </div>

            <div>{stepContents[currentStep]}</div>

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep === 0}
              >
                Voltar
              </Button>

              {currentStep === stepContents.length - 1 ? (
                <Button size="lg" onClick={handleStartJourney}>
                  Iniciar trilha
                  <Rocket />
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!stepValidations[currentStep]}
                >
                  Próximo
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-6 py-8">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Rocket className="size-8 text-primary animate-bounce" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">Preparando sua trilha…</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Criando sua jornada em {formData.language}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
