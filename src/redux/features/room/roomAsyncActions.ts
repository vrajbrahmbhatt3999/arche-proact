import {
  ADD_ROOM,
  EDIT_ROOM,
  GET_ALL_ROOM,
  GET_ROOM_BY_ID,
  UPDATE_ROOM_STATUS,
} from '../../../constants/asyncActionsType'
import createAsyncThunkForSlice from '../../../utils/utils'
import {
  getAllRoomList,
  addRoom,
  editRooms,
  updateRoomStatuss,
  getRoomByIds,
} from './roomCrud'

export const getAllroom = createAsyncThunkForSlice(
  GET_ALL_ROOM,
  getAllRoomList
)

export const addRooms = createAsyncThunkForSlice(ADD_ROOM, addRoom, {
  isToast: true,
})

export const getRoomById = createAsyncThunkForSlice(
  GET_ROOM_BY_ID,
  getRoomByIds,
  {
    isToast: true,
  }
)

export const editRoom = createAsyncThunkForSlice(EDIT_ROOM, editRooms, {
  isToast: true,
})

export const updateRoomStatus = createAsyncThunkForSlice(
  UPDATE_ROOM_STATUS,
  updateRoomStatuss,
  {
    isToast: true,
  }
)

