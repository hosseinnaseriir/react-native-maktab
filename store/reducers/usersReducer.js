export const initialUsersState = {
  data: [],
  pending: false,
  rejected: false,
};

function usersReducer(state, { type, payload }) {
  switch (type) {
    case "PENDING_USERS":
      return {
        ...state,
        pending: true,
      };
    case "SUCCESS_USERS":
      return {
        ...state,
        data: payload,
        pending: false,
      };
    case "REJECTED_USERS":
      return {
        ...state,
        rejected: true,
      };
    default:
      return state;
  }
}

export default usersReducer;
