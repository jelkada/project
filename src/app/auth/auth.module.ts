
import {NgModule} from '@angular/core';
import {SigninComponent} from './signin/signin.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    SigninComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: []
})

export class AuthModule { }
