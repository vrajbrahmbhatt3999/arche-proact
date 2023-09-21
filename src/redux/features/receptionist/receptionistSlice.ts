import { createSlice } from '@reduxjs/toolkit'
import { IReceptionist } from '../../../interfaces/apiInterface'
import {
  questionnairesOtpReSend,
  questionnairesOtpSend,
  questionnairesOtpVerify,
  shareQuestionnaireLink,
  createTodoList,
  deleteTodoList,
  getAllTodoList,
  getAllTodoListById,
  updateTodoList,
  getAllMedicalCenterNews,
  getAllDoctorList,
  getAllDentistList,
  getDoctorById,
  // getAllMedicalCenterNewsByID,
} from './receptionistAsyncActions'
import { questionData } from '../../../constants/data'
import { actions } from 'react-table'

export const initialState: IReceptionist = {
  loading: false,
  isLoading: false,
  shareQuestionnaireInfo: {},
  otpInfo: {},
  numberOfotpAttempt: 0,
  questionnaireData: [],
  todoListData: [],
  todoListDataById: {},
  medicalCenterNewsData: [],
  doctorListData: [],
  doctorListDataObject: {},
  doctorDataById: {},
  dentistListData: [],
  dentistListDataObject: {},
  dentistDataById: {},
  error: null,
}

export const receptionistSlice = createSlice({
  name: 'receptionist',
  initialState,
  reducers: {
    clearTodoState: (state) => {
      state.loading = false
      state.error = ''
      state.todoListDataById = {}
    },
    clearDoctorIdState: (state) => {
      state.doctorDataById = {}
    },
  },
  extraReducers: (builder) => {
    // SHARE QUESTIONNAIRE LINK
    builder.addCase(shareQuestionnaireLink.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(shareQuestionnaireLink.fulfilled, (state, action) => {
      state.isLoading = false
      state.shareQuestionnaireInfo = action.payload
    })
    builder.addCase(shareQuestionnaireLink.rejected, (state, error) => {
      state.isLoading = false
      state.shareQuestionnaireInfo = {}
      state.error = error
    })

    // QUESTIONNAIRE OTP SEND

    builder.addCase(questionnairesOtpSend.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(questionnairesOtpSend.fulfilled, (state, action) => {
      state.isLoading = false
      state.otpInfo = action.payload
    })
    builder.addCase(questionnairesOtpSend.rejected, (state, error) => {
      state.isLoading = false
      state.otpInfo = {}
      state.error = error
    })

    // QUESTIONNAIRE OTP RESEND

    builder.addCase(questionnairesOtpReSend.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(questionnairesOtpReSend.fulfilled, (state, action) => {
      state.isLoading = false
      state.otpInfo = action.payload
      state.numberOfotpAttempt = state.numberOfotpAttempt + 1
    })
    builder.addCase(questionnairesOtpReSend.rejected, (state, error) => {
      state.isLoading = false
      state.otpInfo = {}
      state.error = error
    })

    // QUESTIONNAIRE OTP VERIFY

    // builder.addCase(questionnairesOtpVerify.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(questionnairesOtpVerify.fulfilled, (state) => {
    //   state.isLoading = false;
    // });
    // builder.addCase(questionnairesOtpVerify.rejected, (state, error) => {
    //   state.isLoading = false;
    //   state.error = error;
    // });

    // Receiptionist module :- doctor list
    builder
      .addCase(getAllDoctorList.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllDoctorList.fulfilled, (state, action) => {
        state.loading = false
        state.doctorListData = action?.payload?.data
        state.doctorListDataObject = action?.payload
      })
      .addCase(getAllDoctorList.rejected, (state, error) => {
        state.loading = false
        state.error = error
      })

    builder
      .addCase(getAllDentistList.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllDentistList.fulfilled, (state, action) => {
        state.loading = false
        state.dentistListData = action?.payload?.data
        state.dentistListDataObject = action?.payload
      })
      .addCase(getAllDentistList.rejected, (state, error) => {
        state.loading = false
        state.error = error
      })

    // getTodoById
    builder
      .addCase(getDoctorById.pending, (state) => {
        state.loading = true
      })
      .addCase(getDoctorById.fulfilled, (state, action) => {
        state.loading = false
        state.doctorDataById = action.payload
      })
      .addCase(getDoctorById.rejected, (state, error) => {
        state.loading = false
        state.error = error
        state.doctorDataById = {}
      })

    // Todo : receiptionist module
    builder
      .addCase(getAllTodoList.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllTodoList.fulfilled, (state, action) => {
        state.loading = false
        state.todoListData = action?.payload?.data
      })
      .addCase(getAllTodoList.rejected, (state, error) => {
        state.loading = false
        state.error = error
      })
    // getTodoById
    builder
      .addCase(getAllTodoListById.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllTodoListById.fulfilled, (state, action) => {
        state.loading = false
        state.todoListDataById = action.payload
      })
      .addCase(getAllTodoListById.rejected, (state, error) => {
        state.loading = false
        state.error = error
        state.todoListDataById = {}
      })

    // create Todo list
    builder
      .addCase(createTodoList.pending, (state) => {
        state.loading = true
      })
      .addCase(createTodoList.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(createTodoList.rejected, (state, error) => {
        state.loading = false
        state.error = error
      })

    //update Todo list
    builder
      .addCase(updateTodoList.pending, (state) => {
        state.loading = true
      })
      .addCase(updateTodoList.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateTodoList.rejected, (state, error) => {
        state.loading = false
        state.error = error
      })

    //delete Todo list
    builder
      .addCase(deleteTodoList.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteTodoList.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deleteTodoList.rejected, (state, error) => {
        state.loading = false
        state.error = error
      })

    // SHARE QUESTIONNAIRE LINK
    // builder.addCase(shareQuestionnaireLink.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(shareQuestionnaireLink.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.shareQuestionnaireInfo = action.payload;
    // });
    // builder.addCase(shareQuestionnaireLink.rejected, (state, error) => {
    //   state.isLoading = false;
    //   state.shareQuestionnaireInfo = {};
    //   state.error = error;
    // });

    // QUESTIONNAIRE OTP SEND

    // builder.addCase(questionnairesOtpSend.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(questionnairesOtpSend.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.otpInfo = action.payload;
    // });
    // builder.addCase(questionnairesOtpSend.rejected, (state, error) => {
    //   state.isLoading = false;
    //   state.otpInfo = {};
    //   state.error = error;
    // });

    // QUESTIONNAIRE OTP VERIFY

    builder.addCase(questionnairesOtpVerify.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(questionnairesOtpVerify.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(questionnairesOtpVerify.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
      state.numberOfotpAttempt = state.numberOfotpAttempt + 1
    })

    //mc news
    builder
      .addCase(getAllMedicalCenterNews.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllMedicalCenterNews.fulfilled, (state, action) => {
        state.loading = false
        state.medicalCenterNewsData = action.payload?.data
      })
      .addCase(getAllMedicalCenterNews.rejected, (state, error) => {
        state.loading = false
        state.error = error
      })

    //mc news by Id
    // builder
    //   .addCase(getAllMedicalCenterNewsByID.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(getAllMedicalCenterNewsByID.fulfilled, (state, action) => {
    //     state.loading = false;
    //     // state.medicalCenterNewsDataObject = action.payload?.data;
    //   })
    //   .addCase(getAllMedicalCenterNewsByID.rejected, (state, error) => {
    //     state.loading = false;
    //     state.error = error;
    //   });
  },
})

export const { clearTodoState, clearDoctorIdState } = receptionistSlice.actions
export default receptionistSlice.reducer
