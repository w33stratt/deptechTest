import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PegawaiService } from '../services/list-pegawai.services';
import { ActivatedRoute, Router } from '@angular/router';
import { Pegawai } from '../dtos/list-pegawai.dtos';
import { CreatePegawaiDTO } from './dtos/pegawai-create.dtos';

@Component({
  selector: 'app-pegawai-create',
  standalone: false,
  templateUrl: './pegawai-create.component.html',
  styleUrl: './pegawai-create.component.css'
})
export class PegawaiCreateComponent {
  createPegawaiForm: FormGroup;
  isEditMode: boolean = false;
  pegawaiId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private pegawaiService: PegawaiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createPegawaiForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      gender: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.pegawaiId = params.get('id');
      if (this.pegawaiId) {
        this.isEditMode = true;
        this.loadPegawaiData(this.pegawaiId);
      }
    });
  }

  loadPegawaiData(id: string): void {
    this.pegawaiService.getPegawaiById(id).subscribe((pegawai: Pegawai) => {
      this.createPegawaiForm.patchValue({
        id: pegawai.id,
        firstName: pegawai.firstName,
        lastName: pegawai.lastName,
        email: pegawai.email,
        phoneNumber: pegawai.phoneNumber,
        address: pegawai.address,
        gender: pegawai.gender,
      });
    });
  }


  get f() {
    return this.createPegawaiForm.controls;
  }

  onSubmit(): void {
    if (this.createPegawaiForm.invalid) {
      return;
    }

    const pegawaiData: Pegawai = this.createPegawaiForm.value;

    if (this.isEditMode) {
      const updatedData: Pegawai = {
        ...pegawaiData,
        id: this.pegawaiId!,
      };
      this.pegawaiService.updatePegawai(updatedData).subscribe(() => {
        this.router.navigate(['/list-pegawai']);
      });
    } else {
      const newAdmin: CreatePegawaiDTO = {
        firstName: pegawaiData.firstName,
        lastName: pegawaiData.lastName,
        email: pegawaiData.email,
        phoneNumber: pegawaiData.phoneNumber,
        address: pegawaiData.address,
        gender: pegawaiData.gender,
      };

      this.pegawaiService.createPegawai(newAdmin).subscribe(() => {
        this.router.navigate(['/list-pegawai']);
      });
    }
  }
}
