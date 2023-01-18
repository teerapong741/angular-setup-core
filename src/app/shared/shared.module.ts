import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { allIcons, HeroIconModule } from 'ng-heroicon';

const modules = [CommonModule, FormsModule, ReactiveFormsModule];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule {}
