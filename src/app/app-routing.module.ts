import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule) },
  { path: '**', redirectTo: 'home' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
