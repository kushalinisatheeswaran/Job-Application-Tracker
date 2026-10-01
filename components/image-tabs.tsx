"use client";

import { useState } from "react";
import Image from "next/image";
import { LayoutGrid, Target, Sparkles, CheckCircle2 } from "lucide-react";

export default function ImageTabs() {
  const [activeTab, setActiveTab] = useState("organize");

  const tabs = [
    { id: "organize", label: "Organize Applications", icon: LayoutGrid },
    { id: "hired", label: "Get Hired Faster", icon: Target },
    { id: "boards", label: "Manage Kanban Boards", icon: Sparkles },
  ];

  return (
    <section className="py-12 md:py-16 relative">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <div className="inline-flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-inner">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/80 dark:border-slate-700"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`}
                    />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Browser Frame Preview */}
          <div className="relative mx-auto max-w-5xl rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-950 shadow-2xl shadow-indigo-500/10 overflow-hidden">
            {/* Top Mockup Header Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2 rounded-md bg-slate-800/80 px-3 py-1 text-xs text-slate-400 font-mono">
                <span className="text-slate-500">https://</span>
                app.jobtracker.com/dashboard
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                Live Demo
              </div>
            </div>

            {/* Content Image */}
            <div className="relative bg-slate-950 aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
              {activeTab === "organize" && (
                <Image
                  src="/hero-images/hero1.png"
                  alt="Organize Applications"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover object-top transition-opacity duration-300"
                  priority
                />
              )}
              {activeTab === "hired" && (
                <Image
                  src="/hero-images/hero2.png"
                  alt="Get Hired"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover object-top transition-opacity duration-300"
                />
              )}
              {activeTab === "boards" && (
                <Image
                  src="/hero-images/hero3.png"
                  alt="Manage Boards"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover object-top transition-opacity duration-300"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
