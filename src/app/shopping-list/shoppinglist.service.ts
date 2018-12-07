
import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppinglistService {

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientEditing  = new Subject<number>();

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index].name = ingredient.name;
    this.ingredients[index].amount = ingredient.amount;
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addFromRecipe(ingredients: Ingredient[]) {
    // console.log("ingredients.length: " + ingredients.length);

    for (let ingredient of ingredients) {
      let obj = this.ingredients.find(o => o.name ===  ingredient.name);
      if (obj)
        obj.amount += ingredient.amount;
      else this.ingredients.push(ingredient);
    }
    // update the ingredients array of the shopping list component
    this.ingredientsChanged.next(this.ingredients.slice());

    // for (var i = 0; i < ingredients.length; i++) {
    //   let obj = this.ingredients.find(o => o.name ===  ingredients[i].name);
    //   if (obj)
    //     obj.amount += ingredients[i].amount;
    //   else this.ingredients.push(ingredients[i]);
    // }
    // this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
