import axios from "axios";
import { atomWithDefault, atomWithStorage, loadable } from "jotai/utils";

const tokenAtom = atomWithStorage("userToken", "");

const cartAtom = atomWithStorage("cart", {});

const productsAtom = atomWithDefault(async () => {
  try {
    const response = await axios.get(
      `http://localhost:4000/products?limit=12`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
});
const loadProductsAtom = loadable(productsAtom);

export { tokenAtom, cartAtom, productsAtom, loadProductsAtom };
