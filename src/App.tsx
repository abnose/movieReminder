import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import About from "./pages/AboutPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loader as contactLoader } from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
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
          loader: contactLoader(queryClient),
        },
        {
          path: "About",
          element: <About />,
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
