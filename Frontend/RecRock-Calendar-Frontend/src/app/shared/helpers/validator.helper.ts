import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ValidatorHelper {
  public static containsCharactersValidator(characterRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const contains = characterRe.test(control.value);
      return contains ? null : { containsCharacters: { value: control.value } };
    };
  }

  public static isTheSame(sfieldControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isEqual = control.value === sfieldControl.value;
      return isEqual ? null : { notEqual: true };
    };
  }
}
