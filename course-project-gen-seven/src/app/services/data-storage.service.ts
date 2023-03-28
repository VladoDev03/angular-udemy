import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "./auth.service";
import { RecipeService } from "./recipe.service";

// better than providing in app/core module
@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
    ) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes()

        this.http.put(
            'https://ng-course-recipe-book-37982-default-rtdb.firebaseio.com/recipes.json',
            recipes
        ).subscribe(
            response => {
                console.log(response)
            }
        )
    }

    fetchRecipes() {
        // this.authService.user.subscribe().unsubscribe()
        return this.http.get<Recipe[]>(
            'https://ng-course-recipe-book-37982-default-rtdb.firebaseio.com/recipes.json'
        ).pipe(map(recipes => {
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            })
        }), tap(
            (recipes: Recipe[]) => {
                console.log(recipes)
                this.recipeService.setRecipes(recipes)
            }
        ))
    }
}
