"use client";

import { useState } from "react";
import Papa from "papaparse";
import { insertMultipleCosts } from "@/app/lib/actions";

import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface CsvRow {
  description: string;
  cost: number;
  unit: string;
  periodicity: string;
}

export default function Parser({ userId }: { userId: number }) {
  const router = useRouter();

  const [tableData, setTableData] = useState<CsvRow[]>([]);
  const headers = ["DESCRIPTION", "COST", "UNIT", "PERIODICITY"];
  const validPeriodicities = [
    "one-time",
    "daily",
    "weekly",
    "monthly",
    "yearly",
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (result) => {
        if (result.data.length <= 1) return;

        // Detectar índices de columnas
        let columns = (result.data[0] as string[]).map((h) =>
          h.trim().toUpperCase()
        );
        let idxDesc = columns.indexOf("DESCRIPTION");
        let idxCost = columns.indexOf("COST");
        let idxUnit = columns.indexOf("UNIT");
        let idxPeriod = columns.indexOf("PERIODICITY");

        // Filtrar y transformar los datos
        const parsedData = (result.data as string[][])
          .slice(1)
          .map((row) => ({
            description: row[idxDesc] || "",
            cost: +row[idxCost] || 0,
            unit:
              idxUnit !== -1 ? row[idxUnit]?.toLowerCase() || "unit" : "unit",
            periodicity:
              idxPeriod !== -1 &&
              validPeriodicities.includes(row[idxPeriod]?.toLowerCase())
                ? row[idxPeriod]?.toLowerCase()
                : "one-time", // Valor por defecto si no es válido
          }))
          .filter((row) => row.description && row.cost);

        setTableData(parsedData);
      },
      skipEmptyLines: true,
    });
  };

  const submitForm = async () => {
    try {
      // Esperamos que todas las promesas del map se resuelvan
      const response = await insertMultipleCosts(+userId, tableData);

      if (!response.success) {
        return toast({
          variant: "destructive",
          title: "Error",
          description: "Problem creating the costs" + response.message,
        });
      }
      // Una vez que todas las promesas se resuelven, redirigimos al usuario
      router.push("/dashboard/costs");
    } catch (error) {}

    toast({
      title: "Created",
      description: "Costs uploaded",
    });
  };

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <input
          type="file"
          onChange={handleFileUpload}
          accept=".csv"
          className="mb-4 border p-2 rounded w-full"
        />

        {tableData.length > 0 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitForm();
            }}
          >
            <input type="hidden" name="user_id" value={+userId} />
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  {headers.map((header) => (
                    <th key={header} className="border p-2 text-left">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="odd:bg-gray-50 even:bg-white">
                    <td className="border p-2">
                      <input
                        type="text"
                        value={row.description}
                        onChange={(e) => {
                          const newData = [...tableData];
                          newData[rowIndex].description = e.target.value;
                          setTableData(newData);
                        }}
                        className="border rounded p-1 w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        step=".01"
                        value={+row.cost}
                        onChange={(e) => {
                          const newData = [...tableData];
                          newData[rowIndex].cost = +e.target.value;
                          setTableData(newData);
                        }}
                        className="border rounded p-1 w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={row.unit}
                        onChange={(e) => {
                          const newData = [...tableData];
                          newData[rowIndex].unit = e.target.value;
                          setTableData(newData);
                        }}
                        className="border rounded p-1 w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <select
                        value={row.periodicity}
                        onChange={(e) => {
                          const newData = [...tableData];
                          newData[rowIndex].periodicity = e.target.value;
                          setTableData(newData);
                        }}
                        className="border rounded p-1 w-full"
                      >
                        {validPeriodicities.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Guardar
            </button>
          </form>
        )}
      </div>
    </>
  );
}
