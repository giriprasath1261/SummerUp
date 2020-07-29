import { MatxLoadable } from "matx";

const Navigation = MatxLoadable({
  loader: () => import("./Navigation")
});

const navigationRoutes = [
  {
    path: "/navigation",
    component: Navigation
  }
];

export default navigationRoutes;
