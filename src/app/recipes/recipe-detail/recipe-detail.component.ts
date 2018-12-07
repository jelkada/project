import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

import { RecipeService } from '../../recipes/recipe.service';
import { ShoppinglistService } from '../../shopping-list/shoppinglist.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit, OnDestroy {

  id: number;
  recipe: Recipe;
  private subscription: Subscription;

  constructor(private recipeService: RecipeService, private shoppinglistService: ShoppinglistService,
              private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.recipe = this.recipeService.getRecipeByIndex( Number(this.activatedRoute.snapshot.params['id']) );
    console.log('ngOnInit(): this.recipe: ', this.recipe);
    this.activatedRoute.params.subscribe(
       (params: Params) => {
         this.id = Number(this.activatedRoute.snapshot.params['id']);
         this.recipe = this.recipeService.getRecipeByIndex(+params['id']);
       }
       );
    // update the recipe details whenever the recipes data reloads
    this.subscription = this.recipeService.updateDataSubject.subscribe (
      () => {
        this.recipe = this.recipeService.getRecipeByIndex(this.id);
      });
  }

  onAddShoppingList(recipe: Recipe) {
    this.shoppinglistService.addFromRecipe(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    console.log('onDeleteRecipe >> this.id: ' + this.id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

