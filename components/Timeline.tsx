import React, { useState, useMemo } from 'react';
import { TimelineEntry, EntryType } from '../types';
import { Search, Filter, Lock, Globe, Paperclip, Calendar } from 'lucide-react';

interface TimelineProps {
  entries: TimelineEntry[];
  isCandidateView?: boolean;
  onEntryClick?: (entry: TimelineEntry) => void;
}

const EntryIcon = ({ type }: { type: EntryType }) => {
  switch (type) {
    case 'Milestone': return <span className="text-xl">🏔️</span>;
    case 'Founding': return <span className="text-xl">🌱</span>;
    case 'Pivot': return <span className="text-xl">⚡</span>;
    case 'Hire': return <span className="text-xl">👋</span>;
    case 'Funding': return <span className="text-xl">💰</span>;
    case 'Culture': return <span className="text-xl">🗿</span>;
    case 'Customer': return <span className="text-xl">🤝</span>;
    default: return <span className="text-xl">📝</span>;
  }
};

export const Timeline: React.FC<TimelineProps> = ({ entries, isCandidateView = false, onEntryClick }) => {
  const [filterType, setFilterType] = useState<EntryType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntries = useMemo(() => {
    return entries
      .filter(e => {
        if (isCandidateView && e.visibility === 'Internal') return false;
        if (filterType !== 'All' && e.type !== filterType) return false;
        if (searchQuery && !e.title.toLowerCase().includes(searchQuery.toLowerCase()) && !e.body.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [entries, filterType, searchQuery, isCandidateView]);

  return (
    <div className="w-full max-w-4xl mx-auto pb-20">
      {/* Controls */}
      <div className="sticky top-0 z-20 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200 py-4 mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-4 md:px-0">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search history..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-sm text-sm font-sans focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-200 transition-all placeholder:text-stone-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {['All', 'Milestone', 'Culture', 'Funding', 'Hire'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type as EntryType | 'All')}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold border transition-all whitespace-nowrap ${
                  filterType === type 
                    ? 'bg-stone-800 text-stone-50 border-stone-800' 
                    : 'bg-transparent text-stone-500 border-stone-200 hover:border-stone-400'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative px-4 md:px-8">
        {/* Central Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-stone-300 transform -translate-x-1/2 z-0"></div>

        <div className="space-y-16">
          {filteredEntries.map((entry, index) => {
            const isLeft = index % 2 === 0;
            const dateObj = new Date(entry.date);
            const formattedDate = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

            return (
              <div 
                key={entry.id} 
                className={`relative flex flex-col md:flex-row gap-8 items-start animate-fade-in ${isLeft ? 'md:flex-row-reverse' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                
                {/* Date Placard (Mobile: Top, Desktop: Center) */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center z-10 bg-stone-50 border border-stone-200 rounded-full shadow-sm">
                   <EntryIcon type={entry.type} />
                </div>

                {/* Empty spacer for opposite side */}
                <div className="hidden md:block w-1/2" />

                {/* Content Card */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div 
                    onClick={() => onEntryClick && onEntryClick(entry)}
                    className="group relative bg-white border border-stone-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    
                    {/* Decorative tape/pin */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-stone-100/50 rotate-[-1deg] border-l border-r border-white/50 backdrop-blur-[1px]"></div>

                    {/* Metadata Header */}
                    <div className="flex justify-between items-start mb-4 border-b border-stone-100 pb-3">
                      <div className="flex flex-col">
                        <span className="font-mono text-xs text-stone-400 uppercase tracking-widest">{formattedDate}</span>
                        <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest mt-1">{entry.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         {!isCandidateView && (
                           <div title={entry.visibility} className="text-stone-300">
                             {entry.visibility === 'Public' ? <Globe size={14} /> : <Lock size={14} />}
                           </div>
                         )}
                      </div>
                    </div>

                    {/* Title & Body */}
                    <h3 className="font-serif text-2xl text-stone-800 leading-tight mb-3 group-hover:text-accent transition-colors">
                      {entry.title}
                    </h3>
                    <p className="font-sans text-stone-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {entry.body}
                    </p>

                    {/* Attachments & Tags */}
                    {(entry.attachments || entry.tags) && (
                      <div className="space-y-4 pt-2">
                        {entry.attachments && entry.attachments.length > 0 && (
                          <div className="mb-4">
                            {entry.attachments.map((att, i) => (
                              <div key={i} className="relative overflow-hidden rounded-sm border border-stone-100 aspect-video group-hover:sepia-[.3] transition-all">
                                <img src={att.url} alt={att.title} className="object-cover w-full h-full" />
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2">
                          {entry.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-stone-50 border border-stone-200 text-stone-500 text-[10px] uppercase tracking-wider font-medium">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-dashed border-stone-200 flex justify-between items-center text-xs text-stone-400 font-mono">
                      <span>Authored by {entry.author}</span>
                      <button className="hover:text-stone-800 transition-colors">Read Full Entry ↗</button>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* End Mark */}
        <div className="absolute left-8 md:left-1/2 -translate-x-1/2 bottom-0 w-3 h-3 bg-stone-300 rounded-full"></div>
      </div>
    </div>
  );
};