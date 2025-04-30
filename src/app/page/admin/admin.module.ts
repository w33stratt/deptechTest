import { provideHttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ListAdminComponent } from './list-admin/list-admin.component';
import { AdminRoutingModule } from "./admin-routing.module";
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminService } from "./list-admin/services/list-admin.service";
import { AdminCreateComponent } from './list-admin/admin-create/admin-create.component';
import { ListPegawaiComponent } from './list-pegawai/list-pegawai.component';
import { PegawaiCreateComponent } from './list-pegawai/pegawai-create/pegawai-create.component';
import { ListCutiComponent } from './list-cuti/list-cuti.component';
import { CreateCutiComponent } from './list-cuti/create-cuti/create-cuti.component';

@NgModule({
    declarations: [
        ListAdminComponent,
        ProfileComponent,
        AdminCreateComponent,
        ListPegawaiComponent,
        PegawaiCreateComponent,
        ListCutiComponent,
        CreateCutiComponent
    ],
    imports: [
        AdminRoutingModule,
        ReactiveFormsModule,
        CommonModule,
        SharedModule,
    ],
    providers: [AdminService],
})
export class AdminModule { }
