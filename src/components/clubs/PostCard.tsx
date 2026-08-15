import { useState } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";
import type { Post } from "../../types";
import { useStore } from "../../store/useStore";
import { Avatar } from "../ui/Avatar";
import { Tag } from "../ui/Tag";
import { Card } from "../ui/Card";
import { cn, timeAgo } from "../../lib/utils";

export function PostCard({ post }: { post: Post }) {
  const likePost = useStore((s) => s.likePost);
  const addComment = useStore((s) => s.addComment);
  const [showComments, setShowComments] = useState(false);
  const [draft, setDraft] = useState("");

  const submitComment = () => {
    if (!draft.trim()) return;
    addComment(post.id, draft);
    setDraft("");
    setShowComments(true);
  };

  return (
    <Card className="animate-fade-in-up p-5">
      <div className="flex items-start gap-3">
        <Avatar name={post.author} colorClass={post.avatarColor} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="font-display text-sm font-bold text-slate-900">{post.author}</p>
            <span className="text-xs text-slate-400">· {timeAgo(post.date)}</span>
          </div>
          <Tag className="mt-1">{post.tag}</Tag>
        </div>
      </div>

      <p className="mt-3.5 whitespace-pre-wrap text-[15px] leading-relaxed text-slate-700">
        {post.content}
      </p>

      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
        <button
          onClick={() => likePost(post.id)}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors",
            post.likedByMe
              ? "bg-rose-50 text-rose-600"
              : "text-slate-500 hover:bg-slate-100 hover:text-rose-500"
          )}
        >
          <Heart className={cn("h-4 w-4", post.likedByMe && "fill-rose-500 text-rose-500")} />
          {post.likes}
        </button>
        <button
          onClick={() => setShowComments((v) => !v)}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-500 hover:bg-slate-100 hover:text-brand-600"
        >
          <MessageCircle className="h-4 w-4" />
          {post.comments.length}
        </button>
      </div>

      {showComments && (
        <div className="mt-3 space-y-3 border-t border-slate-100 pt-3">
          {post.comments.map((c) => (
            <div key={c.id} className="flex items-start gap-2.5">
              <Avatar name={c.author} colorClass={c.avatarColor} size="sm" />
              <div className="min-w-0 flex-1 rounded-xl bg-slate-50 px-3 py-2">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-slate-800">{c.author}</p>
                  <span className="text-[11px] text-slate-400">{timeAgo(c.date)}</span>
                </div>
                <p className="mt-0.5 text-sm text-slate-600">{c.content}</p>
              </div>
            </div>
          ))}
          {post.comments.length === 0 && (
            <p className="text-sm text-slate-400">Одоогоор сэтгэгдэл алга. Эхнийхийг бичих үү?</p>
          )}
          <div className="flex items-center gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitComment()}
              placeholder="Сэтгэгдэл бичих..."
              className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
            <button
              onClick={submitComment}
              disabled={!draft.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-600 disabled:opacity-40"
              aria-label="Илгээх"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
