import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmDialogService } from '../../../shared/services/confirm-dialog.service';

@Component({
  selector: 'app-route-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './route-list.html',
  styleUrl: './route-list.css',
})
export class RouteList implements OnInit {
  routes: any[] = [];
  filteredRoutes: any[] = [];
  loading = true;
  error = '';

  constructor(private cdr: ChangeDetectorRef, private confirmDialog: ConfirmDialogService) { }

  ngOnInit() {
    setTimeout(() => {
      this.routes = [
        { id: '1', name: 'Majestic → BIT Route', status: 'Active', startPoint: 'Majestic Bus Stand', endPoint: 'Bangalore Institute of Technology', distance: 8.5, stops: [{ name: 'Majestic' }, { name: 'Shivajinagar' }, { name: 'Vasanth Nagar' }, { name: 'BIT Main Gate' }] },
        { id: '2', name: 'Koramangala → RVCE Route', status: 'Active', startPoint: 'Koramangala 5th Block', endPoint: 'RV College of Engineering', distance: 12.3, stops: [{ name: 'Koramangala' }, { name: 'BTM Layout' }, { name: 'Banashankari' }, { name: 'RVCE Gate' }] },
        { id: '3', name: 'Indiranagar → MSRIT Route', status: 'Active', startPoint: 'Indiranagar 100 Feet Rd', endPoint: 'MS Ramaiah Institute', distance: 10.1, stops: [{ name: 'Indiranagar' }, { name: 'Ulsoor' }, { name: 'Hebbal' }, { name: 'MSRIT' }] },
        { id: '4', name: 'Whitefield → PES Route', status: 'Inactive', startPoint: 'Whitefield Main Road', endPoint: 'PES University', distance: 22.7, stops: [{ name: 'Whitefield' }, { name: 'Marathahalli' }, { name: 'Silk Board' }, { name: 'PES University' }] },
        { id: '5', name: 'Jayanagar → Christ Route', status: 'Active', startPoint: 'Jayanagar 4th Block', endPoint: 'Christ University', distance: 5.2, stops: [{ name: 'Jayanagar' }, { name: 'Lalbagh' }, { name: 'Hosur Road' }, { name: 'Christ University' }] },
      ];
      this.filteredRoutes = [...this.routes];
      this.loading = false;
      this.cdr.detectChanges();
    }, 1000);
  }

  itemsPerPage = 5;
  currentPage = 1;

  get totalPages() {
    return Math.ceil(this.filteredRoutes.length / this.itemsPerPage);
  }

  get paginatedRoutes() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredRoutes.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredRoutes = this.routes.filter(r =>
      r.name?.toLowerCase().includes(query) ||
      r.startPoint?.toLowerCase().includes(query) ||
      r.endPoint?.toLowerCase().includes(query)
    );
    this.currentPage = 1; // Reset to first page on search
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  async deleteRoute(id: string) {
    const confirmed = await this.confirmDialog.confirm({
      title: 'Delete Route',
      message: 'Are you sure you want to delete this route? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger'
    });
    if (confirmed) {
      this.routes = this.routes.filter(r => r.id !== id);
      this.filteredRoutes = this.filteredRoutes.filter(r => r.id !== id);
      if (this.currentPage > this.totalPages && this.totalPages > 0) {
        this.currentPage = this.totalPages;
      }
      this.cdr.detectChanges();
    }
  }
}
