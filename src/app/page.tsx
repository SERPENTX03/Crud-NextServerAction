import { createCategory, fetchAllCategories } from "@/actions/category";
import {
  createProduct,
  deleteProduct,
  editProduct,
  fetchAllProduct,
} from "@/actions/product";
import FormContainer from "@/components/form/FormContainer";
import SelectField from "@/components/form/SelectField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

const HomePage = async () => {
  const categories = await fetchAllCategories();
  const products = await fetchAllProduct();

  return (
    <>
      <div className="">
        <div className="flex itme-center justify-center gap-4">
          <FormContainer action={createCategory}>
            <h1 className="text-3xl mb-4">Category</h1>
            <Label htmlFor="">CategoryName</Label>
            <Input className="w-40 mb-4" type="text" name="name" />
            <Button>Submit</Button>
          </FormContainer>
          <FormContainer action={createProduct}>
            <h1 className="text-3xl mb-4">Product</h1>

            <Label htmlFor="">ProductName</Label>

            <Input className="w-40 mb-4" type="text" name="name" />

            <Label htmlFor="">ProductPrice</Label>
            <Input className="w-40 mb-4" type="number" name="price" />

            <Label htmlFor="">ProductDescription</Label>
            <Input className="w-40 mb-4" type="text" name="description" />

            <Label htmlFor="">ProductDescription</Label>
            <Input className="w-40 mb-4" type="text" name="image" />

            <SelectField categories={categories} />

            <Button>Submit</Button>
          </FormContainer>
        </div>

        {/* Product Card */}
        <div className="grid grid-cols-4 gap-4 px-24 mt-14">
          {products.map((product) => (
            <div key={product.id} className="border shadow rounded-2xl p-2">
              <Image
                src={product.image || "default-image.png"}
                alt="Image"
                width={300}
                height={300}
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">Name: {product.name}</h2>
                <p>Description: {product.description}</p>
                <p>หมวดหมู่: {product.category.name}</p>
              </div>

              <Link
                className="block my-2 w-full"
                href={`/product/${product.id}`}
              >
                <Button className="w-full">Views</Button>
              </Link>
              <div className="flex justify-center gap-4">
                <FormContainer action={deleteProduct}>
                  <input type="hidden" name="id" value={product.id} />
                  <Button className="bg-chart-1">DELETE</Button>
                </FormContainer>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-chart-2">EDIT</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit to Product</DialogTitle>

                      <FormContainer action={editProduct}>
                        <div className="flex items-center justify-center gap-8">
                          <div>
                            <Label htmlFor="">ProductName</Label>

                            <Input
                              className="w-40 mb-4"
                              type="text"
                              name="name"
                              defaultValue={product.name}
                            />

                            <Label htmlFor="">ProductPrice</Label>
                            <Input
                              className="w-40 mb-4"
                              type="number"
                              name="price"
                              defaultValue={product.price}
                            />
                          </div>

                          <div>
                            <Label htmlFor="">ProductDescription</Label>
                            <Input
                              className="w-40 mb-4"
                              type="text"
                              name="description"
                              defaultValue={product.description}
                            />

                            <Label htmlFor="">ProductDescription</Label>
                            <Input
                              className="w-40 mb-4"
                              type="text"
                              name="image"
                              defaultValue={product.image}
                            />
                            <input
                              type="hidden"
                              value={product.id}
                              name="productId"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button>Edit</Button>
                        </DialogFooter>
                      </FormContainer>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default HomePage;
