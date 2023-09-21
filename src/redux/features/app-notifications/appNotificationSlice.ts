import { createSlice } from '@reduxjs/toolkit'
import { IAppNotification } from '../../../interfaces/apiInterface'
import {
  createAppNotification,
  getAllNotificationList,
  markReadNotification,
} from './appNotificationAsyncActions'
import { getDeviceTokenStore } from '../appointment/appointmentAsyncActions'

export const initialState: IAppNotification = {
  isLoading: false,
  notificationListData: [],
  // getNotificationList: [],
  error: null,
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    // addNotification: (state: any, action: any) => {
    //   // state.notificationCount++;
    //   state.getNotificationList.push(action.payload?.notifications);
    // },
  },
  extraReducers: (builder) => {
    // Get All App Notification
    builder.addCase(getAllNotificationList.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllNotificationList.fulfilled, (state, action) => {
      state.isLoading = false
      state.notificationListData = action.payload
      // state.getNotificationList = action.payload?.notifications;
    })
    builder.addCase(getAllNotificationList.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // Create App Notification
    builder.addCase(createAppNotification.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createAppNotification.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(createAppNotification.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // get Device token App Notification
    builder.addCase(getDeviceTokenStore.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getDeviceTokenStore.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(getDeviceTokenStore.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // mark read App Notification
    builder.addCase(markReadNotification.pending, (state) => {
      state.isLoading = false
    })
    builder.addCase(markReadNotification.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(markReadNotification.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })
  },
})

// export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer
