import React, { useState } from 'react';
import { LESSON_PLAN } from '../constants';
import { Camera, Edit3, Volume2, Eye, EyeOff, Plus, Image as ImageIcon, Mic, HelpCircle } from 'lucide-react';

export const LessonFlow: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<string | null>(null);
  const [reveals, setReveals] = useState<Record<string, boolean>>({});

  const toggleStep = (id: string) => {
    setActiveStepId(prev => prev === id ? null : id);
  };

  const toggleReveal = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReveals(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const playAudio = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="bg-blue-50 p-6 rounded-2xl mb-6 shadow-sm border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-900 font-comic">Unit 1-4: Colors & Letters</h2>
        <div className="flex items-center gap-4 mt-2 text-blue-700">
            <span className="flex items-center gap-1"><span className="font-bold">40</span> Min</span>
            <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
            <span className="flex items-center gap-1"><span className="font-bold">27</span> Students</span>
        </div>
      </div>

      <div className="relative border-l-4 border-indigo-200 ml-4 space-y-6 pb-4">
        {LESSON_PLAN.map((step) => {
             const isExpanded = activeStepId === step.id;
             return (
              <div key={step.id} className="ml-6 relative">
                {/* Time Badge */}
                <span className="absolute -left-[38px] top-6 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm z-10 border-2 border-white">
                  {step.time}
                </span>
                
                <div 
                    onClick={() => toggleStep(step.id)}
                    className={`bg-white rounded-2xl transition-all cursor-pointer overflow-hidden ${isExpanded ? 'ring-2 ring-indigo-500 shadow-md' : 'shadow-sm border border-gray-100 hover:border-indigo-300'}`}
                >
                    {/* Header */}
                    <div className="p-5 flex justify-between items-start">
                        <div>
                            <span className={`text-xs uppercase tracking-wider font-bold mb-1 block ${isExpanded ? 'text-indigo-600' : 'text-gray-400'}`}>
                                {step.phase}
                            </span>
                            <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                        </div>
                        <div className={`p-3 rounded-xl transition-colors ${isExpanded ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-50 text-gray-400'}`}>
                            {step.tool === 'camera' && <Camera size={24} />}
                            {step.tool === 'edit' && <Edit3 size={24} />}
                            {step.tool === 'audio' && <Volume2 size={24} />}
                            {step.tool === 'display' && <Eye size={24} />}
                        </div>
                    </div>

                    {/* Content (Expanded) */}
                    {isExpanded && (
                        <div className="px-5 pb-5 animate-fadeIn">
                            <p className="text-gray-600 mb-6 text-lg leading-relaxed border-l-4 border-gray-200 pl-4">
                                {step.description}
                            </p>

                            {/* Interactive Zone */}
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6">
                                {/* Specific Activity Logic */}
                                
                                {/* 1. Emoji Math */}
                                {step.title === 'Emoji Color Math' && (
                                    <div className="text-center py-4">
                                        <div className="text-5xl mb-6 flex justify-center items-center gap-4 flex-wrap">
                                            <span>🔴</span> 
                                            <Plus className="text-gray-400" /> 
                                            <span>🟡</span> 
                                            <span className="text-gray-400">=</span> 
                                            <span className="transform transition-all duration-500 scale-110">
                                                {reveals['math'] ? '🍊' : '❓'}
                                            </span>
                                        </div>
                                        <button 
                                            onClick={(e) => toggleReveal('math', e)}
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-bold shadow-lg transition-transform active:scale-95"
                                        >
                                            {reveals['math'] ? 'Hide Answer' : 'Show Answer'}
                                        </button>
                                    </div>
                                )}

                                {/* 2. Blind Box */}
                                {step.title === 'Blind Box Challenge' && (
                                    <div className="flex flex-col items-center gap-4 py-2">
                                        <button 
                                            onClick={(e) => playAudio("It is cute. It has long ears. What is it?", e)}
                                            className="flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-8 py-4 rounded-2xl font-bold shadow-md transition-all w-full justify-center"
                                        >
                                            <Volume2 size={24} />
                                            <span>Play Mystery Sound</span>
                                        </button>
                                        
                                        <div className={`transition-all duration-500 overflow-hidden ${reveals['box'] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="text-center p-4 bg-white rounded-xl border-2 border-dashed border-gray-300 mt-2">
                                                <span className="text-6xl block mb-2">🐇</span>
                                                <span className="text-2xl font-bold text-gray-800">It's a White Rabbit!</span>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={(e) => toggleReveal('box', e)}
                                            className="text-gray-500 text-sm underline hover:text-indigo-600"
                                        >
                                            {reveals['box'] ? 'Hide Answer' : 'Reveal Answer'}
                                        </button>
                                    </div>
                                )}

                                {/* 3. Director Game */}
                                {step.title === 'The "Director" Game' && (
                                    <div className="relative overflow-hidden rounded-xl bg-gray-900 text-white p-6 text-center">
                                        <div className="absolute top-2 right-2">
                                            <EyeOff className="text-gray-600" size={20} />
                                        </div>
                                        <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-4">Secret Image for Directors</h4>
                                        
                                        {reveals['director'] ? (
                                            <div className="animate-popIn">
                                                <div className="w-32 h-32 bg-pink-300 mx-auto rounded-full flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(249,168,212,0.5)]">
                                                    <span className="text-6xl">🌸</span>
                                                </div>
                                                <p className="font-bold text-xl text-pink-300">"A Pink Flower"</p>
                                            </div>
                                        ) : (
                                            <div className="h-32 flex items-center justify-center">
                                                <HelpCircle size={48} className="text-gray-700" />
                                            </div>
                                        )}

                                        <button 
                                            onClick={(e) => toggleReveal('director', e)}
                                            className="mt-6 w-full py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors font-bold text-sm"
                                        >
                                            {reveals['director'] ? 'Hide Secret' : 'Tap to Reveal Secret'}
                                        </button>
                                    </div>
                                )}

                                {/* 4. AR Color Hunters */}
                                {step.title === 'AR Color Hunters' && (
                                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-1 rounded-xl">
                                        <div className="bg-white p-4 rounded-lg">
                                            <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                                                <Camera size={18} /> Mission Card
                                            </h4>
                                            <ul className="space-y-2 mb-4">
                                                <li className="flex items-center gap-2 text-gray-600">
                                                    <div className="w-4 h-4 rounded-full border border-gray-300 bg-white"></div>
                                                    Find something <span className="font-bold">White</span>
                                                </li>
                                                <li className="flex items-center gap-2 text-gray-600">
                                                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                                    Find something <span className="font-bold">Blue</span>
                                                </li>
                                                <li className="flex items-center gap-2 text-gray-600">
                                                    <Mic size={16} />
                                                    Record: "Look! White and Blue."
                                                </li>
                                            </ul>
                                            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-400 py-3 rounded-lg font-bold border-2 border-dashed border-gray-300 cursor-not-allowed">
                                                Open Camera (Demo Mode)
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* 5. Gallery Walk */}
                                {step.title === 'Gallery Walk' && (
                                    <div className="grid grid-cols-2 gap-2">
                                        {[1,2,3,4].map(i => (
                                            <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-300 transition-colors cursor-pointer">
                                                <ImageIcon size={24} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer Info */}
                            <div className="flex items-center gap-3 text-sm text-gray-500 bg-white p-3 rounded-lg border border-gray-100">
                                <span className="font-bold text-indigo-600">Teacher:</span>
                                <span className="italic">"{step.interaction}"</span>
                            </div>
                            <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                                <span className="font-bold">Theory:</span> {step.theory}
                            </div>
                        </div>
                    )}
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
};