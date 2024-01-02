// react
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// constants
import { defaultValue } from "@/constants";

// components
import { NotFound } from "@/pages/NotFound";
import { Main } from "@/pages/Main";
import { GlobalStyle } from "./components/GlobalStyle";
import { ReactQueryProvider } from "./components/ReactQueryProvider";
import { GlobalErrorBoundary } from "./components/GlobalErrorBoundary";
import { OctokitProvider } from "./components/OctokitProvider";
import { Login } from "./Login";

export function Index() {
  return (
    <ReactQueryProvider>
      <GlobalStyle>
        <GlobalErrorBoundary>
          <OctokitProvider>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Navigate
                      replace
                      to={`/${defaultValue.DEFAULT_REPO_OWNER}/${defaultValue.DEFAULT_REPO_NAME}`}
                    />
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/:owner/:repo" element={<Main />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </OctokitProvider>
        </GlobalErrorBoundary>
      </GlobalStyle>
    </ReactQueryProvider>
  );
}
