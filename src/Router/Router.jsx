import {
  createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Layout/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from './../Layout/Dashboard';
import WorkSheet from "../Pages/Dashboard/Employee/WorkSheet";
import PaymentHistory from "../Pages/Dashboard/Employee/PaymentHistory";
import UpdateWorkSheet from "../Pages/Dashboard/Employee/UpdateWorkSheet";
import EmployeeList from "../Pages/Dashboard/Hr/EmployeeList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      
    ]
  },
  {
    path: "dashboard",
    element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[
      // employee
      {
        path:"work-sheet",
        element:<WorkSheet></WorkSheet>
      },
      {
        path:"UpdateSheet/:id",
        element:<UpdateWorkSheet></UpdateWorkSheet>,
        
      },
      {
        path:"payment-history",
        element:<PaymentHistory></PaymentHistory>
      },
      {
        path:"employee-list",
        element:<EmployeeList></EmployeeList>
      },
    ]
  },
  {
    path: "login",
    element: <Login></Login>
  },
  {
    path: "register",
    element: <Register></Register>
  }
]);

export default router;