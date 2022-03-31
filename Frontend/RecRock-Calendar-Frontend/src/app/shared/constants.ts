import { NgxMaterialTimepickerTheme } from "ngx-material-timepicker";
export const DateFormat_month_year = 'MMMM-yyyy';
export const DateFormat_day_month_year = 'dd MMMM yyyy';

export const Time_picker_dark_theme: NgxMaterialTimepickerTheme = {
  container: {
      bodyBackgroundColor: '#424242',
      buttonColor: '#f5f5f5'
  },
  dial: {
      dialBackgroundColor: '#ff0000',
  },
  clockFace: {
      clockFaceBackgroundColor: '#555',
      clockHandColor: '#ff0000',
      clockFaceTimeInactiveColor: '#f5f5f5'
  }
};
