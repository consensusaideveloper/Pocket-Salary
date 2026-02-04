'use client';

import type { Dictionary } from '@/i18n';

interface FeaturesProps {
  dict: Dictionary;
}

const featureIcons = [
  // Annual Allowance Design / 年俸設計
  <svg key="0" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>,
  // Family Bank / 家庭内銀行
  <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Family Gigs / 家庭内案件
  <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>,
  // Year-End Review / 年末レビュー
  <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a3 3 0 013-3h3m-6 9h6m-6 0l-3 3m3-3l-3-3m9 6h3a2 2 0 002-2V7a2 2 0 00-2-2h-3" />
  </svg>,
];

export default function Features({ dict }: FeaturesProps) {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
          {dict.features.title}
        </h2>
        <p className="text-center text-slate-600 mb-12">
          {dict.features.subtitle}
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {dict.features.items.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100 shadow-sm"
            >
              <div className="w-14 h-14 bg-teal-700 text-white rounded-xl flex items-center justify-center mb-4">
                {featureIcons[index]}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
