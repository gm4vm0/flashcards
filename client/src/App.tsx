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
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            white: "#f5f5f5",
            black: "#111111",
            colors: {
              yellow: [
                "#FFF7E3",
                "#FFE08F",
                "#FFCC4A",
                "#FFBC11",
                "#D79A00",
                "#AA7A00",
                "#866000",
                "#6A4C00",
                "#543C00",
                "#423000",
              ],
            },
            primaryColor: "yellow",
            primaryShade: 4,
          }}
        >
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
