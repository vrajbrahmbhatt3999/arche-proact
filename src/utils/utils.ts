/* eslint-disable no-lone-blocks */
import { IAPIResponse, IAPIPayload } from '../interfaces/apiInterface';
import { IToastType } from '../interfaces/interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { failure, globalError, success } from '../constants/data';
import {
  setMessage,
  setToolTipMessage,
} from '../redux/features/toast/toastSlice';
import moment from 'moment';
import { store } from '../redux/store/store';

export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const handleRefClick = (ref: any) => {
  if (ref.current) {
    ref.current.click();
  }
};

export const getAPIResponse = (response: IAPIResponse): IAPIResponse => {
  const { dk, payloadResponse, rc } = response;
  return { dk, payloadResponse, rc };
};

export const getToastPayload = (
  msg: string,
  type: IToastType,
  fieldMSG?: string
) => {
  const payload = {
    message: fieldMSG ? `${msg} - ${fieldMSG}` : msg,
    type: type,
  };
  return payload;
};

//Funtion for Create Base64
const getBase64 = (file: File) => {
  return new Promise((resolve) => {
    let baseURL: any = '';
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};

//Funtion for Create DataURI

export const dataURI = async (file: File) => {
  try {
    const result = await getBase64(file);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const createAsyncThunkForSlice = (
  type: string,
  resolver: any,
  options?: { isEncrypt?: boolean; isToast?: boolean; extraParam?: boolean }
) =>
  createAsyncThunk(
    type,
    async (payload: IAPIPayload, { dispatch, rejectWithValue }) => {
      try {
        const res: any = await resolver(payload, options?.extraParam);
        // console.log('payloadRespon/se', res.payloadResponse)
        if (res?.rc === 0) {
          // options?.isEncrypt && res?.dk && dispatch(setEncryptionKey(res?.dk)) // set static key for cryptography
          {
            options?.isToast &&
              dispatch(
                setMessage(
                  getToastPayload(res.payloadResponse.message, success)
                )
              );
          } // set toast notifaction msg for response
          return res.payloadResponse.data;
        } else if (res?.payloadResponse?.sc === 401) {
          dispatch(
            setMessage({
              message: 'Your session has been expired, please login again.',
              type: failure,
            })
          );
          setTimeout(() => {
            localStorage.clear();
            window.location.href = '/';
          }, 1000);

          throw new Error(res.payloadResponse.error[0].message);
        } else {
          {
            options?.isToast &&
              dispatch(
                setMessage(
                  getToastPayload(
                    res.payloadResponse?.error[0].message ?? globalError,
                    failure
                  )
                )
              );
          } // set toast notifaction msg for response
          throw new Error(res.payloadResponse.error[0].message);
        }
      } catch (error: any) {
        {
          options?.isToast &&
            dispatch(
              setMessage(getToastPayload(error.message ?? globalError, failure))
            );
        }
        return rejectWithValue(error.message);
      }
    }
  );

export default createAsyncThunkForSlice;

// Function UTC TO normal date Formate
export const utcToDate = (dateString: string, isForm?: boolean) => {
  const utcDate = new Date(dateString);
  // Convert UTC date to local date
  const localDate = new Date(
    utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
  );
  const day = localDate.getDate().toString().padStart(2, '0');
  // const month = day.toLocaleString();
  const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
  const year = localDate.getFullYear().toString().substr(-4);
  const formattedDate = isForm
    ? `${year}-${month}-${day}`
    : `${day}-${month}-${year}`;
  return formattedDate;
};

// export const handleBirthDateChange = (ageDateString: string) => {
//   const birthDate = new Date(ageDateString);
//   const today = new Date();
//   const years = today.getFullYear() - birthDate.getFullYear();
//   const months = today.getMonth() - birthDate.getMonth();
//   const days = today.getDate() - birthDate.getDate();
//   let ageStr = "";
//   if (months < 0 || (months === 0 && days < 0)) {
//     ageStr = `${years - 1}yr  ${12 + months}m  ${30 + days}d`;
//   } else {
//     ageStr = `${years}yr  ${months}m  ${days}d`;
//   }
//   return ageStr;
// };

export const handleBirthDateChange = (selectedDate: any) => {
  const birthDate = new Date(selectedDate);
  const today = new Date();
  const years = today.getFullYear() - birthDate.getFullYear();
  const months = today.getMonth() - birthDate.getMonth();
  const days = today.getDate() - birthDate.getDate();
  let ageStr = '';
  if (months < 0 || (months === 0 && days < 0)) {
    ageStr = `${years - 1}yr  ${12 + months}m  ${30 + days}d`;
  } else {
    ageStr = `${years}yr  ${months}m  ${days}d`;
  }
  return ageStr;
};

export const calculateAge = (selectedDate: any) => {
  let today = new Date();
  let dob = new Date(selectedDate);
  let diff = today.getTime() - dob.getTime();
  let years = Math.floor(diff / 31556736000);
  let daysDiff = Math.floor((diff % 31556736000) / 86400000);
  let months = Math.floor(daysDiff / 30.4167);
  let days = Math.floor(daysDiff % 30.4167);
  let ageStr = `${years}yr  ${months}m  ${days}d`;
  return ageStr;
};

export const trimValue = (e: any) => {
  let value = e.target.value;
  if (value.length === 1 && value === ' ') {
    e.target.value = '';
  } else if (
    value.length > 1 &&
    value[0] === ' ' &&
    value[value.length - 1] === ' '
  ) {
    value = value.trim();
    const words = value.split(' ');
    const filteredWords = words.filter((word: any) => word !== '');
    e.target.value = filteredWords.join(' ');
  } else if (value.length > 1 && value[0] === ' ') {
    e.target.value = value.trim();
  }
};

// Disable up down arrow
export const disableArrowKey = (e: KeyboardEvent): void => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault();
  }
};

// Disable Scroll Event for input type number
export const disableScroll = () => {
  const input = document.querySelector('input[type=number]');
  const handleWheel = (event: any) => {
    if (input === document.activeElement) {
      event.preventDefault();
    }
  };
  input && input.addEventListener('wheel', handleWheel, { passive: false });
  return () => {
    input && input.removeEventListener('wheel', handleWheel);
  };
};

// Function for converting time to AM and PM format
export const convertTimeTo12HourFormat = (timeStr: any) => {
  const [hour, minute] = timeStr.split(':');
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 0;
  return `${hour12}:${minute} ${period}`;
};

export const getDataUriFileSize = (dataUri: any) => {
  const byteCharacters = atob(dataUri?.split(',')[1]);
  const byteNumbers = new Array(byteCharacters?.length);

  for (let i = 0; i < byteCharacters?.length; i++) {
    byteNumbers[i] = byteCharacters?.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray]);

  return blob?.size;
};

export function isDataUri(variable: any) {
  const pattern =
    /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9]+)?(;[a-zA-Z0-9-]+=[a-zA-Z0-9-]+)*;base64,(.*)$/;
  return pattern.test(variable);
}

export const checkConsecutiveTimeSlots = (
  timeSlots: any[],
  duration: number
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const dateObjects: any = timeSlots
      .map((time) => new Date(`2000-01-01T${time}:00`))
      .sort((a: any, b: any) => a - b);
    // console.log("dateObjects >> ", dateObjects);
    for (let i = 0; i < dateObjects.length - 1; i++) {
      const diffInMs = dateObjects[i + 1] - dateObjects[i];
      if (diffInMs !== duration * 60 * 1000) {
        reject(false); // time slots are not consecutive
        return; // exit the function early if time slots are not consecutive
      }
    }
    resolve(true); // time slots are consecutive
  });
};

export const sortArray = (arr: any[]) => {
  const sorted =
    arr &&
    arr.length > 0 &&
    arr.sort((a: any, b: any) => {
      const timeA = a.value;
      const timeB = b.value;
      if (timeA < timeB) {
        return -1;
      }
      if (timeA > timeB) {
        return 1;
      }
      return 0;
    });
  return sorted;
};

export const appointmentDuration = (slots: any, duration: number) => {
  return slots?.length * duration;
};

export const compareDates = (d1: any, d2: any) => {
  let date1 = new Date(d1).getTime();
  let date2 = new Date(d2).getTime();

  if (date1 < date2) {
    console.log(`${d1} is less than ${d2}`);
    return false;
  } else if (date1 > date2) {
    console.log(`${d1} is greater than ${d2}`);
    return false;
  } else {
    console.log(`Both dates are equal`);
    return true;
  }
};

export const getCustomDateFromTime = (time: string) => {
  const h: any = time.split(':')[0] || time;
  const m: any = time.split(':')[1] || 0;

  return 60 * parseInt(h) + parseInt(m);
};

export const checkDoctorAvailabilty = ({ day, timeSlot, shift }: any) => {
  const {
    shift_one_start,
    shift_one_end,
    shift_one_days,
    shift_two_start,
    shift_two_end,
    shift_two_days,
  } = shift;
  if (shift) {
    if (shift_one_days?.includes(day)) {
      const startDate = getCustomDateFromTime(shift_one_start);
      const midDate = getCustomDateFromTime(timeSlot);
      const lastDate = getCustomDateFromTime(shift_one_end);

      if (startDate < midDate && lastDate > midDate) {
        return true;
      }
    }

    if (shift_two_days?.includes(day)) {
      const startDate = getCustomDateFromTime(shift_two_start);
      const midDate = getCustomDateFromTime(timeSlot);
      const lastDate = getCustomDateFromTime(shift_two_end);
      console.log(startDate, midDate, lastDate);
      if (startDate < midDate && lastDate > midDate) {
        return true;
      }
    }
  } else {
    return false;
  }
  return false;
};

export const createSlots = (
  startTime: any,
  endTime: any,
  genrateSlots?: Boolean
) => {
  const slots: any = [];

  while (startTime < endTime) {
    const slotEndTime = new Date(startTime.getTime() + 15 * 60000); // add 15 minutes to the start time
    const startTimeHours = startTime.getHours();
    const startTimeMinutes = startTime.getMinutes();
    // console.log("startTime", startTime.getMinutes());
    slots.push(
      `${startTimeHours < 10 ? `0${startTimeHours}` : startTimeHours}:${
        startTimeMinutes < 10 ? `0${startTimeMinutes}` : startTimeMinutes
      }`
    );
    startTime = slotEndTime;
  }
  if (slots?.length > 0 && genrateSlots) {
    const tempArray = slots?.map((item: any, index: number) => {
      const startTime = item;
      const endTime = moment(startTime, 'HH:mm')
        .add(15, 'minutes')
        .format('HH:mm');
      const label = `${startTime} to ${endTime}`;
      return { label, value: item };
    });
    return tempArray;
  } else {
    return slots;
  }
};

export const getShiftTimeRange = (data: any[]) => {
  let smallestTime: any = null;
  let highestTime: any = null;

  data.length > 0 &&
    data.forEach((shift: any) => {
      // parse shift times into Date objects
      const start1 = new Date(
        `2023-01-01T${shift?.shift_one_start
          ?.replace(/^(\d{1}):/, '0$1:')
          ?.replace(/:(\d{1})$/, ':0$1')}`
      );
      const end1 = new Date(
        `2023-01-01T${shift.shift_one_end
          ?.replace(/^(\d{1}):/, '0$1:')
          ?.replace(/:(\d{1})$/, ':0$1')}`
      );
      const start2 = new Date(
        `2023-01-01T${shift.shift_two_start
          ?.replace(/^(\d{1}):/, '0$1:')
          ?.replace(/:(\d{1})$/, ':0$1')}`
      );
      const end2 = new Date(
        `2023-01-01T${shift.shift_two_end
          ?.replace(/^(\d{1}):/, '0$1:')
          ?.replace(/:(\d{1})$/, ':0$1')}`
      );

      // update smallest and highest times seen so far
      if (!smallestTime || start1 < smallestTime) {
        smallestTime = start1;
      }
      if (!smallestTime || start2 < smallestTime) {
        smallestTime = start2;
      }
      if (!highestTime || end1 > highestTime) {
        highestTime = end1;
      }
      if (!highestTime || end2 > highestTime) {
        highestTime = end2;
      }
    });
  // console.log('Smallest time:', smallestTime)
  // console.log('Highest time:', highestTime)
  return {
    hourStart: smallestTime?.getHours() || 0,
    hourEnd: highestTime?.getHours() || 23,
  };
};

export const getValuesForSelectOptions = (arr1: any[], arr2: any[]) => {
  const matchingItems = arr2.filter((obj) => arr1?.includes(obj._id));
  let options: any[] = [];
  options =
    matchingItems.length > 0
      ? matchingItems?.map((item) => {
          return { label: item?.name, value: item?._id };
        })
      : [];
  return options;
};

export const navigateAfterLogin = (userRole: string) => {
  const permissionsObject: any = {
    MC_ADMIN: {
      navigateTo: 'medicalcenter/branch',
    },
    RECEPTIONIST: {
      navigateTo: '/receptionist',
    },
    DOCTOR: {
      navigateTo: '/doctor',
    },
    LAB_SUPERVISOR: {
      navigateTo: '/job',
    },
    RADIOLOGY_SUPERVISOR: {
      navigateTo: '/job',
    },
    PHARMACY_SALESPERSON: {
      navigateTo: '/pharmacy',
    },
    DENTIST: {
      navigateTo: '/dentist',
    },
  };
  let permission = permissionsObject[userRole] || {};
  return permission;
};
/* Object to change default styles of searchable select - React Select */

export const handleAddSearchableSelectStyle = (tempDimensionObj: any) => {
  return {
    control: (base: any, state: any) => ({
      ...base,
      border: '1px solid #CDD4D8',
      width: tempDimensionObj.width,
      height: tempDimensionObj.height,
      minHeight: '0px',
      background: '#FFFFFF',
      borderRadius: '6px',
      cursor: 'pointer',
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {
        border: '1px solid #CDD4D8',
      },
    }),
    indicatorSeparator: (styles: any) => ({ display: 'none' }),
  };
};
export const searchableSelectStyle = {
  control: (base: any, state: any) => ({
    ...base,
    border: '1px solid #CDD4D8',
    width: '234px',
    height: '42px',
    background: '#FFFFFF',
    borderRadius: '6px',
    cursor: 'pointer',
    // This line disable the blue border
    boxShadow: state.isFocused ? 0 : 0,
    '&:hover': {
      border: '1px solid #CDD4D8',
    },
  }),
  indicatorSeparator: (styles: any) => ({ display: 'none' }),
};
/* Object to change default styles of searchable select - React Select */

/* Object to change default styles of searchable select for data table - React Select */
export const searchableSelectStyleForDataTable = {
  control: (base: any, state: any) => ({
    ...base,
    border: '1px solid #CDD4D8',
    width: '150px',
    minHeight: '0px',
    height: '29px',
    background: '#FFFFFF',
    borderRadius: '6px',
    cursor: 'pointer',
    padding: '0px',
    // This line disable the blue border
    boxShadow: state.isFocused ? 0 : 0,
    '&:hover': {
      border: '1px solid #CDD4D8',
    },
  }),
  indicatorSeparator: (styles: any) => ({ display: 'none' }),
};
/* Object to change default styles of searchable select for data table - React Select */

export const formatDate = (dateString: any) => {
  var date = new Date(dateString);
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, '0');
  var day = String(date.getDate()).padStart(2, '0');

  var outputString = year + '-' + month + '-' + day;

  return outputString;
};
/* Object to change default styles of searchable select for data table - React Select */

/* Function to generate random unique Id */
export function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}
/* Function to generate random unique Id */

export function allowedNumberOfDigitsAfterDecimal(
  value: any,
  totalDigits: any
) {
  let tempVal = value ? value : 0;
  let tempDigitsAfterDecimal = totalDigits;
  if (!isNaN(tempVal)) {
    tempVal = tempVal * 1;
  }
  tempVal = tempVal?.toFixed(tempDigitsAfterDecimal);

  return tempVal;
}

export const checkSameImgCategory = (records: any[], matchKey: string) => {
  if (records.length === 0) {
    return false; // No records to compare
  }

  const firstImgCategory = records[0].diag[matchKey];
  if (records?.length > 0) {
    for (let i = 1; i < records.length; i++) {
      if (records[i].diag[matchKey] !== firstImgCategory) {
        return false; // Found a different img_category
      }
    }
  }

  return true; // All img_category values are the same
};

export const createServiceArray = (
  service: any,
  arr: any,
  plan: any,
  user: any
) => {
  try {
    console.log('service', service);
    const {
      name,
      price,
      discount,
      sessions,
      _id,
      insurance_plan_id,
      insurance_plan_name,
    } = service;
    const { doctor_id, doctor_name, attended_by_id } = user;
    const netPrice = allowedNumberOfDigitsAfterDecimal(
      (service.price || 0) - service.discount,
      3
    );

    // Create multiple rows for each service based on the number of sessions
    for (let i = 1; i <= sessions; i++) {
      // Create a new row of data for each session of the service
      let rowData = {
        treatmentPlanName: i === 1 ? plan?.label : '-',
        plan_id: plan?.value,
        name: i === 1 ? name : '-',
        insurance_plan_name: insurance_plan_name ? insurance_plan_name : '-',
        price,
        discount,
        sessionsIndex: i,
        sessions: i === 1 ? sessions : '-',
        netPrice,
        service_id: _id,
        sessionId: uniqueID(),
        doctor_id,
        doctor_name,
        status: 'new',
        billable: true,
        billed: insurance_plan_id ? 'to-be-billed' : 'not-billed',
        note: '',
        attended_by_id,
        insurance_plan_id,
      };

      // Add the row data to the table data array
      arr.push(rowData);
    }
  } catch (e) {
    console.log('e', e);
  }
};

export const createServiceData = (selectedPlan: any, user: any) => {
  // Create an array to store the table data
  const tableData: any[] = [];

  // Iterate over the service_ids array of the selected plan
  selectedPlan.service_ids.forEach((service: any) => {
    createServiceArray(service, tableData, selectedPlan, user);
  });

  // Now you can use the tableData array to populate the table component
  return tableData;
};

export const checkExpiryDate = (date: any) => {
  let date1 = new Date(date);
  let currentDate = new Date();

  if (date1 < currentDate) {
    return false;
  } else if (date1 > currentDate) {
    return true;
  } else {
    return false;
  }
};

export const handleCalculatePriceAndDiscount = (arr: any[]) => {
  let discount = 0,
    totalPrice = 0,
    netPrice = 0;
  arr.forEach((element: any) => {
    discount += Number(element.discount) || 0;
    totalPrice += Number(element.price) || 0;
    // netPrice += Number(element.netPrice) || 0
  });
  netPrice = totalPrice - discount;
  return { discount, totalPrice, netPrice };
};

export const getUniqueServiceIds = (data: any) => {
  const uniqueIds = new Set();

  for (const obj of data) {
    console.log('obj>>', obj);
    obj.sessions !== '-' &&
      uniqueIds.add({ id: obj.service_id, sessions: Number(obj.sessions) });
  }

  return Array.from(uniqueIds);
};

// capitalize first letter
export const capitalizeFirstLetter = (str: any) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const handleCalculatePriceDiscountAndNetAmount = (arr: any[]) => {
  let discount = 0,
    totalPrice = 0,
    netAmount = 0;
  arr?.forEach((element: any) => {
    discount += Number(element.discount) || 0;
    totalPrice += Number(element.unitPrice) || 0;
    // netAmount += Number(element.netAmount) || 0;
  });
  netAmount = totalPrice - discount;

  return { discount, totalPrice, netAmount };
};

export const handleKeyDown = (e: any) => {
  const { value } = e.target;
  const [beforeDecimal, afterDecimal] = value.split('.');

  if (beforeDecimal.length === 1) {
    if (e.target.value.length >= 5 && e.key !== 'Backspace') {
      e.preventDefault();
    }
  } else if (beforeDecimal.length === 2) {
    if (e.target.value.length >= 6 && e.key !== 'Backspace') {
      e.preventDefault();
    }
  } else if (beforeDecimal.length === 3) {
    if (e.target.value.length >= 7 && e.key !== 'Backspace') {
      e.preventDefault();
    }
  } else if (beforeDecimal.length === 4) {
    if (e.target.value.length >= 8 && e.key !== 'Backspace') {
      e.preventDefault();
    }
  } else if (beforeDecimal.length === 5) {
    if (e.target.value.length >= 9 && e.key !== 'Backspace') {
      e.preventDefault();
    }
  } else if (beforeDecimal.length === 6) {
    if (e.target.value.length >= 10 && e.key !== 'Backspace') {
      e.preventDefault();
    }
  } else if (afterDecimal === undefined) {
    if (e.target.value.length >= 5 && e.key !== 'Backspace') {
      e.preventDefault();
    }
  } else {
    return;
  }
};

export const handleCalculateLabPriceAndDiscount = (value: any) => {
  let discount = 0,
    total_amount = 0,
    netPrice = 0;

  // arr.forEach((element: any) => {
  //   discount += Number(element.discount) || 0
  //   total_amount += Number(element.price) || 0
  //   // netPrice += Number(element.netPrice) || 0
  // })

  total_amount = total_amount + value;
  return total_amount;
};

export const handleCalculateTotalAmountForPaymentMode = (arr: any[]) => {
  let amount: any = 0;
  arr?.forEach((element: any) => {
    amount += Number(element.amount) || 0;
  });
  const total = +amount?.toFixed(3);
  return { amount: total };
};

export const doPayment = (patientInvoiceData: any) => {
  if (
    patientInvoiceData?.status === 'DRAFT' ||
    patientInvoiceData?.patient_type === 'OUT PATIENT'
  ) {
    return true;
  } else {
    return false;
  }
};

export const isServiceEditable = (patientInvoiceData: any) => {
  if (
    patientInvoiceData?.patient_insurance_id &&
    patientInvoiceData?.insurance_approval_no
  ) {
    return false;
  } else if (
    patientInvoiceData?.status === 'DRAFT' ||
    patientInvoiceData?.patient_type === 'OUT PATIENT'
  ) {
    return true;
  } else {
    return false;
  }
};

export const handlePadStart = (invoiceNo: any) => {
  let padstartInvoiceNumber = invoiceNo;
  let invoice_number = String(padstartInvoiceNumber).padStart(6, '0');
  return invoice_number;
};

export const handlePaymentCondtions = (labInformationData: any) => {
  if (
    labInformationData?.status === 'DRAFT' ||
    labInformationData?.patient_type === 'OUT PATIENT'
  ) {
    return true;
  } else {
    return false;
  }
};

// fucntion for copy text
export const hanleCopy = async (text: string, toolTipText: string) => {
  try {
    await navigator.clipboard.writeText(text);
    store.dispatch(setToolTipMessage(toolTipText));
  } catch (err) {
    console.log('error', err);
  }
};

export const handleCalculateTotalAmountServices = (arr: any[]) => {
  let amount: any = 0;
  let total_sessions = 0;
  if (arr && arr?.length > 0) {
    arr?.forEach((element: any) => {
      amount += Number(element?.session_amount) || 0;
      total_sessions += Number(element?.sessions) || 0;
    });
  }

  return { amount: amount, total_sessions };
};

export const extractActivitiesPayload = (data: any[]) => {
  const activities: any = [];

  data.forEach((role) => {
    role.actionTabs.forEach((tab: any) => {
      tab.activity.forEach((activity: any) => {
        activities.push({
          module_id: activity?.moduleId,
          has_permission: activity?.hasPermission,
          is_default: true,
          activity_id: activity?.activityId,
        });
      });
    });
  });

  return activities;
};

export const filterSideBarData = (idsArr: any[], mainArr: any[]) => {
  const filteredData = mainArr.filter((item: any) => idsArr.includes(item.id));
  return filteredData;
};

export const filterRouteData = (idsArr: any, mainArr: any) => {
  let tempArr: any = [];

  tempArr = mainArr.map((item: any) => {
    if (item?.children && item?.children?.length > 0) {
      let childArr: any = [];
      childArr = item?.children?.filter(
        (route: any) => idsArr.includes(route.id) || route?.id === 'public'
      );
      return {
        ...item,
        children: childArr,
      };
    } else {
      return item;
    }
  });
  console.log('tempArr', tempArr);
  return tempArr;
};

// restrict some input symbol to enter
export const restrictInputChar = (e: any) =>
  ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

export const blockInvalidCharacter = (e: any) =>
  ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

export const getSearchQueryinObject = (queryString: any) => {
  const params: any = new URLSearchParams(queryString);
  const queryParams: any = {};

  for (const [key, value] of params) {
    queryParams[key] = value;
  }

  return queryParams;
};

export const formatOutput = (input: any) => {
  const formattedOutput = [];

  for (const key in input) {
    const value = input[key];
    const formattedValue =
      typeof value === 'boolean' ? (value ? 'yes' : 'no') : `'${value}'`;
    formattedOutput.push(`${key}: ${formattedValue}`);
  }

  return formattedOutput.join(', ');
};

export const removeProperties = (data: any[], propertiesToRemove: any[]) => {
  return data.map((item) => {
    const newItem = { ...item };
    propertiesToRemove.forEach((property) => {
      delete newItem[property];
    });
    return newItem;
  });
};
