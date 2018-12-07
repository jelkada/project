

import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }

  fetchRecipes() {
    //const token = this.authService.getToken(); >> moved to interceptor
    //this.http.get('https://ng-recipes-3b275.firebaseio.com/data.json?auth=' + token, { observe: 'response' })
    this.http.get('https://ng-recipes-3b275.firebaseio.com/data.json')
    .map (
      (response: Recipe[]) => {
        let recipes = response;
        for(const recipe of recipes) {
          if (recipe['ingredients']) {
            console.log('ingredients exists');
          } else {
            console.log('ingredients does not exist');
            recipe['ingredients'] = [];
          }
        }
        console.log('fetchRecipes() recipes: ', recipes);
        return recipes;
      }
    )
    .subscribe((recipes: Recipe[]) => {
      console.log('fetchRecipes() ** set recipes ** /n', recipes);
      this.recipeService.setRecipes(recipes);
    });
  }

  saveRecipes() {
    console.log('** saveRecipes(): ', this.recipeService.getRecipes());
    // const token = this.authService.getToken();   + token, this.recipeService.getRecipes()
    return this.http.put('https://ng-recipes-3b275.firebaseio.com/data.json', this.recipeService.getRecipes());
  }

}
