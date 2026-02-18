import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-route-map',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './route-map.html',
  styleUrl: './route-map.css',
})
export class RouteMap implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  loading = true;
  error = '';
  route: any = null;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    setTimeout(() => {
      this.loading = false;
      this.route = {
        id,
        name: 'Route A',
        status: 'Active',
        startPoint: 'Majestic',
        endPoint: 'Engineering College',
        stops: [
          { name: 'Shivajinagar', address: 'Shivajinagar Bus Stand' },
          { name: 'Indiranagar', address: '100 Feet Road' },
          { name: 'Engineering College', address: 'Main Gate' },
        ],
      };
    }, 500);
  }
}
