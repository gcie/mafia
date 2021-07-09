import { TestBed } from '@angular/core/testing';
import { GamePlayerGuard } from './game-player.guard';

describe('GamePlayerGuard', () => {
  let guard: GamePlayerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GamePlayerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
