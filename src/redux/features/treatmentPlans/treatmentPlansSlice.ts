import { createSlice } from '@reduxjs/toolkit'
import { ITreatmentPlan } from '../../../interfaces/apiInterface'
import {
  getAllTreatmentServices,
  editDepartment,
  getDepartmentById,
  updateDepartmentStatus,
  getAllTreatmentPlans,
  createTreatmentPlan,
  createCustomTreatmentPlan,
  getAllTreatmentPlansforPatient,
  updateTreatmentPlan,
  getAllDiagnosisTreatmentPlans,
  createNewMasterPlan,
  getAllTreatmentServicesStatus,
  updateMasterPlan,
  deleteDentalTreatmentPlanTableDataByIdAction
} from './treatmentPlansAsyncActions'

export const initialState: ITreatmentPlan = {
  isLoading: false,
  treatmentPlanTableData: [],
  newTreatmentPlanDialogTableData: [],
  newTreatmentPlanDialogPriceAndDiscountDetails: {
    totalPrice: 0,
    discountedPrice: 0,
    netPrice: 0,
  },
  error: null,
  isCalculatorDialogOpen: false,
  allTreatmentPlanForDiagnosis: [],
  predefinedPlanData: [],
  serviceListData: [],
  serviceListObject: {},
  selectedServiceList: [],
  getAllDiagnosisTreatmentPlan: [],
  ongoingTreatmentPlanPopup: false,
  TreatmentStatus: [],
  selectedServicesForPlan: [],
  isStatusValueUpdated: false,
}

export const treatmentPlansSlice = createSlice({
  name: 'treatmentPlans',
  initialState,
  reducers: {
    getTreatmentPlanTableData: (state, action) => {
      state.treatmentPlanTableData = [
        ...state.treatmentPlanTableData,
        { ...action.payload },
      ]
    },

    updateTreatmentPlanTableData: (state, action) => {
      let newTreatmentPlanTableData = [...state.treatmentPlanTableData]
      const index = newTreatmentPlanTableData.findIndex(
        (elem) => elem._id === action.payload._id
      )
      if (
        action.payload?.discount !== null &&
        action.payload?.discount !== undefined
      ) {
        const discount = action.payload.discount * 1
        newTreatmentPlanTableData[index].discount = discount || 0
      }
      if (
        action.payload?.price !== null &&
        action.payload?.price !== undefined
      ) {
        const discount = action.payload.discount * 1
        const price = action.payload.price * 1
        const finalTotalPriceAfterDiscount = (price || 0) - (discount || 0)
        newTreatmentPlanTableData[index].netPrice = finalTotalPriceAfterDiscount
      }
      if (
        action.payload?.billable !== null &&
        action.payload?.billable !== undefined
      ) {
        newTreatmentPlanTableData[index].billable = action.payload?.billable
      }
      if (
        action.payload?.billed !== null &&
        action.payload?.billed !== undefined
      ) {
        newTreatmentPlanTableData[index].billed = action.payload?.billed
      }
      if (
        action.payload?.status !== null &&
        action.payload?.status !== undefined
      ) {
        newTreatmentPlanTableData[index].status = action.payload?.status
      }
      state.treatmentPlanTableData = newTreatmentPlanTableData
    },
    deleteTreatmentPlanTableDataById: (state, action) => {
      const filteredTreatmentPlanTableData =
        state.treatmentPlanTableData.filter((_element: any) => {
          return _element.sessionId !== action.payload
        })
      state.treatmentPlanTableData = filteredTreatmentPlanTableData
    },

    getNewTreatmentPlanDialogTableDataPriceAndDiscountDetails: (
      state,
      action
    ) => {
      if (action.payload.forNewTreatmentPlan) {
        state.newTreatmentPlanDialogTableData = [
          ...state.newTreatmentPlanDialogTableData,
          { ...action.payload.forNewTreatmentPlan },
        ]
      } else if (action.payload.forPredefinedTreatmentPlan) {
        state.newTreatmentPlanDialogTableData =
          action.payload.forPredefinedTreatmentPlan
      }

      if (
        state.newTreatmentPlanDialogTableData &&
        state.newTreatmentPlanDialogTableData?.length !== 0 &&
        state.newTreatmentPlanDialogTableData !== null &&
        state.newTreatmentPlanDialogTableData !== undefined
      ) {
        let price = 0,
          discount = 0,
          net_price = 0
        state.newTreatmentPlanDialogTableData.forEach((element: any) => {
          price += element.price * 1
          discount += element.discount * 1
          net_price += element.netPrice * 1
        })
        state.newTreatmentPlanDialogPriceAndDiscountDetails.totalPrice = price
        state.newTreatmentPlanDialogPriceAndDiscountDetails.discountedPrice =
          discount
        state.newTreatmentPlanDialogPriceAndDiscountDetails.netPrice = net_price
      }
    },

    deleteNewTreatmentPlanDialogTableDataById: (state, action) => {
      const filteredNewTreatmentPlanDialogTableData =
        state.newTreatmentPlanDialogTableData.filter((_element: any) => {
          return _element.sessionId !== action.payload
        })
      state.newTreatmentPlanDialogTableData =
        filteredNewTreatmentPlanDialogTableData
    },

    clearNewTreatmentPlanDialogTableDataPriceAndDiscountDetails: (state) => {
      state.newTreatmentPlanDialogPriceAndDiscountDetails = {
        totalPrice: 0,
        discountedPrice: 0,
        netPrice: 0,
      }
    },
    clearNewTreatmentPlanDialogTableData: (state) => {
      state.newTreatmentPlanDialogTableData = []
    },
    addServicesBasedOnSessions: (state, action) => {
      let newTreatmentPlanDialogTableDataPerSession = []
      for (let i = 0; i < state.newTreatmentPlanDialogTableData.length; i++) {
        const element = state.newTreatmentPlanDialogTableData[i]
        if (element.isServicePerSessionsAlreadyAdded === false) {
          element.isServicePerSessionsAlreadyAdded = true
          for (let index = 0; index < action.payload - 1; index++) {
            newTreatmentPlanDialogTableDataPerSession.push(element)
          }
        }
      }
      state.newTreatmentPlanDialogTableData = [
        ...state.newTreatmentPlanDialogTableData,
        ...newTreatmentPlanDialogTableDataPerSession,
      ]

      if (
        state.newTreatmentPlanDialogTableData &&
        state.newTreatmentPlanDialogTableData?.length !== 0 &&
        state.newTreatmentPlanDialogTableData !== null &&
        state.newTreatmentPlanDialogTableData !== undefined
      ) {
        let price = 0,
          discount = 0,
          net_price = 0
        state.newTreatmentPlanDialogTableData.forEach((element: any) => {
          price += element.price * 1
          discount += element.discount * 1
          net_price += element.netPrice * 1
        })
        state.newTreatmentPlanDialogPriceAndDiscountDetails.totalPrice = price
        state.newTreatmentPlanDialogPriceAndDiscountDetails.discountedPrice =
          discount
        state.newTreatmentPlanDialogPriceAndDiscountDetails.netPrice = net_price
      }
    },
    setCalculatorDialog: (state, action) => {
      state.isCalculatorDialogOpen = action.payload
    },
    // divyaraj's new actions
    setTreatmentPlan: (state, action) => {
      state.treatmentPlanTableData = action.payload
    },
    updateTreatmentPlansFromtable: (state, action) => {
      state.treatmentPlanTableData = action.payload
    },
    createExistingDentalTreatmentFromtable: (state, action) => {
      state.treatmentPlanTableData = action.payload
    },
    concateTreatmentPlans: (state, action) => {
      state.treatmentPlanTableData = state.treatmentPlanTableData.concat(
        action.payload
      )
    },
    concateTreatmentPlansFromdialog: (state, action) => {
      state.newTreatmentPlanDialogTableData =
        state.newTreatmentPlanDialogTableData.concat(action.payload)
    },
    clearTreatmentData: (state) => {
      state.treatmentPlanTableData = []
      state.predefinedPlanData = []
    },

    setTreatmentStatus: (state, action) => {
      state.TreatmentStatus = action.payload
    },
    emptyAllTreatmentStatus: (state, action) => {
      state.TreatmentStatus = action.payload
    },

    // Add service functions
    handleAddedService: (state: any, action: any) => {
      state.serviceListData = state.serviceListData?.map((item: any) => {
        if (item?._id === action?.payload) {
          let updateData = { ...item, is_active: false }
          return updateData
        } else {
          return item
        }
      })
    },

    // remove added service functions
    handleRemoveAddedService: (state: any, action: any) => {
      state.serviceListData = state.serviceListData?.map((item: any) => {
        if (item?._id === action?.payload) {
          let updateData = { ...item, is_active: true }
          return updateData
        } else {
          return item
        }
      })
    },

    // added selected service
    addSelectedServices: (state: any, action: any) => {
      let tmpArray: any = []
      action.payload?.map((x: any) => {
        console.log('x', x)
        let json = {
          _id: x?._id,
          quantity: x?.quantity ?? 1,
          name: x?.name,
          price: x?.price,
          unitPrice: x?.unitPrice ?? x?.price,
          discount: x?.discount ?? 0,
        }
        tmpArray.push(json)
      })
      state.selectedServiceList = tmpArray
    },
    // addSelectedServices: (state: any, action: any) => {
    //   state.selectedServiceList = action?.payload;
    // },

    clearInvoiceServiceData: (state: any) => {
      state.selectedServiceList = []
    },

    setOngoingTreatmentPlanPopup: (state, action) => {
      state.ongoingTreatmentPlanPopup = action.payload
    },
    setServicesForPlan: (state, action) => {
      state.serviceListData = action.payload
    },
    setSelectedServiceForPlan: (state, action) => {
      state.selectedServicesForPlan = [
        ...state.selectedServicesForPlan,
        action.payload,
      ]
    },
    setSelectedServiceForPlanArr: (state, action) => {
      state.selectedServicesForPlan = action.payload
    },
    removeSelectedServiceForPlan: (state, action) => {
      const selectedServicesForPlan = state.selectedServicesForPlan?.filter(
        (item: any) => action.payload?._id !== item?._id
      )
      state.selectedServicesForPlan = selectedServicesForPlan
    },
  },
  extraReducers(builder) {
    // GET ALL TREATMENT PLANS
    builder.addCase(getAllTreatmentPlans.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllTreatmentPlans.fulfilled, (state, action) => {
      state.isLoading = false

      state.predefinedPlanData = action.payload.data ?? []
    })
    builder.addCase(getAllTreatmentPlans.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET ALL TREATMENT SERVICES
    builder.addCase(getAllTreatmentServices.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllTreatmentServices.fulfilled, (state, action) => {
      state.isLoading = false
      state.serviceListData =
        action.payload?.data && action.payload?.data?.length > 0
          ? action.payload?.data?.map((item: any, index: any) => {
            const found = state.selectedServicesForPlan?.find(
              (selectedItem: any) => selectedItem?._id === item?._id
            )
            if (found?._id) {
              return {
                ...item,
                session_amount:
                  found?.price && found?.sessions
                    ? found?.price * found?.sessions
                    : found?.price,
                sessions: found?.sessions,
              }
            } else {
              return {
                ...item,
                session_amount:
                  item?.price && item?.sessions
                    ? item?.price * item?.sessions
                    : item?.price,
                sessions: item?.sessions,
              }
            }
          })
          : []
      // state.selectedServicesForPlan = []
      state.serviceListObject = action.payload
    })
    builder.addCase(getAllTreatmentServices.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })
    //GET STATUS
    builder.addCase(getAllTreatmentServicesStatus.pending, (state) => {
      state.isLoading = true

      state.isStatusValueUpdated = false
    })
    builder.addCase(
      getAllTreatmentServicesStatus.fulfilled,
      (state, action) => {
        state.isLoading = false
        state.isStatusValueUpdated = true
      }
    )
    builder.addCase(getAllTreatmentServicesStatus.rejected, (state, error) => {
      state.isStatusValueUpdated = false
    })
    // CREATE TREATMENT PLAN
    builder.addCase(createTreatmentPlan.pending, (state) => {
      state.isLoading = false
    })
    builder.addCase(createTreatmentPlan.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(createTreatmentPlan.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // CREATE CUSTOM TREATMENT PLAN
    builder.addCase(createCustomTreatmentPlan.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createCustomTreatmentPlan.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(createCustomTreatmentPlan.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET DEPARTMENT BY ID

    builder.addCase(getDepartmentById.pending, (state) => {
      state.isLoading = false
    })
    builder.addCase(getDepartmentById.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(getDepartmentById.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // EDIT DEPARTMENT

    builder.addCase(editDepartment.pending, (state) => {
      state.isLoading = false
    })
    builder.addCase(editDepartment.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(editDepartment.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // UPDATE DEPARTMENT STATUS

    builder.addCase(updateDepartmentStatus.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateDepartmentStatus.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(updateDepartmentStatus.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // get all treatment plans for diagnosis
    builder.addCase(getAllTreatmentPlansforPatient.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      getAllTreatmentPlansforPatient.fulfilled,
      (state, action) => {
        state.allTreatmentPlanForDiagnosis = action?.payload?.data || []
        let tempArr: any = []
        tempArr =
          action?.payload?.data && action?.payload?.data?.length > 0
            ? action.payload.data.map((item: any) => {
              return {
                ...item,
                doctor_id: item?.doctor_id?._id,
                service_id: item?.service_id?._id,
                attended_by_id: item?.attended_by_id?._id,
                doctor_name: item?.doctor_id?.doctor_name,
                name: item?.service_id?.name,
                treatmentPlanName: item?.plan_id?.name,
                plan_id: item?.plan_id?._id,
              }
            })
            : []
        state.treatmentPlanTableData = tempArr
      }
    )
    builder.addCase(getAllTreatmentPlansforPatient.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // save and next treatment plan
    // UPDATE DEPARTMENT STATUS

    builder.addCase(updateTreatmentPlan.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateTreatmentPlan.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(updateTreatmentPlan.rejected, (state, error) => {
      state.isLoading = false
    })

    //getAllDiagnosis

    builder.addCase(getAllDiagnosisTreatmentPlans.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      getAllDiagnosisTreatmentPlans.fulfilled,
      (state, action) => {
        state.getAllDiagnosisTreatmentPlan = action.payload?.data
        state.isLoading = false
      }
    )
    builder.addCase(getAllDiagnosisTreatmentPlans.rejected, (state, error) => {
      state.isLoading = false
    })

    builder.addCase(createNewMasterPlan.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createNewMasterPlan.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(createNewMasterPlan.rejected, (state, error) => {
      state.isLoading = false
    })

    builder.addCase(updateMasterPlan.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateMasterPlan.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(updateMasterPlan.rejected, (state, error) => {
      state.isLoading = false
    })


    builder.addCase(deleteDentalTreatmentPlanTableDataByIdAction.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteDentalTreatmentPlanTableDataByIdAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      const filteredTreatmentPlanTableData =
        state.treatmentPlanTableData.filter((_element: any) => {
          return _element._id !== action.meta.arg.payloadData.requestData._id
        })
      state.treatmentPlanTableData = filteredTreatmentPlanTableData
    })
    builder.addCase(deleteDentalTreatmentPlanTableDataByIdAction.rejected, (state, error) => {
      state.isLoading = false
    })
  },
})

export const {
  clearNewTreatmentPlanDialogTableData,
  getTreatmentPlanTableData,
  getNewTreatmentPlanDialogTableDataPriceAndDiscountDetails,
  updateTreatmentPlanTableData,
  setCalculatorDialog,
  clearNewTreatmentPlanDialogTableDataPriceAndDiscountDetails,
  deleteTreatmentPlanTableDataById,
  deleteNewTreatmentPlanDialogTableDataById,
  addServicesBasedOnSessions,
  setTreatmentPlan,
  updateTreatmentPlansFromtable,
  createExistingDentalTreatmentFromtable,
  concateTreatmentPlans,
  concateTreatmentPlansFromdialog,
  clearTreatmentData,
  handleAddedService,
  handleRemoveAddedService,
  addSelectedServices,
  clearInvoiceServiceData,
  setOngoingTreatmentPlanPopup,
  setTreatmentStatus,
  emptyAllTreatmentStatus,
  setServicesForPlan,
  removeSelectedServiceForPlan,
  setSelectedServiceForPlan,
  setSelectedServiceForPlanArr
} = treatmentPlansSlice.actions
export default treatmentPlansSlice.reducer
