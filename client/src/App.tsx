import { RouterProvider } from "react-router-dom";
import browserRouter from "./router";

const router = browserRouter;

function App() {
  return <RouterProvider router={router} />;
}

export default App;
