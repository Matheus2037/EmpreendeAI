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
        <div className="flex gap-5 items-center">
          <img
            src={
              currentUser?.photoURL ||
              `https://ui-avatars.com/api/?name=${currentUser?.displayName}&background=292524&color=fff`
            }
            alt="User avatar"
            className="size-16 rounded-full"
          />

          <h3>Bem vindo aos seus estudos, {currentUser?.displayName}</h3>
        </div>

        <AddJourneyModal />
      </section>

      <section className="flex flex-wrap gap-5 justify-start pb-10">
        {isLoading ? (
          Array.from({ length: 9 }).map((_, index) => (
            <Skeleton key={index} className="w-card h-56 rounded-lg" />
          ))
        ) : data ? (
          data.map((jornada) => (
            <LinguageCard key={jornada.uid} data={jornada} />
          ))
        ) : (
          <span>Nenhuma jornada iniciada</span>
        )}
      </section>
    </>
  );
}
