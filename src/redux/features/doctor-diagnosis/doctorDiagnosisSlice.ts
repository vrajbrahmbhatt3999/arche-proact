import { createSlice } from '@reduxjs/toolkit'
import { IDoctorDiagnosis } from '../../../interfaces/apiInterface'
import {
  createDiagnosis,
  getDiagnosisAllTags,
  getDiagnosisSearchTags,
  updateDiagnosis,
} from './doctorDiagnosisAsyncActions'

export const initialState: IDoctorDiagnosis = {
  isLoading: false,
  scribeImagesArr: [],
  scribeImagesData: [],
  scribeNotesArr: [],
  scribeNotesData: [],
  error: null,
  diagnosisSearchTagData: [],
  createdDiagnosisId: '',
  updateScribeImgArr: [],
  updateScribeNotesArr: [],
  allTagDataList: [],
}

export const doctorDiagnosisSlice = createSlice({
  name: 'doctorDiagnosis',
  initialState,
  reducers: {
    addScribeData: (state, action) => {
      console.log(
        'scribes length',
        state.scribeImagesArr.length,
        state.scribeNotesArr.length
      )
      if (action.payload.isScribeImage) {
        if (state.scribeImagesArr.length < 3) {
          state.scribeImagesArr = [
            ...state.scribeImagesArr,
            { ...action.payload },
          ]
        }
      } else {
        if (state.scribeNotesArr.length < 3) {
          state.scribeNotesArr = [
            ...state.scribeNotesArr,
            { ...action.payload },
          ]
        }
      }
    },
    updateScribeData: (state, action) => {
      console.log(
        'scribes length',
        state.scribeImagesArr.length,
        state.scribeNotesArr.length
      )
      if (action.payload.isScribeImage) {
        if (state.updateScribeImgArr.length < 3) {
          // state.scribeImagesArr = [
          //   ...state.scribeImagesArr,
          //   { ...action.payload },
          // ]
          state.updateScribeImgArr = [
            ...state.updateScribeImgArr,
            { ...action.payload },
          ]
        }
      } else {
        if (state.updateScribeNotesArr.length < 3) {
          // state.scribeNotesArr = [
          //   ...state.scribeNotesArr,
          //   { ...action.payload },
          // ]
          state.updateScribeNotesArr = [
            ...state.updateScribeNotesArr,
            { ...action.payload },
          ]
        }
      }
    },
    createScribesNotesAtEdit: (state, action) => {
      state.scribeNotesArr = action.payload
    },
    createScribesImagesAtEdit: (state, action) => {
      state.scribeImagesArr = action.payload
    },
    removeScribeNotesData: (state, action) => {
      const newScribeNotesArr = state.scribeNotesArr.filter((element: any) => {
        return element.id !== action.payload.id
      })
      state.scribeNotesArr = newScribeNotesArr
    },
    removeScribeImagesData: (state, action) => {
      const newScribeImagesArr = state.scribeImagesArr.filter(
        (element: any) => {
          return element.id !== action.payload.id
        }
      )
      state.scribeImagesArr = newScribeImagesArr
    },
    clearDiagnosisId: (state) => {
      state.createdDiagnosisId = ''
    },
    clearScricedata: (state) => {
      state.scribeImagesArr = []
      state.scribeNotesArr = []
      state.updateScribeImgArr = []
      state.updateScribeNotesArr = []
    },
  },
  extraReducers: (builder) => {
    // createDiagnosis
    builder
      .addCase(createDiagnosis.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createDiagnosis.fulfilled, (state, action) => {
        state.isLoading = false
        state.createdDiagnosisId = action.payload?.diagnosis_id || ''
      })
      .addCase(createDiagnosis.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })

    // updateDiagnosis
    builder
      .addCase(updateDiagnosis.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateDiagnosis.fulfilled, (state, action) => {
        state.isLoading = false
        state.createdDiagnosisId = action.payload?.diagnosis_id || ''
      })
      .addCase(updateDiagnosis.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })

    // getDiagnosisSearchTag
    builder
      .addCase(getDiagnosisSearchTags.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(getDiagnosisSearchTags.fulfilled, (state, action) => {
        state.isLoading = false
        state.diagnosisSearchTagData = action.payload
      })
      .addCase(getDiagnosisSearchTags.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })
    // get All Diagnosis Tag
    builder
      .addCase(getDiagnosisAllTags.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(getDiagnosisAllTags.fulfilled, (state, action) => {
        state.isLoading = false
        state.allTagDataList = action.payload
      })
      .addCase(getDiagnosisAllTags.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })
  },
})

export const {
  addScribeData,
  removeScribeNotesData,
  removeScribeImagesData,
  createScribesNotesAtEdit,
  createScribesImagesAtEdit,
  clearDiagnosisId,
  clearScricedata,
  updateScribeData,
} = doctorDiagnosisSlice.actions

export default doctorDiagnosisSlice.reducer
