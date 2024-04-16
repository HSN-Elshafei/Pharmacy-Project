import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComponentLayoutComponent } from './component-layout/component-layout.component';
import { NavbarComponent } from './navbar/navbar.component';





@NgModule({
  declarations: [ComponentLayoutComponent, NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class LayoutModule { }
