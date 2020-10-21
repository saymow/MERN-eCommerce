import "colors";
import Product from "../models/ProductModel";
import { setupEnvironment, afterTest } from "./fixtures/db";

beforeAll(async () => {
  await setupEnvironment();
});

afterAll(async () => {
  await afterTest();
});

describe("Products", () => {
  it("Should sum correctly", async () => {
    const products = await Product.find({});

    console.log(products);

    expect(3 + 4).toBe(7);
  });
});
