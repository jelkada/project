
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from '../app-routing.module';
import {HomeComponent} from './home/home.component';
import {ShoppinglistService} from '../shopping-list/shoppinglist.service';
import {RecipeService} from '../recipes/recipe.service';
import {DataStorageService} from '../shared/data-stotage.service';
import {AuthService} from '../auth/auth.service';
import {AuthGuardService} from '../auth/auth-guard.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../shared/auth.interceptor';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    AppRoutingModule
  ],
  providers: [
    ShoppinglistService,
    RecipeService,
    DataStorageService,
    AuthService,
    AuthGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class CoreModule { }
