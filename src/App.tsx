import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import BaseLayout from "./components/Layout";
import { PATH } from "./constants/path";

const HomeAsync = React.lazy(() => import("./pages/Home"));
const AboutAsync = React.lazy(() => import("./pages/About"));
const LeaderboardAsync = React.lazy(() => import("./pages/Leaderboard"));

function App() {
  return (
    <BrowserRouter>
      <BaseLayout>
        <Routes>
          <Route path={PATH.home} element={<HomeAsync />} />
          <Route path={PATH.about} element={<AboutAsync />} />
          <Route path={PATH.leaderBoard} element={<LeaderboardAsync />} />
        </Routes>
      </BaseLayout>
    </BrowserRouter>
  );
}

export default App;
