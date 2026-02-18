import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './driver-list.html',
  styleUrl: './driver-list.css'
})
export class DriverList implements OnInit {
  drivers: any[] = [];
  loading = true;
  error = '';
  searchTerm = '';

  ngOnInit() {
    setTimeout(() => {
      this.drivers = [
        { id: '1', name: 'Rajesh Kumar', status: 'Active', isOnline: true, licenseNumber: 'KA0120100012345', phone: '+91 9876543210', collegeName: 'Bangalore Institute of Technology', busNumber: 'KA-01-F-1234' },
        { id: '2', name: 'Suresh Babu', status: 'Active', isOnline: false, licenseNumber: 'KA0120110023456', phone: '+91 9876543211', collegeName: 'RV College of Engineering', busNumber: 'KA-01-F-5678' },
        { id: '3', name: 'Mahesh Reddy', status: 'Active', isOnline: true, licenseNumber: 'KA0120120034567', phone: '+91 9876543212', collegeName: 'MS Ramaiah Institute', busNumber: 'KA-01-G-2345' },
        { id: '4', name: 'Venkatesh Rao', status: 'Inactive', isOnline: false, licenseNumber: 'KA0120130045678', phone: '+91 9876543213', collegeName: 'PES University', busNumber: null },
        { id: '5', name: 'Prakash Nair', status: 'Active', isOnline: true, licenseNumber: 'KA0120140056789', phone: '+91 9876543214', collegeName: 'Christ University', busNumber: 'KA-01-H-1111' },
        { id: '6', name: 'Arun Sharma', status: 'Active', isOnline: false, licenseNumber: 'KA0120150067890', phone: '+91 9876543215', collegeName: 'BMS College of Engineering', busNumber: 'KA-01-H-2222' },
      ];
      this.loading = false;
    }, 600);
  }

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
  }

  get filteredDrivers() {
    if (!this.searchTerm) return this.drivers;
    return this.drivers.filter(d =>
      d.name.toLowerCase().includes(this.searchTerm) ||
      d.phone.toLowerCase().includes(this.searchTerm) ||
      d.licenseNumber.toLowerCase().includes(this.searchTerm) ||
      d.collegeName?.toLowerCase().includes(this.searchTerm)
    );
  }

  deleteDriver(id: string) {
    if (confirm('Are you sure you want to delete this driver?')) {
      this.drivers = this.drivers.filter(d => d.id !== id);
    }
  }
}
