"use client";
import { fetchRecipes, Recipe } from "@/lib/recipeApiCalls";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import RecipeSearch from "@/components/recipeSearch";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

export default function RecipeList() {
  // Add query params to app
  const router = useRouter();
  // Handle search params
  const [recipes, setRecipes] = useState<Recipe[] | undefined>();
  const [recipesCount, setRecipesCount] = useState<number>(0);
  const [recipesSkip, setRecipesSkip] = useState<number>(0);
  const [loadMoreRecipes, setLoadMoreRecipes] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const paramCuisine = searchParams.get("cuisine");
  const paramRecipeQueryString = searchParams.get("recipeQueryString");
  const [searchInput, setSearchInput] = useState<string>(
    paramRecipeQueryString ? paramRecipeQueryString : ""
  );
  const [cuisine, setCuisine] = useState<string>(
    paramCuisine ? paramCuisine : "ALL_CUISINE"
  );

  const debouncedValue = useDebounce<string>(searchInput, 500);
  // const paramRouter = useParamRouter();

  /////

  const handleScroll = useCallback(async () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    setRecipes((prevRecipes) => {
      if (
        scrollTop + clientHeight >= scrollHeight - 10 &&
        prevRecipes &&
        prevRecipes.length !== recipesCount
      ) {
        setLoadMoreRecipes(true);
      }
      return prevRecipes;
    });
  }, [recipesCount]);

  // Event listener for scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /////

  const submitSearch = useCallback(async () => {
    const addParams = new URLSearchParams();
    const paramCuisine = searchParams.get("cuisine");
    const paramRecipeQueryString = searchParams.get("recipeQueryString");
    if (cuisine !== "ALL_CUISINE") {
      addParams.set("cuisine", cuisine);
    }
    if (debouncedValue) {
      addParams.set("recipeQueryString", searchInput);
    }

    if (cuisine !== paramCuisine || searchInput !== paramRecipeQueryString) {
      router.push("/recipes" + "?" + addParams);
    }
  }, [cuisine, debouncedValue, router, searchInput, searchParams]);

  useEffect(() => {
    submitSearch();
  }, [debouncedValue, submitSearch]);

  const getRecipes = useCallback(async () => {
    const cuisineQuery = searchParams.get("cuisine");
    const recipeQueryString = searchParams.get("recipeQueryString");
    // const recipeQuerySkip = searchParams.get("recipeQuerySkip");
    const fetchRecipesData = await fetchRecipes(
      cuisineQuery,
      recipeQueryString,
      "0"
    );
    setRecipesCount(0);
    setRecipes(fetchRecipesData?.recipes);
    setRecipesCount(fetchRecipesData?.count ? fetchRecipesData.count : 0);
  }, [searchParams]);

  const getMoreRecipes = useCallback(async () => {
    const cuisineQuery = searchParams.get("cuisine");
    const recipeQueryString = searchParams.get("recipeQueryString");

    if (recipes && recipes.length > 0 && recipes.length !== recipesCount) {
      const skipValue = () => {
        if (recipesSkip === 0 || recipes.length === 12) {
          return 12;
        } else {
          return 0;
        }
      };
      const updateSkipValue = skipValue();
      setRecipesSkip(updateSkipValue);
      const fetchRecipesData = await fetchRecipes(
        cuisineQuery,
        recipeQueryString,
        `${updateSkipValue}`
      );

      if (fetchRecipesData?.recipes) {
        setRecipes([...recipes, ...fetchRecipesData?.recipes]);
        setLoadMoreRecipes(false);
      }
    } else {
      setLoadMoreRecipes(false);
    }
  }, [recipes, recipesCount, recipesSkip, searchParams]);

  useEffect(() => {
    if (loadMoreRecipes && recipes && recipes.length > 0) {
      getMoreRecipes();
    }
  }, [searchParams, loadMoreRecipes, getRecipes, getMoreRecipes, recipes]);

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  return (
    <main className="flex min-h-full flex-row content-start py-4 px-4 md:py-16 md:px-16 flex-wrap max-w-screen-xl lg:min-w-[1024px] xl:min-w-[1368px] -mb-10">
      <div className="basis-full mb-4 ">
        <RecipeSearch
          cuisine={cuisine}
          setCuisine={setCuisine}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          submitSearch={submitSearch}
        />
      </div>
      {recipes &&
        recipes.map((recipe) => {
          return (
            <div
              key={recipe.displayUrl}
              className="overflow-hidden  m-2 flex-[1_0_75%] md:flex-[1_0_40%] 
              lg:flex-[1_0_25%] 2xl:flex-[1_0_20%] max-w-screen-md"
            >
              <Link href={`/recipes/${recipe.displayUrl}`}>
                <div
                  className="w-full h-[250px] xl:h-[275px] mb-2 rounded"
                  style={{
                    backgroundImage: `url(${recipe.photoURL})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="flex flex-col justify-between content-between items-stretch justify-items-stretch">
                  <h5 className="text-1xl font-bold tracking-tight text-white">
                    {recipe.name.toUpperCase()}
                  </h5>
                </div>
              </Link>
            </div>
          );
        })}
      {/* Forces flex alignment of list items */}
      <div
        className="
        rounded-lg border-gray-700 bg-heavy-grey overflow-hidden shadow-xl max-w-screen-md
        flex-[1_0_75%] md:flex-[1_0_40%] lg:flex-[1_0_25%] 2xl:flex-[1_0_20%] m-2
        "
        style={{ visibility: "hidden" }}
      ></div>
      <div
        className="
        rounded-lg border-gray-700 bg-heavy-grey overflow-hidden shadow-xl max-w-screen-md
        flex-[1_0_75%] md:flex-[1_0_40%] lg:flex-[1_0_25%] 2xl:flex-[1_0_20%] m-2
        "
        style={{ visibility: "hidden" }}
      ></div>
      <div
        className="
        rounded-lg border-gray-700 bg-heavy-grey overflow-hidden shadow-xl max-w-screen-md
        flex-[1_0_75%] md:flex-[1_0_40%] lg:flex-[1_0_25%] 2xl:flex-[1_0_20%] m-2
        "
        style={{ visibility: "hidden" }}
      ></div>
      <div
        className="
        rounded-lg border-gray-700 bg-heavy-grey overflow-hidden shadow-xl max-w-screen-md
        flex-[1_0_75%] md:flex-[1_0_40%] lg:flex-[1_0_25%] 2xl:flex-[1_0_20%] m-2
        "
        style={{ visibility: "hidden" }}
      ></div>
      <div
        className="
        rounded-lg border-gray-700 bg-heavy-grey overflow-hidden shadow-xl max-w-screen-md
        flex-[1_0_75%] md:flex-[1_0_40%] lg:flex-[1_0_25%] 2xl:flex-[1_0_20%] m-2
        "
        style={{ visibility: "hidden" }}
      ></div>
    </main>
  );
}
