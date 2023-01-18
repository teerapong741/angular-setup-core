import { ModernComponent } from './layouts/vertical/modern/modern.component';
import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EmptyModule } from './layouts/empty/empty.module';
import { ModernModule } from './layouts/vertical/modern/modern.module';

const layoutModules = [
  EmptyModule,
  // Vertical
  ModernModule,
];

@NgModule({
  declarations: [LayoutComponent],
  imports: [SharedModule, ...layoutModules],
  exports: [...layoutModules],
})
export class LayoutModule {}
