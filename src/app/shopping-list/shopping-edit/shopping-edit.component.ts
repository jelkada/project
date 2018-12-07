
import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppinglistService } from '../../shopping-list/shoppinglist.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') myForm: NgForm;
  private subscription: Subscription;
  editMode = false;
  currentIngredient: Ingredient;
  currentIngredientIndex: number;

  constructor(private shoppingListService: ShoppinglistService) {
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.ingredientEditing.subscribe (
      (index: number) => {
        this.editMode = true;
        this.currentIngredientIndex = index;
        this.currentIngredient = this.shoppingListService.getIngredient(index);
        this.myForm.setValue({
          name: this.currentIngredient.name,
          amount: this.currentIngredient.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const ingName = form.value.name;
    const ingAmount = form.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editMode){
      this.shoppingListService.updateIngredient(this.currentIngredientIndex, newIngredient);
      this.myForm.reset();
      this.editMode = false;
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
  }

  onDeleteIngredient() {
    this.shoppingListService.deleteIngredient(this.currentIngredientIndex);
    this.onClearIngredient();
  }

  onClearIngredient() {
    this.myForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
