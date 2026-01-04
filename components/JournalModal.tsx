
import React from 'react';
import { Journal } from '../types';
import { X, ExternalLink, BarChart3, Globe, DollarSign, Calendar, BookOpen, Layers } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface JournalModalProps {
  journal: Journal;
  onClose: () => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({ journal, onClose }) => {
  const chartData = [
    { name: 'Impact Factor', value: journal.impactFactor, color: '#6366f1' },
    { name: 'CiteScore', value: journal.citeScore, color: '#8b5cf6' },
    { name: 'H-Index', value: journal.hIndex / 10, label: journal.hIndex, color: '#ec4899' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
        <div className="relative p-8 border-b border-slate-100 flex justify-between items-start bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-[85%]">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full">{journal.quartile}</span>
              {journal.openAccess && (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200">OPEN ACCESS</span>
              )}
            </div>
            <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-2">{journal.name}</h2>
            <p className="text-lg text-slate-500 font-medium flex items-center gap-2">
              <Layers size={18} className="text-slate-400" /> Published by {journal.publisher}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-indigo-500" /> Relevance & Scope
                </h3>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-slate-700 leading-relaxed italic">
                  {journal.scopeMatchReasoning}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <BarChart3 size={20} className="text-indigo-500" /> Key Metrics Visualization
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip 
                        cursor={{ fill: '#f8fafc' }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-3 shadow-lg rounded-lg border border-slate-100">
                                <p className="font-bold text-slate-800">{payload[0].payload.name}</p>
                                <p className="text-indigo-600 font-bold">{payload[0].payload.label || payload[0].value}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-slate-800 mb-4">Core Subject Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {journal.subjects.map((sub, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                      {sub}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                <h4 className="font-bold text-indigo-900 mb-4 text-sm uppercase tracking-wider">Quick Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <DollarSign size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-indigo-400 font-bold uppercase">APC Fee</p>
                      <p className="font-bold text-slate-700">{journal.apcAmount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-indigo-400 font-bold uppercase">Decision Time</p>
                      <p className="font-bold text-slate-700">~{journal.averageTurnaroundWeeks} Weeks</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <BarChart3 size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-indigo-400 font-bold uppercase">Acceptance Rate</p>
                      <p className="font-bold text-slate-700">{journal.acceptanceRate}</p>
                    </div>
                  </div>
                </div>
                
                <a 
                  href={journal.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                  <Globe size={18} /> Visit Journal Website <ExternalLink size={14} />
                </a>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-2 text-sm">Reviewer Note</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Always verify publication fees and indexing directly on the official website before submission. Metrics like Impact Factor can change annually.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
