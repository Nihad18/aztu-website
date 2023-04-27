// Components

// Pages
import Layout from "../Layout";
import Home from "../pages/Home";
import AllNews from "../components/AllNews";
import NewsDetail from "../components/NewsDetail";
import Library from "../components/Library";
import Login from "../components/Login";
//Error page
// import ErrorPage from "../components/Error";
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "allnews", element: <AllNews /> },
      { path: "news-detail/:slug", element: <NewsDetail /> },
      { path: "library", element: <Library /> },
      { path: "login", element: <Login /> },
    ],
  },
  //   {
  //     path: "*",
  //     element: <ErrorPage />,
  //   },
];

export default routes;
