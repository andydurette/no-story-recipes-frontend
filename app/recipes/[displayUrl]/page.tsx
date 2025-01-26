"use client";
import {
  Recipe as RecipeType,
  fetchRecipeByDisplayUrl,
} from "@/lib/recipeApiCalls";
import { useEffect, useState } from "react";
import IngredientCheckBox from "../../../components/IngredientCheckBox";

export default function Recipe({ params }: any) {
  const displayUrl = params.displayUrl;
  const [recipe, setRecipe] = useState<RecipeType | undefined>();

  useEffect(() => {
    async function getRecipe() {
      const fetchRecipesData = await fetchRecipeByDisplayUrl(displayUrl);
      setRecipe(fetchRecipesData);
    }
    getRecipe();
  }, [displayUrl]);

  return (
    <>
      {recipe ? (
        <main className="flex min-h-full flex-col justify-center content-center flex-wrap min-w-full">
          <div className="flex flex-row content-start pt-4 px-4 md:px-8 flex-wrap max-w-screen-xl md:min-w-[768px] lg:min-w-[1024px] xl:min-w-[1280px] content-center m-auto ">
            <h1 className="mt-4 text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight text-white medium-grey min-w-full">
              {recipe.name.toUpperCase()}
            </h1>
            <h2 className="mt-6 mb-8 text-lg xl:text-2xl tracking-tight text-white font-light min-w-full">
              {recipe.description}
            </h2>
            <div
              className="w-full h-[250px] lg:h-[500px] xl:h-[600px] mb-2 rounded"
              style={{
                backgroundImage: `url(${recipe.photoURL})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <div className="flex sm:flex-col md:flex-row flex-wrap xl:flex-nowrap mt-8 mx-auto">
              <div className="flex flex-col w-5/5 lg:w-2/5">
                <div>
                  <h2 className="md:ml-0 basis-full mb-4 text-xl md:text-2xl tracking-tight text-white font-semibold flex flex-wrap">
                    INGREDIENTS
                  </h2>
                </div>
                <div className="flex flex-col w-5/5 lg:w-3/5 justify-start content-start items-start">
                  {recipe &&
                    recipe.ingredients.map((ingredient: string, i: number) => {
                      return (
                        <IngredientCheckBox key={i} ingredient={ingredient} />
                      );
                    })}
                </div>
              </div>
              <div className="flex flex-col w-5/5 lg:w-3/5">
                <h2 className="md:ml-0 basis-full sm:basis-auto mb-4 text-xl md:text-2xl  text-white font-semibold">
                  DIRECTIONS
                </h2>
                {recipe &&
                  recipe.directions.map((r: string, i: number) => {
                    return (
                      <div key={i}>
                        {/* <h3 className="mb-4 text-xl md:text-2xl text-gray-900 font-semibold text-white">
                          Step {i + 1}
                        </h3> */}
                        <div key={i} className="flex items-center mb-4">
                          <p className="text-xl font-extralight">
                            <span className="font-bold">{i + 1}.</span> {r}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="flex min-h-full flex-col justify-center content-center flex-wrap max-w-screen-xl m-0-auto  box-border"></main>
      )}
    </>
  );
}
