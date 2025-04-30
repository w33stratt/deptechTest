import { Component } from '@angular/core';
import { Cuti, PegawaiWithCuti } from './dtos/list-cuti.dtos';
import { ActivatedRoute, Router } from '@angular/router';
import { CutiService } from './services/cuti.services';

@Component({
  selector: 'app-list-cuti',
  standalone: false,
  templateUrl: './list-cuti.component.html',
  styleUrl: './list-cuti.component.css'
})
export class ListCutiComponent {
  cutiList: Cuti[] = [];
  employeeId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cutiService: CutiService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.employeeId = id;
      this.fetchCuti();
    } else {
      console.error("Employee ID not found in the route.");
      this.router.navigate(['/error']);
    }
  }


  fetchCuti(): void {
    this.cutiService.getCutiByPegawaiId(this.employeeId).subscribe(data => {
      this.cutiList = data;
    });
  }

  back(): void {
    this.router.navigate(['list-pegawai']);
  }

  onDeleteCuti(id: string | undefined): void {
    if (!id) {
      console.error('Admin ID is not defined');
      return;
    }

    if (confirm('Are you sure you want to delete this pegawai?')) {
      this.cutiService.deleteCuti(id).subscribe(() => {
        this.fetchCuti();
      });
    }
  }
}
