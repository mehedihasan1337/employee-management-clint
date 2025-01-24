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
// import UpdateWorkSheet from "../Pages/Dashboard/Employee/UpdateWorkSheet";
import EmployeeList from "../Pages/Dashboard/Hr/EmployeeList";
import Progress from "../Pages/Dashboard/Hr/Progress";
import AllEmployeeList from "../Pages/Dashboard/Admin/AllEmployeeList";
import Payroll from "../Pages/Dashboard/Admin/Payroll";
import ErrorPage from "../components/ErrorPage";
import Details from "../Pages/Dashboard/Hr/Details";

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
      // {
      //   path:"UpdateSheet/:id",
      //   element:<UpdateWorkSheet></UpdateWorkSheet>,
        
      // },
      {
        path:"payment-history",
        element:<PaymentHistory></PaymentHistory>
      },
      // hr
      {
        path:"employee-list",
        element:<EmployeeList></EmployeeList>
      },
      {
        path:"progress",
        element:<Progress></Progress>
      },
      {
        path:"details/:slug",
        element:<Details></Details>
      },
      // admin
      {
        path:"all-employee-list",
        element:<AllEmployeeList></AllEmployeeList>
      },
      {
        path:"payroll",
        element:<Payroll></Payroll>
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
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>
  },
]);

export default router;