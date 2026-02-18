import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private fb = inject(FormBuilder);

  profileForm: FormGroup;
  error = '';
  success = '';
  submitting = false;

  constructor() {
    this.profileForm = this.fb.group({
      fullName: ['Admin User', Validators.required],
      email: ['admin@catchybus.com', [Validators.required, Validators.email]],
      phone: ['+91 9876543210', Validators.required],
      role: [{ value: 'Administrator', disabled: true }]
    });
  }

  onSubmit() {
    if (this.profileForm.invalid) return;

    this.submitting = true;
    this.error = '';
    this.success = '';

    // Simulate API call
    setTimeout(() => {
      this.submitting = false;
      this.success = 'Profile updated successfully';
    }, 1500);
  }
}
