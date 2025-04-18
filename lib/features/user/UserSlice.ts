import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  _id: string | null;
  fname: string;
  lname: string;
  email: string;
  profileImg: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  _id: null,
  fname: '',
  lname: '',
  email: '',
  profileImg: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<Omit<UserState, 'isAuthenticated'>>) {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    },
    logoutUser(state) {
      return {
        ...initialState,
      };
    },
    deleteUser(state) {
      return {
        ...initialState,
      };
    },
  },
});

export const { loginUser, logoutUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
