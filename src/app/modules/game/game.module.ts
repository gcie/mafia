import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { GameMasterGuard } from 'src/app/core/guards/game-master.guard';
import { GamePlayerGuard } from 'src/app/core/guards/game-player.guard';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material.module';
import { MasterViewComponent } from './master-view/master-view.component';
import { PlayerViewComponent } from './player-view/player-view.component';

const routes: Routes = [
  { path: 'player', component: PlayerViewComponent, canActivate: [GamePlayerGuard] },
  { path: 'master', component: MasterViewComponent, canActivate: [GameMasterGuard] },
];

@NgModule({
  declarations: [PlayerViewComponent, MasterViewComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, SharedModule, RouterModule.forChild(routes)],
})
export class GameModule {}
