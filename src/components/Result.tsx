import React from "react";
import { useGameDispatcher, useGameState } from "../game-context";
import { FinishedState } from "../types";

const Result = (): JSX.Element => {
  const dispatch = useGameDispatcher();
  const { gameState } = useGameState();
  const { userResults } = gameState as FinishedState;
  const correctAnswers = userResults.filter(
    (result) => result.correctAnswer == result.userAnswered
  ).length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
      <main className="max-w-3xl rounded-xl p-4 border-2 border-black mx-auto">
        <section aria-labelledby="trivia-section">
          <div className="flex gap-8 flex-col items-center text-center">
            <h2
              id="trivia-results-heading"
              className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
            >
              You Scored
            </h2>
            <h2
              id="trivia-score"
              className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
            >
              {correctAnswers} / 10
            </h2>
            {userResults.map((result) => (
              <div
                key={result.questionStatement}
                className="flex items-center gap-4 justify-around max-w-3xl text-2xl text-gray-900"
              >
                <p className="font-bold text-3xl">
                  {result.correctAnswer == result.userAnswered ? "+" : "-"}
                </p>
                <p>{result.questionStatement}</p>
              </div>
            ))}
            <button
              onClick={(): void => {
                dispatch({
                  type: "RESET_GAME",
                  payload: {},
                });
              }}
              className="w-3/4 flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Play Again ?
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Result;
