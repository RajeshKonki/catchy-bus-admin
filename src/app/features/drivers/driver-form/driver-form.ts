import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './driver-form.html',
  styleUrl: './driver-form.css'
})
export class DriverForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  driverForm: FormGroup;
  isEditMode = false;
  driverId: string | null = null;
  loading = false;
  submitting = false;
  error = '';

  colleges: any[] = [
    { id: '1', name: 'Bangalore Institute of Technology' },
    { id: '2', name: 'RV College of Engineering' },
    { id: '3', name: 'MS Ramaiah Institute' },
    { id: '4', name: 'PES University' },
    { id: '5', name: 'Christ University' },
    { id: '6', name: 'BMS College of Engineering' },
  ];

  allBuses: any[] = [
    { id: '1', busNumber: 'KA-01-F-1234', title: 'Morning Route A', collegeId: '1' },
    { id: '2', busNumber: 'KA-01-F-5678', title: 'Evening Route B', collegeId: '2' },
    { id: '3', busNumber: 'KA-01-G-2345', title: 'Afternoon Route C', collegeId: '3' },
    { id: '4', busNumber: 'KA-01-G-6789', title: 'Morning Route D', collegeId: '4' },
    { id: '5', busNumber: 'KA-01-H-1111', title: 'Night Route E', collegeId: '5' },
    { id: '6', busNumber: 'KA-01-H-2222', title: 'Morning Route F', collegeId: '6' },
  ];

  filteredBuses: any[] = [];

  constructor() {
    this.driverForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      licenseNumber: ['', Validators.required],
      collegeId: ['', Validators.required],
      busId: [''],
      status: ['Active', Validators.required]
    });

    this.driverForm.get('collegeId')?.valueChanges.subscribe(collegeId => {
      this.filteredBuses = this.allBuses.filter(b => b.collegeId === collegeId);
      this.driverForm.get('busId')?.setValue('');
    });
  }

  ngOnInit() {
    this.driverId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.driverId;

    if (this.isEditMode) {
      this.loading = true;
      setTimeout(() => {
        this.driverForm.patchValue({
          name: 'Rajesh Kumar',
          email: 'rajesh@example.com',
          phone: '9876543210',
          licenseNumber: 'KA0120100012345',
          collegeId: '1',
          busId: '1',
          status: 'Active'
        });
        this.filteredBuses = this.allBuses.filter(b => b.collegeId === '1');
        this.loading = false;
      }, 500);
    }
  }

  onSubmit() {
    if (this.driverForm.invalid) return;
    this.submitting = true;
    this.error = '';
    setTimeout(() => {
      this.router.navigate(['/drivers']);
    }, 1000);
  }
}
