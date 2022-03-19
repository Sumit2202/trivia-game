import React from "react";
import Home from "../components/Home";
import Quiz from "../components/Quiz";
import Result from "../components/Result";
import {
  Action,
  CurrentQuestion,
  FinishedState,
  Game,
  NotStartedState,
  PlayingState,
  Question,
  Tuple10,
  UserAnswer,
  UserResult,
} from "../types";
import { isGameStateNotStarted, isGameStatePlaying } from "../utils";

const questionToUserAnswerMapper = ({
  statement,
  category,
  correctAnswer,
}: Question): UserAnswer => ({
  question: {
    statement,
    category,
    correctAnswer,
  },
  answer: null,
});

const userAnswerToUserResultMapper = (userAnswer: UserAnswer): UserResult => ({
  questionStatement: userAnswer.question.statement,
  correctAnswer: userAnswer.question.correctAnswer,
  userAnswered: userAnswer.answer || false,
});

export const gameReducer = (state: Game, { type, payload }: Action): Game => {
  switch (type) {
    case "START_GAME":
      if (isGameStateNotStarted(state.gameState)) {
        const playingState: PlayingState = {
          gameStateType: "PLAYING",
          currentQuestion: 1,
          questionsToPlay: payload.questionsToPlay,
          userAnswers: payload.questionsToPlay.map(
            questionToUserAnswerMapper
          ) as Tuple10<UserAnswer>,
        };
        return { gameState: playingState, componentToRender: <Quiz /> };
      }
      break;
    case "SET_CURRENT_QUESTION_ANSWER":
      if (isGameStatePlaying(state.gameState)) {
        const { currentQuestion, userAnswers } = state.gameState;
        const newUserAnswers: Tuple10<UserAnswer> = [...userAnswers];

        // update the user answer for the current question
        newUserAnswers[currentQuestion - 1].answer = payload.answer;
        return {
          ...state,
          gameState: {
            ...state.gameState,
            userAnswers: newUserAnswers,
          },
        };
      }
      break;
    case "MOVE_TO_NEXT_QUESTION":
      if (isGameStatePlaying(state.gameState)) {
        const { currentQuestion } = state.gameState;

        const newGameState = {
          ...state.gameState,
          currentQuestion: (currentQuestion + 1) as CurrentQuestion,
        };

        return { ...state, gameState: newGameState };
      }
      break;
    case "END_GAME":
      if (isGameStatePlaying(state.gameState)) {
        const { userAnswers } = state.gameState;

        const newGameState: FinishedState = {
          gameStateType: "FINISHED",
          userResults: userAnswers.map(
            userAnswerToUserResultMapper
          ) as Tuple10<UserResult>,
        };

        return { gameState: newGameState, componentToRender: <Result /> };
      }
      break;
    case "RESET_GAME": {
      const newGameState: NotStartedState = { gameStateType: "NOT_STARTED" };
      return {
        gameState: newGameState,
        componentToRender: <Home />,
      };
    }
  }
  throw new Error("UNKNOWN_ACTION");
};
