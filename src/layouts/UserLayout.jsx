import React, { useEffect, useState } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import {
  HomeOutlined,
  PlayCircleOutlined,
  BookOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Header, Content, Footer } = Layout;

const UserLayout = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: 'Beranda', path: '/user/home' },
    { key: 'playlist', icon: <PlayCircleOutlined />, label: 'Video Anak', path: '/user/playlist' },
    { key: 'books', icon: <BookOutlined />, label: 'Buku Cerita', path: '/user/books' },
  ];

  const selectedKey = menuItems.find(item => location.pathname.includes(item.key))?.key || 'home';

  const handleMenuClick = ({ key }) => {
    const selected = menuItems.find(item => item.key === key);
    if (selected?.path) {
      navigate(selected.path);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <Header
        style={{
          backgroundColor: 'var(--color-header)',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Menu Navigasi Kiri */}
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          style={{
            backgroundColor: 'transparent',
            color: 'var(--color-text)',
            fontWeight: 'bold',
            flex: 1,
            borderBottom: 'none',
          }}
          items={menuItems.map(item => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
          }))}
        />

        {/* Avatar & Username */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
            color: '#fff',
          }}
          onClick={() => navigate('/user/profile')}
        >
          <Avatar
            size={32}
            icon={<UserOutlined />}
            style={{ backgroundColor: '#BCE6F1', color: '#445566' }}
          />
          <span style={{ fontWeight: 'bold' }}>
            {user?.username || 'User'}
          </span>
        </div>
      </Header>

      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: 'var(--color-card)',
          borderRadius: '8px',
          minHeight: 'calc(100vh - 128px)',
          color: 'var(--color-text)',
        }}
      >
        {children}
      </Content>

      <Footer
        style={{
          backgroundColor: 'var(--color-header)',
          color: '#f0f0f0',
          padding: '40px 60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginBottom: '24px',
            gap: '24px',
          }}
        >
          <div style={{ flex: 1, minWidth: 200 }}>
            <h4 style={{ color: '#fff' }}>Tentang Kami</h4>
            <p style={{ color: '#fff' }}>
              Website ini dikembangkan oleh kelompok <strong>KOI</strong> untuk memenuhi fantasi masa kecil dan mengedukasi anak-anak menggunakan gadget dengan cara yang benar dan menyenangkan.
            </p>
          </div>

          <div style={{ flex: 1, minWidth: 220, marginLeft: '150px' }}>
            <h4 style={{ color: '#fff' }}>Kontak Kami</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#fff' }}>
              <li style={{ marginBottom: '8px' }}>
                📞 <a href="tel:+6282136953197" style={{ color: '#fff', textDecoration: 'none' }}>
                  (+62) 821-3695-3197
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                ✉ <a href="mailto:ikankoi@gmail.com" style={{ color: '#fff', textDecoration: 'none' }}>
                  ikankoi@gmail.com
                </a>
              </li>
              <li>📍 Sanctuary</li>
            </ul>
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            <h4 style={{ color: '#fff' }}>JendelaCilik</h4>
            <p style={{ color: '#fff' }}>
              Aplikasi belajar anak dengan fitur interaktif dan konten edukatif untuk mendukung perkembangan si kecil secara menyenangkan dan aman.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', color: '#fff', fontSize: '12px' }}>
          © 2025 JendelaCilik — Made with Love from KOI 💗
        </div>
      </Footer>
    </Layout>
  );
};

export default UserLayout;