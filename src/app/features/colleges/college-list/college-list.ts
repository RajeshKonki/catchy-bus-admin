import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-college-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './college-list.html',
  styleUrl: './college-list.css'
})
export class CollegeList implements OnInit {
  colleges: any[] = [];
  loading = true;
  error = '';
  searchTerm = '';

  ngOnInit() {
    setTimeout(() => {
      this.colleges = [
        { id: '1', name: 'Bangalore Institute of Technology', status: 'Active', contactPerson: 'Dr. Suresh Kumar', email: 'admin@bit.edu.in', phone: '+91 80-2661-5865', address: 'K.R. Road, V.V. Puram, Bangalore - 560004', logo: 'assets/logos/bit.svg' },
        { id: '2', name: 'RV College of Engineering', status: 'Active', contactPerson: 'Dr. Prema Nair', email: 'principal@rvce.edu.in', phone: '+91 80-6717-8001', address: 'Mysore Road, RV Vidyanikethan Post, Bangalore - 560059', logo: 'assets/logos/rvce.svg' },
        { id: '3', name: 'MS Ramaiah Institute of Technology', status: 'Active', contactPerson: 'Dr. Anand Rao', email: 'principal@msrit.edu', phone: '+91 80-2360-0822', address: 'MSR Nagar, MSRIT Post, Bangalore - 560054', logo: 'assets/logos/msrit.svg' },
        { id: '4', name: 'PES University', status: 'Active', contactPerson: 'Dr. Jayadeva', email: 'info@pes.edu', phone: '+91 80-2672-1983', address: '100 Feet Ring Road, BSK III Stage, Bangalore - 560085', logo: 'assets/logos/pes.svg' },
        { id: '5', name: 'Christ University', status: 'Active', contactPerson: 'Fr. Abraham VM', email: 'registrar@christuniversity.in', phone: '+91 80-4012-9100', address: 'Hosur Road, Bangalore - 560029', logo: '' },
        { id: '6', name: 'BMS College of Engineering', status: 'Inactive', contactPerson: 'Dr. Mohan Kumar', email: 'principal@bmsce.ac.in', phone: '+91 80-2662-2130', address: 'Bull Temple Road, Basavanagudi, Bangalore - 560019', logo: '' },
      ];
      this.loading = false;
    }, 600);
  }

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
  }

  get filteredColleges() {
    if (!this.searchTerm) return this.colleges;
    return this.colleges.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm) ||
      c.email.toLowerCase().includes(this.searchTerm) ||
      c.contactPerson.toLowerCase().includes(this.searchTerm) ||
      c.phone.includes(this.searchTerm)
    );
  }

  deleteCollege(id: string) {
    if (confirm('Are you sure you want to delete this college?')) {
      this.colleges = this.colleges.filter(c => c.id !== id);
    }
  }
}
