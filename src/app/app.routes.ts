import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Login } from './features/auth/login/login';
import { authGuard } from './core/guards/auth.guard';

// Buses
import { BusList } from './features/buses/bus-list/bus-list';
import { BusDetail } from './features/buses/bus-detail/bus-detail';
import { BusForm } from './features/buses/bus-form/bus-form';

// Colleges
import { CollegeList } from './features/colleges/college-list/college-list';
import { CollegeDetail } from './features/colleges/college-detail/college-detail';
import { CollegeForm } from './features/colleges/college-form/college-form';

// Drivers
import { DriverList } from './features/drivers/driver-list/driver-list';
import { DriverDetail } from './features/drivers/driver-detail/driver-detail';
import { DriverForm } from './features/drivers/driver-form/driver-form';

// Routes
import { RouteList } from './features/routes/route-list/route-list';
import { RouteMap } from './features/routes/route-map/route-map';
import { RouteForm } from './features/routes/route-form/route-form';

// Students
import { StudentList } from './features/students/student-list/student-list';
import { StudentDetail } from './features/students/student-detail/student-detail';
import { StudentForm } from './features/students/student-form/student-form';

// Dashboard
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
    {
        path: 'login',
        component: AuthLayout,
        children: [
            { path: '', component: Login }
        ]
    },
    {
        path: '',
        component: MainLayout,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard },

            // Buses Module
            { path: 'buses', component: BusList },
            { path: 'buses/new', component: BusForm },
            { path: 'buses/:id', component: BusDetail },
            { path: 'buses/:id/edit', component: BusForm },

            // Colleges Module
            { path: 'colleges', component: CollegeList },
            { path: 'colleges/new', component: CollegeForm },
            { path: 'colleges/:id', component: CollegeDetail },
            { path: 'colleges/:id/edit', component: CollegeForm },

            // Drivers Module
            { path: 'drivers', component: DriverList },
            { path: 'drivers/new', component: DriverForm },
            { path: 'drivers/:id', component: DriverDetail },
            { path: 'drivers/:id/edit', component: DriverForm },

            // Routes Module
            { path: 'routes', component: RouteList },
            { path: 'routes/new', component: RouteForm },
            { path: 'routes/:id', component: RouteMap },
            { path: 'routes/:id/edit', component: RouteForm },

            // Students Module
            { path: 'students', component: StudentList },
            { path: 'students/new', component: StudentForm },
            { path: 'students/:id', component: StudentDetail },
            { path: 'students/:id/edit', component: StudentForm },

            // Tracking & Settings (placeholders until implemented)
            { path: 'tracking', redirectTo: 'dashboard' },
            { path: 'settings', redirectTo: 'dashboard' },
        ]
    },
    { path: '**', redirectTo: '' }
];
