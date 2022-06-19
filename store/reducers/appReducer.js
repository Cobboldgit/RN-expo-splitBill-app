const initialState = {
    darkMode: true
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "DARK_MODE":
      return { ...state, darkMode: payload };

    default:
      return state;
  }
};
