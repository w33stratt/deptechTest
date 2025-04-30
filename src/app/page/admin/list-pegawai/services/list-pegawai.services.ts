// src/app/services/pegawai.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pegawai } from '../dtos/list-pegawai.dtos';

@Injectable({
    providedIn: 'root'
})
export class PegawaiService {
    private apiUrl = 'http://localhost:3000/pegawai';

    constructor(private http: HttpClient) { }

    getPegawai(): Observable<Pegawai[]> {
        return this.http.get<Pegawai[]>(this.apiUrl);
    }

    getPegawaiById(id: string): Observable<Pegawai> {
        return this.http.get<Pegawai>(`${this.apiUrl}/${id}`);
    }

    createPegawai(pegawai: Pegawai): Observable<Pegawai> {
        return this.http.post<Pegawai>(this.apiUrl, pegawai);
    }

    updatePegawai(pegawai: Pegawai): Observable<Pegawai> {
        return this.http.put<Pegawai>(`${this.apiUrl}/${pegawai.id}`, pegawai);
    }

    deletePegawai(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
