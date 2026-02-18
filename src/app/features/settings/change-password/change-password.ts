import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
  private fb = inject(FormBuilder);

  passwordForm: FormGroup;
  showCurrent = false;
  showNew = false;
  showConfirm = false;
  submitting = false;
  error = '';
  success = '';

  get passwordStrengthClass(): string {
    const strength = this.calculateStrength(this.passwordForm.get('newPassword')?.value || '');
    if (strength < 2) return 'weak';
    if (strength < 4) return 'medium';
    return 'strong';
  }

  get passwordStrengthWidth(): string {
    const strength = this.calculateStrength(this.passwordForm.get('newPassword')?.value || '');
    return `${(strength / 5) * 100}%`;
  }

  get passwordStrengthLabel(): string {
    const strength = this.calculateStrength(this.passwordForm.get('newPassword')?.value || '');
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Medium';
    return 'Strong';
  }

  constructor() {
    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  calculateStrength(password: string): number {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  }

  onSubmit() {
    if (this.passwordForm.invalid) return;
    this.submitting = true;
    this.error = '';
    this.success = '';
    // Simulate API call
    setTimeout(() => {
      this.submitting = false;
      this.success = 'Password updated successfully.';
      this.passwordForm.reset();
    }, 1500);
  }
}
