import { Link, Navigate, useParams } from "react-router-dom";
import {
  FileText,
  MessageSquare,
  SquarePlay,
  Calendar,
  Store,
  Folder,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

const SECTIONS: Record<string, { label: string; icon: typeof FileText; description: string }> = {
  content: {
    label: "Контент",
    icon: FileText,
    description: "Шинжлэх ухааны нийтлэл, судалгаа, мэдээллийн санг агуулсан хэсэг.",
  },
  qna: {
    label: "Асуулт, хариулт",
    icon: MessageSquare,
    description: "Хэрэглэгчид асуулт тавьж, хамтдаа хариулт олох Q&A хэсэг.",
  },
  youtube: {
    label: "YouTube",
    icon: SquarePlay,
    description: "Гэж Юу Вэ-ийн видео контентын сан.",
  },
  event: {
    label: "Эвент",
    icon: Calendar,
    description: "SciCon 2026 болон бусад шинжлэх ухааны арга хэмжээний мэдээлэл.",
  },
  shop: {
    label: "Дэлгүүр",
    icon: Store,
    description: "Шинжлэх ухааны бараа, ном, дурсгалын зүйлсийн онлайн дэлгүүр.",
  },
  category: {
    label: "Ангилал",
    icon: Folder,
    description: "Бүх контентыг сэдвээр нь ангилж үзэх хэсэг.",
  },
  dictionary: {
    label: "Толь бичиг",
    icon: BookOpen,
    description: "Шинжлэх ухааны нэр томьёоны тайлбар толь.",
  },
};

export default function ComingSoon() {
  const { section } = useParams();
  const meta = section ? SECTIONS[section] : undefined;

  if (!meta) return <Navigate to="/" replace />;

  return (
    <div className="mx-auto flex max-w-lg animate-fade-in-up flex-col items-center py-12 text-center">
      <Card className="w-full p-8">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-glow/15 text-teal-700">
          <meta.icon className="h-8 w-8" strokeWidth={1.75} />
        </span>
        <h1 className="mt-5 font-display text-xl font-extrabold text-slate-900">{meta.label}</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{meta.description}</p>
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">
          🚧 Энэ хэсэг одоогийн gejyuve.com сайт дээр аль хэдийн байгаа — энэ демонд оруулаагүй
        </p>
        <Link to="/" className="mt-6 block">
          <Button variant="secondary" className="w-full">
            <ArrowLeft className="h-4 w-4" /> Нүүр хуудас руу буцах
          </Button>
        </Link>
      </Card>
    </div>
  );
}
