import { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  Row,
  Col,
  Card,
  Modal,
  message,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "../../styles/managebooks.css";

const { Title, Paragraph } = Typography;
const { Option } = Select;

export default function ManageBooks() {
  const [form] = Form.useForm();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewBook, setPreviewBook] = useState(null);

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
    const data = {
      title: values.title,
      coverUrl: values.coverUrl,
      genre: values.genre,
      description: values.description,
    };

    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/books/${editingId}`, data);
        message.success("Buku berhasil diperbarui.");
      } else {
        await axios.post("http://localhost:8000/api/books", data);
        message.success("Buku berhasil ditambahkan.");
      }
      form.resetFields();
      setEditingId(null);
      await fetchBooks();
    } catch (error) {
      message.error("Gagal menyimpan buku.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (book) => {
    setEditingId(book._id);
    form.setFieldsValue({
      title: book.title,
      coverUrl: book.coverUrl,
      genre: book.genre,
      description: book.description,
    });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Yakin ingin menghapus buku ini?",
      okText: "Ya, Hapus",
      okType: "danger",
      cancelText: "Batal",
      onOk: async () => {
        setLoading(true);
        try {
          await axios.delete(`http://localhost:8000/api/books/${id}`);
          message.success("Buku berhasil dihapus.");
          await fetchBooks();
        } catch (error) {
          message.error("Gagal menghapus buku.");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handlePreview = (book) => setPreviewBook(book);
  const handleCancelPreview = () => setPreviewBook(null);

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

        {/* PDF LINK REMOVED */}

        <Form.Item
          label="Thumbnail URL"
          name="coverUrl"
          rules={[
            { required: true, message: "URL thumbnail wajib diisi" },
            {
              pattern: /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i,
              message: "Masukkan URL gambar yang valid (jpg/png/webp)",
            },
          ]}
        >
          <Input placeholder="https://example.com/cover.jpg" />
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

        <Form.Item label="Deskripsi (Link Cerita)" name="description">
          <Input.TextArea rows={3} placeholder="https://drive.google.com/..." />
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
              onClick={() => {
                form.resetFields();
                setEditingId(null);
              }}
              style={{ marginLeft: 8 }}
            >
              Batal
            </Button>
          )}
        </Form.Item>
      </Form>

      <Title level={4}>📖 Daftar Buku</Title>

      <Row gutter={[16, 16]}>
        {loading ? (
          <p>Loading...</p>
        ) : books.length === 0 ? (
          <p>Belum ada buku ditambahkan.</p>
        ) : (
          books.map((book) => (
            <Col key={book._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt={book.title}
                    src={book.coverUrl}
                    onClick={() => handlePreview(book)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/200x300?text=No+Image";
                    }}
                    style={{ height: 300, objectFit: "cover", cursor: "pointer" }}
                  />
                }
                actions={[
                  <Tooltip title="Edit Buku">
                    <EditOutlined onClick={() => handleEdit(book)} />
                  </Tooltip>,
                  <Tooltip title="Hapus Buku">
                    <DeleteOutlined
                      onClick={() => handleDelete(book._id)}
                      style={{ color: "red" }}
                    />
                  </Tooltip>,
                ]}
              >
                <Card.Meta
                  title={book.title}
                  description={
                    <>
                      <p>📚 Genre: {book.genre}</p>
                      <p>{book.description}</p>
                    </>
                  }
                />
              </Card>
            </Col>
          ))
        )}
      </Row>

      <Modal
        open={!!previewBook}
        footer={null}
        onCancel={handleCancelPreview}
        title={previewBook?.title}
      >
        {previewBook && (
          <>
            <img
              alt="Preview Cover"
              src={previewBook.coverUrl}
              style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/200x300?text=No+Image";
              }}
            />
            <Paragraph>
              <strong>📚 Genre:</strong> {previewBook.genre}
            </Paragraph>
            <Paragraph copyable>
              <strong>🔗 Link Cerita:</strong>{" "}
              <a
                href={previewBook.description}
                target="_blank"
                rel="noopener noreferrer"
              >
                {previewBook.description}
              </a>
            </Paragraph>
          </>
        )}
      </Modal>
    </div>
  );
}
