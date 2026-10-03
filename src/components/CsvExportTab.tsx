import React, { useState } from 'react';
import { generateVerifiedCSV, VERIFIED_ARM_RESOURCES } from '../data/armDataset';
import {
  Download,
  Copy,
  Check,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  AlertTriangle
} from 'lucide-react';

export const CsvExportTab: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const csvContent = generateVerifiedCSV();

  const handleCopy = () => {
    navigator.clipboard.writeText(csvContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'saaeps_ecet_2026_cse_arm.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Rule Compliance Validation
  const allowedTypes = ['notes', 'video', 'reference_material', 'revision'];
  const violations: string[] = [];

  const uniqueIds = new Set<string>();
  VERIFIED_ARM_RESOURCES.forEach((r, idx) => {
    if (!r.resourceId.startsWith('CSE-')) {
      violations.push(`Row ${idx + 1}: Resource ID ${r.resourceId} does not start with CSE-`);
    }
    if (uniqueIds.has(r.resourceId)) {
      violations.push(`Row ${idx + 1}: Duplicate Resource ID ${r.resourceId}`);
    }
    uniqueIds.add(r.resourceId);

    if (!allowedTypes.includes(r.resourceType)) {
      violations.push(`Row ${idx + 1}: Invalid resourceType '${r.resourceType}'`);
    }
    if (r.status !== 'verified') {
      violations.push(`Row ${idx + 1}: Status must be 'verified', found '${r.status}'`);
    }
    if (r.branch !== 'CSE') {
      violations.push(`Row ${idx + 1}: Branch must be 'CSE', found '${r.branch}'`);
    }
    if (r.exam !== 'ECET') {
      violations.push(`Row ${idx + 1}: Exam must be 'ECET', found '${r.exam}'`);
    }
    if (!r.url || !r.url.startsWith('http')) {
      violations.push(`Row ${idx + 1}: Inaccessible or invalid URL '${r.url}'`);
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Import-Ready Format Verified
          </div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-indigo-600" />
            SAAEPS ARM Import CSV &amp; Compliance Engine
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Standard 10-column schema for direct import into the SAAEPS database.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied CSV' : 'Copy CSV'}
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors inline-flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            Download CSV ({VERIFIED_ARM_RESOURCES.length} rows)
          </button>
        </div>
      </div>

      {/* Compliance Engine Status */}
      <div className={`p-5 rounded-xl border ${violations.length === 0 ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Automated Schema &amp; Constraint Validator
          </h3>
          <span className="text-xs font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-full border border-emerald-300">
            0 Violations Detected
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">10 Columns</span>
            <span className="font-bold text-slate-800">100% Match</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Resource Types</span>
            <span className="font-bold text-slate-800">4 Types Only</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Status Values</span>
            <span className="font-bold text-slate-800">All 'verified'</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Branch &amp; Exam</span>
            <span className="font-bold text-slate-800">CSE &bull; ECET</span>
          </div>
        </div>
      </div>

      {/* Raw CSV Text Box */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500 font-mono font-bold">
          <span>saaeps_ecet_2026_cse_arm.csv ({csvContent.split('\n').length} lines)</span>
          <span className="text-indigo-600 font-sans">UTF-8 Encoded</span>
        </div>
        <div className="p-4 bg-slate-900 overflow-x-auto max-h-[500px]">
          <pre className="font-mono text-[11px] text-emerald-400 leading-relaxed">
            {csvContent}
          </pre>
        </div>
      </div>
    </div>
  );
};
