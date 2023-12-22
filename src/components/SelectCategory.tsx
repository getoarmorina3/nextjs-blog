import React from "react";
import { trpc } from "@/trpc/client";

interface Category {
  id: string;
  name: string;
}

export function SelectCategory({
  onSelectCategory,
}: {
  onSelectCategory: (categoryId: string) => void;
}) {
  const categories = trpc.category.listAll.useQuery();

  return (
    <div>
      <label htmlFor="category" className="sr-only">
        Choose a category
      </label>
      <select
        onChange={(e) => onSelectCategory(e.target.value)}
        defaultValue=""
        id="category"
        name="categoryId"
        className="text-center block py-2.5 px-0 w-full text-sm text-muted-foreground bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer"
      >
        <option value="" disabled>
          Select a category
        </option>
        {categories.data &&
          categories.data.map((category: Category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
      </select>
    </div>
  );
}
