"use client";

import type { Subscription } from "@/app/lib/definitions";
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
import { updatePaymentNumber } from "@/app/lib/data";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface SubscriptionModalProps {
  subscription: Subscription;
}

export default function SubscriptionModal({
  subscription,
}: SubscriptionModalProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newPaymentNumber, setNewPaymentNumber] = useState<string>("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
  
    // Permitir solo números y guiones en tiempo real
    if (/^[\d-]*$/.test(value)) {
      // Autoformatear a 4-4-4-4
      value = value
        .replace(/\D/g, "") // Eliminar todo lo que no sea número
        .replace(/(\d{4})/g, "$1-") // Agregar guion cada 4 dígitos
        .slice(0, 19) // Limitar a 19 caracteres (16 números + 3 guiones)
  
      setNewPaymentNumber(value);
    }
  };

  async function onUpdatePaymentNumber(
    subscriptionId: number,
    paymentNumber: string
  ) {
    try {
      const response = await updatePaymentNumber(subscriptionId, paymentNumber);
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
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Subscription Details</DialogTitle>
          <DialogDescription>
            Details for your active subscription are listed below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-[300px] overflow-y-auto">
          {subscription && (
            <div
              key={subscription.subscription_id}
              className="flex items-center space-x-2 p-2 bg-secondary rounded-md"
            >
              <div className="flex-grow">
                <Label className="font-medium">
                  {subscription.name || "Unnamed Subscription"}
                </Label>
                <p className="text-sm text-muted-foreground">
                  Price: ${Number(subscription.price)?.toFixed(2) || "N/A"}{" "}
                </p>
                <p className="text-sm text-muted-foreground">
                  {" "}
                  Duration: {subscription.duration_in_days || "N/A"} days
                </p>

                {editingId === subscription.subscription_id ? (
                  <div className="mt-2 flex items-center space-x-2">
                    <Input
                      value={newPaymentNumber}
                      onChange={(e) => handleChange(e)}
                      placeholder="New payment number"
                      className="flex-grow"
                      pattern={"d{4}-d{4}-d{4}-d{4}"}
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        onUpdatePaymentNumber(
                          subscription.subscription_id,
                          newPaymentNumber
                        );
                        setEditingId(null);
                        setNewPaymentNumber("");
                      }}
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center space-x-2">
                    <p className="text-sm">
                      Payment Number: {subscription.payment_number}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingId(subscription.subscription_id);
                        setNewPaymentNumber(subscription.payment_number);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
