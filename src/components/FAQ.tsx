import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      q: "How do I receive my digital files after purchase?",
      a: "Immediately! As soon as payment completes, a direct download button appears on your confirmation screen. We also automatically send an email with your permanent secure download link so you always have a copy."
    },
    {
      q: "What devices can play the Audiobooks (MP3)?",
      a: "All audio files are delivered as standard high-bitrate DRM-free MP3 tracks. You can play them directly on any smartphone (iPhone, Android), tablet, computer, smart speakers, or transfer them to a kids audio player."
    },
    {
      q: "What is the DULO TOONS universe?",
      a: "DULO TOONS is our exclusive creative franchise starring Dulo the Baby Dragon and his magical forest companions. It includes bedtime audio stories, 3D papercraft gliders, and giant coloring sheets designed to spark creativity and peaceful sleep."
    },
    {
      q: "Can I print the worksheets and planners multiple times?",
      a: "Yes, 100%! All printable sheets, workbooks, and planners come with an unlimited personal/classroom license. You can print them as often as your children or students want."
    },
    {
      q: "What format are the eBooks and Guides?",
      a: "Our eBooks come bundled with both reflowable EPUB (compatible with Kindle, Apple Books, and eReaders) and clean high-resolution PDF format for easy reading on tablets and computers."
    },
    {
      q: "What if I lose my download link?",
      a: "No problem! Your order confirmation email retains your download link. You can also contact support with your purchase email to receive an instant fresh link."
    }
  ];

  return (
    <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 my-6">
      <div className="text-center mb-10">
        <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-white border border-emerald-300 px-3.5 py-1.5 rounded-full shadow-xs">
          Got Questions?
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-3">Frequently Asked Questions</h2>
        <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-1">Everything you need to know about formats, audio playback, and printing.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-xs open:ring-2 open:ring-emerald-300 transition-all cursor-pointer"
          >
            <summary className="flex items-center justify-between font-bold text-slate-800 text-sm sm:text-base list-none">
              <span className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-amber-500 shrink-0" />
                {faq.q}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 pl-8 leading-relaxed">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
