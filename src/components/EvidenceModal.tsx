import React from 'react';
import { ARMResource } from '../data/armDataset';
import { X, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface EvidenceModalProps {
  resource: ARMResource | null;
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({ resource, onClose }) => {
  if (!resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
            {resource.resourceId}
          </span>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Verified Academic Resource
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 mb-1">
          {resource.title}
        </h3>
        <p className="text-xs text-indigo-600 font-medium mb-4">
          {resource.subject} &bull; {resource.topic}
        </p>

        <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block">Source Authority</span>
            <span className="font-semibold text-slate-800">{resource.evidence.source}</span>
          </div>

          <div>
            <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block">Syllabus Relevance (Why It Matches)</span>
            <p className="text-slate-700 mt-0.5 leading-relaxed">{resource.evidence.whyItMatches}</p>
          </div>

          <div>
            <span className="font-bold text-emerald-700 uppercase text-[10px] tracking-wider block">Verified Technical Evidence</span>
            <p className="text-slate-800 mt-0.5 font-medium leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
              {resource.evidence.concreteEvidence}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Close Audit
          </button>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors inline-flex items-center gap-1.5"
          >
            Open Live Resource <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
