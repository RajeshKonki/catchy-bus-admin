import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, of, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
    id: string;
    email: string;
    name?: string;
    fullName?: string;
    role?: string;
    loginRole?: 'superadmin' | 'college';
    collegeName?: string;
    collegeLogo?: string;
    collegeAddress?: string;
}

export interface LoginResponse {
    success: boolean;
    token: string;
    user: User;
    message?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private apiUrl = ''; // Removed environment.apiUrl dependency

    currentUser = signal<User | null>(this.getUserFromStorage());

    login(credentials: { email: string; password: string; role?: 'superadmin' | 'college' }): Observable<LoginResponse> {
        const isCollege = credentials.role === 'college';
        // Mock login
        const mockResponse: LoginResponse = {
            success: true,
            token: 'mock-token-' + Date.now(),
            user: {
                id: '1',
                email: credentials.email,
                name: isCollege ? 'College Admin' : 'Admin User',
                fullName: isCollege ? 'College Administrator' : 'System Administrator',
                role: isCollege ? 'CollegeAdmin' : 'SuperAdmin',
                loginRole: credentials.role ?? 'superadmin',
                ...(isCollege && {
                    collegeName: 'Bangalore Institute of Technology',
                    collegeLogo: 'assets/logos/bit.svg',
                    collegeAddress: 'K.R. Road, V.V. Puram, Bangalore - 560004'
                })
            }
        };

        return of(mockResponse).pipe(
            tap(response => {
                this.setSession(response);
            })
        );
    }

    logout() {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        this.currentUser.set(null);
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('adminToken');
    }

    get loginRole(): 'superadmin' | 'college' {
        return this.currentUser()?.loginRole ?? 'superadmin';
    }

    get isCollegeAdmin(): boolean {
        return this.loginRole === 'college';
    }

    private setSession(authResult: LoginResponse) {
        localStorage.setItem('adminToken', authResult.token);
        localStorage.setItem('adminUser', JSON.stringify(authResult.user));
        this.currentUser.set(authResult.user);
    }

    private getUserFromStorage(): User | null {
        const userStr = localStorage.getItem('adminUser');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch {
                return null;
            }
        }
        return null;
    }
}
