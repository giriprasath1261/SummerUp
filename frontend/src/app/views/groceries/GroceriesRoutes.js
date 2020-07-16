import { MatxLoadable } from "matx";

const GroceryList = MatxLoadable({
  loader: () => import("./GroceryList")
});

const groceriesRoutes = [
  {
    path: "/groceries",
    component: GroceryList
  }
];

export default groceriesRoutes;
