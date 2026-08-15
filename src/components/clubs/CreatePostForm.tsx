import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useStore } from "../../store/useStore";
import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

const SUGGESTED_TAGS = ["Асуулт", "Хэлэлцүүлэг", "Мэдээ", "Судалгаа", "Туршилт"];

export function CreatePostForm({ clubId }: { clubId: string }) {
  const user = useStore((s) => s.user);
  const createPost = useStore((s) => s.createPost);
  const [content, setContent] = useState("");
  const [tag, setTag] = useState(SUGGESTED_TAGS[0]);
  const [posted, setPosted] = useState(false);

  const submit = () => {
    if (!content.trim()) return;
    createPost(clubId, content, tag);
    setContent("");
    setPosted(true);
    setTimeout(() => setPosted(false), 2200);
  };

  return (
    <Card className="p-5">
      <div className="flex items-start gap-3">
        <Avatar name={user.name} colorClass={user.avatarColor} />
        <div className="min-w-0 flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Клубтойгоо юу хуваалцах вэ? Асуулт, мэдээ, санаагаа бичээрэй..."
            rows={3}
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={
                    "rounded-full px-3 py-1 text-xs font-semibold transition-colors " +
                    (tag === t
                      ? "bg-brand-500 text-white"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200")
                  }
                >
                  {t}
                </button>
              ))}
            </div>
            <Button size="sm" onClick={submit} disabled={!content.trim()}>
              <Sparkles className="h-4 w-4" /> Нийтлэх
            </Button>
          </div>
          {posted && (
            <p className="animate-fade-in-up mt-2 text-xs font-semibold text-emerald-600">
              ✓ Нийтлэл амжилттай нэмэгдлээ!
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
