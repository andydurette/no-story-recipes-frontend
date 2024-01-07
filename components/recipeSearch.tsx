import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

export interface RecipeSearchProps {
  cuisine: string;
  setCuisine: Dispatch<SetStateAction<string>>;
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
  submitSearch: () => void;
}

export default function RecipeSearch({
  cuisine,
  setCuisine,
  searchInput,
  setSearchInput,
  submitSearch,
}: RecipeSearchProps) {
  const cuisineList = ["All Cuisine", "American", "Japanese", "Mexican"];

  //create constant reference to the useRef();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [searchModal, setSearchModal] = useState<boolean>(false);

  const displayResponsiveMenu = () => {
    setSearchModal(!searchModal);
  };

  const handleOutsideClick = (event: any) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      event.target !== buttonRef.current
    ) {
      setSearchModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <form autoComplete="off">
      <div className="flex">
        <label
          htmlFor="search-dropdown"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Your culinary choices
        </label>
        <button
          id="dropdown-button"
          data-dropdown-toggle="dropdown"
          ref={buttonRef}
          onClick={displayResponsiveMenu}
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center
           text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none
          focus:ring-tang dark:bg-tang dark:hover:bg-dark-tang dark:focus:dark-tang dark:text-white dark:border-dark-tang"
          type="button"
        >
          {cuisine}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          id="dropdown"
          ref={menuRef}
          className={`z-10 ${
            !searchModal ? "hidden" : ""
          } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 fixed mt-12`}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdown-button"
          >
            {cuisineList.map((cuisine) => {
              return (
                <li key={cuisine}>
                  <button
                    type="button"
                    onClick={() => {
                      displayResponsiveMenu();
                      setCuisine(cuisine);
                    }}
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {cuisine}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-tang focus:border-tang dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-tang"
            placeholder="Search for burritos, burgers or anything else..."
            value={searchInput}
            onInput={(e) => {
              e.preventDefault();
              const inputValue = (e!.target as HTMLInputElement)!.value;
              setSearchInput(inputValue);
            }}
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              submitSearch();
            }}
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full
             text-white bg-tang rounded-e-lg border border-tang hover:bg-tang focus:ring-4 focus:outline-none
            focus:ring-dark-tang dark:bg-tang dark:hover:bg-tang dark:focus:tang"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}
