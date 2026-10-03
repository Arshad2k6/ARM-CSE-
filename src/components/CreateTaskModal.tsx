import React, { useState } from 'react';
import { TopicItem } from '../data/syllabusData';
import { X, CheckSquare, Calendar } from 'lucide-react';

interface CreateTaskModalProps {
  topic: TopicItem | null;
  onClose: () => void;
  onSubmit: (title: string, notes: string, dueDate?: string) => Promise<void>;
  isSubmitting: boolean;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  topic,
  onClose,
  onSubmit,
  isSubmitting
}) => {
  if (!topic) return null;

  const [title, setTitle] = useState(`Revise ${topic.logicalTopicName}`);
  const [notes, setNotes] = useState(
    `SAAEPS TG ECET 2026 CSE Revision Milestone\nSubject: ${topic.subjectName} (${topic.subjectId})\nTopic ID: ${topic.id}\nTarget: Review notes & solve previous exam MCQs.`
  );
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onSubmit(title.trim(), notes.trim(), dueDate || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <CheckSquare className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Create Google Task Study Milestone
            </h3>
            <p className="text-xs text-slate-500">
              {topic.id}: {topic.logicalTopicName} ({topic.subjectName})
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Target Revision Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-700"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Notes / Instructions</label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono text-[11px]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              {isSubmitting ? 'Syncing to Google Tasks...' : 'Sync to Google Tasks'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
