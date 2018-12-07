
import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  private subscription: Subscription;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.updateDataSubject.subscribe (
      (data: Recipe[]) => {
        this.recipes = data;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
