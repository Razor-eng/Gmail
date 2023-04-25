import { createSlice } from '@reduxjs/toolkit';

export const mailSlice = createSlice({
  name: 'mail',
  initialState: {
    sendMessageIsOpen: false,
    primary: true,
    social: false,
    promotions: false,
    selectedMessage: null,
  },
  reducers: {
    openSendMessage: (state) => {
      state.sendMessageIsOpen = true;
    },
    closeSendMessage: (state) => {
      state.sendMessageIsOpen = false;
    },
    openPrimary: (state) => {
      state.primary = true;
      state.social = false;
      state.promotions = false;
    },
    openSocial: (state) => {
      state.primary = false;
      state.social = true;
      state.promotions = false;
    },
    openPromotions: (state) => {
      state.primary = false;
      state.social = false;
      state.promotions = true;
    },
    openMessage: (state, action) => {
      state.selectedMessage = action.payload;
    },
  },
});

export const { openSendMessage, closeSendMessage, openPrimary, openSocial, openPromotions, openMessage } = mailSlice.actions;

export const selectSendMessageIsOpen = (state) => state.mail.sendMessageIsOpen;
export const selectPrimary = (state) => state.mail.primary;
export const selectSocial = (state) => state.mail.social;
export const selectPromotions = (state) => state.mail.promotions;
export const selectedMail = (state) => state.mail.selectedMessage;


export default mailSlice.reducer;
