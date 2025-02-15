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
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-700 shadow-lg rounded-lg transition-colors border dark:border-gray-400">
      {/* Input de carga de archivo */}
      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          Upload CSV file
        </span>
        <input
          type="file"
          onChange={handleFileUpload}
          accept=".csv"
          className="mt-2 block w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring focus:ring-blue-500"
        />
      </label>

      {tableData.length > 0 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          <input type="hidden" name="user_id" value={+userId} />

          {/* Tabla con estilos mejorados */}
          <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700">
            <table className="w-full border-collapse min-w-[600px]">
              <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                <tr>
                  {headers.map((header) => (
                    <th key={header} className="border p-3  text-center">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="odd:bg-gray-50 even:bg-white dark:odd:bg-gray-800 dark:even:bg-gray-900"
                  >
                    <td className="border p-2">
                      <input
                        type="text"
                        value={row.description}
                        onChange={(e) => {
                          const newData = [...tableData];
                          newData[rowIndex].description = e.target.value;
                          setTableData(newData);
                        }}
                        className="border rounded-lg p-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm sm:text-base"
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
                        className="border rounded-lg p-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm sm:text-base"
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
                        className="border rounded-lg p-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm sm:text-base"
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
                        className="border rounded-lg p-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm sm:text-base"
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
          </div>

          {/* Botón de Guardar */}
          <button
            type="submit"
            className="mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring focus:ring-green-500"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
}
