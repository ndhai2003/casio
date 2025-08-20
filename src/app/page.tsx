
import Calculator from "@/components/Calculator";

export default function Page() {
  return (
    <main className="min-h-dvh bg-gradient-to-b from-sky-50 to-white dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm md:max-w-md">

        <Calculator />

      </div>
    </main>
  );
}
