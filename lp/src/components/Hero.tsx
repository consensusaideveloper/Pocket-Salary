'use client';

import { useState } from 'react';
import type { Dictionary } from '@/i18n';

interface HeroProps {
  dict: Dictionary;
  onCTAClick: () => void;
}

export default function Hero({ dict, onCTAClick }: HeroProps) {
  const [mockView, setMockView] = useState<'parent' | 'child'>('parent');
  const [parentAction, setParentAction] = useState<string | null>(null);
  const [childAction, setChildAction] = useState<string | null>(null);
  const [parentNote, setParentNote] = useState('');
  const [parentNoteSaved, setParentNoteSaved] = useState(false);
  const [childRecent, setChildRecent] = useState(dict.heroMock.child.recent);
  const [childAdded, setChildAdded] = useState(false);
  const mock = mockView === 'parent' ? dict.heroMock.parent : dict.heroMock.child;
  const parentPanel = dict.heroMock.parent.actions.find((action) => action.key === parentAction);
  const childPanel = dict.heroMock.child.actions.find((action) => action.key === childAction);
  const childSpendAction = dict.heroMock.child.actions.find((action) => action.key === 'spend');

  const handleParentTab = () => {
    setMockView('parent');
    setChildAction(null);
    setChildAdded(false);
  };

  const handleChildTab = () => {
    setMockView('child');
    setParentAction(null);
    setParentNoteSaved(false);
  };

  const handleParentNoteSave = () => {
    if (!parentNote.trim()) return;
    setParentNoteSaved(true);
  };

  const handleChildSpendSave = () => {
    if (!childSpendAction?.demoLabel || !childSpendAction.demoAmount) return;
    setChildRecent((prev) => {
      const exists = prev.some(
        (item) => item.label === childSpendAction.demoLabel && item.amount === childSpendAction.demoAmount
      );
      if (exists) return prev;
      return [{ label: childSpendAction.demoLabel, amount: childSpendAction.demoAmount }, ...prev];
    });
    setChildAdded(true);
  };

  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-amber-50 via-white to-slate-50 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl" />
      <div className="absolute top-40 -left-16 w-56 h-56 bg-cyan-200/40 rounded-full blur-3xl" />
      <div className="max-w-6xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-white/80 border border-amber-100 text-teal-800 text-sm font-semibold px-4 py-2 rounded-full shadow-sm fade-up">
              <span className="w-2 h-2 bg-teal-700 rounded-full" />
              {dict.hero.badge}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight mt-6 fade-up">
              {dict.hero.headline}
              <br />
              <span className="text-teal-700">{dict.hero.headlineSub}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl fade-up">
              {dict.hero.subheadline}
            </p>
            <p className="text-sm text-slate-500 mb-6">
              {dict.hero.childNote}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={onCTAClick}
                className="bg-teal-700 hover:bg-teal-800 text-white font-semibold py-4 px-8 rounded-full text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                {dict.hero.cta}
              </button>
              <div className="text-sm text-slate-500">
                {dict.hero.subNote}
              </div>
            </div>
            <div className="mt-10 grid sm:grid-cols-2 gap-4 text-left">
              {dict.hero.pills.map((pill) => (
                <div
                  key={pill.title}
                  className="bg-white/90 border border-slate-200 rounded-2xl p-5 shadow-sm hero-float"
                >
                  <div className="text-sm font-semibold text-teal-700 mb-2">
                    {pill.title}
                  </div>
                  <div className="text-slate-600 text-sm">
                    {pill.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 -right-4 w-24 h-24 bg-amber-200/70 rounded-3xl rotate-6 blur-xl" />
            <div className="absolute -bottom-8 -left-6 w-28 h-28 bg-emerald-200/60 rounded-3xl -rotate-6 blur-xl" />
            <div
              className={`relative rounded-3xl shadow-xl p-6 transition-colors ${
                mockView === 'parent'
                  ? 'bg-white border border-slate-200'
                  : 'bg-gradient-to-b from-amber-50/80 to-white border border-amber-200 ring-2 ring-amber-200/60'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm font-semibold text-slate-700">{mock.title}</div>
                <div className="text-xs text-slate-500">{mock.tag}</div>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 rounded-full p-1 mb-3">
                <button
                  onClick={handleParentTab}
                  aria-pressed={mockView === 'parent'}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                    mockView === 'parent'
                      ? 'bg-white text-teal-700 shadow-sm'
                      : 'text-slate-500'
                  }`}
                >
                  {dict.heroMock.tabs.parent}
                </button>
                <button
                  onClick={handleChildTab}
                  aria-pressed={mockView === 'child'}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                    mockView === 'child'
                      ? 'bg-white text-teal-700 shadow-sm'
                      : 'text-slate-500'
                  }`}
                >
                  {dict.heroMock.tabs.child}
                </button>
              </div>
              <div className="text-xs text-slate-500 mb-4">
                {dict.heroMock.toggleHint}
              </div>
              {mockView === 'parent' ? (
                <>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dict.heroMock.parent.quickSummary.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-500">
                        <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 inline-flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1m11-9a4 4 0 11-8 0 4 4 0 018 0m7 9v-1a4 4 0 00-3-3.87" />
                          </svg>
                        </span>
                        {dict.heroMock.parent.familyLabel}
                      </span>
                      <span className="text-slate-700 font-semibold">{dict.heroMock.parent.familyValue}</span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {dict.heroMock.parent.children.map((child) => (
                        <div key={child.name} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
                          <div className="text-xs font-semibold text-slate-700 mb-1">{child.name}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 inline-flex items-center justify-center">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="3" y="7" width="18" height="12" rx="2" strokeWidth={2} />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11h4" />
                              </svg>
                            </span>
                            {child.hand}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 inline-flex items-center justify-center">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 10h16M6 10v7m4-7v7m4-7v7m4-7v7M3 10l9-5 9 5" />
                              </svg>
                            </span>
                            {child.parent}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mb-2">
                    {dict.heroMock.parent.recentTitle}
                  </div>
                  <div className="space-y-3">
                    {dict.heroMock.parent.recent.map((item, index) => {
                      const colors = ['bg-amber-400', 'bg-emerald-400', 'bg-amber-500'];
                      const color = colors[index % colors.length];
                      return (
                        <div
                          key={item.label}
                          className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3 shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-3 h-3 rounded-full ${color}`} />
                            <span className="text-sm text-slate-600">{item.label}</span>
                          </div>
                          <span className="text-sm font-semibold text-slate-700">
                            {item.amount}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {dict.heroMock.parent.chips.map((chip) => (
                      <div key={chip.label} className="bg-slate-50/80 border border-slate-200 rounded-xl p-3">
                        <div className="text-xs text-slate-500">{chip.label}</div>
                        <div className="text-sm font-semibold text-slate-700">{chip.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <div className="text-xs font-semibold text-slate-500 mb-2">
                      {dict.heroMock.parent.actionsTitle}
                    </div>
                    <div className="text-xs text-slate-500 mb-2">
                      {dict.heroMock.parent.actionsHint}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {dict.heroMock.parent.actions.map((action) => (
                        <button
                          key={action.key}
                          onClick={() => {
                            setParentAction((prev) => (prev === action.key ? null : action.key));
                            if (action.key !== 'review') {
                              setParentNote('');
                              setParentNoteSaved(false);
                            }
                          }}
                          aria-pressed={parentAction === action.key}
                          className={`px-3 py-2 rounded-2xl text-xs font-semibold border transition-colors ${
                            parentAction === action.key
                              ? 'bg-teal-700 text-white border-teal-700'
                              : 'bg-white text-slate-600 border-slate-200'
                          }`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                    {parentPanel && (
                      <div className="mt-3 bg-slate-50/80 border border-slate-200 rounded-xl p-3">
                        <div className="text-xs font-semibold text-slate-700 mb-1">
                          {parentPanel.panelTitle}
                        </div>
                        <div className="text-xs text-slate-600">
                          {parentPanel.panelBody}
                        </div>
                        {parentPanel.key === 'review' ? (
                          <div className="mt-2">
                            <textarea
                              value={parentNote}
                              onChange={(event) => {
                                setParentNote(event.target.value);
                                setParentNoteSaved(false);
                              }}
                              placeholder={parentPanel.notePlaceholder}
                              className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-200"
                              rows={2}
                            />
                            <button
                              onClick={handleParentNoteSave}
                              className="mt-2 text-xs font-semibold text-teal-700"
                            >
                              {parentPanel.panelCta}
                            </button>
                            {parentNoteSaved && (
                              <div className="mt-1 text-xs text-emerald-600">
                                {parentPanel.savedText}
                              </div>
                            )}
                          </div>
                        ) : (
                          <button className="mt-2 text-xs font-semibold text-teal-700">
                            {parentPanel.panelCta}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-500">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 inline-flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </span>
                        {dict.heroMock.child.annualLabel}
                      </span>
                      <span className="text-slate-700 font-semibold">{dict.heroMock.child.annualValue}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="flex items-center gap-2 text-slate-500">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 inline-flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="6" strokeWidth={2} />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                          </svg>
                        </span>
                        {dict.heroMock.child.remainingLabel}
                      </span>
                      <span className="text-slate-700 font-semibold">{dict.heroMock.child.remainingValue}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-teal-700 rounded-full" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 inline-flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect x="3" y="7" width="18" height="12" rx="2" strokeWidth={2} />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11h4" />
                          </svg>
                        </span>
                        {dict.heroMock.child.handLabel}
                      </div>
                      <div className="text-sm font-semibold text-slate-700">{dict.heroMock.child.handValue}</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 inline-flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 10h16M6 10v7m4-7v7m4-7v7m4-7v7M3 10l9-5 9 5" />
                          </svg>
                        </span>
                        {dict.heroMock.child.parentLabel}
                      </div>
                      <div className="text-sm font-semibold text-slate-700">{dict.heroMock.child.parentValue}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {dict.heroMock.child.quickSummary.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mb-2">
                    {dict.heroMock.child.recentTitle}
                  </div>
                  <div className="space-y-3">
                    {childRecent.map((item, index) => {
                      const colors = ['bg-amber-400', 'bg-emerald-400', 'bg-amber-500'];
                      const color = colors[index % colors.length];
                      return (
                        <div
                          key={item.label}
                          className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-3 h-3 rounded-full ${color}`} />
                            <span className="text-sm text-slate-600">{item.label}</span>
                          </div>
                          <span className="text-sm font-semibold text-slate-700">
                            {item.amount}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {dict.heroMock.child.chips.map((chip) => (
                      <div key={chip.label} className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                        <div className="text-xs text-slate-500">{chip.label}</div>
                        <div className="text-sm font-semibold text-slate-700">{chip.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <div className="text-xs font-semibold text-slate-500 mb-2">
                      {dict.heroMock.child.actionsTitle}
                    </div>
                    <div className="text-xs text-slate-500 mb-2">
                      {dict.heroMock.child.actionsHint}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {dict.heroMock.child.actions.map((action) => (
                        <button
                          key={action.key}
                          onClick={() => {
                            setChildAction((prev) => (prev === action.key ? null : action.key));
                            if (action.key !== 'spend') {
                              setChildAdded(false);
                            }
                          }}
                          aria-pressed={childAction === action.key}
                          className={`px-3 py-3 rounded-2xl text-sm font-semibold border transition-colors ${
                            childAction === action.key
                              ? 'bg-teal-700 text-white border-teal-700'
                              : 'bg-white text-slate-600 border-slate-200'
                          }`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                    {childPanel && (
                      <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
                        <div className="text-xs font-semibold text-slate-700 mb-1">
                          {childPanel.panelTitle}
                        </div>
                        <div className="text-xs text-slate-600">
                          {childPanel.panelBody}
                        </div>
                        {childPanel.key === 'spend' ? (
                          <>
                            <button
                              onClick={handleChildSpendSave}
                              className="mt-2 text-xs font-semibold text-teal-700"
                            >
                              {childPanel.panelCta}
                            </button>
                            {childAdded && (
                              <div className="mt-1 text-xs text-emerald-600">
                                {childPanel.savedText}
                              </div>
                            )}
                          </>
                        ) : (
                          <button className="mt-2 text-xs font-semibold text-teal-700">
                            {childPanel.panelCta}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 hidden lg:block">
              <div className="bg-teal-700 text-white text-xs font-semibold px-3 py-2 rounded-full shadow-lg">
                {dict.heroMock.badge}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
