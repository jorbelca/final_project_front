import { Budget } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";

export default function GeneratePDF({ budget }: { budget: Budget }) {
  const handleGeneratePDF = async () => {
    const response = await fetch("/api/generate_pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(budget),
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    // Abrir el PDF en una nueva pestaña
    window.open(url, "_blank");
  };

  return (
    <Button
      onClick={handleGeneratePDF}
      className="bg-zinc-300 hover:bg-zinc-400 p-4 py-5 rounded-xl  "
    >
      🖨
    </Button>
  );
}
