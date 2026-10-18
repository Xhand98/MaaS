import {PricingPlan} from "@/app/pricing/_components/price"

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  planId: PricingPlan["id"]
}
