import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
  FC,
} from "react";
import Home from "./components/Home";
import { gameReducer } from "./reducers/GameReducer";
import { Action, Game } from "./types";

const GameStateContext = createContext<Game | null>(null);
const GameDispatchContext = createContext<React.Dispatch<Action> | null>(null);

const GameProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, {
    gameState: {
      gameStateType: "NOT_STARTED",
    },
    componentToRender: <Home />,
  });

  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};

const useGameState = () => {
  const gameState = useContext(GameStateContext);
  if (gameState == null) {
    throw new Error("useGameState must be used within a GameProvider");
  }
  return gameState;
};

const useGameDispatcher = () => {
  const dispatch = useContext(GameDispatchContext);
  if (dispatch == null) {
    throw new Error("useGameDispatcher must be used within a GameProvider");
  }
  const memoizedDispatch = useCallback(
    (action: Action) => dispatch(action),
    [dispatch]
  );
  return memoizedDispatch;
};

export { GameProvider, useGameState, useGameDispatcher };
