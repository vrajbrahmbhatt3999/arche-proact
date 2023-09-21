import { createSlice } from '@reduxjs/toolkit';
import { IInsurance } from '../../../interfaces/apiInterface';
import {
  addInsuarnceCompany,
  addInsuarncePlan,
  addmarketplace,
  allInsuarncePlan,
  deleteInsuranceCompanyAttachment,
  deleteInsurancePlanAttachment,
  deleteMarketplaceAttachment,
  getAllInsuarnceCompany,
  getAllInsuarncePlan,
  getAllmarketplace,
  getDepartmentService,
  getInsuranceCompany,
  getInsurancePlan,
  getMarketplace,
  getPlanAllService,
  updateInsuranceCompany,
  updateInsurancePlan,
  updateInsurancePlanDepartment,
  updateMarketplace,
} from './insuranceAsyncActions';

export const initialState: IInsurance = {
  isLoading: false,
  marketplaceData: [],
  marketplaceInfo: {},
  insuranceCompanyData: {},
  insuranceCompanyInfo: {},
  insurancePlanData: [],
  allInsurancePlan: [],
  insurancePlanInfo: {},
  departmentServiceData: [],
  planDepartmentInfo: {},
  deptServiceData: {},
  marketplaceDetail: {},
  insuranceCompanyDetail: {},
  insurancePlanDetail: {},
  palnDepartmentList: [],
  departmentServices: [],
  selectedDepartmentService: {},
  selDeptSrv: [],
  selectedServiceId: [],
  loading: false,
  error: null,
};

export const InsuranceSlice = createSlice({
  name: 'insurance',
  initialState,
  reducers: {
    clearDepartmentServiceData: (state) => {
      state.departmentServiceData = [];
    },
    clearInsuranceCompanyData: (state) => {
      state.insuranceCompanyData = {};
    },
    handleActive: (state: any, action: any) => {
      state.deptServiceData = {
        flag: false,
        id: action.payload?._id,
        name: action.payload,
      };
      state.departmentServiceData = state.departmentServiceData?.map(
        (item: any) => {
          if (item?._id === action?.payload?._id) {
            item = { ...item, checked: !item.checked };
            // if (item?.checked) {
            //   let item_id = item._id;
            //   state.selectedDepartmentService.item_id = {
            //     ...state.selectedDepartmentService,
            //     item_id: item,
            //   };
            // } else {
            //   let item_id = item._id;
            //   delete state.selectedDepartmentService.item_id;
            // }
          }
          // if (item?._id === action?.payload?._id) {
          //   let updateData = { ...item, checked: true };
          //   return updateData;
          // } else {
          //   return item;
          // }
          return item;
        }
      );
    },
    handleAddToNewArray: (state: any, action: any) => {
      const { event, item } = action.payload;
      if (!event) {
        let isExists = state.selDeptSrv?.find((t: any) => t._id === item._id);
        if (!isExists) {
          state.selDeptSrv.push(item);
        }
      } else {
        state.selDeptSrv = state.selDeptSrv?.filter(
          (p: any) => p._id !== item._id
        );
      }
      state.selectedServiceId = state.selDeptSrv?.map((item: any) => {
        return item?._id;
      });
    },
    handleDeactive: (state: any, action: any) => {
      state.deptServiceData = {
        flag: true,
        id: action.payload?._id,
        name: action.payload,
      };
      state.departmentServiceData = state.departmentServiceData?.map(
        (item: any) => {
          if (item?._id === action?.payload?._id) {
            let updateData = { ...item, checked: false };
            return updateData;
          } else {
            return item;
          }
        }
      );
    },
    updatedDeptService: (state: any, action: any) => {
      state.departmentServiceData = action.payload;
    },
    clearDeptServiceData: (state: any) => {
      state.deptServiceData = {};
    },
    clearMarketplaceDetail: (state: any) => {
      state.marketplaceDetail = {};
    },
    clearInsuranceCompanyDetail: (state: any) => {
      state.insuranceCompanyDetail = {};
    },
    clearInsurancePlanDetail: (state: any) => {
      state.insurancePlanDetail = {};
    },
    addPlanDepartment: (state: any, action: any) => {
      state.palnDepartmentList = action.payload;
    },
    clearPlanDepartment: (state: any) => {
      state.palnDepartmentList = [];
    },
    addDepartmentService: (state: any, action: any) => {
      state.selDeptSrv = action.payload;
      state.selectedServiceId = action.payload?.map((item: any) => {
        return item?._id;
      });
    },
    clearDepartmentService: (state: any) => {
      state.selDeptSrv = [];
      state.selectedServiceId = [];
    },
  },
  extraReducers: (builder) => {
    // GET ALL MARKETPLACE

    builder.addCase(getAllmarketplace.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllmarketplace.fulfilled, (state, action) => {
      state.isLoading = false;
      state.marketplaceData = action.payload?.data;
    });
    builder.addCase(getAllmarketplace.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // ADD MARKETPLACE

    builder.addCase(addmarketplace.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addmarketplace.fulfilled, (state, action) => {
      state.isLoading = false;
      state.marketplaceInfo = action.payload;
    });
    builder.addCase(addmarketplace.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // GET MARKETPLACE

    builder.addCase(getMarketplace.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMarketplace.fulfilled, (state, action) => {
      state.loading = false;
      state.marketplaceDetail = action.payload;
    });
    builder.addCase(getMarketplace.rejected, (state, error) => {
      state.loading = false;
      state.error = error;
    });

    // UPDATE MARKETPLACE

    builder.addCase(updateMarketplace.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateMarketplace.fulfilled, (state, action) => {
      state.isLoading = false;
      state.marketplaceInfo = action.payload;
    });
    builder.addCase(updateMarketplace.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // DELETE MARKETPLACE ATTACHMENTS

    builder.addCase(deleteMarketplaceAttachment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteMarketplaceAttachment.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteMarketplaceAttachment.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // GET ALL INSURANCE COMPANY

    builder.addCase(getAllInsuarnceCompany.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllInsuarnceCompany.fulfilled, (state, action) => {
      state.isLoading = false;
      state.insuranceCompanyData = action.payload;
    });
    builder.addCase(getAllInsuarnceCompany.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // ADD INSURANCE COMPANY

    builder.addCase(addInsuarnceCompany.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addInsuarnceCompany.fulfilled, (state, action) => {
      state.isLoading = false;
      state.insuranceCompanyInfo = action.payload;
    });
    builder.addCase(addInsuarnceCompany.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // GET INSURANCE COMPANY

    builder.addCase(getInsuranceCompany.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getInsuranceCompany.fulfilled, (state, action) => {
      state.loading = false;
      state.insuranceCompanyDetail = action.payload;
    });
    builder.addCase(getInsuranceCompany.rejected, (state, error) => {
      state.loading = false;
      state.error = error;
    });

    // UPDATE INSURANCE COMPANY

    builder.addCase(updateInsuranceCompany.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateInsuranceCompany.fulfilled, (state, action) => {
      state.isLoading = false;
      state.insuranceCompanyInfo = action.payload;
    });
    builder.addCase(updateInsuranceCompany.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // DELETE INSURANCE COMPANY ATTACHMENTS

    builder.addCase(deleteInsuranceCompanyAttachment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteInsuranceCompanyAttachment.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      deleteInsuranceCompanyAttachment.rejected,
      (state, error) => {
        state.isLoading = false;
        state.error = error;
      }
    );

    // GET ALL INSURANCE PLAN

    builder.addCase(getAllInsuarncePlan.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllInsuarncePlan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.insurancePlanData = action.payload?.data;
      // state.allInsurancePlan = action.payload?.data;
    });
    builder.addCase(getAllInsuarncePlan.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // ALL INSURANCE PLAN

    builder.addCase(allInsuarncePlan.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(allInsuarncePlan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allInsurancePlan = action.payload?.data;
    });
    builder.addCase(allInsuarncePlan.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // ADD INSURANCE PLAN

    builder.addCase(addInsuarncePlan.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addInsuarncePlan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.insurancePlanInfo = action.payload;
    });
    builder.addCase(addInsuarncePlan.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // GET INSURANCE PLAN

    builder.addCase(getInsurancePlan.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getInsurancePlan.fulfilled, (state, action) => {
      let getServiceData = action?.payload?.services?.map((item: any) => {
        return {
          _id: item?.service_id,
          name: item?.service_name,
          sell_price: item?.price,
          department_id: item?.department_id,
          service_id: item?.service_id,
          service_name: item?.service_name,
          department_name: item?.department_name,
          disounted_price: item?.discounted_price,
          service_no: item?.service_no,
        };
      });
      state.loading = false;
      state.insurancePlanDetail = action.payload;
      state.selDeptSrv = getServiceData;
      state.palnDepartmentList = action?.payload?.departments;
      state.selectedServiceId = getServiceData?.map((item: any) => {
        return item?._id;
      });
    });
    builder.addCase(getInsurancePlan.rejected, (state, error) => {
      state.loading = false;
      state.error = error;
    });

    // UPDATE INSURANCE PLAN

    builder.addCase(updateInsurancePlan.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateInsurancePlan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.insurancePlanInfo = action.payload;
    });
    builder.addCase(updateInsurancePlan.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // DELETE INSURANCE PLAN ATTACHMENTS

    builder.addCase(deleteInsurancePlanAttachment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteInsurancePlanAttachment.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteInsurancePlanAttachment.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // GET DEPARTMENT INSURANCE

    builder.addCase(getPlanAllService.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPlanAllService.fulfilled, (state, action) => {
      state.isLoading = false;
      state.departmentServiceData = action.payload;
    });
    builder.addCase(getPlanAllService.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // UPDATE INSURANCE PLAN DEPARTMENT

    builder.addCase(updateInsurancePlanDepartment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateInsurancePlanDepartment.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.planDepartmentInfo = action.payload;
      }
    );
    builder.addCase(updateInsurancePlanDepartment.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });
  },
});

export const {
  handleActive,
  handleDeactive,
  clearDepartmentServiceData,
  clearInsuranceCompanyData,
  updatedDeptService,
  clearDeptServiceData,
  clearMarketplaceDetail,
  clearInsuranceCompanyDetail,
  clearInsurancePlanDetail,
  addPlanDepartment,
  clearPlanDepartment,
  addDepartmentService,
  clearDepartmentService,
  handleAddToNewArray,
} = InsuranceSlice.actions;
export default InsuranceSlice.reducer;