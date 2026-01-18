import React from 'react';
import { useAppStore } from '../store';
import { ArrowUpRight, Clock, Users, Globe, Plus, AlertCircle } from 'lucide-react';

export const Dashboard: React.FC<{ onNavigate: (view: any) => void, onNewEntry: () => void }> = ({ onNavigate, onNewEntry }) => {
  const { entries, employees, values, company } = useAppStore();

  const recentEntries = entries.slice(0, 3);
  const driftCount = values.filter(v => {
    const days = Math.floor((new Date().getTime() - new Date(v.lastReferencedDate).getTime()) / (1000 * 3600 * 24));
    return days > 60;
  }).length;

  return (
    <div className="max-w-6xl mx-auto animate-fade-in pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="font-serif text-4xl text-stone-900 mb-2">Good morning, Eleanor.</h2>
          <p className="text-stone-500 font-sans">Here is the pulse of {company.name} today.</p>
        </div>
        <div className="flex gap-3">
           <button onClick={onNewEntry} className="px-4 py-2 bg-stone-900 text-stone-50 text-sm font-medium hover:bg-accent transition-colors shadow-lg shadow-stone-900/10 flex items-center gap-2">
             <Plus size={16} /> Record Moment
           </button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Culture Pulse (Drift) */}
        <div 
          onClick={() => onNavigate('values')}
          className="col-span-1 bg-white p-6 border border-stone-200 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <Clock size={64} />
           </div>
           <h3 className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-4">Culture Pulse</h3>
           <div className="flex items-baseline gap-2 mb-2">
             <span className="font-display text-5xl text-stone-900">{driftCount}</span>
             <span className="text-stone-500 font-serif italic">values drifting</span>
           </div>
           {driftCount > 0 ? (
             <p className="text-sm text-red-600 flex items-center gap-1.5 mt-2">
               <AlertCircle size={14} /> Needs attention
             </p>
           ) : (
             <p className="text-sm text-green-600 flex items-center gap-1.5 mt-2">
               All systems nominal
             </p>
           )}
        </div>

        {/* Card 2: Team Stats */}
        <div 
          onClick={() => onNavigate('people')}
          className="col-span-1 bg-white p-6 border border-stone-200 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <Users size={64} />
           </div>
           <h3 className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-4">The Cast</h3>
           <div className="flex items-baseline gap-2 mb-2">
             <span className="font-display text-5xl text-stone-900">{employees.length}</span>
             <span className="text-stone-500 font-serif italic">builders</span>
           </div>
           <div className="flex -space-x-2 mt-4">
             {employees.slice(0, 4).map(e => (
               <img key={e.id} src={e.photoUrl} className="w-8 h-8 rounded-full border-2 border-white object-cover grayscale group-hover:grayscale-0 transition-all" alt={e.name} />
             ))}
             {employees.length > 4 && (
               <div className="w-8 h-8 rounded-full border-2 border-white bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500">
                 +{employees.length - 4}
               </div>
             )}
           </div>
        </div>

        {/* Card 3: Candidate Portal Status */}
        <div 
          onClick={() => onNavigate('settings')}
          className={`col-span-1 p-6 border shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden ${company.candidatePortalEnabled ? 'bg-stone-900 text-stone-50 border-stone-900' : 'bg-stone-100 border-stone-200 text-stone-400'}`}
        >
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <Globe size={64} />
           </div>
           <h3 className="text-xs font-mono uppercase tracking-widest opacity-60 mb-4">Candidate Portal</h3>
           <div className="flex items-center gap-2 mb-2">
             <span className="font-display text-2xl">{company.candidatePortalEnabled ? 'Live & Public' : 'Offline'}</span>
           </div>
           <p className="text-sm opacity-80 font-serif leading-relaxed mt-2">
             {company.candidatePortalEnabled 
               ? "Your story is visible to the world. Click to manage visibility."
               : "The portal is currently hidden. Activate it to attract talent."
             }
           </p>
        </div>

        {/* Card 4: Recent Activity Feed (Wide) */}
        <div className="col-span-1 md:col-span-3 bg-white border border-stone-200 shadow-sm p-8">
           <div className="flex items-center justify-between mb-6">
             <h3 className="text-xs font-mono uppercase tracking-widest text-stone-400">Recent Memory</h3>
             <button onClick={() => onNavigate('timeline')} className="text-xs font-bold text-accent hover:text-accent-dark flex items-center gap-1">
               View Timeline <ArrowUpRight size={14} />
             </button>
           </div>
           
           <div className="space-y-6">
             {recentEntries.map(entry => (
               <div key={entry.id} className="group flex items-start gap-4 pb-6 border-b border-stone-100 last:border-0 last:pb-0">
                  <div className="w-12 h-12 flex-shrink-0 bg-stone-50 border border-stone-100 flex items-center justify-center text-lg">
                    {entry.type === 'Milestone' ? '🏔️' : entry.type === 'Hire' ? '👋' : '📝'}
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-stone-900 group-hover:text-accent transition-colors">{entry.title}</h4>
                    <p className="text-sm text-stone-500 line-clamp-1 mb-1">{entry.body}</p>
                    <div className="flex items-center gap-3 text-xs text-stone-400 font-mono">
                      <span>{entry.date}</span>
                      <span>•</span>
                      <span>{entry.author}</span>
                    </div>
                  </div>
               </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
};