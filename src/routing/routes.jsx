import { SearchPage } from "../pages/SearchPage/SearchPage.component";
import { OverviewPage } from "../pages/ShowPage/ShowPage.component";
import { NotFound } from "../pages/NotFound/NotFound.component";

export const routes = (params) => ({
  main: "/",
  overview: `/overview/${params?.id || ':id'}`,
});

export const routerData = [
  {
    path: routes().main,
    Component: SearchPage,
    isPrivate: false,
  },
  {
    path: routes().overview,
    Component: OverviewPage,
    isPrivate: false,
  },
  {
    path: '/*',
    Component: NotFound,
    isPrivate: false,
  },
];
