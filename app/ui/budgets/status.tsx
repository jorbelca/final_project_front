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
      console.log(result.message);
    } else {
      console.log(result.message);
    }
  };

  return (
    <span
      className={clsx(
        "flex items-center rounded-full px-2 py-1 text-xs justify-center",
        {
          "bg-gray-100 text-gray-500": statusState === "draft",
          "bg-green-500 text-white": statusState === "approved",
          "bg-red-500 text-white": statusState === "rejected",
          "bg-yellow-500 text-white": statusState === "sent",
        }
      )}
    >
      {statusState === "draft" ? (
        <>
          <ClockIcon className="ml-1 w-4 text-gray-500" />
          Draft
          <p className="text-xs"> || </p>
          <button onClick={handleUpdateState}>Change Status</button>
        </>
      ) : null}
      {statusState === "approved" ? (
        <>
          <CheckIcon className="ml-1 w-4 text-white" />
          Approved
          <p className="text-xs"> || </p>
          <button onClick={handleUpdateState}>Change Status</button>
        </>
      ) : null}
      {statusState === "rejected" ? (
        <>
          <XMarkIcon className="ml-1 w-4 text-white" />
          Rejected
          <p className="text-xs"> || </p>
          <button onClick={handleUpdateState}>Change Status</button>
        </>
      ) : null}
      {statusState === "sent" ? (
        <>
          <CheckIcon className="ml-1 w-4 text-white" />
          Sent
          <p className="text-xs"> || </p>
          <button onClick={handleUpdateState}>Change Status</button>
        </>
      ) : null}
    </span>
  );
}
