import { fetchProductId } from "@/actions/product";
import Image from "next/image";

const ProductIdPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const product = await fetchProductId(productId);
  console.log(product);

  return (
    <div className="my-24 max-w-4xl mx-auto px-6">
      <div className="border p-4 flex">
        <Image
          src={product?.image || "default.png"}
          alt="Image"
          width={500}
          height={500}
        />

        <div>
          <h2>{product?.name}</h2>
          <p>{product?.description}</p>
        </div>
      </div>
    </div>
  );
};
export default ProductIdPage;
