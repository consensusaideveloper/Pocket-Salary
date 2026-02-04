'use client';

import type { Dictionary } from '@/i18n';

interface ComparisonProps {
  dict: Dictionary;
}

export default function Comparison({ dict }: ComparisonProps) {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
          {dict.comparison.title}
        </h2>
        <p className="text-center text-slate-600 mb-10">
          {dict.comparison.subtitle}
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="text-sm font-semibold text-slate-700 mb-3">
              {dict.comparison.monthlyTitle}
            </div>
            <ul className="list-disc pl-5 text-slate-600 space-y-2">
              {dict.comparison.monthlyItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-6">
            <div className="text-sm font-semibold text-teal-700 mb-3">
              {dict.comparison.annualTitle}
            </div>
            <ul className="list-disc pl-5 text-slate-700 space-y-2">
              {dict.comparison.annualItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-sm text-slate-500 mt-6">
          {dict.comparison.note}
        </p>
      </div>
    </section>
  );
}
