import React, { useState, useEffect, useCallback, useRef } from 'react';
import { STUDENTS, QUIZ_QUESTIONS } from '../constants';
import { QuizState, QuizSectionType, Grade } from '../types';
import { Play, CheckCircle, Clock, Volume2, Backpack } from 'lucide-react';

const TOTAL_TIME = 9 * 60; // 9 minutes in seconds

export const QuizSystem: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    started: false,
    finished: false,
    timeLeft: TOTAL_TIME,
    answers: {},
    teacherScore: 0,
    studentId: ''
  });

  const timerRef = useRef<number | null>(null);

  const startQuiz = () => {
    if (!state.studentId) return;
    setState(prev => ({ ...prev, started: true }));
  };

  const submitQuiz = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setState(prev => ({ ...prev, finished: true }));
  }, []);

  useEffect(() => {
    if (state.started && !state.finished && state.timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setState(prev => {
          if (prev.timeLeft <= 1) {
            submitQuiz();
            return { ...prev, timeLeft: 0 };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.started, state.finished, submitQuiz]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleAnswer = (qId: number, value: string) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [qId]: value }
    }));
  };

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8; // Slower for Grade 3
    window.speechSynthesis.speak(utterance);
  };

  // Helper to render options creatively (e.g. colored bags)
  const renderOption = (qId: number, opt: string) => {
    // ID 10 is the "Read: A green bag" question
    if (qId === 10) {
        const color = opt.split(' ')[0].toLowerCase(); // extracts "green", "red", "blue"
        
        let colorClasses = "text-gray-500";
        let fillColor = "none";
        
        if (color === 'green') {
            colorClasses = "text-green-600";
            fillColor = "#dcfce7"; // green-100
        } else if (color === 'red') {
            colorClasses = "text-red-600";
            fillColor = "#fee2e2"; // red-100
        } else if (color === 'blue') {
            colorClasses = "text-blue-600";
            fillColor = "#dbeafe"; // blue-100
        }

        return (
            <div className="flex flex-col items-center justify-center gap-1 w-full h-full py-2">
                <Backpack 
                    size={42} 
                    className={`${colorClasses} transition-transform group-hover:scale-110`} 
                    fill={fillColor}
                    strokeWidth={1.5}
                />
                <span className={`text-sm font-bold ${colorClasses}`}>{opt}</span>
            </div>
        );
    }
    return opt;
  };

  // Grading Logic
  const calculateResult = () => {
    // Part 1: Auto-graded (75 points max)
    // 15 questions * 5 points each = 75
    let autoScore = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (state.answers[q.id] === q.correctAnswer) {
        autoScore += 5;
      }
    });

    // Part 2: Teacher Graded (25 points max)
    const totalScore = autoScore + state.teacherScore;

    let grade = Grade.F;
    if (state.teacherScore >= 22) grade = Grade.A;
    else if (state.teacherScore >= 18) grade = Grade.B;
    else if (state.teacherScore >= 10) grade = Grade.C;
    else if (state.teacherScore >= 1) grade = Grade.D;
    
    // Let's stick to the prompt's specific Speaking Grade Table for the "Oral Grade" 
    // and just show a numeric Total Score.
    
    let speakingGrade = Grade.F;
    if (state.teacherScore >= 22) speakingGrade = Grade.A;
    else if (state.teacherScore >= 18) speakingGrade = Grade.B;
    else if (state.teacherScore >= 10) speakingGrade = Grade.C;
    else if (state.teacherScore >= 1) speakingGrade = Grade.D;

    return { autoScore, totalScore, speakingGrade };
  };

  if (state.finished) {
    const result = calculateResult();
    const student = STUDENTS.find(s => s.id === state.studentId);

    return (
      <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg border-2 border-indigo-100">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">📝 Assessment Report</h2>
        
        <div className="bg-indigo-50 p-6 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-semibold">Student:</span>
                <span className="text-xl font-bold text-gray-800">{student?.name}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-semibold">Written Score (L/R/W):</span>
                <span className="text-xl font-bold text-blue-600">{result.autoScore} / 75</span>
            </div>
            <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-semibold">Speaking Score:</span>
                <span className="text-xl font-bold text-green-600">{state.teacherScore} / 25</span>
            </div>
            <div className="border-t border-indigo-200 my-2 pt-2 flex justify-between items-center">
                <span className="text-gray-800 font-bold text-lg">Total Score:</span>
                <span className="text-3xl font-black text-indigo-800">{result.totalScore}</span>
            </div>
        </div>

        <div className="text-center bg-yellow-100 p-4 rounded-xl border-2 border-yellow-300">
            <p className="text-sm text-yellow-800 uppercase tracking-widest font-bold mb-1">Speaking Proficiency Level</p>
            <p className="text-6xl font-black text-yellow-600">{result.speakingGrade}</p>
        </div>

        <button 
            onClick={() => window.location.reload()}
            className="mt-8 w-full py-4 bg-gray-800 text-white rounded-lg font-bold hover:bg-black transition-colors"
        >
            Start New Student
        </button>
      </div>
    );
  }

  if (!state.started) {
    return (
      <div className="p-8 max-w-md mx-auto bg-white rounded-2xl shadow-xl flex flex-col items-center space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">Ready for Quiz?</h2>
        
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Student</label>
            <select 
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-indigo-500 outline-none bg-white"
                value={state.studentId}
                onChange={(e) => setState(prev => ({...prev, studentId: e.target.value}))}
            >
                <option value="" disabled>Please Select Name</option>
                {STUDENTS.map(s => (
                    <option key={s.id} value={s.id}>{s.id} {s.name}</option>
                ))}
            </select>
        </div>

        <button 
            disabled={!state.studentId}
            onClick={startQuiz}
            className="w-full py-4 bg-indigo-600 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
            Start Assessment
        </button>
        <p className="text-xs text-gray-400">Time Limit: 9 Minutes</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Sticky Timer Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-md p-4 flex justify-between items-center rounded-b-xl border-b border-indigo-100">
        <div className="flex items-center space-x-2 text-indigo-800">
             <span className="font-bold text-lg">{STUDENTS.find(s => s.id === state.studentId)?.name}</span>
        </div>
        <div className={`flex items-center space-x-2 text-2xl font-mono font-bold ${state.timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-gray-800'}`}>
          <Clock className="w-6 h-6" />
          <span>{formatTime(state.timeLeft)}</span>
        </div>
      </div>

      <div className="p-4 space-y-8">
        {/* Auto-graded Sections */}
        {[QuizSectionType.LISTENING, QuizSectionType.READING, QuizSectionType.WRITING].map((type) => (
           <div key={type} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <h3 className="text-xl font-bold text-indigo-600 mb-4 border-b pb-2">{type} Section</h3>
             <div className="space-y-6">
                {QUIZ_QUESTIONS.filter(q => q.type === type).map((q, idx) => (
                    <div key={q.id} className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-start gap-3 mb-3">
                            <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded">{idx + 1}</span>
                            <div className="flex-1">
                                <p className="font-medium text-gray-800 text-lg">{q.prompt}</p>
                                {q.type === QuizSectionType.LISTENING && q.media && (
                                    <button 
                                        onClick={() => playAudio(q.media!)}
                                        className="mt-2 flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full hover:bg-yellow-200 transition-colors"
                                    >
                                        <Volume2 className="w-5 h-5" />
                                        <span className="font-bold">Play Audio</span>
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {q.options?.map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => handleAnswer(q.id, opt)}
                                    className={`group relative p-3 rounded-lg border-2 text-lg font-medium transition-all ${
                                        state.answers[q.id] === opt 
                                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm' 
                                        : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-200'
                                    }`}
                                >
                                    {renderOption(q.id, opt)}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
             </div>
           </div> 
        ))}

        {/* Teacher Grading Section */}
        <div className="bg-orange-50 p-6 rounded-2xl border-2 border-orange-200">
            <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" /> 
                Teacher Grading (Speaking)
            </h3>
            <p className="text-sm text-orange-700 mb-4 italic">
                Ask student 5 questions. Rate fluency (0-25).
                <br/> A (22-25): Fluent | B (18-21): Clear | C (10-17): Needs Help
            </p>
            
            <div className="space-y-4">
                 <div className="flex justify-between items-center bg-white p-4 rounded-lg">
                    <span className="font-bold text-gray-700 text-xl">Score: {state.teacherScore}</span>
                    <input 
                        type="range" 
                        min="0" 
                        max="25" 
                        value={state.teacherScore}
                        onChange={(e) => setState(prev => ({...prev, teacherScore: parseInt(e.target.value)}))}
                        className="w-2/3 h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                 </div>
                 <div className="flex justify-between text-xs text-gray-500 px-2">
                    <span>F (0)</span>
                    <span>C (10)</span>
                    <span>B (18)</span>
                    <span>A (22)</span>
                    <span>Max (25)</span>
                 </div>
            </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="max-w-4xl mx-auto">
            <button 
                onClick={submitQuiz}
                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-xl rounded-xl shadow-lg transition-colors"
            >
                Submit Answers
            </button>
        </div>
      </div>
    </div>
  );
};