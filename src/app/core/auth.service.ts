import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly baseUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<boolean> {
        return this.http
            .get<any[]>(`${this.baseUrl}/admins?email=${email}&password=${password}`)
            .pipe(
                map(users => {
                    if (users.length > 0) {
                        localStorage.setItem('token', 'mock-token');
                        localStorage.setItem('admin', JSON.stringify(users[0]));
                        return true;
                    }
                    return false;
                })
            );
    }

    updateAdmin(adminId: number, updatedData: any): Observable<any> {
        return this.http.patch(`${this.baseUrl}/admins/${adminId}`, updatedData).pipe(
            map(updated => {
                localStorage.setItem('admin', JSON.stringify(updated));
                return updated;
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    getCurrentAdmin(): any {
        return JSON.parse(localStorage.getItem('admin') || '{}');
    }
}
