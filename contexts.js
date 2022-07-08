import { createContext, useReducer } from "react";
import couterReducer from "./store/reducers/counterReducer";
import usersReducer, { initialUsersState } from "./store/reducers/usersReducer";

export const contexts = createContext();

const ContextsProvider = (props) => {
  // state
  const [usersState, dispatchState] = useReducer(
    usersReducer,
    initialUsersState
  );

  const [counter, dispatchCounter] = useReducer(couterReducer, 10);

  return (
    <contexts.Provider
      value={{
        usersState,
        dispatchState,
        counter,
        dispatchCounter,
      }}
    >
      {props.children}
    </contexts.Provider>
  );
};
export default ContextsProvider;
