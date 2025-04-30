import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../dtos/list-admin.dtos';

@Injectable({ providedIn: 'root' })
export class AdminService {
    private apiUrl = 'http://localhost:3000/admins';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Admin[]> {
        return this.http.get<Admin[]>(this.apiUrl);
    }

    getById(id: string): Observable<Admin> {
        return this.http.get<Admin>(`${this.apiUrl}/${id}`);
    }

    create(admin: Admin): Observable<Admin> {
        return this.http.post<Admin>(this.apiUrl, admin);
    }

    update(admin: Admin): Observable<Admin> {
        return this.http.put<Admin>(`${this.apiUrl}/${admin.id}`, admin);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
