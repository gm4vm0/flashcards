import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Protected from "./Protected";
import MainLayout from "./layout/MainLayout";
import Index from "./routes/Index";
import Login from "./routes/Login";
import Register from "./routes/Register";
import theme from "./theme";

const queryClient = new QueryClient();

const browserRouter = createBrowserRouter([
  {
    element: (
      <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
          <MainLayout>
            <Outlet />
          </MainLayout>
        </MantineProvider>
      </QueryClientProvider>
    ),
    children: [
      {
        path: "/",
        element: <Index />,
      },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/protected", element: <Protected /> },
    ],
  },
]);

export default browserRouter;
