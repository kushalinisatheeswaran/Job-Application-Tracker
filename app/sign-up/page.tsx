"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { signUp } from "@/lib/auth/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Briefcase,
  Lock,
  Mail,
  User,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await signUp.email({
        name,
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message ?? "Failed to sign up");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50/50 dark:bg-slate-950 p-4 sm:p-6">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-1 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Briefcase className="h-5 w-5" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Create your account
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Start tracking your job search in minutes for free
          </p>
        </div>

        <Card className="border border-slate-200/80 bg-white/95 shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90 rounded-2xl overflow-hidden">
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-6 px-6 sm:px-8">
              {error && (
                <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50/80 p-3.5 text-xs font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-300">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                >
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Alex Johnson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="pl-10 h-10.5 rounded-xl border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-950 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                >
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-10.5 rounded-xl border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-950 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    placeholder="At least 8 characters"
                    className="pl-10 h-10.5 rounded-xl border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-950 transition-all text-sm"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-3 pb-8 px-6 sm:px-8">
              <Button
                type="submit"
                className="w-full h-11 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 font-semibold text-white shadow-md shadow-indigo-500/20 hover:from-indigo-500 hover:to-violet-500 transition-all cursor-pointer active:scale-[0.98] gap-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Create Account
                  </span>
                )}
              </Button>

              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
