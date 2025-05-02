import { useSelector } from "react-redux";
import { ThemeProvider } from "./components/ThemeProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import SmoothCursorWrapper from "./components/SmoothCursorWrapper";
import VerifyEmail from "./pages/auth/VerifyEmail";

function App() {
  const { theme } = useSelector((store) => store.theme);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <h1>Home</h1>,
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
      path: "*",
      element: <h1>404</h1>,
    },
  ]);
  return (
    <ThemeProvider defaultTheme={theme} storageKey="vite-ui-theme">
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default App;
