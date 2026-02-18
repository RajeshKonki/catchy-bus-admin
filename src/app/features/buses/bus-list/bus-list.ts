import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bus-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bus-list.html',
  styleUrl: './bus-list.css'
})
export class BusList implements OnInit {
  buses: any[] = [];
  loading = true;
  error = '';
  searchTerm = '';

  ngOnInit() {
    setTimeout(() => {
      this.buses = [
        { id: '1', busNumber: 'KA-01-F-1234', title: 'Morning Route A', status: 'Active', routeName: 'Majestic → BIT', collegeName: 'Bangalore Institute of Technology', capacity: 45 },
        { id: '2', busNumber: 'KA-01-F-5678', title: 'Evening Route B', status: 'Active', routeName: 'Koramangala → RVCE', collegeName: 'RV College of Engineering', capacity: 40 },
        { id: '3', busNumber: 'KA-01-G-2345', title: 'Afternoon Route C', status: 'Maintenance', routeName: 'Indiranagar → MSRIT', collegeName: 'MS Ramaiah Institute', capacity: 50 },
        { id: '4', busNumber: 'KA-01-G-6789', title: 'Morning Route D', status: 'Active', routeName: 'Whitefield → PES', collegeName: 'PES University', capacity: 42 },
        { id: '5', busNumber: 'KA-01-H-1111', title: 'Night Route E', status: 'Inactive', routeName: 'Jayanagar → Christ', collegeName: 'Christ University', capacity: 38 },
        { id: '6', busNumber: 'KA-01-H-2222', title: 'Morning Route F', status: 'Active', routeName: 'Hebbal → BMSCE', collegeName: 'BMS College of Engineering', capacity: 44 },
      ];
      this.loading = false;
    }, 600);
  }

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
  }

  get filteredBuses() {
    if (!this.searchTerm) return this.buses;
    return this.buses.filter(bus =>
      bus.busNumber.toLowerCase().includes(this.searchTerm) ||
      bus.title.toLowerCase().includes(this.searchTerm) ||
      bus.routeName?.toLowerCase().includes(this.searchTerm) ||
      bus.collegeName?.toLowerCase().includes(this.searchTerm)
    );
  }

  deleteBus(id: string) {
    if (confirm('Are you sure you want to delete this bus?')) {
      this.buses = this.buses.filter(b => b.id !== id);
    }
  }
}
