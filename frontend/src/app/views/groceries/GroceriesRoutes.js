import { MatxLoadable } from "matx";

const GroceryAisle = MatxLoadable({
  loader: () => import("./GroceryAisle")
});

const GroceryKeyword = MatxLoadable({
  loader: () => import("./GroceryKeyword")
});

const groceriesRoutes = [
  {
    path: "/grocery/aisle",
    component: GroceryAisle
  },
  {
  	path: "/grocery/keyword",
  	component: GroceryKeyword
  }
];

export default groceriesRoutes;
