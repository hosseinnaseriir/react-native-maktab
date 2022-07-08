export function dispatchUsersMiddleware(dispatch) {
  return async function (action) {
    switch (action.type) {
      case "LOAD_DATA":
        try {
          const res = await fetch("https://api.github.com/users");
          const json = await res.json();
          dispatch({ type: "SUCCESS_USERS", payload: json });
        } catch (err) {
          dispatch({ type: "REJECTED_USERS", payload: err });
        }
        break;
      default:
        dispatch(action);
        break;
    }
  };
}
