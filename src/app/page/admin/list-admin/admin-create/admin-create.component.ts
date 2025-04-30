import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/list-admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateAdminDTO } from './dtos/admin-create.dtos';
import { Admin } from '../dtos/list-admin.dtos';

@Component({
  selector: 'app-admin-create',
  standalone: false,
  templateUrl: './admin-create.component.html',
  styleUrl: './admin-create.component.css'
})
export class AdminCreateComponent {
  createAdminForm: FormGroup;
  isEditMode: boolean = false;
  adminId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createAdminForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.adminId = params.get('id');
      if (this.adminId) {
        this.isEditMode = true;
        this.loadAdminData(this.adminId);
      }
    });
  }

  loadAdminData(id: string): void {
    this.adminService.getById(id).subscribe((admin: Admin) => {
      this.createAdminForm.patchValue({
        id: admin.id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        birthDate: admin.birthDate,
        gender: admin.gender,
        password: admin.password,
      });
    });
  }


  get f() {
    return this.createAdminForm.controls;
  }

  onSubmit(): void {
    if (this.createAdminForm.invalid) {
      return;
    }

    const adminData: Admin = this.createAdminForm.value;

    if (this.isEditMode) {
      const updatedData: Admin = {
        ...adminData,
        id: this.adminId!,
      };
      this.adminService.update(updatedData).subscribe(() => {
        this.router.navigate(['/list-admin']);
      });
    } else {
      const newAdmin: CreateAdminDTO = {
        firstName: adminData.firstName,
        lastName: adminData.lastName,
        email: adminData.email,
        birthDate: adminData.birthDate,
        gender: adminData.gender,
        password: adminData.password,
      };

      this.adminService.create(newAdmin).subscribe(() => {
        this.router.navigate(['/list-admin']);
      });
    }
  }

}
