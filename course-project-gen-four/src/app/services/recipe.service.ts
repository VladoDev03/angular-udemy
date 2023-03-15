import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable()
export class RecipeService {
	recipesChanged = new Subject<Recipe[]>()

    private recipes: Recipe[] = [
		new Recipe(
			'Sweets',
			'This is simply a test?',
			'https://www.thespruceeats.com/thmb/oiPAglxewK9x2Mhn41ITgOiMA4I=/3000x2001/filters:fill(auto,1)/PecanTassiesHERO-80cfb45b27cb48e9879917934b89ca61.jpg',
			[
				new Ingredient('Milk', 1),
				new Ingredient('Sugar', 2),
				new Ingredient('Flour', 1.5)
			]
		),
		new Recipe(
			'Pizza',
			'This is simply another test?',
			'https://th.bing.com/th/id/OIP.1VqqOpR-W88b42UUYE8OwQHaEK?pid=ImgDet&rs=1',
			[
				new Ingredient('Pepperoni', 3),
				new Ingredient('dough', 2),
				new Ingredient('Tomato sauce', 1.2),
				new Ingredient('Mozzarella', 0.5)
			]
		),
	]

	constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice()
    }

	getRecipe(index: number) {
		return this.recipes.slice()[index]
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.shoppingListService.addIngredients(ingredients)
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe)
		this.recipesChanged.next(this.recipes.slice())
	}

	updateRecipe(index: number, newRecipe: Recipe) {
		this.recipes[index] = newRecipe
		this.recipesChanged.next(this.recipes.slice())
	}

	deleteRecipe(index: number) {
		this.recipes.splice(index, 1)
		this.recipesChanged.next(this.recipes.slice())
	}
}
