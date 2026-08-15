import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Post,
  Comment,
  DemoUser,
  Subject,
  QuizLevel,
  Quiz,
  QuizAttempt,
  Challenge,
  ActivityItem,
  LeaderboardUser,
} from "../types";
import { INITIAL_POSTS } from "../data/clubs";
import { BADGES } from "../data/badges";
import { MOCK_USERS } from "../data/users";
import { levelForXp, levelTitle } from "../lib/xp";
import { makeId } from "../lib/utils";

const DEMO_USER_ID = "me";
const DEMO_USER_NAME = "Энхтүшиг";

function iso(daysAgo: number, hour = 12, minute = 0): string {
  const d = new Date("2026-08-15T12:00:00");
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

function initialUser(): DemoUser {
  const quizAttempts: QuizAttempt[] = [
    {
      id: makeId("attempt"),
      quizId: "physics-l1",
      clubId: "physics",
      subject: "physics",
      level: 1,
      score: 5,
      total: 6,
      xpEarned: 40,
      date: iso(6, 19, 20),
    },
    {
      id: makeId("attempt"),
      quizId: "physics-l2",
      clubId: "physics",
      subject: "physics",
      level: 2,
      score: 5,
      total: 6,
      xpEarned: 50,
      date: iso(5, 21, 5),
    },
    {
      id: makeId("attempt"),
      quizId: "biology-l1",
      clubId: "biology",
      subject: "biology",
      level: 1,
      score: 4,
      total: 6,
      xpEarned: 32,
      date: iso(4, 18, 40),
    },
    {
      id: makeId("attempt"),
      quizId: "chemistry-l1",
      clubId: "chemistry",
      subject: "chemistry",
      level: 1,
      score: 5,
      total: 6,
      xpEarned: 40,
      date: iso(2, 20, 15),
    },
    {
      id: makeId("attempt"),
      quizId: "astronomy-l1",
      clubId: "astronomy",
      subject: "astronomy",
      level: 1,
      score: 4,
      total: 6,
      xpEarned: 32,
      date: iso(1, 22, 0),
    },
  ];

  const activity: ActivityItem[] = [
    {
      id: makeId("act"),
      type: "quiz",
      text: "Astronomy Club — Level 1 тестийг 4/6 зөв хариулж +32 XP авлаа",
      date: iso(1, 22, 0),
      icon: "🌌",
    },
    {
      id: makeId("act"),
      type: "badge",
      text: "«Chemistry Rookie» тэмдэг нээлээ",
      date: iso(2, 20, 20),
      icon: "🧪",
    },
    {
      id: makeId("act"),
      type: "quiz",
      text: "Chemistry Club — Level 1 тестийг 5/6 зөв хариулж +40 XP авлаа",
      date: iso(2, 20, 15),
      icon: "🧪",
    },
    {
      id: makeId("act"),
      type: "join",
      text: "Biology Club-д нэгдлээ",
      date: iso(4, 18, 30),
      icon: "🧬",
    },
    {
      id: makeId("act"),
      type: "quiz",
      text: "Biology Club — Level 1 тестийг 4/6 зөв хариулж +32 XP авлаа",
      date: iso(4, 18, 40),
      icon: "🧬",
    },
    {
      id: makeId("act"),
      type: "badge",
      text: "«Physics Explorer» тэмдэг нээлээ — Physics Club Level 7",
      date: iso(5, 21, 10),
      icon: "⚛️",
    },
    {
      id: makeId("act"),
      type: "quiz",
      text: "Physics Club — Level 2 тестийг 5/6 зөв хариулж +50 XP авлаа",
      date: iso(5, 21, 5),
      icon: "⚛️",
    },
    {
      id: makeId("act"),
      type: "quiz",
      text: "Physics Club — Level 1 тестийг 5/6 зөв хариулж +40 XP авлаа",
      date: iso(6, 19, 20),
      icon: "⚛️",
    },
    {
      id: makeId("act"),
      type: "join",
      text: "Physics Club, Chemistry Club-д нэгдлээ",
      date: iso(6, 19, 0),
      icon: "🤝",
    },
  ];

  return {
    id: DEMO_USER_ID,
    name: DEMO_USER_NAME,
    avatarColor: "bg-brand-500",
    subjectXp: {
      physics: 1200,
      biology: 180,
      chemistry: 320,
      astronomy: 90,
      csci: 40,
    },
    joinedClubs: ["physics", "biology", "chemistry"],
    earnedBadges: [
      { badgeId: "first-quiz", earnedAt: iso(6, 19, 20) },
      { badgeId: "quiz-master", earnedAt: iso(1, 22, 0) },
      { badgeId: "physics-explorer", earnedAt: iso(5, 21, 10) },
      { badgeId: "chemistry-rookie", earnedAt: iso(2, 20, 20) },
      { badgeId: "streak-5", earnedAt: iso(0, 8, 0) },
      { badgeId: "community-member", earnedAt: iso(4, 18, 30) },
    ],
    quizAttempts,
    activity,
    streak: 5,
  };
}

export function totalXp(user: DemoUser): number {
  return Object.values(user.subjectXp).reduce((a, b) => a + b, 0);
}

/**
 * Pure helper — NOT a store selector. Combines the mock competitors with the
 * live demo user and sorts by XP. Callers should wrap this in `useMemo`
 * keyed on the user object, since it always returns a fresh array.
 */
export function computeLeaderboard(user: DemoUser): LeaderboardUser[] {
  const mine: LeaderboardUser = {
    id: user.id,
    name: user.name,
    avatarColor: user.avatarColor,
    xp: totalXp(user),
    subjectXp: user.subjectXp,
    level: levelForXp(totalXp(user)),
  };
  return [...MOCK_USERS, mine].sort((a, b) => b.xp - a.xp);
}

interface QuizResult {
  score: number;
  total: number;
  xpEarned: number;
  leveledUp: boolean;
  previousLevel: number;
  newLevel: number;
  newBadges: string[];
}

interface StoreState {
  user: DemoUser;
  posts: Post[];
  challenges: Challenge[];
  lastQuizResult: QuizResult | null;
  pendingBadgePopup: string | null;

  // clubs
  toggleJoinClub: (clubId: string) => void;
  isJoined: (clubId: string) => boolean;

  // posts
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  createPost: (clubId: string, content: string, tag: string) => void;

  // quiz
  submitQuiz: (quiz: Quiz, correctCount: number) => QuizResult;

  // challenges
  runChallenge: (opponentId: string, subject: Subject, level: QuizLevel) => Challenge;

  // misc
  clearBadgePopup: () => void;
  resetDemo: () => void;
}

function evaluateBadges(user: DemoUser, posts: Post[], challenges: Challenge[]): string[] {
  const earnedIds = new Set(user.earnedBadges.map((b) => b.badgeId));
  const newly: string[] = [];

  const consider = (id: string, condition: boolean) => {
    if (condition && !earnedIds.has(id)) newly.push(id);
  };

  consider("first-quiz", user.quizAttempts.length >= 1);
  consider("quiz-master", user.quizAttempts.length >= 5);
  consider(
    "perfect-score",
    user.quizAttempts.some((a) => a.score === a.total)
  );
  consider("physics-explorer", levelForXp(user.subjectXp.physics) >= 7);
  consider(
    "chemistry-rookie",
    user.quizAttempts.some((a) => a.subject === "chemistry")
  );
  consider("streak-5", user.streak >= 5);
  consider(
    "knowledge-sharer",
    posts.some((p) => p.author === user.name)
  );
  consider(
    "astronomer",
    ([1, 2, 3] as const).every((lvl) =>
      user.quizAttempts.some((a) => a.subject === "astronomy" && a.level === lvl)
    )
  );
  consider("community-member", user.joinedClubs.length >= 3);
  consider("challenger", challenges.length >= 1);

  return newly;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      user: initialUser(),
      posts: INITIAL_POSTS,
      challenges: [],
      lastQuizResult: null,
      pendingBadgePopup: null,

      isJoined: (clubId) => get().user.joinedClubs.includes(clubId),

      toggleJoinClub: (clubId) => {
        set((state) => {
          const already = state.user.joinedClubs.includes(clubId);
          const joinedClubs = already
            ? state.user.joinedClubs.filter((c) => c !== clubId)
            : [...state.user.joinedClubs, clubId];

          const activity: ActivityItem[] = already
            ? state.user.activity
            : [
                {
                  id: makeId("act"),
                  type: "join",
                  text: `${clubLabel(clubId)}-д нэгдлээ`,
                  date: new Date().toISOString(),
                  icon: "🤝",
                },
                ...state.user.activity,
              ];

          const userDraft: DemoUser = { ...state.user, joinedClubs, activity };
          const newBadgeIds = evaluateBadges(userDraft, state.posts, state.challenges);
          const earnedBadges = [
            ...userDraft.earnedBadges,
            ...newBadgeIds.map((badgeId) => ({ badgeId, earnedAt: new Date().toISOString() })),
          ];

          return {
            user: { ...userDraft, earnedBadges },
            pendingBadgePopup: newBadgeIds[0] ?? state.pendingBadgePopup,
          };
        });
      },

      likePost: (postId) => {
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === postId
              ? { ...p, likedByMe: !p.likedByMe, likes: p.likes + (p.likedByMe ? -1 : 1) }
              : p
          ),
        }));
      },

      addComment: (postId, content) => {
        if (!content.trim()) return;
        const comment: Comment = {
          id: makeId("comment"),
          author: get().user.name,
          avatarColor: get().user.avatarColor,
          date: new Date().toISOString(),
          content: content.trim(),
        };
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === postId ? { ...p, comments: [...p.comments, comment] } : p
          ),
        }));
      },

      createPost: (clubId, content, tag) => {
        if (!content.trim()) return;
        const post: Post = {
          id: makeId("post"),
          clubId,
          author: get().user.name,
          avatarColor: get().user.avatarColor,
          date: new Date().toISOString(),
          content: content.trim(),
          tag: tag || "Ерөнхий",
          likes: 0,
          likedByMe: false,
          comments: [],
        };
        set((state) => {
          const posts = [post, ...state.posts];
          const activity: ActivityItem[] = [
            {
              id: makeId("act"),
              type: "post",
              text: `${clubLabel(clubId)}-д шинэ нийтлэл нийтэллээ`,
              date: post.date,
              icon: "📚",
            },
            ...state.user.activity,
          ];
          const userDraft: DemoUser = { ...state.user, activity };
          const newBadgeIds = evaluateBadges(userDraft, posts, state.challenges);
          const earnedBadges = [
            ...userDraft.earnedBadges,
            ...newBadgeIds.map((badgeId) => ({ badgeId, earnedAt: new Date().toISOString() })),
          ];
          return {
            posts,
            user: { ...userDraft, earnedBadges },
            pendingBadgePopup: newBadgeIds[0] ?? state.pendingBadgePopup,
          };
        });
      },

      submitQuiz: (quiz, correctCount) => {
        const xpEarned = correctCount * quiz.xpPerQuestion;
        const state = get();
        const previousLevel = levelForXp(totalXp(state.user));

        const attempt: QuizAttempt = {
          id: makeId("attempt"),
          quizId: quiz.id,
          clubId: quiz.clubId,
          subject: quiz.subject,
          level: quiz.level,
          score: correctCount,
          total: quiz.questions.length,
          xpEarned,
          date: new Date().toISOString(),
        };

        const subjectXp = {
          ...state.user.subjectXp,
          [quiz.subject]: state.user.subjectXp[quiz.subject] + xpEarned,
        };

        const activity: ActivityItem[] = [
          {
            id: makeId("act"),
            type: "quiz",
            text: `${clubLabel(quiz.clubId)} — ${quiz.levelLabel.split("—")[0].trim()} тестийг ${correctCount}/${quiz.questions.length} зөв хариулж +${xpEarned} XP авлаа`,
            date: attempt.date,
            icon: clubIcon(quiz.clubId),
          },
          ...state.user.activity,
        ];

        const userDraft: DemoUser = {
          ...state.user,
          subjectXp,
          quizAttempts: [attempt, ...state.user.quizAttempts],
          activity,
        };

        const newLevel = levelForXp(totalXp(userDraft));
        const newBadgeIds = evaluateBadges(userDraft, state.posts, state.challenges);
        const earnedBadges = [
          ...userDraft.earnedBadges,
          ...newBadgeIds.map((badgeId) => ({ badgeId, earnedAt: new Date().toISOString() })),
        ];

        set({
          user: { ...userDraft, earnedBadges },
          pendingBadgePopup: newBadgeIds[0] ?? state.pendingBadgePopup,
        });

        const result: QuizResult = {
          score: correctCount,
          total: quiz.questions.length,
          xpEarned,
          leveledUp: newLevel > previousLevel,
          previousLevel,
          newLevel,
          newBadges: newBadgeIds,
        };
        set({ lastQuizResult: result });
        return result;
      },

      runChallenge: (opponentId, subject, level) => {
        const state = get();
        const opponent = MOCK_USERS.find((u) => u.id === opponentId);
        const opponentName = opponent?.name ?? "Тодорхойгүй өрсөлдөгч";

        const questionCount = 6;
        // Simulated performance: user's own subject mastery nudges the odds,
        // opponent's subject XP nudges theirs. Still randomized for replay value.
        const userMastery = Math.min(0.95, 0.45 + state.user.subjectXp[subject] / 2000);
        const oppMastery = opponent
          ? Math.min(0.95, 0.45 + opponent.subjectXp[subject] / 2000)
          : 0.5;

        const rollScore = (mastery: number) => {
          let correct = 0;
          for (let i = 0; i < questionCount; i++) {
            if (Math.random() < mastery) correct++;
          }
          return correct;
        };

        const myScore = rollScore(userMastery);
        const opponentScore = rollScore(oppMastery);
        const result: Challenge["result"] =
          myScore > opponentScore ? "win" : myScore < opponentScore ? "lose" : "draw";
        const myXp = result === "win" ? 60 : result === "draw" ? 25 : 10;

        const challenge: Challenge = {
          id: makeId("challenge"),
          opponentId,
          opponentName,
          subject,
          level,
          myScore,
          opponentScore,
          myXp,
          result,
          date: new Date().toISOString(),
        };

        set((s) => {
          const subjectXp = {
            ...s.user.subjectXp,
            [subject]: s.user.subjectXp[subject] + myXp,
          };
          const resultLabel =
            result === "win" ? "ялалт 🏆" : result === "lose" ? "хожигдол" : "тэнцээ";
          const activity: ActivityItem[] = [
            {
              id: makeId("act"),
              type: "challenge",
              text: `${opponentName}-тэй ${subjectLabel(subject)}-ийн Challenge хийж ${resultLabel} байгуулж, +${myXp} XP авлаа`,
              date: challenge.date,
              icon: "⚔️",
            },
            ...s.user.activity,
          ];
          const userDraft: DemoUser = { ...s.user, subjectXp, activity };
          const challenges = [challenge, ...s.challenges];
          const newBadgeIds = evaluateBadges(userDraft, s.posts, challenges);
          const earnedBadges = [
            ...userDraft.earnedBadges,
            ...newBadgeIds.map((badgeId) => ({ badgeId, earnedAt: new Date().toISOString() })),
          ];
          return {
            challenges,
            user: { ...userDraft, earnedBadges },
            pendingBadgePopup: newBadgeIds[0] ?? s.pendingBadgePopup,
          };
        });

        return challenge;
      },

      clearBadgePopup: () => set({ pendingBadgePopup: null }),

      resetDemo: () =>
        set({
          user: initialUser(),
          posts: INITIAL_POSTS,
          challenges: [],
          lastQuizResult: null,
          pendingBadgePopup: null,
        }),
    }),
    {
      name: "gejyuve-demo-storage",
      version: 2,
    }
  )
);

function clubLabel(clubId: string): string {
  const map: Record<string, string> = {
    physics: "Physics Club",
    biology: "Biology Club",
    chemistry: "Chemistry Club",
    astronomy: "Astronomy Club",
    csci: "Computer Science Club",
  };
  return map[clubId] ?? clubId;
}

function clubIcon(clubId: string): string {
  const map: Record<string, string> = {
    physics: "⚛️",
    biology: "🧬",
    chemistry: "🧪",
    astronomy: "🌌",
    csci: "💻",
  };
  return map[clubId] ?? "🔬";
}

function subjectLabel(subject: Subject): string {
  const map: Record<Subject, string> = {
    physics: "Physics",
    biology: "Biology",
    chemistry: "Chemistry",
    astronomy: "Astronomy",
    csci: "Computer Science",
  };
  return map[subject];
}

export function badgeById(id: string) {
  return BADGES.find((b) => b.id === id);
}

export { levelTitle };
