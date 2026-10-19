
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import NumberFlow from "@number-flow/react";
import { useCart } from "@/components/cart-provider";
import { CircleCheck } from "lucide-react";
import { getUser, updateUserPlan } from "@/lib/user";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { UserProfile } from "@/lib/user";

export default function CartPage() {
  const { cart, cartTotal, removeFromCart, clearCart } = useCart();
  const [issued, setIssued] = useState(0);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

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


  function handleCheckout() {
    setCheckoutError("");

    if (cart.length === 0) {
      setCheckoutError("Your cart is empty.");
      return;
    }

    const planItem = cart.find((item) => item.planId);

    // Only update the subscription if a plan is in the cart.
    if (planItem?.planId) {
      const updatedUser = updateUserPlan(planItem.planId);

      if (!updatedUser) {
        setCheckoutError("Could not update your plan. Please try again.");
        return;
      }
    }

    setIssued(cartTotal);
    clearCart();
    setShowCheckout(true);
  }

  return (

    <main className="mx-auto min-h-screen w-full max-w-6xl px-5 py-12 sm:px-8">
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Back to calculator
      </Link>

      <header className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            Your account / Checkout
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Your cart<span className="text-zinc-400">.</span>
          </h1>
          <p className="mt-3 text-sm text-zinc-500">
            {cart.length} {cart.length === 1 ? "charge" : "charges"} waiting
            for you.
          </p>
        </div>

        {cart.length > 0 && (
          <Button
            onClick={clearCart}
            className="hidden items-center gap-2 text-sm text-zinc-500 transition hover:text-red-500 sm:flex"
          >
            <Trash2 size={15} />
            Clear cart
          </Button>
        )}
      </header>

      {cart.length === 0 ? (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 px-6 text-center dark:border-zinc-800"
        >
          <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900">
            <ShoppingCart className="size-6 text-zinc-500" />
          </div>

          <h2 className="text-xl font-medium">Nothing to pay for. Yet.</h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
            Your cart is suspiciously empty. Go do some calculations and
            acquire some completely unnecessary charges.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-80"
          >
            Return to calculator
            <ArrowRight size={16} />
          </Link>
        </motion.section>
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_340px]">
          <section>
            <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-wider text-zinc-500">
              <span>Order items</span>
              <span>{cart.length} total</span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <AnimatePresence initial={false}>
                {cart.map((item) => (
                  <motion.article
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-4 border-b border-zinc-200 p-4 last:border-b-0 sm:p-5 dark:border-zinc-800"
                  >
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900">
                      <CreditCard className="size-5 text-zinc-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="wrap-break-words text-sm font-medium">
                        {item.description}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        One-time charge
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-sm font-semibold tabular-nums">
                        ${item.price.toFixed(2)}
                      </span>

                      <Button
                        aria-label={`Remove ${item.description}`}
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-lg p-2 text-zinc-400 transition hover:bg-red-500/10 hover:text-red-500"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-4 flex justify-between sm:hidden">
              <Button
                onClick={clearCart}
                className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-red-500"
              >
                <Trash2 size={15} />
                Clear cart
              </Button>
            </div>

            <Link
              href="/"
              className="mt-5 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-foreground"
            >
              <ArrowLeft size={15} />
              Continue calculating
            </Link>
            return {checkoutError ?(<span><p>An error has ocurred: {checkoutError}</p></span>) : ""}
          </section>

          <motion.aside
            layout
            className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800 sm:p-6 lg:sticky lg:top-6"
          >
            <div className="mb-6 flex items-center gap-2">
              <ShoppingCart size={17} className="text-zinc-500" />
              <h2 className="font-medium">Order summary</h2>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span className="tabular-nums">
                  <NumberFlow value={cartTotal} format={{ style: "currency", currency: "USD" }} />
                </span>
              </div>

              <div className="flex justify-between text-zinc-500">
                <span>Processing fee</span>
                <span>$0.00</span>
              </div>

              <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total</span>
                  <span className="text-2xl font-semibold tracking-tight tabular-nums">
                    <NumberFlow
                      value={cartTotal}
                      format={{
                        style: "currency",
                        currency: "USD",
                      }}
                    />
                  </span>
                </div>
                <p className="mt-1 text-right text-xs text-zinc-500">
                  USD, taxes not included
                </p>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3.5 text-sm font-medium text-background transition hover:opacity-80"
            >
              <CreditCard size={17} />
              Proceed to checkout
              <ArrowRight size={16} />
            </Button>

            <p className="mt-4 text-center text-xs leading-5 text-zinc-500">
              Secure checkout experience™
              <br />
              Probably.
            </p>
          </motion.aside>
        </div>
      )}

      <AnimatePresence>
        {showCheckout && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCheckout(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="checkout-title"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl border border-zinc-200  p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
            >
              <Button
                variant="outline"
                aria-label="Close checkout"
                onClick={() => setShowCheckout(false)}
                className="absolute right-4 top-4 rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <X size={17} />
              </Button>

              <div className="mb-4 flex size-12 items-center justify-center rounded-xl  dark:bg-zinc-900">
                <CircleCheck className="size-5" />
              </div>

              <h2 id="checkout-title" className="text-xl font-semibold">
                {"You've been checkout-ed."}
              </h2>

              <p className="mt-2 text-sm leading-6 ">
                Your payment has been processed sucessfully
                Your ${issued} charge is not a real payment.
              </p>

              <Button
                onClick={() => setShowCheckout(false)}
                className="mt-6 w-full rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background hover:opacity-80"
              >
                Understandable
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
