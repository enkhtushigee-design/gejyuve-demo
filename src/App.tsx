import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Clubs from "./pages/Clubs";
import ClubDetail from "./pages/ClubDetail";
import Quiz from "./pages/Quiz";
import QuizPlay from "./pages/QuizPlay";
import Leaderboard from "./pages/Leaderboard";
import Challenges from "./pages/Challenges";
import Profile from "./pages/Profile";
import ComingSoon from "./pages/ComingSoon";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="clubs" element={<Clubs />} />
        <Route path="clubs/:clubId" element={<ClubDetail />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="quiz/:quizId" element={<QuizPlay />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="challenges" element={<Challenges />} />
        <Route path="profile" element={<Profile />} />
        <Route path="coming-soon/:section" element={<ComingSoon />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
