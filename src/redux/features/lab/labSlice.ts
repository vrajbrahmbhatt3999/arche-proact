import { rangeData } from "./../../../constants/data";
import { createSlice } from "@reduxjs/toolkit";
import { ILab } from "../../../interfaces/apiInterface";
import {
  createLabComponent,
  createLabTest,
  createLabTestProfile,
  deleteComponent,
  editLabTest,
  editLabTestProfile,
  getAllLabComponent,
  getAllLabSampleType,
  getAllLabTest,
  getAllLabTestProfile,
  getAllLabUnit,
  getLabCategory,
  getLabComponent,
  getLabTest,
  getLabTestProfile,
  updateLabComponent,
} from "./labAsyncActions";

export const initialState: ILab = {
  isLoading: false,
  categoryData: [],
  testProfileData: [],
  testProfileInfo: {},
  sampleTypeData: [],
  labUnitData: [],
  labComponentData: [],
  labTestData: [],
  testInfo: {},
  profileData: {},
  updatedProfileData: [],
  newTestData: [],
  testData: {},
  updatedTestData: [],
  rangeTableData: [],
  componentInfo: {},
  componentData: {},
  error: null,
}
export const LabSlice = createSlice({
  name: 'lab',
  initialState,
  reducers: {
    clearLabTestData: (state) => {
      state.labTestData = []
    },
    handleSelectTest: (state: any, action: any) => {
      state.newTestData = {
        flag: false,
        id: action.payload._id,
        price: action.payload.sell_price,
        testInfo: action.payload,
      };
      state.labTestData = state.labTestData?.map((item: any) => {
        if (item?._id === action?.payload?._id) {
          let updateData = { ...item, is_active: true }
          return updateData
        } else {
          return item
        }
      })
      state.updatedProfileData = state.updatedProfileData?.map((item: any) => {
        if (item?._id === action?.payload._id) {
          let updateData = { ...item, is_active: true }
          return updateData
        } else {
          return item
        }
      })
    },
    handleDeSelectTest: (state: any, action: any) => {
      state.newTestData = {
        flag: true,
        id: action.payload._id,
        price: action.payload.sell_price,
        testInfo: action.payload,
      };
      state.labTestData = state.labTestData?.map((item: any) => {
        if (item?._id === action?.payload._id) {
          let updateData = { ...item, is_active: false }
          return updateData
        } else {
          return item
        }
      })
      state.updatedProfileData = state.updatedProfileData?.map((item: any) => {
        if (item?._id === action?.payload._id) {
          let updateData = { ...item, is_active: false }
          return updateData
        } else {
          return item
        }
      })
    },
    clearProfileData: (state) => {
      state.profileData = {};
    },
    cleartestData: (state) => {
      state.testData = {};
    },
    updateprofileData: (state: any) => {
      console.log("calling");
    },
    updateTestData: (state: any, action) => {
      state.labTestData = action.payload;
    },
    getAllRangeData: (state: any, action) => {
      state.rangeTableData = action.payload;
    },
    clearRangeData: (state) => {
      state.rangeTableData = [];
    },
    updateNewProfileData: (state: any, action) => {
      state.updatedProfileData = state.updatedProfileData.concat(
        action.payload
      );
    },
    clearNewTestData: (state: any) => {
      state.newTestData = [];
    },
    clearComponentData: (state: any) => {
      state.componentData = {};
    },
  },
  extraReducers: (builder) => {
    // GET ALL CATEGORIES

    builder.addCase(getLabCategory.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getLabCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.categoryData = action.payload?.data
    })
    builder.addCase(getLabCategory.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET ALL LAB TEST PROFILE

    builder.addCase(getAllLabTestProfile.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllLabTestProfile.fulfilled, (state, action) => {
      state.isLoading = false
      state.testProfileData = action.payload?.data
    })
    builder.addCase(getAllLabTestProfile.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // CREATE LAB TEST PROFILE

    builder.addCase(createLabTestProfile.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createLabTestProfile.fulfilled, (state, action) => {
      state.isLoading = false
      state.testProfileInfo = action.payload
    })
    builder.addCase(createLabTestProfile.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // EDIT LAB TEST PROFILE

    builder.addCase(editLabTestProfile.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(editLabTestProfile.fulfilled, (state, action) => {
      state.isLoading = false
      state.testProfileInfo = action.payload
    })
    builder.addCase(editLabTestProfile.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET LAB TEST PROFILE

    builder.addCase(getLabTestProfile.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getLabTestProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profileData = action.payload;
      state.updatedProfileData = action.payload.labtest_ids?.map(
        (item: any) => {
          let updateData = { ...item, is_active: !item.is_active };
          return updateData;
        }
      );
    });
    builder.addCase(getLabTestProfile.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET ALL LAB SAMPLE TYPE

    builder.addCase(getAllLabSampleType.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllLabSampleType.fulfilled, (state, action) => {
      state.isLoading = false
      state.sampleTypeData = action.payload?.data
    })
    builder.addCase(getAllLabSampleType.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET ALL LAB UNIT

    builder.addCase(getAllLabUnit.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllLabUnit.fulfilled, (state, action) => {
      state.isLoading = false
      state.labUnitData = action.payload?.data
    })
    builder.addCase(getAllLabUnit.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET ALL LAB COMPONENT

    builder.addCase(getAllLabComponent.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllLabComponent.fulfilled, (state, action) => {
      state.isLoading = false
      state.labComponentData = action.payload?.data
    })
    builder.addCase(getAllLabComponent.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // CREATE LAB TEST

    builder.addCase(createLabTest.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createLabTest.fulfilled, (state, action) => {
      state.isLoading = false
      state.testInfo = action.payload
    })
    builder.addCase(createLabTest.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // EDIT LAB TEST

    builder.addCase(editLabTest.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(editLabTest.fulfilled, (state, action) => {
      state.isLoading = false
      state.testInfo = action.payload
    })
    builder.addCase(editLabTest.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET LAB TEST

    builder.addCase(getLabTest.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getLabTest.fulfilled, (state, action) => {
      state.isLoading = false
      state.testData = action.payload
    })
    builder.addCase(getLabTest.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET ALL LAB TEST

    builder.addCase(getAllLabTest.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllLabTest.fulfilled, (state, action) => {
      state.isLoading = false
      state.labTestData = action.payload?.data
    })
    builder.addCase(getAllLabTest.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // CREATE COMPONENT

    builder.addCase(createLabComponent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createLabComponent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.componentInfo = action.payload;
    });
    builder.addCase(createLabComponent.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // GET COMPONENT

    builder.addCase(getLabComponent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLabComponent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.componentData = action.payload;
    });
    builder.addCase(getLabComponent.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // UPDATE COMPONENT

    builder.addCase(updateLabComponent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateLabComponent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.componentInfo = action.payload;
    });
    builder.addCase(updateLabComponent.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // DELETE COMPONENT

    builder.addCase(deleteComponent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteComponent.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.componentInfo = action.payload;
    });
    builder.addCase(deleteComponent.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });
  },
})

export const {
  handleSelectTest,
  handleDeSelectTest,
  clearLabTestData,
  clearProfileData,
  updateprofileData,
  updateTestData,
  cleartestData,
  getAllRangeData,
  clearRangeData,
  updateNewProfileData,
  clearNewTestData,
  clearComponentData,
} = LabSlice.actions;
export default LabSlice.reducer;
