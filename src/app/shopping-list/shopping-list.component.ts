import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list/shoppinglist.service';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppinglistService: ShoppinglistService) {
  }

  ngOnInit() {
    this.ingredients = this.shoppinglistService.getIngredients();
    this.subscription = this.shoppinglistService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => { this.ingredients = ingredients; }
      );
  }

  onEditIngredient(index: number) {
    this.shoppinglistService.ingredientEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
