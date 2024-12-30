import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationSliceState {
  message: string;
  type: string;
  isVisible: boolean;
}

const initialState: NotificationSliceState = {
  isVisible: false,
  message: '',
  type: '',
};

export const notificationSlice = createSlice({
  initialState,
  name: 'notification',
  reducers: (create) => ({
    closeNotification: create.reducer((state) => {
      state.isVisible = false;
    }),
    setNotificationMessage: create.reducer((state, action: PayloadAction<string>) => {
      state.message = action.payload;
    }),
    setNotificationType: create.reducer((state, action: PayloadAction<string>) => {
      state.type = action.payload;
    }),
    showNotification: create.reducer((state) => {
      state.isVisible = true;
    }),
  }),
  selectors: {
    selectMessage: (state) => state.message,
    selectType: (state) => state.type,
    selectVisibility: (state) => state.isVisible,
  },
});

export const { setNotificationMessage, setNotificationType, showNotification, closeNotification } =
  notificationSlice.actions;

export const { selectMessage, selectType, selectVisibility } = notificationSlice.selectors;

export default notificationSlice.reducer;
