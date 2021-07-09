import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotificationDialogComponent } from './notification-dialog.component';

describe('NotificationDialogComponent', () => {
  let component: NotificationDialogComponent;
  let fixture: ComponentFixture<NotificationDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationDialogComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
