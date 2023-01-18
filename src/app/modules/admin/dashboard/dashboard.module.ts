import { RouterModule } from '@angular/router';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routing';

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes), SharedModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
