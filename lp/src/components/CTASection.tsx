'use client';

import type { Dictionary } from '@/i18n';

interface CTASectionProps {
  dict: Dictionary;
  onCTAClick: (label: string) => void;
}

export default function CTASection({ dict, onCTAClick }: CTASectionProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/80 border border-amber-100 text-teal-800 text-sm font-semibold px-4 py-2 rounded-full shadow-sm mb-6">
          {dict.cta.badge}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          {dict.cta.title}
        </h2>
        <p className="text-slate-600 mb-8">
          {dict.cta.description}
        </p>
        <button
          onClick={() => onCTAClick(dict.cta.button)}
          className="bg-teal-700 hover:bg-teal-800 text-white font-semibold py-4 px-6 rounded-full text-lg transition-colors shadow-lg hover:shadow-xl"
        >
          {dict.cta.button}
        </button>
        <div className="mt-6 text-sm text-slate-500">
          {dict.cta.note}
        </div>
      </div>
    </section>
  );
}
