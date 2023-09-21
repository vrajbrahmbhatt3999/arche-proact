import { createSlice } from '@reduxjs/toolkit'
import { IDentistDiagnosis } from '../../../interfaces/apiInterface'
import {
  createDentalDiagnosisAction,
  getDentalDiagnosisByIdAction,
  getDiagnosisAllTags,
  getDiagnosisSearchTags,
  updateDentalDiagnosisAction,
  getAllTooths,
  getAllDentalTreatmentServices,
  getAllDentalTreatmentServicesByParentId,
  addDiagnosisDocument,
  addDiagnosisImg,
  addPatientPrescription,
  findMedicine,
  getAllDiagnosisScribeImage,
  getAllDiagnosisScribeNote,
  getAllMedicine,
  getAllMedicineCategory,
  getAllPatientHistory,
  getPatientMedicine,
  getTaggedPatientFilterList,
  getTaggedPatientList,
  markStage,
  patientDiagnosisById,
} from './dentistDiagnosisAsyncActions'

export const initialState: IDentistDiagnosis = {
  isLoading: false,
  scribeImagesArr: [],
  scribeImagesData: [],
  scribeNotesArr: [],
  scribeNotesData: [],
  error: null,
  diagnosisDetails: {},
  diagnosisSearchTagData: [],
  createdDiagnosisId: '',
  updateScribeImgArr: [],
  updateScribeNotesArr: [],
  allTagDataList: [],
  services: [],
  child_services: [],
  tooths: [],
  formdata: {},
  diagnosis_treatments: [],
  medicineCategory: [],
  medicineData: [],
  medicineCompositionData: [],
  patientDiagnosisDataObject: {},
  patientDiagnosisInfo: {},
  diagnosisImageInfo: {},
  diagnosisDocInfo: {},
  diagnosisScribeNotesData: [],
  diagnosisScribeImagesData: [],
  patientHistoryData: [],
  patientMedicineData: [],
  markStageInfo: {},
  taggedPatientListData: [],
  taggedPatientFilterListData: [],
  taggedPatientListDataObject: {},
}

export const dentistDiagnosisSlice = createSlice({
  name: 'dentistDiagnosis',
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
          state.updateScribeImgArr = [
            ...state.updateScribeImgArr,
            { ...action.payload },
          ]
        }
      } else {
        if (state.updateScribeNotesArr.length < 3) {
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

    addDiagnosisTreatmentsData: (state, action) => {
      console.log('diagnosis_treatments length', action.payload)
      state.diagnosis_treatments = [
        ...state.diagnosis_treatments,
        action.payload,
      ]
    },
    updateDiagnosisTreatmentsData: (state, action) => {
      console.log(
        'diagnosis_treatments length',
        state.diagnosis_treatments.length
      )
      state.diagnosis_treatments = [
        ...state.diagnosis_treatments,
        { ...action.payload },
      ]
    },
    deleteDiagnosisTreatmentsData: (state, action) => {
      /* const newdiagnosis_treatments = state.diagnosis_treatments.filter((element: any) => {
        return element._id !== action.payload._id
      })
      state.diagnosis_treatments = newdiagnosis_treatments */
      let index = state.diagnosis_treatments.indexOf(
        (obj: any) => obj._id === action.payload
      )
      state.diagnosis_treatments.splice(index, 1)
    },
  },
  extraReducers: (builder) => {
    // getDentalDiagnosisByIdAction
    builder
      .addCase(getDentalDiagnosisByIdAction.pending, (state) => {
        state.diagnosisDetails = {};
        state.isLoading = true
      })
      .addCase(getDentalDiagnosisByIdAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.diagnosisDetails = action.payload
      })
      .addCase(getDentalDiagnosisByIdAction.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })

    // createDentalDiagnosisAction
    builder
      .addCase(createDentalDiagnosisAction.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createDentalDiagnosisAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.createdDiagnosisId = action.payload?.diagnosis_id || ''
      })
      .addCase(createDentalDiagnosisAction.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })

    // updateDentalDiagnosisAction
    builder
      .addCase(updateDentalDiagnosisAction.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateDentalDiagnosisAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.createdDiagnosisId = action.payload?.diagnosis_id || ''
      })
      .addCase(updateDentalDiagnosisAction.rejected, (state, error) => {
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

    // get All Tooths
    builder
      .addCase(getAllTooths.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllTooths.fulfilled, (state, action) => {
        state.isLoading = false
        state.tooths = action.payload
      })
      .addCase(getAllTooths.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })

    // get All Dental Treatment Services
    builder
      .addCase(getAllDentalTreatmentServices.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllDentalTreatmentServices.fulfilled, (state, action) => {
        state.isLoading = false
        state.services = action.payload
      })
      .addCase(getAllDentalTreatmentServices.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })

    // get All Dental Treatment Services By Parent Id
    builder
      .addCase(getAllDentalTreatmentServicesByParentId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        getAllDentalTreatmentServicesByParentId.fulfilled,
        (state, action) => {
          state.isLoading = false
          state.child_services = action.payload
        }
      )
      .addCase(
        getAllDentalTreatmentServicesByParentId.rejected,
        (state, error) => {
          state.isLoading = false
          state.error = error
        }
      )

    // ADD DIAGNOSIS DOCUMENT

    builder.addCase(addDiagnosisDocument.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addDiagnosisDocument.fulfilled, (state, action) => {
      state.isLoading = false
      state.diagnosisDocInfo = action.payload
    })
    builder.addCase(addDiagnosisDocument.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // ADD DIAGNOSIS IMAGE
    builder.addCase(addDiagnosisImg.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addDiagnosisImg.fulfilled, (state, action) => {
      state.isLoading = false
      state.diagnosisImageInfo = action.payload
    })
    builder.addCase(addDiagnosisImg.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // ADD PATIENT PRESCRIPTION
    builder.addCase(addPatientPrescription.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addPatientPrescription.fulfilled, (state, action) => {
      state.isLoading = false
      state.patientDiagnosisInfo = action.payload
    })
    builder.addCase(addPatientPrescription.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // FIND MEDICINE
    builder.addCase(findMedicine.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(findMedicine.fulfilled, (state, action) => {
      state.isLoading = false
      state.medicineCompositionData = action.payload?.data
    })
    builder.addCase(findMedicine.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET ALL DIAGNOSIS SCRIBE IMAGES
    builder.addCase(getAllDiagnosisScribeImage.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllDiagnosisScribeImage.fulfilled, (state, action) => {
      state.isLoading = false
      state.diagnosisScribeImagesData = action.payload
    })
    builder.addCase(getAllDiagnosisScribeImage.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET ALL DIAGNOSIS SCRIBE NOTES
    builder.addCase(getAllDiagnosisScribeNote.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllDiagnosisScribeNote.fulfilled, (state, action) => {
      state.isLoading = false
      state.diagnosisScribeNotesData = action.payload
    })
    builder.addCase(getAllDiagnosisScribeNote.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET ALL MEDICINE
    builder.addCase(getAllMedicine.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllMedicine.fulfilled, (state, action) => {
      state.isLoading = false
      state.medicineData = action.payload
    })
    builder.addCase(getAllMedicine.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET ALL MEDICINE CATEGORY
    builder.addCase(getAllMedicineCategory.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllMedicineCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.medicineCategory = action.payload
    })
    builder.addCase(getAllMedicineCategory.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET ALL PATIENT HISTORY DATA
    builder.addCase(getAllPatientHistory.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllPatientHistory.fulfilled, (state, action) => {
      state.isLoading = false
      // console.log("action?.payloa", action?.payload);
      state.patientHistoryData = action?.payload
    })
    builder.addCase(getAllPatientHistory.rejected, (state, error) => {
      state.isLoading = false
      state.patientHistoryData = []
      state.error = error
    })

    // GET PATIENT MEDICINE
    builder.addCase(getPatientMedicine.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getPatientMedicine.fulfilled, (state, action) => {
      state.isLoading = false
      // console.log("action?.payloa", action?.payload);
      state.patientMedicineData = action?.payload?.medicine_prescription
    })
    builder.addCase(getPatientMedicine.rejected, (state, error) => {
      state.isLoading = false
      state.patientMedicineData = []
      state.error = error
    })

    // MARK STAGE
    builder.addCase(markStage.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(markStage.fulfilled, (state, action) => {
      state.isLoading = false
      state.markStageInfo = action?.payload
    })
    builder.addCase(markStage.rejected, (state, error) => {
      state.isLoading = false
      state.markStageInfo = {}
      state.error = error
    })

    // GET ALL Tagged Patient Filter Data
    builder.addCase(getTaggedPatientFilterList.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getTaggedPatientFilterList.fulfilled, (state, action) => {
      state.isLoading = false
      state.taggedPatientFilterListData = action.payload
    })
    builder.addCase(getTaggedPatientFilterList.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET ALL Tagged Patient Data
    builder.addCase(getTaggedPatientList.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getTaggedPatientList.fulfilled, (state, action) => {
      state.isLoading = false
      state.taggedPatientListData = action.payload?.data
      state.taggedPatientListDataObject = action.payload
    })
    builder.addCase(getTaggedPatientList.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // patient Diagonsis
    builder.addCase(patientDiagnosisById.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(patientDiagnosisById.fulfilled, (state, action) => {
      state.isLoading = false
      state.patientDiagnosisDataObject = action.payload
    })
    builder.addCase(patientDiagnosisById.rejected, (state, error) => {
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
  addDiagnosisTreatmentsData,
  updateDiagnosisTreatmentsData,
  deleteDiagnosisTreatmentsData,
} = dentistDiagnosisSlice.actions

export default dentistDiagnosisSlice.reducer
