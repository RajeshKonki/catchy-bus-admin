import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
    today = new Date();

    // Placeholder data matching the screenshot
    stats = [
        { title: 'Total Colleges', value: '12', icon: 'fa-university', color: 'bg-blue' },
        { title: 'Active Routes', value: '45', icon: 'fa-route', color: 'bg-blue' },
        { title: 'Total Buses', value: '67', icon: 'fa-bus', color: 'bg-blue' },
        { title: 'Active Drivers', value: '58', icon: 'fa-user-tie', color: 'bg-blue' },
        { title: 'Total Students', value: '1250', icon: 'fa-user-graduate', color: 'bg-blue' },
        { title: 'Buses Live Now', value: '34', icon: 'fa-map-marker-alt', color: 'bg-blue' }
    ];

    recentActivities = [
        {
            type: 'add',
            title: 'New Bus Added',
            description: 'KA 01 HH 1234 assigned to Route 5',
            time: '2 hours ago',
            icon: 'fa-plus',
            iconClass: 'icon-blue'
        },
        {
            type: 'join',
            title: 'Driver Joined',
            description: 'John Doe assigned to Bus 12',
            time: '5 hours ago',
            icon: 'fa-user-plus',
            iconClass: 'icon-green'
        },
        {
            type: 'alert',
            title: 'Alert',
            description: 'Bus 7 delayed by 15 mins on Route 3',
            time: '1 day ago',
            icon: 'fa-bell',
            iconClass: 'icon-red'
        }
    ];

    ngOnInit() {
        // In a real app, fetch these stats from an API
    }
}
