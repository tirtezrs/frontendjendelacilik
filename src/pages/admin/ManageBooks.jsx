// src/pages/admin/ManageBooks.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  Upload,
  message,
  Modal,
  Table,
  Space,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FilePdfOutlined,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import '../../styles/managebooks.css';

const { Title } = Typography;
const { Option } = Select;

export default function ManageBooks() {
  const [form] = Form.useForm();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/books");
      setBooks(response.data);
    } catch (error) {
      message.error("Gagal memuat data buku.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (values) => {
    if (!values.pdf && !editingId) {
      return message.error("File PDF wajib diupload!");
    }
    if (!values.cover && !editingId) {
      return message.error("Thumbnail wajib diupload!");
    }

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('genre', values.genre);
    formData.append('description', values.description);

    if (values.cover && values.cover.length > 0) {
      formData.append('cover', values.cover[0].originFileObj);
    }
    if (values.pdf && values.pdf.length > 0) {
      formData.append('pdf', values.pdf[0].originFileObj);
    }

    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/books/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        message.success("Buku berhasil diperbarui!");
      } else {
        await axios.post("http://localhost:8000/api/books", formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        message.success("Buku berhasil ditambahkan!");
      }
      form.resetFields();
      setEditingId(null);
      await fetchBooks();
    } catch (error) {
      message.error("Gagal menyimpan buku.");
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (book) => {
    setEditingId(book._id);
    form.setFieldsValue({
      title: book.title,
      genre: book.genre,
      description: book.description,
    });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Yakin ingin menghapus buku ini?",
      okText: "Ya, Hapus",
      okType: "danger",
      onOk: async () => {
        setLoading(true);
        try {
          await axios.delete(`http://localhost:8000/api/books/${id}`);
          message.success("Buku berhasil dihapus");
          await fetchBooks();
        } catch (error) {
          message.error("Gagal menghapus buku");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handlePreview = (url) => setPreviewImage(url);

  return (
    <div className="manage-books-container">
      <Title level={2}>📚 Kelola Buku Cerita</Title>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Title level={4}>{editingId ? "Edit Buku" : "Tambah Buku Baru"}</Title>

        <Form.Item
          label="Judul Buku"
          name="title"
          rules={[{ required: true, message: "Judul wajib diisi" }]}
        >
          <Input placeholder="Judul Buku" />
        </Form.Item>

        <Form.Item
          label="Upload File Buku (PDF)"
          name="pdf"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: !editingId, message: "File PDF wajib diupload" }]}
        >
          <Upload beforeUpload={() => false} maxCount={1} listType="text">
            <Button icon={<UploadOutlined />}>Upload PDF</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Upload Gambar Sampul"
          name="cover"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: !editingId, message: "Sampul wajib diupload" }]}
        >
          <Upload
            beforeUpload={() => false}
            listType="picture-card"
            accept="image/*"
            maxCount={1}
            onPreview={(file) => handlePreview(file.thumbUrl || file.url || "")}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Genre"
          name="genre"
          rules={[{ required: true, message: "Pilih genre buku" }]}
        >
          <Select placeholder="Pilih genre">
            <Option value="fantasi">Fantasi</Option>
            <Option value="dongeng">Dongeng</Option>
            <Option value="edukasi">Edukasi</Option>
            <Option value="petualangan">Petualangan</Option>
            <Option value="lainnya">Lainnya</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Deskripsi" name="description">
          <Input.TextArea rows={3} placeholder="Deskripsi singkat buku" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={editingId ? <EditOutlined /> : <PlusOutlined />}
          >
            {editingId ? "Update Buku" : "Tambah Buku"}
          </Button>
          {editingId && (
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => {
                form.resetFields();
                setEditingId(null);
              }}
            >
              Batal
            </Button>
          )}
        </Form.Item>
      </Form>

      <Title level={4}>📖 Daftar Buku</Title>

      <Table
        loading={loading}
        columns={[
          {
            title: 'Sampul',
            dataIndex: 'coverUrl',
            render: (url) => (
              <img
                src={`http://localhost:8000/${url}`}
                alt="sampul"
                style={{ width: 60, height: 80, objectFit: 'cover', borderRadius: 4 }}
              />
            ),
          },
          { title: 'Judul', dataIndex: 'title' },
          { title: 'Genre', dataIndex: 'genre' },
          {
            title: 'Aksi',
            key: 'action',
            render: (_, record) => (
              <Space>
                <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                  Edit
                </Button>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(record._id)}
                >
                  Hapus
                </Button>
                <Button
                  type="link"
                  icon={<FilePdfOutlined />}
                  href={`http://localhost:8000${record.pdfUrl}`}
                  target="_blank"
                >
                  Buka PDF
                </Button>
              </Space>
            ),
          },
        ]}
        dataSource={books}
        rowKey="_id"
      />

      <Modal
        open={!!previewImage}
        footer={null}
        onCancel={() => setPreviewImage(null)}
      >
        <img alt="Preview Sampul" src={previewImage} style={{ width: "100%" }} />
      </Modal>
    </div>
  );
}
