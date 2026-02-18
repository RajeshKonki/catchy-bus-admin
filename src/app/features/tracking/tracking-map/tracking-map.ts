import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tracking-map',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tracking-map.html',
  styleUrl: './tracking-map.css',
})
export class TrackingMap implements OnInit {
  busSearchInput = '';
  refreshing = false;
  isTracking = true;
  lastUpdate = new Date().toLocaleTimeString();
  selectedBus: any = null;

  activeBuses: any[] = [];

  ngOnInit() {
    this.refreshTracking();
  }

  get filteredActiveBuses() {
    if (!this.busSearchInput) return this.activeBuses;
    const q = this.busSearchInput.toLowerCase();
    return this.activeBuses.filter(b =>
      b.busNumber.toLowerCase().includes(q) ||
      b.driverName.toLowerCase().includes(q) ||
      b.routeName.toLowerCase().includes(q)
    );
  }

  trackBus() {
    const found = this.activeBuses.find(b =>
      b.busNumber.toLowerCase().includes(this.busSearchInput.toLowerCase())
    );
    if (found) this.selectedBus = found;
  }

  refreshTracking() {
    this.refreshing = true;
    setTimeout(() => {
      this.refreshing = false;
      this.lastUpdate = new Date().toLocaleTimeString();
      this.activeBuses = [
        { id: '1', busNumber: 'KA-01-F-1234', routeName: 'Majestic → BIT', driverName: 'Rajesh Kumar', speed: 42, students: 38, status: 'Moving', lat: 12.9716, lng: 77.5946 },
        { id: '2', busNumber: 'KA-01-F-5678', routeName: 'Koramangala → RVCE', driverName: 'Suresh Babu', speed: 0, students: 40, status: 'Stopped', lat: 12.9352, lng: 77.6245 },
        { id: '3', busNumber: 'KA-01-G-2345', routeName: 'Indiranagar → MSRIT', driverName: 'Mahesh Reddy', speed: 28, students: 35, status: 'Moving', lat: 13.0212, lng: 77.5638 },
        { id: '4', busNumber: 'KA-01-G-6789', routeName: 'Whitefield → PES', driverName: 'Venkatesh Rao', speed: 55, students: 42, status: 'Moving', lat: 12.9698, longitude: 77.7499 },
        { id: '5', busNumber: 'KA-01-H-1111', routeName: 'Jayanagar → Christ', driverName: 'Prakash Nair', speed: 0, students: 30, status: 'At Stop', lat: 12.9250, lng: 77.5938 },
      ];
    }, 1000);
  }

  selectBus(bus: any) {
    this.selectedBus = bus;
  }
}
