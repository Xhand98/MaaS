export type PlanId = "free" | "basic-arithmetic" | "pre-algebra" | "algebra-1"

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  planId: string;
};

export const STORAGE_KEY = 'maas-user'

export const VALID_PLANS: PlanId[] = [
  "free",
  "basic-arithmetic",
  "pre-algebra",
  "algebra-1"
];

export function getUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const user: unknown = JSON.parse(raw)

    if (
      typeof user !== "object" ||
      user === null ||
      !("id" in user) ||
      !("name" in user) ||
      !("email" in user) ||
      !("planId" in user) ||
      typeof user.id !== "string" ||
      typeof user.name !== "string" ||
      typeof user.email !== "string" ||
      !VALID_PLANS.includes(user.planId as PlanId)
    ) {
      return null;
    }
    return user as UserProfile;
  } catch {
    return null;
  }
}

export function crateUser(
  name: string,
  email: string,
  planId: PlanId,
): UserProfile {
  const user: UserProfile = {
    id: crypto.randomUUID(),
    name,
    email,
    planId,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  return user;
}

export function updateUserPlan(planId: PlanId): UserProfile | null {
  const user = getUser();
  if (!user) return null;

  const updated = { ...user, planId };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated;
}

export function logoutUser() {
  localStorage.removeItem(STORAGE_KEY)
}
