import { createSlice } from "@reduxjs/toolkit";
import { IBranchStore } from "../../../interfaces/apiInterface";
import { branchstoreRequestPopupData } from "../../../constants/table-data/branchStoreRequestPopupTableData";
import {
  getAllBranchStoreRequestList,
  addBranchStoreIssueList,
  getBranchStoreIssueList,
  getBranchStoreMainStoreRequestList,
  getMainStoreRequestItemsList,
  updateMainStoreRequestItemsList,
  deleteMainStoreRequestItemsList,
} from "./branchStoreAsyncActions";
export const initialState: IBranchStore = {
  isLoading: false,
  brachStoreRequestData: [],
  selectedIssueData: [],
  selectedMainStoreData: [],
  selectedMainStoreUniqueData: [],
  branchStoreIssueData: [],
  branchStoreMainStoreRequestData: [],
  mainStoreRequestItemsData: [],
  getBranchStoreMainStoreRequestPayload: {},
};

export const branchStoreSlice = createSlice({
  name: "branchStore",
  initialState,
  reducers: {
    clearSelectedIssueData: (state) => {
      state.selectedIssueData = [];
    },
    clearSelectedMainStoreData: (state) => {
      state.selectedMainStoreData = [];
      state.selectedMainStoreUniqueData = [];
    },
    clearMainStoreItemsData: (state) => {
      state.mainStoreRequestItemsData = [];
    },
    addIssueData: (state, action) => {
      state.selectedIssueData = [...state.selectedIssueData, action.payload];
    },
    updateIssueData: (state, action) => {
      // const findIssueIndex = state.selectedIssueData?.findIndex(
      //   (item: any) => item?._id === action.payload._id
      // );
      // if (findIssueIndex >= 0) {
      //   state.selectedIssueData[findIssueIndex] = action.payload;
      // }
      state.selectedIssueData = action.payload;
    },
    removeIssueData: (state, action) => {
      const removedIssuesData = state.selectedIssueData?.filter(
        (item: any) => action.payload?._id !== item?._id
      );
      state.selectedIssueData = removedIssuesData;
    },
    addMainStoreData: (state, action) => {
      state.selectedMainStoreData = [
        ...state.selectedMainStoreData,
        action.payload,
      ];
    },
    addUniqueMainStoreData: (state, action) => {
      state.selectedMainStoreUniqueData = action.payload;
    },
    updateMainStoreData: (state, action) => {
      // const findMainStoreIndex = state.selectedMainStoreData?.findIndex(
      //   (item: any) => item?._id === action.payload._id
      // );
      // if (findMainStoreIndex >= 0) {
      //   state.selectedMainStoreData[findMainStoreIndex] = action.payload;
      // }
      state.selectedMainStoreUniqueData = action.payload;
    },
    removeMainStoreData: (state, action) => {
      const removedMainStoreData = state.selectedMainStoreData?.filter(
        (item: any) => action.payload?._id !== item?._id
      );
      state.selectedMainStoreData = removedMainStoreData;
    },
    removeUniqueMainStoreData: (state, action) => {
      const removedMainStoreUniqueData =
        state.selectedMainStoreUniqueData?.filter(
          (item: any) => action.payload?.item_id !== item?.item_id
        );
      const removedMainStoreData = state.selectedMainStoreData?.filter(
        (item: any) => action.payload?.item_id !== item?.item_id
      );
      state.selectedMainStoreUniqueData = removedMainStoreUniqueData;
      state.selectedMainStoreData = removedMainStoreData;
    },
    updateBranchStoreData: (state, action) => {
      state.brachStoreRequestData = action.payload;
    },
    updateMainStoreRequestData: (state, action) => {
      state.mainStoreRequestItemsData = action.payload;
    },
    getMainStoreRequestItemsPayload: (state, action) => {
      state.getBranchStoreMainStoreRequestPayload = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET BRANCH STORE REQUESTS DATA
      .addCase(getAllBranchStoreRequestList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBranchStoreRequestList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brachStoreRequestData = action?.payload?.data;
      })
      .addCase(getAllBranchStoreRequestList.rejected, (state, error) => {
        state.isLoading = false;
      })
      // ADD BRANCH STORE ISSUE DATA
      .addCase(addBranchStoreIssueList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBranchStoreIssueList.fulfilled, (state, action) => {
        // console.log("object :>> ", action);
        state.isLoading = false;
        // state.brachStoreRequestData = action?.payload?.data;
      })
      .addCase(addBranchStoreIssueList.rejected, (state, error) => {
        state.isLoading = false;
      })
      // GET BRANCH STORE ISSUE DATA
      .addCase(getBranchStoreIssueList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBranchStoreIssueList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.branchStoreIssueData = action?.payload?.data;
      })
      .addCase(getBranchStoreIssueList.rejected, (state, error) => {
        state.isLoading = false;
      })
      // GET BRANCH STORE MAIN STORE REQUEST DATA
      .addCase(getBranchStoreMainStoreRequestList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getBranchStoreMainStoreRequestList.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.branchStoreMainStoreRequestData = action?.payload?.data;
        }
      )
      .addCase(getBranchStoreMainStoreRequestList.rejected, (state, error) => {
        state.isLoading = false;
      })
      // GET MAIN STORE REQUEST ITEMS DATA
      .addCase(getMainStoreRequestItemsList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMainStoreRequestItemsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mainStoreRequestItemsData = action?.payload;
      })
      .addCase(getMainStoreRequestItemsList.rejected, (state, error) => {
        state.isLoading = false;
      })
      // UPDATE MAIN STORE REQUEST ITEMS DATA
      .addCase(updateMainStoreRequestItemsList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMainStoreRequestItemsList.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateMainStoreRequestItemsList.rejected, (state, error) => {
        state.isLoading = false;
      })
      // DELETE MAIN STORE REQUEST ITEMS DATA
      .addCase(deleteMainStoreRequestItemsList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMainStoreRequestItemsList.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteMainStoreRequestItemsList.rejected, (state, error) => {
        state.isLoading = false;
      });
  },
});

export const {
  clearSelectedIssueData,
  clearSelectedMainStoreData,
  addIssueData,
  updateIssueData,
  removeIssueData,
  addMainStoreData,
  addUniqueMainStoreData,
  updateMainStoreData,
  removeMainStoreData,
  removeUniqueMainStoreData,
  updateBranchStoreData,
  clearMainStoreItemsData,
  updateMainStoreRequestData,
  getMainStoreRequestItemsPayload,
} = branchStoreSlice.actions;
export default branchStoreSlice.reducer;
