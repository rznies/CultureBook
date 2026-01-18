import React from 'react';
import { TimelineEntry } from '../types';
import { X, Calendar, User, Tag, Share2, MessageSquare } from 'lucide-react';

interface EntryDetailProps {
  entry: TimelineEntry;
  onClose: () => void;
}

export const EntryDetail: React.FC<EntryDetailProps> = ({ entry, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex justify-end">
      {/* Slide-over Panel */}
      <div className="w-full max-w-2xl h-full bg-[#FDFBF7] shadow-2xl overflow-y-auto animate-fade-in relative">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full border border-stone-200 text-stone-500 hover:text-stone-900 hover:border-stone-400 transition-all"
        >
          <X size={20} />
        </button>

        {/* Hero Image */}
        {entry.attachments && entry.attachments[0] && entry.attachments[0].type === 'image' && (
          <div className="w-full h-64 md:h-80 relative">
            <img src={entry.attachments[0].url} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] to-transparent opacity-80"></div>
          </div>
        )}

        <div className={`px-8 md:px-12 pb-20 ${entry.attachments && entry.attachments[0]?.type === 'image' ? '-mt-20 relative z-10' : 'pt-20'}`}>
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-stone-500 mb-4">
              <span className="px-2 py-1 border border-stone-200 rounded-sm">{entry.type}</span>
              <span className="flex items-center gap-1"><Calendar size={12} /> {entry.date}</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl text-stone-900 leading-[1.1] mb-6">
              {entry.title}
            </h1>

            <div className="flex items-center gap-3 border-b border-stone-200 pb-8">
               <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden">
                 <img src={`https://ui-avatars.com/api/?name=${entry.author}&background=random`} alt={entry.author} />
               </div>
               <div>
                 <p className="text-sm font-bold text-stone-900">{entry.author}</p>
                 <p className="text-xs text-stone-500">Posted in General</p>
               </div>
            </div>
          </div>

          {/* Body */}
          <div className="prose prose-stone prose-lg font-serif text-stone-700 leading-relaxed mb-12">
            <p>{entry.body}</p>
            <p>
              (This is a placeholder for the rich text content. In a real implementation, this would contain multiple paragraphs, blockquotes, and embedded media reflecting the full archival entry.)
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {entry.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-1 rounded-sm">
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>

          {/* Discussion / Footer */}
          <div className="bg-white border border-stone-200 p-6 rounded-sm">
            <h3 className="font-sans font-bold text-sm text-stone-900 mb-4 flex items-center gap-2">
              <MessageSquare size={16} /> Discussion
            </h3>
            <div className="text-sm text-stone-500 italic text-center py-4">
              No comments yet. Be the first to reflect on this moment.
            </div>
            <div className="mt-4 flex gap-2">
              <input type="text" placeholder="Add a comment..." className="flex-1 border-b border-stone-200 py-2 focus:outline-none focus:border-accent font-sans text-sm" />
              <button className="text-xs font-bold uppercase tracking-widest text-stone-900 hover:text-accent">Post</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};