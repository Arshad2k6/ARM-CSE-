import React from 'react';
import { User } from 'firebase/auth';
import { BookOpen, CheckCircle2, ShieldCheck, LogIn, LogOut, CheckSquare } from 'lucide-react';

interface HeaderProps {
  user: User | null;
  accessToken: string | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogin: () => void;
  onLogout: () => void;
  isLoggingIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  accessToken,
  activeTab,
  setActiveTab,
  onLogin,
  onLogout,
  isLoggingIn
}) => {
  const tabs = [
    { id: 'overview', label: 'Overview & Coverage' },
    { id: 'syllabus', label: 'Syllabus Hierarchy' },
    { id: 'resources', label: 'Verified Resources' },
    { id: 'tasks', label: 'Google Tasks Planner' },
    { id: 'report', label: '10-Section Audit Report' },
    { id: 'csv', label: 'CSV Export & Validator' },
  ];

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-100 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-amber-400 tracking-wider">SAAEPS 2026</span>
          <span className="text-slate-400">|</span>
          <span>Smart Academic Assistance & Exam Preparation System</span>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-emerald-400 hidden sm:inline flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 inline" /> TG/TS ECET 2026 CSE Aligned
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-300">
          <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] font-mono border border-slate-700">
            Syllabus: TGCHE / SBTET C-21/C-24
          </span>
          <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded text-[11px] font-medium border border-emerald-800/50">
            Topic Coverage: 93.55%
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm font-black text-lg">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                SAAEPS Academic Resource Management
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">
                TG ECET CSE
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Verified Syllabus Inventory, Resource Mapping & Study Management
            </p>
          </div>
        </div>

        {/* User / Sign-in */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'User'} className="w-7 h-7 rounded-full border border-slate-300" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              <div className="text-left hidden md:block">
                <div className="text-xs font-medium text-slate-800 leading-none">
                  {user.displayName || user.email?.split('@')[0]}
                </div>
                <div className="text-[10px] text-slate-500 leading-tight mt-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 inline" />
                  Firebase &amp; Tasks Connected
                </div>
              </div>
              <button
                onClick={onLogout}
                title="Sign out"
                className="text-slate-400 hover:text-rose-600 p-1 rounded-sm transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              disabled={isLoggingIn}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-slate-300 rounded-lg shadow-2xs bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.89c2.28-2.1 3.65-5.2 3.65-9.15z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.89-3.05c-1.08.72-2.45 1.16-4.04 1.16-3.12 0-5.77-2.1-6.72-4.94H1.24v3.13C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.13-1.54.38-2.26V6.61H1.24C.45 8.23 0 10.06 0 12s.45 3.77 1.24 5.39l4.04-3.13z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.61l4.04 3.13c.95-2.84 3.6-4.99 6.72-4.99z"/>
              </svg>
              <span>{isLoggingIn ? 'Connecting...' : 'Sign in with Google'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto border-t border-slate-100 no-scrollbar">
        <nav className="flex space-x-6 py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap text-xs font-medium py-1.5 px-2 rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
