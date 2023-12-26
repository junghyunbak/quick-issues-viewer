// components
import { GlobalStyle } from "./components/GlobalStyle";
import { ReactQueryProvider } from "./components/ReactQueryProvider";
import { Router } from "./components/Router";
import { Header } from "./components/Header";

export function Index() {
  return (
    <ReactQueryProvider>
      <GlobalStyle>
        <Header />

        <Router />
      </GlobalStyle>
    </ReactQueryProvider>
  );
}
