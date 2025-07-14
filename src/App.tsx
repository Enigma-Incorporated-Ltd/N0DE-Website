import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import HomeOne from "./components/homes/home";
import HomeTwo from "./components/homes/home-2";
import { useEffect, useState } from "react";
import HomeThree from "./components/homes/home-3";
import Blog from "./components/blog";
import BlogList from "./components/blog-list";
import BlogDetails from "./components/blog-details";
import Service from "./components/service";
import ServiceDetails from "./components/service-details";
import About from "./components/about";
import Pricing from "./components/pricing";
import Faq from "./components/faq";
import Contact from "./components/contact";
import NotFound from "./error";
import UserDashboard from "./components/user-dashboard";
import LoginPage from "./components/login";
import PlanSelection from "./components/plan-selection";
import PaymentConfirmation from "./components/payment-confirmation";
import SupportCenter from "./components/support-center";
import Register from "./components/register";
import Checkout from "./components/checkout";
import BillingManagement from "./components/billing-management";
import AdminDashboard from "./components/admin-dashboard";

const router = createBrowserRouter([
	{ path: "/", element: <HomeOne /> }, // Changed to show login page
	{ path: "/home-2", element: <HomeTwo /> },
	{ path: "/home-3", element: <HomeThree /> },
	{ path: "/blog", element: <Blog /> },
	{ path: "/blog-list", element: <BlogList /> },
	{ path: "/blog-details", element: <BlogDetails /> },
	{ path: "/service", element: <Service /> },
	{ path: "/service-details", element: <ServiceDetails /> },
	{ path: "/about", element: <About /> },
	{ path: "/pricing", element: <Pricing /> },
	{ path: "/faq", element: <Faq /> },
	{ path: "/contact", element: <Contact /> },
	{ path: "/user-dashboard", element: <UserDashboard /> },
	{ path: "/login", element: <LoginPage /> },
	{ path: "/plan-selection", element: <PlanSelection /> },
	{ path: "/payment-confirmation", element: <PaymentConfirmation /> },
	{ path: "/register", element: <Register /> },
	{ path: "/support-center", element: <SupportCenter /> },
	{ path: "/checkout", element: <Checkout /> },
	{ path: "/billing-management", element: <BillingManagement /> },
	{ path: "/admin-dashboard", element: <AdminDashboard /> },

//  not found page
{ path: "*", element: <NotFound /> },
	  
]);

function App() {
 
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("navbar-sticky-init", sticky);
  }, [sticky]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
