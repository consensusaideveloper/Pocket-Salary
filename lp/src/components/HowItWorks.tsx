'use client';

import type { Dictionary } from '@/i18n';

interface HowItWorksProps {
  dict: Dictionary;
}

export default function HowItWorks({ dict }: HowItWorksProps) {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-12">
          {dict.howItWorks.title}
        </h2>
        <div className="space-y-8">
          {dict.howItWorks.steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start gap-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-teal-700 text-white rounded-2xl flex items-center justify-center text-2xl font-bold">
                {step.number}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
