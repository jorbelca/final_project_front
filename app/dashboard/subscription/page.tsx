"use client";

import type { Plan, Subscription } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { updateSubscription } from "@/app/lib/data";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface SubscriptionModalProps {
  subscription: Subscription;
  plans: Plan[];
}

export default function SubscriptionModal({
  subscription,
  plans,
}: SubscriptionModalProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newPlanId, setNewPlanId] = useState<number>(subscription?.plan_id);
  const [newPaymentNumber, setNewPaymentNumber] = useState<string>(
    subscription?.payment_number
  );

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Permitir solo números y guiones en tiempo real
    if (/^[\d-]*$/.test(value)) {
      // Autoformatear a 4-4-4-4
      value = value
        .replace(/\D/g, "") // Eliminar todo lo que no sea número
        .replace(/(\d{4})/g, "$1-") // Agregar guion cada 4 dígitos
        .slice(0, 19); // Limitar a 19 caracteres (16 números + 3 guiones)

      setNewPaymentNumber(value);
    }
  };

  async function onUpdateSubscription(
    subscriptionId: number,
    planId: number,
    paymentNumber: string
  ) {
    try {
      const response = await updateSubscription(
        subscriptionId,
        paymentNumber,
        planId
      );
      if (response.success) {
        router.refresh();
        toast({
          title: "Success",
          description: "Updated",
        });
      }
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Error updating payment number",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="dark:border-zinc-500">
          See
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Subscription Details</DialogTitle>
          <DialogDescription>
            Details for your active subscription are listed below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-[300px] overflow-y-auto">
          <div
            key={subscription.subscription_id}
            className="flex items-center space-x-2 p-2 bg-secondary rounded-md"
          >
            <div className="flex-grow">
              {subscription.plan_id && !editingId ? (
                // Si tiene un plan asignado, muestra los detalles del plan
                <>
                  <Label className="font-medium">
                    {subscription.name || "No Subscription"}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Price: ${Number(subscription.price)?.toFixed(2) || "N/A"}{" "}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {" "}
                    Duration: {subscription.duration_in_days || "N/A"} days
                  </p>

                  <div className="mt-2 flex flex-wrap flex-col items-start ">
                    <p className="text-sm p-1">
                      Plan:{" "}
                      {plans.find(
                        (plan) => plan.plan_id === subscription.plan_id
                      )?.name || "N/A"}
                    </p>
                    <p className="text-sm p-1">
                      Payment Number: {subscription.payment_number || "N/A"}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingId(subscription.subscription_id);
                        setNewPlanId(subscription.plan_id);
                        setNewPaymentNumber(subscription.payment_number);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </>
              ) : (
                // Si no tiene un plan asignado, muestra el formulario para seleccionar un plan
                <div className="flex flex-col">
                  <div className="mt-2 space-y-4">
                    <Label>Plans : </Label>
                    <select
                      value={newPlanId}
                      onChange={(e) => setNewPlanId(Number(e.target.value))}
                      className="flex-grow border rounded-lg p-1"
                    >
                      {plans.map((plan) => (
                        <option key={plan.plan_id} value={plan.plan_id}>
                          {plan.name} - ${plan.price} ({plan.duration_in_days}{" "}
                          days)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-2 space-y-1">
                    <Label>Payment Number</Label>
                    <Input
                      value={newPaymentNumber}
                      onChange={handleChange}
                      placeholder="New payment number"
                      className="flex-grow"
                    />
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      // Asegurarse de que el orden de los parámetros sea correcto: planId, paymentNumber
                      onUpdateSubscription(
                        subscription.subscription_id,
                        newPlanId, // Aquí va el planId
                        newPaymentNumber // Aquí va el paymentNumber
                      );
                      setEditingId(null);
                      setNewPaymentNumber("");
                    }}
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
