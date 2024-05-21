export enum cuisineEnum {
  asian = "asian",
  mexican = "mexican",
  american = "american",
}

export interface Recipe {
  id: string;
  displayUrl: string;
  cuisine: cuisineEnum;
  description: string;
  directions: string[];
  ingredients: string[];
  name: string;
  photoURL: string;
}

export async function fetchRecipes(
  cuisineQuery: string | null,
  recipeQueryString: string | null
): Promise<Recipe[] | undefined> {
  let constructUrl = `${
    process.env.NEXT_PUBLIC_BACKEND_URL_PATH
      ? process.env.NEXT_PUBLIC_BACKEND_URL_PATH
      : "http://localhost:4000"
  }/recipe/queryRecipes`;
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
  try {
    const res = await fetch(constructUrl);
    if (!res.ok) throw new Error("Fetch Recipes error!");
    const data: Recipe[] = await res.json();
    return data;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}

export async function fetchRecipeByDisplayUrl(
  displayUrl: string
): Promise<Recipe | undefined> {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL_PATH
          ? process.env.NEXT_PUBLIC_BACKEND_URL_PATH
          : "http://localhost:4000"
      }/recipe/displayUrl/${displayUrl}`
    );
    if (!res.ok) throw new Error("Fetch Recipes error!");
    const data: Recipe = await res.json();
    return data;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}
