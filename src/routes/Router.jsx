import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import Home from "../pages/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ErrorPage from "../pages/ErrorPage";
import CreateAssignments from "../pages/CreateAssignments";
import AllAssignments from "../pages/AllAssignments";
import UpdateAssignments from "../pages/UpdateAssignments";
import ViewAssignment from "../pages/ViewAssignment";
import PrivateRoutes from "../privateRoutes/PrivateRoutes";
import PendingTasks from "../pages/PendingTasks";
import MyAssignments from "../pages/MyAssignments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pending-assignments",
        element: (
          <PrivateRoutes>
            <PendingTasks />
          </PrivateRoutes>
        ),
        loader: () =>
          fetch(
            "https://study-hive-server-site.vercel.app/allAssignments/pendingTasks"
          ),
      },
      {
        path: "/create-assignments",
        element: (
          <PrivateRoutes>
            <CreateAssignments />
          </PrivateRoutes>
        ),
      },
      {
        path: "/assignments",
        element: <AllAssignments />,
        loader: () =>
          fetch("https://study-hive-server-site.vercel.app/allAssignments"),
      },
      {
        path: "/attempted-assignments",
        element: <PrivateRoutes><MyAssignments /></PrivateRoutes>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/update/:id",
    element: (
      <PrivateRoutes>
        <UpdateAssignments />
      </PrivateRoutes>
    ),
    loader: ({ params }) =>
      fetch(`https://study-hive-server-site.vercel.app/update/${params.id}`),
  },
  {
    path: "/allAssignments/:id",
    element: (
      <PrivateRoutes>
        <ViewAssignment />
      </PrivateRoutes>
    ),
    loader: ({ params }) =>
      fetch(
        `https://study-hive-server-site.vercel.app/allAssignments/${params.id}`
      ),
  },
]);

export default router;
