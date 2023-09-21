import { createSlice } from "@reduxjs/toolkit";
import { IInventoryRequest } from "../../../interfaces/apiInterface";
import {
  addInventoryIssueDataAll,
  createInventoryRequest,
  deleteInventoryReqsItem,
  deleteInventoryRequest,
  editInventoryReqsItem,
  editInventoryRequest,
  getAllInventoryAllPo,
  getAllInventoryItem,
  getAllInventoryRequest,
  getInventoryAllPo,
  getInventoryReqsById,
  getInventoryReqsPdf,
  getInventoryRequestDataAll,
  getInventoryStore,
  getItemFromStore,
  markInventoryReqsAuthorize,
  grnAdd,
} from "./inventoryRequestAsyncActions";

export const initialState: IInventoryRequest = {
  isLoading: false,
  inventoryItemData: [],
  inventoryRequestData: [],
  requestInfo: {},
  requestDetail: {},
  requestItemInfo: {},
  requestPdfData: {},
  inventoryStoreData: [],
  inventoryReqStore: {},
  inventoryReqSource: "",
  error: null,
  inventoryIssueData: [],
  issueCheckStatus: [],
  inventoryPoData: [],
  poCheckStatus: [],
  getAlldirectPoData: [],
  getItemWithStoreData: [],
  getAllInventoryRequestData: [],
  raiseDirectPoData: [],
  directPoStatus: [],
  inventoryReqSourceDept: "",
  inventoryReqSourceRoom: "",
  poFormData: [],
  getIssueId: "",
  getAllInventoryPurchaseOrderData: [],
  selectedPurchaseOrderList: [],
  addTestText: [],
  addGrn: [],
  inventoryRequestDataInfo: {},
  requestSourceTypeEvent: "",
  requestSourceEvent: "",
  inventoryReqSourceBranch: {},
};

export const InventoryRequestSlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    getInventoryReqSource: (state, action) => {
      state.inventoryReqSource = action.payload;
    },
    clearInventoryReqSource: (state) => {
      state.inventoryReqSource = "";
      state.inventoryReqSource = "";
    },
    getInventoryReqSourceBranch: (state, action) => {
      state.inventoryReqSourceBranch = action.payload;
    },
    clearInventoryReqSourceBranch: (state) => {
      state.inventoryReqSourceBranch = {};
    },
    getInventoryReqStore: (state, action) => {
      state.inventoryReqStore = action.payload;
    },
    clearInventoryReqStore: (state) => {
      state.inventoryReqStore = {};
    },
    clearInventoryPurchaseOrderData: (state) => {
      state.selectedPurchaseOrderList = [];
    },
    clearPendingPoData: (state) => {
      state.getAllInventoryPurchaseOrderData = [];
    },
    updatePendingPoData: (state, action) => {
      state.selectedPurchaseOrderList = action.payload;
    },
    updategetAllInventoryPoData: (state, action) => {
      state.getAllInventoryPurchaseOrderData = action.payload;
    },
    getInventoryReqSourceDept: (state, action) => {
      state.inventoryReqSourceDept = action.payload;
    },
    clearInventoryReqSourceDept: (state) => {
      state.inventoryReqSourceDept = "";
    },
    getInventoryReqSourceRoom: (state, action) => {
      state.inventoryReqSourceRoom = action.payload;
    },
    clearInventoryReqSourceRoom: (state) => {
      state.inventoryReqSourceRoom = "";
    },
    getInventoryIssueData: (state, action) => {
      state.inventoryIssueData = [...state.inventoryIssueData, action.payload];
    },
    removeInventoryIssueData: (state, action) => {
      state.inventoryIssueData.splice(action.payload, 1);
    },
    updateInventoryIssueData: (state, action) => {
      state.inventoryIssueData = action.payload;
    },
    clearInventoryIssueData: (state) => {
      state.inventoryIssueData = [];
    },
    getInventoryPoData: (state, action) => {
      state.inventoryPoData = [...state.inventoryPoData, action.payload];
    },
    updateInventoryPoData: (state, action) => {
      state.inventoryPoData = action.payload;
    },
    removeInventoryPoData: (state, action) => {
      state.inventoryPoData.splice(action.payload, 1);
    },
    setIssueCheckStatus: (state, action) => {
      const index = state.issueCheckStatus.indexOf(action.payload);
      if (index > -1) {
        state.issueCheckStatus.splice(index, 1);
      } else {
        state.issueCheckStatus.push(action.payload);
      }
    },
    emptyIssueCheckStatus: (state) => {
      state.issueCheckStatus = [];
    },
    setPoCheckStatus: (state, action) => {
      const index = state.poCheckStatus.indexOf(action.payload);
      if (index > -1) {
        state.poCheckStatus.splice(index, 1);
      } else {
        state.poCheckStatus.push(action.payload);
      }
    },
    setDirectPoStatus: (state, action) => {
      const index = state.directPoStatus.indexOf(action.payload);
      if (index > -1) {
        state.directPoStatus.splice(index, 1);
      } else {
        state.directPoStatus.push(action.payload);
      }
    },
    updateDirectPoStatus: (state, action) => {
      state.directPoStatus = action.payload;
    },
    getPoFormData: (state, action) => {
      state.poFormData = action.payload;
    },
    updatePoFormData: (state, action) => {
      state.poFormData = action.payload;
    },
    emptyPoFormData: (state) => {
      state.poFormData = [];
    },
    updateAllPoData: (state, action) => {
      state.inventoryPoData = action.payload;
    },
    setIssueId: (state, action) => {
      state.getIssueId = action.payload;
    },
    setPurchaseOrderList: (state, action) => {
      state.selectedPurchaseOrderList = [
        ...state.selectedPurchaseOrderList,
        action.payload,
      ];
    },

    setAddText: (state: any, action: any) => {
      const index = state.addTestText.indexOf(action.payload);
      if (index > -1) {
        state.addTestText.splice(index, 1);
      } else {
        state.addTestText.push(action.payload);
      }
    },
    removeFromIPurchaseOrderList: (state, action) => {
      // state.selectedPurchaseOrderList = state.selectedPurchaseOrderList.filter(
      //   (item: any) => {
      //     return item._id !== action.payload;
      //   }
      // );
      state.selectedPurchaseOrderList.splice(action.payload, 1);
    },

    emptyAllPoData: (state) => {
      state.addTestText = [];
    },
    setRequestSourceTypeEvent: (state, action) => {
      state.requestSourceTypeEvent = action.payload;
    },
    setRequestSourceEvent: (state, action) => {
      state.requestSourceEvent = action.payload;
    },
  },
  extraReducers: (builder) => {
    // GET ALL INVENTORY ITEM

    builder.addCase(getAllInventoryItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllInventoryItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.inventoryItemData = action.payload?.data;
    });
    builder.addCase(getAllInventoryItem.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // CREATE INVENTORY REQUEST

    builder.addCase(createInventoryRequest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createInventoryRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.requestInfo = action.payload;
    });
    builder.addCase(createInventoryRequest.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // EDIT INVENTORY REQUEST

    builder.addCase(editInventoryRequest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editInventoryRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.requestInfo = action.payload;
    });
    builder.addCase(editInventoryRequest.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // DELETE INVENTORY REQUEST

    builder.addCase(deleteInventoryRequest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteInventoryRequest.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteInventoryRequest.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // GET ALL INVENTORY REQUEST

    builder.addCase(getAllInventoryRequest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllInventoryRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.inventoryRequestData = action.payload?.data;
      state.inventoryRequestDataInfo = action.payload;
    });
    builder.addCase(getAllInventoryRequest.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // GET INVENTORY REQUEST BY ID

    builder.addCase(getInventoryReqsById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getInventoryReqsById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.requestDetail = action.payload;
    });
    builder.addCase(getInventoryReqsById.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // MARK INVENTORY REQUEST AUTHORIZE

    builder.addCase(markInventoryReqsAuthorize.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(markInventoryReqsAuthorize.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(markInventoryReqsAuthorize.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // GET INVENTORY REQUEST PDF

    builder.addCase(getInventoryReqsPdf.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getInventoryReqsPdf.fulfilled, (state, action) => {
      state.isLoading = false;
      state.requestPdfData = action.payload;
    });
    builder.addCase(getInventoryReqsPdf.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // EDIT INVENTORY REQUEST ITEM

    builder.addCase(editInventoryReqsItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editInventoryReqsItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.requestItemInfo = action.payload;
    });
    builder.addCase(editInventoryReqsItem.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // DELETE INVENTORY REQUEST ITEM

    builder.addCase(deleteInventoryReqsItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteInventoryReqsItem.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteInventoryReqsItem.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // GET INVENTORY STORE

    builder.addCase(getInventoryStore.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getInventoryStore.fulfilled, (state, action) => {
      state.isLoading = false;
      state.inventoryStoreData = action.payload;
    });
    builder.addCase(getInventoryStore.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // GET INVENTORY P0 Mainstore Data

    builder.addCase(getInventoryAllPo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getInventoryAllPo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getAlldirectPoData = action.payload?.data;
    });
    builder.addCase(getInventoryAllPo.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // GET ITEMS FROM STORE

    builder.addCase(getItemFromStore.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getItemFromStore.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getItemWithStoreData = action.payload?.data;
    });
    builder.addCase(getItemFromStore.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // GET INVENTORY DATA

    builder.addCase(getInventoryRequestDataAll.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getInventoryRequestDataAll.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getAllInventoryRequestData = action.payload?.data;
    });
    builder.addCase(getInventoryRequestDataAll.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    //ADD ISSUE DATA MAINSTORE
    builder.addCase(addInventoryIssueDataAll.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addInventoryIssueDataAll.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addInventoryIssueDataAll.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });
    // GET PURCHASE ORDER  DATA
    builder.addCase(getAllInventoryAllPo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllInventoryAllPo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getAllInventoryPurchaseOrderData = action.payload?.data;
    });
    builder.addCase(getAllInventoryAllPo.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    //ADD GRN

    builder.addCase(grnAdd.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(grnAdd.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("payload in slice", state.addGrn);
      state.addGrn = action.payload;
    });
    builder.addCase(grnAdd.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
      console.log("state.error", state.error);
    });
  },
});

export const {
  clearInventoryReqStore,
  getInventoryReqStore,
  clearInventoryReqSource,
  getInventoryReqSource,
  getInventoryIssueData,
  setIssueCheckStatus,
  removeInventoryIssueData,
  getInventoryPoData,
  removeInventoryPoData,
  setPoCheckStatus,
  setDirectPoStatus,
  clearInventoryPurchaseOrderData,
  setPurchaseOrderList,
  removeFromIPurchaseOrderList,
  setAddText,
  clearPendingPoData,
  getInventoryReqSourceDept,
  clearInventoryReqSourceDept,
  getInventoryReqSourceRoom,
  clearInventoryReqSourceRoom,
  updateInventoryIssueData,
  getPoFormData,
  updateAllPoData,
  updatePoFormData,
  setIssueId,
  clearInventoryIssueData,
  updatePendingPoData,
  updategetAllInventoryPoData,
  emptyAllPoData,
  emptyPoFormData,
  setRequestSourceTypeEvent,
  setRequestSourceEvent,
  updateInventoryPoData,
  getInventoryReqSourceBranch,
  clearInventoryReqSourceBranch,
  emptyIssueCheckStatus,
  updateDirectPoStatus,
} = InventoryRequestSlice.actions;
export default InventoryRequestSlice.reducer;
