import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  adminId!: number;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    const admin = this.authService.getCurrentAdmin();
    this.adminId = admin.id;
    this.profileForm = this.fb.group({
      firstName: [admin.firstName],
      lastName: [admin.lastName],
      email: [admin.email],
      birthDate: [admin.birthDate],
      gender: [admin.gender],
      password: [admin.password],
    });
  }

  ngOnInit(): void { }

  save() {
    this.authService.updateAdmin(this.adminId, this.profileForm.value).subscribe({
      next: () => alert('Profil berhasil diperbarui'),
      error: () => alert('Gagal memperbarui profil')
    });
  }
}
