import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Error from "../Pages/Error/Error";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/signup',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '*',
        element: <Error></Error>
    }
]);


export default router;