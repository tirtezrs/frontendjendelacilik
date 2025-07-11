import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom'; // Menggunakan Link untuk navigasi SPA
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Login = () => {
  const { login, user } = useAuth(); // Ambil user dan login dari context
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // --- LOGIKA onFinish DARI KODE KITA YANG SUDAH TERHUBUNG KE BACKEND ---
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", {
        username: values.username, // Kirim username
        password: values.password,
      });
      
      // Panggil fungsi login dari Context untuk menyimpan state dan token
      login(response.data.user, response.data.token);
      message.success(response.data.message || 'Login berhasil!');
      // Navigasi akan di-handle secara otomatis oleh App.jsx yang mendengarkan perubahan state 'user'

    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : "Login gagal.";
      message.error(errorMessage);
      setLoading(false); // Hentikan loading hanya jika terjadi error
    }
  };

  // Efek untuk me-redirect jika user sudah login
  useEffect(() => {
    if (user) {
      const targetPath = user.role === 'admin' ? '/admin/dashboard' : '/user/home';
      navigate(targetPath, { replace: true });
    }
  }, [user, navigate]);


  // --- TAMPILAN JSX DARI KODE TIM ANDA, DENGAN PENYESUAIAN ---
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        backgroundImage: `url('/images/backlogin.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: `'Poppins', sans-serif`,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 6px 24px rgba(0,0,0,0.2)',
          width: '100%',
          maxWidth: 400,
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <Title level={2} style={{ fontWeight: 700, marginBottom: 0, textAlign: 'center' }}>
          SELAMAT DATANG!
        </Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: 32, textAlign: 'center' }}>
          Silakan masuk untuk melanjutkan.
        </Text>

        <Form layout="vertical" onFinish={onFinish}>
          
          {/* DIUBAH: dari 'email' menjadi 'username' */}
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Masukkan username Anda' }]}>
            <Input size="large" prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          
          <Form.Item name="password" label="Kata Sandi" rules={[{ required: true, message: 'Masukkan kata sandi' }]}>
            <Input.Password size="large" prefix={<LockOutlined />} placeholder="********" />
          </Form.Item>
          
          {/* DIHAPUS: Form.Item untuk 'role' sudah tidak diperlukan */}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, }}>
            <label> <input type="checkbox" style={{ marginRight: 6 }} /> Ingat saya </label>
            <a href="#" style={{ fontSize: 14 }}>Lupa kata sandi</a>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              style={{ width: '100%', backgroundColor: '#1677d4', border: 'none', borderRadius: 8 }}
            >
              Masuk
            </Button>
          </Form.Item>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Text type="secondary">Belum punya akun? </Text>
            {/* DIUBAH: menggunakan <Link> agar tidak me-reload halaman */}
            <Link to="/register" style={{ color: '#1677d4', fontWeight: 'bold' }}>Daftar sekarang!</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;