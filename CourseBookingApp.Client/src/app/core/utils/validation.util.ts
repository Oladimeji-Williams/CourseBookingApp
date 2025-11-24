import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordStrength(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;

  if (!value) return null;

  const strong = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

  return strong.test(value)
    ? null
    : { weakPassword: true };
}
