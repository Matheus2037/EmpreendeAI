import { Skeleton } from "@/components/ui/skeleton";

export function LoadingJornada() {
  return (
    <>
      <section className="flex justify-between items-center gap-5">
        <article className="flex gap-5 w-[28rem]">
          <Skeleton className="h-18 w-22 object-contain" />

          <div className="flex flex-col justify-center gap-4 w-full">
            <Skeleton className="h-7 w-1/2" />

            <Skeleton className="w-full h-2 rounded-sm" />
          </div>
        </article>
        <Skeleton className="w-24 h-12 rounded-lg" />
      </section>

      <div className="flex-1 flex gap-10">
        <section className="size-full"></section>
        <Skeleton className="size-full max-w-[26rem] rounded-xl" />
      </div>
    </>
  );
}
