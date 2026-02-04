'use client';

import type { Dictionary } from '@/i18n';

interface SolutionProps {
  dict: Dictionary;
}

export default function Solution({ dict }: SolutionProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-12">
          {dict.solution.title}
        </h2>
        <div className="space-y-4">
          {dict.solution.items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-white p-6 rounded-xl border border-emerald-100 shadow-sm"
            >
              <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <p className="text-slate-700 text-lg">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
