import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';

const { Title } = Typography;

const AccountSettings = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Simulasi penyimpanan perubahan
    console.log('Data pengaturan akun:', values);
    message.success('Pengaturan akun berhasil disimpan!');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#A8E6CF',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24
    }}>
      <Card style={{ width: 400, backgroundColor: '#FFEAA7' }}>
        <Title level={3} style={{ textAlign: 'center', color: '#333' }}>
          Pengaturan Akun
        </Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            email: '',
            password: '',
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Masukkan email baru' }]}
          >
            <Input placeholder="contoh@email.com" />
          </Form.Item>

          <Form.Item
            label="Kata Sandi Baru"
            name="password"
            rules={[{ required: true, message: 'Masukkan kata sandi baru' }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: '#FF8FAB', border: 'none', width: '100%' }}
            >
              Simpan Perubahan
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AccountSettings;
