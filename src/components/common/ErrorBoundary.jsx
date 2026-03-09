import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to console; you could also send to an error tracking service
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught error', error, info);
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-white text-gray-900">
          <div className="max-w-xl text-center">
            <h2 className="text-2xl font-bold mb-2">Something went wrong.</h2>
            <p className="text-sm text-gray-600 mb-4">An unexpected error occurred while rendering this page.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[#1652f0] text-white rounded-md font-medium"
              >
                Reload page
              </button>
              <button
                onClick={this.reset}
                className="px-4 py-2 border rounded-md font-medium"
              >
                Dismiss
              </button>
            </div>
            <pre className="mt-4 text-xs text-left text-gray-500 overflow-x-auto rounded bg-gray-50 p-3">{String(this.state.error)}</pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
