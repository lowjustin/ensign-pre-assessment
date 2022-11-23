import axios from "axios";
import { atomWithDefault, atomWithStorage, loadable } from "jotai/utils";

const userAtom = atomWithStorage("user", {});

const cartAtom = atomWithStorage("cart", {});

const productsAtom = atomWithDefault(async (get) => {
  try {
    const user = get(userAtom);
    const config = {headers: {
      'Authorization': `token ${user.token}`
    }}
    const response = await axios.get(
      `http://localhost:4000/products?limit=12`, config
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
});
const loadProductsAtom = loadable(productsAtom);

export { cartAtom, productsAtom, loadProductsAtom, userAtom };
