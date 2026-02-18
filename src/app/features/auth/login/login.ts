import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class Login {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    loginForm: FormGroup;
    loading = false;
    error = '';
    showPassword = false;

    /** 'superadmin' | 'college' */
    activeRole: 'superadmin' | 'college' = 'superadmin';

    constructor() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    selectRole(role: 'superadmin' | 'college') {
        this.activeRole = role;
        this.loginForm.reset();
        this.error = '';
    }

    togglePassword() {
        this.showPassword = !this.showPassword;
    }

    onSubmit() {
        if (this.loginForm.invalid) return;

        this.loading = true;
        this.error = '';

        this.authService.login({ ...this.loginForm.value, role: this.activeRole }).subscribe({
            next: () => {
                // Both roles land on the same dashboard for now;
                // swap to a college-specific route when ready.
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                this.error = err.error?.message || 'Login failed. Please check your credentials.';
                this.loading = false;
            }
        });
    }

    get emailPlaceholder(): string {
        return this.activeRole === 'superadmin'
            ? 'admin@catchybus.com'
            : 'college@bit.edu.in';
    }

    get submitLabel(): string {
        return this.activeRole === 'superadmin'
            ? 'Sign In as Super Admin'
            : 'Sign In as College';
    }
}
