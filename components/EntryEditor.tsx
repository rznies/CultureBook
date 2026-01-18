import React, { useState } from 'react';
import { X, Image, Link, Calendar, Hash, Save } from 'lucide-react';
import { EntryType, TimelineEntry } from '../types';
import { useAppStore } from '../store';

interface EntryEditorProps {
  onClose: () => void;
}

export const EntryEditor: React.FC<EntryEditorProps> = ({ onClose }) => {
  const { addEntry, company } = useAppStore();
  
  const [type, setType] = useState<EntryType>('Milestone');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [visibility, setVisibility] = useState<'Public' | 'Internal'>('Public');

  const handleSave = () => {
    if (!title || !body) return;

    const newEntry: TimelineEntry = {
      id: Math.random().toString(),
      date,
      title,
      body,
      type,
      tags: [], // Placeholder
      author: 'Eleanor R.', // Mocked logged in user
      visibility,
      likes: 0
    };

    addEntry(newEntry);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-stone-50/95 backdrop-blur-sm flex items-center justify-center overflow-y-auto py-10">
      <div className="w-full max-w-3xl bg-white shadow-2xl min-h-[80vh] relative animate-fade-in border border-stone-200">
        
        {/* Toolbar */}
        <div className="sticky top-0 z-10 bg-white border-b border-stone-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button onClick={onClose} className="text-stone-400 hover:text-stone-900">
               <X size={20} />
             </button>
             <div className="h-4 w-px bg-stone-200"></div>
             <span className="text-xs font-mono uppercase tracking-widest text-stone-400">New Entry</span>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 mr-4">
               <span className="text-xs font-mono text-stone-400 uppercase">Visibility:</span>
               <button onClick={() => setVisibility('Public')} className={`text-xs font-bold uppercase ${visibility === 'Public' ? 'text-accent' : 'text-stone-300'}`}>Public</button>
               <span className="text-stone-200">/</span>
               <button onClick={() => setVisibility('Internal')} className={`text-xs font-bold uppercase ${visibility === 'Internal' ? 'text-stone-900' : 'text-stone-300'}`}>Internal</button>
             </div>
             <button 
               onClick={handleSave} 
               disabled={!title || !body}
               className="px-4 py-2 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-accent transition-colors disabled:opacity-50"
             >
               Publish
             </button>
          </div>
        </div>

        {/* Editor Content */}
        <div className="p-8 md:p-12">
          
          {/* Metadata Controls */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="relative">
              <select 
                value={type}
                onChange={(e) => setType(e.target.value as EntryType)}
                className="appearance-none bg-stone-50 border border-stone-200 px-4 py-2 pr-8 rounded-sm text-sm font-medium text-stone-700 focus:outline-none focus:border-stone-400 uppercase tracking-wide"
              >
                <option value="Milestone">Milestone</option>
                <option value="Culture">Culture</option>
                <option value="Founding">Founding</option>
                <option value="Pivot">Pivot</option>
                <option value="Hire">Hire</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                <span className="text-[10px]">▼</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-stone-50 border border-stone-200 text-stone-500 text-sm">
              <Calendar size={14} />
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent focus:outline-none uppercase tracking-widest text-xs" 
              />
            </div>
          </div>

          {/* Title Input */}
          <textarea 
            placeholder="Untitled Entry" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-4xl md:text-5xl font-serif font-bold text-stone-900 placeholder:text-stone-300 border-none focus:ring-0 resize-none bg-transparent leading-tight mb-6"
            rows={1}
            onInput={(e) => {
              e.currentTarget.style.height = 'auto';
              e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
            }}
          />

          {/* Body */}
          <textarea
            placeholder="Start writing your story here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full h-[300px] text-lg font-serif text-stone-600 placeholder:text-stone-300 border-none focus:ring-0 resize-none bg-transparent leading-relaxed focus:outline-none"
          />

        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 w-full bg-stone-50 border-t border-stone-200 px-8 py-4 flex items-center gap-4 text-stone-500">
           <button className="p-2 hover:bg-stone-200 rounded-sm transition-colors" title="Add Image">
             <Image size={18} />
           </button>
           <button className="p-2 hover:bg-stone-200 rounded-sm transition-colors" title="Add Link">
             <Link size={18} />
           </button>
           <button className="p-2 hover:bg-stone-200 rounded-sm transition-colors" title="Add Tags">
             <Hash size={18} />
           </button>
        </div>

      </div>
    </div>
  );
};