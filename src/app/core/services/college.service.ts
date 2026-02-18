import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { College } from '../models/entities.model';
import { ApiResponse, PaginatedResponse } from '../models/api.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CollegeService {
    private http = inject(HttpClient);
    private apiUrl = ''; // Removed environment.apiUrl dependency

    getAll(page = 1, pageSize = 100): Observable<College[] | PaginatedResponse<College>> {
        return of([]);
    }

    getById(id: string): Observable<College> {
        return of({} as College);
    }

    create(college: Partial<College>): Observable<College> {
        return of(college as College);
    }

    update(id: string, college: Partial<College>): Observable<College> {
        return of({ ...college, id } as College);
    }

    delete(id: string): Observable<void> {
        return of(undefined);
    }
}
