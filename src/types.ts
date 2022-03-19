import { EmptyObject, Tuple } from "./utils";

// State Types
export type Game = {
  gameState: GameState;
  componentToRender: JSX.Element;
};

export type GameState =
  | NotStartedState
  | PlayingState
  | FinishedState
  | ErrorState;

export type NotStartedState = {
  gameStateType: "NOT_STARTED";
};

export type CurrentQuestion = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type PlayingState = {
  gameStateType: "PLAYING";
  currentQuestion: CurrentQuestion;
  questionsToPlay: Tuple10<Question>;
  userAnswers: Tuple10<UserAnswer>;
};

export type FinishedState = {
  gameStateType: "FINISHED";
  userResults: Tuple10<UserResult>;
};

export type ErrorState = {
  gameStateType: "ERROR";
  error: string;
};

export type UserAnswer = {
  question: Question;
  answer: boolean | YetToBeAnswered;
};

export type QuestionFromServer = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: [string];
  question: string;
  type: string;
};

export type Question = {
  category: string;
  statement: string;
  correctAnswer: boolean;
};

export type UserResult = {
  questionStatement: string;
  correctAnswer: boolean;
  userAnswered: boolean;
};

export type ComponentToRender = string;

export type Tuple10<T> = Tuple<T, 10>;

type YetToBeAnswered = null;

// Reducer Action Types
export type Action =
  | StartGame
  | SetCurrentQuestionAnswer
  | MoveToNextQuestion
  | EndGame
  | ResetGame;

type StartGame = {
  type: "START_GAME";
  payload: {
    questionsToPlay: Tuple10<Question>;
  };
};

type SetCurrentQuestionAnswer = {
  type: "SET_CURRENT_QUESTION_ANSWER";
  payload: {
    answer: boolean;
  };
};

type MoveToNextQuestion = {
  type: "MOVE_TO_NEXT_QUESTION";
  payload: EmptyObject;
};

type EndGame = {
  type: "END_GAME";
  payload: EmptyObject;
};

type ResetGame = {
  type: "RESET_GAME";
  payload: EmptyObject;
};
