// components
import { GlobalStyle } from "./components/GlobalStyle";
import { ReactQueryProvider } from "./components/ReactQueryProvider";
import { Router } from "./components/Router";

export function Index() {
  return (
    <ReactQueryProvider>
      <GlobalStyle>
        <Router />
      </GlobalStyle>
    </ReactQueryProvider>
  );
}
