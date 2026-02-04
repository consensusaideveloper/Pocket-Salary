'use client';

import type { Dictionary } from '@/i18n';

interface CapabilitiesProps {
  dict: Dictionary;
}

export default function Capabilities({ dict }: CapabilitiesProps) {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
          {dict.capabilities.title}
        </h2>
        <p className="text-center text-slate-600 mb-10">
          {dict.capabilities.subtitle}
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {dict.capabilities.items.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
            >
              <div className="text-sm font-semibold text-teal-700 mb-2">
                {item.title}
              </div>
              <p className="text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
