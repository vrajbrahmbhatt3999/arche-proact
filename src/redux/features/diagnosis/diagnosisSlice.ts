import { createSlice } from '@reduxjs/toolkit';
import { IDiagnosis } from '../../../interfaces/apiInterface';
import {
  addDiagnosisDocument,
  addDiagnosisImg,
  addPatientPrescription,
  findMedicine,
  getAllDiagnosisScribeImage,
  getAllDiagnosisScribeNote,
  getAllMedicine,
  getAllMedicineCategory,
  getAllPatientHistory,
  getAllPatientHistoryYear,
  getPatientMedicine,
  getTaggedPatientFilterList,
  getTaggedPatientList,
  markStage,
  patientDiagnosisById,
} from './diagnosisAsyncActions';

export const initialState: IDiagnosis = {
  isLoading: false,
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
  patientHistoryDataYear: [],
  error: null,
}

export const DiagnosisSlice = createSlice({
  name: 'diagnosis',
  initialState,
  reducers: {
    clearPatientHistory: (state) => {
      state.patientHistoryData = []
    },
    clearMedicineData: (state) => {
      state.medicineData = []
    },
    clearPatientMedicineData: (state) => {
      state.patientMedicineData = []
    },
  },
  extraReducers: (builder) => {
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

    // GET ALL PATIENT HISTORY DATA OF YEAR

    builder.addCase(getAllPatientHistoryYear.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPatientHistoryYear.fulfilled, (state, action) => {
      state.isLoading = false;
      state.patientHistoryDataYear = action?.payload?.data;
    });
    builder.addCase(getAllPatientHistoryYear.rejected, (state, error) => {
      state.isLoading = false;
      state.patientHistoryDataYear = [];
      state.error = error;
    });
  },
})

export const {
  clearPatientHistory,
  clearMedicineData,
  clearPatientMedicineData,
} = DiagnosisSlice.actions
export default DiagnosisSlice.reducer
