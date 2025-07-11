// src/pages/admin/ProfileAdmin.jsx
import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  Form,
  Input,
  Button,
  Radio,
  message,
} from "antd";
import { useAuth } from "../../context/AuthContext";

const { Title } = Typography;

const ProfileAdmin = () => {
  const [form] = Form.useForm();
  const { user } = useAuth(); // Ambil data admin

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        email: user.email,
        gender: user.gender || null,
      });
    }
  }, [user, form]);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("gender", values.gender || "");

      await fetch(`http://localhost:8000/api/profile/${user.id}`, {
        method: "PUT",
        body: formData,
      });

      message.success("Profil berhasil diperbarui!");
    } catch (error) {
      console.error(error);
      message.error("Gagal memperbarui profil");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>👤 Edit Profil Admin</Title>
      <Card hoverable={false} style={{ boxShadow: 'none', transition: 'none' }}>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Masukkan username" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Masukkan email" },
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
    </div>
  );
};

export default ProfileAdmin;