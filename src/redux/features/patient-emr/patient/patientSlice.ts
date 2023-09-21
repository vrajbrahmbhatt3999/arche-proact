import { createSlice } from "@reduxjs/toolkit";
import { questionData } from "../../../../constants/data";
import { IPatient } from "../../../../interfaces/apiInterface";
import {
  assignTag,
  // createMedicalHistory,
  getAllAssignTag,
  // getAllMedicalHistory,
  // createPatientEmr,
  // deletePatientEmr,
  // getAllMedicalTimeline,
  // getAllPatientAppointment,
  // getAllTodayPatient,
  getRecentMedicalHistory,
  // updateAppointmentStatus,
  // createPatientEmr,
  // getAllMedicalTimeline,
  // getAllPatientList,
  // getAllTodayPatient,
  createPatientEmr,
  deletePatientEmr,
  createMedicalHistory,
  getAllMedicalHistory,
  getAllMedicalTimeline,
  getAllPatientList,
  // getAllTodayPatient,
  getPatientBranchList,
  getPatientEmrById,
  getPatientSelectionList,
  updatePatientEmr,
  createInsurancePlan,
  getAllInsurancePlan,
  createAddtionalFields,
  getPatientAddtionalFields,
  // getRecentMedicalHistory,
  // updateAppointmentStatus,
} from "./patientAsyncAction";
import { useLocation } from "react-router-dom";

export const initialState: IPatient = {
  isLoading: false,
  assignTagInfo: {},
  todayAppointmentData: [],
  todayAppointmentDoctorData: [],
  timelineData: [],
  questionnaireData: [],
  medicalHistoryInfo: {},
  medicalHistoryData: [],
  appointmentData: [],
  patientListData: [],
  patientListDataObject: {},
  patientDataObjectById: {},
  nationalityData: [],
  bloodGroupData: [],
  sourceData: [],
  maritalStatusData: [],
  patientBranchList: {},
  assignTagInfoData: [],
  insurancePlanInfo: {},
  patientInsurancePlan: [],
  formNameData: "",
  error: null,
  emrLoader: false,
  addtionalFieldData: [],
};

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    clearPatientData: (state) => {
      state.patientDataObjectById = {};
    },

    submitQuestionniare: (state: any, action: any) => {
      const id = action.payload;
      const yesId = action.payload;
      const noId = action.payload;

      state.questionnaireData = state.questionnaireData.map((item: any) => {
        if (item.queId === id) {
          if (item.yesId === yesId) {
            item = {
              ...item,
              isY: !item.isY,
              isN: item.isY === true ? false : true,
              // isY: item.yesId === yesId && !item.isY,
              // isN: item.yesId === yesId && item.isY === true ? false : true,
              // isN: item.yesId === yesId && item.isN !== Y ? false : true,
              // isN: !item.isY === true && item.isN === true ? false : true,
              // isY: !Y,
              // isN: false,
            };
          } else {
            item = {
              isY: item.isY,
              isN: item.isN,
            };
          }
        }
        if (item.queId === id) {
          if (item.noId === noId) {
            item = {
              ...item,
              isN: !item.isN,
              isY: !item.isN === true ? false : true,
              // isN: item.noId === noId && !item.isN,
              // isY: item.noId === item.noId && !item.isN === true ? false : true,
              // isY: item.noId === noId && item.isN === true ? false : true,
              // isY:
              //   item.noId === noId && isN === true && item.isY === true
              //     ? false
              //     : true,
              // isY: item.isN === true ? false : true,
              // isY: item.noId === noId && item.isY,
              // isN: item.noId === noId && !item.isN,
            };
          } else {
            item = {
              isY: item.isY,
              isN: item.isN,
            };
          }
        }

        return item;
      });
    },
    submitQuestionniareNew: (state: any, action: any) => {
      const id = action.payload;
      const noId = action.payload;

      state.questionnaireData = state.questionnaireData.map((item: any) => {
        if (item.queId === id) {
          if (item.noId === noId) {
            item = {
              ...item,
              isN: !item.isN,
              isY: !item.isN === true ? false : true,
            };
          } else {
            item = {
              isY: item.isY,
              isN: item.isN,
            };
          }
        }

        return item;
      });
    },
    // clearPatientData: (state) => {
    //   state.patientDataObjectById = {};
    // },
    setAssignTagData: (state: any, action: any) => {
      const _id = action.payload;

      state.assignTagInfoData = state.assignTagInfoData.map((item: any) => {
        if (item._id === _id) {
          item = { ...item, assigned: !item.assigned };
        }
        return item;
      });
    },
    clearPatientBranch: (state) => {
      state.patientBranchList = {};
    },
    setFormNameData: (state, action) => {
      state.formNameData = action.payload;
    },
    setInitialQuestionnaireData: (state, action) => {
      state.questionnaireData = action.payload;
    },
  },

  extraReducers: (builder) => {
    // ASSIGN TAGS
    builder.addCase(assignTag.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(assignTag.fulfilled, (state, action) => {
      state.isLoading = false;
      state.assignTagInfo = action.payload?.data;
    });
    builder.addCase(assignTag.rejected, (state, error) => {
      state.isLoading = false;
      state.assignTagInfo = {};
      state.error = error;
    });

    // GET ALL ASSIGN TAGS
    builder.addCase(getAllAssignTag.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllAssignTag.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("active >>>>", action.payload);
      state.assignTagInfoData = action.payload;
    });
    builder.addCase(getAllAssignTag.rejected, (state, error) => {
      state.isLoading = false;
      state.assignTagInfoData = [];
      state.error = error;
    });

    // GET ALL MEDICAL TIMELINE DATA
    builder.addCase(getAllMedicalTimeline.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllMedicalTimeline.fulfilled, (state, action) => {
      state.isLoading = false;
      // console.log("action?.payloa neww", action?.payload);
      state.timelineData = action?.payload;
    });
    builder.addCase(getAllMedicalTimeline.rejected, (state, error) => {
      state.isLoading = false;
      state.timelineData = [];
      state.error = error;
    });

    // CREATE MEDICAL HISTORY

    builder.addCase(createMedicalHistory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createMedicalHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.medicalHistoryInfo = action?.payload;
    });
    builder.addCase(createMedicalHistory.rejected, (state, error) => {
      state.isLoading = false;
      state.medicalHistoryInfo = {};
      state.error = error;
    });

    // GET ALL MEDICAL HISTORY

    builder.addCase(getAllMedicalHistory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllMedicalHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.medicalHistoryData = action?.payload;
    });
    builder.addCase(getAllMedicalHistory.rejected, (state, error) => {
      state.isLoading = false;
      state.medicalHistoryData = [];
      state.error = error;
    });

    // GET RECENT MEDICAL HISTORY

    // builder.addCase(getRecentMedicalHistory.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getRecentMedicalHistory.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.medicalHistoryInfo = action?.payload;
    // });
    // builder.addCase(getRecentMedicalHistory.rejected, (state, error) => {
    //   state.isLoading = false;
    //   state.medicalHistoryInfo = {};
    //   state.error = error;
    // });

    // Patient EMR: search module
    builder
      .addCase(getAllPatientList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPatientList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patientListData = action?.payload?.data;
        state.patientListDataObject = action?.payload;
      })
      .addCase(getAllPatientList.rejected, (state, error) => {
        state.isLoading = false;
        state.error = error;
      });

    // Patient EMR: Branch dropdown list
    builder
      .addCase(getPatientBranchList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPatientBranchList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patientBranchList = action.payload;
      })
      .addCase(getPatientBranchList.rejected, (state, error) => {
        state.isLoading = false;
        state.error = error;
      });

    // Patient EMR: getPatientSelection dropdown
    builder
      .addCase(getPatientSelectionList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPatientSelectionList.fulfilled, (state, action) => {
        state.isLoading = false;
        // switch (action?.payload[0]?.category_name) {
        //   case "NATIONALITY":
        //     state.nationalityData = action.payload[0].values;
        //     break;

        //   case "BLOOD_GROUP":
        //     state.bloodGroupData = action.payload[0].values;
        //     break;

        //   case "SOURCE_AD_CAMPAIGN":
        //     state.sourceData = action.payload[0].values;
        //     break;

        //   case "MARITAL_STATUS":
        //     state.maritalStatusData = action.payload[0].values;
        //     break;

        //   default:
        //     break;
        // }
        state.nationalityData = action.payload;
      })
      .addCase(getPatientSelectionList.rejected, (state, error) => {
        state.isLoading = false;
        state.error = error;
      });

    // Patient EMR: getPatientById
    builder
      .addCase(getPatientEmrById.pending, (state) => {
        state.isLoading = true;
        state.emrLoader = true;
      })
      .addCase(getPatientEmrById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.emrLoader = false;
        state.patientDataObjectById = action.payload;
      })
      .addCase(getPatientEmrById.rejected, (state, error) => {
        state.isLoading = false;
        state.emrLoader = false;
        state.error = error;
      });

    // Patient EMR: create
    builder
      .addCase(createPatientEmr.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPatientEmr.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createPatientEmr.rejected, (state, error) => {
        state.isLoading = false;
        state.error = error;
      });

    // Patient EMR: update
    builder
      .addCase(updatePatientEmr.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePatientEmr.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePatientEmr.rejected, (state, error) => {
        state.isLoading = false;
        state.error = error;
      });

    // Patient EMR: delete
    builder
      .addCase(deletePatientEmr.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePatientEmr.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePatientEmr.rejected, (state, error) => {
        state.isLoading = false;
        state.error = error;
      });

    // CREATE MEDICAL HISTORY

    // builder.addCase(createMedicalHistory.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(createMedicalHistory.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.medicalHistoryInfo = action?.payload;
    // });
    // builder.addCase(createMedicalHistory.rejected, (state, error) => {
    //   state.isLoading = false;
    //   state.medicalHistoryInfo = {};
    //   state.error = error;
    // });

    // GET ALL MEDICAL HISTORY

    // builder.addCase(getAllMedicalHistory.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getAllMedicalHistory.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.medicalHistoryData = action?.payload;
    // });
    // builder.addCase(getAllMedicalHistory.rejected, (state, error) => {
    //   state.isLoading = false;
    //   state.medicalHistoryData = [];
    //   state.error = error;
    // });

    // GET RECENT MEDICAL HISTORY

    builder.addCase(getRecentMedicalHistory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRecentMedicalHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.medicalHistoryInfo = action?.payload;
    });
    builder.addCase(getRecentMedicalHistory.rejected, (state, error) => {
      state.isLoading = false;
      state.medicalHistoryInfo = {};
      state.error = error;
    });

    // CREATE INSURANCE PLAN PATIENT EMR

    builder.addCase(createInsurancePlan.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createInsurancePlan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.insurancePlanInfo = action?.payload;
    });
    builder.addCase(createInsurancePlan.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // GET ALL PATIENT INSURANCE PLAN

    builder.addCase(getAllInsurancePlan.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllInsurancePlan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.patientInsurancePlan = action?.payload;
    });
    builder.addCase(getAllInsurancePlan.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // create additional fields
    builder
      .addCase(createAddtionalFields.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAddtionalFields.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createAddtionalFields.rejected, (state, error) => {
        state.isLoading = false;
        state.error = error;
      });

    builder
      .addCase(getPatientAddtionalFields.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPatientAddtionalFields.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addtionalFieldData = action?.payload;
      })
      .addCase(getPatientAddtionalFields.rejected, (state, error) => {
        state.isLoading = false;
        state.error = error;
      });
  },
});

// export const { submitQuestionniare, submitQuestionniareNew } =
//   patientSlice.actions;
// export const { clearPatientData } = patientSlice.actions;
export const {
  clearPatientData,
  submitQuestionniare,
  submitQuestionniareNew,
  setAssignTagData,
  clearPatientBranch,
  setFormNameData,
  setInitialQuestionnaireData,
} = patientSlice.actions;

export default patientSlice.reducer;
