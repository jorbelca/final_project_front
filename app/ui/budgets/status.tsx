"use client";

import { updateBudgetState } from "@/app/lib/actions";
import { Budget } from "@/app/lib/definitions";
import { CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";

export default function BudgetState({
  status,
  id,
}: {
  status: Budget["state"];
  id: number;
}) {
  const [statusState, setStatusState] = useState(status);
  const statusConfig = {
    draft: {
      bg: "bg-gray-100 text-gray-500 border",
      icon: <ClockIcon className="ml-1 w-4 text-gray-500" />,
      label: "Draft",
    },
    approved: {
      bg: "bg-green-500 text-white",
      icon: <CheckIcon className="ml-1 w-4 text-white" />,
      label: "Approved",
    },
    rejected: {
      bg: "bg-red-500 text-white",
      icon: <XMarkIcon className="ml-1 w-4 text-white" />,
      label: "Rejected",
    },
    sent: {
      bg: "bg-yellow-500 text-white",
      icon: <CheckIcon className="ml-1 w-4 text-white" />,
      label: "Sent",
    },
  };

  const currentStatus = statusConfig[statusState] || {};

  const handleUpdateState = async () => {
    let result;
    if (statusState === "draft") {
      result = await updateBudgetState(id, "sent");
      setStatusState("sent");
    } else if (statusState === "sent") {
      result = await updateBudgetState(id, "approved");
      setStatusState("approved");
    } else if (statusState === "approved") {
      result = await updateBudgetState(id, "rejected");
      setStatusState("rejected");
    } else if (statusState === "rejected") {
      result = await updateBudgetState(id, "draft");
      setStatusState("draft");
    }
    if (result.success) {
      // console.log(result.message);
    } else {
      alert("An error occurred. Please try again.");
      //console.log(result.message);
    }
  };

  return (
    <button
      className={clsx(
        "flex items-center rounded-full px-2 py-1 text-xs cursor-pointer",
        currentStatus.bg
      )}
      onClick={handleUpdateState}
    >
      {currentStatus.icon}
      <span className="ml-1">{currentStatus.label}</span>
    </button>
  );
}


