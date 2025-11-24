import type { RouteObject } from "react-router";
import RootPage from "@pages/root-page";

export const routes: RouteObject[] = [
  {
    index: true,
    Component: RootPage,
  },
];
