import React from 'react';
import { useAppStore } from '../store';
import { Globe, Lock, Save, Copy } from 'lucide-react';

export const Settings: React.FC = () => {
  const { company, updateCompany, togglePortal } = useAppStore();
  const [name, setName] = React.useState(company.name);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-20">
      <h2 className="font-serif text-3xl text-stone-900 mb-8 border-b border-stone-200 pb-4">Workspace Settings</h2>

      {/* Profile Section */}
      <div className="bg-white border border-stone-200 p-8 mb-8 shadow-sm">
        <h3 className="font-bold text-stone-900 mb-6 flex items-center gap-2">Company Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">Company Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-stone-50 border border-stone-200 focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">Founded Date</label>
            <div className="px-4 py-2 bg-stone-100 border border-stone-200 text-stone-500 cursor-not-allowed">
              {company.foundedDate}
            </div>
          </div>
        </div>
        <button 
            onClick={() => updateCompany({ name })}
            className="mt-6 px-4 py-2 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-accent transition-colors flex items-center gap-2"
        >
            <Save size={14} /> Save Changes
        </button>
      </div>

      {/* Candidate Portal Section */}
      <div className={`border p-8 shadow-sm transition-colors ${company.candidatePortalEnabled ? 'bg-white border-accent/30' : 'bg-stone-50 border-stone-200'}`}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="font-bold text-stone-900 mb-2 flex items-center gap-2">
              <Globe size={18} className={company.candidatePortalEnabled ? 'text-accent' : 'text-stone-400'} /> 
              Candidate Portal
            </h3>
            <p className="text-sm text-stone-500 max-w-lg leading-relaxed">
              When enabled, a public version of your timeline (excluding "Internal" entries) will be accessible via a shareable link.
            </p>
          </div>
          <button 
            onClick={togglePortal}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${company.candidatePortalEnabled ? 'bg-accent' : 'bg-stone-300'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${company.candidatePortalEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        {company.candidatePortalEnabled && (
          <div className="mt-6 p-4 bg-stone-100 border border-stone-200 rounded-sm flex items-center justify-between">
             <div className="font-mono text-xs text-stone-600 truncate">
               https://culturebook.com/{company.name.toLowerCase().replace(/\s/g, '-')}/careers
             </div>
             <button className="text-xs font-bold text-stone-900 hover:text-accent flex items-center gap-1">
               <Copy size={12} /> Copy Link
             </button>
          </div>
        )}
      </div>

    </div>
  );
};