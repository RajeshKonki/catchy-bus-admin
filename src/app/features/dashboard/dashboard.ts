import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
    private auth = inject(AuthService);
    today = new Date();

    get isCollegeAdmin() { return this.auth.isCollegeAdmin; }
    get currentUser() { return this.auth.currentUser(); }

    // Super Admin stats
    superAdminStats = [
        { title: 'Total Colleges', value: '12', icon: 'fa-university', color: 'bg-blue' },
        { title: 'Active Routes', value: '45', icon: 'fa-route', color: 'bg-blue' },
        { title: 'Total Buses', value: '67', icon: 'fa-bus', color: 'bg-blue' },
        { title: 'Active Drivers', value: '58', icon: 'fa-user-tie', color: 'bg-blue' },
        { title: 'Total Students', value: '1250', icon: 'fa-user-graduate', color: 'bg-blue' },
        { title: 'Buses Live Now', value: '34', icon: 'fa-map-marker-alt', color: 'bg-blue' }
    ];

    // College-specific stats
    collegeStats = [
        { title: 'My Routes', value: '8', icon: 'fa-route', color: 'bg-blue' },
        { title: 'Total Buses', value: '12', icon: 'fa-bus', color: 'bg-blue' },
        { title: 'Active Drivers', value: '10', icon: 'fa-user-tie', color: 'bg-blue' },
        { title: 'Total Students', value: '320', icon: 'fa-user-graduate', color: 'bg-blue' },
        { title: 'Buses Live Now', value: '7', icon: 'fa-map-marker-alt', color: 'bg-blue' },
        { title: 'On-Time Rate', value: '94%', icon: 'fa-check-circle', color: 'bg-blue' }
    ];

    get stats() {
        return this.isCollegeAdmin ? this.collegeStats : this.superAdminStats;
    }

    // Super Admin recent activities
    superAdminActivities = [
        { type: 'add', title: 'New Bus Added', description: 'KA 01 HH 1234 assigned to Route 5', time: '2 hours ago', icon: 'fa-plus', iconClass: 'icon-blue' },
        { type: 'join', title: 'Driver Joined', description: 'John Doe assigned to Bus 12', time: '5 hours ago', icon: 'fa-user-plus', iconClass: 'icon-green' },
        { type: 'alert', title: 'Alert', description: 'Bus 7 delayed by 15 mins on Route 3', time: '1 day ago', icon: 'fa-bell', iconClass: 'icon-red' }
    ];

    // College-specific recent activities
    collegeActivities = [
        { type: 'add', title: 'Student Enrolled', description: 'Arjun Sharma added to Route 3 (Majestic → BIT)', time: '1 hour ago', icon: 'fa-user-plus', iconClass: 'icon-green' },
        { type: 'alert', title: 'Bus Delayed', description: 'KA-01-F-1234 delayed by 10 mins on Route 2', time: '3 hours ago', icon: 'fa-bell', iconClass: 'icon-red' },
        { type: 'add', title: 'Driver Assigned', description: 'Rajesh Kumar assigned to morning Route 1', time: '1 day ago', icon: 'fa-user-tie', iconClass: 'icon-blue' }
    ];

    get recentActivities() {
        return this.isCollegeAdmin ? this.collegeActivities : this.superAdminActivities;
    }

    ngOnInit() { }

    logoError(event: Event) {
        // Hide broken image so the *ngIf fallback shows instead
        (event.target as HTMLImageElement).style.display = 'none';
    }
}
