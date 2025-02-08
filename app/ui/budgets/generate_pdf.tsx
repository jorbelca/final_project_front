import { Budget } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";

export default function GeneratePDF({
  budget,
  logo,
}: {
  budget: Budget;
  logo: String;
}) {
  const handleGeneratePDF = async () => {
    const response = await fetch("/api/generate_pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ budget, logo }),
    });

    const { pdf } = await response.json();

    const pdfBlob = new Blob([Uint8Array.from(atob(pdf), c => c.charCodeAt(0))], {
      type: "application/pdf",
    });
  
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank"); // Intenta abrirlo en una nueva pestaña
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
