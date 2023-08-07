import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Protected from "./Protected";
import MainLayout from "./layout/MainLayout";
import Index from "./routes/Index";
import Login from "./routes/Login";
import Register from "./routes/Register";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: (
      <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
