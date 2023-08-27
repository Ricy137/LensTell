import TellBoard from "@/modules/Tell";
import Present from "@/modules/Present";

export default function Home() {
  return (
    <main className="p-[40px] grid grid-cols-3 min-w-[1280px] min-h-screen">
      <TellBoard />
      <Present />
    </main>
  );
}
