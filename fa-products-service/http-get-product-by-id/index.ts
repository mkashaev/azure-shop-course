import { AzureFunction, Context, HttpRequest } from "@azure/functions";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

const products: Product[] = [
  {
    id: "1",
    title: "Product 1",
    description: "Description for product 1",
    price: 100,
  },
  {
    id: "2",
    title: "Product 2",
    description: "Description for product 2",
    price: 150,
  },
  {
    id: "3",
    title: "Product 3",
    description: "Description for product 3",
    price: 200,
  },
];

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const productId = req.params.id;

  if (!productId) {
    context.res = {
      status: 400,
      body: "Product ID is required",
    };
    return;
  }

  const product = products.find((p) => p.id === productId);

  if (product) {
    context.res = {
      status: 200,
      body: product,
    };
  } else {
    context.res = {
      status: 404,
      body: "Product not found",
    };
  }
};

export default httpTrigger;
