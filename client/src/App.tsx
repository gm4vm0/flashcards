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
              primary: [
                "#FFF4D7",
                "#FFDE89",
                "#FFCB47",
                "#FFBC11",
                "#DA9C00",
                "#AE7D00",
                "#8B6400",
                "#6F5000",
                "#594000",
                "#473300",
              ],
              secondary: [
                "#FFCABA",
                "#FF9270",
                "#FF6433",
                "#FF3D00",
                "#CC3100",
                "#A32700",
                "#831F00",
                "#681900",
                "#541400",
                "#431000",
              ],
            },
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
