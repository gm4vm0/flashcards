import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet, createBrowserRouter, redirect } from "react-router-dom";
import Protected from "./Protected";
import MainLayout from "./layout/MainLayout";
import Index from "./routes/Index";
import Login from "./routes/Login";
import Register from "./routes/Register";
import theme from "./theme";
import ProtectedRoute from "./ProtectedRoute";
import axios from "axios";
import useCardsStore from "./stores/cards-store";
import Cards from "./routes/Cards";
import useDecksStore from "./stores/decks-store";
import useAuthStore from "./stores/auth-store";

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
      {
        path: "/protected",
        element: (
          <ProtectedRoute>
            <Protected />
          </ProtectedRoute>
        ),
      },
      {
        path: "/deck/:deckId",
        element: (
          <ProtectedRoute>
            <Cards />
          </ProtectedRoute>
        ),
        loader: async ({ params }) => {
          if (!useAuthStore.getState().user) return redirect("/");
          const decksResponse = await axios.get(
            import.meta.env.VITE_API_URL + `decks/${params.deckId}`,
            { withCredentials: true }
          );
          const cardsResponse = await axios.get(
            import.meta.env.VITE_API_URL + `cards/${params.deckId}`,
            { withCredentials: true }
          );
          useDecksStore.setState({ currentDeck: decksResponse.data });
          useCardsStore.setState({ cards: cardsResponse.data });
          return null;
        },
      },
    ],
  },
]);

export default browserRouter;
