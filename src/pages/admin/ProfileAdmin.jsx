// src/pages/admin/ProfileAdmin.jsx
import React, { useState } from "react";
import {
  Typography,
  Card,
  Form,
  Input,
  Upload,
  Button,
  Radio,
  message,
  Avatar,
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ProfileAdmin = () => {
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState(null); // default null, pakai Avatar fallback

  const handleAvatarChange = (info) => {
    const file = info.file.originFileObj;

    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      message.error("Ukuran file maksimal 10MB!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarUrl(e.target.result); // preview base64
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (values) => {
    console.log("Profil disimpan:", {
      ...values,
      avatar: avatarUrl,
    });
    message.success("Profil berhasil diperbarui!");
    // Kirim ke backend jika sudah siap
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>👤 Edit Profil Admin</Title>
      <Card>
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            username: "admin",
            email: "admin@jendelacilik.com",
            gender: "Laki-laki",
          }}
          onFinish={handleSubmit}
        >
          <Form.Item label="Foto Profil">
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Upload
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleAvatarChange}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Pilih Foto</Button>
              </Upload>
              <Avatar
                size={80}
                src={avatarUrl}
                icon={!avatarUrl && <UserOutlined />}
                style={{
                  border: "2px solid #ccc",
                  backgroundColor: "#eee",
                }}
              />
            </div>
          </Form.Item>

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
