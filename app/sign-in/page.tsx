"use client";

import { useState, useActionState } from "react";
import { signInAction, signUpAction, AuthActionResult } from "@/features/auth/actions";
import { SectionHeader, Card, Button } from "@/components/ui";
import { Eye, EyeOff, Lock, Mail, User, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";

export default function SignInPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);

  const [signInState, signInFormAction, isSigningIn] = useActionState<AuthActionResult | null, FormData>(
    signInAction,
    null
  );

  const [signUpState, signUpFormAction, isSigningUp] = useActionState<AuthActionResult | null, FormData>(
    signUpAction,
    null
  );

  const activeState = mode === "signin" ? signInState : signUpState;
  const isPending = mode === "signin" ? isSigningIn : isSigningUp;

  return (
    <div className="bg-black text-white min-h-[90vh] flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <SectionHeader
          eyebrow="Member Portal"
          title={mode === "signin" ? "MEMBER SIGN IN" : "JOIN UNISEX FITNESS"}
          subtitle={
            mode === "signin"
              ? "Access your training membership, purchase receipts, and club privileges."
              : "Create your personal fitness profile to begin your training membership."
          }
        />

        {/* Tab Selector */}
        <div className="flex border border-[#343434] bg-[#141414] p-1 mb-8">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`flex-1 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
              mode === "signin"
                ? "bg-white text-black"
                : "text-[#BDBDBD] hover:text-white"
            }`}
          >
            SIGN IN
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
              mode === "signup"
                ? "bg-white text-black"
                : "text-[#BDBDBD] hover:text-white"
            }`}
          >
            CREATE ACCOUNT
          </button>
        </div>

        {/* Feedback Messages */}
        {activeState?.error && (
          <div className="mb-6 p-4 bg-red-950/60 border border-red-700 text-red-200 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{activeState.error}</span>
          </div>
        )}

        {activeState?.success && (
          <div className="mb-6 p-4 bg-emerald-950/60 border border-emerald-600 text-emerald-200 text-xs flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{activeState.message}</span>
          </div>
        )}

        {/* Sign In Form */}
        {mode === "signin" ? (
          <Card variant="highlight" className="p-8">
            <form action={signInFormAction} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDBDBD] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#707070] absolute left-3.5 top-3.5" />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="member@unisexfitness.com"
                    className="w-full bg-[#171717] border border-[#343434] text-white pl-10 pr-4 py-3 text-sm focus:border-white focus:outline-none transition-colors placeholder-[#707070]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#BDBDBD]">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#707070] absolute left-3.5 top-3.5" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full bg-[#171717] border border-[#343434] text-white pl-10 pr-10 py-3 text-sm focus:border-white focus:outline-none transition-colors placeholder-[#707070]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-[#707070] hover:text-white transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                isLoading={isPending}
                className="mt-2"
              >
                {isPending ? "AUTHENTICATING..." : "SIGN IN"}
              </Button>
            </form>
          </Card>
        ) : (
          /* Sign Up Form */
          <Card variant="highlight" className="p-8">
            <form action={signUpFormAction} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDBDBD] mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#707070] absolute left-3.5 top-3.5" />
                  <input
                    name="fullName"
                    type="text"
                    required
                    placeholder="Jordan Steele"
                    className="w-full bg-[#171717] border border-[#343434] text-white pl-10 pr-4 py-3 text-sm focus:border-white focus:outline-none transition-colors placeholder-[#707070]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDBDBD] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#707070] absolute left-3.5 top-3.5" />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="member@unisexfitness.com"
                    className="w-full bg-[#171717] border border-[#343434] text-white pl-10 pr-4 py-3 text-sm focus:border-white focus:outline-none transition-colors placeholder-[#707070]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#BDBDBD] mb-1.5">
                  Password (Min 8 Characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#707070] absolute left-3.5 top-3.5" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    placeholder="••••••••"
                    className="w-full bg-[#171717] border border-[#343434] text-white pl-10 pr-10 py-3 text-sm focus:border-white focus:outline-none transition-colors placeholder-[#707070]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-[#707070] hover:text-white transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                isLoading={isPending}
                className="mt-2"
              >
                {isPending ? "REGISTERING..." : "CREATE ACCOUNT"}
              </Button>
            </form>
          </Card>
        )}

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#707070]">
          <ShieldCheck className="w-4 h-4" />
          <span>Encrypted Session • Row-Level Security Enforced</span>
        </div>
      </div>
    </div>
  );
}
