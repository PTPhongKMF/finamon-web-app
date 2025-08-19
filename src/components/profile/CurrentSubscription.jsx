import React from "react"
import { Separator } from "../../components/shadcn/separator"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/shadcn/ui/card"
import { m } from "../../i18n/paraglide/messages"
import { useUserStore } from "../../stores/userStore";
import { List } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { kyAspDotnet } from "../../api/ky";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shadcn/table";
import { cn } from "../../lib/utils";

export default function CurrentSubscription() {
  const user = useUserStore(state => state.user);

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

  const userSubscription = useQuery({
    queryKey: ["userMemberships", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      return await kyAspDotnet.get("api/memberships/users", {
        searchParams: {
          IsActive: true,
          PageNumber: 1,
          PageSize: 1000,
          IsDeleted: false
        }
      }).json();
    }
  })

  const currentMembershipName = userSubscription.isSuccess
    ? userSubscription.data?.items?.find(item => Number(item.userId) === Number(user?.id))?.membershipName ?? null
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{m["profile.subscription"]()}</CardTitle>
      </CardHeader>
      <div className="mx-4"><Separator /></div>
      <CardContent className="grid auto-rows-auto pt-4">

        <p className="">
          {m["profile.currentSubscription"]() + ": "}
          <span className="text-green-500 text-2xl font-bold">
            {userSubscription.isLoading ? "..." : (currentMembershipName ?? "N/A")}
          </span>
        </p>

        <div className="mt-8">
          <p className="text-sm flex gap-2 justify-start items-center mb-4">
            <List className="size-[1em]" />
            {m["profile.subscriptionHistory"]()}
          </p>

          {receiptHistoryQuery.isSuccess && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{m["common.createdAt"]()}</TableHead>
                  <TableHead>{m["common.amount"]()}</TableHead>
                  <TableHead>{m["common.note"]()}</TableHead>
                  <TableHead>{m["common.status"]()}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receiptHistoryQuery.data.items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-lg italic text-gray-500">{m["common.empty"]()}</TableCell>
                  </TableRow>
                ) : (
                  receiptHistoryQuery.data.items.map((receipt) => (
                    <TableRow key={receipt.id}>
                      <TableCell>{new Date(receipt.createdDate).toLocaleDateString()}</TableCell>
                      <TableCell className="font-bold text-yellow-500">
                        {receipt.amount.toLocaleString()} VND
                      </TableCell>
                      <TableCell>{receipt.note}</TableCell>
                      <TableCell>
                        <span className={cn(
                          "font-bold",
                          receipt.status.toLowerCase() === "paid" ? "text-green-500" : "text-red-500"
                        )}>
                          {receipt.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </div>

      </CardContent>
    </Card>
  )
}
