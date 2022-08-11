import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GameMasterGuard } from 'src/app/core/guards/game-master.guard';
import { GamePlayerGuard } from 'src/app/core/guards/game-player.guard';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameGuard } from '../../core/guards/game.guard';
import { MaterialModule } from '../material.module';
import { SelectConfigurationDialogComponent } from './components/select-configuration-dialog/select-configuration-dialog.component';
import { SelectFractionsDialogComponent } from './components/select-fractions-dialog/select-fractions-dialog.component';
import { MasterViewComponent } from './master-view/master-view.component';
import { PlayerViewComponent } from './player-view/player-view.component';
import { GameEffects } from './state/game-effects.service';
import { gameReducer } from './state/game.reducers';
import { MasterWaitingRoomComponent } from './views/master-waiting-room/master-waiting-room.component';
import { PlayerWaitingRoomComponent } from './views/player-waiting-room/player-waiting-room.component';

const routes: Routes = [
  {
    path: 'player',
    component: PlayerViewComponent,
    canActivate: [GamePlayerGuard],
    children: [{ path: 'waiting-room', component: PlayerWaitingRoomComponent }],
  },
  {
    path: 'master',
    component: MasterViewComponent,
    canActivate: [GameMasterGuard],
    children: [{ path: 'waiting-room', component: MasterWaitingRoomComponent }],
  },
  { path: '**', redirectTo: 'player/waiting-room' },
];

@NgModule({
  declarations: [
    PlayerViewComponent,
    MasterViewComponent,
    PlayerWaitingRoomComponent,
    MasterWaitingRoomComponent,
    SelectFractionsDialogComponent,
    SelectConfigurationDialogComponent,
  ],
  providers: [GameGuard],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('game', { game: gameReducer }),
    EffectsModule.forFeature([GameEffects]),
  ],
})
export class GameModule {}
