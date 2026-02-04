"use client";

import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n";

interface HeaderProps {
  dict: Dictionary;
  locale: Locale;
}

export default function Header({ dict, locale }: HeaderProps) {
  const otherLocale = locale === "ja" ? "en" : "ja";

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image
            src="/icon.png"
            alt="Pocket Salary"
            width={120}
            height={120}
            className="h-14 w-auto"
          />
          <span className="text-lg font-bold tracking-tight">
            <span className="text-teal-600">Pocket</span>
            <span className="text-slate-800"> Salary</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/kids`}
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            {dict.header.kids}
          </Link>
          <Link
            href={`/${otherLocale}`}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {otherLocale === "ja" ? "日本語" : "English"}
          </Link>
        </div>
      </div>
    </header>
  );
}
