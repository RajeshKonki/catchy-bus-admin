import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-college-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './college-form.html',
  styleUrl: './college-form.css'
})
export class CollegeForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  collegeForm: FormGroup;
  isEditMode = false;
  collegeId: string | null = null;
  loading = false;
  submitting = false;
  error = '';
  previewUrl: string | null = null;

  constructor() {
    this.collegeForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      contactPerson: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      logo: [''],
      status: ['Active', Validators.required]
    });
  }

  ngOnInit() {
    this.collegeId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.collegeId;

    if (this.isEditMode) {
      this.loading = true;
      setTimeout(() => {
        const mockData = {
          name: 'Bangalore Institute of Technology',
          address: 'K.R. Road, V.V. Puram, Bangalore - 560004',
          contactPerson: 'Dr. Suresh Kumar',
          email: 'admin@bit.edu.in',
          phone: '+91 80-2661-5865',
          logo: 'assets/logos/bit.svg',
          status: 'Active'
        };

        this.collegeForm.patchValue(mockData);
        if (mockData.logo) {
          this.previewUrl = mockData.logo;
        }

        this.loading = false;
      }, 500);
    }
  }

  onFileSelected(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
        this.collegeForm.patchValue({ logo: this.previewUrl });
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.previewUrl = null;
    this.collegeForm.patchValue({ logo: '' });
  }

  onSubmit() {
    if (this.collegeForm.invalid) return;
    this.submitting = true;
    this.error = '';
    setTimeout(() => {
      this.router.navigate(['/colleges']);
    }, 1000);
  }
}
