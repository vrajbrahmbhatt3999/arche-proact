import { TODO_REMINDER } from "../constants/constant";

export interface IaddReminderValidators {
  [TODO_REMINDER]: {
    required: string;
    validate: any;
  };
}
export const addReminderValidators: IaddReminderValidators = {
  [TODO_REMINDER]: {
    required: "Please select date and time",
    validate: {
      futureDate: (value: any) => {
        const currentDate = new Date();
        const selectedDate = new Date(value);
        if (selectedDate <= currentDate) {
          return "set todo reminder for future date and time";
        }
        return true;
      },
    },
  },
};
