import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { GameGuard } from './core/guards/game.guard';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule) },
  {
    path: 'game/:token',
    loadChildren: () => import('./modules/game/game.module').then((m) => m.GameModule),
    canActivate: [AuthGuard, GameGuard],
  },
  { path: '**', redirectTo: 'home' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
