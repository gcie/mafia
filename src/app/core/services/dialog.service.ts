import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  public notification(message: string, closeButton?: string) {
    return this.dialog.open(NotificationDialogComponent, { data: { message, closeButton } });
  }
}
