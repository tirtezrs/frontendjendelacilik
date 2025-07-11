import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Form,
  Input,
  Button,
  Radio,
  message,
  Divider,
  Modal,
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const { Title } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        email: user.email,
        gender: user.gender || null,
      });
    }
  }, [user, form]);

  const handleSubmitProfile = async (values) => {
    try {
      const response = await fetch(`http://localhost:8000/api/profile/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          gender: values.gender || "",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        message.success("Profil berhasil diperbarui!");
      } else {
        message.error(data.message || "Gagal memperbarui profil");
      }
    } catch (err) {
      console.error(err);
      message.error("Terjadi kesalahan saat memperbarui profil");
    }
  };

  const handleSubmitPassword = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      return message.error("Password baru dan konfirmasi tidak cocok!");
    }

    try {
      const response = await fetch(`http://localhost:8000/api/profile/${user.id}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        message.success("Password berhasil diperbarui!");
        passwordForm.resetFields();
      } else {
        message.error(data.message || "Gagal mengubah password.");
      }
    } catch (err) {
      console.error("Update password error:", err);
      message.error("Terjadi kesalahan saat mengubah password.");
    }
  };

  const showLogoutConfirm = () => {
    Modal.confirm({
      title: "Konfirmasi Logout",
      content: "Apakah Anda yakin ingin keluar?",
      okText: "Ya, Logout",
      cancelText: "Batal",
      onOk() {
        logout();
        navigate("/login");
      },
    });
  };

  return (
    <div style={{ padding: 24, minHeight: "100vh" }}>
      <Title level={2}>👤 Profil Saya</Title>

      {/* FORM PROFIL */}
      <Card
        hoverable={false}
        style={{ boxShadow: 'none', transition: 'none' }}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmitProfile}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Username wajib diisi" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email wajib diisi" },
              { type: "email", message: "Format email tidak valid" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Jenis Kelamin" name="gender">
            <Radio.Group>
              <Radio value="Laki-laki">Laki-laki</Radio>
              <Radio value="Perempuan">Perempuan</Radio>
              <Radio value="Lainnya">Lainnya</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Simpan Perubahan
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Divider />

      {/* FORM GANTI PASSWORD */}
      <Card
        title="🔒 Ubah Password"
        hoverable={false}
        style={{ boxShadow: 'none', transition: 'none' }}
      >
        <Form layout="vertical" form={passwordForm} onFinish={handleSubmitPassword}>
          <Form.Item
            label="Password Lama"
            name="oldPassword"
            rules={[{ required: true, message: "Masukkan password lama" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Password Baru"
            name="newPassword"
            rules={[{ required: true, message: "Masukkan password baru" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Konfirmasi Password Baru"
            name="confirmPassword"
            rules={[{ required: true, message: "Konfirmasi password baru" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Ubah Password
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* LOGOUT */}
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          onClick={showLogoutConfirm}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;