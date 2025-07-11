// src/pages/admin/Settings.jsx
import React, { useState } from "react";
import {
  Typography,
  Card,
  Input,
  Button,
  Divider,
  Form,
  message,
} from "antd";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "../../styles/managesettings.css";

const { Title, Text } = Typography;

const Settings = () => {
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // Ambil user login (admin)

  const handlePasswordChange = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      return message.error("Password baru dan konfirmasi tidak cocok!");
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8000/api/profile/${user.id}/password`, // ← endpoint password user/admin
        {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        }
      );

      if (response.data.success) {
        message.success("Password berhasil diperbarui!");
        passwordForm.resetFields();
      } else {
        message.error(response.data.message || "Gagal mengubah password.");
      }
    } catch (error) {
      console.error("Update password error:", error);
      message.error(
        error.response?.data?.message ||
          "Terjadi kesalahan saat mengubah password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manage-settings-container">
      <Title level={2}>⚙ Pengaturan Admin</Title>

      <Card hoverable={false} style={{ boxShadow: "none", transition: "none" }}>
        <Title level={4}>🔐 Ganti Password</Title>
        <Form layout="vertical" form={passwordForm} onFinish={handlePasswordChange}>
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

          <Button type="primary" htmlType="submit" loading={loading}>
            Simpan Perubahan
          </Button>
        </Form>
      </Card>

      <Divider />
      <Text type="secondary">Versi Aplikasi: 1.0.0</Text>
    </div>
  );
};

export default Settings;