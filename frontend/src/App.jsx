
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// command 
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/common/HomePage";
import BlogPage from "./pages/common/BlogPage";
import ContactPage from "./pages/common/ContactPage";
import AuthPage from "./pages/common/AuthPage";

// installer
import InstallersPage from "./pages/installer/InstallerPage";

// admin
import CustomerFormPage from "./pages/admin/CustomerFormPage";
import DashboardPage from "./pages/admin/DashboardPage";
import AdminInstallerPage from "./pages/admin/AdminInstallerPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/installer" element={<InstallersPage />} />
      <Route path="/admin/*">
        <Route index element={<DashboardPage />} />
        <Route path="customer-form" element={<CustomerFormPage />} />
        <Route path="installer" element={<AdminInstallerPage />} />
      </Route>
    </Routes>
  );
}

export default App;
