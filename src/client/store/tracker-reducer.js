export default (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        is_loading: true
      };
    case "LOAD_LIST":
      return {
        ...state,
        is_loading: false
      };
    case "ADD_EXPENSE":
      return {
        ...state,
        is_loading: false
      };
    case "EDIT_EXPENSE":
      return {
        ...state,
        is_loading: false
      };
    default:
      return state;
  }
};
