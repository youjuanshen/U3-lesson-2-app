export interface LessonStep {
  id: string;
  time: string;
  phase: string;
  title: string;
  description: string;
  interaction: string;
  theory: string;
  tool: 'display' | 'camera' | 'audio' | 'edit';
}

export interface Student {
  id: string; // e.g., "01"
  name: string;
}

export enum QuizSectionType {
  LISTENING = 'Listening',
  READING = 'Reading',
  WRITING = 'Writing',
  SPEAKING = 'Speaking'
}

export interface Question {
  id: number;
  type: QuizSectionType;
  prompt: string;
  media?: string; // audio text or image url
  options?: string[];
  correctAnswer: string;
}

export interface QuizState {
  started: boolean;
  finished: boolean;
  timeLeft: number; // in seconds
  answers: Record<number, string>; // questionId -> answer
  teacherScore: number; // 0-25
  studentId: string;
}

export enum Grade {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  F = 'F'
}