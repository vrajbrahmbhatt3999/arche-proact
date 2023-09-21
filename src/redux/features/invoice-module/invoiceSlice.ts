import { createSlice } from '@reduxjs/toolkit'
import { IInvoiceState } from '../../../interfaces/apiInterface'
import {
  createInvoice,
  generateUpayLink,
  getLastInvoice,
  getOnlinePayment,
  getSettledInvoiceList,
  patientInsurancePlanList,
} from './invoiceAsynActions'

export const initialState: IInvoiceState = {
  isLoading: false,
  invoiceObjectById: {},
  patientInvoiceData: {},
  settledInvoiceList: [],
  settledInvoiceListObject: {},
  generatedInvoiceObject: {},
  addInsurancePlanList: [],
  patientInvoiceServiceData: [],
  selectedInsurancePlan: {},
  servicesDataDetails: [],
  patientDiagnosisServiceData: [],
  popupServiceData: [],
  paymentAmount: {},
  paymentModeData: [],
  upayLinkObject: {},
  onlinePaymentObject: {},
  error: null,
  patientObject: {},
  addTestText: [],
}

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    savePatientInvoice: (state, action) => {
      state.patientInvoiceData = action.payload
      state.patientDiagnosisServiceData =
        action.payload?.diagnosis_services &&
        action.payload?.diagnosis_services?.length > 0
          ? action.payload?.insurance_plan_ids &&
            action.payload?.insurance_plan_ids?.length > 0
            ? action.payload?.diagnosis_services?.filter(
                (service: any) =>
                  service?.insurance_plan_id ===
                  action?.payload?.patient_insurance_id
              )
            : action.payload?.diagnosis_services
          : []
      state.addTestText = []
    },
    setPopupServiceData: (state: any, action: any) => {
      state.popupServiceData = action.payload
    },

    savePatientInvoiceService: (state: any, action: any) => {
      state.patientInvoiceServiceData = action.payload
    },
    // added selected service
    addSelectedInsurancePlan: (state: any, action: any) => {
      state.selectedInsurancePlan = action?.payload
    },
    clearInvoicePatientData: (state: any) => {
      state.invoiceObjectById = {}
      state.generatedInvoiceObject = {}
      state.patientInvoiceData = {}
      state.selectedInsurancePlan = {}
      state.patientDiagnosisServiceData = []
      state.paymentModeData = []
      state.paymentAmount = {}
      state.upayLinkObject = {}
      state.patientObject = {}
      state.addTestText = []
    },
    clearRegularPatientData: (state: any) => {
      state.invoiceObjectById = {}
    },
    clearInvoicePatientObject: (state: any) => {
      state.invoiceObjectById = {}
    },
    clearinvoiceObjectByIdReferDoctor: (state: any) => {
      state.invoiceObjectByIdReferDoctor = {}
    },
    concatPreNewServiceArray: (state, action) => {
      state.patientDiagnosisServiceData = state.patientDiagnosisServiceData
        ? state.patientDiagnosisServiceData.concat(action.payload)
        : action.payload
    },

    updatedNewServiceArray: (state, action) => {
      state.patientDiagnosisServiceData = action.payload
    },

    // Add service functions
    handleAddedServiceNew: (state: any, action: any) => {
      state.popupServiceData = state.popupServiceData?.map((item: any) => {
        if (item?._id === action?.payload) {
          let updateData = { ...item, is_active: false }
          return updateData
        } else {
          return item
        }
      })
    },

    // remove added service functions
    handleRemoveAddedServiceNew: (state: any, action: any) => {
      state.popupServiceData = state.popupServiceData?.map((item: any) => {
        if (item?._id === action?.payload) {
          let updateData = { ...item, is_active: true }
          return updateData
        } else {
          return item
        }
      })
      state.patientDiagnosisServiceData =
        state.patientDiagnosisServiceData?.filter((item: any) => {
          return item?._id !== action?.payload
        })
    },

    setAmountData: (state: any, action: any) => {
      // state.paymentAmount = action.payload;
      // state.paymentModeData.push(action.payload);

      if (state.paymentModeData?.length > 0) {
        const findUpayIndex = state.paymentModeData?.findIndex(
          (item: any) => item?._id === action.payload._id
        )
        if (findUpayIndex >= 0) {
          state.paymentModeData[findUpayIndex] = action.payload
        } else {
          state.paymentModeData = [...state.paymentModeData, action.payload]
        }
      } else {
        state.paymentModeData = [...state.paymentModeData, action.payload]
      }
    },
    savePaymentMode: (state: any, action: any) => {
      // const temp = state.paymentModeData;
      // temp.push(action.payload);
      // state.paymentModeData = temp;

      if (state.paymentModeData?.length > 0) {
        if (
          !state.paymentModeData?.some(
            (item: any) => item?._id === action.payload._id
          )
        ) {
          state.paymentModeData = [...state.paymentModeData, action.payload]
        }
      } else {
        state.paymentModeData = [...state.paymentModeData, action.payload]
      }
    },

    updatedNewPaymentAmountArray: (state, action) => {
      state.paymentModeData = action.payload
    },

    setGeneratedInvoiceData: (state, action) => {
      state.generatedInvoiceObject = action.payload
    },
    setPatientData: (state, action) => {
      state.invoiceObjectById = action.payload
      state.patientInvoiceData = action.payload
      state.generatedInvoiceObject = {}
      state.selectedInsurancePlan = {}
      state.patientDiagnosisServiceData = []
      state.paymentModeData = []
      state.paymentAmount = {}
      state.upayLinkObject = {}
      state.patientObject = {}

      state.addTestText = []
      state.popupServiceData = []
    },

    //...................................
    setTestAddNewText: (state, action) => {
      const index = state.addTestText.indexOf(action.payload)
      if (index > -1) {
        state.addTestText.splice(index, 1)
      } else {
        state.addTestText.push(action.payload)
      }
    },
    // .................................

    handleAddedNewService: (state, action) => {
      console.log('add', action?.payload)
      state.patientDiagnosisServiceData = [
        ...state.patientDiagnosisServiceData,
        action.payload,
      ]
    },

    handleRemoveNewService: (state: any, action: any) => {
      console.log('added>>', action.payload)
      state.patientDiagnosisServiceData =
        state.patientDiagnosisServiceData?.filter((item: any) => {
          return item._id !== action.payload
        })
    },

    // ............................................
  },

  extraReducers: (builder) => {
    builder
      // getlast invoice by patient id
      .addCase(getLastInvoice.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getLastInvoice.fulfilled, (state, action) => {
        state.isLoading = false
        state.invoiceObjectById = action.payload
        // state.patientInvoiceData = action.payload
      })
      .addCase(getLastInvoice.rejected, (state, action) => {
        state.isLoading = false
        state.invoiceObjectById = {}
      })

      // get Settled Invoice List
      .addCase(getSettledInvoiceList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSettledInvoiceList.fulfilled, (state, action) => {
        state.isLoading = false
        state.settledInvoiceList = action.payload?.data
        state.settledInvoiceListObject = action.payload
      })
      .addCase(getSettledInvoiceList.rejected, (state, action) => {
        state.isLoading = false
        state.settledInvoiceList = []
      })
      // create patient Invoice
      .addCase(createInvoice.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.isLoading = false

        state.generatedInvoiceObject = action.payload
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.isLoading = false

        state.generatedInvoiceObject = {}
      })
      // add insurance plan
      .addCase(patientInsurancePlanList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(patientInsurancePlanList.fulfilled, (state, action) => {
        state.isLoading = false
        state.addInsurancePlanList = action.payload
      })
      .addCase(patientInsurancePlanList.rejected, (state, action) => {
        state.isLoading = false
        state.addInsurancePlanList = []
      })

      // generate upay link
      .addCase(generateUpayLink.pending, (state) => {
        state.isLoading = true
      })
      .addCase(generateUpayLink.fulfilled, (state, action) => {
        state.isLoading = false
        state.upayLinkObject = action.payload
      })
      .addCase(generateUpayLink.rejected, (state, action) => {
        state.isLoading = false
        state.upayLinkObject = {}
      })
      // get online payment
      .addCase(getOnlinePayment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOnlinePayment.fulfilled, (state, action) => {
        state.isLoading = false
        state.onlinePaymentObject = action.payload
      })
      .addCase(getOnlinePayment.rejected, (state, action) => {
        state.isLoading = false
        state.onlinePaymentObject = {}
      })
  },
})

export const {
  clearInvoicePatientData,
  savePatientInvoice,
  savePatientInvoiceService,
  clearRegularPatientData,
  addSelectedInsurancePlan,
  clearinvoiceObjectByIdReferDoctor,
  concatPreNewServiceArray,
  updatedNewServiceArray,
  clearInvoicePatientObject,
  setPopupServiceData,
  handleAddedServiceNew,
  handleRemoveAddedServiceNew,
  setAmountData,
  savePaymentMode,
  updatedNewPaymentAmountArray,
  setGeneratedInvoiceData,
  setPatientData,

  setTestAddNewText,
  handleAddedNewService,
  handleRemoveNewService,
} = invoiceSlice.actions

export default invoiceSlice.reducer
