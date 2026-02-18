import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmDialogService } from '../../../shared/services/confirm-dialog.service';

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

  constructor(private cdr: ChangeDetectorRef, private confirmDialog: ConfirmDialogService) { }

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
      this.cdr.detectChanges();
    }, 1000);
  }

  itemsPerPage = 5;
  currentPage = 1;

  get totalPages() {
    return Math.ceil(this.filteredDrivers.length / this.itemsPerPage);
  }

  get paginatedDrivers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredDrivers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.currentPage = 1; // Reset to first page on search
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
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

  async deleteDriver(id: string) {
    const confirmed = await this.confirmDialog.confirm({
      title: 'Delete Driver',
      message: 'Are you sure you want to delete this driver? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger'
    });
    if (confirmed) {
      this.drivers = this.drivers.filter(d => d.id !== id);
      if (this.currentPage > this.totalPages && this.totalPages > 0) {
        this.currentPage = this.totalPages;
      }
      this.cdr.detectChanges();
    }
  }
}
