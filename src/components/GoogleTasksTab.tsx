import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  fetchTaskLists,
  fetchTasks,
  createGoogleTask,
  updateGoogleTaskStatus,
  deleteGoogleTask,
  GoogleTaskList,
  GoogleTaskItem
} from '../services/googleTasks';
import { CSE_TOPICS } from '../data/syllabusData';
import {
  CheckSquare,
  Plus,
  RefreshCw,
  Trash2,
  Calendar,
  AlertCircle,
  ExternalLink,
  ShieldAlert,
  LogIn
} from 'lucide-react';

interface GoogleTasksTabProps {
  user: User | null;
  accessToken: string | null;
  onLogin: () => void;
  onRequestDeleteConfirm: (task: GoogleTaskItem) => void;
}

export const GoogleTasksTab: React.FC<GoogleTasksTabProps> = ({
  user,
  accessToken,
  onLogin,
  onRequestDeleteConfirm
}) => {
  const [taskLists, setTaskLists] = useState<GoogleTaskList[]>([]);
  const [selectedListId, setSelectedListId] = useState<string>('@default');
  const [tasks, setTasks] = useState<GoogleTaskItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadListsAndTasks = async () => {
    if (!accessToken) return;
    setLoading(true);
    setError(null);
    try {
      const lists = await fetchTaskLists(accessToken);
      setTaskLists(lists);
      const targetList = selectedListId || (lists[0] ? lists[0].id : '@default');
      const items = await fetchTasks(accessToken, targetList);
      setTasks(items);
    } catch (err: any) {
      console.error('Error loading Google Tasks:', err);
      setError(err.message || 'Failed to communicate with Google Tasks API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && accessToken) {
      loadListsAndTasks();
    }
  }, [user, accessToken, selectedListId]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !newTitle.trim()) return;

    setIsSubmitting(true);
    try {
      const topicObj = CSE_TOPICS.find(t => t.id === selectedTopicId);
      const topicNotes = topicObj
        ? `TG ECET CSE Topic: ${topicObj.logicalTopicName} (${topicObj.subjectName})`
        : 'SAAEPS TG ECET 2026 CSE Revision Milestone';

      await createGoogleTask(accessToken, selectedListId, {
        title: newTitle.trim(),
        notes: topicNotes,
        due: newDueDate || undefined
      });

      setNewTitle('');
      setSelectedTopicId('');
      setNewDueDate('');
      await loadListsAndTasks();
    } catch (err: any) {
      setError(err.message || 'Could not create task in Google Tasks.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (task: GoogleTaskItem) => {
    if (!accessToken) return;
    try {
      const isCompleted = task.status === 'completed';
      await updateGoogleTaskStatus(accessToken, task.id, !isCompleted, selectedListId);
      setTasks(prev =>
        prev.map(t =>
          t.id === task.id ? { ...t, status: isCompleted ? 'needsAction' : 'completed' } : t
        )
      );
    } catch (err: any) {
      setError(err.message || 'Failed to update task status.');
    }
  };

  if (!user || !accessToken) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-4">
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
          <CheckSquare className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Connect Google Tasks</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Sign in with your Google account to synchronize your TG ECET 2026 CSE revision plan
          directly to your personal Google Tasks account.
        </p>
        <button
          onClick={onLogin}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
        >
          <LogIn className="w-4 h-4" />
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-indigo-600" />
            Google Tasks Study Planner
          </h2>
          <p className="text-xs text-slate-500">
            Real-time synchronization with Google Tasks API ({user.email}).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedListId}
            onChange={(e) => setSelectedListId(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {taskLists.map(list => (
              <option key={list.id} value={list.id}>
                List: {list.title}
              </option>
            ))}
            {taskLists.length === 0 && <option value="@default">My Tasks (Default)</option>}
          </select>

          <button
            onClick={loadListsAndTasks}
            disabled={loading}
            className="p-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
            title="Refresh from Google Tasks"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Add Task Form */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          Add Revision Milestone to Google Tasks
        </h3>

        <form onSubmit={handleCreateTask} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-3">
            <input
              type="text"
              placeholder="Task Title, e.g. Revise 8086 Addressing Modes &amp; Solve 10 MCQs"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <select
              value={selectedTopicId}
              onChange={(e) => {
                setSelectedTopicId(e.target.value);
                if (!newTitle) {
                  const t = CSE_TOPICS.find(top => top.id === e.target.value);
                  if (t) setNewTitle(`Revise ${t.logicalTopicName}`);
                }
              }}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Link to Syllabus Topic (Optional)</option>
              {CSE_TOPICS.map(t => (
                <option key={t.id} value={t.id}>
                  {t.id}: {t.logicalTopicName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-700"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting || !newTitle.trim()}
              className="w-full text-xs p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              {isSubmitting ? 'Syncing...' : 'Create Google Task'}
            </button>
          </div>
        </form>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500 font-semibold">
          <span>Google Tasks ({tasks.length})</span>
          <span>Status</span>
        </div>

        {tasks.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {tasks.map((task) => {
              const isCompleted = task.status === 'completed';

              return (
                <div
                  key={task.id}
                  className={`p-4 flex items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors ${
                    isCompleted ? 'bg-slate-50/40 opacity-75' : ''
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => handleToggleStatus(task)}
                      className="mt-1 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                    />

                    <div>
                      <h4
                        className={`text-xs font-bold ${
                          isCompleted ? 'line-through text-slate-400' : 'text-slate-900'
                        }`}
                      >
                        {task.title}
                      </h4>

                      {task.notes && (
                        <p className="text-[11px] text-slate-500 mt-0.5">{task.notes}</p>
                      )}

                      {task.due && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 mt-1 font-mono">
                          <Calendar className="w-3 h-3" />
                          Due: {new Date(task.due).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {isCompleted ? 'Completed' : 'Pending'}
                    </span>

                    {/* Delete button triggering confirmation modal */}
                    <button
                      onClick={() => onRequestDeleteConfirm(task)}
                      title="Delete task from Google Tasks"
                      className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-slate-400">
            {loading ? 'Fetching tasks from Google Tasks...' : 'No study tasks found in this task list.'}
          </div>
        )}
      </div>
    </div>
  );
};
