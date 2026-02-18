import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmDialogService } from '../../../shared/services/confirm-dialog.service';

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

  constructor(private cdr: ChangeDetectorRef, private confirmDialog: ConfirmDialogService) { }

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
      this.cdr.detectChanges();
    }, 1000);
  }

  itemsPerPage = 5;
  currentPage = 1;

  get totalPages() {
    return Math.ceil(this.filteredColleges.length / this.itemsPerPage);
  }

  get paginatedColleges() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredColleges.slice(startIndex, startIndex + this.itemsPerPage);
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

  get filteredColleges() {
    if (!this.searchTerm) return this.colleges;
    return this.colleges.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm) ||
      c.email.toLowerCase().includes(this.searchTerm) ||
      c.contactPerson.toLowerCase().includes(this.searchTerm) ||
      c.phone.includes(this.searchTerm)
    );
  }

  async deleteCollege(id: string) {
    const confirmed = await this.confirmDialog.confirm({
      title: 'Delete College',
      message: 'Are you sure you want to delete this college? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger'
    });
    if (confirmed) {
      this.colleges = this.colleges.filter(c => c.id !== id);
      if (this.currentPage > this.totalPages && this.totalPages > 0) {
        this.currentPage = this.totalPages;
      }
      this.cdr.detectChanges();
    }
  }
}
