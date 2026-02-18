import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfirmDialogService } from '../../../shared/services/confirm-dialog.service';

@Component({
  selector: 'app-bus-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bus-detail.html',
  styleUrl: './bus-detail.css',
})
export class BusDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private confirmDialog = inject(ConfirmDialogService);

  loading = true;
  error = '';
  bus: any = null;

  private mockBuses: any[] = [
    { id: '1', busNumber: 'KA-01-F-1234', title: 'Morning Route A', capacity: 45, status: 'Active', collegeName: 'Bangalore Institute of Technology', routeName: 'Majestic → BIT', driverName: 'Rajesh Kumar', description: 'Primary morning bus for BIT students departing from Majestic.' },
    { id: '2', busNumber: 'KA-01-F-5678', title: 'Evening Route B', capacity: 40, status: 'Active', collegeName: 'RV College of Engineering', routeName: 'Koramangala → RVCE', driverName: 'Suresh Babu', description: 'Evening return bus for RVCE students.' },
    { id: '3', busNumber: 'KA-01-G-2345', title: 'Afternoon Route C', capacity: 50, status: 'Maintenance', collegeName: 'MS Ramaiah Institute', routeName: 'Indiranagar → MSRIT', driverName: 'Mahesh Reddy', description: 'Currently under scheduled maintenance.' },
  ];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    setTimeout(() => {
      this.bus = this.mockBuses.find(b => b.id === id) || this.mockBuses[0];
      this.loading = false;
    }, 400);
  }

  async deleteBus() {
    const confirmed = await this.confirmDialog.confirm({
      title: 'Delete Bus',
      message: `Are you sure you want to delete bus "${this.bus?.busNumber}"? This action cannot be undone.`,
      confirmText: 'Delete',
      type: 'danger'
    });
    if (confirmed) {
      this.router.navigate(['/buses']);
    }
  }
}
