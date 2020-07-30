export const navigations = [
  {
    name: "Dashboard",
    path: "/dashboard/analytics",
    icon: "dashboard"
  },
  {
    name: "Groceries",
    icon: "spa",
    children: [
      {
        name: "ByAisle",
        path: "/grocery/aisle",
        iconText: "A"
      },
      {
        name: "ByKeyword",
        path: "/grocery/keyword",
        iconText: "K"
      }
    ]
  },
  {
    name: "Account",
    icon: "trending_up",
    children: [
      {
        name: "Sign out",
        iconText: "SI",
        path: "/session/signin"
      },
      {
        name: "Forgot password",
        iconText: "FP",
        path: "/session/forgot-password"
      },
    ]
  },
  {
    name: "Navigation",
    path: "/navigation",
    icon: "explore"
  }
];
