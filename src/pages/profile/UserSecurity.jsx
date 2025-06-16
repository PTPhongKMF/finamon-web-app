import ChangePassword from "../../components/profile/ChangePassword";
import { Separator } from "../../components/shadcn/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/shadcn/ui/card";
import { m } from "../../i18n/paraglide/messages";

export default function UserSecurity() {
  return (
    <article>
      <Card>
        <CardHeader>
          <CardTitle>{m["profile.security"]()}</CardTitle>
        </CardHeader>
        <div className="mx-4"><Separator /></div>
        <CardContent className="grid grid-cols-2 pt-4">

          <ChangePassword />

        </CardContent>
      </Card>
    </article>
  )
}
