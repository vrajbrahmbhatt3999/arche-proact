import axios from "axios";
import {
  ADD_SERVICE_DATA,
  GET_SERVICES_DATA,
  GET_ACTIVE_SERVICES_DATA,
  UPDATE_SERVICE_DATA,
  UPDATE_STATUS_SERVICE_DATA
} from "../../../config/config";

export const AllServicesData = (data: any) => {
  return axios.post(GET_SERVICES_DATA, data);
};
export const AllActiveServicesData = (data: any) => {
  return axios.get(GET_ACTIVE_SERVICES_DATA);
};
export const addServiceData = (data: any) => {
  return axios.post(ADD_SERVICE_DATA, data)

}


export const updateServiceData = (data: any) => {
  return axios.post(UPDATE_SERVICE_DATA, data)

}

export const updateStatusServiceData = (data: any) => {
  return axios.post(UPDATE_STATUS_SERVICE_DATA, data)
}

