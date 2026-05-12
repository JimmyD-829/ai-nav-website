import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import Home from "./pages/Home";
import ShowcaseDetail from "./components/showcase/ShowcaseDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="news" element={<Home />} />
        <Route path="news/:id" element={<Home />} />
        <Route path="tools" element={<Home />} />
        <Route path="updates" element={<Home />} />
        <Route path="showcase/:id" element={<ShowcaseDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
