import { createBrowserRouter,Navigate } from "react-router-dom";
import React from "react";
const UserList = React.lazy(()=>import("../pages/user-list"));
const Register = React.lazy(()=>import("../pages/register"));
const router = createBrowserRouter([
  {
    path: "/",
    element:<Navigate to='/register'/>
  },
  {
    path: "/register",
    element: <Register />
  },{
    path: "/user-list",
    element: <UserList />
  }
]);

export default router;
