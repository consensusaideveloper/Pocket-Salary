'use client';

import { useMemo, useState } from 'react';
import type { Dictionary } from '@/i18n';

interface SimulatorProps {
  dict: Dictionary;
  locale: 'ja' | 'en';
}

export default function Simulator({ dict, locale }: SimulatorProps) {
  const [ageKey, setAgeKey] = useState(dict.simulator.ageOptions[0].key);
  const [monthly, setMonthly] = useState(String(dict.simulator.defaultMonthly));

  const selected = useMemo(
    () => dict.simulator.ageOptions.find((option) => option.key === ageKey),
    [ageKey, dict.simulator.ageOptions]
  );

  const monthlyValue = Number(monthly.replace(/[^\d]/g, '')) || 0;
  const annualValue = monthlyValue * 12;

  const formatter = useMemo(() => {
    return new Intl.NumberFormat(locale === 'ja' ? 'ja-JP' : 'en-US', {
      style: 'currency',
      currency: locale === 'ja' ? 'JPY' : 'USD',
      maximumFractionDigits: 0,
    });
  }, [locale]);

  const annualText = formatter.format(annualValue);
  const rangeText = selected
    ? selected.maxAnnual
      ? `${formatter.format(selected.minAnnual)} – ${formatter.format(selected.maxAnnual)}`
      : `${formatter.format(selected.minAnnual)}+`
    : '';

  const statusText = selected
    ? annualValue === 0
      ? dict.simulator.statusEmpty
      : selected.maxAnnual
        ? annualValue < selected.minAnnual
          ? dict.simulator.statusLow
          : annualValue > selected.maxAnnual
            ? dict.simulator.statusHigh
            : dict.simulator.statusInRange
        : annualValue < selected.minAnnual
          ? dict.simulator.statusLow
          : dict.simulator.statusInRange
    : '';

  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
          {dict.simulator.title}
        </h2>
        <p className="text-center text-slate-600 mb-10">
          {dict.simulator.subtitle}
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {dict.simulator.ageLabel}
              </label>
              <select
                value={ageKey}
                onChange={(event) => setAgeKey(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-200"
              >
                {dict.simulator.ageOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {dict.simulator.monthlyLabel}
              </label>
              <input
                inputMode="numeric"
                value={monthly}
                onChange={(event) => setMonthly(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-200"
              />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">{dict.simulator.annualLabel}</span>
                <span className="font-semibold text-slate-700">{annualText}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-slate-500">{dict.simulator.rangeLabel}</span>
                <span className="font-semibold text-slate-700">{rangeText}</span>
              </div>
              <div className="mt-2 text-xs text-emerald-600">
                {statusText}
              </div>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-700 mb-2">
              {dict.simulator.scopeTitle}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {selected?.scope.map((item) => (
                <span key={item} className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700">
                  {item}
                </span>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-semibold text-slate-700 mb-2">
                  {dict.simulator.parentPaysTitle}
                </div>
                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                  {dict.simulator.parentPaysItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-700 mb-2">
                  {dict.simulator.childPaysTitle}
                </div>
                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                  {dict.simulator.childPaysItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              {dict.simulator.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
