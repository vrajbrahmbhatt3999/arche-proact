import { createSlice } from '@reduxjs/toolkit'
import { IReceipt } from '../../../interfaces/apiInterface'
import {
  getReceiptPatientList,
  getPatientAdvanceInoviceList,
  getPatientRefundInoviceList,
  addReceiptRefund,
  entryReceiptRefund,
  addReceiptAdvance,
  entryReceiptAdvance,
  addReceiptOutStanding,
  entryReceiptOutStanding,
  getOutstandingInoviceList,
  deleteOutstandingInovice,
} from "./receiptAsyncActions";

export const initialState: IReceipt = {
  isLoading: false,
  receiptPatientData: [],
  receiptPatientOutstandingData: [],
  existingReceiptOutstandingData: [],
  selectedInvoiceData: [],
  patientInvoiceData: [],
  receiptPaymentModeData: [],
  totalOutstandingAmount: undefined,
  totalAdvanceAndRefundAmount: 0,
  createReceiptRefundData: {},
  createReceiptAdvanceData: {},
  createReceiptOutStandingData: {},
  upayAmount: undefined,
  outStandingReceiptData: [],
  // entryReceiptAdvanceUpayData: {
  //   transaction_id: "64b131fee9171d8927244673",
  //   upay_link:
  //     "https://api.upayments.com/live/new-knet-payment?ref=m7OxY4Bqva64b131fee9171d89272446731689334272122403324664b13200a6924&sess_id=46d35ba12ffd9125ee14c4b9aba8ad20&alive=bW52NFpkbWd4bA==",
  //   receipt_no: 323,
  // },
  entryReceiptAdvanceUpayData: {},
  getOutstandingInoviceListPayload: {},
  selectedReturnInvoiceData: [],
  returnInvoiceData: {},
};

export const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    clearReceiptData: (state) => {
      state.isLoading = false
      state.receiptPatientData = []
      state.receiptPatientOutstandingData = []
      state.existingReceiptOutstandingData = []
      state.selectedInvoiceData = []
      state.patientInvoiceData = []
      state.receiptPaymentModeData = []
    },
    clearSelectedInvoiceData: (state) => {
      state.selectedInvoiceData = []
    },
    clearPatientsInvoiceData: (state) => {
      state.patientInvoiceData = []
    },
    clerReceiptPaymentModeData: (state) => {
      state.receiptPaymentModeData = []
    },
    clearCreateReceiptRefundAndAdvanceData: (state) => {
      state.createReceiptRefundData = {}
      state.createReceiptAdvanceData = {}
    },
    setPatientOutstandingData: (state, action) => {
      state.receiptPatientOutstandingData = action.payload
    },
    setSelectedInvoicesData: (state, action) => {
      state.selectedInvoiceData = action.payload
    },
    addOutStandingInvoiceData: (state, action) => {
      state.selectedInvoiceData = [
        ...state.selectedInvoiceData,
        action.payload,
      ];
    },
    removeOutStaningInvoiceData: (state, action) => {
      const removedInvoicesData = state.selectedInvoiceData?.filter(
        (item: any) => action.payload?._id !== item?._id
      );
      state.selectedInvoiceData = removedInvoicesData;
    },
    addReceiptPaymentModeData: (state, action) => {
      if (state.receiptPaymentModeData?.length > 0) {
        if (
          !state.receiptPaymentModeData?.some(
            (item: any) => item?._id === action.payload._id
          )
        ) {
          state.receiptPaymentModeData = [
            ...state.receiptPaymentModeData,
            action.payload,
          ]
        }
      } else {
        state.receiptPaymentModeData = [
          ...state.receiptPaymentModeData,
          action.payload,
        ]
      }
    },
    addReceiptUpayModeData: (state, action) => {
      if (state.receiptPaymentModeData?.length > 0) {
        const findUpayIndex = state.receiptPaymentModeData?.findIndex(
          (item: any) => item?._id === action.payload._id
        )
        if (findUpayIndex >= 0) {
          state.receiptPaymentModeData[findUpayIndex] = action.payload
        } else {
          state.receiptPaymentModeData = [
            ...state.receiptPaymentModeData,
            action.payload,
          ]
        }
      } else {
        state.receiptPaymentModeData = [
          ...state.receiptPaymentModeData,
          action.payload,
        ]
      }
    },
    updateReceiptPaymentModeData: (state, action) => {
      state.receiptPaymentModeData = action.payload
    },
    deleteReceiptPaymentModeData: (state, action) => {
      const deletedPaymentModeData = state.receiptPaymentModeData?.filter(
        (item: any) => action.payload?._id !== item?._id
      )
      state.receiptPaymentModeData = deletedPaymentModeData
    },
    updateTotalOutstandingAmount: (state, action) => {
      state.totalOutstandingAmount = action.payload
    },
    updateTotalAdvanceAndRefundAmount: (state, action) => {
      state.totalAdvanceAndRefundAmount = action.payload
    },
    addUpayAmount: (state, action) => {
      state.upayAmount = action.payload
    },
    addOutstaningReceiptData: (state, action) => {
      state.outStandingReceiptData = action.payload
    },
    clearUpaylinkData: (state) => {
      state.entryReceiptAdvanceUpayData = {}
    },
    addExistingReceiptNoOutstanding: (state, action) => {
      state.createReceiptOutStandingData = action.payload
    },
    addGetOutstandingInoviceListPayload: (state, action) => {
      state.getOutstandingInoviceListPayload = action.payload;
    },
    clearSelectedReturnInvoiceData: (state) => {
      state.selectedReturnInvoiceData = [];
    },
    getReturnInvoiceData: (state, action) => {
      state.returnInvoiceData = action.payload;
    },
    addReturnInvoiceData: (state, action) => {
      state.selectedReturnInvoiceData = [
        ...state.selectedReturnInvoiceData,
        action.payload,
      ];
    },
    removeReturnInvoiceData: (state, action) => {
      const removedReturnInvoicesData = state.selectedReturnInvoiceData?.filter(
        (item: any) =>
          action.payload?.return_invoice_id !== item?.return_invoice_id
      );
      state.selectedReturnInvoiceData = removedReturnInvoicesData;
    },
  },
  extraReducers: (builder) => {
    builder
      // get all receipt patient data
      .addCase(getReceiptPatientList.pending, (state) => {
        state.isLoading = true
        state.receiptPatientData = []
      })
      .addCase(getReceiptPatientList.fulfilled, (state, action) => {
        state.isLoading = false
        state.receiptPatientData = action.payload.data
      })
      .addCase(getReceiptPatientList.rejected, (state, error) => {
        state.isLoading = false
        state.receiptPatientData = []
      })
      // get receipt patient outstanding data
      // .addCase(getReceiptPatientOutstandingList.pending, (state) => {
      //   state.isLoading = true;
      //   state.existingReceiptOutstandingData = [];
      // })
      // .addCase(getReceiptPatientOutstandingList.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.existingReceiptOutstandingData = action.payload;
      // })
      // .addCase(getReceiptPatientOutstandingList.rejected, (state, error) => {
      //   state.isLoading = false;
      //   state.existingReceiptOutstandingData = [];
      // })
      // // get patient invoices data
      .addCase(getPatientAdvanceInoviceList.pending, (state) => {
        state.isLoading = true
        state.patientInvoiceData = []
      })
      .addCase(getPatientAdvanceInoviceList.fulfilled, (state, action) => {
        state.isLoading = false
        state.patientInvoiceData = action.payload
      })
      .addCase(getPatientAdvanceInoviceList.rejected, (state, error) => {
        state.isLoading = false
        state.patientInvoiceData = []
      })
      .addCase(getPatientRefundInoviceList.pending, (state) => {
        state.isLoading = true
        state.patientInvoiceData = []
      })
      .addCase(getPatientRefundInoviceList.fulfilled, (state, action) => {
        state.isLoading = false
        state.patientInvoiceData = action.payload
      })
      .addCase(getPatientRefundInoviceList.rejected, (state, error) => {
        state.isLoading = false
        state.patientInvoiceData = []
      })
      // create receipt refund
      .addCase(addReceiptRefund.pending, (state) => {
        state.isLoading = true
        state.createReceiptRefundData = {}
      })
      .addCase(addReceiptRefund.fulfilled, (state, action) => {
        state.isLoading = false
        state.createReceiptRefundData = action.payload
      })
      .addCase(addReceiptRefund.rejected, (state, error) => {
        state.isLoading = false
        state.createReceiptRefundData = {}
      })
      // update receipt refund
      .addCase(entryReceiptRefund.pending, (state) => {
        state.isLoading = true
      })
      .addCase(entryReceiptRefund.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(entryReceiptRefund.rejected, (state, error) => {
        state.isLoading = false
      })
      // create receipt refund
      .addCase(addReceiptAdvance.pending, (state) => {
        state.isLoading = true
        state.createReceiptAdvanceData = {}
      })
      .addCase(addReceiptAdvance.fulfilled, (state, action) => {
        state.isLoading = false
        state.createReceiptAdvanceData = action.payload
      })
      .addCase(addReceiptAdvance.rejected, (state, error) => {
        state.isLoading = false
        state.createReceiptAdvanceData = {}
      })
      // update receipt advance
      .addCase(entryReceiptAdvance.pending, (state) => {
        state.isLoading = true
        state.entryReceiptAdvanceUpayData = {}
      })
      .addCase(entryReceiptAdvance.fulfilled, (state, action) => {
        state.isLoading = false
        state.entryReceiptAdvanceUpayData = action.payload
      })
      .addCase(entryReceiptAdvance.rejected, (state, error) => {
        state.isLoading = false
        state.entryReceiptAdvanceUpayData = {}
      })
      // create receipt outstanding
      .addCase(addReceiptOutStanding.pending, (state) => {
        state.isLoading = true
        state.createReceiptOutStandingData = {}
      })
      .addCase(addReceiptOutStanding.fulfilled, (state, action) => {
        state.isLoading = false
        state.createReceiptOutStandingData = action.payload
      })
      .addCase(addReceiptOutStanding.rejected, (state, error) => {
        state.isLoading = false
        state.createReceiptOutStandingData = {}
      })
      // update receipt outstanding
      .addCase(entryReceiptOutStanding.pending, (state) => {
        state.isLoading = true
        state.entryReceiptAdvanceUpayData = {}
      })
      .addCase(entryReceiptOutStanding.fulfilled, (state, action) => {
        state.isLoading = false
        state.entryReceiptAdvanceUpayData = action.payload
      })
      .addCase(entryReceiptOutStanding.rejected, (state, error) => {
        state.isLoading = false
        state.entryReceiptAdvanceUpayData = {}
      })
      // get patient outstanding invoice data
      .addCase(getOutstandingInoviceList.pending, (state) => {
        state.isLoading = true
        state.receiptPatientOutstandingData = []
      })
      .addCase(getOutstandingInoviceList.fulfilled, (state, action) => {
        state.isLoading = false
        state.receiptPatientOutstandingData = action.payload.data
      })
      .addCase(getOutstandingInoviceList.rejected, (state, error) => {
        state.isLoading = false;
        state.receiptPatientOutstandingData = [];
      })
      // delete patient outstanding invoice data
      .addCase(deleteOutstandingInovice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOutstandingInovice.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteOutstandingInovice.rejected, (state, error) => {
        state.isLoading = false;
      });
  },
})

export const {
  clearReceiptData,
  clearSelectedInvoiceData,
  clearPatientsInvoiceData,
  clerReceiptPaymentModeData,
  setSelectedInvoicesData,
  setPatientOutstandingData,
  addReceiptPaymentModeData,
  updateReceiptPaymentModeData,
  addReceiptUpayModeData,
  updateTotalOutstandingAmount,
  updateTotalAdvanceAndRefundAmount,
  clearCreateReceiptRefundAndAdvanceData,
  addUpayAmount,
  addOutstaningReceiptData,
  clearUpaylinkData,
  deleteReceiptPaymentModeData,
  addExistingReceiptNoOutstanding,
  addGetOutstandingInoviceListPayload,
  addOutStandingInvoiceData,
  removeOutStaningInvoiceData,
  clearSelectedReturnInvoiceData,
  addReturnInvoiceData,
  removeReturnInvoiceData,
  getReturnInvoiceData,
} = receiptSlice.actions;
export default receiptSlice.reducer;
