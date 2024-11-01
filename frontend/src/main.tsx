import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ProtectedRouteWrapper from "./components/ProtectedRouteWrapper";
import Home from "./components/Home";
import SuggestPage from "./components/SuggestPage";
import { StoreProvider } from "./context/StoresContext";
import HelpPage from "./components/HelpPage";
import RouteDisplayPage from "./components/RouteDisplayPage";
import SavedRoutesPage from "./components/SavedRoutesPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRouteWrapper requiresAuth={false} />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/route/:routeId?" element={<RouteDisplayPage />} />
      </Route>
      <Route element={<ProtectedRouteWrapper requiresAuth={true} />}>
        <Route index path="/" element={<Home />} />
        <Route index path="/suggest" element={<SuggestPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route index path="/saved-routes" element={<SavedRoutesPage />} />
      </Route>
    </>,
  ),
);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <StoreProvider>
    <Toaster />
    <RouterProvider router={router} />
  </StoreProvider>,
  // </StrictMode>,
);
