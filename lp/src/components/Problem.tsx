'use client';

import type { Dictionary } from '@/i18n';

interface ProblemProps {
  dict: Dictionary;
}

export default function Problem({ dict }: ProblemProps) {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-12">
          {dict.problem.title}
        </h2>
        <div className="space-y-4">
          {dict.problem.items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-slate-50 p-6 rounded-xl border border-slate-200"
            >
              <span className="flex-shrink-0 w-8 h-8 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold">
                !
              </span>
              <p className="text-slate-700 text-lg">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
