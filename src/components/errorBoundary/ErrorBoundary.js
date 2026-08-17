import React from 'react';
import './errorBoundary.css';
function isChunkLoadError(error) {
  return (
    error?.name === 'ChunkLoadError' ||
    /loading chunk .* failed/i.test(error?.message || '')
  );
}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // console.log(error, errorInfo);
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (isChunkLoadError(this.state.error)) {
        return (
          <div className="error-boundary-fallback">
            <p>
              Couldn't load part of the app. This usually happens after a
              dropped connection or a new update.
            </p>
            <button type="button" onClick={() => window.location.reload()}>
              Reload page
            </button>
          </div>
        );
      }
      return (
        <div className="error-boundary-fallback">
          <p>Something went wrong. Please try reloading the page.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
