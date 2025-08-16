import { useMutation, useQuery } from "@tanstack/react-query";
import { m } from "../../i18n/paraglide/messages"
import { useUserStore } from "../../stores/userStore";
import { Separator } from "../shadcn/separator"
import { Card, CardHeader, CardTitle, CardContent } from "../shadcn/ui/card"
import { kyAspDotnet } from "../../api/ky";
import { Button } from "../shadcn/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../shadcn/alert";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { Textarea } from "../shadcn/textarea";
import { Dialog, DialogContent } from "../shadcn/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../shadcn/alert-dialog"

export default function BuySubscription() {
  const user = useUserStore(state => state.user);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [note, setNote] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const paymentQrImageUrls = ["/images/QR/PVCB.jfif"];
  const [previewUrl, setPreviewUrl] = useState(null);

  const receiptHistoryQuery = useQuery({
    queryKey: ["receiptHistory", user.id],
    queryFn: async () => {
      return await kyAspDotnet.get("api/receipt", {
        searchParams: {
          UserId: user.id,
          PageNumber: 1,
          PageSize: 1000,
          SortBy: "CreatedDate",
          SortDescending: true
        }
      }).json();
    }
  })

  const subscriptionListQuery = useQuery({
    queryKey: ["subscriptionList"],
    queryFn: async () => {
      return await kyAspDotnet.get("api/memberships", {
        searchParams: {
          SortBy: "Amount"
        }
      }).json()
    }
  })

  const placeReceipt = useMutation({
    mutationFn: async ({ membershipId, amount, note }) => {
      // Validation checks
      if (receiptHistoryQuery.data?.items.some(receipt => receipt.status.toLowerCase() === "unpaid")) {
        throw new Error(m["profile.alert.hasUnpaidReceipt"]());
      }

      const selectedSubscription = subscriptionListQuery.data?.items.find(sub => sub.id === membershipId);
      if (selectedSubscription && selectedSubscription.name.toLowerCase() === user.subscription.toLowerCase()) {
        throw new Error(m["profile.alert.alreadyHaveSubscription"]());
      }

      return await kyAspDotnet.post("api/receipt", {
        json: {
          userId: user.id,
          membershipId,
          amount,
          status: "Unpaid",
          note
        }
      }).json()
    }
  })

  const handleBuySubscription = (subscription) => {
    if (subscription.name.toLowerCase() === "free") return;
    setSelectedPlan(subscription);
    setNote(`Subscribe to ${subscription.name} plan`);
  }

  const handleConfirmPurchase = () => {
    if (!selectedPlan) return;
    setShowConfirmDialog(true);
  }

  const handleProceedPurchase = () => {
    if (!selectedPlan) return;
    placeReceipt.mutate({
      membershipId: selectedPlan.id,
      amount: selectedPlan.monthlyPrice,
      note: note
    });
    setShowConfirmDialog(false);
    setSelectedPlan(null);
    setNote("");
  }

  const isDisabled = (subscription) => {
    return subscription.name.toLowerCase() === "free" ||
           subscription.name.toLowerCase() === user.subscription.toLowerCase() || 
           placeReceipt.isPending ||
           receiptHistoryQuery.data?.items.some(receipt => receipt.status.toLowerCase() === "unpaid");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{m["profile.buySubscription"]()}</CardTitle>
      </CardHeader>
      <div className="mx-4"><Separator /></div>
      <CardContent className="grid gap-6 pt-4">
        {placeReceipt.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {placeReceipt.error.message}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {subscriptionListQuery.isSuccess && subscriptionListQuery.data.items.map((subscription) => (
            <Card key={subscription.id} className={cn(
              "p-6 border-2",
              subscription.name.toLowerCase() === "free" ? "border-green-500" : "border-yellow-500"
            )}>
              <CardTitle className={cn(
                "mb-4",
                subscription.name.toLowerCase() === "free" ? "text-green-500" : "text-yellow-500"
              )}>
                {subscription.name}
              </CardTitle>
              <div className="space-y-2 mb-6">
                <p className="text-2xl font-bold">
                  {subscription.monthlyPrice.toLocaleString()} VND
                  <span className="text-sm font-normal text-gray-500 ml-1">{m["symbol.perMonth"]()}</span>
                </p>
                <p className="text-gray-500">
                  {subscription.yearlyPrice.toLocaleString()} VND
                  <span className="text-sm ml-1">{m["symbol.perYear"]()}</span>
                </p>
              </div>
              <Button 
                className={cn(
                  "w-full cursor-pointer",
                  isDisabled(subscription) ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed" :
                  subscription.name.toLowerCase() === "free" 
                    ? "bg-green-500 hover:bg-green-600" 
                    : "bg-yellow-500 hover:bg-yellow-600"
                )}
                onClick={() => handleBuySubscription(subscription)}
                disabled={isDisabled(subscription)}
              >
                {subscription.name.toLowerCase() === user.subscription.toLowerCase() 
                  ? m["profile.alert.currentPlan"]()
                  : subscription.name.toLowerCase() === "free"
                    ? m["pricing.plans.free.title"]()
                    : m["profile.buySubscription"]()}
              </Button>
            </Card>
          ))}
        </div>

        {selectedPlan && (
          <div className="space-y-4 border rounded-lg p-4">
            <p className="text-sm text-gray-500">{m["common.note"]()}</p>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={m["common.enterNoteHere"]()}
              className="min-h-[100px]"
            />
            <Button 
              className="w-full cursor-pointer bg-yellow-500 hover:bg-yellow-600"
              onClick={handleConfirmPurchase}
            >
              {m["common.confirm"]()}
            </Button>
          </div>
        )}

        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{m["common.areYouSure?"]()}</AlertDialogTitle>
              <AlertDialogDescription>
                {`${m["profile.buySubscription"]()} ${selectedPlan?.name || ""}`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">{m["common.cancel"]()}</AlertDialogCancel>
              <AlertDialogAction 
                className="cursor-pointer bg-yellow-500 hover:bg-yellow-600"
                onClick={handleProceedPurchase}
              >
                {m["common.confirm"]()}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="space-y-4">
          <Separator />
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">{m["profile.paymentGuide.title"]()}</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
              <li>{m["profile.paymentGuide.steps.chooseAndConfirm"]()}</li>
              <li>{m["profile.paymentGuide.steps.refreshAndFindReceiptId"]()}</li>
              <li>{m["profile.paymentGuide.steps.transferByQrWithContent"]()}</li>
            </ol>
            <Alert className="border-yellow-500 bg-yellow-50 text-yellow-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {m["profile.paymentGuide.notice"]()}
              </AlertDescription>
            </Alert>
            <div className="mt-2">
              <h4 className="text-sm font-medium mb-2">{m["profile.paymentGuide.qrTitle"]()}</h4>
              <div className="flex flex-wrap gap-4">
                {paymentQrImageUrls.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{m["profile.paymentGuide.noQrPlaceholder"]()}</p>
                ) : (
                  paymentQrImageUrls.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`QR ${idx + 1}`}
                      className="h-44 w-44 object-contain rounded border cursor-pointer transition hover:opacity-90"
                      onClick={() => setPreviewUrl(url)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <Dialog open={!!previewUrl} onOpenChange={(open) => { if (!open) setPreviewUrl(null) }}>
          <DialogContent className="p-0 border-0 bg-transparent shadow-none w-auto max-w-none sm:max-w-none place-items-center">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="QR preview"
                className="max-h-[85vh] max-w-[95vw] object-contain rounded"
              />
            )}
          </DialogContent>
        </Dialog>

      </CardContent>
    </Card>
  )
}
