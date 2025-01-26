"use client";
import { useState } from "react";

export default function IngredientCheckBox({
  ingredient,
}: {
  ingredient: string;
}) {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <div className="flex flex-row justify-center align-center py-1">
      <input
        className="flex flex-row sm:flex-col p-4 min-h-[20px] min-w-[20px] 
            h-[20px] w-[20px] relative top-0 left-0 bg-red-100 accent-tang"
        type="checkbox"
        id={ingredient}
        name={ingredient}
        value={ingredient}
        onClick={() => setClicked(!clicked)}
      />
      <label className={clicked ? "ml-2 line-through" : "ml-2"}>
        {ingredient}
      </label>
    </div>
  );
}
