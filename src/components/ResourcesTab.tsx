import React, { useState } from 'react';
import { VERIFIED_ARM_RESOURCES, ARMResource } from '../data/armDataset';
import { CSE_SUBJECTS } from '../data/syllabusData';
import {
  FileText,
  Search,
  ExternalLink,
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Filter,
  Eye,
  Info
} from 'lucide-react';

interface ResourcesTabProps {
  initialSearch?: string;
  onInspectEvidence: (resource: ARMResource) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (resourceId: string) => void;
}

export const ResourcesTab: React.FC<ResourcesTabProps> = ({
  initialSearch = '',
  onInspectEvidence,
  bookmarkedIds,
  onToggleBookmark
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [onlyBookmarked, setOnlyBookmarked] = useState<boolean>(false);

  const resourceTypes: ('notes' | 'video' | 'reference_material' | 'revision')[] = [
    'notes',
    'video',
    'reference_material',
    'revision'
  ];

  const filteredResources = VERIFIED_ARM_RESOURCES.filter(res => {
    const matchesSubject = selectedSubject === 'ALL' || res.subject === selectedSubject;
    const matchesType = selectedType === 'ALL' || res.resourceType === selectedType;
    const matchesBookmark = !onlyBookmarked || bookmarkedIds.includes(res.resourceId);
    const matchesQuery =
      searchQuery.trim() === '' ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.resourceId.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSubject && matchesType && matchesBookmark && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header and Filter Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              Verified SAAEPS Academic Resource Repository
            </h2>
            <p className="text-xs text-slate-500">
              Only verified resources matching the exact TG ECET 2026 CSE syllabus. Restricted to 4 valid SAAEPS types.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setOnlyBookmarked(!onlyBookmarked)}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-colors inline-flex items-center gap-1.5 ${
                onlyBookmarked
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              Bookmarks ({bookmarkedIds.length})
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="ALL">All Subjects ({VERIFIED_ARM_RESOURCES.length} resources)</option>
              {CSE_SUBJECTS.map(s => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Valid Resource Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="ALL">All 4 Types (notes, video, reference, revision)</option>
              {resourceTypes.map(t => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Search by Keyword / ID
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. K-Map, 8086, Trees, Subnetting..."
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 pl-8 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Resource Count Badge */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-800">{filteredResources.length}</strong> verified resources
        </span>
        <span className="flex items-center gap-1 text-emerald-600 font-medium">
          <ShieldCheck className="w-4 h-4 inline" /> All URLs checked against live academic sources
        </span>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((res) => {
          const isBookmarked = bookmarkedIds.includes(res.resourceId);

          return (
            <div
              key={res.resourceId}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Meta row */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {res.resourceId}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {res.resourceType}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onToggleBookmark(res.resourceId)}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this resource'}
                      className="text-slate-400 hover:text-amber-500 p-1 rounded-sm transition-colors"
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </button>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      verified
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-indigo-600 mb-1">
                  {res.subject} &bull; {res.topic}
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2">
                  {res.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {res.description}
                </p>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onInspectEvidence(res)}
                  className="text-xs text-slate-600 hover:text-indigo-600 font-medium inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-slate-50 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Audit Evidence
                </button>

                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-1.5 rounded-lg shadow-2xs inline-flex items-center gap-1.5 transition-colors"
                >
                  Open Resource <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
          <Info className="w-8 h-8 mx-auto text-slate-400 mb-2" />
          <p className="text-sm font-medium text-slate-700">No resources matched your filter criteria.</p>
          <p className="text-xs text-slate-400 mt-1">Try resetting the subject or resource type filter.</p>
        </div>
      )}
    </div>
  );
};
