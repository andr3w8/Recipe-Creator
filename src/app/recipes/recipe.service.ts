import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable()

export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
    'Hamburger', 
    'Hambuerger recipe', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpUuSKIbKRYBPgbDkM5tNXpiDUAZ86gJiPSw&usqp=CAU',
    [
      new Ingredient('Bread', 1),
      new Ingredient('Beaf Meat', 1),
      new Ingredient('Cheese', 2),
      new Ingredient('Tomatoes', 8),
      new Ingredient('Onion', 6),
      new Ingredient('Salad', 4),
      new Ingredient('Topping', 2)

    ]),
    new Recipe(
      'Salad with meat', 
      'Platting', 
      'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_25/1581912/ribeye-salad-today-061920-tease.jpg',
    [
      new Ingredient('Pork Meat', 2),
      new Ingredient('Eggs', 2),
      new Ingredient('Onion', 1),
      new Ingredient('Cherry-Tomatoes', 4),
      new Ingredient('Salad', 4),
      new Ingredient('Chicken Meat', 1)
    ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}