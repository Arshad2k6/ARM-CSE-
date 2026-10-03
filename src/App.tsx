import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  initAuth,
  googleSignIn,
  logout,
  StudyProgressRecord,
  saveTopicProgress,
  subscribeToUserProgress
} from './services/firebase';
import { createGoogleTask, deleteGoogleTask, GoogleTaskItem } from './services/googleTasks';
import { ARMResource } from './data/armDataset';
import { TopicItem } from './data/syllabusData';
import { Header } from './components/Header';
import { OverviewTab } from './components/OverviewTab';
import { SyllabusTab } from './components/SyllabusTab';
import { ResourcesTab } from './components/ResourcesTab';
import { ResearchReportTab } from './components/ResearchReportTab';
import { GoogleTasksTab } from './components/GoogleTasksTab';
import { CsvExportTab } from './components/CsvExportTab';
import { EvidenceModal } from './components/EvidenceModal';
import { ConfirmModal } from './components/ConfirmModal';
import { CreateTaskModal } from './components/CreateTaskModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // User study progress (per-topic mastery)
  const [userProgress, setUserProgress] = useState<Record<string, StudyProgressRecord>>({});
  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('saaeps_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [inspectedResource, setInspectedResource] = useState<ARMResource | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<GoogleTaskItem | null>(null);
  const [selectedTopicForTask, setSelectedTopicForTask] = useState<TopicItem | null>(null);
  const [isCreatingTask, setIsCreatingTask] = useState<boolean>(false);

  // Search filter passed across tabs
  const [resourceSearch, setResourceSearch] = useState<string>('');
  const [initialSubjectId, setInitialSubjectId] = useState<string>('ALL');

  // Status message / toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Initialize Firebase Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        if (token) setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Listen to Firestore progress when user is logged in
  useEffect(() => {
    if (!user) return;
    try {
      const unsubscribe = subscribeToUserProgress(user.uid, (records) => {
        setUserProgress(records);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("Could not subscribe to Firestore progress:", e);
    }
  }, [user]);

  // Handle Google Sign In
  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setAccessToken(res.accessToken);
        showToast(`Signed in as ${res.user.email}`);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      showToast('Sign-in failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setAccessToken(null);
      showToast('Signed out successfully.');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Update Topic Mastery
  const handleUpdateProgress = async (
    topicId: string,
    subjectId: string,
    status: 'not_started' | 'in_progress' | 'mastered'
  ) => {
    const updatedRecord: StudyProgressRecord = {
      userId: user?.uid || 'guest',
      topicId,
      subjectId,
      status,
      updatedAt: new Date().toISOString()
    };

    // Update local state immediately
    setUserProgress(prev => ({ ...prev, [topicId]: updatedRecord }));

    // Persist to Firestore if user signed in
    if (user) {
      try {
        await saveTopicProgress(user.uid, updatedRecord);
        showToast(`Topic status updated to ${status.replace('_', ' ')}.`);
      } catch (err) {
        console.error('Firestore save error:', err);
      }
    } else {
      showToast(`Status saved locally. Sign in to sync across devices.`);
    }
  };

  // Toggle Bookmark
  const handleToggleBookmark = (resourceId: string) => {
    setBookmarkedIds(prev => {
      const exists = prev.includes(resourceId);
      const next = exists ? prev.filter(id => id !== resourceId) : [...prev, resourceId];
      try {
        localStorage.setItem('saaeps_bookmarks', JSON.stringify(next));
      } catch {}
      showToast(exists ? 'Bookmark removed.' : 'Resource bookmarked.');
      return next;
    });
  };

  // Navigation helper
  const handleNavigate = (tab: string, subjectFilter?: string) => {
    if (subjectFilter) {
      setInitialSubjectId(subjectFilter);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToResources = (topicName: string) => {
    setResourceSearch(topicName);
    setActiveTab('resources');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Create Google Task from topic modal
  const handleCreateTopicTask = async (title: string, notes: string, dueDate?: string) => {
    if (!accessToken) {
      showToast('Please sign in with Google to create tasks in Google Tasks.');
      return;
    }

    setIsCreatingTask(true);
    try {
      await createGoogleTask(accessToken, '@default', {
        title,
        notes,
        due: dueDate
      });
      showToast('Study task created successfully in Google Tasks!');
    } catch (err: any) {
      showToast(err.message || 'Failed to create task in Google Tasks.');
    } finally {
      setIsCreatingTask(false);
    }
  };

  // Execute confirmed task deletion (mandatory confirmation guard)
  const handleConfirmDeleteTask = async () => {
    if (!taskToDelete || !accessToken) return;
    try {
      await deleteGoogleTask(accessToken, taskToDelete.id, taskToDelete.title);
      showToast(`Task "${taskToDelete.title}" deleted from Google Tasks.`);
      setTaskToDelete(null);
      // Trigger a reload in the tasks tab if active
    } catch (err: any) {
      showToast(err.message || 'Failed to delete task.');
    }
  };

  const masteredCount = Object.values(userProgress).filter(p => p.status === 'mastered').length;
  const inProgressCount = Object.values(userProgress).filter(p => p.status === 'in_progress').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 animate-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Main Header */}
      <Header
        user={user}
        accessToken={accessToken}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isLoggingIn={isLoggingIn}
      />

      {/* Main Body Tabs */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <OverviewTab
            onNavigate={handleNavigate}
            masteredCount={masteredCount}
            inProgressCount={inProgressCount}
          />
        )}

        {activeTab === 'syllabus' && (
          <SyllabusTab
            initialSubjectId={initialSubjectId}
            onNavigateToResources={handleNavigateToResources}
            userProgress={userProgress}
            onUpdateProgress={handleUpdateProgress}
            onCreateTaskModal={(topic) => setSelectedTopicForTask(topic)}
          />
        )}

        {activeTab === 'resources' && (
          <ResourcesTab
            initialSearch={resourceSearch}
            onInspectEvidence={(res) => setInspectedResource(res)}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeTab === 'tasks' && (
          <GoogleTasksTab
            user={user}
            accessToken={accessToken}
            onLogin={handleLogin}
            onRequestDeleteConfirm={(task) => setTaskToDelete(task)}
          />
        )}

        {activeTab === 'report' && (
          <ResearchReportTab
            onInspectEvidence={(res) => setInspectedResource(res)}
          />
        )}

        {activeTab === 'csv' && <CsvExportTab />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            SAAEPS — Smart Academic Assistance &amp; Exam Preparation System
          </p>
          <p className="text-[11px] text-slate-400">
            TG/TS ECET 2026 Academic Resource Management (ARM) &bull; Computer Science &amp; Engineering &bull; Version 2.4-verified
          </p>
          <p className="text-[11px] text-slate-400">
            Official Syllabus Authority: TGCHE / SBTET Telangana &bull; Powered by Firebase &amp; Google Tasks Workspace Integration
          </p>
        </div>
      </footer>

      {/* Modals */}
      <EvidenceModal
        resource={inspectedResource}
        onClose={() => setInspectedResource(null)}
      />

      <ConfirmModal
        isOpen={!!taskToDelete}
        title="Delete Google Task?"
        message="This action will permanently delete this task from your Google Tasks account. Are you sure you want to proceed?"
        itemName={taskToDelete?.title}
        onConfirm={handleConfirmDeleteTask}
        onCancel={() => setTaskToDelete(null)}
        confirmLabel="Confirm Delete"
      />

      <CreateTaskModal
        topic={selectedTopicForTask}
        onClose={() => setSelectedTopicForTask(null)}
        onSubmit={handleCreateTopicTask}
        isSubmitting={isCreatingTask}
      />
    </div>
  );
}
