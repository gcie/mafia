import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SelectConfigurationDialogComponent } from './select-configuration-dialog.component';

describe('SelectConfigurationDialogComponent', () => {
  let component: SelectConfigurationDialogComponent;
  let fixture: ComponentFixture<SelectConfigurationDialogComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SelectConfigurationDialogComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(SelectConfigurationDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
