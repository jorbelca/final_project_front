import { getSubscriptions } from "@/app/lib/data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Copy } from "lucide-react";

export default async function SubscriptionModal() {
  const subscriptions = await getSubscriptions();
  console.log(subscriptions);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Subscriptions</DialogTitle>
        </DialogHeader>

        <div className="flex items-center space-x-2">
          {/* {subscriptions.map((subscription) => {       
            <div className="flex items-center space-x-2">   
                <Copy size={24} />
                <Label>{subscription.name}</Label>
            })} */}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
