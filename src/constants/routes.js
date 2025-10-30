import { lazy } from "react";

const routes = [
  {
    name: "Home",
    path: "/",
    component: lazy(() => import("../pages/Hero")),
  },
  {
    name: "Text Editor",
    path: "/text-editor",
    component: lazy(() => import("../pages/TextEditor")),
  },
  {
    name: "Base64 Tool",
    path: "/base64-tool",
    component: lazy(() => import("../pages/Base64Tool")),
  },
  {
    name: "Todo App",
    path: "/todo-app",
    component: lazy(() => import("../pages/TodoApp")),
  },
  {
    name: "Data Viewer",
    path: "/data-viewer",
    // component : DataViewer
  },
  {
    name: "Contact",
    path: "/contact",
    // component : Contact
  },
];

export default routes;
