import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingEllipsisComponent } from './loading-ellipsis.component';

const components = [LoadingEllipsisComponent];
@NgModule({
  imports: [SharedModule],
  declarations: [...components],
  exports: [...components],
})
export class LoadingEllipsisModule {}
