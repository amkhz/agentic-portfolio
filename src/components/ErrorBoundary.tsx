import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  /** Rendered in place of the subtree once it has thrown. */
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  failed: boolean;
}

/**
 * The repo's only error boundary, and the reason it exists: React
 * unmounts the whole tree when a render or commit throws with nothing to
 * catch it, so one fault inside a heavy imperative piece (WebGL hosts,
 * GSAP timelines, audio graphs) takes the entire page to blank white.
 *
 * A class is not a style choice here. getDerivedStateFromError and
 * componentDidCatch have no hook equivalent in React 19; this is the
 * only construct that can catch.
 *
 * There is no reset method by design. Recovery is a remount, so callers
 * change the boundary's key: a subtree that failed while holding
 * imperative state has to be built from nothing, not re-rendered.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // The visitor gets the card; the console keeps the stack, which is
    // the only trace a client-rendered fault leaves behind.
    console.error("Caught by ErrorBoundary:", error, info.componentStack);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
