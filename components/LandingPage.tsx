import React, { useState } from 'react';
import { 
  ArrowRight, BookOpen, History, Users, Anchor, Fingerprint, 
  Check, Shield, Star, ChevronDown, Menu, X, Lock, Feather, 
  Zap, Layout, MessageSquare, Globe 
} from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-stone-200">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="font-serif text-lg text-stone-900 group-hover:text-accent transition-colors">{question}</span>
        <ChevronDown className={`transform transition-transform duration-300 text-stone-400 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
        <p className="font-sans text-stone-600 leading-relaxed text-sm max-w-2xl">{answer}</p>
      </div>
    </div>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans selection:bg-accent/20 overflow-x-hidden scroll-smooth">
      
      {/* 1. Header */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200/50 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-8 h-8 bg-stone-900 text-stone-50 flex items-center justify-center font-display font-bold rounded-sm">
              C
            </div>
            <span className="font-display text-xl tracking-tight font-semibold">CultureBook</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-stone-900 transition-colors">How it Works</button>
            <button onClick={() => scrollToSection('features')} className="hover:text-stone-900 transition-colors">Features</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-stone-900 transition-colors">Pricing</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-stone-900 transition-colors">FAQ</button>
            <div className="h-4 w-px bg-stone-300 mx-2"></div>
            <button 
              onClick={onEnter}
              className="text-stone-900 hover:text-accent transition-colors font-semibold"
            >
              Log In
            </button>
            <button 
              onClick={onEnter}
              className="px-5 py-2.5 bg-stone-900 text-stone-50 rounded-sm hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/10 border border-transparent hover:border-stone-700"
            >
              Start Archive
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#FDFBF7] border-b border-stone-200 p-6 flex flex-col gap-6 shadow-xl animate-fade-in md:hidden">
            <button onClick={() => scrollToSection('how-it-works')} className="text-left text-lg font-serif">How it Works</button>
            <button onClick={() => scrollToSection('features')} className="text-left text-lg font-serif">Features</button>
            <button onClick={() => scrollToSection('pricing')} className="text-left text-lg font-serif">Pricing</button>
            <button onClick={onEnter} className="w-full py-4 bg-stone-900 text-white font-bold text-center">Log In / Sign Up</button>
          </div>
        )}
      </nav>

      {/* 2. Hero Section */}
      <header className="pt-32 pb-24 md:pt-48 md:pb-32 px-6 relative">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-stone-200 bg-white/50 backdrop-blur-sm text-xs font-mono text-stone-500 uppercase tracking-widest mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            The Operating System for Company Soul
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-stone-900 mb-8 animate-fade-in delay-100">
            Stop building <br />
            <span className="font-serif italic text-stone-500">amnesiac</span> companies.
          </h1>
          
          <p className="font-serif text-xl md:text-2xl text-stone-600 leading-relaxed max-w-2xl mx-auto mb-12 animate-fade-in delay-200">
            Document your startup’s journey from day one to IPO. Transform scattered Slack messages, Notion docs, and oral history into a living heritage.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-fade-in delay-300 mb-20">
            <button 
              onClick={onEnter}
              className="group relative px-8 py-4 bg-accent text-white text-lg font-medium rounded-sm overflow-hidden transition-all hover:bg-accent-dark hover:shadow-xl hover:-translate-y-0.5 min-w-[200px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Your Archive <ArrowRight size={18} />
              </span>
            </button>
            <span className="text-sm text-stone-400 font-mono flex items-center gap-2">
              <Check size={14} className="text-green-600" /> No credit card required.
            </span>
          </div>

          {/* Hero Visual Mockup */}
          <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] bg-stone-900 rounded-lg shadow-2xl overflow-hidden border border-stone-800 animate-fade-in delay-300 group">
             {/* Fake Browser UI */}
             <div className="h-8 bg-stone-800 flex items-center px-4 gap-2">
               <div className="w-3 h-3 rounded-full bg-stone-600"></div>
               <div className="w-3 h-3 rounded-full bg-stone-600"></div>
               <div className="w-3 h-3 rounded-full bg-stone-600"></div>
             </div>
             {/* Mock Content */}
             <div className="p-8 bg-stone-50 h-full relative">
                <div className="absolute left-8 top-8 bottom-8 w-px bg-stone-200"></div>
                <div className="ml-8 space-y-8">
                  <div className="flex gap-4 items-start opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="w-32 h-24 bg-stone-200 rounded-sm"></div>
                    <div className="flex-1 space-y-2">
                       <div className="w-24 h-4 bg-stone-200 rounded-sm"></div>
                       <div className="w-full h-8 bg-stone-300 rounded-sm"></div>
                       <div className="w-2/3 h-4 bg-stone-200 rounded-sm"></div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-32 h-24 bg-stone-900 rounded-sm shadow-lg transform -rotate-2 transition-transform group-hover:rotate-0"></div>
                    <div className="flex-1 space-y-2 pt-2">
                       <div className="w-24 h-4 bg-accent rounded-sm"></div>
                       <div className="w-full h-8 bg-stone-800 rounded-sm"></div>
                       <div className="w-3/4 h-4 bg-stone-300 rounded-sm"></div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start opacity-40 group-hover:opacity-100 transition-opacity duration-1000">
                    <div className="w-32 h-24 bg-stone-200 rounded-sm"></div>
                    <div className="flex-1 space-y-2">
                       <div className="w-24 h-4 bg-stone-200 rounded-sm"></div>
                       <div className="w-full h-8 bg-stone-300 rounded-sm"></div>
                    </div>
                  </div>
                </div>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-transparent to-transparent"></div>
             </div>
          </div>
        </div>

        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-30">
           <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
           <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-stone-300/20 rounded-full blur-3xl"></div>
           <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
        </div>
      </header>

      {/* 3. Quick Trust Strip */}
      <section className="py-12 border-y border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-8">Trusted by modern heritage brands</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale mix-blend-multiply items-center">
             <span className="font-display font-bold text-2xl tracking-tighter">ACME</span>
             <span className="font-serif font-bold text-2xl italic">Stark Industries</span>
             <span className="font-sans font-bold text-2xl tracking-tight">WAYNE</span>
             <span className="font-mono font-bold text-xl">CYBERDYNE</span>
             <span className="font-serif font-bold text-2xl">Sterling Cooper</span>
          </div>
        </div>
      </section>

      {/* 4. Problem -> Outcome */}
      <section className="py-24 md:py-32 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
             <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-24 bg-stone-200"></div>
                <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">The Crisis of Corporate Amnesia</h2>
                <p className="font-sans text-stone-600 text-lg leading-relaxed mb-6">
                  Companies today are ephemeral. Decisions are made in Slack and lost in the scroll. Pivots happen without context. New hires join and have no idea *why* things are the way they are.
                </p>
                <div className="flex items-start gap-4 p-6 bg-red-50/50 border border-red-100 rounded-sm">
                   <div className="mt-1 text-red-800"><X size={20} /></div>
                   <div>
                     <h4 className="font-bold text-red-900 text-sm mb-1">The Result: Drift</h4>
                     <p className="text-sm text-red-800/80">Without a shared history, culture degrades into generic slogans, and the founding mission fades into background noise.</p>
                   </div>
                </div>
             </div>
             
             <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-24 bg-accent"></div>
                <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">The Clarity of a Living Archive</h2>
                <p className="font-sans text-stone-600 text-lg leading-relaxed mb-6">
                  CultureBook gives you a place to anchor your identity. It transforms the chaos of daily work into a curated canon of "How we built this."
                </p>
                <div className="flex items-start gap-4 p-6 bg-green-50/50 border border-green-100 rounded-sm">
                   <div className="mt-1 text-green-800"><Check size={20} /></div>
                   <div>
                     <h4 className="font-bold text-green-900 text-sm mb-1">The Result: Alignment</h4>
                     <p className="text-sm text-green-800/80">Every employee, investor, and customer understands the story they are joining. Trust is built on evidence, not hype.</p>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* 5. How it Works */}
      <section id="how-it-works" className="py-24 bg-white border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-stone-900 mb-4">From Chaos to Canon</h2>
            <p className="text-stone-500 max-w-xl mx-auto">Three simple steps to build your company memory.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Feather, title: "1. Capture", desc: "Log milestones, decisions, and cultural moments in a distraction-free editorial interface." },
              { icon: Layout, title: "2. Curate", desc: "Organize history with tags, link entries to core values, and visualize your 'culture drift'." },
              { icon: Globe, title: "3. Broadcast", desc: "Publish a beautiful, branded public portal for candidates, investors, and the world." }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-900 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                  <step.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl mb-3">{step.title}</h3>
                <p className="text-stone-500 leading-relaxed font-sans">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Key Features */}
      <section id="features" className="py-24 md:py-32 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            
            <div className="group md:col-span-1">
              <div className="mb-6 text-accent"><History size={48} strokeWidth={1} /></div>
              <h3 className="font-serif text-3xl mb-4">The Timeline</h3>
              <p className="text-stone-600 leading-relaxed mb-6">
                A chronological spine for your company. Filter by funding rounds, key hires, or product pivots. It's the "Founder's Diary" made searchable and social.
              </p>
              <ul className="space-y-3 text-sm font-medium text-stone-500">
                <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Rich-text storytelling</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Visual attachments</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Public vs Internal controls</li>
              </ul>
            </div>

            <div className="group md:col-span-1">
              <div className="mb-6 text-accent"><Fingerprint size={48} strokeWidth={1} /></div>
              <h3 className="font-serif text-3xl mb-4">Identity & Drift</h3>
              <p className="text-stone-600 leading-relaxed mb-6">
                Values shouldn't just be on a wall. Link timeline entries to values to prove you live them. Our "Drift Engine" alerts you when a value hasn't been referenced in 90 days.
              </p>
              <ul className="space-y-3 text-sm font-medium text-stone-500">
                <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Value health dashboard</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Monthly reflection prompts</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Alignment analytics</li>
              </ul>
            </div>

            <div className="group md:col-span-1">
              <div className="mb-6 text-accent"><Users size={48} strokeWidth={1} /></div>
              <h3 className="font-serif text-3xl mb-4">The People</h3>
              <p className="text-stone-600 leading-relaxed mb-6">
                Beyond an org chart. A directory of "Why I Joined" stories and personal contributions. Build a heritage where every team member feels like a co-author.
              </p>
              <ul className="space-y-3 text-sm font-medium text-stone-500">
                <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Deep-dive profiles</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Alumni tracking</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Contribution tagging</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Social Proof / Testimonials */}
      <section className="py-24 bg-stone-900 text-stone-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-display text-3xl text-center mb-16 text-white">Voices from the Archive</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "CultureBook helped us close our Series B. Investors didn't just see metrics; they saw the story of our resilience.", author: "Elena R.", role: "CEO at Vercel-ish" },
              { text: "Finally, a way to onboard engineers that isn't just a Notion doc. They read the 'Pivot of 2022' entry and immediately get our DNA.", author: "Marcus A.", role: "CTO at FintechCo" },
              { text: "We used to lose our culture every time we doubled headcount. This tool forces us to be intentional about our history.", author: "Sarah J.", role: "Head of People at ScaleUp" }
            ].map((t, i) => (
              <div key={i} className="bg-stone-800 p-8 rounded-sm border border-stone-700 relative">
                <div className="text-accent text-4xl font-serif absolute top-4 left-4">“</div>
                <p className="font-serif italic text-lg leading-relaxed mb-6 relative z-10 pt-4 opacity-90">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-600"></div>
                  <div>
                    <div className="font-bold text-sm text-white">{t.author}</div>
                    <div className="text-xs text-stone-500 uppercase tracking-wider">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Pricing */}
      <section id="pricing" className="py-24 bg-white border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-display text-4xl text-stone-900 mb-4">Membership Plans</h2>
          <p className="text-stone-500 mb-16 max-w-xl mx-auto">Choose the right level of archival fidelity for your stage.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Free */}
            <div className="border border-stone-200 p-8 hover:shadow-lg transition-all bg-stone-50">
              <div className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">Archivist</div>
              <div className="text-4xl font-display text-stone-900 mb-6">$0</div>
              <p className="text-sm text-stone-600 mb-8 h-10">For bootstrapping founders documenting day one.</p>
              <button onClick={onEnter} className="w-full py-3 border border-stone-300 font-bold text-sm hover:bg-white transition-colors mb-8">Start Free</button>
              <ul className="space-y-4 text-sm text-stone-600">
                <li className="flex gap-2"><Check size={16} /> 1 User</li>
                <li className="flex gap-2"><Check size={16} /> Public Timeline only</li>
                <li className="flex gap-2"><Check size={16} /> 50 Entries max</li>
              </ul>
            </div>

            {/* Growth */}
            <div className="border border-accent p-8 hover:shadow-xl transition-all relative bg-white transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-bold uppercase px-3 py-1 rounded-b-sm">Most Popular</div>
              <div className="text-xs font-mono uppercase tracking-widest text-accent mb-2">Curator</div>
              <div className="text-4xl font-display text-stone-900 mb-6">$49<span className="text-lg text-stone-400 font-sans">/mo</span></div>
              <p className="text-sm text-stone-600 mb-8 h-10">For growing teams building their employer brand.</p>
              <button onClick={onEnter} className="w-full py-3 bg-stone-900 text-white font-bold text-sm hover:bg-accent transition-colors mb-8">Start Trial</button>
              <ul className="space-y-4 text-sm text-stone-600">
                <li className="flex gap-2"><Check size={16} className="text-accent" /> 10 Users</li>
                <li className="flex gap-2"><Check size={16} className="text-accent" /> Public & Internal Timelines</li>
                <li className="flex gap-2"><Check size={16} className="text-accent" /> Candidate Portal</li>
                <li className="flex gap-2"><Check size={16} className="text-accent" /> Value Drift Engine</li>
              </ul>
            </div>

            {/* Enterprise */}
            <div className="border border-stone-200 p-8 hover:shadow-lg transition-all bg-stone-50">
              <div className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">Historian</div>
              <div className="text-4xl font-display text-stone-900 mb-6">Custom</div>
              <p className="text-sm text-stone-600 mb-8 h-10">For scale-ups needing full heritage management.</p>
              <button className="w-full py-3 border border-stone-300 font-bold text-sm hover:bg-white transition-colors mb-8">Contact Sales</button>
              <ul className="space-y-4 text-sm text-stone-600">
                <li className="flex gap-2"><Check size={16} /> Unlimited Users</li>
                <li className="flex gap-2"><Check size={16} /> SSO & Audit Logs</li>
                <li className="flex gap-2"><Check size={16} /> Dedicated Archivist</li>
                <li className="flex gap-2"><Check size={16} /> Pitch Deck Exports</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section id="faq" className="py-24 bg-[#FDFBF7]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-3xl text-stone-900 mb-12 text-center">Common Questions</h2>
          <div className="space-y-2">
            <FAQItem 
              question="Can I make my timeline private?" 
              answer="Yes. CultureBook is 'Internal First'. You explicitly choose which entries to publish to your Candidate Portal. Sensitive pivots or internal milestones remain safe in the vault." 
            />
            <FAQItem 
              question="How does the 'Culture Drift' work?" 
              answer="We use a simple heuristic: if a core value hasn't been tagged in a timeline entry for 90 days, it's flagged as 'Drifting'. It's a nudge to perform an action that aligns with that value." 
            />
            <FAQItem 
              question="Can I export the data?" 
              answer="Absolutely. It's your history. You can export your entire timeline to PDF for investor decks or JSON/CSV for data portability." 
            />
            <FAQItem 
              question="Is this secure?" 
              answer="We use AES-256 encryption at rest and TLS 1.3 in transit. We prioritize security because we know we are housing your company's most sensitive memories." 
            />
          </div>
        </div>
      </section>

      {/* 10. About / Mission Section */}
      <section className="py-24 bg-stone-900 text-stone-400 text-center">
         <div className="max-w-4xl mx-auto px-6">
           <Anchor className="w-12 h-12 text-accent mx-auto mb-8" />
           <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">Our Mission</h2>
           <p className="text-xl leading-relaxed font-serif italic opacity-80">
             "To ensure that no great company forgets where it came from."
           </p>
           <div className="mt-12 flex items-center justify-center gap-8">
             <div className="text-center">
               <div className="text-3xl font-bold text-white mb-1">2021</div>
               <div className="text-xs uppercase tracking-widest">Founded</div>
             </div>
             <div className="h-8 w-px bg-stone-700"></div>
             <div className="text-center">
               <div className="text-3xl font-bold text-white mb-1">SF</div>
               <div className="text-xs uppercase tracking-widest">HQ</div>
             </div>
             <div className="h-8 w-px bg-stone-700"></div>
             <div className="text-center">
               <div className="text-3xl font-bold text-white mb-1">10k+</div>
               <div className="text-xs uppercase tracking-widest">Memories</div>
             </div>
           </div>
         </div>
      </section>

      {/* 11. Final CTA */}
      <section className="py-32 bg-[#FDFBF7] text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h2 className="font-display text-5xl md:text-6xl text-stone-900 mb-8">Begin the Legacy.</h2>
          <p className="text-xl text-stone-500 font-serif mb-12">
            The best time to plant a tree was 20 years ago. The best time to document your culture is today.
          </p>
          <button 
            onClick={onEnter}
            className="px-12 py-5 bg-accent text-white text-lg font-bold rounded-sm hover:bg-accent-dark shadow-xl transition-all hover:-translate-y-1"
          >
            Start Your Archive
          </button>
        </div>
        {/* Background decorative text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[20rem] font-display font-bold text-stone-100 pointer-events-none select-none z-0 opacity-60">
          HISTORY
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="bg-white border-t border-stone-200 pt-16 pb-8 text-stone-500 font-sans text-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-4 text-stone-900">
                <div className="w-6 h-6 bg-stone-900 text-white flex items-center justify-center font-bold text-xs rounded-sm">C</div>
                <span className="font-display font-bold text-lg">CultureBook</span>
             </div>
             <p className="mb-4">The operating system for company soul.</p>
             <div className="flex gap-4">
               {/* Social placeholders */}
               <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center hover:bg-stone-200 cursor-pointer">𝕏</div>
               <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center hover:bg-stone-200 cursor-pointer">in</div>
             </div>
          </div>
          
          <div>
            <h4 className="font-bold text-stone-900 mb-4 uppercase text-xs tracking-widest">Product</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('features')} className="hover:text-accent">Features</button></li>
              <li><button onClick={() => scrollToSection('pricing')} className="hover:text-accent">Pricing</button></li>
              <li><a href="#" className="hover:text-accent">Changelog</a></li>
              <li><a href="#" className="hover:text-accent">Manifesto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 mb-4 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-accent">About</a></li>
              <li><a href="#" className="hover:text-accent">Careers</a></li>
              <li><a href="#" className="hover:text-accent">Contact</a></li>
              <li><a href="#" className="hover:text-accent">Press Kit</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 mb-4 uppercase text-xs tracking-widest">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-accent">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent">Security</a></li>
              <li><a href="#" className="hover:text-accent">DPA</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>© 2024 CultureBook Systems Inc.</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>All Systems Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
};