import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import WaitingPage from "./pages/WaitingPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorPage from "./pages/ErrorPage";
import MovieDetail from "./pages/MovieDetail";
function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "WaitingFor",
          element: <WaitingPage />,
        },
        {
          path: "Movie-Detail/:id",
          element: <MovieDetail />,
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
