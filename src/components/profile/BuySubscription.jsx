import { m } from "../../i18n/paraglide/messages"
import { Separator } from "../shadcn/separator"
import { Card, CardHeader, CardTitle, CardContent } from "../shadcn/ui/card"

export default function BuySubscription() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{m["profile.subscription"]()}</CardTitle>
      </CardHeader>
      <div className="mx-4"><Separator /></div>
      <CardContent className="grid auto-rows-auto pt-4">

        <p className="">
          test
        </p>

      </CardContent>
    </Card>
  )
}
