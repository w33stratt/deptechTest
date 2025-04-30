import { Component, OnInit } from '@angular/core';
import { Cuti } from '../dtos/list-cuti.dtos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CutiService } from '../services/cuti.services';
import { differenceInCalendarDays, parseISO } from 'date-fns';

@Component({
  selector: 'app-create-cuti',
  standalone: false,
  templateUrl: './create-cuti.component.html',
  styleUrl: './create-cuti.component.css'
})
export class CreateCutiComponent implements OnInit {
  cutiForm!: FormGroup;
  employeeId!: string;
  cutiId!: string | null;  // ID cuti yang akan diedit (untuk edit)
  existingCuti: Cuti[] = [];
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cutiService: CutiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.cutiId = this.route.snapshot.paramMap.get('cutiId'); // Ambil cutiId dari URL jika ada
    this.initForm();

    if (this.cutiId) {
      this.loadCutiData();  // Jika cutiId ada, ambil data cuti berdasarkan ID
    }

    this.loadExistingCuti();
  }

  initForm(): void {
    this.cutiForm = this.fb.group({
      reason: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  loadExistingCuti(): void {
    this.cutiService.getCutiByPegawaiId(this.employeeId).subscribe(data => {
      this.existingCuti = data;
    });
  }

  loadCutiData(): void {
    if (this.cutiId) {
      this.cutiService.getCutiById(this.cutiId).subscribe(data => {
        this.cutiForm.patchValue({
          reason: data.reason,
          startDate: data.startDate,
          endDate: data.endDate
        });
      });
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    const { startDate, endDate } = this.cutiForm.value;

    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const totalDays = differenceInCalendarDays(end, start) + 1;

    if (totalDays !== 1) {
      this.errorMessage = 'Cuti hanya boleh 1 hari per bulan.';
      return;
    }

    const month = start.getMonth();
    const year = start.getFullYear();

    // Cek cuti bulan sama
    const hasCutiInMonth = this.existingCuti.some(cuti => {
      const cutiDate = new Date(cuti.startDate);
      return cutiDate.getFullYear() === year && cutiDate.getMonth() === month;
    });

    if (hasCutiInMonth) {
      this.errorMessage = 'Sudah mengambil cuti di bulan ini.';
      return;
    }

    // Hitung total cuti di tahun ini
    const totalCutiThisYear = this.existingCuti.reduce((acc, cur) => {
      const date = new Date(cur.startDate);
      return date.getFullYear() === year ? acc + 1 : acc;
    }, 0);

    if (totalCutiThisYear >= 12) {
      this.errorMessage = 'Cuti tahunan sudah mencapai batas 12 hari.';
      return;
    }

    const newCuti: Cuti = {
      employeeId: this.employeeId,
      ...this.cutiForm.value
    };

    if (this.cutiId) {
      // Jika ada cutiId, lakukan update
      this.cutiService.updateCuti({ ...newCuti, id: this.cutiId }).subscribe(() => {
        this.router.navigate(['/pegawai', this.employeeId, 'cuti']);
      });
    } else {
      // Jika tidak ada cutiId, buat cuti baru
      this.cutiService.createCuti(newCuti).subscribe(() => {
        this.router.navigate(['/pegawai', this.employeeId, 'cuti']);
      });
    }
  }
}
