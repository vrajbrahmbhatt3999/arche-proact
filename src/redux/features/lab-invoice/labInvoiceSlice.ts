import { createSlice } from '@reduxjs/toolkit'
import { ILabInvoice } from '../../../interfaces/apiInterface'
import {
  createNewInvoice,
  getAllLabTests,
  getAllPatientInsurance,
  getAllPrimaryDoctors,
  getPatientInvoiceData,
  getPatientSettledInvoice,
  getSearchPatientInfo,
  invoicePaymentDetails,
} from './labInvoiceAsyncActions'
import { actions } from 'react-table'

export const initialState: ILabInvoice = {
  PatientInsuranceList: [],
  insuranceItem: '',
  labInformationData: {},
  insuranceApprovalNumber: '',
  primaryDoctorsList: [],
  patientSearchObject: {},
  patientInvoice: {},
  labServicesList: [],
  patientServicesList: [],
  isLoading: false,
  labServicesListObject: {},
  patientPaymentInfo: {},
  paymentDetails: {},
  settledInvoiceObject: {},
  settledInvoiceList: [],
  patientTests: [],
  addTestText: [],
}

export const LabInvoiceSlice = createSlice({
  name: 'labInvoice',
  initialState,
  reducers: {
    patientInsurance: (state, action) => {
      state.insuranceItem = action.payload
    },

    clearInvoicePatientObject: (state) => {
      state.patientSearchObject = {}
    },

    labInformation: (state, action) => {
      console.log(action.payload ,"actionPayload")
      state.labInformationData = action.payload
      state.patientServicesList = action.payload?.lab_tests
        ? action?.payload.lab_tests
        : []
      state.addTestText = [];
    },

    approvalNumber: (state, action) => {
      state.insuranceApprovalNumber = action.payload
    },

    // Add service functions
    handleAddedService: (state: any, action: any) => {
      state.patientServicesList = [
        ...state?.patientServicesList,
        action.payload,
      ]
      // const index = state.patientServicesList.findIndex(
      //   (i: any) => i._id === action.payload._id
      // );
      // if (index > -1) {
      //   state.patientServicesList.splice(index, 1);
      // } else {
      //   state.patientServicesList.push(action.payload);
      // }
    },

    // remove added service functions
    handleRemoveAddedService: (state: any, action: any) => {
      state.patientServicesList = state.patientServicesList.filter(
        (item: any) => {
          return item._id !== action.payload
        }
      )
    },

    // added selected service
    addSelectedServices: (state: any) => {
      state.patientServicesList = [...state.patientServicesList]
    },

    // Service Quantity Updated
    updatedNewServiceArray: (state: any, action: any) => {
      state.patientServicesList = action.payload
    },

    servicesTests: (state: any, action: any) => {
      state.patientTests = action.payload
    },

    addPriceKey: (state: any, action: any) => {
      state.patientServicesList = action.payload
    },

    clearLabInvoicePatientData: (state: any) => {
      state.patientSearchObject = {}
      state.settledInvoiceObject = []
      state.labInformationData = {}
      state.PatientInsuranceList = []
      state.insuranceApprovalNumber = ''
      state.insuranceItem = ''
      state.primaryDoctorsList = []
      state.labServicesListObject = {}
      state.patientServicesList = []
      state.patientTests = []
      state.patientPaymentInfo = {}
      state.paymentDetails = {}
      state.addTestText = []
      state.patientInvoice = {}
      // state.isLoading = false
    },
    setPatientPaymentInfo: (state, action) => {
      state.patientPaymentInfo = action.payload
    },

    setTestAddText: (state, action) => {
      const index = state.addTestText.indexOf(action.payload)
      if (index > -1) {
        state.addTestText.splice(index, 1)
      } else {
        state.addTestText.push(action.payload)
      }
    },

    setPatientdata: (state, action) => {
      state.patientSearchObject = action.payload
      console.log(
        state.patientSearchObject,
        'state.patientSearchObject'
      )

      state.patientServicesList = []
      state.settledInvoiceObject = []
      state.labInformationData = {}
      state.PatientInsuranceList = []
      state.insuranceApprovalNumber = ''
      state.insuranceItem = ''
      // state.primaryDoctorsList = []
      state.labServicesListObject = {}
      state.patientServicesList = []
      state.patientTests = []
      state.patientPaymentInfo = {}
      state.paymentDetails = {}
      state.addTestText = []
    },
  },

  extraReducers: (builder) => {
    // GET All Patient Insurance
    builder.addCase(getAllPatientInsurance.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(getAllPatientInsurance.fulfilled, (state, action) => {
      state.isLoading = false
      state.PatientInsuranceList = action.payload
    })
    builder.addCase(getAllPatientInsurance.rejected, (state, error) => {
      state.isLoading = false
      //   state.error = error;
    })

    //GET All Primary Doctors

    builder.addCase(getAllPrimaryDoctors.pending, (state) => {
      //   state.isLoading = true;
    })
    builder.addCase(getAllPrimaryDoctors.fulfilled, (state, action) => {
      //   state.isLoading = false;
      state.primaryDoctorsList = action.payload.data
    })
    builder.addCase(getAllPrimaryDoctors.rejected, (state, error) => {
      //   state.isLoading = false;
      //   state.error = error;
    })

    //GET PatientSearch Data
    builder.addCase(getSearchPatientInfo.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getSearchPatientInfo.fulfilled, (state, action) => {
      state.isLoading = false
      state.patientSearchObject = action.payload
      // state.patientServicesList = action.payload?.lab_tests ? action.payload?.lab_tests : []
    })
    builder.addCase(getSearchPatientInfo.rejected, (state, error) => {
      state.isLoading = false
      // state.error = error;
    })

    //Settled Invoice
    builder.addCase(getPatientSettledInvoice.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getPatientSettledInvoice.fulfilled, (state, action) => {
      state.isLoading = false
      state.settledInvoiceObject = action.payload
      state.settledInvoiceList = action.payload?.data
      console.log(state.settledInvoiceObject, 'settledInvoice')
    })
    builder.addCase(getPatientSettledInvoice.rejected, (state, error) => {
      state.isLoading = false
      //   state.error = error;
    })

    //GET Invoice

    builder.addCase(getPatientInvoiceData.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getPatientInvoiceData.fulfilled, (state, action) => {
      state.isLoading = false
      state.patientInvoice = action.payload
    })
    builder.addCase(getPatientInvoiceData.rejected, (state, error) => {
      state.isLoading = false
      //   state.error = error;
    })

    //GET All Lab Testes
    builder.addCase(getAllLabTests.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllLabTests.fulfilled, (state, action) => {
      state.isLoading = false
      state.labServicesListObject = action.payload
      state.labServicesList = action.payload.data
    })
    builder.addCase(getAllLabTests.rejected, (state, error) => {
      state.isLoading = false
      //   state.error = error;
    })

    // Create And Update Invoice
    builder.addCase(createNewInvoice.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createNewInvoice.fulfilled, (state, action) => {
      state.isLoading = false
      state.patientPaymentInfo = action.payload
    })
    builder.addCase(createNewInvoice.rejected, (state, error) => {
      state.isLoading = false
      //   state.error = error;
    })

    //Payment Details
    builder.addCase(invoicePaymentDetails.pending, (state) => {
      //   state.isLoading = true;
    })
    builder.addCase(invoicePaymentDetails.fulfilled, (state, action) => {
      //   state.isLoading = false;
      state.paymentDetails = action.payload
      console.log(state.paymentDetails, 'paymentDetails')
    })
    builder.addCase(invoicePaymentDetails.rejected, (state, error) => {
      //   state.isLoading = false;
      //   state.error = error;
    })
  },
})

export const {
  patientInsurance,
  clearInvoicePatientObject,
  labInformation,
  approvalNumber,
  addSelectedServices,
  handleAddedService,
  handleRemoveAddedService,
  updatedNewServiceArray,
  servicesTests,
  addPriceKey,
  clearLabInvoicePatientData,
  setPatientPaymentInfo,
  setTestAddText,
  setPatientdata,
} = LabInvoiceSlice.actions
export default LabInvoiceSlice.reducer
