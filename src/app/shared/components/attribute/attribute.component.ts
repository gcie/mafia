import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss'],
})
export class AttributeComponent {
  @Input()
  set editable(value) {
    this._editable = coerceBooleanProperty(value);
  }
  get editable() {
    return this._editable;
  }
  private _editable: boolean = false;

  @Input() label: string;
  @Input() value: any;

  @Output() edit = new EventEmitter<void>();
}
