import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfirmDialogService } from '../../../shared/services/confirm-dialog.service';

@Component({
  selector: 'app-college-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './college-detail.html',
  styleUrl: './college-detail.css',
})
export class CollegeDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private confirmDialog = inject(ConfirmDialogService);

  loading = true;
  error = '';
  college: any = null;

  private mockColleges: any[] = [
    { id: '1', name: 'Bangalore Institute of Technology', status: 'Active', contactPerson: 'Dr. Suresh Kumar', email: 'admin@bit.edu.in', phone: '+91 80-2661-5865', address: 'K.R. Road, V.V. Puram, Bangalore - 560004', latitude: 12.9499, longitude: 77.5696, busCount: 6, driverCount: 6, studentCount: 240, logo: 'assets/logos/bit.svg' },
    { id: '2', name: 'RV College of Engineering', status: 'Active', contactPerson: 'Dr. Prema Nair', email: 'principal@rvce.edu.in', phone: '+91 80-6717-8001', address: 'Mysore Road, RV Vidyanikethan Post, Bangalore - 560059', latitude: 12.9232, longitude: 77.4988, busCount: 5, driverCount: 5, studentCount: 180, logo: 'assets/logos/rvce.svg' },
    { id: '3', name: 'MS Ramaiah Institute of Technology', status: 'Active', contactPerson: 'Dr. Anand Rao', email: 'principal@msrit.edu', phone: '+91 80-2360-0822', address: 'MSR Nagar, MSRIT Post, Bangalore - 560054', latitude: 13.0212, longitude: 77.5638, busCount: 4, driverCount: 4, studentCount: 160, logo: 'assets/logos/msrit.svg' },
  ];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    setTimeout(() => {
      this.college = this.mockColleges.find(c => c.id === id) || this.mockColleges[0];
      this.loading = false;
    }, 400);
  }

  async deleteCollege() {
    const confirmed = await this.confirmDialog.confirm({
      title: 'Delete College',
      message: `Are you sure you want to delete "${this.college?.name}"? This action cannot be undone.`,
      confirmText: 'Delete',
      type: 'danger'
    });
    if (confirmed) {
      this.router.navigate(['/colleges']);
    }
  }
}
