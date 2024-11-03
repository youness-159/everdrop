import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy, Suspense } from "react";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage.jsx";
import FallbackLoader from "./ui/FallbackLoader.jsx";

const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const Products = lazy(
  () => import("./pages/admin/product-pages/AdminProducts.jsx"),
);
const Categories = lazy(
  () => import("./pages/admin/category-pages/Categories.jsx"),
);
const Collections = lazy(
  () => import("./pages/admin/collection-pages/Collections.jsx"),
);
const Orders = lazy(() => import("./pages/admin/Orders.jsx"));
const Customers = lazy(() => import("./pages/admin/Customers.jsx"));
const Coupons = lazy(() => import("./pages/admin/coupon-pages/Coupons.jsx"));
const Settings = lazy(() => import("./pages/admin/Settings.jsx"));
const StoreSetting = lazy(
  () => import("./pages/admin/Settings/StoreSetting.jsx"),
);
const PaymentSetting = lazy(
  () => import("./pages/admin/Settings/PaymentSetting.jsx"),
);
const ShippingSetting = lazy(
  () => import("./pages/admin/Settings/ShippingSetting.jsx"),
);
const TaxSetting = lazy(() => import("./pages/admin/Settings/TaxSetting.jsx"));
const NewProduct = lazy(
  () => import("./pages/admin/product-pages/NewProduct.jsx"),
);
const NewCoupon = lazy(
  () => import("./pages/admin/coupon-pages/NewCoupon.jsx"),
);
const NewCollection = lazy(
  () => import("./pages/admin/collection-pages/NewCollection.jsx"),
);
const UpdateProduct = lazy(
  () => import("./pages/admin/product-pages/UpdateProduct.jsx"),
);
const UpdateCoupon = lazy(
  () => import("./pages/admin/coupon-pages/UpdateCoupon.jsx"),
);
const UpdateCollection = lazy(
  () => import("./pages/admin/collection-pages/UpdateCollection.jsx"),
);
const NewCategory = lazy(
  () => import("./pages/admin/category-pages/NewCategory.jsx"),
);
const UpdateCategory = lazy(
  () => import("./pages/admin/category-pages/UpdateCategory.jsx"),
);
const Login = lazy(() => import("./pages/Login.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const Home = lazy(() => import("./pages/frontStore/Home.jsx"));
const FrontStoreLayout = lazy(
  () => import("./pages/frontStore/FrontStoreLayout.jsx"),
);
const ProductsPage = lazy(() => import("./pages/frontStore/ProductsPage.jsx"));
const ProductPage = lazy(() => import("./pages/frontStore/ProductPage.jsx"));
const UserContextAPI = lazy(() => import("./context/userContextAPI.jsx"));
const Account = lazy(() => import("./pages/frontStore/Account.jsx"));
const Cart = lazy(() => import("./pages/frontStore/Cart.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.jsx"));

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
      { path: "/checkout-success", element: <CheckoutSuccessPage /> },
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
      <Suspense fallback={<FallbackLoader />}>
        <QueryClientProvider client={queryClient}>
          <UserContextAPI>
            <RouterProvider router={router} />
            <Toaster position={"top-center"} gutter={12} />
            <ReactQueryDevtools initialIsOpen={false} />
          </UserContextAPI>
        </QueryClientProvider>
      </Suspense>
    </>
  );
}

export default App;
