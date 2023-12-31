// react
import React from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

// components
import { Forbidden } from "./Forbidden";
import { NotFound } from "./NotFound";
import { Unknown } from "./Unknown";

// apis
import { type RequestError } from "octokit";

interface GlobalErrorBoundaryProps {
  children: React.ReactNode;
}

export function GlobalErrorBoundary({ children }: GlobalErrorBoundaryProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
}

interface ErrorFallbackProps extends FallbackProps {
  error: RequestError;
}

function ErrorFallback({ error }: ErrorFallbackProps) {
  switch (error.status) {
    case 403:
      return <Forbidden error={error} />;

    case 404:
    case 422:
      return <NotFound />;

    default:
      return <Unknown />;
  }
}
