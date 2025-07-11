import React from 'react';
import { Layout, Menu, Avatar, Modal } from 'antd';
import {
  DashboardOutlined,
  VideoCameraOutlined,
  BookOutlined,
  CommentOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard', path: '/admin/dashboard' },
    { key: 'videos', icon: <VideoCameraOutlined />, label: 'Kelola Video', path: '/admin/videos' },
    { key: 'books', icon: <BookOutlined />, label: 'Kelola Buku', path: '/admin/books' },
    { key: 'comments', icon: <CommentOutlined />, label: 'Komentar', path: '/admin/comments' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Pengaturan', path: '/admin/settings' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Keluar', action: 'logout' },
  ];

  const showLogoutConfirm = () => {
    Modal.confirm({
      title: 'Konfirmasi Keluar',
      content: 'Apakah Anda yakin ingin keluar?',
      okText: 'Ya, keluar',
      cancelText: 'Batal',
      onOk() {
        logout();
        navigate('/');
      },
    });
  };

  const handleMenuClick = ({ key }) => {
    const selected = menuItems.find(item => item.key === key);
    if (selected?.action === 'logout') {
      showLogoutConfirm();
    } else if (selected?.path) {
      navigate(selected.path);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#DFF6FF' }}>
      <Sider width={220} style={{ backgroundColor: '#BCE6F1' }}>
        <div className="logo" style={{
          color: '#445566',
          padding: '20px',
          fontSize: '20px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          Admin Panel
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          onClick={handleMenuClick}
          style={{
            backgroundColor: '#BCE6F1',
            color: '#445566',
            fontWeight: '500'
          }}
          items={menuItems.map(item => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
          }))}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            backgroundColor: '#77B6EA',
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <div
            onClick={() => navigate('/admin/profile')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
              color: '#fff',
            }}
          >
            <Avatar
              size={32}
              src={user?.photoURL || null}
              icon={!user?.photoURL && <UserOutlined />}
              style={{ backgroundColor: '#BCE6F1', color: '#445566' }}
            />
            <span style={{ fontWeight: 'bold' }}>{user?.username || 'Admin'}</span>
          </div>
        </Header>

        <Content style={{
          margin: '24px 16px',
          padding: 24,
          backgroundColor: '#BCE6F1',
          borderRadius: '8px',
          minHeight: 'calc(100vh - 64px)'
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
