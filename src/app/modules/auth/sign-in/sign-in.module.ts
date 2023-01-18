import { AuthService } from 'src/app/core/auth/auth.service';
import { signInRoutes } from './sign-in.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(signInRoutes)],
  declarations: [SignInComponent],
  providers: [AuthService],
})
export class SignInModule {}
