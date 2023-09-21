import { ROLE_TYPE, USERGROUP_NAME } from '../constants/constant'

export interface IDepartmentValidators {
  [USERGROUP_NAME]: {
    required: string
  }
  [ROLE_TYPE]: {
    required: string
  }
}

export const manageUserGroupValidators: IDepartmentValidators = {
  [USERGROUP_NAME]: {
    required: 'Please enter role name',
  },
  [ROLE_TYPE]: {
    required: 'Please select role type',
  },
}
