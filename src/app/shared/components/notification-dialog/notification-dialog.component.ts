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

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.message = data?.message;
    this.closeButton = data?.closeButton || 'OK';
  }
}
