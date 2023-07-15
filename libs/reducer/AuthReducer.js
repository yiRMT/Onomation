const initialState = {
  user: null,
  info: {
    groupMembers: {},
  },
  isLoading: true,
  userStatsLoading: true,
  token: null,
  errorMessage: '',
  isProfileStored: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'signIn':
      return { ...state, user: action.payload.user };
    case 'signOut':
      return initialState;
    case 'isLoading':
      return { ...state, isLoading: action.payload.isLoading };
    default:
      return state;
  }
};

export default {
  initialState,
  reducer
};