import { BASE_UNIT_TYPE, MAPPED_UNIT_TYPE, MASTER_UNIT_TYPE_QTY } from "../constants/constant"


export interface IUnitTypeValidators {
    [BASE_UNIT_TYPE]: {
        required: string
    }
    [MAPPED_UNIT_TYPE]: {
        required: string
    }

    [MASTER_UNIT_TYPE_QTY]: {
        required: string
    },
}

export const unitTypeValidators: any = {
    [BASE_UNIT_TYPE]: {
        required: 'Please select Base Unit',
    },
    [MAPPED_UNIT_TYPE]: {
        required: 'Please select Conversational Unit',
    },

    [MASTER_UNIT_TYPE_QTY]: {
        required: 'Please Add Qty',
    },
}