
import React from 'react';
import { FileText, Library, BarChart, PenTool, ExternalLink, Hash, Database, Search } from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
}

interface ResourceCategory {
  category: string;
  items: Resource[];
}

const resources: ResourceCategory[] = [
  {
    category: "Writing & Formatting",
    items: [
      { 
        title: "Overleaf", 
        description: "Standard online collaborative LaTeX editor with pre-loaded journal templates.", 
        link: "https://www.overleaf.com/", 
        icon: <FileText className="text-emerald-500" size={20} /> 
      },
      { 
        title: "IEEE Template Selector", 
        description: "Official tool to find the correct LaTeX/Word format for IEEE publications.", 
        link: "https://template-selector.ieee.org/", 
        icon: <Hash className="text-blue-500" size={20} /> 
      },
      { 
        title: "ACM Master Templates", 
        description: "Official LaTeX primary article templates for ACM journals and proceedings.", 
        link: "https://www.acm.org/publications/proceedings-template", 
        icon: <Database className="text-orange-500" size={20} /> 
      }
    ]
  },
  {
    category: "Literature Review & Discovery",
    items: [
      { 
        title: "ResearchRabbit", 
        description: "An 'AI-powered' discovery tool to map literature and find related papers.", 
        link: "https://www.researchrabbit.ai/", 
        icon: <Library className="text-purple-500" size={20} /> 
      },
      { 
        title: "Connected Papers", 
        description: "Visual tool to explore connected academic papers in a graphical interface.", 
        link: "https://www.connectedpapers.com/", 
        icon: <Search className="text-indigo-500" size={20} /> 
      },
      { 
        title: "Zotero", 
        description: "Free, easy-to-use tool to help you collect, organize, and cite research.", 
        link: "https://www.zotero.org/", 
        icon: <Library className="text-red-500" size={20} /> 
      }
    ]
  },
  {
    category: "Analysis & Data Tools",
    items: [
      { 
        title: "Tableau Public", 
        description: "Powerful platform for creating and sharing interactive data visualizations.", 
        link: "https://public.tableau.com/", 
        icon: <BarChart className="text-blue-600" size={20} /> 
      },
      { 
        title: "Google Colab", 
        description: "Browser-based Python environment for data analysis and machine learning.", 
        link: "https://colab.research.google.com/", 
        icon: <PenTool className="text-yellow-600" size={20} /> 
      },
      { 
        title: "Mendeley Data", 
        description: "Open research data repository to store and share your research datasets.", 
        link: "https://data.mendeley.com/", 
        icon: <Database className="text-slate-600" size={20} /> 
      }
    ]
  }
];

export const ResourceSection: React.FC = () => {
  return (
    <section className="mt-20 mb-12">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-black text-slate-900 mb-3">Academic Toolkit</h3>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto">
          Essential resources and tools to streamline your research workflow, from drafting in LaTeX to performing complex data analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {resources.map((cat, idx) => (
          <div key={idx} className="space-y-4">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">{cat.category}</h4>
            <div className="space-y-3">
              {cat.items.map((item, i) => (
                <a 
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-50 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 bg-slate-50 rounded-xl group-hover:bg-indigo-50 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 flex items-center gap-2 group-hover:text-indigo-600">
                        {item.title} <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h5>
                      <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
