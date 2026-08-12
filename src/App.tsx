import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./components/login";
import RegisterPage from "./components/register";
import ForgotPasswordPage from "./components/forgot-password";
import UserDashboard from "./components/user-dashboard";
import Invoice from "./components/invoice";
import SupportCenter from "./components/support-center";
import PlanSelection from "./components/plan-selection";
import Checkout from "./components/checkout";
import PaymentConfirmation from "./components/payment-confirmation";
import BillingManagement from "./components/billing-management";
import AddCard from "./components/billing-management/components/Addcard";
import OrdersPayments from "./components/admin-dashboard/orders-payments";
import UserManagement from "./components/admin-dashboard/user-management";
import HomeOne from "./components/homes/home";
import ShowTickets from "./components/admin-dashboard/show-tickets";
import ProductManagement from "./components/admin-dashboard/product-management";
import PlanEditor from "./components/admin-dashboard/product-management/PlanEditor";
import NotFound from "./components/NotFound";
import Blog from "./components/blog";
// import Service from "./components/service";
// import ServiceDetails from "./components/service-details";
import Contact from "./components/contact";
import BlogDetails from "./components/blog-details";
// import About from "./components/about";
import PrivacyPolicy from "./components/Legal/documents/PrivacyPolicy";
import StandardTerms from "./components/Legal/documents/StandardTerms";
import FairUsePolicy from "./components/Legal/documents/FairUsePolicy";
import EndUserPolicy from "./components/Legal/documents/EndUserPolicy";
import DMCAPolicy from "./components/Legal/documents/DMCAPolicy";
import SoftwareLicenseAgreement from "./components/Legal/documents/SoftwareLicenseAgreement";
import AdminLayout from "./layouts/AdminLayout";
import Legal from "./components/Legal";
import Upcoming from "./components/upcoming";
import SsoCallback from "./components/sso-callback";
import SsoLogout from "./components/sso-logout";

const router = createBrowserRouter([
  { path: "/", element: <HomeOne /> },
  { path: "/upcoming", element: <Upcoming /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/sso/callback", element: <SsoCallback /> },
  { path: "/sso/logout", element: <SsoLogout /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  {
    path: "/user-dashboard",
    element: (
      <ProtectedRoute>
        <UserDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/invoice",
    element: (
      <ProtectedRoute>
        <Invoice />
      </ProtectedRoute>
    ),
  },
  {
    path: "/support-center",
    element: (
      <ProtectedRoute>
        <SupportCenter />
      </ProtectedRoute>
    ),
  },
  {
    path: "/plan-selection",
    element: (
      <ProtectedRoute>
        <PlanSelection />
      </ProtectedRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    path: "/payment-confirmation",
    element: <PaymentConfirmation />,
  },
  {
    path: "/billing-management",
    element: (
      <ProtectedRoute>
        <BillingManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/billing-management/add-card",
    element: (
      <ProtectedRoute>
        <AddCard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "orders-payments", element: <OrdersPayments /> },
      { path: "user-management", element: <UserManagement /> },
      { path: "support-tickets", element: <ShowTickets /> },
      { path: "product-manager", element: <ProductManagement /> },
      { path: "product-manager/plan-editor", element: <PlanEditor /> },
      { path: "product-manager/plan-editor/:id", element: <PlanEditor /> },
    ],
  },
  { path: "/blog", element: <Blog /> },
  // { path: "/service", element: <Service /> },
  // { path: "/service-details", element: <ServiceDetails /> },
  // { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/blog-details", element: <BlogDetails /> },

  {
    path: "/legal/*",
    element: <Legal />,
    children: [
      { index: true, element: <StandardTerms /> },
      { path: "standard-terms", element: <StandardTerms /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "fair-use-policy", element: <FairUsePolicy /> },
      { path: "end-user-policy", element: <EndUserPolicy /> },
      { path: "dmca-policy", element: <DMCAPolicy /> },
      { path: "software-license", element: <SoftwareLicenseAgreement /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function isSsoCallbackPath(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.pathname.replace(/\/$/, "") === "/sso/callback";
}

function App() {
  // Bypass createBrowserRouter for SSO callback so the catch-all AFK
  // route can never win on /sso/callback (portal hash redirects).
  if (isSsoCallbackPath()) {
    return (
      <AuthProvider>
        <BrowserRouter>
          <SsoCallback />
        </BrowserRouter>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
}

export default App;
