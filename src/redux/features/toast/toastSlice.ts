import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { success } from '../../../constants/data'

interface ToastState {
  message: string
  toolTipMessage?: string
  type: typeof success
}

export const initialState: ToastState = {
  message: '',
  toolTipMessage: '',
  type: success,
}

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<ToastState>) => {
      state.message = action.payload.message
      state.type = action.payload.type
    },
    clearMessage: (state) => {
      state.message = ''
      state.type = success
    },
    setToolTipMessage: (state, action) => {
      state.toolTipMessage = action.payload
    },
    clearToolTipMessage: (state) => {
      state.toolTipMessage = ''
    },
  },
})

export const {
  setMessage,
  clearMessage,
  setToolTipMessage,
  clearToolTipMessage,
} = toastSlice.actions

export default toastSlice.reducer
