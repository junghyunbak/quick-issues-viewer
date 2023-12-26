// react
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// constants
import { githubRepo } from "@/constants";

// components
import { NotFound } from "@/pages/NotFound";
import { Main } from "@/pages/Main";
import { GlobalStyle } from "./components/GlobalStyle";
import { ReactQueryProvider } from "./components/ReactQueryProvider";

export function Index() {
  return (
    <ReactQueryProvider>
      <GlobalStyle>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  replace
                  to={`/${githubRepo.DEFAULT_REPO_OWNER}/${githubRepo.DEFAULT_REPO_NAME}`}
                />
              }
            />
            <Route path="/:owner/:repo" element={<Main />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </GlobalStyle>
    </ReactQueryProvider>
  );
}
