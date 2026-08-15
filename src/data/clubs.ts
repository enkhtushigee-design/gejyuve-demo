import type { Club, Post } from "../types";

export const CLUBS: Club[] = [
  {
    id: "physics",
    name: "Physics Club",
    subject: "physics",
    icon: "⚛️",
    color: "from-indigo-500 to-blue-600",
    tagline: "Орчлон ертөнцийн хууль зүйг хамтдаа нээцгээе",
    description:
      "Классик механикаас квант физик хүртэл — томьёо, туршилт, сониуч асуултуудаа хуваалцах хамтын нийгэмлэг.",
    memberCount: 1842,
  },
  {
    id: "biology",
    name: "Biology Club",
    subject: "biology",
    icon: "🧬",
    color: "from-emerald-500 to-teal-600",
    tagline: "Амьдралын нууцыг эсээс эхлээд экосистем хүртэл судлая",
    description:
      "Эсийн биологи, генетик, эволюци, хүний физиологийн тухай сонирхолтой контент бүхий клуб.",
    memberCount: 1523,
  },
  {
    id: "chemistry",
    name: "Chemistry Club",
    subject: "chemistry",
    icon: "🧪",
    color: "from-fuchsia-500 to-purple-600",
    tagline: "Молекул бүрийн ард нуугдсан химийн шидийг олж мэдье",
    description:
      "Органик болон органик бус хими, урвалын механизм, лабораторийн сонирхолтой туршилтуудыг хэлэлцэнэ.",
    memberCount: 1197,
  },
  {
    id: "astronomy",
    name: "Astronomy Club",
    subject: "astronomy",
    icon: "🌌",
    color: "from-sky-500 to-indigo-700",
    tagline: "Од, гараг, галактикуудын тухай ярилцах орон зай",
    description:
      "Одон орон судлал, сансрын физик, экзопланет судалгаа, телескопын мэдээллийг хуваалцдаг клуб.",
    memberCount: 2104,
  },
  {
    id: "csci",
    name: "Computer Science Club",
    subject: "csci",
    icon: "💻",
    color: "from-amber-500 to-orange-600",
    tagline: "Алгоритмаас хиймэл оюун ухаан хүртэлх аяллыг хамтдаа",
    description:
      "Программчлал, алгоритм, хиймэл оюун ухаан, өгөгдлийн шинжлэх ухааны тухай мэдлэг солилцоно.",
    memberCount: 2687,
  },
];

let idCounter = 1;
function pid() {
  return `post-${idCounter++}`;
}
let cidCounter = 1;
function cid() {
  return `c-${cidCounter++}`;
}

export const INITIAL_POSTS: Post[] = [
  {
    id: pid(),
    clubId: "physics",
    author: "Б. Ганзориг",
    avatarColor: "bg-indigo-500",
    date: "2026-08-12T09:20:00",
    tag: "Квант физик",
    content:
      "Black Hole Information Paradox гэж яг юу вэ? Хар нүх мэдээллийг устгадаг уу, эсвэл хаа нэгтээ хадгалдаг уу? Hawking radiation-той холбоотой энэ зөрчлийг хэн нэгэн энгийнээр тайлбарлаж чадах уу? 🤔",
    likes: 214,
    likedByMe: false,
    comments: [
      {
        id: cid(),
        author: "С. Оюунчимэг",
        avatarColor: "bg-rose-500",
        date: "2026-08-12T10:05:00",
        content:
          "Энэ бол физикийн хамгийн сонирхолтой шийдэгдээгүй асуултуудын нэг! Квант механик мэдээлэл устахгүй гэдэг ч, ерөнхий харьцангуйн онолоор хар нүхэнд унасан бүх зүйл singularity-д дарагдана гэдэг зөрчилдөөнийг илэрхийлдэг.",
      },
      {
        id: cid(),
        author: "Т. Мөнхбат",
        avatarColor: "bg-blue-500",
        date: "2026-08-12T11:30:00",
        content: "Hawking radiation-ы тухай видео хийгээч, GejYuVe! 🔥",
      },
    ],
  },
  {
    id: pid(),
    clubId: "physics",
    author: "Н. Ариунаа",
    avatarColor: "bg-cyan-500",
    date: "2026-08-10T14:00:00",
    tag: "Механик",
    content:
      "Өнөөдөр лабораторт Ньютоны 3-р хуулийг гараар шалгах туршилт хийлээ 🚀 Скейтборд дээр гараад хана түлхэхэд яг тооцоолсон шиг эсрэг чиглэлд хурдассан. Физик амьдралд ажилладаг нь гайхалтай санагдлаа!",
    likes: 156,
    likedByMe: false,
    comments: [
      {
        id: cid(),
        author: "Г. Батжаргал",
        avatarColor: "bg-emerald-500",
        date: "2026-08-10T15:12:00",
        content: "Момент хадгалагдах хууль ажил дээрээ харагдаж байна 👏",
      },
    ],
  },
  {
    id: pid(),
    clubId: "physics",
    author: "Д. Энхжин",
    avatarColor: "bg-violet-500",
    date: "2026-08-08T08:45:00",
    tag: "Термодинамик",
    content:
      "Термодинамикийн 2-р хууль яагаад цаг хугацааны «чиглэлийг» тодорхойлдог вэ? Энтропи үргэлж нэмэгддэг учраас л бид өнгөрсөн рүү биш, ирээдүй рүү явдаг юм биш үү? Санаа бодлоо хуваалцаарай.",
    likes: 98,
    likedByMe: false,
    comments: [],
  },
  {
    id: pid(),
    clubId: "biology",
    author: "О. Сарангэрэл",
    avatarColor: "bg-emerald-500",
    date: "2026-08-13T10:00:00",
    tag: "Генетик",
    content:
      "CRISPR-Cas9 технологи хэрхэн ажилладаг талаар хэн нэгэн энгийнээр тайлбарлаж чадах уу? Энэ технологи ирээдүйд удамшлын өвчнийг эмчлэхэд хэрхэн тусална гэж бодож байна?",
    likes: 187,
    likedByMe: false,
    comments: [
      {
        id: cid(),
        author: "Ж. Түвшинжаргал",
        avatarColor: "bg-teal-500",
        date: "2026-08-13T11:20:00",
        content:
          "Энгийнээр бол — Cas9 уураг нь удирдамж РНХ-ийн тусламжтай ДНХ-ийн тодорхой хэсгийг олж, «хайч» шиг таслана. Дараа нь эсийн засварлах механизм ажилд орно.",
      },
    ],
  },
  {
    id: pid(),
    clubId: "biology",
    author: "Э. Болормаа",
    avatarColor: "bg-lime-600",
    date: "2026-08-11T16:30:00",
    tag: "Экологи",
    content:
      "Монголын говийн бүсийн экосистем сүүлийн 20 жилд уур амьсгалын өөрчлөлтөөс болж хэрхэн өөрчлөгдсөн бэ? Энэ талаар судалгаа уншсан хүн байвал холбоос хуваалцаарай 🌵",
    likes: 132,
    likedByMe: false,
    comments: [],
  },
  {
    id: pid(),
    clubId: "biology",
    author: "П. Наранцэцэг",
    avatarColor: "bg-green-600",
    date: "2026-08-09T13:15:00",
    tag: "Эсийн биологи",
    content:
      "Митохондр яагаад «эсийн эрчим хүчний станц» гэж нэрлэгддэг вэ? ATP синтезийн процессыг сонирхолтойгоор тайлбарласан нийтлэл уншлаа — эндосимбиозын онол үнэхээр гайхалтай!",
    likes: 145,
    likedByMe: false,
    comments: [
      {
        id: cid(),
        author: "Б. Ганзориг",
        avatarColor: "bg-indigo-500",
        date: "2026-08-09T14:00:00",
        content: "Митохондр өөрийн гэсэн ДНХ-тэй байдаг нь эндоситозын нотолгоо шүү дээ 🧬",
      },
    ],
  },
  {
    id: pid(),
    clubId: "chemistry",
    author: "Х. Мөнхзул",
    avatarColor: "bg-fuchsia-500",
    date: "2026-08-13T09:00:00",
    tag: "Органик хими",
    content:
      "Катализатор урвалын хурдыг хэрхэн нэмэгдүүлдэг талаар лабораторийн туршилтын видео хийлээ! Активацийн энергийг бууруулах зарчим үнэхээр энгийн бөгөөд гайхалтай ажилладаг.",
    likes: 176,
    likedByMe: false,
    comments: [],
  },
  {
    id: pid(),
    clubId: "chemistry",
    author: "Ч. Дэлгэрмаа",
    avatarColor: "bg-purple-600",
    date: "2026-08-07T12:00:00",
    tag: "Электрохими",
    content:
      "Литий-ионы батерей яагаад цэнэглэгддэг, ямар химийн процесс явагддаг вэ? Цахилгаан машины батерейн технологийн ирээдүйн талаар ярилцъя.",
    likes: 121,
    likedByMe: false,
    comments: [
      {
        id: cid(),
        author: "Н. Ариунаа",
        avatarColor: "bg-cyan-500",
        date: "2026-08-07T13:30:00",
        content: "Ион литий анод, катодын хооронд шилжихдээ электрон гаргадаг гэж ойлгосон 🔋",
      },
    ],
  },
  {
    id: pid(),
    clubId: "astronomy",
    author: "Г. Батжаргал",
    avatarColor: "bg-sky-500",
    date: "2026-08-14T07:30:00",
    tag: "Экзопланет",
    content:
      "James Webb телескоп саяхан TRAPPIST-1 системийн гараг дээрх агаар мандлын тухай шинэ мэдээлэл олж авлаа гэсэн! Амьдрал байх боломжтой газар олдох магадлал улам бодитой болж байна 🔭✨",
    likes: 298,
    likedByMe: false,
    comments: [
      {
        id: cid(),
        author: "О. Сарангэрэл",
        avatarColor: "bg-emerald-500",
        date: "2026-08-14T08:10:00",
        content: "Энэ мэдээ гайхалтай байна! Хэдэн жилийн дараа дэлгэрэнгүй мэдээлэл гарах бол?",
      },
      {
        id: cid(),
        author: "Х. Мөнхзул",
        avatarColor: "bg-fuchsia-500",
        date: "2026-08-14T09:00:00",
        content: "Spectroscopy-гоор агаар мандлын найрлагыг тодорхойлдог гэдэг нь сонирхолтой юм.",
      },
    ],
  },
  {
    id: pid(),
    clubId: "astronomy",
    author: "Т. Мөнхбат",
    avatarColor: "bg-blue-500",
    date: "2026-08-06T20:00:00",
    tag: "Одон орон",
    content:
      "Өнөө шөнө Улаанбаатараас Персеидийн од дуслыг харах боломжтой гэсэн! Хотоос гарч, гэрлийн бохирдол багатай газраас ажиглавал илүү сайн харагдана. Хэн үзэх вэ? 🌠",
    likes: 167,
    likedByMe: false,
    comments: [],
  },
  {
    id: pid(),
    clubId: "csci",
    author: "Ж. Түвшинжаргал",
    avatarColor: "bg-amber-500",
    date: "2026-08-12T18:00:00",
    tag: "Хиймэл оюун ухаан",
    content:
      "Neural network хэрхэн «сурдаг» вэ? Backpropagation алгоритмыг энгийн жишээгээр тайлбарласан нийтлэл бичлээ — алдааг цаашлуулан тараах зарчим үнэхээр цэгцтэй санагдсан.",
    likes: 203,
    likedByMe: false,
    comments: [
      {
        id: cid(),
        author: "Ч. Дэлгэрмаа",
        avatarColor: "bg-purple-600",
        date: "2026-08-12T19:00:00",
        content: "Gradient descent-ийн тухай дараагийн нийтлэлээ хүлээж байна 👀",
      },
    ],
  },
  {
    id: pid(),
    clubId: "csci",
    author: "П. Наранцэцэг",
    avatarColor: "bg-green-600",
    date: "2026-08-05T11:00:00",
    tag: "Алгоритм",
    content:
      "Big O нотацийг анх сурч байгаа хүмүүст зориулж жишээ бэлдлээ: O(1), O(log n), O(n), O(n²) ялгааг бодит код жишээгээр харуулав. Алгоритмын хурдны талаар ярилцъя!",
    likes: 174,
    likedByMe: false,
    comments: [],
  },
];
