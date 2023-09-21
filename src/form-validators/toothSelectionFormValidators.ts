import { AGE_GROUP, SELECTED_TOOTHS, PROCEDURE, COMPLAINT, NOTE, QUANTITY, PRICE, DISCOUNT, BILLABLE, TOTAL_AMOUNT, TYPE, UNIT_PRICE } from "../constants/constant";
import { IToothSelectionForm } from "../interfaces/interfaces";

export const toothSelectionFormValidatorsValidators: any = {
    [TYPE]: {
        required: "Please Select Status"
    },
    [AGE_GROUP]: {
        required: "Please Select Age group"
    },
    [PROCEDURE]: {
        required: "Please Select Procedure",
    },
    [COMPLAINT]: {
        required: "Please Enter Complaint",
    },
    [QUANTITY]: {
        required: "Please enter Quantity",
        pattern: {
            value: /^[0-9]{0,3}(?:\.[0-9]{1,3})?$/,
            message: 'Please enter number upto 3 digit',
        }
    },
    [UNIT_PRICE]: {
        required: "Please Enter Unit price",
        pattern: {
            value: /^[0-9]{0,6}(?:\.[0-9]{1,3})?$/,
            message: 'Please enter number upto 6 digit',
        }
    },
    [PRICE]: {
        required: "Please Enter Price",
        pattern: {
            value: /^[0-9]{0,6}(?:\.[0-9]{1,3})?$/,
            message: 'Please enter number upto 6 digit',
        }
    },
    [DISCOUNT]: {
        required: "Please enter Discount",
        pattern: {
            value: /^[0-9]{0,6}(?:\.[0-9]{1,3})?$/,
            message: 'Please enter number upto 6 digit',
        },
        validate: {
            handleDiscount: (value: number, values: IToothSelectionForm) => {
                if (value >= Number(values[PRICE])) {
                    return "Discount must be less than price";
                }
            },
        }
    },
    [TOTAL_AMOUNT]: {
        required: "Please Enter Total Amount",
        pattern: {
            value: /^[0-9]{0,6}(?:\.[0-9]{1,3})?$/,
            message: 'Please enter number upto 6 digit',
        }
    },
    [BILLABLE]: {
        required: "Please Select Billable"
    }
};
