import React, { useState } from 'react';
import { Button, Form, Input, Typography, message, Card } from 'antd'; // Card saya hapus karena tidak terpakai di desain baru
import { Link, useNavigate } from 'react-router-dom'; // Import Link
import axios from 'axios';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'; // Import icon

const { Title, Text } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // --- LOGIKA onFinish DARI KODE KITA BERSAMA ---
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Mengirim data username, email, dan password ke backend
      const response = await axios.post("http://localhost:8000/api/auth/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      message.success(response.data.message || "Registrasi berhasil! Silakan login.");
      navigate("/login"); // Arahkan ke halaman login setelah sukses
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : "Registrasi gagal.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
          DAFTAR AKUN BARU
        </Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: 32, textAlign: 'center' }}>
          Silakan isi formulir di bawah ini untuk mendaftar.
        </Text>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="username" label="Nama Pengguna" rules={[{ required: true, message: 'Masukkan nama pengguna' }]}>
            <Input size="large" prefix={<UserOutlined />} placeholder="Nama Anda" />
          </Form.Item>

          {/* BARU: Menambahkan field Email yang dibutuhkan backend */}
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Masukkan email Anda' }, { type: 'email', message: 'Format email tidak valid!' }]}>
            <Input size="large" prefix={<MailOutlined />} placeholder="contoh@email.com" />
          </Form.Item>

          <Form.Item name="password" label="Kata Sandi" rules={[{ required: true, message: 'Masukkan kata sandi' }]}>
            <Input.Password size="large" prefix={<LockOutlined />} placeholder="********" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              style={{ width: '100%', backgroundColor: '#1677d4', border: 'none', borderRadius: 8 }}
            >
              Daftar
            </Button>
          </Form.Item>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Text type="secondary">Sudah punya akun? </Text>
            {/* DIUBAH: Menggunakan Link agar tidak me-reload halaman */}
            <Link to="/login" style={{ color: '#1677d4', fontWeight: 'bold' }}>Masuk di sini</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;