"use client";

import ImageTabs from "@/components/image-tabs";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Zap,
  Kanban,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50 dark:bg-slate-950">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-14 sm:pt-24 sm:pb-20 md:pt-28 md:pb-24">
          {/* Ambient Background Spotlights */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-indigo-500/20 via-violet-500/15 to-purple-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
          <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-400/10 blur-[100px] rounded-full pointer-events-none -z-10" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-violet-400/10 blur-[100px] rounded-full pointer-events-none -z-10" />

          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-4xl text-center space-y-7">
              {/* Announcement Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/80 px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur-md dark:border-indigo-900/60 dark:bg-indigo-950/60 dark:text-indigo-300">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                <span>The Modern Job Application Tracker</span>
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                <span className="text-slate-500 dark:text-slate-400 font-normal">
                  SaaS Experience
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl md:text-7xl leading-[1.08]">
                Streamline your job search with a{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400">
                  smart Kanban workflow
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-xl leading-relaxed font-normal">
                Organize, track, and manage all your application stages in one
                seamless visual workspace. Replace messy spreadsheets with clear
                progress metrics.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
                <Link href="/sign-up" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-12 px-7 text-base font-semibold rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-violet-500 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Tracking Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto h-12 px-7 text-base font-semibold rounded-xl border-slate-300/80 bg-white/90 text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    Explore Demo Board
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Free Forever Account</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-indigo-500" />
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span>Instant Interactive Setup</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive App Mockup Showcase */}
        <ImageTabs />

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center mb-16 space-y-3">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
                <Kanban className="h-3.5 w-3.5" />
                <span>Designed for Job Seekers</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Everything you need to land your next role
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
                Built specifically to keep your application pipeline structured,
                clear, and actionable.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="group rounded-2xl border border-slate-200/80 bg-slate-50/40 p-8 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-300 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-indigo-700 dark:hover:bg-slate-900">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400 transition-transform group-hover:scale-110">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  Organize Applications
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  Categorize target roles across Applied, Interviewing, Offer,
                  and Rejected columns with custom notes.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group rounded-2xl border border-slate-200/80 bg-slate-50/40 p-8 transition-all duration-200 hover:-translate-y-1 hover:border-violet-300 hover:bg-white hover:shadow-xl hover:shadow-violet-500/5 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-violet-700 dark:hover:bg-slate-900">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-400 transition-transform group-hover:scale-110">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  Track Visual Progress
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  Drag and drop application cards seamlessly as you advance
                  through recruiter screens and technical loops.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group rounded-2xl border border-slate-200/80 bg-slate-50/40 p-8 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:bg-white hover:shadow-xl hover:shadow-emerald-500/5 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-emerald-700 dark:hover:bg-slate-900">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400 transition-transform group-hover:scale-110">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  Centralized Details
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  Store company names, locations, compensation details, job
                  posting links, and tech stack tags securely.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Grid */}
        <section className="py-20 relative bg-slate-50/50 dark:bg-slate-950">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center mb-16 space-y-3">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Simple 3-Step Workflow
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base">
                Go from initial application submission to signed offer letter
                with ease.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              <div className="relative flex flex-col items-center text-center p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center mb-5 text-base border border-indigo-100 dark:border-indigo-900/50 shadow-inner">
                  1
                </div>
                <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">
                  Log Application
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Add target roles, company names, URLs, and key salary figures
                  in seconds.
                </p>
              </div>

              <div className="relative flex flex-col items-center text-center p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center mb-5 text-base border border-indigo-100 dark:border-indigo-900/50 shadow-inner">
                  2
                </div>
                <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">
                  Move Cards
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Drag application cards across stages as recruiters schedule
                  calls and interviews.
                </p>
              </div>

              <div className="relative flex flex-col items-center text-center p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center mb-5 text-base border border-indigo-100 dark:border-indigo-900/50 shadow-inner">
                  3
                </div>
                <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">
                  Land Offers
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Compare offers, interview notes, and celebrate your career
                  progression.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-16 container mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 p-8 sm:p-12 md:p-16 text-center text-white shadow-2xl shadow-indigo-500/20">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Ready to supercharge your job search?
              </h2>
              <p className="text-indigo-100 text-base sm:text-lg">
                Join candidate seekers organizing their career journey with
                Trackr.
              </p>
              <div className="pt-2">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="h-12 px-8 text-base font-semibold rounded-xl bg-white text-indigo-600 hover:bg-slate-50 shadow-xl transition-all hover:scale-105 active:scale-95"
                  >
                    Get Started Free Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-950 text-xs text-slate-500">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs shadow-sm">
              T
            </div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Trackr
            </span>
            <span>— Job Application Tracker</span>
          </div>
          <p>© 2026 Job Application Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
