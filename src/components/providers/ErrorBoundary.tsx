import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in lazy loaded route:', error, errorInfo);
  }

  private handleRetry = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="w-16 h-16 bg-[#F0FDF4] rounded-full flex items-center justify-center mb-6 border border-[#BBF7D0]">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2D6A4F] mb-4">
            Oops! Connection Lost
          </h2>
          <p className="text-gray-600 mb-8 max-w-md">
            We had trouble loading this page. This usually happens if your network connection drops briefly or a chunk failed to load.
          </p>
          <button
            onClick={this.handleRetry}
            className="px-8 py-3 bg-[#2D6A4F] text-white rounded-full font-medium hover:bg-[#1B4332] transition-all shadow-[0_4px_14px_rgba(45,106,79,0.39)] hover:shadow-[0_6px_20px_rgba(45,106,79,0.23)] hover:-translate-y-0.5"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
