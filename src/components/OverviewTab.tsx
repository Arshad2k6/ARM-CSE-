import React from 'react';
import {
  TOTAL_SUBJECTS,
  TOTAL_SYLLABUS_TOPICS,
  COVERED_TOPICS_COUNT,
  UNRESOLVED_TOPICS_COUNT,
  TOTAL_VERIFIED_RESOURCES,
  TOTAL_CANDIDATE_RESOURCES,
  TOTAL_REJECTED_RESOURCES,
  TOTAL_QB_CANDIDATES,
  TOPIC_COVERAGE_PERCENT
} from '../data/armDataset';
import { CSE_SUBJECTS } from '../data/syllabusData';
import {
  CheckCircle2,
  AlertCircle,
  FileText,
  Layers,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Database,
  CheckSquare
} from 'lucide-react';

interface OverviewTabProps {
  onNavigate: (tab: string, subjectFilter?: string) => void;
  masteredCount: number;
  inProgressCount: number;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  onNavigate,
  masteredCount,
  inProgressCount
}) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Hero Executive Card */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium mb-4 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            SAAEPS Master Academic Resource Management (ARM)
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            TG/TS ECET 2026 — Computer Science &amp; Engineering
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Audited, syllabus-aligned, and import-ready dataset conforming to the SAAEPS ARM architecture
            (ECET &rarr; Branch &rarr; Subject &rarr; Topic &rarr; Resource). Every resource is individually verified
            with concrete technical proof and restricted to valid resource types (<code className="text-amber-300">notes</code>,{' '}
            <code className="text-amber-300">video</code>, <code className="text-amber-300">reference_material</code>,{' '}
            <code className="text-amber-300">revision</code>).
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('resources')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md transition-colors inline-flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Explore 59 Verified Resources
            </button>
            <button
              onClick={() => onNavigate('syllabus')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition-colors inline-flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              View 62 Syllabus Topics
            </button>
            <button
              onClick={() => onNavigate('report')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition-colors inline-flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              10-Section Audit Report
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-xs font-medium">Total Subjects</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{TOTAL_SUBJECTS}</div>
          <div className="text-[11px] text-slate-400 mt-1">Official CSE Core</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-xs font-medium">Logical Topics</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{TOTAL_SYLLABUS_TOPICS}</div>
          <div className="text-[11px] text-slate-400 mt-1">Exact Syllabus Count</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 shadow-2xs">
          <div className="text-emerald-700 text-xs font-medium">Covered Topics</div>
          <div className="text-2xl font-bold text-emerald-800 mt-1">{COVERED_TOPICS_COUNT}</div>
          <div className="text-[11px] text-emerald-600 mt-1">&ge;1 Verified Resource</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-100 bg-amber-50/30 shadow-2xs">
          <div className="text-amber-700 text-xs font-medium">Unresolved Topics</div>
          <div className="text-2xl font-bold text-amber-800 mt-1">{UNRESOLVED_TOPICS_COUNT}</div>
          <div className="text-[11px] text-amber-600 mt-1">Strictly isolated</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-indigo-100 bg-indigo-50/30 shadow-2xs">
          <div className="text-indigo-700 text-xs font-medium">Verified Resources</div>
          <div className="text-2xl font-bold text-indigo-800 mt-1">{TOTAL_VERIFIED_RESOURCES}</div>
          <div className="text-[11px] text-indigo-600 mt-1">100% Import Ready</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-xs font-medium">Topic Coverage</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{TOPIC_COVERAGE_PERCENT}%</div>
          <div className="text-[11px] text-slate-400 mt-1">58 / 62 exact ratio</div>
        </div>
      </div>

      {/* Personal Study Progress Tracker */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-indigo-600" />
              Student Preparation Tracker (Firestore Synced)
            </h3>
            <p className="text-xs text-slate-500">
              Track mastery for each of the 62 TG ECET CSE topics. Sync milestones to Google Tasks.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Mastered: {masteredCount}
            </span>
            <span className="inline-flex items-center gap-1 text-amber-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              In Progress: {inProgressCount}
            </span>
            <span className="inline-flex items-center gap-1 text-slate-500">
              <span className="w-2 h-2 rounded-full bg-slate-300" />
              Pending: {TOTAL_SYLLABUS_TOPICS - masteredCount - inProgressCount}
            </span>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
          <div
            className="bg-emerald-500 h-full transition-all duration-500"
            style={{ width: `${(masteredCount / TOTAL_SYLLABUS_TOPICS) * 100}%` }}
          />
          <div
            className="bg-amber-400 h-full transition-all duration-500"
            style={{ width: `${(inProgressCount / TOTAL_SYLLABUS_TOPICS) * 100}%` }}
          />
        </div>
      </div>

      {/* SAAEPS Existing Architecture Alignment */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
          <Database className="w-4 h-4 text-indigo-600" />
          SAAEPS ARM Architecture Strict Compliance
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          The SAAEPS system architecture strictly defines five levels of hierarchical alignment. No new database models,
          tables, or duplicate resource schemas have been introduced.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center">
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-400">Exam</div>
            <div className="text-sm font-bold text-slate-800 mt-1">ECET</div>
            <div className="text-[10px] text-slate-500 mt-0.5">TG/TS Diploma</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-400">Branch</div>
            <div className="text-sm font-bold text-indigo-700 mt-1">CSE</div>
            <div className="text-[10px] text-slate-500 mt-0.5">100 Marks Core</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-400">Subject</div>
            <div className="text-sm font-bold text-slate-800 mt-1">10 Subjects</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Official Syllabus</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-400">Topic</div>
            <div className="text-sm font-bold text-slate-800 mt-1">62 Topics</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Logical &amp; Granular</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-400">Resource</div>
            <div className="text-sm font-bold text-emerald-700 mt-1">59 Verified</div>
            <div className="text-[10px] text-slate-500 mt-0.5">4 Allowed Types</div>
          </div>
        </div>
      </div>

      {/* Subject Distribution Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900">
            Official 10 CSE Core Subjects &amp; Weightage Breakdown
          </h3>
          <span className="text-xs text-slate-500">Click subject to inspect topics</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CSE_SUBJECTS.map((sub) => (
            <div
              key={sub.id}
              onClick={() => onNavigate('syllabus', sub.id)}
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
                  {sub.subjectCode}
                </span>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {sub.officialMarks} Marks
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {sub.name}
              </h4>
              <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
                <span>{sub.topicIds.length} Logical Topics</span>
                <span className="text-indigo-600 font-medium inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  View <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
