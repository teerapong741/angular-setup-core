import { RouterModule } from '@angular/router';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyLayoutComponent } from './empty.component';

const components = [EmptyLayoutComponent];
@NgModule({
  imports: [RouterModule, SharedModule],
  declarations: [...components],
  exports: [...components],
})
export class EmptyModule {}
