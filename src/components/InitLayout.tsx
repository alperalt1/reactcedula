import { CreditCardOutlined, HistoryOutlined, HomeOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { useAuthStore } from "../store/useAuthStore"
import { Button, Layout, Menu, theme, Drawer, Grid, Modal } from "antd";
import { useState } from "react";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { Link, Outlet, useLocation, useNavigate } from "react-router";

const { useBreakpoint } = Grid;

const InitLayout = () => {
  const logout = useAuthStore(state => state.logout);
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { confirm } = Modal;
  const screens = useBreakpoint();
  const isMobile = !screens.lg;
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.includes('/home/planes')) return '2';
    if (path.includes('/home/historial')) return '5';
    if (path.includes('/home/perfil')) return '3';
    if (path === '/home') return '1';
    return '1';
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (item: any) => {
    if (item.key === '4') {
      confirm({
        title: '¿Estás seguro de que deseas cerrar sesión?',
        icon: <LogoutOutlined style={{ color: '#ff4d4f' }} />,
        content: 'Tendrás que ingresar tus credenciales nuevamente para acceder.',
        okText: 'Sí, salir',
        okType: 'danger',
        cancelText: 'Cancelar',
        centered: true, 
        onOk() {
          logout();
          navigate('/login', { replace: true });
        },
        onCancel() {
          console.log('Cancelado');
        },
      });
      return; 
    }

    if (isMobile) setDrawerVisible(false);
  };

  const menuComponent = (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[getSelectedKey()]}
      onClick={handleMenuClick}
      items={[
        { key: '1', icon: <HomeOutlined />, label: <Link to="/home">Inicio</Link> },
        { key: '2', icon: <CreditCardOutlined />, label: <Link to="/home/planes">Planes</Link> },
        { key: '5', icon: <HistoryOutlined />, label: <Link to="/home/historial">Historial</Link> },
        { key: '3', icon: <UserOutlined />, label: <Link to="/home/perfil">Perfil</Link> },
        { key: '4', icon: <LogoutOutlined />, label: 'Cerrar Sesión', danger: true },
      ]}
    />
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>

      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={250}
          style={{ background: colorBgContainer }}
        >
          <div style={{ height: 32, margin: 16, background: '#f0f2f5', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#1890ff' }}>
            {collapsed ? 'EC' : 'CONSULTA EC'}
          </div>
          {menuComponent}
        </Sider>
      )}

      <Drawer
        title="CONSULTA EC"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width="100%"
        styles={{ body: { padding: 0 } }}
      >
        {menuComponent}
      </Drawer>

      <Layout>
        <Header style={{ padding: 0, background: '#ffff', display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            icon={isMobile ? <MenuUnfoldOutlined /> : (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />)}
            onClick={() => isMobile ? setDrawerVisible(true) : setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          {isMobile && <span style={{ fontWeight: 'bold', color: '#1890ff' }}>CONSULTA EC</span>}
        </Header>

        <Content
          style={{
            margin: isMobile ? '10px' : '24px 16px',
            padding: isMobile ? 12 : 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            flex: 1,
            transition: 'all 0.2s', // Suaviza el cambio de tamaño
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout >
  )
}

export default InitLayout;