import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from './error-404.component';
import { error404Routes } from './error-404.routing';

@NgModule({
  imports: [RouterModule.forChild(error404Routes), SharedModule],
  declarations: [Error404Component],
})
export class Error404Module {}
