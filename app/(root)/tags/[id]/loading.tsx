import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <Skeleton className="h-12 w-52" />

      <Skeleton className="mb-8 mt-11 h-14 w-full" />

      <div className="mt-6 flex flex-col gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton key={item} className="h-40 w-full rounded-xl" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
