import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'list-admin', loadChildren: () => import('./page/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
