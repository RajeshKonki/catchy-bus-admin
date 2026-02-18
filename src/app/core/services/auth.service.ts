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

    login(credentials: { email: string; password: string }): Observable<LoginResponse> {
        // Mock login
        const mockResponse: LoginResponse = {
            success: true,
            token: 'mock-token-' + Date.now(),
            user: {
                id: '1',
                email: credentials.email,
                name: 'Admin User',
                fullName: 'System Administrator',
                role: 'SuperAdmin'
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
