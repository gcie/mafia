import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MasterWaitingRoomComponent } from './master-waiting-room.component';

describe('Master`WaitingRoomComponent', () => {
  let component: MasterWaitingRoomComponent;
  let fixture: ComponentFixture<MasterWaitingRoomComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MasterWaitingRoomComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(MasterWaitingRoomComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
