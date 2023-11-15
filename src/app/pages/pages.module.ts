import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { FaqComponent } from './faq/faq.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components = [HomeComponent, FaqComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PagesModule {}
