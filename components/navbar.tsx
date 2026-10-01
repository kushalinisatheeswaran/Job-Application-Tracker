"use client";

import { Briefcase, LayoutDashboard, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useSession } from "@/lib/auth/auth-client";
import SignOutButton from "./sign-out-btn";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/80 transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-all hover:opacity-95"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20 ring-1 ring-white/20 transition-transform group-hover:scale-105">
            <Briefcase className="h-4.5 w-4.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-0.5">
              Trackr
              <span className="text-indigo-600 dark:text-indigo-400 font-black">
                .
              </span>
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-2.5 sm:gap-3">
          {session?.user ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 font-medium text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white rounded-xl transition-all"
                >
                  <LayoutDashboard className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full ring-2 ring-indigo-500/20 hover:ring-indigo-500/40 p-0 overflow-hidden transition-all"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-gradient-to-tr from-indigo-600 to-violet-600 text-xs font-semibold text-white">
                        {session.user.name
                          ? session.user.name[0].toUpperCase()
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-60 rounded-2xl p-2 shadow-2xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900"
                  align="end"
                >
                  <DropdownMenuLabel className="font-normal p-2.5">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                  <div className="p-1">
                    <SignOutButton />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 rounded-xl"
                >
                  Log in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button
                  size="sm"
                  className="gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 font-semibold text-white shadow-md shadow-indigo-500/20 hover:from-indigo-500 hover:to-violet-500 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Sign up free
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
