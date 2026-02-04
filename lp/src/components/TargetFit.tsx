'use client';

import type { Dictionary } from '@/i18n';

interface TargetFitProps {
  dict: Dictionary;
}

export default function TargetFit({ dict }: TargetFitProps) {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
          {dict.targetFit.title}
        </h2>
        <p className="text-center text-slate-600 mb-10">
          {dict.targetFit.subtitle}
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="text-sm font-semibold text-teal-700 mb-3">
              {dict.targetFit.forTitle}
            </div>
            <ul className="list-disc pl-5 text-slate-600 space-y-2">
              {dict.targetFit.forItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="text-sm font-semibold text-amber-700 mb-3">
              {dict.targetFit.notTitle}
            </div>
            <ul className="list-disc pl-5 text-slate-600 space-y-2">
              {dict.targetFit.notItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 text-slate-600">
          <div className="text-sm font-semibold text-slate-700 mb-2">
            {dict.targetFit.noteTitle}
          </div>
          <p>{dict.targetFit.noteBody}</p>
        </div>
        <p className="mt-6 text-xs text-slate-400 text-center">
          {dict.targetFit.disclaimer}
        </p>
      </div>
    </section>
  );
}
