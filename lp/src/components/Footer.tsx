'use client';

import type { Dictionary } from '@/i18n';

interface FooterProps {
  dict: Dictionary;
}

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className="py-10 px-4 bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm">{dict.footer.copyright}</p>
      </div>
    </footer>
  );
}
