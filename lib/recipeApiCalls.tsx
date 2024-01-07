export enum cuisineEnum {
  asian = "asian",
  mexican = "mexican",
  american = "american",
}

export interface CreateRecipe {
  id: string;
  displayUrl: string;
  cuisine: cuisineEnum;
  description: string;
  directions: string[];
  ingredients: string[];
  name: string;
  photoURL: string;
  published: boolean;
}

export async function fetchRecipes(
  cuisineQuery: string | null,
  recipeQueryString: string | null
): Promise<CreateRecipe[] | undefined> {
  console.log("cuisineQuery", cuisineQuery);
  console.log("recipeQueryString", recipeQueryString);
  let constructUrl = "http://localhost:4000/recipe/queryRecipe";
  if (cuisineQuery || recipeQueryString) {
    constructUrl = constructUrl + "?";
  }
  if (cuisineQuery) {
    constructUrl = constructUrl + `cuisineQuery=${cuisineQuery}`;
  }
  if (recipeQueryString) {
    constructUrl = constructUrl + `${cuisineQuery ? `&` : ""}`;
    constructUrl = constructUrl + `recipeQueryString=${recipeQueryString}`;
  }
  console.log("constructUrl", constructUrl);
  try {
    const res = await fetch(constructUrl);
    if (!res.ok) throw new Error("Fetch Recipes error!");
    const data: CreateRecipe[] = await res.json();
    return data;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}

export async function fetchRecipeByDisplayUrl(
  displayUrl: string
): Promise<CreateRecipe | undefined> {
  try {
    const res = await fetch(
      `http://localhost:4000/recipe/displayUrl/${displayUrl}`
    );
    if (!res.ok) throw new Error("Fetch Recipes error!");
    const data: CreateRecipe = await res.json();
    return data;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}
