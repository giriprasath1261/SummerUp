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
  },
  {
    name: "UI Kits",
    icon: "favorite",
    badge: { value: "50+", color: "secondary" },
    children: [
      {
        name: "Auto Complete",
        path: "/material/autocomplete",
        iconText: "A"
      },
      {
        name: "Buttons",
        path: "/material/buttons",
        iconText: "B"
      },
      {
        name: "Checkbox",
        path: "/material/checkbox",
        iconText: "C"
      },
      {
        name: "Dialog",
        path: "/material/dialog",
        iconText: "D"
      },
      {
        name: "Expansion Panel",
        path: "/material/expansion-panel",
        iconText: "E"
      },
      {
        name: "Form",
        path: "/material/form",
        iconText: "F"
      },
      {
        name: "Icons",
        path: "/material/icons",
        iconText: "I"
      },
      {
        name: "Menu",
        path: "/material/menu",
        iconText: "M"
      },
      {
        name: "Progress",
        path: "/material/progress",
        iconText: "P"
      },
      {
        name: "Radio",
        path: "/material/radio",
        iconText: "R"
      },
      {
        name: "Switch",
        path: "/material/switch",
        iconText: "S"
      },
      {
        name: "Slider",
        path: "/material/slider",
        iconText: "S"
      },
      {
        name: "Snackbar",
        path: "/material/snackbar",
        iconText: "S"
      },
      {
        name: "Table",
        path: "/material/table",
        iconText: "T"
      }
    ]
  }
];
