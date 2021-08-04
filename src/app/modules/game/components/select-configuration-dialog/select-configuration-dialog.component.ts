import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { containsFraction, Fraction } from 'src/app/core/models/fractions';
import { GameConfiguration } from 'src/app/core/models/game-configuration';

@Component({
  selector: 'app-select-configuration-dialog',
  templateUrl: './select-configuration-dialog.component.html',
  styleUrls: ['./select-configuration-dialog.component.scss'],
})
export class SelectConfigurationDialogComponent {
  get auto() {
    return this.config.auto;
  }
  set auto(value) {
    this.config.auto = value;
  }

  get miasto() {
    return this.config.miasto || 0;
  }
  set miasto(value) {
    this.config.miasto = value;
  }

  get mafia() {
    return this.config.mafia || 0;
  }
  set mafia(value) {
    this.config.mafia = value;
  }

  get mafia2() {
    return this.config.mafia2 || 0;
  }
  set mafia2(value) {
    this.config.mafia2 = value;
  }

  get syndykat() {
    return this.config.syndykat || 0;
  }
  set syndykat(value) {
    this.config.syndykat = value;
  }

  config: GameConfiguration;

  isMafia2: boolean;
  isSyndykat: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) _config: GameConfiguration, private dialogRef: MatDialogRef<SelectConfigurationDialogComponent>) {
    this.config = Object.assign({}, _config);
    this.isMafia2 = containsFraction(this.config.fractions, Fraction.MAFIA2);
    this.isSyndykat = containsFraction(this.config.fractions, Fraction.SYNDYKAT);
  }

  close() {
    this.dialogRef.close();
  }
}
