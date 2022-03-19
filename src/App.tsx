import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useGameDispatcher, useGameState } from "./game-context";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient();

function ErrorFallback({ resetErrorBoundary }: any) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
      <main className="max-w-3xl rounded-xl p-4 border-2 border-black mx-auto">
        <div className="sm:ml-6">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Oops! Something Went Wrong, Please Try Again.
          </h1>
          <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
            <button
              onClick={resetErrorBoundary}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go back home screen
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  const state = useGameState();
  const dispatch = useGameDispatcher();
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          dispatch({
            type: "RESET_GAME",
            payload: {},
          });
        }}
      >
        {state.componentToRender}
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
