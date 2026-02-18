import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-detail.html',
  styleUrl: './student-detail.css',
})
export class StudentDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  loading = true;
  error = '';
  student: any = null;

  private mockStudents: any[] = [
    { id: '1', name: 'Arjun Sharma', status: 'Active', collegeName: 'Bangalore Institute of Technology', phone: '+91 9845012345', email: 'arjun@example.com', busNumber: 'KA-01-F-1234', pickupStop: 'Majestic', address: '12, MG Road, Bangalore - 560001' },
    { id: '2', name: 'Priya Nair', status: 'Active', collegeName: 'RV College of Engineering', phone: '+91 9845012346', email: 'priya@example.com', busNumber: 'KA-01-F-5678', pickupStop: 'Koramangala', address: '45, 5th Block, Koramangala, Bangalore - 560034' },
    { id: '3', name: 'Rahul Verma', status: 'Active', collegeName: 'MS Ramaiah Institute', phone: '+91 9845012347', email: 'rahul@example.com', busNumber: 'KA-01-G-2345', pickupStop: 'Indiranagar', address: '78, 100 Feet Road, Indiranagar, Bangalore - 560038' },
  ];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    setTimeout(() => {
      this.student = this.mockStudents.find(s => s.id === id) || this.mockStudents[0];
      this.loading = false;
    }, 400);
  }

  deleteStudent() {
    if (confirm('Are you sure you want to delete this student?')) {
      this.router.navigate(['/students']);
    }
  }
}
