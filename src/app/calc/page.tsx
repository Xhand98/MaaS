"use client";

import "katex/dist/katex.min.css";
import Calculator from "./_components/calculator";
import { useRouter } from "next/navigation";
import { getUser, UserProfile } from "@/lib/user";
import { useEffect, useState } from "react";

export default function CalcPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      const currentUser = getUser();

      if (!currentUser) {
        router.replace("/login");
        return;
      }

      setUser(currentUser);
      setIsLoading(false);
    });

    return () => cancelAnimationFrame(timer);
  }, [router]);

  if (isLoading || !user) {
    return null;
  }
  return (


    <div
      className="absolute inset-0 h-full w-full bg-white
                 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]
                 bg-position-[6rem_4rem] dark flex min-h-screen items-center justify-center"
    >
      <Calculator />
    </div>
  );
}
