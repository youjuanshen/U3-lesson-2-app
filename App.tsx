import React, { useState } from 'react';
import { LessonFlow } from './components/LessonFlow';
import { QuizSystem } from './components/QuizSystem';
import { BookOpen, GraduationCap } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState<'lesson' | 'quiz'>('lesson');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-indigo-600 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold font-comic">G3 English Smart Class</h1>
            <div className="flex space-x-2 bg-indigo-700 p-1 rounded-lg">
                <button
                    onClick={() => setMode('lesson')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${mode === 'lesson' ? 'bg-white text-indigo-700 shadow-sm' : 'text-indigo-200 hover:text-white'}`}
                >
                    <BookOpen size={18} />
                    <span className="font-bold">Lesson</span>
                </button>
                <button
                    onClick={() => setMode('quiz')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${mode === 'quiz' ? 'bg-white text-indigo-700 shadow-sm' : 'text-indigo-200 hover:text-white'}`}
                >
                    <GraduationCap size={18} />
                    <span className="font-bold">Assessment</span>
                </button>
            </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {mode === 'lesson' ? <LessonFlow /> : <QuizSystem />}
      </main>
    </div>
  );
}