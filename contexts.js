import { createContext } from "react";
export const contexts = createContext();

const ContextsProvider = (props) => {
  return <contexts.Provider>{props.children}</contexts.Provider>;
};
