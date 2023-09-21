import { TODO_TASK_NAME, TODO_TASK_PRIORITY } from "../constants/constant";

export interface IaddTodoValidators {
  [TODO_TASK_NAME]: {
    required: string;
  };
  [TODO_TASK_PRIORITY]: {
    required: string;
  };
}
export const addTodoValidators: IaddTodoValidators = {
  [TODO_TASK_NAME]: {
    required: "Please enter task name",
  },
  [TODO_TASK_PRIORITY]: {
    required: "Please select task priority",
  },
};
