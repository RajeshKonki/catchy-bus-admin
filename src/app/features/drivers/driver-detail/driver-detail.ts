import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfirmDialogService } from '../../../shared/services/confirm-dialog.service';

@Component({
  selector: 'app-driver-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './driver-detail.html',
  styleUrl: './driver-detail.css',
})
export class DriverDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private confirmDialog = inject(ConfirmDialogService);

  loading = true;
  error = '';
  driver: any = null;

  private mockDrivers: any[] = [
    { id: '1', name: 'Rajesh Kumar', status: 'Active', isOnline: true, phone: '+91 9876543210', email: 'rajesh@example.com', licenseNumber: 'KA0120100012345', collegeName: 'Bangalore Institute of Technology', busNumber: 'KA-01-F-1234' },
    { id: '2', name: 'Suresh Babu', status: 'Active', isOnline: false, phone: '+91 9876543211', email: 'suresh@example.com', licenseNumber: 'KA0120110023456', collegeName: 'RV College of Engineering', busNumber: 'KA-01-F-5678' },
    { id: '3', name: 'Mahesh Reddy', status: 'Active', isOnline: true, phone: '+91 9876543212', email: 'mahesh@example.com', licenseNumber: 'KA0120120034567', collegeName: 'MS Ramaiah Institute', busNumber: 'KA-01-G-2345' },
  ];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    setTimeout(() => {
      this.driver = this.mockDrivers.find(d => d.id === id) || this.mockDrivers[0];
      this.loading = false;
    }, 400);
  }

  async deleteDriver() {
    const confirmed = await this.confirmDialog.confirm({
      title: 'Delete Driver',
      message: `Are you sure you want to delete driver "${this.driver?.name}"? This action cannot be undone.`,
      confirmText: 'Delete',
      type: 'danger'
    });
    if (confirmed) {
      this.router.navigate(['/drivers']);
    }
  }
}
