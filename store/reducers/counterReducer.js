import { counterActions } from "../actions/counterActions";

// reducer
export default function couterReducer(state, { type, payload }) {
  switch (type) {
    case counterActions.inc:
      return state + (payload || 1);
    case counterActions.dec:
      return state - (payload || 1);
    default:
      return state;
  }
}
