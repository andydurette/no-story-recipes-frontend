"use client";
import { CreateRecipe, fetchRecipeByDisplayUrl } from "@/lib/recipeApiCalls";
import { useEffect, useState } from "react";

export default function Recipe({ params }: any) {
  const displayUrl = params.displayUrl;
  const [recipe, setRecipe] = useState<CreateRecipe | undefined>();

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
        <main className="flex min-h-full flex-col justify-center content-center flex-wrap max-w-screen-xl m-0-auto  box-border">
          <div className="px-4 box-border">
            {recipe && (
              <>
                <div
                  className="
              flex m-0-auto items-center justify-center bg-no-repeat 
              flex-col py-10 height-auto min-h-[300px] md:min-h-[500px] mt-5 border-t-4 border-x-4 border-b-40 border-tang 
              "
                  style={{
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                    backgroundImage: `
                linear-gradient(183deg, transparent, transparent 88%, #d26011 88.3%, #d26011 100%),
                url(${recipe.photoURL})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="flex flex-col bg-tang rounded-b-lg">
                  <div className="p-5">
                    <h1 className="my-4 -mt-8 text-6xl md:text-8xl font-bold tracking-tight text-white medium-grey">
                      {recipe.name}
                    </h1>
                    <h2 className="mt-6 mb-4 text-2xl md:text-3xl tracking-tight text-white font-light">
                      {recipe.description}
                    </h2>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col flex-wrap xl:flex-nowrap mt-8 mx-auto">
            <div className="flex flex-wrap mb-4 flex-row w-5/5 mx-4">
              <h2 className="md:ml-0 basis-full mb-4 text-2xl md:text-3xl tracking-tight text-white font-semibold flex flex-wrap">
                Ingredients
              </h2>
              <div className="flex flex-wrap flex-col md:flex-row w-5/5 ">
                {recipe &&
                  recipe.ingredients.map((r: string, i: number) => {
                    return (
                      <div key={i} className="flex items-center mb-4 mr-4">
                        <ul className="ml-5 flex flex-row sm:flex-col">
                          <li className="list-disc text-xl md:text-2xl font-extralight">
                            {r}
                          </li>
                        </ul>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="flex flex-col w-5/5  mx-4">
              <h2 className="md:ml-0 basis-full sm:basis-auto mb-4 text-2xl md:text-3xl tracking-tight text-white font-semibold">
                Directions
              </h2>
              {recipe &&
                recipe.directions.map((r: string, i: number) => {
                  return (
                    <div key={i}>
                      <h3 className="mb-4 text-xl md:text-2xl tracking-tight text-gray-900 font-semibold text-white">
                        Step {i + 1}
                      </h3>
                      <div key={i} className="flex items-center mb-4">
                        <p className="text-xl md:text-2xl font-extralight">
                          {r}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </main>
      ) : (
        <main className="flex min-h-full flex-col justify-center content-center flex-wrap max-w-screen-xl m-0-auto  box-border"></main>
      )}
    </>
  );
}
