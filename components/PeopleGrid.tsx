import React from 'react';
import { Employee } from '../types';
import { Quote } from 'lucide-react';

export const PeopleGrid: React.FC<{ employees: Employee[] }> = ({ employees }) => {
  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {employees.map((person, idx) => (
          <div 
            key={person.id} 
            className="group bg-white border border-stone-200 p-0 flex flex-col hover:shadow-lg transition-all duration-500 ease-out hover:-translate-y-1"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Photo Area */}
            <div className="relative aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
              <img src={person.photoUrl} alt={person.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
              
              {/* Overlay Text */}
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-serif text-xl">{person.name}</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-stone-200 mt-1">{person.role}</p>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="relative mb-6">
                <Quote className="w-6 h-6 text-accent/20 absolute -top-2 -left-2" />
                <p className="font-serif italic text-stone-600 text-sm relative z-10 pl-4">
                  "{person.quote}"
                </p>
              </div>
              
              <div className="mt-auto pt-4 border-t border-stone-100">
                <p className="text-xs text-stone-500 font-sans leading-relaxed line-clamp-3 mb-3">
                  {person.bio}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {person.tags.map(tag => (
                     <span key={tag} className="text-[10px] text-stone-400 font-mono uppercase border border-stone-100 px-1.5 py-0.5 rounded-sm">
                       {tag}
                     </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};