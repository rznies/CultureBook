import React from 'react';
import { Value } from '../types';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

const calculateStatus = (lastDate: string) => {
  const days = Math.floor((new Date().getTime() - new Date(lastDate).getTime()) / (1000 * 3600 * 24));
  if (days < 30) return { status: 'Healthy', color: 'text-green-600', bg: 'bg-green-50' };
  if (days < 90) return { status: 'Drifting', color: 'text-yellow-600', bg: 'bg-yellow-50' };
  return { status: 'At Risk', color: 'text-red-600', bg: 'bg-red-50' };
};

export const ValuesDashboard: React.FC<{ values: Value[] }> = ({ values }) => {
  return (
    <div className="max-w-5xl mx-auto animate-fade-in pb-20">
      
      {/* Header Section */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="font-serif text-4xl text-stone-900 mb-6">The Founding Beliefs</h2>
        <p className="text-stone-500 font-sans leading-relaxed">
          Culture isn't what we say, it's what we do. This dashboard tracks how actively we are living our core values based on our Timeline activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {values.map((val, idx) => {
          const { status, color, bg } = calculateStatus(val.lastReferencedDate);
          
          return (
            <div key={val.id} className="bg-white p-8 border border-stone-200 shadow-sm relative overflow-hidden group hover:border-stone-300 transition-all">
              {/* Status Pill */}
              <div className={`absolute top-6 right-6 px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${bg} ${color}`}>
                 {status === 'Healthy' ? <CheckCircle size={12} /> : status === 'Drifting' ? <Clock size={12} /> : <AlertCircle size={12} />}
                 {status}
              </div>

              <div className="mb-6">
                <h3 className="font-serif text-2xl text-stone-800 mb-2 group-hover:text-accent transition-colors">{val.title}</h3>
                <div className="h-0.5 w-12 bg-stone-200 group-hover:w-24 group-hover:bg-accent transition-all duration-500"></div>
              </div>

              <p className="font-sans text-stone-600 mb-8 leading-relaxed">
                {val.description}
              </p>

              <div className="flex items-center justify-between text-xs font-mono text-stone-400 border-t border-stone-100 pt-4">
                <span>Last evidenced: {val.lastReferencedDate}</span>
                <button className="underline hover:text-stone-800">Add Evidence +</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Monthly Reflection Prompt */}
      <div className="mt-16 bg-stone-900 text-stone-100 p-8 md:p-12 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-lg">
            <span className="text-accent text-xs font-mono uppercase tracking-widest mb-2 block">Monthly Reflection</span>
            <h3 className="font-serif text-2xl mb-4">Are we moving fast enough?</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              We haven't tagged 'Move with Urgency' in over 60 days. Take a moment to reflect: Have we become complacent? Add a timeline entry to prove otherwise.
            </p>
          </div>
          <button className="px-6 py-3 bg-white text-stone-900 font-sans text-sm font-semibold hover:bg-stone-200 transition-colors whitespace-nowrap">
            Write Reflection
          </button>
        </div>
        {/* Decorative noise */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </div>
    </div>
  );
};