

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {HttpClient} from '@angular/common/http';


import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(	'A Schnitzel Recipe',
      'This is a tasty Schitzel',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [ new Ingredient('meat', 1),  new Ingredient('fries', 20) ]
    ),
    new Recipe(	'A Mac Recipe',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [ new Ingredient('meat', 2),  new Ingredient('buns', 2) ]
    )
  ];

  updateDataSubject  = new Subject<Recipe[]>();

  // getIngredient(index) {
  //   return this.ingredients[index];
  // }

  constructor(private http: HttpClient) {
  }


  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    console.log('setRecipes(): recipes: ', recipes);
    this.recipes = recipes;
    this.updateDataSubject.next(this.recipes.slice());
  }

  getRecipeByIndex(index: number) {
    return this.recipes[index];
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    // console.log('recipe.service >> this.recipes[0].name: ' + this.recipes[0].name);
    this.updateDataSubject.next(this.recipes.slice());
  }

  addRecipe (recipe: Recipe) {
    this.recipes.push(recipe);
    this.updateDataSubject.next(this.recipes);
  }

  deleteIngredient(recipeIndex: number, ingredientIndex: number) {
    console.log('>> ' + recipeIndex + ', ' + ingredientIndex);
  }

}
