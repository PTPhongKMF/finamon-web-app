import React from "react"
import { Separator } from "../../components/shadcn/separator"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/shadcn/ui/card"
import { m } from "../../i18n/paraglide/messages"
import { useUserStore } from "../../stores/userStore";
import { List } from "lucide-react";

export default function CurrentSubscription() {
  const user = useUserStore(state => state.user);

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
            {user.subscription}
          </span>
          </p>

          <div className="mt-8">
            <p className="text-sm flex gap-2 justify-start items-center">
              <List className="size-[1em]"/>
              {m["profile.subscriptionHistory"]()}
              </p>
          </div>

        </CardContent>
      </Card>
  )
}
