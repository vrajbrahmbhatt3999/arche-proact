import { createSlice } from '@reduxjs/toolkit'
import { getAllGrn, getAllSupplierDetails, getPurchaseInvoice } from './purchaseAsyncActions'
import { IPurChaseInvoice } from '../../../interfaces/apiInterface'


export const initialState: IPurChaseInvoice = {
    suppliersInfo: [],
    grnListObject: {},
    grnList: [],
    conformPurchaseInvoiceList: [],
    addTestText: [],
    generatedInvoiceData: '',
    isLoading: false,
    file: ''
}

export const purchaseInvoiceSlice = createSlice({
    name: 'purchaseInvoice',
    initialState,
    reducers: {

        setPurchaseInvoiceList: (state, action) => {
            state.conformPurchaseInvoiceList = [...state.conformPurchaseInvoiceList, action.payload];
            console.log(state.conformPurchaseInvoiceList, 'state.conformPurchaseInvoiceList');
        },

        setTestAddText: (state: any, action: any) => {
            const index = state.addTestText.indexOf(action.payload)
            if (index > -1) {
                state.addTestText.splice(index, 1);
            } else {
                state.addTestText.push(action.payload);
            }
        },

        removeFromInvoiceList: (state, action) => {
            state.conformPurchaseInvoiceList = state.conformPurchaseInvoiceList.filter(
                (item: any) => {
                    return item._id !== action.payload
                }
            )
            console.log(state.conformPurchaseInvoiceList, "state.conformPurchaseInvoiceList")
        },

        updatedPurchaseInvoiceList: (state, action) => {
            console.log(action.payload, "action.payload")
            state.conformPurchaseInvoiceList = action.payload;
        },

        clearStates: (state) => {
            state.conformPurchaseInvoiceList = [];
            state.suppliersInfo = [];
            state.grnListObject = {};
            state.grnList = [];
            // state.generatedInvoiceData = '';
            state.isLoading = false;
            state.file = ''
        },



    },


    extraReducers: (builder) => {

        builder.addCase(getAllSupplierDetails.pending, (state) => {

        })
        builder.addCase(getAllSupplierDetails.fulfilled, (state, action) => {
            state.suppliersInfo = action.payload
        })
        builder.addCase(getAllSupplierDetails.rejected, (state, error) => {

        })

        // Get All GRN
        builder.addCase(getAllGrn.pending, (state) => {
        })
        builder.addCase(getAllGrn.fulfilled, (state, action) => {
            state.grnListObject = action.payload
            state.grnList = action.payload.data
        })
        builder.addCase(getAllGrn.rejected, (state, error) => {

        })

        // Get Purchase Invoice
        builder.addCase(getPurchaseInvoice.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getPurchaseInvoice.fulfilled, (state, action) => {
            state.isLoading = false;
            state.generatedInvoiceData = action.payload;
            console.log(state.generatedInvoiceData, "state.generatedPo");
        })
        builder.addCase(getPurchaseInvoice.rejected, (state, error) => {
            state.isLoading = false;
        })
    },
})

export const { setPurchaseInvoiceList, setTestAddText, removeFromInvoiceList, updatedPurchaseInvoiceList,clearStates } = purchaseInvoiceSlice.actions
export default purchaseInvoiceSlice.reducer
