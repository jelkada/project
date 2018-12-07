

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RecipesComponent} from './recipes.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {AuthGuardService} from '../auth/auth-guard.service';
import {SelectRecipeComponent} from './select-recipe.component';


const recipesRoutes: Routes = [
  { path: '', component: RecipesComponent, children: [
      { path: '', component: SelectRecipeComponent },
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService] },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService] },
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(recipesRoutes)],
  exports: [RouterModule]
})

export class RecipesRoutingModule {
}
