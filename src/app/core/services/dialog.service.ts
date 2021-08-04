import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingDialogComponent } from 'src/app/shared/components/loading-dialog/loading-dialog.component';
import { NotificationDialogComponent } from 'src/app/shared/components/notification-dialog/notification-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public loadingDialog(message?: string) {
    return this.dialog.open(LoadingDialogComponent, { data: { message } });
  }

  public notification(message: string): MatDialogRef<NotificationDialogComponent>;
  public notification(message: string, mode: 'warn' | 'info'): MatDialogRef<NotificationDialogComponent>;
  public notification(message: string, config: { closeButton?: string }): MatDialogRef<NotificationDialogComponent>;
  public notification(message: string, mode: 'warn' | 'info', config: { closeButton?: string }): MatDialogRef<NotificationDialogComponent>;
  public notification(
    message: string,
    modeOrConfig?: 'warn' | 'info' | { closeButton?: string },
    config?: { closeButton?: string }
  ): MatDialogRef<NotificationDialogComponent> {
    var mode = 'warn';
    if (typeof modeOrConfig === 'string') {
      mode = modeOrConfig;
    } else {
      config = modeOrConfig;
    }
    return this.dialog.open(NotificationDialogComponent, { data: { message, closeButton: config?.closeButton, mode } });
  }
}
