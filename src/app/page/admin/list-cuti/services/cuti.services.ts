import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cuti, PegawaiWithCuti } from '../dtos/list-cuti.dtos';

@Injectable({
    providedIn: 'root'
})
export class CutiService {
    private baseUrl = 'http://localhost:3000/cuti';

    constructor(private http: HttpClient) { }

    getAllCuti(): Observable<Cuti[]> {
        return this.http.get<Cuti[]>(this.baseUrl);
    }

    getCutiByPegawaiId(employeeId: string): Observable<Cuti[]> {
        return this.http.get<Cuti[]>(`${this.baseUrl}?employeeId=${employeeId}`);
    }

    getCutiById(id: string): Observable<Cuti> {
        return this.http.get<Cuti>(`${this.baseUrl}/${id}`);
    }

    createCuti(cuti: Cuti): Observable<Cuti> {
        return this.http.post<Cuti>(this.baseUrl, cuti);
    }

    updateCuti(cuti: Cuti): Observable<Cuti> {
        return this.http.put<Cuti>(`${this.baseUrl}/${cuti.id}`, cuti);
    }

    deleteCuti(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
