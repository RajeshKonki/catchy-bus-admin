import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
    }, 600);
  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredRoutes = this.routes.filter(r =>
      r.name?.toLowerCase().includes(query) ||
      r.startPoint?.toLowerCase().includes(query) ||
      r.endPoint?.toLowerCase().includes(query)
    );
  }

  deleteRoute(id: string) {
    if (confirm('Are you sure you want to delete this route?')) {
      this.routes = this.routes.filter(r => r.id !== id);
      this.filteredRoutes = this.filteredRoutes.filter(r => r.id !== id);
    }
  }
}
