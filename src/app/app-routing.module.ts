
import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SigninComponent } from './auth/signin/signin.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './core/home/home.component';

//import { ErrorPageComponent } from './error-page.component';
//import { ServerResolver } from './servers/server/server-resolver.service';

const appRoutes: Routes = [
  // { 'path': '', redirectTo: 'recipes', pathMatch: 'full' },
  { 'path': '', component: HomeComponent },
  { 'path': 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
  { 'path': 'shopping-list', component: ShoppingListComponent },
  { 'path': 'signin', component: SigninComponent },
  { 'path': 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
