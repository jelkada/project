
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import {Subscription} from 'rxjs';

import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

import { RecipeService } from '../../recipes/recipe.service';


@Component({
  selector: 'app-recipe-edit',
  styles: [ '.content-padding { padding: 20px; }'],
  templateUrl: './recipe-edit.component.html'
})

export class RecipeEditComponent implements OnInit {

  recipe: Recipe;
  id: number;
  editMode = false;

  reactiveForm: FormGroup;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {
  }




  ngOnInit() {
    this.route.params.subscribe(
       (params: Params) => {
         this.id = params['id'];
         this.editMode = (this.id != null);
         console.log('ngOnInit(): subscribe(): this.editMode:' + this.editMode);
         console.log('ngOnInit(): subscribe(): this.id:' + this.id);
         this.initForm();
       }
     );
  }

  initForm() {
    let name = '';
    let desc = '';
    let imgUrl = '';
    const ingredientsFormArray = new FormArray([]);

    if (this.editMode) {
      this.recipe = this.recipeService.getRecipeByIndex(this.id);
      name = this.recipe.name;
      desc = this.recipe.description;
      imgUrl = this.recipe.imagePath;
      if ( this.recipe.ingredients ) {
        for (const ingredient of this.recipe.ingredients) {
          console.log('ingredient: ' + ingredient);
          ingredientsFormArray.push(
            new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.reactiveForm = new FormGroup({
      'name': new FormControl(name, [Validators.required]),
      'desc': new FormControl(desc, [Validators.required]),
      'imgUrl': new FormControl(imgUrl, [Validators.required]),
      'ingredients': ingredientsFormArray
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.recipe.name = this.reactiveForm.get('name').value;
      this.recipe.description = this.reactiveForm.get('desc').value;
      this.recipe.imagePath = this.reactiveForm.get('imgUrl').value;
      this.recipe.ingredients = this.reactiveForm.get('ingredients').value;
      this.recipeService.updateRecipe(this.id, this.recipe);
    } else {
        this.recipe = new Recipe(
            this.reactiveForm.get('name').value,
            this.reactiveForm.get('desc').value,
            this.reactiveForm.get('imgUrl').value,
            null);
        this.recipeService.addRecipe(this.recipe);
        this.router.navigate([ '/recipes']);
    }
  }

  onCancelRecipe() {
    this.router.navigate([ '/recipes', this.id] );
    this.editMode = false;
  }

  onDeleteIngredient(index: number) {
    console.log('>> index: ' + index);
    (<FormArray>this.reactiveForm.get('ingredients')).removeAt(index);
    this.recipe.ingredients.splice(index, 1);
    this.recipeService.updateRecipe(this.id, this.recipe);
  }

  onAddIngredient(){
    (<FormArray>this.reactiveForm.get('ingredients')).push(
      new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

}


