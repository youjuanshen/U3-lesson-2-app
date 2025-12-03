import { LessonStep, Question, QuizSectionType, Student } from './types';

export const STUDENTS: Student[] = [
  { id: '01', name: 'Alice' },
  { id: '02', name: 'Bob' },
  { id: '03', name: 'Charlie' },
  { id: '04', name: 'David' },
  { id: '05', name: 'Eva' },
  { id: '06', name: 'Frank' },
  { id: '07', name: 'Grace' },
];

export const LESSON_PLAN: LessonStep[] = [
  {
    id: '1',
    time: "0-5'",
    phase: 'Warm-up',
    title: 'Emoji Color Math',
    description: 'Solve the equation: 🔴 + 🟡 = ❓. Find the emoji in your phone!',
    interaction: 'Show phone screen with 🍊',
    theory: 'Constructivism: Scaffolding with symbols',
    tool: 'display'
  },
  {
    id: '2',
    time: "5-12'",
    phase: 'Presentation',
    title: 'Blind Box Challenge',
    description: 'Listen to the sound. Guess the animal and color. (Rabbit / White)',
    interaction: 'Group discussion & Show color card',
    theory: 'Multimodal Input: Auditory focus',
    tool: 'audio'
  },
  {
    id: '3',
    time: "12-22'",
    phase: 'Practice',
    title: 'The "Director" Game',
    description: 'Directors describe the picture. The Artist paints it on the phone.',
    interaction: 'Information Gap / "Color it pink!"',
    theory: 'SLA Interaction Loop',
    tool: 'edit'
  },
  {
    id: '4',
    time: "22-35'",
    phase: 'Production',
    title: 'AR Color Hunters',
    description: 'Find two objects (e.g., White & Blue) and take a creative photo.',
    interaction: 'Real-world task',
    theory: 'Situated Learning',
    tool: 'camera'
  },
  {
    id: '5',
    time: "35-40'",
    phase: 'Wrap-up',
    title: 'Gallery Walk',
    description: 'Showcase photos. Q&A: "What color is it?"',
    interaction: 'Peer Review',
    theory: 'Self-Efficacy',
    tool: 'display'
  }
];

export const QUIZ_QUESTIONS: Question[] = [
  // Listening (5 questions)
  { id: 1, type: QuizSectionType.LISTENING, prompt: "Listen and choose: 'It is a red apple.'", media: "It is a red apple", options: ["🍎", "🍏", "🍌"], correctAnswer: "🍎" },
  { id: 2, type: QuizSectionType.LISTENING, prompt: "Listen and choose: 'Show me the color blue.'", media: "Show me the color blue", options: ["🟦", "🟥", "🟨"], correctAnswer: "🟦" },
  { id: 3, type: QuizSectionType.LISTENING, prompt: "Listen: 'I have a pink ruler.'", media: "I have a pink ruler", options: ["Pink Ruler", "Red Pen", "Pink Bag"], correctAnswer: "Pink Ruler" },
  { id: 4, type: QuizSectionType.LISTENING, prompt: "Listen letter: 'Q q'", media: "Q q", options: ["Op", "Qq", "Rr"], correctAnswer: "Qq" },
  { id: 5, type: QuizSectionType.LISTENING, prompt: "Listen letter: 'R r'", media: "R r", options: ["Rr", "Pp", "Bd"], correctAnswer: "Rr" },

  // Reading (5 questions)
  { id: 6, type: QuizSectionType.READING, prompt: "Read and Match: ORANGE", options: ["🍊", "🍋", "🍇"], correctAnswer: "🍊" },
  { id: 7, type: QuizSectionType.READING, prompt: "Which is WHITE?", options: ["☁️", "🌚", "🌞"], correctAnswer: "☁️" },
  { id: 8, type: QuizSectionType.READING, prompt: "Complete: 'This is ___ egg.'", options: ["a", "an", "the"], correctAnswer: "an" },
  { id: 9, type: QuizSectionType.READING, prompt: "Order: is / color / What / it ?", options: ["What color is it?", "It is what color?", "Color is it what?"], correctAnswer: "What color is it?" },
  { id: 10, type: QuizSectionType.READING, prompt: "Read: A green bag.", options: ["Green Bag", "Red Bag", "Blue Bag"], correctAnswer: "Green Bag" },

  // Writing (5 questions) - Simplified for Grade 3/Mobile
  { id: 11, type: QuizSectionType.WRITING, prompt: "Spell the color: R _ D", options: ["E", "A", "O"], correctAnswer: "E" },
  { id: 12, type: QuizSectionType.WRITING, prompt: "Spell the color: B L _ E", options: ["U", "O", "A"], correctAnswer: "U" },
  { id: 13, type: QuizSectionType.WRITING, prompt: "Arrange: P-I-N-K", options: ["PINK", "KIPN", "NKIP"], correctAnswer: "PINK" },
  { id: 14, type: QuizSectionType.WRITING, prompt: "Start with Q: ____", options: ["Queen", "Rabbit", "Panda"], correctAnswer: "Queen" },
  { id: 15, type: QuizSectionType.WRITING, prompt: "Start with R: ____", options: ["Rabbit", "Question", "Orange"], correctAnswer: "Rabbit" },
];