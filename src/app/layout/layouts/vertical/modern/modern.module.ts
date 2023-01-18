import { AuthService } from 'src/app/core/auth/auth.service';
import { ModernComponent } from './modern.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'src/app/layout/common/sidebar/sidebar.module';

const components = [ModernComponent];
const commonModule = [SidebarModule];

@NgModule({
  imports: [RouterModule, SharedModule, ...commonModule],
  declarations: [...components],
  exports: [...components],
  providers: [AuthService],
})
export class ModernModule {}
