import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppProvider } from "./state/AppContext";
import Layout from "./components/Layout";
import TopicModule from "./components/TopicModule";
import Home from "./pages/Home";
import Questions from "./pages/Questions";
import Checklist from "./pages/Checklist";

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="topic/:id" element={<TopicModule />} />
            <Route path="questions" element={<Questions />} />
            <Route path="checklist" element={<Checklist />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
