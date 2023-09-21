import axios from "axios";
import {
  ADD_ROOM,
  EDIT_ROOM,
  GET_ALL_ROOM,
  GET_ROOM_BY_ID,
  UPDATE_ROOM_STATUS,
} from "../../../config/config";
import { IAPIPayload } from "../../../interfaces/apiInterface";

export const getAllRoomList = (data: IAPIPayload) => {
  return axios.post(GET_ALL_ROOM, data);
};

export const addRoom = (data: IAPIPayload) => {
  return axios.post(ADD_ROOM, data);
};

export const getRoomByIds = (data: IAPIPayload) => {
  return axios.post(GET_ROOM_BY_ID, data);
};

export const editRooms = (data: IAPIPayload) => {
  return axios.post(EDIT_ROOM, data);
};

export const updateRoomStatuss = (data: IAPIPayload) => {
  return axios.post(UPDATE_ROOM_STATUS, data);
};
