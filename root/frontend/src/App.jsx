import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PaymentCheckoutStatus from "./pages/PaymentCheckoutStatus.jsx";

import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import Products from "./pages/admin/product-pages/AdminProducts.jsx";
import Categories from "./pages/admin/category-pages/Categories.jsx";
import Collections from "./pages/admin/collection-pages/Collections.jsx";
import Orders from "./pages/admin/Orders.jsx";
import Customers from "./pages/admin/Customers.jsx";
import Coupons from "./pages/admin/coupon-pages/Coupons.jsx";
import Settings from "./pages/admin/Settings.jsx";
import StoreSetting from "./pages/admin/Settings/StoreSetting.jsx";
import PaymentSetting from "./pages/admin/Settings/PaymentSetting.jsx";
import ShippingSetting from "./pages/admin/Settings/ShippingSetting.jsx";
import TaxSetting from "./pages/admin/Settings/TaxSetting.jsx";
import NewProduct from "./pages/admin/product-pages/NewProduct.jsx";
import NewCoupon from "./pages/admin/coupon-pages/NewCoupon.jsx";
import NewCollection from "./pages/admin/collection-pages/NewCollection.jsx";
import UpdateProduct from "./pages/admin/product-pages/UpdateProduct.jsx";
import UpdateCoupon from "./pages/admin/coupon-pages/UpdateCoupon.jsx";
import UpdateCollection from "./pages/admin/collection-pages/UpdateCollection.jsx";
import NewCategory from "./pages/admin/category-pages/NewCategory.jsx";
import UpdateCategory from "./pages/admin/category-pages/UpdateCategory.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/frontStore/Home.jsx";
import FrontStoreLayout from "./pages/frontStore/FrontStoreLayout.jsx";
import ProductsPage from "./pages/frontStore/ProductsPage.jsx";
import ProductPage from "./pages/frontStore/ProductPage.jsx";
import UserContextAPI from "./context/userContextAPI.jsx";
import Account from "./pages/frontStore/Account.jsx";
import Cart from "./pages/frontStore/Cart.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "/admin/dashboard", element: <Dashboard /> },
      { path: "/admin/products", element: <Products /> },
      { path: "/admin/products/new", element: <NewProduct /> },
      { path: "/admin/products/update", element: <UpdateProduct /> },
      { path: "/admin/categories", element: <Categories /> },
      { path: "/admin/categories/new", element: <NewCategory /> },
      { path: "/admin/categories/update", element: <UpdateCategory /> },
      { path: "/admin/collections", element: <Collections /> },
      { path: "/admin/collections/new", element: <NewCollection /> },
      { path: "/admin/collections/update", element: <UpdateCollection /> },
      { path: "/admin/orders", element: <Orders /> },
      { path: "/admin/customers", element: <Customers /> },
      { path: "/admin/coupons", element: <Coupons /> },
      { path: "/admin/coupons/new", element: <NewCoupon /> },
      { path: "/admin/coupons/update", element: <UpdateCoupon /> },
      {
        path: "/admin/settings",
        element: <Settings />,
        children: [
          { path: "/admin/settings", element: <StoreSetting /> },
          {
            path: "/admin/settings/store-setting",
            element: <StoreSetting />,
          },
          {
            path: "/admin/settings/payment-setting",
            element: <PaymentSetting />,
          },
          {
            path: "/admin/settings/shipping-setting",
            element: <ShippingSetting />,
          },
          {
            path: "/admin/settings/tax-setting",
            element: <TaxSetting />,
          },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/",
    element: <FrontStoreLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/product", element: <ProductPage /> },
      { path: "/cart", element: <Cart /> },
      { path: "/account", element: <Account /> },
      { path: "/payment-checkout", element: <PaymentCheckoutStatus /> },
    ],
  },
  { path: "/account/forgot-password", element: <ForgotPassword /> },
  { path: "/account/reset-password", element: <ResetPassword /> },
  {
    path: "*",
    element: <p>Page Not Found</p>,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContextAPI>
          <RouterProvider router={router} />
          <Toaster position={"top-center"} gutter={12} />
          <ReactQueryDevtools initialIsOpen={false} />
        </UserContextAPI>
      </QueryClientProvider>
    </>
  );
}

export default App;
