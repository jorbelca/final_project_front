"use client";

import type { Budget } from "@/app/lib/definitions";
import { CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const statusConfig = {
  draft: {
    bg: "bg-gray-100",
    icon: ClockIcon,
  },
  approved: {
    bg: "bg-green-500",
    icon: CheckIcon,
  },
  rejected: {
    bg: "bg-red-500",
    icon: XMarkIcon,
  },
  sent: {
    bg: "bg-yellow-500",
    icon: CheckIcon,
  },
};

export default function BudgetStateIcons({ budgets }: { budgets: Budget[] }) {
  // Contar los presupuestos por estado
  const stateCounts = budgets.reduce((acc, budget) => {
    acc[budget.state] = (acc[budget.state] || 0) + 1;
    return acc;
  }, {} as Record<Budget["state"], number>);

  return (
    <div className="flex flex-wrap gap-4">
      {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map(
        (state) => {
          const count = stateCounts[state] || 0;
          const { bg, icon: IconComponent } = statusConfig[state];

          // Solo renderizamos si hay un presupuesto en este estado
          if (count > 0) {
            return (
              <div key={state} className="flex items-center">
                <div
                  className={clsx(
                    "flex items-center justify-center rounded-full w-5 h-5 mr-2",
                    bg
                  )}
                >
                  {IconComponent && (
                    <IconComponent className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="text-sm font-medium">{count}</span>
              </div>
            );
          }
          return null;
        }
      )}
    </div>
  );
}
