"use server";

import { prisma } from "@/lib/prisma";
import { initialState } from "@/lib/types";

export const createProduct = async (
  _prevState: initialState,
  formData: FormData
): Promise<initialState> => {
  const data = Object.fromEntries(formData.entries());

  const { name, price, description, image, categoryId } = data;

  if (!name || !price || !description || !image || !categoryId) {
    return { message: "กรุณากรอกฟิลให้ครับ", success: false };
  }

  await prisma.product.create({
    data: {
      name: name as string,
      price: Number(price),
      description: description as string,
      image: image as string,
      categoryId: categoryId as string,
    },
  });

  return { message: "CreateSuccess", success: true };
};

export const fetchAllProduct = async () => {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });
  return products;
};

export const fetchProductId = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId as string,
    },
  });

  return product;
};

export const deleteProduct = async (
  _prevState: initialState,
  formData: FormData
): Promise<initialState> => {
  const productId = formData.get("id") as string;
  await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  return { success: true, message: "Remove Success!" };
};

export const editProduct = async (
  _prevState: initialState,
  formData: FormData
): Promise<initialState> => {
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  const { name, price, description, image, productId } = data;

  if (!name || !price || !description || !image || !productId) {
    return { success: false, message: "กรอกให้ครบ" };
  }

  await prisma.product.update({
    where: {
      id: productId as string,
    },
    data: {
      name: name as string,
      price: Number(price),
      description: description as string,
      image: image as string,
    },
  });
  return { success: true, message: "Updated Success!" };
};
