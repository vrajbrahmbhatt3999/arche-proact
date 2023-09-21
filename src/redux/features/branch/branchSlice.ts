import { createSlice } from '@reduxjs/toolkit';
import { IBranch } from '../../../interfaces/apiInterface';
import {
  addBranch,
  editBranch,
  getAllBranch,
  getAllBranchDropDownData,
  getBranchById,
  getDefaultBranch,
  updateBranchStatus,
  userLicense,
} from './branchAsyncActions';

export const initialState: IBranch = {
  isLoading: false,
  branchData: [],
  allBranchDropDownData: [],
  branchlistInfo: {},
  branchInfo: {},
  userLicenseInfo: {},
  error: null,
}

export const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    clearBranchInfo: (state) => {
      state.branchInfo = {}
    },
    clearBranchData: (state) => {
      state.branchData = []
    },
  },
  extraReducers(builder) {
    // GET ALL BRANCH

    builder.addCase(getAllBranch.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllBranch.fulfilled, (state, action) => {
      state.isLoading = false
      state.branchData = action.payload?.data
      state.branchlistInfo = action.payload
    })
    builder.addCase(getAllBranch.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    //GET ALL BRANCHDROPDOWN DATA

    builder.addCase(getAllBranchDropDownData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllBranchDropDownData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allBranchDropDownData = action.payload?.data;
    });
    builder.addCase(getAllBranchDropDownData.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });
    // ADD BRANCH

    builder.addCase(addBranch.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addBranch.fulfilled, (state, action) => {
      state.isLoading = false
      state.branchInfo = action.payload
    })
    builder.addCase(addBranch.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET BRANCH BY ID

    builder.addCase(getBranchById.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getBranchById.fulfilled, (state, action) => {
      state.isLoading = false
      state.branchInfo = action.payload
    })
    builder.addCase(getBranchById.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // EDIT BRANCH

    builder.addCase(editBranch.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(editBranch.fulfilled, (state, action) => {
      state.isLoading = false
      state.branchInfo = action.payload
    })
    builder.addCase(editBranch.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // UPDATE BRANCH STATUS

    builder.addCase(updateBranchStatus.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateBranchStatus.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(updateBranchStatus.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // USER LICENSE INFO

    builder.addCase(userLicense.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(userLicense.fulfilled, (state, action) => {
      state.isLoading = false
      state.userLicenseInfo = action.payload
    })
    builder.addCase(userLicense.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET DEFAULT BRANCH

    builder.addCase(getDefaultBranch.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getDefaultBranch.fulfilled, (state, action) => {
      state.isLoading = false
      state.branchInfo = action.payload
    })
    builder.addCase(getDefaultBranch.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })
  },
})

export const { clearBranchInfo, clearBranchData } = branchSlice.actions
export default branchSlice.reducer
