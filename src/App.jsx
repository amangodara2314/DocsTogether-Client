import { ThemeProvider } from "./components/ThemeProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import SmoothCursorWrapper from "./components/SmoothCursorWrapper";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import Document from "./pages/Document";
import socket from "./configs/socket";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <SmoothCursorWrapper />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "/auth",
      element: <SmoothCursorWrapper />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "verify-email",
          element: <VerifyEmail />,
        },
      ],
    },
    {
      path: "/document",
      element: <Document />,
    },
    {
      path: "*",
      element: <h1>404</h1>,
    },
  ]);
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default App;
