import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';

export default function CVPage() {
  return (
    <main className="pt-[88px] pb-8 min-h-screen bg-lab">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-mid
                       hover:text-deep-space transition-colors"
          >
            <ArrowLeft size={15} /> Back to portfolio
          </Link>

          <a
            href="/Ali-Saber-CV.pdf"
            download="Ali-Saber-CV.pdf"
            className="inline-flex items-center gap-2 bg-deep-space text-white
                       px-4 py-2 rounded-lg text-sm font-medium
                       hover:bg-circuit transition-colors shadow-sm"
          >
            <Download size={15} /> Download CV
          </a>
        </div>

        {/* PDF viewer */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <iframe
            src="/Ali-Saber-CV.pdf"
            title="Ali Saber — CV"
            className="w-full block"
            style={{ height: '88vh', minHeight: '500px' }}
          />
        </div>

      </div>
    </main>
  );
}
