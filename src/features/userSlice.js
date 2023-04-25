import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: null,
    sent: false,
    inbox: true,
  },
  reducers: {
    signin: (state, action) => {
      state.value = action.payload;
    },
    signout: (state) => {
      state.value = false;
    },
    sentTrue: (state) => {
      state.sent = true;
      state.inbox = false;
    },
    inboxTrue: (state) => {
      state.inbox = true;
      state.sent = false;
    },
    restTrue: (state) => {
      state.inbox = false;
      state.sent = false;
    },
  },
});

export const { signin, signout, sentTrue, inboxTrue, restTrue } = userSlice.actions;

export const selectUser = (state) => state.user.value;
export const selectSent = (state) => state.user.sent;
export const selectInbox = (state) => state.user.inbox;

export default userSlice.reducer;
