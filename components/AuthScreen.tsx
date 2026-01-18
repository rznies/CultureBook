import React, { useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';

interface AuthScreenProps {
  onAuthenticated: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] bg-noise p-6">
      <div className="w-full max-w-md bg-white border border-stone-200 shadow-xl p-8 md:p-12 animate-fade-in relative overflow-hidden">
        
        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-stone-200 via-accent to-stone-200"></div>

        <div className="text-center mb-10">
          <div className="w-10 h-10 bg-stone-900 text-stone-50 flex items-center justify-center font-display font-bold rounded-sm mx-auto mb-4">
            C
          </div>
          <h2 className="font-serif text-3xl text-stone-900 mb-2">
            {isLogin ? 'Welcome back' : 'Start your archive'}
          </h2>
          <p className="text-stone-500 text-sm font-sans">
            {isLogin ? 'Enter the vault.' : 'Begin documenting your legacy today.'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onAuthenticated(); }}>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">Work Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              placeholder="founder@company.com"
            />
          </div>
          
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-stone-900 text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-accent transition-colors shadow-lg shadow-stone-900/10 group"
          >
            {isLogin ? 'Access Archive' : 'Create Workspace'}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs text-stone-400 hover:text-stone-900 underline transition-colors"
          >
            {isLogin ? "Don't have a workspace? Create one." : "Already have an account? Log in."}
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-stone-100 flex items-center justify-center gap-2 text-stone-300 text-xs">
          <Lock size={12} />
          <span>End-to-end encrypted</span>
        </div>
      </div>
    </div>
  );
};