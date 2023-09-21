import { createSlice } from '@reduxjs/toolkit'
import { IRadiology } from '../../../interfaces/apiInterface'
import {
  createRadiologyTest,
  createRadiologyTestProfile,
  editRadiologyTest,
  editRadiologyTestProfile,
  getAllRadiologyCategory,
  getAllRadiologyTest,
  getAllRadiologyTestProfile,
  getRadiologyTest,
  getRadiologyTestProfile,
} from './radiologyAsyncActions'

export const initialState: IRadiology = {
  isLoading: false,
  radiologyCategoryData: [],
  radiologyTestProfileData: [],
  radiologyTestData: [],
  error: null,
  radiologyPatientInvoiceData: {},
  radiologyCategoryDataList: [],
  radiologyTestDataList: [],
  radiologyTestDataListObject: {},
  radiologyPatientDiagnosisServiceData: [],
  popupServiceData: [],
  radiologyTestInfo: {},
  radiologyTest: {},
  radiologyTestProfileInfo: {},
  radiologyProfile: {},
  updatedRadiologyProfile: [],
  radiologyNewTestData: {},
  patientTests: [],

  addTestText: [],
}

export const RadiologySlice = createSlice({
  name: 'radiology',
  initialState,
  reducers: {
    // twinkle's actions
    clearRadiologyTestData: (state) => {
      state.radiologyTest = {}
    },
    clearRadiologyProfileData: (state) => {
      state.radiologyProfile = {}
    },
    handleSelectRadiologyTest: (state: any, action: any) => {
      console.log('action', action.payload)
      state.radiologyNewTestData = {
        flag: false,
        id: action.payload._id,
        price: action.payload.sell_price,
        testInfo: action.payload,
      }
      state.radiologyTestData = state.radiologyTestData?.map((item: any) => {
        if (item?._id === action?.payload?._id) {
          let updateData = { ...item, is_active: true }
          return updateData
        } else {
          return item
        }
      })
      state.updatedRadiologyProfile = state.updatedRadiologyProfile?.map(
        (item: any) => {
          if (item?._id === action?.payload?._id) {
            let updateData = { ...item, is_active: true }
            return updateData
          } else {
            return item
          }
        }
      )
    },
    handleDeSelectRadiologyTest: (state: any, action: any) => {
      console.log('action', action.payload)
      state.radiologyNewTestData = {
        flag: true,
        id: action.payload._id,
        price: action.payload.sell_price,
        testInfo: action.payload,
      }
      state.radiologyTestData = state.radiologyTestData?.map((item: any) => {
        if (item?._id === action?.payload?._id) {
          let updateData = { ...item, is_active: false }
          return updateData
        } else {
          return item
        }
      })
      state.updatedRadiologyProfile = state.updatedRadiologyProfile?.map(
        (item: any) => {
          if (item?._id === action?.payload?._id) {
            let updateData = { ...item, is_active: false }
            return updateData
          } else {
            return item
          }
        }
      )
    },
    updateRadiologyTestData: (state: any, action) => {
      state.radiologyTestData = action.payload
    },
    updateNewRadiologyProfileData: (state: any, action) => {
      state.updatedRadiologyProfile = state.updatedRadiologyProfile.concat(
        action.payload
      )
    },
    clearRadiologyNewTestData: (state: any) => {
      state.radiologyNewTestData = {}
    },

    // arwa's actions
    saveRadiologyPatientInvoiceData: (state, action) => {
      state.radiologyPatientInvoiceData = action.payload
      state.radiologyPatientDiagnosisServiceData = action.payload
        ?.radiology_tests
        ? action.payload?.radiology_tests
        : []
      state.addTestText = []
    },
    clearRadiologyInvoicePatientData: (state) => {
      state.radiologyPatientInvoiceData = {}
      state.radiologyPatientDiagnosisServiceData = []
      state.addTestText = []
    },
    clearRegularPatientData: (state: any) => {
      state.invoiceObjectById = {}
    },
    // Add service functions
    handleRadiologyAddedService: (state: any, action: any) => {
      state.radiologyTestDataList = state.radiologyTestDataList?.map(
        (item: any) => {
          if (item?._id === action?.payload) {
            let updateData = { ...item, is_active: false }
            return updateData
          } else {
            return item
          }
        }
      )
    },

    // remove added service functions
    handleRadiologyRemoveAddedService: (state: any, action: any) => {
      state.radiologyTestDataList = state.radiologyTestDataList?.map(
        (item: any) => {
          if (item?._id === action?.payload) {
            let updateData = { ...item, is_active: true }
            return updateData
          } else {
            return item
          }
        }
      )
      state.radiologyPatientDiagnosisServiceData =
        state.radiologyPatientDiagnosisServiceData?.filter((item: any) => {
          return item?._id !== action?.payload
        })
    },

    // added selected service
    addSelectedServices: (state: any, action: any) => {
      let tmpArray: any = []
      action.payload?.map((x: any) => {
        let json = {
          _id: x?._id,
          quantity: x?.quantity ?? 1,
          name: x?.name,
          price: x?.sell_price,
          is_active: x?.is_active,
        }
        tmpArray.push(json)
      })
      state.selectedServiceList = tmpArray
    },

    concatPreNewServiceArray: (state, action) => {
      state.radiologyPatientDiagnosisServiceData =
        state.radiologyPatientDiagnosisServiceData
          ? state.radiologyPatientDiagnosisServiceData.concat(action.payload)
          : action.payload
    },

    updatedNewServiceArray: (state, action) => {
      state.radiologyPatientDiagnosisServiceData = action.payload
    },

    handleServicesProfileTests: (state: any, action: any) => {
      state.patientTests = action.payload
    },
    clearRadiologyInvoiceData: (state) => {
      state.radiologyPatientInvoiceData = {}
      state.radiologyPatientDiagnosisServiceData = []
      state.addTestText = []
    },
    setRadiologyPatientData: (state, action) => {
      state.radiologyPatientInvoiceData = action.payload
      state.radiologyPatientDiagnosisServiceData = []
      state.addTestText = []
    },

    //................................................
    setTestAddText: (state, action) => {
      const index = state.addTestText.indexOf(action.payload)
      if (index > -1) {
        state.addTestText.splice(index, 1)
      } else {
        state.addTestText.push(action.payload)
      }
    },

    // ..................................................

    handleAddedService: (state: any, action: any) => {
      state.radiologyPatientDiagnosisServiceData = [
        ...state?.radiologyPatientDiagnosisServiceData,
        action.payload,
      ]
    },

    handleRemoveAddedService: (state: any, action: any) => {
      state.radiologyPatientDiagnosisServiceData =
        state.radiologyPatientDiagnosisServiceData.filter((item: any) => {
          return item._id !== action.payload
        })
    },
    // .............................................
  },
  extraReducers: (builder) => {
    // GET ALL RADIOLOGY CATEGORIES
    // CREATE RADIOLOGY TEST

    builder.addCase(createRadiologyTest.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createRadiologyTest.fulfilled, (state, action) => {
      state.isLoading = false
      state.radiologyTestInfo = action.payload
    })
    builder.addCase(createRadiologyTest.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // EDIT RADIOLOGY TEST

    builder.addCase(editRadiologyTest.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(editRadiologyTest.fulfilled, (state, action) => {
      state.isLoading = false
      state.radiologyTestInfo = action.payload
    })
    builder.addCase(editRadiologyTest.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET RADIOLOGY TEST

    builder.addCase(getRadiologyTest.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getRadiologyTest.fulfilled, (state, action) => {
      state.isLoading = false
      state.radiologyTest = action.payload
    })
    builder.addCase(getRadiologyTest.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET ALL RADIOLOGY TEST PROFILE

    builder.addCase(getAllRadiologyTestProfile.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllRadiologyTestProfile.fulfilled, (state, action) => {
      state.isLoading = false
      state.radiologyTestProfileData = action.payload?.data
    })
    builder.addCase(getAllRadiologyTestProfile.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // CREATE RADIOLOGY TEST PROFILE

    builder.addCase(createRadiologyTestProfile.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createRadiologyTestProfile.fulfilled, (state, action) => {
      state.isLoading = false
      state.radiologyTestProfileInfo = action.payload
    })
    builder.addCase(createRadiologyTestProfile.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // EDIT RADIOLOGY TEST PROFILE

    builder.addCase(editRadiologyTestProfile.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(editRadiologyTestProfile.fulfilled, (state, action) => {
      state.isLoading = false
      state.radiologyTestProfileInfo = action.payload
    })
    builder.addCase(editRadiologyTestProfile.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET RADIOLOGY TEST PROFILE

    builder.addCase(getRadiologyTestProfile.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getRadiologyTestProfile.fulfilled, (state, action) => {
      state.isLoading = false
      state.radiologyProfile = action.payload
      state.updatedRadiologyProfile = action.payload?.radiologytest_ids?.map(
        (item: any) => {
          let updateData = { ...item, is_active: !item.is_active }
          return updateData
        }
      )
    })
    builder.addCase(getRadiologyTestProfile.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    builder.addCase(getAllRadiologyCategory.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllRadiologyCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.radiologyCategoryData = action.payload?.data
      state.radiologyCategoryDataList = action.payload?.data
    })
    builder.addCase(getAllRadiologyCategory.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET ALL RADIOLOGY TEST

    builder.addCase(getAllRadiologyTest.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllRadiologyTest.fulfilled, (state, action) => {
      state.isLoading = false
      state.radiologyTestData = action.payload?.data
      state.radiologyTestDataList = action.payload?.data
      state.radiologyTestDataListObject = action.payload
    })
    builder.addCase(getAllRadiologyTest.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })
  },
})

export const {
  saveRadiologyPatientInvoiceData,
  handleRadiologyAddedService,
  handleRadiologyRemoveAddedService,
  addSelectedServices,
  concatPreNewServiceArray,
  updatedNewServiceArray,
  clearRadiologyInvoicePatientData,
  clearRegularPatientData,
  clearRadiologyTestData,
  clearRadiologyProfileData,
  handleSelectRadiologyTest,
  handleDeSelectRadiologyTest,
  updateRadiologyTestData,
  updateNewRadiologyProfileData,
  handleServicesProfileTests,
  clearRadiologyInvoiceData,
  clearRadiologyNewTestData,
  setRadiologyPatientData,

  setTestAddText,
  handleAddedService,
  handleRemoveAddedService,
} = RadiologySlice.actions
export default RadiologySlice.reducer
