import { HeroIconModule, allIcons } from 'ng-heroicon';

import { LoadingEllipsisModule } from 'src/app/shared/components/loading-ellipsis/loading-ellipsis.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SidebarComponent } from './sidebar.component';

const components = [SidebarComponent];
const componentModule = [LoadingEllipsisModule];

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    HeroIconModule.withIcons({
      ...allIcons,
    }),
    ...componentModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class SidebarModule {}
