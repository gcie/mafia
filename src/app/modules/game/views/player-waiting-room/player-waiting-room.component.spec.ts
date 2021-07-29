import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PlayerWaitingRoomComponent } from './player-waiting-room.component';

describe('PlayerWaitingRoomComponent', () => {
  let component: PlayerWaitingRoomComponent;
  let fixture: ComponentFixture<PlayerWaitingRoomComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PlayerWaitingRoomComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(PlayerWaitingRoomComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
