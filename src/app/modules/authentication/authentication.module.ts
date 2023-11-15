import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from 'src/app/layout/layout.module';
import { LoginComponent } from './login/login.component';
import { CreateCardFormComponent } from './create-card-form/create-card-form.component';

const component = [
  AuthenticationComponent,
  LoginComponent,
  CreateCardFormComponent,
];
@NgModule({
  declarations: [...component],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
  ],
})
export class AuthenticationModule {}
