import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Driver } from '../models/entities.model';
import { ApiResponse, PaginatedResponse } from '../models/api.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private http = inject(HttpClient);
  private apiUrl = ''; // Removed environment.apiUrl dependency

  getAll(filters?: { collegeId?: string; status?: string; search?: string }, page = 1, pageSize = 10): Observable<PaginatedResponse<Driver>> {
    return of({ data: [], total: 0, page, pageSize, totalPages: 0 } as PaginatedResponse<Driver>);
  }

  getById(id: string): Observable<ApiResponse<Driver>> {
    return of({ success: true, data: {} as Driver } as ApiResponse<Driver>);
  }

  create(driver: Partial<Driver>): Observable<ApiResponse<Driver>> {
    return of({ success: true, data: driver as Driver } as ApiResponse<Driver>);
  }

  update(id: string, driver: Partial<Driver>): Observable<ApiResponse<Driver>> {
    return of({ success: true, data: { ...driver, id } as Driver } as ApiResponse<Driver>);
  }

  delete(id: string): Observable<ApiResponse<void>> {
    return of({ success: true, data: undefined } as ApiResponse<void>);
  }

  uploadProfilePicture(id: string, file: File): Observable<ApiResponse<{ url: string }>> {
    return of({ success: true, data: { url: 'assets/logos/logo.png' } } as ApiResponse<{ url: string }>);
  }
}
