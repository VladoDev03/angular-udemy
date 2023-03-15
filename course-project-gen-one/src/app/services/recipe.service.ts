import { Recipe } from "../recipes/recipe.model";

export class RecipeService {
    private recipes: Recipe[] = [
		new Recipe(
			'Test Recipe',
			'This is simply a test?',
			'https://www.thespruceeats.com/thmb/oiPAglxewK9x2Mhn41ITgOiMA4I=/3000x2001/filters:fill(auto,1)/PecanTassiesHERO-80cfb45b27cb48e9879917934b89ca61.jpg'
		),
		new Recipe(
			'Another Test Recipe',
			'This is simply another test?',
			'https://th.bing.com/th/id/OIP.1VqqOpR-W88b42UUYE8OwQHaEK?pid=ImgDet&rs=1'
		),
	]

    getRecipes() {
        return this.recipes.slice()
    }
}