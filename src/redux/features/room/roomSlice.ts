import { createSlice } from "@reduxjs/toolkit";
import { IRoom } from "../../../interfaces/apiInterface";
import {
  addRooms,
  editRoom,
  getAllroom,
  getRoomById,
  updateRoomStatus,
} from "./roomAsyncActions";

export const initialState: IRoom = {
  isLoading: false,
  roomData: [],
  roomlistInfo: {},
  roomInfo: {},
  error: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    clearWardInfo: (state) => {
      state.roomInfo = {};
    },
    clearWardData: (state) => {
      state.roomInfo = [];
    },
  },
  extraReducers(builder) {
    // GET ALL BRANCH

    builder.addCase(getAllroom.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllroom.fulfilled, (state, action) => {
      state.isLoading = false;
      state.roomData = action.payload?.data;
      state.roomlistInfo = action.payload;
    });
    builder.addCase(getAllroom.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // ADD BRANCH

    builder.addCase(addRooms.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addRooms.fulfilled, (state, action) => {
      state.isLoading = false;
      state.roomInfo = action.payload;
    });
    builder.addCase(addRooms.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // GET BRANCH BY ID

    builder.addCase(getRoomById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRoomById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.roomInfo = action.payload;
    });
    builder.addCase(getRoomById.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // EDIT BRANCH

    builder.addCase(editRoom.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editRoom.fulfilled, (state, action) => {
      state.isLoading = false;
      state.roomInfo = action.payload;
    });
    builder.addCase(editRoom.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });

    // UPDATE BRANCH STATUS

    builder.addCase(updateRoomStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateRoomStatus.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateRoomStatus.rejected, (state, error) => {
      state.isLoading = false;
      state.error = error;
    });
  },
});

export const { clearWardInfo, clearWardData } = roomSlice.actions;
export default roomSlice.reducer;
