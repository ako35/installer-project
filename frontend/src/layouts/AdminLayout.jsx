import { Layout, Menu } from "antd";
import PropTypes from "prop-types";
import {
  UserOutlined,
  RollbackOutlined,
  BarcodeOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider, Header, Content } = Layout;

const getInstallerRole = () => {
  const installer = JSON.parse(localStorage.getItem("installer"));
  return installer ? installer.role : null;
};

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const installerRole = getInstallerRole();

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/admin",
      onClick: () => {
        navigate(`/admin`);
      },
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Kategoriler",
      path: "/",
      children: [
        {
          key: "3",
          label: "Kategori Listesi",
          path: "/admin/categories",
          onClick: () => {
            navigate(`/admin/categories`);
          },
        },
        {
          key: "4",
          label: "Yeni Kategori Oluştur",
          path: "/admin/categories/create",
          onClick: () => {
            navigate("/admin/categories/create");
          },
        },
      ],
    },
    {
      key: "8",
      icon: <BarcodeOutlined />,
      label: "Müşteri Formu",
      path: "/admin/customer-form",
      onClick: () => {
        navigate(`/admin/customer-form`);
      },
    },
    {
      key: "11",
      icon: <UserOutlined />,
      label: "Kurulumcu Listesi",
      path: "/admin/installer",
      onClick: () => {
        navigate(`/admin/installer`);
      },
    },
    {
      key: "12",
      icon: <ShoppingCartOutlined />,
      label: "Siparişler",
      path: "/admin/orders",
      onClick: () => {
        navigate(`/admin/orders`);
      },
    },
    {
      key: "13",
      icon: <RollbackOutlined />,
      label: "Ana Sayfaya Git",
      onClick: () => {
        window.location.href = "/";
      },
    },
  ];

  const getActiveKey = () => {
    for (const item of menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === window.location.pathname) {
            return child.key;
          }
        }
      } else {
        if (item.path === window.location.pathname) {
          return item.key;
        }
      }
    }
  };

  const getPageTitle = () => {
    for (const item of menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === window.location.pathname) {
            return child.label;
          }
        }
      } else {
        if (item.path === window.location.pathname) {
          return item.label;
        }
      }
    }
  };

  if (installerRole === "admin") {
    return (
      <div className="admin-layout">
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider width={200} theme="dark">
            <Menu
              mode="vertical"
              style={{
                height: "100%",
              }}
              items={menuItems}
              defaultSelectedKeys={[getActiveKey()]}
            />
          </Sider>
          <Layout>
            <Header>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "white",
                }}
              >
                <h2>{getPageTitle()}</h2>
                <h2>Admin Paneli</h2>
              </div>
            </Header>
            <Content>
              <div
                className="site-layout-background"
                style={{
                  padding: "24px 50px",
                  minHeight: 360,
                }}
              >
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  } else {
    return (window.location.href = "/");
  }
};

export default AdminLayout;

AdminLayout.propTypes = {
  children: PropTypes.node,
};
