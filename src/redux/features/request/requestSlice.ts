import { createSlice } from '@reduxjs/toolkit'
import { IRequest } from '../../../interfaces/apiInterface'
import {
  addPatientRequestList,
  getLabTestsList,
  getRadiologyTestsList,
  getTestsListByInsuranceNameList,
} from "./requestAsyncActions";

export const initialState: IRequest = {
  isLoading: false,
  requestData: [],
  labTestsData: [],
  radiologyTestsData: [],
  patientInsuranceList: [],
  testListByInsuranceNameData: [],
};

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    clearRequestData: (state) => {
      state.isLoading = false
      state.requestData = []
    },
    clearAddRequestData: (state) => {
      state.requestData = []
    },
    addRequest: (state, action) => {
      // console.log("patient images data>>", action.payload);
      state.requestData = [...state.requestData, action.payload]
    },
    deleteRequest: (state, action) => {
      // console.log("patient images data>>", action.payload);
      const deletedRequest = state.requestData?.filter(
        (item: any) => action.payload?.request_id !== item?.request_id
      )
      state.requestData = deletedRequest
    },
  },
  extraReducers: (builder) => {
    builder
      // get all receipt patient data
      .addCase(addPatientRequestList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addPatientRequestList.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(addPatientRequestList.rejected, (state, error) => {
        state.isLoading = false
      })
      // get all lab tests data
      .addCase(getLabTestsList.pending, (state) => {
        state.isLoading = true
        state.labTestsData = []
      })
      .addCase(getLabTestsList.fulfilled, (state, action) => {
        state.isLoading = false
        state.labTestsData = action.payload.data
      })
      .addCase(getLabTestsList.rejected, (state, error) => {
        state.isLoading = false
        state.labTestsData = []
      })
      // get all radiology tests data
      .addCase(getRadiologyTestsList.pending, (state) => {
        state.isLoading = true
        state.radiologyTestsData = []
      })
      .addCase(getRadiologyTestsList.fulfilled, (state, action) => {
        state.isLoading = false
        state.radiologyTestsData = action.payload.data
      })
      .addCase(getRadiologyTestsList.rejected, (state, error) => {
        state.isLoading = false;
        state.radiologyTestsData = [];
      })
      // get test name list by insurance name
      .addCase(getTestsListByInsuranceNameList.pending, (state) => {
        state.isLoading = true;
        state.testListByInsuranceNameData = [];
      })
      .addCase(getTestsListByInsuranceNameList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.testListByInsuranceNameData = action.payload;
      })
      .addCase(getTestsListByInsuranceNameList.rejected, (state, error) => {
        state.isLoading = false;
        state.testListByInsuranceNameData = [];
      });
  },
})

export const {
  clearRequestData,
  clearAddRequestData,
  addRequest,
  deleteRequest,
} = requestSlice.actions
export default requestSlice.reducer
