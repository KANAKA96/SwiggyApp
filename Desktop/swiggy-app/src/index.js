import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/Error";
// import About from "./components/About";
// import Body from "./components/Body";
// import ResMenu from "./components/ResMenu";

let About = lazy(() => import("./components/About"));
let Body = lazy(() => import("./components/Body"));
let ResMenu = lazy(() => import("./components/ResMenu"));

const appProvider = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<h1>loading</h1>}>
            <Body />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>loading</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:resId",
        element: (
          <Suspense fallback={<h1>loading</h1>}>
            <ResMenu />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={appProvider} />
  </React.StrictMode>
);
