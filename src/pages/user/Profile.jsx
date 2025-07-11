import React, { useState, useEffect } from 'react'; // <-- Tambahkan useEffect
import {
  Typography,
  Card,
  Form,
  Input,
  Upload,
  Button,
  Radio,
  message,
  Divider,
  Modal,
  Avatar, // <-- Tambahkan Avatar
} from "antd";
import { UploadOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext'; // <-- Import useAuth

const { Title, Text } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  
  const { user, logout } = useAuth(); // <-- Ambil data user dan fungsi logout dari context
  const navigate = useNavigate();
  
  // State untuk avatar tetap sama, tapi nilai defaultnya bisa kita ambil dari user
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || "/avatar-default.png");
  const [fileName, setFileName] = useState("");

  // --- BARU: Mengisi form dengan data user saat komponen dimuat ---
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        email: user.email,
        // Anda bisa tambahkan field lain seperti gender jika ada di data user
      });
    }
  }, [user, form]);


  const handleAvatarChange = (info) => {
    // Logika avatar change Anda sudah bagus, bisa dipertahankan
    // ...
  };

  const handleSubmitProfile = (values) => {
    // Di sini nanti kita akan panggil API untuk update profil
    console.log("Data profil baru:", values);
    message.success("Profil berhasil diperbarui! (Fungsi API belum terhubung)");
  };

  const handleSubmitPassword = (values) => {
    // Di sini nanti kita akan panggil API untuk ubah password
    if (values.newPassword !== values.confirmPassword) {
      return message.error("Konfirmasi password tidak sama!");
    }
    console.log("Password baru:", values.newPassword);
    message.success("Password berhasil diperbarui! (Fungsi API belum terhubung)");
    passwordForm.resetFields();
  };

  // --- DIUBAH: Fungsi logout sekarang memanggil dari context ---
  const showLogoutConfirm = () => {
    Modal.confirm({
      title: "Konfirmasi Logout",
      content: "Apakah Anda yakin ingin keluar?",
      okText: "Ya, Logout",
      cancelText: "Batal",
      onOk() {
        logout(); // Panggil fungsi logout dari AuthContext
        // Navigasi sudah di-handle di dalam fungsi logout di context
      },
    });
  };

  return (
    <div style={{ padding: 24, minHeight: "100vh" }}>
      <Title level={2}>👤 Profil Saya</Title>

      <Card>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmitProfile}
        >
          <Form.Item label="Foto Profil">
            {/* Menggunakan komponen Avatar dari AntD agar lebih bagus */}
            <Avatar 
                src={avatarUrl} 
                size={100} 
                icon={<UserOutlined />}
                style={{ marginBottom: 12, border: '2px solid #ccc' }}
            />
            <Upload
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleAvatarChange}
              accept="image/png,image/jpeg"
            >
              <Button icon={<UploadOutlined />}>Ubah Foto</Button>
            </Upload>
            {fileName && (
              <Text type="secondary" style={{ display: "block", marginTop: 8 }}>
                File terpilih: {fileName}
              </Text>
            )}
          </Form.Item>

          <Form.Item label="Username" name="username" rules={[{ required: true, message: "Masukkan username" }]}>
            <Input readOnly /> {/* Username biasanya tidak bisa diubah */}
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Masukkan email" }, { type: "email" }]}>
            <Input readOnly /> {/* Email biasanya tidak bisa diubah */}
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

      <Card title="🔒 Ubah Password">
        <Form layout="vertical" form={passwordForm} onFinish={handleSubmitPassword}>
            {/* ... Isi form ubah password Anda tetap sama ... */}
        </Form>
      </Card>

      {/* Tombol Logout */}
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