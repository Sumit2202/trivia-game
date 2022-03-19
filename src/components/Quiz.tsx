import React from "react";
import { useGameDispatcher, useGameState } from "../game-context";
import { PlayingState } from "../types";

const Quiz = (): JSX.Element => {
  const dispatch = useGameDispatcher();
  const { gameState } = useGameState();
  const { currentQuestion, questionsToPlay } = gameState as PlayingState;

  const ContinueGame = () => {
    currentQuestion < 10
      ? dispatch({
          type: "MOVE_TO_NEXT_QUESTION",
          payload: {},
        })
      : dispatch({
          type: "END_GAME",
          payload: {},
        });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
      <main className="max-w-3xl rounded-xl p-4 border-2 border-black mx-auto">
        <section aria-labelledby="trivia-section">
          <div className="flex gap-8 flex-col items-center text-center">
            <h2
              id="trivia-question-cateogry"
              className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
            >
              {questionsToPlay[currentQuestion - 1].category}
            </h2>
            <div className="max-w-3xl text-2xl text-gray-900">
              <p>{questionsToPlay[currentQuestion - 1].statement}</p>
            </div>
            <p className="max-w-3xl text-lg text-gray-600">
              {currentQuestion} of 10
            </p>
            <div className="w-3/4 flex gap-4">
              <button
                onClick={(): void => {
                  dispatch({
                    type: "SET_CURRENT_QUESTION_ANSWER",
                    payload: {
                      answer: true,
                    },
                  });
                  ContinueGame();
                }}
                className="w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                True
              </button>
              <button
                onClick={(): void => {
                  dispatch({
                    type: "SET_CURRENT_QUESTION_ANSWER",
                    payload: {
                      answer: false,
                    },
                  });
                  ContinueGame();
                }}
                className="w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                False
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Quiz;
