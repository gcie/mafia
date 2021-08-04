import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss'],
})
export class NotificationDialogComponent {
  message: string;
  closeButton: string;
  mode: 'warn' | 'info';

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.message = ((data?.message as string) || '').replace('\n', '<br>');
    this.closeButton = data?.closeButton || 'OK';
    this.mode = data?.mode || 'warn';
  }
}
