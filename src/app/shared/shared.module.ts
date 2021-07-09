import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../modules/material.module';
import { LoadingDialogComponent } from './components/loading-dialog/loading-dialog.component';
import { NotificationDialogComponent } from './components/notification-dialog/notification-dialog.component';
import { UppercaseDirective } from './directives/uppercase.directive';

@NgModule({
  declarations: [UppercaseDirective, LoadingDialogComponent, NotificationDialogComponent],
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  exports: [UppercaseDirective, LoadingDialogComponent, NotificationDialogComponent],
  providers: [],
})
export class SharedModule {}
