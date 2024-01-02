// react
import React from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

// components
import { Forbidden } from "./Forbidden";
import { NotFound } from "./NotFound";
import { Unknown } from "./Unknown";

// apis
import { RequestError } from "octokit";
import { AxiosError } from "axios";

interface GlobalErrorBoundaryProps {
  children: React.ReactNode;
}

export function GlobalErrorBoundary({ children }: GlobalErrorBoundaryProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
}

interface ErrorFallbackProps extends FallbackProps {
  error: RequestError | AxiosError;
}

function ErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof RequestError) {
    switch (error.status) {
      case 403:
        return <Forbidden error={error} />;

      case 404:
      case 422:
        return <NotFound />;

      default:
        return <Unknown />;
    }
  } else if (error instanceof AxiosError) {
    return <Unknown />;
  } else {
    return <Unknown />;
  }
}
