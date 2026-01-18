import React, { useState } from 'react';
import { useAppStore } from '../store';
import { ArrowRight, Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const { updateCompany, addEntry } = useAppStore();
  
  const [name, setName] = useState('');
  const [mission, setMission] = useState('');
  const [founded, setFounded] = useState('');

  const handleFinish = () => {
    updateCompany({ name, missionStatement: mission, foundedDate: founded });
    // Add the "Inception" entry automatically
    addEntry({
      id: Math.random().toString(),
      date: founded,
      title: 'Company Founded',
      body: mission,
      type: 'Founding',
      tags: ['Origin'],
      author: 'Founder',
      visibility: 'Public',
      likes: 0
    });
    onComplete();
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white border border-stone-200 shadow-2xl p-12 relative overflow-hidden animate-fade-in">
        
        {/* Progress */}
        <div className="absolute top-0 left-0 w-full h-1 bg-stone-100">
          <div className="h-full bg-accent transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>

        <div className="mb-12">
           <span className="text-xs font-mono uppercase tracking-widest text-accent mb-2 block">Step {step} of 3</span>
           <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
             {step === 1 && "First, let's name the ship."}
             {step === 2 && "When did it all begin?"}
             {step === 3 && "Why do you exist?"}
           </h2>
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
             <div>
               <label className="block text-sm font-bold text-stone-900 mb-2">Company Name</label>
               <input 
                 autoFocus
                 type="text" 
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 className="w-full text-2xl border-b-2 border-stone-200 py-2 focus:outline-none focus:border-stone-900 transition-colors bg-transparent placeholder:text-stone-300"
                 placeholder="e.g. Acme Corp"
               />
             </div>
             <button 
               disabled={!name}
               onClick={() => setStep(2)}
               className="mt-8 px-8 py-3 bg-stone-900 text-white rounded-sm hover:bg-accent disabled:opacity-50 disabled:hover:bg-stone-900 transition-all flex items-center gap-2"
             >
               Next <ArrowRight size={16} />
             </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
             <div>
               <label className="block text-sm font-bold text-stone-900 mb-2">Founding Date</label>
               <input 
                 autoFocus
                 type="date" 
                 value={founded}
                 onChange={(e) => setFounded(e.target.value)}
                 className="w-full text-xl border-b-2 border-stone-200 py-2 focus:outline-none focus:border-stone-900 transition-colors bg-transparent text-stone-600"
               />
             </div>
             <div className="flex gap-4 mt-8">
               <button onClick={() => setStep(1)} className="text-stone-500 hover:text-stone-900">Back</button>
               <button 
                 disabled={!founded}
                 onClick={() => setStep(3)}
                 className="px-8 py-3 bg-stone-900 text-white rounded-sm hover:bg-accent disabled:opacity-50 disabled:hover:bg-stone-900 transition-all flex items-center gap-2"
               >
                 Next <ArrowRight size={16} />
               </button>
             </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
             <div>
               <label className="block text-sm font-bold text-stone-900 mb-2">Founding Mission</label>
               <p className="text-xs text-stone-500 mb-4">This will be your first entry on the timeline.</p>
               <textarea 
                 autoFocus
                 value={mission}
                 onChange={(e) => setMission(e.target.value)}
                 className="w-full h-32 text-lg border border-stone-200 p-4 focus:outline-none focus:border-stone-900 transition-colors bg-stone-50 placeholder:text-stone-300 resize-none"
                 placeholder="We exist to..."
               />
             </div>
             <div className="flex gap-4 mt-8">
               <button onClick={() => setStep(2)} className="text-stone-500 hover:text-stone-900">Back</button>
               <button 
                 disabled={!mission}
                 onClick={handleFinish}
                 className="px-8 py-3 bg-stone-900 text-white rounded-sm hover:bg-green-600 disabled:opacity-50 disabled:hover:bg-stone-900 transition-all flex items-center gap-2"
               >
                 Launch Workspace <Check size={16} />
               </button>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};