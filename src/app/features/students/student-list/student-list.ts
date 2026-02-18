import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit {
  students: any[] = [];
  filteredStudents: any[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    setTimeout(() => {
      this.students = [
        { id: '1', name: 'Arjun Sharma', status: 'Active', collegeName: 'Bangalore Institute of Technology', phone: '+91 9845012345', email: 'arjun@example.com', busNumber: 'KA-01-F-1234', pickupStop: 'Majestic' },
        { id: '2', name: 'Priya Nair', status: 'Active', collegeName: 'RV College of Engineering', phone: '+91 9845012346', email: 'priya@example.com', busNumber: 'KA-01-F-5678', pickupStop: 'Koramangala' },
        { id: '3', name: 'Rahul Verma', status: 'Active', collegeName: 'MS Ramaiah Institute', phone: '+91 9845012347', email: 'rahul@example.com', busNumber: 'KA-01-G-2345', pickupStop: 'Indiranagar' },
        { id: '4', name: 'Sneha Reddy', status: 'Inactive', collegeName: 'PES University', phone: '+91 9845012348', email: 'sneha@example.com', busNumber: null, pickupStop: null },
        { id: '5', name: 'Kiran Patel', status: 'Active', collegeName: 'Christ University', phone: '+91 9845012349', email: 'kiran@example.com', busNumber: 'KA-01-H-1111', pickupStop: 'Jayanagar' },
        { id: '6', name: 'Divya Menon', status: 'Active', collegeName: 'BMS College of Engineering', phone: '+91 9845012350', email: 'divya@example.com', busNumber: 'KA-01-H-2222', pickupStop: 'Hebbal' },
        { id: '7', name: 'Aditya Singh', status: 'Active', collegeName: 'Bangalore Institute of Technology', phone: '+91 9845012351', email: 'aditya@example.com', busNumber: 'KA-01-F-1234', pickupStop: 'Majestic' },
        { id: '8', name: 'Meera Iyer', status: 'Active', collegeName: 'RV College of Engineering', phone: '+91 9845012352', email: 'meera@example.com', busNumber: 'KA-01-F-5678', pickupStop: 'Koramangala' },
      ];
      this.filteredStudents = [...this.students];
      this.loading = false;
    }, 600);
  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredStudents = this.students.filter(s =>
      s.name?.toLowerCase().includes(query) ||
      s.phone?.includes(query) ||
      s.collegeName?.toLowerCase().includes(query) ||
      s.email?.toLowerCase().includes(query)
    );
  }

  deleteStudent(id: string) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.students = this.students.filter(s => s.id !== id);
      this.filteredStudents = this.filteredStudents.filter(s => s.id !== id);
    }
  }
}
