import { MatxLoadable } from "matx";

const CartView = MatxLoadable({
  loader: () => import("./CartView")
});

const cartRoutes = [
  {
    path: "/cart",
    component: CartView
  }
];

export default cartRoutes;
