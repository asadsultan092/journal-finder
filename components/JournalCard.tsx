
import React from 'react';
import { Journal } from '../types';
import { Award, Zap, Clock, DollarSign, ExternalLink, ShieldCheck } from 'lucide-react';

interface JournalCardProps {
  journal: Journal;
  onSelect: (journal: Journal) => void;
}

export const JournalCard: React.FC<JournalCardProps> = ({ journal, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(journal)}
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all cursor-pointer group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-2 inline-block ${
            journal.quartile === 'Q1' ? 'bg-green-100 text-green-700' :
            journal.quartile === 'Q2' ? 'bg-blue-100 text-blue-700' :
            'bg-amber-100 text-amber-700'
          }`}>
            {journal.quartile} Journal
          </span>
          <h3 className="text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {journal.name}
          </h3>
          <p className="text-sm text-slate-500 font-medium">{journal.publisher}</p>
        </div>
        {journal.openAccess && (
          <span className="flex items-center gap-1 text-[10px] bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-bold uppercase">
            <Zap size={10} fill="currentColor" /> Open Access
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 p-3 rounded-lg text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center justify-center gap-1">
            <Award size={12} /> Impact Factor
          </p>
          <p className="text-lg font-bold text-slate-700">{journal.impactFactor}</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-lg text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center justify-center gap-1">
            <ShieldCheck size={12} /> Acceptance
          </p>
          <p className="text-lg font-bold text-slate-700">{journal.acceptanceRate}</p>
        </div>
      </div>

      <p className="text-sm text-slate-600 mb-6 flex-grow line-clamp-3 italic">
        "{journal.scopeMatchReasoning}"
      </p>

      <div className="flex items-center justify-between text-xs text-slate-500 border-t pt-4">
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>~{journal.averageTurnaroundWeeks} weeks</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign size={14} />
          <span>APC: {journal.apcAmount}</span>
        </div>
      </div>
    </div>
  );
};
