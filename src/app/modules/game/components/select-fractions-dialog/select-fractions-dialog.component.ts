import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FractionConfigurationEnum, FractionData, fractionData } from 'src/app/core/models/fractions';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-select-fractions-dialog',
  templateUrl: './select-fractions-dialog.component.html',
  styleUrls: ['./select-fractions-dialog.component.scss'],
})
export class SelectFractionsDialogComponent {
  public options = fractionData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public fractionConfig: FractionConfigurationEnum,
    private dialogRef: MatDialogRef<SelectFractionsDialogComponent>,
    private dialog: DialogService
  ) {}

  showInfo(option: FractionData) {
    this.dialog.notification(option.description, 'info');
  }

  close() {
    this.dialogRef.close();
  }
}
