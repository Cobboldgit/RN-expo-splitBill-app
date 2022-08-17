const initialState = {
  userData: null,
  darkMode: true,
  modalVisible: false,
  groupsData: [],
  participants: [],
  selectedPaidBy: null,
  split: null,
  equalSplit: true,
  commentsData: null,
  dataFromEditGroupName: null,
  dataFromAddParticipant: [],
  rateInfo: null,
};

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
    case "SET_SELECTED_PAID_BY":
      return { ...state, selectedPaidBy: payload };
    case "ADD_PARTICIPANT":
      return { ...state, participants: [...state.participants, payload] };
    case "CLEAR_PARTICIPANTS":
      return { ...state, participants: [] };
    case "SET_SPLIT":
      return { ...state, split: payload };
    case "SET_EQUAL_SPLIT":
      return { ...state, equalSplit: payload };
    case "GET_COMMENTS":
      return { ...state, commentsData: payload };
    case "SET_DATAFROMEDITGROUPNAME":
      return { ...state, dataFromEditGroupName: payload };
    case "SET_DATAFROMADDPARTICIPANT":
      return { ...state, dataFromAddParticipant: payload };
    case 'SET_RATEINFO':
      return {...state, rateInfo: payload}
    default:
      return state;
  }
};
