import React, { createContext, useReducer } from "react";
import { AppState } from "./types/store";

type AppContext = {
  state: AppState;
  setState: React.Dispatch<any>;
};

// INITIAL STATE
const initialState: AppState = {
  selectedPosition: undefined,
};

const store = createContext<AppContext>({
  state: initialState,
  setState: () => null,
});

const { Provider } = store;

const StateProvider: React.FC = ({ children }) => {
  const [state, setState] = useReducer((globalState: AppState, newState: Partial<AppState>) => {
    const nextState = { ...globalState, ...newState };
    return nextState;
  }, initialState);

  return <Provider value={{ state, setState }}>{children}</Provider>;
};

export { store, StateProvider, initialState };
