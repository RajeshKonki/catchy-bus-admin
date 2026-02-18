import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-route-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './route-form.html',
  styleUrl: './route-form.css',
})
export class RouteForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  routeForm: FormGroup;
  isEditMode = false;
  loading = false;
  error = '';
  submitting = false;

  get stopsArray(): FormArray {
    return this.routeForm.get('stops') as FormArray;
  }

  constructor() {
    this.routeForm = this.fb.group({
      name: ['', Validators.required],
      startPoint: ['', Validators.required],
      endPoint: ['', Validators.required],
      distance: [''],
      status: ['Active'],
      stops: this.fb.array([]),
    });
  }

  ngOnInit() {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.isEditMode = true;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.routeForm.patchValue({
          name: 'Route A',
          startPoint: 'Majestic',
          endPoint: 'Engineering College',
          distance: 12.5,
          status: 'Active',
        });
        this.addStop('Shivajinagar');
        this.addStop('Indiranagar');
      }, 500);
    }
  }

  addStop(value = '') {
    this.stopsArray.push(this.fb.control(value));
  }

  removeStop(index: number) {
    this.stopsArray.removeAt(index);
  }

  onSubmit() {
    if (this.routeForm.invalid) return;
    this.submitting = true;
    this.error = '';
    setTimeout(() => {
      this.submitting = false;
      this.router.navigate(['/routes']);
    }, 1000);
  }
}
