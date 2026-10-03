import React, { useState } from 'react';
import { CSE_SUBJECTS, CSE_TOPICS, TopicItem, SubjectItem } from '../data/syllabusData';
import { VERIFIED_ARM_RESOURCES, UNRESOLVED_TOPICS } from '../data/armDataset';
import {
  Layers,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Filter,
  CheckSquare,
  Sparkles
} from 'lucide-react';
import { StudyProgressRecord } from '../services/firebase';

interface SyllabusTabProps {
  initialSubjectId?: string;
  onNavigateToResources: (topicName: string) => void;
  userProgress: Record<string, StudyProgressRecord>;
  onUpdateProgress: (topicId: string, subjectId: string, status: 'not_started' | 'in_progress' | 'mastered') => void;
  onCreateTaskModal: (topic: TopicItem) => void;
}

export const SyllabusTab: React.FC<SyllabusTabProps> = ({
  initialSubjectId,
  onNavigateToResources,
  userProgress,
  onUpdateProgress,
  onCreateTaskModal
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(initialSubjectId || 'ALL');
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const toggleExpand = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const filteredTopics = CSE_TOPICS.filter(t => {
    const matchesSubject = selectedSubjectId === 'ALL' || t.subjectId === selectedSubjectId;
    const matchesSearch =
      searchTerm.trim() === '' ||
      t.logicalTopicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.officialTopicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.syllabusDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <Filter className="w-4 h-4 text-indigo-600" /> Filter by Subject:
          </div>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800"
          >
            <option value="ALL">All 10 CSE Core Subjects (62 Topics)</option>
            {CSE_SUBJECTS.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.topicIds.length} topics • {s.officialMarks}M)
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search syllabus topics or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Syllabus Topics Accordion List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing {filteredTopics.length} of 62 Logical Syllabus Topics</span>
          <span>Syllabus Version: TGCHE 2026 Diploma Scheme</span>
        </div>

        {filteredTopics.map((topic) => {
          const verifiedResources = VERIFIED_ARM_RESOURCES.filter(r => r.evidence.topicId === topic.id);
          const isUnresolved = UNRESOLVED_TOPICS.some(u => u.topicId === topic.id);
          const isExpanded = !!expandedTopics[topic.id];
          const progress = userProgress[topic.id]?.status || 'not_started';

          return (
            <div
              key={topic.id}
              className={`bg-white rounded-xl border transition-all ${
                isUnresolved ? 'border-amber-200 bg-amber-50/20' : 'border-slate-200'
              }`}
            >
              {/* Card Header */}
              <div className="p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-[280px]">
                  <button
                    onClick={() => toggleExpand(topic.id)}
                    className="mt-0.5 text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-slate-600" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded">
                        {topic.id}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full">
                        {topic.subjectName}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Weightage: {topic.weightageEstimate}
                      </span>
                    </div>

                    <h3
                      onClick={() => toggleExpand(topic.id)}
                      className="text-sm font-bold text-slate-900 cursor-pointer hover:text-indigo-600 transition-colors"
                    >
                      {topic.logicalTopicName}
                    </h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      <span className="font-medium text-slate-600">Official Terminology:</span> {topic.officialTopicName}
                    </div>
                  </div>
                </div>

                {/* Right side badges & actions */}
                <div className="flex items-center gap-3">
                  {/* Status indicator */}
                  {isUnresolved ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      Unresolved (In Audit)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {verifiedResources.length} Verified Resource{verifiedResources.length > 1 ? 's' : ''}
                    </span>
                  )}

                  {/* Student mastery selector */}
                  <select
                    value={progress}
                    onChange={(e) =>
                      onUpdateProgress(topic.id, topic.subjectId, e.target.value as any)
                    }
                    className={`text-xs px-2.5 py-1 rounded-md border font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                      progress === 'mastered'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : progress === 'in_progress'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    <option value="not_started">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="mastered">Mastered</option>
                  </select>

                  {/* Create Task Button */}
                  <button
                    onClick={() => onCreateTaskModal(topic)}
                    title="Add Study Milestone to Google Tasks"
                    className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-slate-200"
                  >
                    <CheckSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Syllabus Scope &amp; Learning Objectives
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                      {topic.syllabusDescription}
                    </p>
                  </div>

                  {/* Verified Resources for this topic */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Mapped Academic Resources
                      </h4>
                      {verifiedResources.length > 0 && (
                        <button
                          onClick={() => onNavigateToResources(topic.logicalTopicName)}
                          className="text-xs text-indigo-600 hover:underline font-medium inline-flex items-center gap-1"
                        >
                          View in Resource Explorer &rarr;
                        </button>
                      )}
                    </div>

                    {verifiedResources.length > 0 ? (
                      <div className="space-y-2">
                        {verifiedResources.map((res) => (
                          <div
                            key={res.resourceId}
                            className="bg-white p-3 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs"
                          >
                            <div className="flex-1 min-w-[240px]">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="font-mono text-[10px] font-bold text-slate-500">
                                  {res.resourceId}
                                </span>
                                <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                                  {res.resourceType}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  Source: {res.evidence.source}
                                </span>
                              </div>
                              <div className="text-xs font-bold text-slate-900">{res.title}</div>
                              <p className="text-[11px] text-slate-500 line-clamp-1">{res.description}</p>
                            </div>

                            <a
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-md border border-indigo-200 inline-flex items-center gap-1 transition-colors"
                            >
                              Open Resource <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-amber-800">
                        <strong>Unresolved Topic:</strong> No verified resource has been imported yet.
                        Candidate materials remain under strict syllabus audit to prevent inaccurate or fabricated mappings.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
