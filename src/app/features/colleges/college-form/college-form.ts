import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MapPickerComponent, MapLocation } from '../../../shared/components/map-picker/map-picker.component';

@Component({
  selector: 'app-college-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MapPickerComponent],
  templateUrl: './college-form.html',
  styleUrl: './college-form.css'
})
export class CollegeForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  collegeForm: FormGroup;
  isEditMode = false;
  collegeId: string | null = null;
  loading = false;
  submitting = false;
  error = '';
  previewUrl: string | null = null;

  // Map picker
  showMapPicker = false;
  selectedLat: number | null = null;
  selectedLng: number | null = null;
  selectedAddress = '';

  // Password visibility toggle
  showPassword = false;

  constructor() {
    this.collegeForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      latitude: [null],
      longitude: [null],
      contactPerson: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      logo: [''],
      status: ['Active', Validators.required],
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.collegeId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.collegeId;

    if (this.isEditMode) {
      this.loading = true;
      // In edit mode, password is not required (leave blank to keep existing)
      this.collegeForm.get('loginPassword')?.clearValidators();
      this.collegeForm.get('loginPassword')?.updateValueAndValidity();

      setTimeout(() => {
        const mockData = {
          name: 'Bangalore Institute of Technology',
          address: 'K.R. Road, V.V. Puram, Bangalore - 560004',
          latitude: 12.9352,
          longitude: 77.5731,
          contactPerson: 'Dr. Suresh Kumar',
          email: 'admin@bit.edu.in',
          phone: '+91 80-2661-5865',
          logo: 'assets/logos/bit.svg',
          status: 'Active',
          loginEmail: 'college@bit.edu.in',
          loginPassword: '',
        };

        this.collegeForm.patchValue(mockData);
        this.selectedLat = mockData.latitude;
        this.selectedLng = mockData.longitude;
        this.selectedAddress = mockData.address;

        if (mockData.logo) {
          this.previewUrl = mockData.logo;
        }

        this.loading = false;
        this.cdr.detectChanges();
      }, 1000);
    }
  }

  openMapPicker() {
    this.showMapPicker = true;
  }

  onLocationSelected(location: MapLocation) {
    this.selectedLat = location.lat;
    this.selectedLng = location.lng;
    this.selectedAddress = location.address;

    // Fill address field if empty or overwrite with picked address
    if (location.address) {
      this.collegeForm.patchValue({ address: location.address });
    }
    this.collegeForm.patchValue({ latitude: location.lat, longitude: location.lng });

    this.showMapPicker = false;
    this.cdr.detectChanges();
  }

  onMapPickerClosed() {
    this.showMapPicker = false;
  }

  clearLocation() {
    this.selectedLat = null;
    this.selectedLng = null;
    this.selectedAddress = '';
    this.collegeForm.patchValue({ latitude: null, longitude: null });
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
