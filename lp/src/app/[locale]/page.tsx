'use client';

import { useState } from 'react';
import { track } from '@vercel/analytics';
import { getDictionary, isValidLocale, type Locale } from '@/i18n';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import Capabilities from '@/components/Capabilities';
import TargetFit from '@/components/TargetFit';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import CTASection from '@/components/CTASection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ThankYouModal from '@/components/ThankYouModal';

export default function HomePage() {
  const params = useParams();
  const locale = (params.locale as string) || 'ja';
  const dict = getDictionary(isValidLocale(locale) ? locale : 'ja');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCTAClick = (source: string, label: string) => {
    // Track CTA click event
    track('cta_click', { source, locale, label });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-white">
      <Header
        dict={dict}
        locale={locale as Locale}
      />
      <main>
        <Hero
          dict={dict}
          onCTAClick={() => handleCTAClick('hero', dict.hero.cta)}
        />
        <Problem dict={dict} />
        <Solution dict={dict} />
        <Capabilities dict={dict} />
        <TargetFit dict={dict} />
        <HowItWorks dict={dict} />
        <Features dict={dict} />
        <FAQ dict={dict} />
        <CTASection
          dict={dict}
          onCTAClick={(label) => handleCTAClick('cta_section', label)}
        />
      </main>
      <Footer dict={dict} />
      <ThankYouModal
        dict={dict}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
