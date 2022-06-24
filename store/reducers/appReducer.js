const initialState = {
  userData: null,
  groupsData: [],
  darkMode: true,
  modalVisible: false,
  // selectedImage: null
};

console.log("initialState", initialState.groupsData);

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_USER_DATA":
      return { ...state, userData: payload };
    case "GET_USER_GROUPS":
      return { ...state, groupsData: payload };
    case "DARK_MODE":
      return { ...state, darkMode: payload };
    case "SET_SHOW_MODAL":
      return { ...state, modalVisible: payload };
    // case "SET_SELECTED_IMAGE":
    // return { ...state, selectedImage: payload };
    default:
      return state;
  }
};
