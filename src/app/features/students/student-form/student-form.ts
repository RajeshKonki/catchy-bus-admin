import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css',
})
export class StudentForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  studentForm: FormGroup;
  isEditMode = false;
  loading = false;
  error = '';
  submitting = false;

  colleges: any[] = [
    { id: '1', name: 'Bangalore Institute of Technology' },
    { id: '2', name: 'RV College of Engineering' },
    { id: '3', name: 'MS Ramaiah Institute of Technology' },
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
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      phone: ['', Validators.required],
      collegeId: ['', Validators.required],
      busId: [''],
      pickupStop: [''],
      status: ['Active'],
    });

    this.studentForm.get('collegeId')?.valueChanges.subscribe(collegeId => {
      this.filteredBuses = this.allBuses.filter(b => b.collegeId === collegeId);
      this.studentForm.get('busId')?.setValue('');
    });
  }

  ngOnInit() {
    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId) {
      this.isEditMode = true;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.studentForm.patchValue({
          name: 'Arjun Sharma',
          email: 'arjun@example.com',
          phone: '9845012345',
          collegeId: '1',
          busId: '1',
          pickupStop: 'Majestic',
          status: 'Active',
        });
        this.filteredBuses = this.allBuses.filter(b => b.collegeId === '1');
        this.cdr.detectChanges();
      }, 1000);
    }
  }

  onSubmit() {
    if (this.studentForm.invalid) return;
    this.submitting = true;
    this.error = '';
    setTimeout(() => {
      this.submitting = false;
      this.router.navigate(['/students']);
    }, 1000);
  }
}
