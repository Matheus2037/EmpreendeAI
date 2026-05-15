import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/auth";
import { getJornadasByUserId } from "./service/jornadas";
import { LinguageCard } from "./components/linguageCard";
import { AddJourneyModal } from "./addJourneyModal";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardPage() {
  const { currentUser } = useAuthContext();

  const { data, isLoading } = useQuery({
    queryKey: ["jornadas"],
    queryFn: async () => await getJornadasByUserId(),
  });

  return (
    <>
      <section className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <img
            src={
              currentUser?.photoURL ||
              `https://ui-avatars.com/api/?name=${currentUser?.displayName}&background=0f172a&color=fff`
            }
            alt="User avatar"
            className="size-14 rounded-full"
          />
          <div>
            <p className="text-sm text-muted-foreground">Bem-vindo de volta,</p>
            <h3 className="font-semibold text-lg">{currentUser?.displayName}</h3>
          </div>
        </div>

        <AddJourneyModal />
      </section>

      <section>
        <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
          Suas trilhas de aprendizagem
        </h4>
        <div className="flex flex-wrap gap-5 justify-start pb-10">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="w-card h-48 rounded-xl" />
            ))
          ) : data && data.length > 0 ? (
            data.map((jornada) => (
              <LinguageCard key={jornada.uid} data={jornada} />
            ))
          ) : (
            <div className="flex flex-col items-center gap-3 py-16 w-full text-center text-muted-foreground">
              <span className="text-4xl">🚀</span>
              <p className="text-base font-medium">Nenhuma trilha iniciada ainda.</p>
              <p className="text-sm">Clique em &quot;Nova Trilha&quot; para começar sua jornada.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
