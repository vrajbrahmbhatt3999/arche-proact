import { createSlice } from '@reduxjs/toolkit'
import { ITag } from '../../../../interfaces/apiInterface'
import { getAllTag } from './tagAsyncActions'

export const initialState: ITag = {
  loadingTag: false,
  tagData: [],
  error: null,
}

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    setTagData: (state: any, action: any) => {
      const _id = action.payload

      state.tagData = state.tagData.map((item: any) => {
        if (item._id === _id) {
          item = { ...item, assigned: !item.assigned }
        }
        return item
      })
    },
  },
  extraReducers(builder) {
    // GET ALL TAG
    builder.addCase(getAllTag.pending, (state) => {
      state.loadingTag = true
    })
    builder.addCase(getAllTag.fulfilled, (state, action) => {
      state.loadingTag = false
      // console.log("action.payload>>>", action.payload);
      state.tagData = action.payload
    })
    builder.addCase(getAllTag.rejected, (state, error) => {
      state.loadingTag = false
      state.tagData = []
      state.error = error
    })
  },
})

export const { setTagData } = tagSlice.actions
export default tagSlice.reducer
