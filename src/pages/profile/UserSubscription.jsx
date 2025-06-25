import BuySubscription from "../../components/profile/BuySubscription";
import CurrentSubscription from "../../components/profile/CurrentSubscription";


export default function UserSubscription() {

  return (
    <article className="grid auto-rows-auto gap-4">

      <CurrentSubscription />

      <BuySubscription />

    </article>
  )
}
