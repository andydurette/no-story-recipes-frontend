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
}: // submitSearch,
RecipeSearchProps) {
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
      <div className="flex flex-col-reverse md:flex-row max-w-screen-3xl mx-2">
        <label
          htmlFor="search-dropdown"
          className="mb-2 text-sm font-medium sr-only text-white"
        >
          Your culinary choices
        </label>
        <button
          id="dropdown-button"
          data-dropdown-toggle="dropdown"
          ref={buttonRef}
          onClick={displayResponsiveMenu}
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center justify-between
          border focus:ring-4 focus:outline-none rounded md:rounded-l md:rounded-r-none mt-4 md:mt-0
          focus:ring-orange-300 bg-tang hover:bg-dark-tang focus:dark-tang text-white border-dark-tang"
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
          className={`z-10 ${!searchModal ? "hidden" : ""}
          divide-y divide-gray-100 rounded-lg shadow
          bg-gray-700 fixed w-[calc(100%-46px)] md:w-32
          top-48 md:top-auto md:mt-[56px]
          `}
        >
          <ul
            className="py-2 text-sm text-gray-200 bg-gray-700 rounded"
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
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-600 hover:text-white"
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
            className="
            block p-2.5 w-full z-20 text-sm rounded-e-lg border-s-2 border bg-gray-700 
            border-s-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-orange-300
            rounded-l md:rounded-l-none
            "
            placeholder="Search for your favourites..."
            value={searchInput}
            onInput={(e) => {
              e.preventDefault();
              const inputValue = (e!.target as HTMLInputElement)!.value;
              setSearchInput(inputValue);
            }}
            required
          />
        </div>
      </div>
    </form>
  );
}
