import React, { useState } from 'react';
import { SeverityRule, Severity, RuleStats } from '../types';
import { Settings, Plus, Trash2, ShieldAlert, X, Zap, Activity } from 'lucide-react';

interface RulesEngineProps {
  rules: SeverityRule[];
  setRules: React.Dispatch<React.SetStateAction<SeverityRule[]>>;
  hasResults: boolean;
  ruleStats: RuleStats;
}

const RulesEngine: React.FC<RulesEngineProps> = ({ rules, setRules, hasResults, ruleStats }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleKeywords, setNewRuleKeywords] = useState('');
  const [newRuleSeverity, setNewRuleSeverity] = useState<Severity>(Severity.CRITICAL);

  const presets: { name: string; keywords: string; severity: Severity }[] = [
    { name: "IP Theft", keywords: "Intellectual Property, Copyright, Patent", severity: Severity.CRITICAL },
    { name: "Termination", keywords: "Terminate, Cancel, End Agreement, Termination", severity: Severity.CRITICAL },
    { name: "Hidden Fees", keywords: "Penalty, Fee, Cost, Expense, Reimbursement", severity: Severity.MODERATE },
    { name: "Data Privacy", keywords: "Privacy, Data, GDPR, Breach, Security", severity: Severity.CRITICAL },
    { name: "Marketing Rights", keywords: "Publicity, Logo, Marketing, Case Study", severity: Severity.MODERATE },
    { name: "No Jury Trial", keywords: "Arbitration, Jury Trial, Class Action", severity: Severity.MODERATE },
  ];

  const handleAddRule = () => {
    if (!newRuleName || !newRuleKeywords) return;
    
    const newRule: SeverityRule = {
      id: Date.now().toString(),
      name: newRuleName,
      keywords: newRuleKeywords,
      severity: newRuleSeverity,
      active: true,
    };

    setRules([...rules, newRule]);
    setNewRuleName('');
    setNewRuleKeywords('');
  };

  const handleAddPreset = (preset: { name: string, keywords: string, severity: Severity }) => {
     const exists = rules.some(r => r.name === preset.name);
     if (exists) return;

     const newRule: SeverityRule = {
      id: Date.now().toString(),
      name: preset.name,
      keywords: preset.keywords,
      severity: preset.severity,
      active: true,
    };
    setRules([...rules, newRule]);
  };

  const handleRemoveRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const severityColors = {
    [Severity.CRITICAL]: "bg-red-100 text-red-700 border-red-200",
    [Severity.MODERATE]: "bg-amber-100 text-amber-700 border-amber-200",
    [Severity.LOW]: "bg-zinc-100 text-zinc-600 border-zinc-200",
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors bg-white border border-zinc-200 px-4 py-2 rounded-full shadow-sm hover:shadow-md mb-8 mx-auto"
      >
        <Settings className="w-4 h-4" />
        Configure Severity Rules
      </button>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-zinc-200/50 border border-zinc-200 overflow-hidden mb-10 animate-fade-in-up ring-1 ring-zinc-900/5">
     
      <div className="bg-zinc-900 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-white">
          <ShieldAlert className="w-5 h-5 text-yellow-400" />
          <h3 className="font-bold text-sm tracking-wide">Custom Severity Rules</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-5 space-y-8">
            
            <div>
                 <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">One-Click Presets</h4>
                 <div className="flex flex-wrap gap-2">
                     {presets.map((p, i) => (
                         <button 
                            key={i}
                            onClick={() => handleAddPreset(p)}
                            className="text-[10px] font-bold uppercase tracking-wide bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-600 px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 active:scale-95 transform"
                         >
                             <Plus className="w-3 h-3" />
                             {p.name}
                         </button>
                     ))}
                 </div>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-zinc-100"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-white px-2 text-xs text-zinc-400 font-medium">OR CREATE CUSTOM</span>
                </div>
            </div>

            <div className="space-y-4 bg-zinc-50/50 p-4 rounded-xl border border-zinc-100/50">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Rule Name</label>
                  <input 
                      type="text" 
                      placeholder="e.g. Liability Limits"
                      value={newRuleName}
                      onChange={(e) => setNewRuleName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-shadow bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Keywords</label>
                  <input 
                      type="text" 
                      placeholder="e.g. liable, damages, indemnify"
                      value={newRuleKeywords}
                      onChange={(e) => setNewRuleKeywords(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-shadow bg-white"
                  />
                  <p className="text-[10px] text-zinc-400 mt-1.5 flex items-center gap-1">
                    <InfoIcon className="w-3 h-3" />
                    Matches whole words only (e.g. "fee" won't match "coffee")
                  </p>
                </div>

                <div>
                   <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Force Severity</label>
                   <div className="flex gap-2">
                      {[Severity.CRITICAL, Severity.MODERATE, Severity.LOW].map((sev) => (
                      <button
                          key={sev}
                          onClick={() => setNewRuleSeverity(sev)}
                          className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wide rounded-lg border transition-all ${
                          newRuleSeverity === sev 
                              ? 'bg-zinc-900 text-white border-zinc-900 shadow-md' 
                              : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300'
                          }`}
                      >
                          {sev}
                      </button>
                      ))}
                  </div>
                </div>

                <button 
                  onClick={handleAddRule}
                  disabled={!newRuleName || !newRuleKeywords}
                  className="w-full mt-2 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-black text-white font-semibold py-2.5 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  Add Rule
                </button>
            </div>
          </div>

          <div className="lg:col-span-7 border-l border-zinc-100 pl-0 lg:pl-8 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Active Rules ({rules.length})</h4>
                {hasResults && rules.length > 0 && (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                        <Zap className="w-3 h-3" /> Auto-Applying
                    </span>
                )}
            </div>
            
            {rules.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12 border-2 border-dashed border-zinc-100 rounded-xl bg-zinc-50/30">
                <div className="p-3 bg-zinc-100 rounded-full mb-3">
                    <Settings className="w-5 h-5 text-zinc-400" />
                </div>
                <p className="text-zinc-500 text-sm font-medium">No active rules defined.</p>
                <p className="text-zinc-400 text-xs mt-1 max-w-[200px]">Add a preset or custom rule to override the AI's analysis.</p>
              </div>
            ) : (
              <div className="space-y-3 flex-1 overflow-y-auto pr-2 max-h-[400px] custom-scrollbar">
                {rules.map((rule) => {
                  const matchCount = ruleStats[rule.id] || 0;
                  const hasMatches = matchCount > 0;
                  
                  return (
                    <div key={rule.id} className={`flex items-center justify-between p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition-all group ${hasMatches ? 'border-emerald-200 ring-1 ring-emerald-50' : 'border-zinc-200'}`}>
                      <div className="flex-1 min-w-0 mr-4">
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <span className="font-bold text-sm text-zinc-900 truncate">{rule.name}</span>
                          <span className={`text-[9px] px-2 py-0.5 rounded uppercase font-bold border shrink-0 ${severityColors[rule.severity]}`}>
                            {rule.severity}
                          </span>
                          
                          {hasResults && (
                            <span className={`text-[9px] font-bold uppercase tracking-wide flex items-center gap-1 px-1.5 py-0.5 rounded-md ${hasMatches ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-400'}`}>
                                <Activity className="w-3 h-3" />
                                {matchCount} Found
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {rule.keywords.split(',').map((k, i) => (
                                <span key={i} className="inline-block px-1.5 py-0.5 bg-zinc-50 border border-zinc-100 rounded text-[10px] text-zinc-500">
                                    {k.trim()}
                                </span>
                            ))}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRemoveRule(rule.id)}
                        className="p-2 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove Rule"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);

export default RulesEngine;
