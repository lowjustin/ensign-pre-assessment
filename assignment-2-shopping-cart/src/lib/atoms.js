// import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const tokenAtom = atomWithStorage("userToken", "");
const cartAtom = atomWithStorage("cart", {});

export { tokenAtom, cartAtom };
