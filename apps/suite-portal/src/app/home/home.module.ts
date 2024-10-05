import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ThankYouComponent } from '../thank-you/thank-you.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  declarations: [HomeComponent, ThankYouComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
