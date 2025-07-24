import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './components/login';
import RegisterPage from './components/register';
import ForgotPasswordPage from './components/forgot-password';
import UserDashboard from './components/user-dashboard';
import Invoice from './components/invoice';
import SupportCenter from './components/support-center';
import PlanSelection from './components/plan-selection';
import Checkout from './components/checkout';
import PaymentConfirmation from './components/payment-confirmation';
import BillingManagement from './components/billing-management';
import OrdersPayments from './components/admin-dashboard/orders-payments';
import UserManagement from './components/admin-dashboard/user-management';
import HomeOne from "./components/homes/home";
import ShowTickets from './components/admin-dashboard/show-tickets';
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
  { path: "/",  element: <HomeOne /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/user-dashboard", element: <ProtectedRoute><UserDashboard /></ProtectedRoute> },
  { path: "/invoice", element: <ProtectedRoute><Invoice /></ProtectedRoute> },
  { path: "/support-center", element: <ProtectedRoute><SupportCenter /></ProtectedRoute> },
  { path: "/plan-selection", element: <ProtectedRoute><PlanSelection /></ProtectedRoute> },
  { path: "/checkout", element: <ProtectedRoute><Checkout /></ProtectedRoute> },
  { path: "/payment-confirmation", element: <ProtectedRoute><PaymentConfirmation /></ProtectedRoute> },
  { path: "/billing-management", element: <ProtectedRoute><BillingManagement /></ProtectedRoute> },
  { path: "/admin/orders-payments", element: <ProtectedRoute><OrdersPayments /></ProtectedRoute> },
  { path: "/admin/user-management", element: <ProtectedRoute><UserManagement /></ProtectedRoute> },
  { path: "/admin/show-tickets", element: <ProtectedRoute><ShowTickets /></ProtectedRoute> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
