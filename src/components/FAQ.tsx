import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      q: "How do I receive my activity sheets after purchase?",
      a: "Immediately! Right after completing payment, you'll see a download button on the order confirmation screen. We also automatically send an email with your secure download link so you always have a copy."
    },
    {
      q: "Can I print the files multiple times?",
      a: "Yes, absolutely! You can print each sheet as many times as you like for personal use, siblings, or your own classroom. If your child makes a mistake or wants to color a page again, simply reprint it."
    },
    {
      q: "What paper size and printer do I need?",
      a: "All files are formatted in standard high-resolution PDF format, compatible with standard A4 paper (common in Europe/Morocco/International) and US Letter (USA/Canada). Standard home inkjet or laser printers work perfectly."
    },
    {
      q: "What if I lose my download link?",
      a: "No worries! Your order confirmation email contains your link, and you can always reply to our email with your receipt to receive an instant fresh link."
    },
    {
      q: "Are physical items shipped to my home?",
      a: "No, these are 100% digital instant downloads. You will not wait days for postal delivery or pay shipping costs. You download, print, and play within 2 minutes."
    }
  ];

  return (
    <section id="faq" className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
          Got Questions?
        </span>
        <h2 className="text-3xl font-black text-slate-900 mt-3">Frequently Asked Questions</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Everything you need to know about downloading and printing.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group bg-white rounded-2xl border border-slate-200/80 p-5 open:ring-2 open:ring-pink-100 transition-all cursor-pointer"
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
