import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/register";
import UserList from "../pages/user-list";
const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />
  },{
    path: "/user-list",
    element: <UserList />
  }
]);

export default router;
