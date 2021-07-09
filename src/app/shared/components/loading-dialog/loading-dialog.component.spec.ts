import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LoadingDialogComponent } from './loading-dialog.component';

describe('LoadingDialogComponent', () => {
  let component: LoadingDialogComponent;
  let fixture: ComponentFixture<LoadingDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingDialogComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
