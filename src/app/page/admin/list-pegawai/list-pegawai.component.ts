import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PegawaiService } from './services/list-pegawai.services';
import { Pegawai } from './dtos/list-pegawai.dtos';

@Component({
  selector: 'app-list-pegawai',
  standalone: false,
  templateUrl: './list-pegawai.component.html',
  styleUrl: './list-pegawai.component.css'
})
export class ListPegawaiComponent implements OnInit {

  pegawaiList: Pegawai[] = [];

  constructor(private pegawaiService: PegawaiService, private router: Router) { }

  ngOnInit(): void {
    this.fetchPegawai();
  }

  fetchPegawai(): void {
    this.pegawaiService.getPegawai().subscribe(data => {
      this.pegawaiList = data;
    });
  }

  goToCreatePegawai(): void {
    this.router.navigate(['/pegawai/create']);
  }

  goToEditPegawai(id: string | undefined): void {
    if (id) {
      this.router.navigate([`/pegawai/edit/${id}`]);
    } else {
      console.error('Admin ID is not defined');
    }
  }

  onDeletePegawai(id: string | undefined): void {
    if (!id) {
      console.error('Admin ID is not defined');
      return;
    }

    if (confirm('Are you sure you want to delete this pegawai?')) {
      this.pegawaiService.deletePegawai(id).subscribe(() => {
        this.fetchPegawai();
      });
    }
  }

  goToCuti(id: string | undefined): void {
    if (id) {
      this.router.navigate([`/pegawai/${id}/cuti`]);
    } else {
      console.error('Pegawai ID tidak ada');
    }
  }
}
