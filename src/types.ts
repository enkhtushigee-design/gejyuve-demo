// Core domain types for the Gej Yu Ve demo prototype

export type Subject = "physics" | "biology" | "chemistry" | "astronomy" | "csci";

export interface Comment {
  id: string;
  author: string;
  avatarColor: string;
  date: string; // ISO date
  content: string;
}

export interface Post {
  id: string;
  clubId: string;
  author: string;
  avatarColor: string;
  date: string; // ISO date
  content: string;
  tag: string;
  likes: number;
  likedByMe: boolean;
  comments: Comment[];
}

export interface Club {
  id: string;
  name: string;
  subject: Subject;
  icon: string; // emoji
  color: string; // tailwind gradient key
  description: string;
  memberCount: number;
  tagline: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type QuizLevel = 1 | 2 | 3;

export interface Quiz {
  id: string;
  clubId: string;
  subject: Subject;
  level: QuizLevel;
  title: string;
  levelLabel: string;
  description: string;
  xpPerQuestion: number;
  questions: QuizQuestion[];
}

export interface Badge {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface EarnedBadge {
  badgeId: string;
  earnedAt: string; // ISO date
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  clubId: string;
  subject: Subject;
  level: QuizLevel;
  score: number;
  total: number;
  xpEarned: number;
  date: string; // ISO date
}

export interface ActivityItem {
  id: string;
  type: "quiz" | "post" | "join" | "badge" | "challenge" | "like" | "comment";
  text: string;
  date: string; // ISO date
  icon: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatarColor: string;
  xp: number;
  subjectXp: Record<Subject, number>;
  level: number;
}

export interface DemoUser {
  id: string;
  name: string;
  avatarColor: string;
  subjectXp: Record<Subject, number>;
  joinedClubs: string[];
  earnedBadges: EarnedBadge[];
  quizAttempts: QuizAttempt[];
  activity: ActivityItem[];
  streak: number;
}

export interface Challenge {
  id: string;
  opponentId: string;
  opponentName: string;
  subject: Subject;
  level: QuizLevel;
  myScore: number;
  opponentScore: number;
  myXp: number;
  result: "win" | "lose" | "draw";
  date: string;
}
