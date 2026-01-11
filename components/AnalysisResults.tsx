import React from 'react';
import { AnalysisResponse, Severity, IssueType } from '../types';
import { 
  AlertTriangle, 
  AlertOctagon, 
  Info, 
  CheckCircle2, 
  FileSearch, 
  Shield, 
  DollarSign, 
  Scale, 
  FileDiff,
  HelpCircle,
  FileMinus,
  Shuffle,
  Zap,
  ArrowRight,
  PieChart
} from 'lucide-react';

interface AnalysisResultsProps {
  data: AnalysisResponse | null;
  loading: boolean;
}


const DonutChart = ({ data }: { data: { label: string; value: number; color: string; count: number }[] }) => {
  const size = 120;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  const total = data.reduce((acc, item) => acc + item.value, 0);

  if (total === 0) {
      return (
          <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
              <div className="w-full h-full rounded-full border-[16px] border-zinc-100"></div>
              <div className="absolute text-center">
                  <span className="text-2xl font-bold text-zinc-300">0</span>
              </div>
          </div>
      )
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {data.map((item, index) => {
          const strokeDasharray = `${(item.value / total) * circumference} ${circumference}`;
          const strokeDashoffset = -offset;
          offset += (item.value / total) * circumference;
          
          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="butt"
              className="transition-all duration-1000 ease-out"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-bold text-zinc-900 leading-none tracking-tighter">{total}</span>
        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide mt-1">Issues</span>
      </div>
    </div>
  );
};

const SeverityBadge: React.FC<{ severity: Severity }> = ({ severity }) => {
  const colors = {
    [Severity.CRITICAL]: "bg-red-500 text-white shadow-red-200",
    [Severity.MODERATE]: "bg-amber-400 text-white shadow-amber-200",
    [Severity.LOW]: "bg-zinc-200 text-zinc-600",
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm ${colors[severity]}`}>
      {severity}
    </span>
  );
};

const IssueTypeBadge: React.FC<{ type: IssueType }> = ({ type }) => {
    let icon = <Info className="w-3 h-3" />;
    let label = "Info";
    let color = "bg-zinc-100 text-zinc-600";

    switch (type) {
        case IssueType.CONTRADICTION: 
            icon = <Shuffle className="w-3 h-3" />; 
            label = "Contradiction";
            color = "bg-orange-100 text-orange-700 border border-orange-200";
            break;
        case IssueType.AMBIGUITY: 
            icon = <HelpCircle className="w-3 h-3" />; 
            label = "Ambiguity";
            color = "bg-amber-100 text-amber-700 border border-amber-200";
            break;
        case IssueType.RISK: 
            icon = <AlertTriangle className="w-3 h-3" />; 
            label = "Risk";
            color = "bg-red-100 text-red-700 border border-red-200";
            break;
        case IssueType.CHANGE: 
            icon = <FileDiff className="w-3 h-3" />; 
            label = "Change";
            color = "bg-blue-100 text-blue-700 border border-blue-200";
            break;
        case IssueType.MISSING: 
            icon = <FileMinus className="w-3 h-3" />; 
            label = "Missing Clause";
            color = "bg-rose-100 text-rose-700 border border-rose-200";
            break;
    }

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${color}`}>
            {icon}
            {label}
        </span>
    );
}

const RiskGauge: React.FC<{ score: number; level: string }> = ({ score, level }) => {
  const radius = 55;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = Math.PI * normalizedRadius; 
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  let colorClass = 'text-emerald-500';
  if (score > 30) colorClass = 'text-amber-500';
  if (score > 70) colorClass = 'text-red-500';

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="relative flex justify-center overflow-visible" style={{ width: radius * 2, height: radius + 10 }}>
         <svg width={radius * 2} height={radius + 20} viewBox={`0 0 ${radius * 2} ${radius + 20}`} className="overflow-visible absolute top-0">
            <path d={`M ${strokeWidth/2},${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth/2} ${radius}`} fill="none" stroke="#f4f4f5" strokeWidth={strokeWidth} strokeLinecap="round" />
            <path d={`M ${strokeWidth/2},${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth/2} ${radius}`} fill="none" stroke="currentColor" className={`${colorClass} transition-all duration-1000 ease-out`} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} style={{filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'}} />
         </svg>
        <div className="absolute bottom-2 flex flex-col items-center justify-end z-10">
            <span className="text-4xl font-extrabold text-zinc-900 tracking-tighter">{score}</span>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-sm mt-2 ${
          level === 'CRITICAL' ? 'bg-red-50 text-red-700 border-red-100' : 
          level === 'MODERATE' ? 'bg-amber-50 text-amber-700 border-amber-100' :
          'bg-emerald-50 text-emerald-700 border-emerald-100'
      }`}>
        {level}
      </span>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <div className="bg-white rounded-2xl p-4 border border-zinc-100 flex items-center gap-4 hover:shadow-md transition-all duration-300">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
            <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">{label}</p>
            <p className="text-sm font-bold text-zinc-900 leading-tight">{value}</p>
        </div>
    </div>
);

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="w-full py-24 flex flex-col items-center justify-center text-center animate-pulse bg-white rounded-3xl border border-zinc-100 shadow-sm">
        <div className="relative mb-8">
            <div className="h-16 w-16 rounded-full border-4 border-zinc-100 border-t-zinc-900 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <FileSearch className="h-6 w-6 text-zinc-900" />
            </div>
        </div>
        <h3 className="text-lg font-bold text-zinc-900">Analyzing Documents</h3>
        <p className="text-zinc-400 text-sm mt-2 font-medium">Extracting intelligence...</p>
      </div>
    );
  }

  if (!data) return null;

  const issues = data.issues;
  const critical = issues.filter(i => i.severity === Severity.CRITICAL).length;
  const moderate = issues.filter(i => i.severity === Severity.MODERATE).length;
  const low = issues.filter(i => i.severity === Severity.LOW).length;
  const total = issues.length;

  const chartData = [
      { label: 'Critical', value: critical, count: critical, color: '#ef4444' }, 
      { label: 'Moderate', value: moderate, count: moderate, color: '#fbbf24' },
      { label: 'Low', value: low, count: low, color: '#e4e4e7' }, 
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-8 animate-fade-in-up pb-24">
     
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm border border-zinc-200 p-6 flex flex-col items-center relative overflow-hidden">
             
             <div className="text-center w-full mb-2">
                 <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Aggregate Risk</h3>
             </div>
             <RiskGauge score={data.riskAssessment.score} level={data.riskAssessment.level} />
             <p className="text-center text-zinc-500 text-xs mt-4 font-medium italic">
                 "{data.riskAssessment.explanation}"
             </p>
        </div>

        <div className="lg:col-span-5 bg-white rounded-3xl shadow-sm border border-zinc-200 p-6 flex items-center justify-between">
             <div className="flex-1">
                 <div className="flex items-center gap-2 mb-6">
                    <PieChart className="w-4 h-4 text-zinc-400" />
                    <h3 className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">Issue Composition</h3>
                 </div>
                 <div className="space-y-3">
                    {chartData.map((d) => (
                        <div key={d.label} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></span>
                                <span className="text-xs font-semibold text-zinc-600">{d.label}</span>
                            </div>
                            <span className="text-xs font-bold text-zinc-900">{d.count}</span>
                        </div>
                    ))}
                 </div>
             </div>
             <div className="pl-6 border-l border-zinc-100 flex items-center justify-center">
                 <DonutChart data={chartData} />
             </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-3">
             <StatCard 
                icon={DollarSign} 
                label="Financial Exposure" 
                value={data.riskAssessment.financialImpact} 
                color="bg-emerald-500"
            />
            <StatCard 
                icon={Scale} 
                label="Legal Domain" 
                value={data.riskAssessment.legalDomain} 
                color="bg-blue-500"
            />
            <StatCard 
                icon={CheckCircle2} 
                label="Beneficiary" 
                value={data.riskAssessment.primaryBeneficiary} 
                color="bg-violet-500"
            />
        </div>
      </div>

      <div className="bg-zinc-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative z-10 flex gap-4 items-start">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Zap className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">AI Summary</h3>
                  <p className="text-sm text-zinc-100 leading-relaxed font-medium max-w-3xl">
                      {data.summary}
                  </p>
              </div>
          </div>
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                <FileSearch className="w-4 h-4 text-zinc-400" />
                Detailed Findings
            </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.issues.map((issue) => (
            <div 
              key={issue.id} 
              className={`rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col ${
                  issue.type === IssueType.MISSING ? 'bg-rose-50/30 border-rose-100' : 'bg-white border-zinc-200'
              }`}
            >
              <div className="p-5 flex justify-between items-start gap-4">
                  <div className="flex flex-col gap-2">
                      <IssueTypeBadge type={issue.type} />
                      <h4 className="font-bold text-zinc-900 text-sm leading-tight mt-1">{issue.title}</h4>
                  </div>
                  <SeverityBadge severity={issue.severity} />
              </div>

              <div className="px-5 pb-5 flex-1">
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed mb-4">
                      {issue.description}
                  </p>
                  
                  {issue.type === IssueType.CHANGE && issue.sourceDoc1 && issue.sourceDoc2 ? (
                       <div className="bg-zinc-50 rounded-xl border border-zinc-200 p-3 space-y-3 relative">
                           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white border border-zinc-200 rounded-full p-1 shadow-sm">
                               <ArrowRight className="w-3 h-3 text-zinc-400" />
                           </div>
                           <div className="pr-4">
                               <span className="text-[9px] font-bold text-zinc-400 uppercase">Original</span>
                               <p className="text-[11px] text-zinc-600 bg-white p-2 rounded border border-zinc-100 mt-1 line-through decoration-red-300 decoration-2 opacity-70">
                                   {issue.sourceDoc1}
                               </p>
                           </div>
                           <div className="pl-4 text-right">
                               <span className="text-[9px] font-bold text-zinc-400 uppercase">New Version</span>
                               <p className="text-[11px] text-zinc-800 bg-blue-50/50 p-2 rounded border border-blue-100 mt-1 font-medium">
                                   {issue.sourceDoc2}
                               </p>
                           </div>
                       </div>
                  ) : issue.type === IssueType.MISSING ? (
                      <div className="bg-rose-50 rounded-xl border border-dashed border-rose-200 p-4 flex flex-col items-center text-center">
                          <FileMinus className="w-6 h-6 text-rose-300 mb-2" />
                          <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Clause Absent</p>
                          <p className="text-[10px] text-rose-600 mt-1">This standard protection is missing from the document.</p>
                      </div>
                  ) : (
                      (issue.sourceDoc1 || issue.sourceDoc2) && (
                        <div className="bg-zinc-50 rounded-xl border border-zinc-100 p-3 space-y-2">
                            {issue.sourceDoc1 && (
                                <div className="flex gap-2.5 items-start">
                                    <div className="w-0.5 h-full min-h-[1.5rem] bg-zinc-300 rounded-full mt-1 shrink-0"></div>
                                    <p className="text-[11px] text-zinc-600 italic leading-relaxed">"{issue.sourceDoc1}"</p>
                                </div>
                            )}
                            {issue.sourceDoc2 && (
                                <div className="flex gap-2.5 items-start">
                                    <div className="w-0.5 h-full min-h-[1.5rem] bg-amber-400 rounded-full mt-1 shrink-0"></div>
                                    <p className="text-[11px] text-zinc-600 italic leading-relaxed">"{issue.sourceDoc2}"</p>
                                </div>
                            )}
                        </div>
                      )
                  )}
              </div>
              
              {issue.recommendation && (
                  <div className="px-5 py-3 bg-zinc-50 border-t border-zinc-100 flex items-center gap-3">
                      <div className="p-1 bg-emerald-100 rounded-full shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      </div>
                      <span className="text-[10px] font-bold text-zinc-700 leading-tight">
                          {issue.recommendation}
                      </span>
                  </div>
              )}
            </div>
          ))}
        </div>
        
        {data.issues.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-zinc-200">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900">All Clear</h3>
                <p className="text-zinc-400 text-sm">No significant risks detected.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisResults;