import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MapPickerComponent, MapLocation } from '../../../shared/components/map-picker/map-picker.component';

@Component({
  selector: 'app-route-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MapPickerComponent],
  templateUrl: './route-form.html',
  styleUrl: './route-form.css',
})
export class RouteForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  routeForm: FormGroup;
  isEditMode = false;
  loading = false;
  error = '';
  submitting = false;

  // Map picker — 'start' | 'end' | stop index as string e.g. '0', '1'
  showMapPicker = false;
  activePickerTarget: string = 'start';

  startLat: number | null = null;
  startLng: number | null = null;
  endLat: number | null = null;
  endLng: number | null = null;

  // Per-stop coordinates
  stopCoords: { lat: number | null; lng: number | null }[] = [];

  get stopsArray(): FormArray {
    return this.routeForm.get('stops') as FormArray;
  }

  get pickerInitialLat(): number {
    if (this.activePickerTarget === 'start') return this.startLat ?? 17.0018;
    if (this.activePickerTarget === 'end') return this.endLat ?? 17.0018;
    const idx = parseInt(this.activePickerTarget);
    return this.stopCoords[idx]?.lat ?? 17.0018;
  }

  get pickerInitialLng(): number {
    if (this.activePickerTarget === 'start') return this.startLng ?? 81.7877;
    if (this.activePickerTarget === 'end') return this.endLng ?? 81.7877;
    const idx = parseInt(this.activePickerTarget);
    return this.stopCoords[idx]?.lng ?? 81.7877;
  }

  constructor() {
    this.routeForm = this.fb.group({
      name: ['', Validators.required],
      // Start point — name + address separately
      startName: ['', Validators.required],
      startAddress: [''],
      startLat: [null],
      startLng: [null],
      // End point — name + address separately
      endName: ['', Validators.required],
      endAddress: [''],
      endLat: [null],
      endLng: [null],
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
          startName: 'Majestic Bus Stand',
          startAddress: 'Majestic, Bangalore, Karnataka',
          startLat: 12.9767, startLng: 77.5713,
          endName: 'Bangalore Institute of Technology',
          endAddress: 'V V Puram, Bangalore, Karnataka',
          endLat: 12.9352, endLng: 77.5731,
          distance: 12.5,
          status: 'Active',
        });
        this.startLat = 12.9767; this.startLng = 77.5713;
        this.endLat = 12.9352; this.endLng = 77.5731;
        this.addStop('Shivajinagar Bus Stop', 'Shivajinagar, Bangalore', 12.9784, 77.5996);
        this.addStop('Indiranagar Metro', 'Indiranagar, Bangalore', 12.9784, 77.6408);
        this.cdr.detectChanges();
      }, 1000);
    }
  }

  private createStopGroup(name = '', address = ''): FormGroup {
    return this.fb.group({ name: [name], address: [address] });
  }

  openMapPicker(target: string) {
    this.activePickerTarget = target;
    this.showMapPicker = true;
  }

  onLocationSelected(location: MapLocation) {
    if (this.activePickerTarget === 'start') {
      this.startLat = location.lat;
      this.startLng = location.lng;
      this.routeForm.patchValue({
        startAddress: location.address,
        startLat: location.lat,
        startLng: location.lng,
      });
    } else if (this.activePickerTarget === 'end') {
      this.endLat = location.lat;
      this.endLng = location.lng;
      this.routeForm.patchValue({
        endAddress: location.address,
        endLat: location.lat,
        endLng: location.lng,
      });
    } else {
      const idx = parseInt(this.activePickerTarget);
      if (!isNaN(idx)) {
        this.stopCoords[idx] = { lat: location.lat, lng: location.lng };
        const stopGroup = this.stopsArray.at(idx) as FormGroup;
        stopGroup.patchValue({ address: location.address });
      }
    }
    this.showMapPicker = false;
    this.cdr.detectChanges();
  }

  onMapPickerClosed() { this.showMapPicker = false; }

  clearStart() {
    this.startLat = null; this.startLng = null;
    this.routeForm.patchValue({ startLat: null, startLng: null });
  }

  clearEnd() {
    this.endLat = null; this.endLng = null;
    this.routeForm.patchValue({ endLat: null, endLng: null });
  }

  clearStopCoords(index: number) {
    this.stopCoords[index] = { lat: null, lng: null };
    this.cdr.detectChanges();
  }

  addStop(name = '', address = '', lat: number | null = null, lng: number | null = null) {
    this.stopsArray.push(this.createStopGroup(name, address));
    this.stopCoords.push({ lat, lng });
  }

  removeStop(index: number) {
    this.stopsArray.removeAt(index);
    this.stopCoords.splice(index, 1);
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
