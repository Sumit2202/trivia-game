import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useEffect } from "react";
import { Question, QuestionFromServer, Tuple10 } from "../types";
import { useGameDispatcher } from "../game-context";

const QUESTIONS_URL =
  "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";

const Home = (): JSX.Element => {
  const dispatch = useGameDispatcher();

  const { isFetching, data, refetch } = useQuery<Tuple10<QuestionFromServer>>(
    "Questions",
    async () => {
      const qsData = await axios.get(QUESTIONS_URL);
      return qsData.data.results;
    },
    {
      enabled: false,
      cacheTime: 0,
      useErrorBoundary: true,
    }
  );

  useEffect(() => {
    if (data) {
      dispatch({
        type: "START_GAME",
        payload: {
          questionsToPlay: data.map(
            ({
              category,
              question: statement,
              correct_answer: correctAnswer,
            }: QuestionFromServer): Question => ({
              category,
              statement,
              correctAnswer: correctAnswer.toLowerCase() === "true",
            })
          ) as Tuple10<Question>,
        },
      });
    }
  }, [data, dispatch]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
      <main className="max-w-3xl rounded-xl p-4 border-2 border-black mx-auto">
        <section aria-labelledby="trivia-section">
          <div className="flex gap-8 flex-col items-center text-center">
            <h2
              id="trivia-heading"
              className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
            >
              Welcome to the Trivia Quiz
            </h2>
            <p className="max-w-3xl text-lg text-gray-600">
              You will be presented with 10 true or false questions. Can you
              score 100%?
            </p>
            <div className="w-3/4 aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
              <img
                src="./gameRoom.png"
                alt="arcade-game-lounge"
                className="w-full h-full object-center object-cover"
              />
            </div>
            <button
              onClick={(): void => {
                refetch();
              }}
              className="w-3/4 flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isFetching ? "Loading ..." : "Start"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
