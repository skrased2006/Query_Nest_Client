import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ErrorLayout from "../layouts/ErrorLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddQuery from "../pages/AddQuery";
import AllQuerys from "../pages/AllQuerys";
import QueryDetails from "../pages/QueryDetails";
import MyQuery from "../pages/MyQuery";

import MyUpdateQuery from "../pages/MyUpadateQuery";

export const router = createBrowserRouter([
  {
    path: "/",
  Component:MainLayout,
  errorElement:<ErrorLayout></ErrorLayout>,
  children: [
    {
      index:true,
      Component:Home
    },
    {
      path: "login",
      Component:Login
    },
    {
      path: "register",
      Component: Register
    },
    {
      path: "addQuery",
      Component: AddQuery
    },
    {
      path:'allQuery',
      loader:()=>fetch('http://localhost:3000/queries'),
      Component:AllQuerys
    },
    {
      path: 'query/:id',

  loader: () => fetch(`http://localhost:3000/queries`),
  Component:QueryDetails
    },
    {
      path:'myQuery',
      Component:MyQuery
    },
   {
  path: 'myUpdateQuery/:id',
  loader: ({ params }) => fetch(`http://localhost:3000/queries/id/${params.id}`),
  Component: MyUpdateQuery
  }



  ]
  },
]);
