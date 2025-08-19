import { useMutation, useQuery } from "@tanstack/react-query";
import { m } from "../../../i18n/paraglide/messages";
import { kyAspDotnet } from "../../../api/ky";
import { Separator } from "../../../components/shadcn/separator";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/shadcn/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../../../components/shadcn/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../components/shadcn/select";
import { Alert, AlertDescription } from "../../../components/shadcn/alert";
import { AlertCircle } from "lucide-react";
import { useUserStore } from "../../../stores/userStore";
import { addMonth, addYear } from "@formkit/tempo";

function StaffSubscription() {
  const user = useUserStore(state => state.user);

  const receiptsQuery = useQuery({
    queryKey: ["staffReceipts"],
    queryFn: async () => {
      return await kyAspDotnet.get("api/receipt", {
        searchParams: {
          PageNumber: 1,
          PageSize: 1000,
          SortBy: "CreatedDate",
          SortDescending: true,
        },
      }).json();
    },
  });

  const markPaidMutation = useMutation({
    mutationFn: async (r) => {
      // Step 1: mark receipt as Paid
      await kyAspDotnet.put(`api/receipt/${r.id}`, {
        json: { status: "Paid" },
      }).json();

      // Step 2: assign membership to user
      const now = new Date();;
      let end;

      if (r.amount == 19000) end = addMonth(now, 1, true);
      else end = addYear(now, 1, true);

      await kyAspDotnet.put(`api/memberships/user/${user.id}`, {
        json: {
          membershipId: r.membershipId,
          startDate: now.toISOString(),
          endDate: end.toISOString()
        },
      }).json();

      return {};
    },
    onSettled: () => {},
    onSuccess: () => {
      receiptsQuery.refetch();
    },
  });

  const receipts = receiptsQuery.data?.items ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{m["profile.subscriptionHistory"]()}</CardTitle>
      </CardHeader>
      <div className="mx-4"><Separator /></div>
      <CardContent className="pt-4">
        {(receiptsQuery.error || markPaidMutation.error) && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {markPaidMutation.error?.message || m["common.error"]()}
            </AlertDescription>
          </Alert>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{m["common.id"]()}</TableHead>
              <TableHead>{m["common.userId"]()}</TableHead>
              <TableHead>{m["common.membershipId"]()}</TableHead>
              <TableHead>{m["common.amount"]()}</TableHead>
              <TableHead className="w-[200px]">{m["common.status"]()}</TableHead>
              <TableHead className="w-[360px]">{m["common.note"]()}</TableHead>
              <TableHead>{m["common.createdAt"]()}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {receipts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  {m["common.empty"]()}
                </TableCell>
              </TableRow>
            ) : (
              receipts.map((r) => {
                const isPaid = String(r.status).toLowerCase() === "paid";
                return (
                  <TableRow key={r.id}>
                    <TableCell>{r.id}</TableCell>
                    <TableCell>{r.userId}</TableCell>
                    <TableCell>{r.membershipId}</TableCell>
                    <TableCell>{r.amount}</TableCell>
                    <TableCell className="w-[200px]">
                      {isPaid ? (
                        <span className="text-green-600 inline-block w-[180px]">
                          {m["common.statusValues.paid"]()}
                        </span>
                      ) : (
                        <Select
                          value={"unpaid"}
                          disabled={markPaidMutation.isPending}
                          onValueChange={(value) => {
                            if (value === "paid") {
                              markPaidMutation.mutate(r);
                            }
                          }}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unpaid">{m["common.statusValues.unpaid"]()}</SelectItem>
                            <SelectItem value="paid">{m["common.statusValues.paid"]()}</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                    <TableCell className="w-[360px] whitespace-pre-wrap break-words" title={r.note || ""}>{r.note || ""}</TableCell>
                    <TableCell>{r.createdDate ? new Date(r.createdDate).toLocaleString() : ""}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default StaffSubscription;