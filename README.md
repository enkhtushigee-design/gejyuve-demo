# Гэж Юу Вэ — Клуб · Тест · Тэмцээн (Demo)

Санал болгож буй шинэ боломжуудын ажиллагаатай прототип: **Гэж Юу Вэ**-ийн одоо байгаа платформд нэмж болох 3 санааны демо.

> Энэ бол одоогийн Gej Yu Ve вэбсайтыг орлох буюу дахин зохион бүтээсэн зүйл **биш**. Энэ бол тухайн 3 санааг хэрхэн ажиллах, ямар мэдрэмж төрүүлэхийг харуулах бие даасан, бүрэн ажиллагаатай демо/прототип юм.

**LEARN → SHARE → COMPETE**

1. 🧑‍🤝‍🧑 **Клуб / Community** — Physics, Biology, Chemistry, Astronomy, Computer Science клубуудад нэгдэж, нийтлэл унших/бичих, лайк дарах, сэтгэгдэл бичих.
2. 🧠 **Quiz + Level систем** — Клуб бүрт 3 түвшний (Beginner → Intermediate → Advanced) тест өгч XP цуглуулах, түвшин ахих.
3. 🏆 **Competition / Leaderboard** — Ерөнхий болон сэдэв тус бүрийн тэргүүлэгчдийн самбар, найзтайгаа Challenge хийх.

---

## Суулгах

Node.js 18+ (санал болгох: 20+) шаардлагатай.

```bash
npm install
```

## Ажиллуулах (development)

```bash
npm run dev
```

Терминал дээр гарсан хаягаар (жишээ нь `http://localhost:5173`) хөтчөөр орно.

## Production build

```bash
npm run build
npm run preview
```

`npm run build` нь `tsc -b`-ээр TypeScript-ийг шалгаад, дараа нь Vite-ээр `dist/` фолдерт бэлэн болгоно.

---

## Төслийн бүтэц

```
src/
  types.ts               Бүх TypeScript төрлүүд (Club, Post, Quiz, Badge, DemoUser гэх мэт)
  data/                   Демо өгөгдөл (localStorage-той хамт ашиглагдана)
    clubs.ts              5 клуб + анхны нийтлэлүүд/сэтгэгдлүүд
    quizzes.ts            15 тест (5 клуб × 3 түвшин), нийт 90 асуулт
    badges.ts             10 тэмдэг (badge) тодорхойлолт
    users.ts              Leaderboard/Challenge-д ашиглагдах 12 хиймэл хэрэглэгч
  lib/
    xp.ts                 XP → Level шилжилтийн логик, түвшний нэрс
    utils.ts               cn(), timeAgo(), formatXp(), makeId() гэх мэт туслах функцууд
  store/
    useStore.ts            Zustand store — бүх төлөв, action, localStorage persist
  components/
    Layout.tsx              Дээд навигаци (desktop) + доод tab bar (mobile)
    BadgeUnlockToast.tsx     Шинэ тэмдэг нээгдэх үеийн toast
    ui/                      Card, Button, Avatar, ProgressBar, Tag/XpPill/LevelPill
    clubs/                   PostCard, CreatePostForm
  pages/
    Home.tsx                 Нүүр хуудас — XP тойм, санал болгох клуб/тест, leaderboard teaser
    Clubs.tsx / ClubDetail.tsx   Клубын жагсаалт / клубын дэлгэрэнгүй (feed + quiz таб)
    Quiz.tsx / QuizPlay.tsx  Тестийн төв / интерактив тест өгөх урсгал
    Leaderboard.tsx           Ерөнхий + сэдвээр ангилсан тэргүүлэгчдийн самбар
    Challenges.tsx            Challenge (өрсөлдөгч/сэдэв/түвшин сонгож симуляц хийх)
    Profile.tsx                Хэрэглэгчийн профайл, тэмдэг, идэвх
```

## Технологи

- **React 19 + TypeScript + Vite** — хурдан dev server, HMR
- **Tailwind CSS v4** — дизайны систем (`src/index.css` дотор theme tokens)
- **React Router v7** — навигаци, dynamic routes (`/clubs/:clubId`, `/quiz/:quizId`)
- **Zustand + persist middleware** — глобал төлөв (backend шаардлагагүй), `localStorage`-д автоматаар хадгалагдана
- **lucide-react** — icon set
- **@fontsource/manrope, @fontsource/inter** — локал фонт (интернэт CDN шаардлагагүй)

Ямар ч backend, database ашигласангүй — бүх интерактив харилцан үйлчлэл (join club, like, comment,
create post, quiz score/XP, challenge simulation) хэрэглэгчийн browser дэх Zustand store болон
`localStorage`-д бодитоор хадгалагдаж ажилладаг.

## Гол боломжууд

- **Клуб**: 5 клуб, тус бүрт олон нийтлэл/сэтгэгдэл. Клубт нэгдэх, гарах (toggle), нийтлэл үүсгэх,
  лайк дарах, сэтгэгдэл нэмэх — бүгд шууд UI-д тусгагдана.
- **Quiz**: Клуб бүрт 3 түвшин × 6 асуулт (нийт 90 асуулт), хариулт бүрт зөв/буруу feedback,
  дэвшлийн progress bar, эцсийн онооны дэлгэц дээр XP, level-up, шинэ тэмдгийн мэдэгдэл гарна.
  Дараагийн түвшин нь өмнөх түвшнээ дүүргэсний дараа л нээгддэг (progression lock).
- **XP/Level**: Ерөнхий XP болон сэдэв тус бүрийн (Physics/Biology/Chemistry/Astronomy/CS) XP тусад нь
  хөтлөгдөж, 12 түвшний drop-off progression ашигладаг (`src/lib/xp.ts`).
- **Тэмдэг (Badges)**: 10 тэмдэг, тодорхой нөхцөл хангах үед (жишээ нь анхны тест, 5 тест, 100% оноо,
  Physics Level 7 гэх мэт) автоматаар нээгдэж, toast-оор мэдэгдэнэ.
- **Leaderboard**: Ерөнхий + 5 сэдвийн ангилалтай, амьд өгөгдлөөр эрэмбэлэгдэнэ (демо хэрэглэгчийн XP
  өөрчлөгдөх бүрт байрлал шинэчлэгдэнэ).
- **Challenge**: Өрсөлдөгч, сэдэв, түвшин сонгоод "Challenge эхлүүлэх" дарахад симуляцчилсан үр дүн
  (score, ялалт/хожигдол/тэнцээ, XP шагнал) гардаг.
- **Профайл**: Нийт XP, level, сэдэв тус бүрийн progress bar, тестийн статистик, тэмдгийн grid,
  нэгдсэн клубууд, сүүлийн идэвхийн feed.

## Демог дахин эхлүүлэх

Demo-г "цэвэр" төлөвт буцаах хэрэгтэй бол browser-ийн DevTools Console дотор:

```js
localStorage.removeItem("gejyuve-demo-storage");
location.reload();
```

эсвэл тухайн сайтын `localStorage`-ыг browser Settings-ээс устгана уу.
