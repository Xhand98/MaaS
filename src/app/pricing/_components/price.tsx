"use client";

const COLORS = {
  light: {
    accent: "#E11D48",
    badgeBg: "#FDF2F8",
    badgeText: "#DB2777",
  },
  dark: {
    accent: "#F43F5E",
    badgeBg: "#831843",
    badgeText: "#FDF2F8",
  },
} as const;

import { motion } from "motion/react";
import { Check } from "lucide-react";
import React from "react";
import { useCart } from "@/components/cart-provider";
import { useRouter } from "next/navigation";
export type PricingPlan = {
  id: "basic-arithmetic" | "pre-algebra" | "algebra-1";
  title: string;
  description: string;
  price: string;
  value: number;
  originalPrice?: string;
  saveAmount?: string;
  features: string[];
  spotsLeft: number;
  isPopular?: boolean;
  gradient: string;
}

interface PriceOptionsProps {
  mode?: "light" | "dark";
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
  additionalServiceTitle?: string;
  additionalServiceDescription?: string;
  additionalServicePrice?: string;
  additionalServiceUnit?: string;
}

const defaultPlans: PricingPlan[] = [
  {
    id: "basic-arithmetic",
    title: "Basic Arithmetic",
    description: "Your numbers deserve the premium treatment.",
    price: "$30",
    value:30,
    features: [
      "Addition of happiness",
      "Subtraction of worries",
      "Multiplication* of opportunities",
      "Division of your homework",
    ],
    spotsLeft: 100,
    gradient: "from-emerald-100/60 via-transparent to-transparent",
  },
  {
    id: 'pre-algebra',
    title: "Pre-Algebra",
    description:
      "Unlock the mathematical potential your free trial has been hiding from you.",
    price: "$100",
    value: 100,
    originalPrice: "$250",
    saveAmount: "Save $150",
    features: [
      "Negative numbers and positive thinking",
      "Fractions, decimals & premium percentages",
      "Factors and exclusive primes",
      "Ratios & proportions (enterprise edition)",
      "Exponents and roots — limited access",
    ],
    spotsLeft: 25,
    isPopular: true,
    gradient: "from-violet-100/60 via-transparent to-transparent",
  },
  {
    id: "algebra-1",
    title: "Algebra I",
    description:
      "Experience mathematics without artificial limitations. Terms and conditions apply.",
    price: "$495",
    value: 495,
    originalPrice: "$5495",
    saveAmount: "Save $5000",
    features: [
      "Variables (now with variable pricing)",
      "Expressions & equations",
      "Linear inequalities — premium only",
      "Graphing* (sold separately)",
    ],
    spotsLeft: 2,
    gradient: "from-rose-100/60 via-transparent to-transparent",
  },
];

export default function PricePage({
  mode = "light",
  title = "Choose your level of calculating 😎",
  subtitle = "Choose a how far your calculations go.",
  plans = defaultPlans,
  additionalServiceTitle = "DO NOT READ*",
  additionalServiceDescription = "Every calculation beign done cost us more that i'd cost you, so we're making u pay 😎",
  additionalServicePrice = "$10",
  additionalServiceUnit = "Per calculation",
}: PriceOptionsProps) {
  const colors = COLORS[mode];
  const isDark = mode === "dark";

  return (
    <section
      className={`relative w-full py-16 md:py-24 ${isDark ? "bg-gray-950" : "bg-white"}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2
            className={`mb-4 font-serif text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {title}
          </h2>
          <p
            className={`mx-auto max-w-xl text-sm leading-relaxed md:text-base ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl border p-6 ${isDark ? "border-gray-800 bg-gray-900" : "border-gray-100 bg-white"}`}
            >
              {/* Gradient overlay */}
              <div
                className={`pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-tr ${plan.gradient}`}
              />

              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className="whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: colors.badgeBg,
                      color: colors.badgeText,
                    }}
                  >
                    Most popular
                  </span>
                </div>
              )}

              <div className="relative z-10">
                {/* Title */}
                <h3
                  className={`mb-2 text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {plan.title}
                </h3>
                <p
                  className={`mb-6 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span
                    className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    {plan.price}
                  </span>
                  {plan.originalPrice && (
                    <div className="mt-1">
                      <span
                        className={`text-sm line-through ${isDark ? "text-gray-500" : "text-gray-400"}`}
                      >
                        {plan.originalPrice}
                      </span>
                      {plan.saveAmount && (
                        <span
                          className={`ml-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                        >
                          {plan.saveAmount}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  className={`mb-3 w-full rounded-full py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${isDark ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-gray-900 text-white hover:bg-gray-800"}`}
                  onClick={() => buy(plan)}
                >
                  {plan.isPopular ? "Unlock your full Potential" : "Get started"}
                </button>
                {/* Features */}
                <div>
                  <p
                    className={`mb-3 text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    What&apos;s included
                  </p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check
                          className={`h-4 w-4 shrink-0 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                        />
                        <span
                          className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Spots left */}
                <p
                  className={`mt-6 text-center text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Only{" "}
                  <span style={{ color: colors.accent }} className="font-medium">
                    {plan.spotsLeft} spots
                  </span>{" "}
                  left this month
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Service Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`flex flex-col items-center justify-between gap-6 rounded-2xl border p-6 md:flex-row md:p-8 ${isDark ? "border-gray-800 bg-gray-900" : "border-gray-100 bg-white"}`}
        >
          <div className="text-center md:text-left">
            <h3
              className={`mb-2 text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {additionalServiceTitle}
            </h3>
            <p
              className={`max-w-md text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              {additionalServiceDescription}
            </p>
          </div>
          <div
            className="relative shrink-0 overflow-hidden rounded-xl p-6"
            style={{
              background: isDark
                ? "linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(244, 114, 182, 0.3) 100%)"
                : "linear-gradient(135deg, rgba(192, 132, 252, 0.4) 0%, rgba(251, 207, 232, 0.4) 100%)",
            }}
          >
            <div className="text-center">
              <span
                className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {additionalServicePrice}
              </span>
              <p
                className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                {additionalServiceUnit}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
