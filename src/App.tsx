import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import Home from "./pages/Home";
import NewsDetail from "./pages/NewsDetail";
import ShowcaseDetail from "./components/showcase/ShowcaseDetail";
import ToolDetail from "./components/tools/ToolDetail";
import VibeCodingPage from "./pages/VibeCodingPage";
import GitHubTrendingPage from "./pages/GitHubTrendingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="news" element={<Home />} />
        <Route path="news/:id" element={<NewsDetail />} />
        <Route path="tools" element={<Home />} />
        <Route path="tools/:id" element={<ToolDetail />} />
        <Route path="showcase/:id" element={<ShowcaseDetail />} />
        <Route path="vibecoding" element={<VibeCodingPage />} />
        <Route path="github-trending" element={<GitHubTrendingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
