import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// interface ChatState {
//   messageCount: number
//   headerMessageCount: number
// }

export const initialState = {
  messageCount: 0,
  headerMessageCount: 0,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessageCount: (state, action) => {
      state.messageCount = action.payload
    },
    setHeaderMessageCount: (state, action) => {
      state.headerMessageCount = action.payload
    },
    decreaseMessageCount: (state) => {
      // state.messageCount -= 1
    },
    decreaseHeaderMessageCount: (state) => {
      // state.headerMessageCount -= 1
    },
  },
})
export const { decreaseMessageCount } = chatSlice.actions
export default chatSlice.reducer
