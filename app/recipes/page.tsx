"use client";
import { fetchRecipes, CreateRecipe } from "@/lib/recipeApiCalls";
import { useEffect, useState } from "react";
import leftArrow from "../../assets/leftArrow.svg";
import Image from "next/image";
import Link from "next/link";
import RecipeSearch from "@/components/recipeSearch";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function RecipeList() {
  // Add query params to app
  const router = useRouter();
  // Handle search params
  const cuisineList = ["All Cuisine", "American", "Japanese", "Mexican"];
  const [recipes, setRecipes] = useState<CreateRecipe[] | undefined>();
  const [searchInput, setSearchInput] = useState<string>("");
  const [cuisine, setCuisine] = useState<string>(cuisineList[0]);
  const searchParams = useSearchParams();

  const submitSearch = async () => {
    const addParams = new URLSearchParams();
    if (cuisine !== "All Cuisine") {
      addParams.set("cuisine", cuisine);
    }
    if (searchInput) {
      addParams.set("recipeQueryString", searchInput);
    }
    router.push("/recipes" + "?" + addParams);
  };

  useEffect(() => {
    async function getRecipes() {
      const cuisineQuery = searchParams.get("cuisine");
      const recipeQueryString = searchParams.get("recipeQueryString");
      const fetchRecipesData = await fetchRecipes(
        cuisineQuery,
        recipeQueryString
      );
      setRecipes(fetchRecipesData);
    }

    getRecipes();
  }, [searchParams]);

  return (
    <main className="flex min-h-full flex-row justify-center content-center mx-16 flex-wrap max-w-screen-xl">
      <div className="basis-full mb-4">
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
              className="rounded-lg dark:border-gray-700 bg-dark-tang overflow-hidden shadow-xl m-2 flex-[1_0_75%] md:flex-[1_0_40%] lg:flex-[1_0_25%] max-w-screen-sm"
            >
              <div
                className="w-full h-[150px]"
                style={{
                  backgroundImage: `url(${recipe.photoURL})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="h-[calc(100%-150px)] p-4 flex flex-col justify-between content-between items-stretch justify-items-stretch">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {recipe.name}
                </h5>
                <p className="mb-3 font-normal text-white dark:text-white">
                  {recipe.description}
                </p>
                <Link
                  href={`/recipes/${recipe.displayUrl}`}
                  className="w-[150px] inline-flex items-center px-3 py-2 text-md font-medium text-center text-white bg-tang rounded-lg hover:bg-light-grey focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-medium-grey dark:hover:bg-redium-gray dark:focus:ring-light-grey"
                >
                  View Recipe
                  <Image
                    src={leftArrow}
                    alt="left arrow"
                    quality={10}
                    className="w-[20px] h-[20px] object-contain ml-2 text-white"
                  />
                </Link>
              </div>
            </div>
          );
        })}
      <div
        className="rounded-lg dark:border-gray-700 bg-heavy-grey overflow-hidden shadow-xl m-2 flex-[1_0_75%] md:flex-[1_0_40%] lg:flex-[1_0_25%] max-w-screen-sm"
        style={{ visibility: "hidden" }}
      ></div>
      <div
        className="rounded-lg dark:border-gray-700 bg-heavy-grey overflow-hidden shadow-xl m-2 flex-[1_0_75%] md:flex-[1_0_40%] lg:flex-[1_0_25%] max-w-screen-sm"
        style={{ visibility: "hidden" }}
      ></div>
    </main>
  );
}
