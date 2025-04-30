import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { Admin } from './dtos/list-admin.dtos';
import { Observable } from 'rxjs';
import { AdminService } from './services/list-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-admin',
  standalone: false,
  templateUrl: './list-admin.component.html',
  styleUrl: './list-admin.component.css'
})
export class ListAdminComponent implements OnInit {

  admins$: Observable<Admin[]> | undefined;

  constructor(private adminService: AdminService, private router: Router) {

  }

  ngOnInit(): void {
    this.admins$ = this.adminService.getAll();
    initFlowbite();
  }

  goToCreateAdmin(): void {
    this.router.navigate(['/admin/create']);
  }

  goToEditAdmin(id: string | undefined): void {
    if (id) {
      this.router.navigate([`/admin/edit/${id}`]);
    } else {
      console.error('Admin ID is not defined');
    }
  }

  onDeleteAdmin(id: string | undefined): void {
    if (!id) {
      console.error('Admin ID is not defined');
      return;
    }

    if (confirm('Are you sure you want to delete this admin?')) {
      this.adminService.delete(id).subscribe(() => {
        this.admins$ = this.adminService.getAll();
      });
    }
  }

  maskPassword(password: string): string {
    return password.replace(/./g, '*');
  }


}
