import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Route } from '../models/entities.model';
import { ApiResponse, PaginatedResponse } from '../models/api.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private http = inject(HttpClient);
  private apiUrl = ''; // Removed environment.apiUrl dependency

  getAll(collegeId?: string, page = 1, pageSize = 10): Observable<PaginatedResponse<Route>> {
    return of({ data: [], total: 0, page, pageSize, totalPages: 0 } as PaginatedResponse<Route>);
  }

  getById(id: string): Observable<ApiResponse<Route>> {
    return of({ success: true, data: {} as Route } as ApiResponse<Route>);
  }

  create(route: Partial<Route>): Observable<ApiResponse<Route>> {
    return of({ success: true, data: route as Route } as ApiResponse<Route>);
  }

  update(id: string, route: Partial<Route>): Observable<ApiResponse<Route>> {
    return of({ success: true, data: { ...route, id } as Route } as ApiResponse<Route>);
  }

  delete(id: string): Observable<ApiResponse<void>> {
    return of({ success: true, data: undefined } as ApiResponse<void>);
  }
}
