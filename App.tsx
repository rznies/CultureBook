import React, { useState } from 'react';
import { AppProvider, useAppStore } from './store';
import { Timeline } from './components/Timeline';
import { PeopleGrid } from './components/PeopleGrid';
import { ValuesDashboard } from './components/ValuesDashboard';
import { LandingPage } from './components/LandingPage';
import { AuthScreen } from './components/AuthScreen';
import { EntryEditor } from './components/EntryEditor';
import { EntryDetail } from './components/EntryDetail';
import { Dashboard } from './components/Dashboard';
import { Onboarding } from './components/Onboarding';
import { Settings } from './components/Settings';
import { ViewMode, TimelineEntry, AppState } from './types';
import { BookOpen, Users, Anchor, Share2, Plus, Menu, X, LogOut, Settings as SettingsIcon, LayoutGrid } from 'lucide-react';

const AppContent = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [view, setView] = useState<ViewMode>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeEntry, setActiveEntry] = useState<TimelineEntry | null>(null);

  const { company, entries, employees, values } = useAppStore();

  // --- Render Flow Control ---

  if (appState === 'landing') {
    return <LandingPage onEnter={() => setAppState('auth')} />;
  }

  if (appState === 'auth') {
    return <AuthScreen onAuthenticated={() => setAppState('onboarding')} />;
  }

  if (appState === 'onboarding') {
    return <Onboarding onComplete={() => setAppState('app')} />;
  }

  // --- Main App Sidebar Logic ---

  const NavItem = ({ mode, label, icon: Icon }: { mode: ViewMode, label: string, icon: any }) => (
    <button
      onClick={() => {
        setView(mode);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center gap-3 px-4 py-3 w-full text-left transition-all duration-200 group ${
        view === mode 
          ? 'text-stone-900 bg-stone-200/50 border-r-2 border-stone-800 font-medium' 
          : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
      }`}
    >
      <Icon size={18} className={`transition-colors ${view === mode ? 'text-accent' : 'text-stone-400 group-hover:text-stone-600'}`} />
      <span className="font-sans text-sm tracking-wide">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-stone-50 text-stone-900 bg-noise font-sans selection:bg-accent/20 animate-fade-in">
      
      {/* Modals */}
      {isEditorOpen && (
        <EntryEditor 
          onClose={() => setIsEditorOpen(false)} 
        />
      )}
      
      {activeEntry && (
        <EntryDetail 
          entry={activeEntry} 
          onClose={() => setActiveEntry(null)} 
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#FDFBF7] border-r border-stone-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <div className="p-8 flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => setView('dashboard')}>
            <h1 className="font-display text-2xl tracking-tighter text-stone-900">CultureBook</h1>
            <p className="text-[10px] uppercase tracking-widest text-stone-400 mt-1 truncate">{company.name} Archive</p>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-stone-400 hover:text-stone-900">
            <X size={20} />
          </button>
        </div>

        <nav className="mt-8 space-y-1">
          <NavItem mode="dashboard" label="Overview" icon={LayoutGrid} />
          <NavItem mode="timeline" label="Timeline" icon={BookOpen} />
          <NavItem mode="people" label="People" icon={Users} />
          <NavItem mode="values" label="Values & Drift" icon={Anchor} />
          {company.candidatePortalEnabled && (
            <NavItem mode="candidate" label="Candidate View" icon={Share2} />
          )}
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-stone-200 bg-[#FDFBF7]">
          <button 
            onClick={() => setIsEditorOpen(true)}
            className="w-full py-3 bg-stone-900 text-stone-50 font-medium text-sm flex items-center justify-center gap-2 hover:bg-accent transition-colors shadow-lg shadow-stone-900/10"
          >
            <Plus size={16} />
            <span>New Entry</span>
          </button>
          
          <div className="mt-6 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-stone-200 overflow-hidden">
                 <img src="https://picsum.photos/id/64/100/100" className="w-full h-full object-cover" alt="User" />
               </div>
               <div className="flex flex-col">
                 <span className="text-xs font-semibold text-stone-700">Eleanor R.</span>
                 <span className="text-[10px] text-stone-400">Admin</span>
               </div>
             </div>
             <div className="flex items-center gap-1">
               <button onClick={() => setView('settings')} className="text-stone-400 hover:text-stone-600 p-1" title="Settings">
                 <SettingsIcon size={16} />
               </button>
               <button onClick={() => setAppState('landing')} className="text-stone-400 hover:text-stone-600 p-1" title="Log Out">
                 <LogOut size={16} />
               </button>
             </div>
          </div>
        </div>
      </aside>

      {/* Mobile Toggle Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-stone-900/20 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-stone-200 bg-[#FDFBF7]">
         <h1 className="font-display text-lg tracking-tight">CultureBook</h1>
         <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-stone-600">
           <Menu size={24} />
         </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 h-[calc(100vh-65px)] md:h-screen overflow-y-auto scroll-smooth">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 md:px-12">
          
          {/* Page Header (Conditional) */}
          {view !== 'dashboard' && (
            <header className="mb-16 animate-fade-in">
               <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest mb-3">
                 <span>/</span>
                 <span>{view === 'candidate' ? 'Public Portal' : view}</span>
               </div>
               <h2 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight">
                 {view === 'timeline' && "The Journey So Far"}
                 {view === 'people' && "The Cast of Characters"}
                 {view === 'values' && "Our North Star"}
                 {view === 'candidate' && "Join Our Story"}
                 {view === 'settings' && "Workspace Control"}
               </h2>
               {view === 'candidate' && (
                  <p className="mt-4 text-stone-500 max-w-2xl font-sans leading-relaxed">
                    This is a curated look at our history. We believe in showing, not just telling. Here is what we've built, and the people building it.
                  </p>
               )}
            </header>
          )}

          {/* Views */}
          {view === 'dashboard' && (
            <Dashboard 
              onNavigate={setView} 
              onNewEntry={() => setIsEditorOpen(true)} 
            />
          )}
          {view === 'timeline' && (
            <Timeline 
              entries={entries} 
              onEntryClick={(entry) => setActiveEntry(entry)} 
            />
          )}
          {view === 'candidate' && (
            <Timeline 
              entries={entries} 
              isCandidateView={true} 
              onEntryClick={(entry) => setActiveEntry(entry)} 
            />
          )}
          {view === 'people' && <PeopleGrid employees={employees} />}
          {view === 'values' && <ValuesDashboard values={values} />}
          {view === 'settings' && <Settings />}

        </div>
      </main>

    </div>
  );
};

// Wrap App with Provider
const App = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;