import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAdminComponent } from './list-admin/list-admin.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../../core/auth.guard';
import { AdminCreateComponent } from './list-admin/admin-create/admin-create.component';
import { ListPegawaiComponent } from './list-pegawai/list-pegawai.component';
import { PegawaiCreateComponent } from './list-pegawai/pegawai-create/pegawai-create.component';
import { ListCutiComponent } from './list-cuti/list-cuti.component';
import { CreateCutiComponent } from './list-cuti/create-cuti/create-cuti.component';

const routes: Routes = [
    { path: '', component: ListAdminComponent, canActivate: [AuthGuard] },
    { path: 'list-pegawai', component: ListPegawaiComponent, canActivate: [AuthGuard] },
    { path: 'pegawai/:id/cuti', component: ListCutiComponent, canActivate: [AuthGuard] },
    { path: 'pegawai/:id/cuti/create', component: CreateCutiComponent, canActivate: [AuthGuard] },
    { path: 'pegawai/:id/cuti/:cutiId/edit', component: CreateCutiComponent, canActivate: [AuthGuard] },
    { path: 'admin/create', component: AdminCreateComponent, canActivate: [AuthGuard] },
    { path: 'admin/edit/:id', component: AdminCreateComponent, canActivate: [AuthGuard] },
    { path: 'pegawai/create', component: PegawaiCreateComponent, canActivate: [AuthGuard] },
    { path: 'pegawai/edit/:id', component: PegawaiCreateComponent, canActivate: [AuthGuard] },
    { path: 'change-profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
