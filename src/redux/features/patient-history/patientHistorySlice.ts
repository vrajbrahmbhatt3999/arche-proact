import { createSlice } from '@reduxjs/toolkit'
import { IPatientHistory } from '../../../interfaces/apiInterface'
import {
  changePatientDiaogStatus,
  getPatientInformationById,
  getPatientHistoryById,
  getPatientHistoryDiagAttachments,
  getPatientImagesById,
  getPatientAttachmentsById,
  getPatientDiagnosisDetailById,
  getCompareDocumentsById,
  getPatientDentalInformationById,
} from './patientHistoryAsyncActions'

export const initialState: IPatientHistory = {
  isLoading: false,
  patientFormData: {},
  patientHistoryData: [],
  patientHistoryAttachments: [],
  patientDiagnosisDetailData: {},
  patientAttachmentsData: {},
  patientImagesData: {},
  selectedDocForCompare: [],
  patientCompareDocumentsData: [],
}

export const patientHistorySlice = createSlice({
  name: 'patientHistory',
  initialState,
  reducers: {
    clearPatientData: (state) => {
      state.isLoading = false
      state.patientFormData = {}
    },
    clearPatientHistoryData: (state) => {
      state.isLoading = false
      state.patientHistoryData = []
    },
    clearDocData: (state) => {
      state.isLoading = false
      state.patientHistoryAttachments = []
      state.isLoading = false
      state.selectedDocForCompare = []
    },
    clearPatientDiagnosisDetailData: (state) => {
      state.isLoading = false
      state.patientDiagnosisDetailData = {}
    },
    clearPatientAttachmentsData: (state) => {
      state.isLoading = false
      state.patientAttachmentsData = {}
    },
    clearPatientImagesData: (state) => {
      state.isLoading = false
      state.patientImagesData = {}
    },
    clearPatientCompareImagesData: (state) => {
      state.isLoading = false
      state.patientCompareDocumentsData = []
    },
    setPatientHistoryImagesData: (state, action) => {
      state.patientHistoryAttachments = action.payload
    },
    setSelectedImagesData: (state, action) => {
      state.selectedDocForCompare = action.payload
    },
    clearCompareData: (state) => {
      state.selectedDocForCompare = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPatientInformationById.pending, (state) => {
        state.isLoading = true
        state.patientFormData = {}
      })
      .addCase(getPatientInformationById.fulfilled, (state, action) => {
        state.isLoading = false
        state.patientFormData = action.payload
      })
      .addCase(getPatientInformationById.rejected, (state, error) => {
        state.isLoading = false
        state.patientFormData = {}
      })
      .addCase(changePatientDiaogStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(changePatientDiaogStatus.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(changePatientDiaogStatus.rejected, (state, error) => {
        state.isLoading = false
      })
      .addCase(getPatientHistoryById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPatientHistoryById.fulfilled, (state, action) => {
        state.isLoading = false
        state.patientHistoryData = action.payload.data || []
      })
      .addCase(getPatientHistoryById.rejected, (state, error) => {
        state.isLoading = false
        state.patientHistoryData = []
      })
      .addCase(getPatientDiagnosisDetailById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPatientDiagnosisDetailById.fulfilled, (state, action) => {
        state.isLoading = false
        state.patientDiagnosisDetailData = action.payload
      })
      .addCase(getPatientDiagnosisDetailById.rejected, (state, error) => {
        state.isLoading = false
        state.patientDiagnosisDetailData = {}
      })
      .addCase(getPatientAttachmentsById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPatientAttachmentsById.fulfilled, (state, action) => {
        state.isLoading = false
        state.patientAttachmentsData = action.payload
      })
      .addCase(getPatientAttachmentsById.rejected, (state, error) => {
        state.isLoading = false
        state.patientAttachmentsData = {}
      })
      .addCase(getPatientImagesById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPatientImagesById.fulfilled, (state, action) => {
        state.isLoading = false
        state.patientImagesData = action.payload
      })
      .addCase(getPatientImagesById.rejected, (state, error) => {
        state.isLoading = false
        state.patientImagesData = {}
      })
      // all attachments
      .addCase(getPatientHistoryDiagAttachments.pending, (state) => {
        state.isLoading = true
        state.patientHistoryAttachments = []
      })
      .addCase(getPatientHistoryDiagAttachments.fulfilled, (state, action) => {
        state.isLoading = false
        // console.log("patient data for attachments", action.payload);
        state.patientHistoryAttachments = action.payload.data || []
      })
      .addCase(getPatientHistoryDiagAttachments.rejected, (state, error) => {
        state.isLoading = false
        state.patientHistoryAttachments = []
      })
      // get compare documents
      .addCase(getCompareDocumentsById.pending, (state) => {
        state.isLoading = true
        state.patientCompareDocumentsData = []
      })
      .addCase(getCompareDocumentsById.fulfilled, (state, action) => {
        state.isLoading = false
        // console.log("patient data for compare documents", action.payload);
        state.patientCompareDocumentsData = action.payload || []
      })
      .addCase(getCompareDocumentsById.rejected, (state, error) => {
        state.isLoading = false
        state.patientCompareDocumentsData = []
      })
      .addCase(getPatientDentalInformationById.pending, (state) => {
        state.isLoading = true
        state.patientFormData = {}
      })
      .addCase(getPatientDentalInformationById.fulfilled, (state, action) => {
        state.isLoading = false
        state.patientFormData = action.payload
      })
      .addCase(getPatientDentalInformationById.rejected, (state, error) => {
        state.isLoading = false
        state.patientFormData = {}
      })
  },
})

export const {
  clearPatientData,
  clearPatientHistoryData,
  clearPatientDiagnosisDetailData,
  clearPatientAttachmentsData,
  clearPatientImagesData,
  clearDocData,
  setPatientHistoryImagesData,
  setSelectedImagesData,
  clearPatientCompareImagesData,
  clearCompareData,
} = patientHistorySlice.actions
export default patientHistorySlice.reducer
