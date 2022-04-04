import { NgxMaterialTimepickerTheme } from "ngx-material-timepicker";
import { Colors } from '../theming/colors';

export const DateFormatMonthYear = 'MMMM-yyyy';
export const DateFormatDayMonthYear = 'dd MMMM yyyy';
export const TimeFormat = 24;

export const TimePickerDarkTheme: NgxMaterialTimepickerTheme = {
  container: {
      bodyBackgroundColor: Colors.gray_dark_2,
      buttonColor: Colors.white
  },
  dial: {
      dialBackgroundColor: Colors.red,
  },
  clockFace: {
      clockFaceBackgroundColor: Colors.gray_dark_1,
      clockHandColor: Colors.red,
      clockFaceTimeInactiveColor: Colors.white
  }
};
