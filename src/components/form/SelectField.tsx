"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@prisma/client";
import { useState } from "react";

const SelectField = ({ categories }: { categories: Category[] }) => {
  const [value, setValue] = useState<string>("");
  console.log(value);

  return (
    <>
      <Select onValueChange={setValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input
        className="w-40 mb-4"
        type="hidden"
        name="categoryId"
        value={value}
      />
    </>
  );
};
export default SelectField;
