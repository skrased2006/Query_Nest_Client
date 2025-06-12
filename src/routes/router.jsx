import {
  createBrowserRouter,
} from "react-router"; 
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ErrorLayout from "../layouts/ErrorLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddQuery from "../pages/AddQuery";
import AllQuerys from "../pages/AllQuerys";
import QueryDetails from "../pages/QueryDetails";
import MyQuery from "../pages/MyQuery/MyQuery";
import MyUpdateQuery from "../pages/MyQuery/MyUpadateQuery";
import PrivetRoute from "./PrivetRoute";
import MyRecomondation from "../pages/MyRecomondation/MyRecomondation";
import RecomondationForMe from "../pages/RecomondationForMe/RecomondationForMe";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    errorElement: <ErrorLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "addQuery",
        element: (
          <PrivetRoute>
            <AddQuery />
          </PrivetRoute>
        )
      },
      {
        path: "allQuery",
        loader: () => fetch("https://my-query-server.vercel.app/queries"),
        element: <AllQuerys />
      },
      {
        path: "query/:id",
        loader: ({ params }) =>
          fetch(`https://my-query-server.vercel.app/queries/id/${params.id}`),
        element: (
          <PrivetRoute>
            <QueryDetails />
          </PrivetRoute>
        )
      },
      {
        path: "myQuery",
        element: (
          <PrivetRoute>
            <MyQuery />
          </PrivetRoute>
        )
      },
      {
        path: "myUpdateQuery/:id",
        loader: ({ params }) =>
          fetch(`https://my-query-server.vercel.app/queries/id/${params.id}`),
        element: (
          <PrivetRoute>
            <MyUpdateQuery />
          </PrivetRoute>
        )
      },
      {
        path:'my-recommendations',
        element:<PrivetRoute>
          <MyRecomondation></MyRecomondation>
        </PrivetRoute>
      },
      {
        path:'recommendations-for-me',
        element:<PrivetRoute>
    <RecomondationForMe></RecomondationForMe>
        </PrivetRoute>
      }
    ]
  }
]);
