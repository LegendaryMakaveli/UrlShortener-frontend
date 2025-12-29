import {createBrowserRouter} from "react-router";
import Login from "../auth/login/Login"
import SignUp from "../auth/signup/Signup";
import Dashboard from "../pages/dashBoard";

const router = createBrowserRouter ([
    {path: "/", element: <Login/>},
    {path: "/signup", element: <SignUp/>},
    {path: "/dashboardpage", element: <Dashboard/>}
])

export default router;