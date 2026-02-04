'use client';

import { useState } from 'react';
import { track } from '@vercel/analytics';
import type { Dictionary } from '@/i18n';

interface ThankYouModalProps {
  dict: Dictionary;
  isOpen: boolean;
  onClose: () => void;
}

export default function ThankYouModal({
  dict,
  isOpen,
  onClose,
}: ThankYouModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [interestReasons, setInterestReasons] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState('');
  const [painLevel, setPainLevel] = useState('');
  const [contactPref, setContactPref] = useState('');

  const resetState = () => {
    setSubmitted(false);
    setInterestReasons([]);
    setAgeRange('');
    setPainLevel('');
    setContactPref('');
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl text-center">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="py-4">
          <div className="w-16 h-16 bg-amber-100 text-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {submitted ? dict.modal.successTitle : dict.modal.title}
          </h2>
          <p className="text-slate-600 mb-6">
            {submitted ? dict.modal.successDescription : dict.modal.description}
          </p>
          {!submitted && (
            <>
              <div className="grid gap-4 text-left">
                <div>
                  <div className="text-sm font-semibold text-slate-700 mb-2">
                    {dict.modal.q0}
                  </div>
                  <div className="text-xs text-slate-500 mb-2">
                    {dict.modal.q0Hint}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {dict.modal.q0Options.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setInterestReasons((prev) =>
                            prev.includes(option)
                              ? prev.filter((item) => item !== option)
                              : [...prev, option]
                          );
                        }}
                        className={`px-3 py-2 rounded-full text-sm border ${
                          interestReasons.includes(option)
                            ? 'bg-teal-700 text-white border-teal-700'
                            : 'bg-white text-slate-600 border-slate-200'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-700 mb-2">
                    {dict.modal.q1}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {dict.modal.q1Options.map((option) => (
                      <button
                        key={option}
                        onClick={() => setAgeRange(option)}
                        className={`px-3 py-2 rounded-full text-sm border ${
                          ageRange === option
                            ? 'bg-teal-700 text-white border-teal-700'
                            : 'bg-white text-slate-600 border-slate-200'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-700 mb-2">
                    {dict.modal.q2}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {dict.modal.q2Options.map((option) => (
                      <button
                        key={option}
                        onClick={() => setPainLevel(option)}
                        className={`px-3 py-2 rounded-full text-sm border ${
                          painLevel === option
                            ? 'bg-teal-700 text-white border-teal-700'
                            : 'bg-white text-slate-600 border-slate-200'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-700 mb-2">
                    {dict.modal.q3}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {dict.modal.q3Options.map((option) => (
                      <button
                        key={option}
                        onClick={() => setContactPref(option)}
                        className={`px-3 py-2 rounded-full text-sm border ${
                          contactPref === option
                            ? 'bg-teal-700 text-white border-teal-700'
                            : 'bg-white text-slate-600 border-slate-200'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  track('survey_submit', {
                    interestReasons: interestReasons.join(', '),
                    ageRange: ageRange || 'not_selected',
                    painLevel: painLevel || 'not_selected',
                    contactPref: contactPref || 'not_selected',
                  });
                  setSubmitted(true);
                }}
                className="mt-6 w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {dict.modal.submit}
              </button>
              <p className="text-xs text-slate-500 mt-3">
                {dict.modal.note}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
