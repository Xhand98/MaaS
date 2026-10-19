import { PlanId } from "@/lib/user";

export type CartItem = {
  id: string;
  description: string;
  price: number;
  planId?: PlanId;
};
