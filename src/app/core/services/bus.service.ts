import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Bus } from '../models/entities.model';
import { ApiResponse, PaginatedResponse } from '../models/api.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BusService {
    private http = inject(HttpClient);
    private apiUrl = ''; // Removed environment.apiUrl dependency

    getAll(filters?: { collegeId?: string; status?: string; search?: string }, page = 1, pageSize = 10): Observable<Bus[] | PaginatedResponse<Bus>> {
        return of([]);
    }

    getById(id: string): Observable<Bus> {
        return of({} as Bus);
    }

    create(bus: Partial<Bus>): Observable<Bus> {
        return of(bus as Bus);
    }

    update(id: string, bus: Partial<Bus>): Observable<Bus> {
        return of({ ...bus, id } as Bus);
    }

    delete(id: string): Observable<void> {
        return of(undefined);
    }
}
