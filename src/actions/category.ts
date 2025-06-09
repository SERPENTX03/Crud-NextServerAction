"use server";

import { prisma } from "@/lib/prisma";
import { initialState } from "@/lib/types";

export const createCategory = async (
  _prevState: initialState,
  formData: FormData
): Promise<initialState> => {
  const name = formData.get("name") as string;

  if (!name) {
    return { message: "กรองเนมด้วย", success: false };
  }

  //Check name unique
  const existingName = await prisma.category.findUnique({
    where: {
      name: name,
    },
  });

  if (existingName) {
    return { message: "ชื่อหมวดหมู่ซ้ำ", success: false };
  }

  await prisma.category.create({
    data: {
      name: name,
    },
  });

  return { message: "Create Category Success", success: true };
};

export const fetchAllCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};
