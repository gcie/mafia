import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './home.component';

const routes: Routes = [{ path: '', component: HomeComponent, canActivate: [AuthGuard] }];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, SharedModule, RouterModule.forChild(routes)],
})
export class HomeModule {}
