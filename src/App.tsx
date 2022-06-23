import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import BaseLayout from "./components/Layout";
import { PATH, PATHNAME } from "./constants/path";

const HomeAsync = React.lazy(() => import("./pages/Home"));
const AboutAsync = React.lazy(() => import("./pages/About"));
const LeaderboardAsync = React.lazy(() => import("./pages/Leaderboard"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading...</div>}>
        <BaseLayout>
          <Routes>
            <Route path={PATH[PATHNAME.home]} element={<HomeAsync />} />
            <Route path={PATH[PATHNAME.about]} element={<AboutAsync />} />
            <Route
              path={PATH[PATHNAME.leaderBoard]}
              element={<LeaderboardAsync />}
            />
          </Routes>
        </BaseLayout>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
