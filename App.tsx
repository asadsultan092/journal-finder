
import React, { useState } from 'react';
import { Search, BookMarked, Sparkles, Loader2, Info, ArrowRight, Award, DollarSign, Clock } from 'lucide-react';
import { Journal, SearchParams, AppStatus } from './types';
import { suggestJournals } from './services/geminiService';
import { JournalCard } from './components/JournalCard';
import { JournalModal } from './components/JournalModal';
import { ResourceSection } from './components/ResourceSection';

const App: React.FC = () => {
  const [params, setParams] = useState<SearchParams>({ title: '', keywords: '' });
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!params.title || !params.keywords) return;

    setStatus(AppStatus.LOADING);
    setError(null);
    try {
      const { journals: results } = await suggestJournals(params);
      setJournals(results);
      setStatus(AppStatus.SUCCESS);
    } catch (err) {
      setError('Failed to fetch journal suggestions. Please try again.');
      setStatus(AppStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass sticky top-0 z-40 border-b border-slate-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <BookMarked size={22} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">JournalFinder <span className="text-indigo-600">By ASAD</span></h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Smart Publication Companion</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {/* Search Section */}
        <section className="mb-12">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Find the perfect home for your <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-4">research.</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              Enter your research title and keywords to get AI-powered journal recommendations from <span className="text-slate-900 font-bold">ACM, Springer, Elsevier, and IEEE</span>.
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  Paper Title <Info size={14} className="text-slate-400" />
                </label>
                <input 
                  type="text" 
                  placeholder="e.g., Deep Learning Approaches for Early Detection of..."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium text-slate-800"
                  value={params.title}
                  onChange={e => setParams(p => ({ ...p, title: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  Keywords <Info size={14} className="text-slate-400" />
                </label>
                <input 
                  type="text" 
                  placeholder="e.g., neural networks, healthcare, diagnostic imaging"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium text-slate-800"
                  value={params.keywords}
                  onChange={e => setParams(p => ({ ...p, keywords: e.target.value }))}
                  required
                />
              </div>
            </div>
            <button 
              type="submit"
              disabled={status === AppStatus.LOADING}
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-xl shadow-indigo-200"
            >
              {status === AppStatus.LOADING ? (
                <>
                  <Loader2 className="animate-spin" /> Querying ACM, Springer, Elsevier & IEEE...
                </>
              ) : (
                <>
                  <Search size={24} /> Generate Recommendations <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </section>

        {/* Results Section */}
        {status === AppStatus.LOADING && (
          <div className="py-20 text-center flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 border-8 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-800">Searching through Core Databases</h3>
              <p className="text-slate-500">Cross-referencing impact factors, APC fees, and indexing details for the top 50 matches...</p>
            </div>
          </div>
        )}

        {status === AppStatus.ERROR && (
          <div className="bg-red-50 border border-red-200 p-8 rounded-2xl text-center">
            <p className="text-red-700 font-bold text-lg mb-2">Something went wrong</p>
            <p className="text-red-500 mb-6">{error}</p>
            <button 
              onClick={() => setStatus(AppStatus.IDLE)}
              className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold"
            >
              Try Again
            </button>
          </div>
        )}

        {status === AppStatus.SUCCESS && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Recommended for Your Study</h3>
                <p className="text-slate-500 font-medium">Top {journals.length} matches from ACM, Springer, Elsevier, and IEEE</p>
              </div>
              <div className="flex gap-2">
                <span className="bg-slate-100 px-4 py-2 rounded-full text-xs font-bold text-slate-600">
                  {journals.length} Results
                </span>
                <span className="bg-indigo-100 px-4 py-2 rounded-full text-xs font-bold text-indigo-600">
                  Model: GMNI
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {journals.map((journal, idx) => (
                <JournalCard 
                  key={idx} 
                  journal={journal} 
                  onSelect={setSelectedJournal} 
                />
              ))}
            </div>
          </div>
        )}

        {status === AppStatus.IDLE && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { icon: <Award className="text-indigo-600" />, title: "ACM & IEEE Focused", desc: "Specialized recommendations for Computing and Engineering fields." },
              { icon: <DollarSign className="text-indigo-600" />, title: "Springer & Elsevier", desc: "Broad coverage across Science, Medicine, and Social Sciences." },
              { icon: <Clock className="text-indigo-600" />, title: "Comprehensive Data", desc: "50 detailed suggestions with full metrics for better decision making." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                  {React.cloneElement(feature.icon as React.ReactElement<any>, { size: 32 })}
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h4>
                <p className="text-slate-500 font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* New Academic Resources Section */}
        <ResourceSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm font-medium mb-4">
            Helping researchers find clarity in a world of 50,000+ journals.
          </p>
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">About</a>
          </div>
          <p className="text-xs text-slate-300 font-bold uppercase tracking-widest">
            &copy; 2024 JournalFinder AI. Powered by ASAD SULTAN.
          </p>
        </div>
      </footer>

      {/* Modal */}
      {selectedJournal && (
        <JournalModal 
          journal={selectedJournal} 
          onClose={() => setSelectedJournal(null)} 
        />
      )}
    </div>
  );
};

export default App;
