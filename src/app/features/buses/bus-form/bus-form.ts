import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-bus-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './bus-form.html',
  styleUrl: './bus-form.css'
})
export class BusForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  busForm: FormGroup;
  isEditMode = false;
  busId: string | null = null;
  loading = false;
  submitting = false;
  error = '';

  routes: any[] = [
    { id: '1', name: 'Majestic → BIT' },
    { id: '2', name: 'Koramangala → RVCE' },
    { id: '3', name: 'Indiranagar → MSRIT' },
    { id: '4', name: 'Whitefield → PES' },
    { id: '5', name: 'Jayanagar → Christ' },
    { id: '6', name: 'Hebbal → BMSCE' },
  ];

  colleges: any[] = [
    { id: '1', name: 'Bangalore Institute of Technology' },
    { id: '2', name: 'RV College of Engineering' },
    { id: '3', name: 'MS Ramaiah Institute' },
    { id: '4', name: 'PES University' },
    { id: '5', name: 'Christ University' },
    { id: '6', name: 'BMS College of Engineering' },
  ];

  constructor() {
    this.busForm = this.fb.group({
      busNumber: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      routeId: ['', Validators.required],
      collegeId: ['', Validators.required],
      capacity: [null, [Validators.required, Validators.min(1)]],
      status: ['Active', Validators.required]
    });
  }

  ngOnInit() {
    this.busId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.busId;

    if (this.isEditMode) {
      this.loading = true;
      setTimeout(() => {
        this.busForm.patchValue({
          busNumber: 'KA-01-F-1234',
          title: 'Morning Route A',
          description: 'Primary morning bus for BIT students.',
          routeId: '1',
          collegeId: '1',
          capacity: 45,
          status: 'Active'
        });
        this.loading = false;
      }, 500);
    }
  }

  onSubmit() {
    if (this.busForm.invalid) return;
    this.submitting = true;
    this.error = '';
    setTimeout(() => {
      this.router.navigate(['/buses']);
    }, 1000);
  }
}
