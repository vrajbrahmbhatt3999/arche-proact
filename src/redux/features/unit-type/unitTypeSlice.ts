import { createSlice } from '@reduxjs/toolkit'
import { IUnitType } from '../../../interfaces/apiInterface'
import { getInventoryItemUnits, createInventoryUnits, getInventoryAllUnits, deleteInventoryUnits, editInventoryUnits } from './unittypeAsyncActions'



export const initialState: IUnitType = {
    allCategoriesList: [],
    addedUnitList: [],
    editableItem: {},
    editedItem: {},
    isLoading: false
}

export const unitTypeSlice = createSlice({
    name: 'unitType',
    initialState,
    reducers: {
        setEditableItem: (state, action) => {
            console.log(action.payload, "action.payload")
            state.editableItem = action.payload;
        },

        clearStates: (state) => {
            state.editableItem = {};
        },

        setChangeStatus: (state, action) => {
            console.log(action.payload, "status change")
            state.addedUnitList = action.payload;
        },
    },

    extraReducers: (builder) => {

        // GET ALL CATEGORIES LIST 
        builder.addCase(getInventoryAllUnits.pending, (state) => {
        })
        builder.addCase(getInventoryAllUnits.fulfilled, (state, action) => {
            state.allCategoriesList = action.payload
            console.log(state.allCategoriesList, "state.allItemUnits")
        })
        builder.addCase(getInventoryAllUnits.rejected, (state) => {

        })

        // GET INVENTORY ITEM UNIT LIST
        builder.addCase(getInventoryItemUnits.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getInventoryItemUnits.fulfilled, (state, action) => {
            state.addedUnitList = action.payload.data
            state.isLoading = false

            console.log(state.addedUnitList, "state.addedUnitList")
        })
        builder.addCase(getInventoryItemUnits.rejected, (state) => {
            state.isLoading = false

        })

        // CREATE NEW UNIT ITEM
        builder.addCase(createInventoryUnits.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(createInventoryUnits.fulfilled, (state, action) => {
            state.isLoading = false

        })
        builder.addCase(createInventoryUnits.rejected, (state) => {
            state.isLoading = false

        })


        // DELETE UNIT ITEM
        builder.addCase(deleteInventoryUnits.pending, (state) => {
        })
        builder.addCase(deleteInventoryUnits.fulfilled, (state, action) => {
        })
        builder.addCase(deleteInventoryUnits.rejected, (state) => {

        })


        // EDIT UNIT ITEM;
        builder.addCase(editInventoryUnits.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(editInventoryUnits.fulfilled, (state, action) => {
            state.editedItem = action.payload;
            state.isLoading = false
            console.log(state.editableItem, " state.editableItem")
        })
        builder.addCase(editInventoryUnits.rejected, (state) => {
            state.isLoading = false
        })

    },
})

export const { setEditableItem, clearStates, setChangeStatus } = unitTypeSlice.actions
export default unitTypeSlice.reducer
