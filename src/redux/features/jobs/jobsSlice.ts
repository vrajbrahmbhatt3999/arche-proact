import { createSlice } from '@reduxjs/toolkit'
import {
  AttachmentsJobsAsyncData,
  DocumentJobsAsyncData,
  GetAllAddResultData,
  LoadFilesAsyncData,
  UpdateLabJobsAsyncData,
  ViewJobsAsyncData,
  createJobsAsyncData,
} from './jobsAsyncActions'
import { ILABS } from '../../../interfaces/apiInterface'

export const initialState: ILABS = {
  isLoading: false,
  createLabJobs: [],
  error: null,
  getSelectesTestData: [],
  getSelectedProfileTestData: [],
  viewJobs: [],
  quantity: 1,
  defaultTest: 'Test',
  allTestData: [],
  getAllLabViewJobsPayload: [],
  documentsData: [],
  attachmentsData: [],
  getAttachmentDataApi: [],
  addText: [],
  addTestText: [],
  LoadFiles: [],
  resultsQunatity: 0,
  updatedViewJobData: [],
  notesData: [],
  showAddResultPopup: false,
  showNotes: false,
  getAllAddResultData: [],
};

export const createLabSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    getTestData: (state, action) => {
      state.getSelectesTestData = [
        ...state?.getSelectesTestData,
        action.payload,
      ]
      const index = state.allTestData.findIndex(
        (i: any) => i._id === action.payload._id
      )
      if (index > -1) {
        state.allTestData.splice(index, 1)
      } else {
        state.allTestData.push(action.payload)
      }
    },
    getProfileTestData: (state, action) => {
      state.getSelectedProfileTestData = [
        ...state?.getSelectedProfileTestData,
        action.payload,
      ]
      const index = state.allTestData.findIndex(
        (i: any) => i._id === action.payload._id
      )
      if (index > -1) {
        state.allTestData.splice(index, 1)
      } else {
        state.allTestData.push(action.payload)
      }
    },

    emptyAllTestData: (state) => {
      state.allTestData = []
      state.addText = []
      state.addTestText = []
    },
    setQuantity: (state, action) => {
      state.quantity = action?.payload?.target?.value
    },
    setDefaultTest: (state, action) => {
      state.defaultTest = action.payload
    },
    updateQuantity: (state, action) => {
      state.getSelectesTestData = action.payload
    },
    setAllTestQuantityData: (state, action) => {
      state.allTestData = action.payload
    },
    getAllLabViewPayloadData: (state, action) => {
      state.getAllLabViewJobsPayload = action.payload
    },
    removeAttachments: (state, action) => {
      const deletedRequest = state.attachmentsData?.filter(
        (item: any) => action.payload?._id !== item?._id
      )
      state.attachmentsData = deletedRequest
    },
    setAddText: (state, action) => {
      const index = state.addText.indexOf(action.payload)
      if (index > -1) {
        state.addText.splice(index, 1)
      } else {
        state.addText.push(action.payload)
      }
    },
    setTestAddText: (state, action) => {
      const index = state.addTestText.indexOf(action.payload)
      if (index > -1) {
        state.addTestText.splice(index, 1)
      } else {
        state.addTestText.push(action.payload)
      }
    },
    updateResultsQunatity: (state, action) => {
      state.resultsQunatity = action.payload
    },
    resetResultQuantity: (state, action) => {
      state.resultsQunatity = action.payload
    },
    setNotesData: (state, action) => {
      state.notesData = action.payload
    },
    setShowAddResultPopup: (state, action) => {
      state.showAddResultPopup = action.payload
    },
    setShowNotes: (state, action) => {
      state.showNotes = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(createJobsAsyncData.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createJobsAsyncData.fulfilled, (state, action) => {
      state.isLoading = false
      state.createLabJobs = action.payload
    })
    builder.addCase(createJobsAsyncData.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })
    builder.addCase(ViewJobsAsyncData.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(ViewJobsAsyncData.fulfilled, (state, action) => {
      state.isLoading = false
      state.viewJobs = action.payload.data ? action.payload.data : []
    })
    builder.addCase(ViewJobsAsyncData.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })
    builder.addCase(UpdateLabJobsAsyncData.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(UpdateLabJobsAsyncData.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(UpdateLabJobsAsyncData.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })
    builder.addCase(DocumentJobsAsyncData.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(DocumentJobsAsyncData.fulfilled, (state, action) => {
      state.isLoading = false
      state.documentsData = action.payload
    })
    builder.addCase(DocumentJobsAsyncData.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })
    builder.addCase(AttachmentsJobsAsyncData.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(AttachmentsJobsAsyncData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getAttachmentDataApi = action.payload ?? [];
    });
    builder.addCase(AttachmentsJobsAsyncData.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })
    builder.addCase(LoadFilesAsyncData.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(LoadFilesAsyncData.fulfilled, (state, action) => {
      state.isLoading = false
      state.LoadFiles = action.payload
    })
    builder.addCase(LoadFilesAsyncData.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });
    builder.addCase(GetAllAddResultData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetAllAddResultData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getAllAddResultData = action.payload;
    });
    builder.addCase(GetAllAddResultData.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });
  },
})

export const {
  getTestData,
  setQuantity,
  setDefaultTest,
  updateQuantity,
  getProfileTestData,
  getAllLabViewPayloadData,
  removeAttachments,
  setAddText,
  setTestAddText,
  setAllTestQuantityData,
  emptyAllTestData,
  resetResultQuantity,
  updateResultsQunatity,
  setNotesData,
  setShowAddResultPopup,
  setShowNotes,
} = createLabSlice.actions

export default createLabSlice.reducer
