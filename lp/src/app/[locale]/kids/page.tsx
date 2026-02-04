'use client';

import { useParams } from 'next/navigation';
import { getDictionary, isValidLocale } from '@/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function KidsPage() {
  const params = useParams();
  const locale = (params.locale as string) || 'ja';
  const dict = getDictionary(isValidLocale(locale) ? locale : 'ja');

  return (
    <div className="min-h-screen bg-white">
      <Header
        dict={dict}
        locale={locale as 'ja' | 'en'}
      />
      <main className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <a
            href={`/${locale}`}
            className="block text-sm text-slate-600 hover:text-slate-900 mb-6"
          >
            {dict.kids.backLink}
          </a>
          <div className="inline-flex items-center gap-2 bg-white/80 border border-amber-100 text-teal-800 text-sm font-semibold px-4 py-2 rounded-full shadow-sm mb-6">
            {dict.kids.badge}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {dict.kids.title}
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl">
            {dict.kids.subtitle}
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {dict.kids.cards.map((card) => (
              <div
                key={card.title}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6"
              >
                <div className="text-sm font-semibold text-teal-700 mb-2">
                  {card.title}
                </div>
                <div className="text-slate-600">
                  {card.description}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              {dict.kids.howTitle}
            </h2>
            <ol className="list-decimal pl-5 text-slate-600 space-y-2">
              {dict.kids.howSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </main>
      <Footer dict={dict} />
    </div>
  );
}
