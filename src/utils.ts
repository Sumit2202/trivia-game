import {
  ErrorState,
  FinishedState,
  GameState,
  NotStartedState,
  PlayingState,
} from "./types";

export type Tuple<
  T,
  N extends number,
  R extends unknown[] = []
> = R["length"] extends N ? R : Tuple<T, N, [T, ...R]>;

export type EmptyObject = Record<any, never>;

export const isGameStatePlaying = (
  gameState: GameState
): gameState is PlayingState => gameState.gameStateType === "PLAYING";

export const isGameStateFinished = (
  gameState: GameState
): gameState is FinishedState => gameState.gameStateType === "FINISHED";

export const isGameStateNotStarted = (
  gameState: GameState
): gameState is NotStartedState => gameState.gameStateType === "NOT_STARTED";

export const isGameStateError = (
  gameState: GameState
): gameState is ErrorState => gameState.gameStateType === "ERROR";
