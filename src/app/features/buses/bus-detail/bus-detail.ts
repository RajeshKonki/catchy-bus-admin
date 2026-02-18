import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

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

  deleteBus() {
    if (confirm('Are you sure you want to delete this bus?')) {
      this.router.navigate(['/buses']);
    }
  }
}
