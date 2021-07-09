import { TestBed } from '@angular/core/testing';
import { GameMasterGuard } from './game-master.guard';

describe('GameMasterGuard', () => {
  let guard: GameMasterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GameMasterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
