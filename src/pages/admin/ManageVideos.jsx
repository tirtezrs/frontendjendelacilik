import { useState, useEffect } from "react"; // <-- Ditambahkan useEffect
import axios from "axios"; // <-- Ditambahkan axios
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
  Space, // <-- Ditambahkan Space
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import '../../styles/managevideos.css';

const { Title } = Typography;
const { Option } = Select;

export default function ManageVideos() {
  const [form] = Form.useForm();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // <-- Ditambahkan loading
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // --- LOGIKA BARU UNTUK MENGAMBIL DATA DARI BACKEND ---
  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/videos");
      setVideos(response.data);
    } catch (error) {
      message.error("Gagal memuat data video.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // --- LOGIKA BARU UNTUK SUBMIT FORM KE BACKEND ---
  const handleSubmit = async (values) => {
    // Sesuaikan nama field dari form ke nama field di backend
    const videoData = {
      title: values.title,
      youtubeUrl: values.youtubeUrl,
      thumbnailUrl: values.thumbnailUrl,
      genre: values.genre,
      description: values.description,
    };
    
    setLoading(true);
    try {
      if (editingId) {
        // Logika UPDATE
        await axios.put(`http://localhost:8000/api/videos/${editingId}`, videoData);
        message.success("Video berhasil diperbarui");
      } else {
        // Logika CREATE
        await axios.post("http://localhost:8000/api/videos", videoData);
        message.success("Video berhasil ditambahkan");
      }
      form.resetFields();
      setEditingId(null);
      await fetchVideos(); // Refresh daftar video
    } catch (error) {
      message.error("Gagal menyimpan video.");
    } finally {
      setLoading(false);
    }
  };

  // --- LOGIKA BARU UNTUK MENGISI FORM SAAT EDIT ---
  const handleEdit = (video) => {
    setEditingId(video._id);
    // Sesuaikan nama field agar cocok dengan form
    form.setFieldsValue({
        title: video.title,
        youtubeUrl: video.youtubeUrl,
        thumbnailUrl: video.thumbnailUrl,
        genre: video.genre,
        description: video.description,
    });
  };
  
  // --- LOGIKA BARU UNTUK MENGHAPUS DATA DARI BACKEND ---
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Yakin ingin menghapus video ini?",
      okText: "Ya, Hapus",
      okType: "danger",
      cancelText: "Tidak",
      onOk: async () => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:8000/api/videos/${id}`);
            message.success("Video berhasil dihapus");
            await fetchVideos();
        } catch(error) {
            message.error("Gagal menghapus video.");
        } finally {
            setLoading(false);
        }
      },
    });
  };

  const handlePreview = (url) => setPreviewImage(url);
  const handleCancelPreview = () => setPreviewImage(null);

  return (
    <div className="manage-videos-container">
      <Title level={2}>🎬 Kelola Video Anak</Title>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Title level={4}>{editingId ? "Edit Video" : "Tambah Video Baru"}</Title>
        
        {/* DIUBAH: 'name' disesuaikan dengan Model Backend */}
        <Form.Item label="Judul Video" name="title" rules={[{ required: true, message: "Judul wajib diisi" }]}>
          <Input placeholder="Judul Video" />
        </Form.Item>
        <Form.Item label="Link YouTube" name="youtubeUrl" rules={[{ required: true, message: "Link video wajib diisi" }]}>
          <Input placeholder="https://youtube.com/..." />
        </Form.Item>
        <Form.Item label="Thumbnail URL" name="thumbnailUrl" rules={[{ required: true, message: "Link thumbnail wajib diisi" }]}>
          <Input placeholder="Link Gambar Thumbnail" />
        </Form.Item>
        <Form.Item label="Genre" name="genre" rules={[{ required: true, message: "Pilih genre video" }]}>
          <Select placeholder="Pilih genre">
            <Option value="lagu-anak">Lagu Anak</Option>
            <Option value="edukasi">Edukasi</Option>
            <Option value="kartun">Kartun</Option>
            <Option value="lainnya">Lainnya</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Deskripsi" name="description">
          <Input.TextArea rows={3} placeholder="Deskripsi singkat" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} icon={editingId ? <EditOutlined /> : <PlusOutlined />}>
            {editingId ? "Update Video" : "Tambah Video"}
          </Button>
          {editingId && (
            <Button style={{ marginLeft: 8 }} onClick={() => { form.resetFields(); setEditingId(null); }}>
              Batal
            </Button>
          )}
        </Form.Item>
      </Form>

      <Title level={4}>📋 Daftar Video</Title>

      <Row gutter={[16, 16]}>
        {loading ? <p>Loading...</p> : videos.length === 0 ? (
          <p>Belum ada video ditambahkan.</p>
        ) : (
          // --- DIUBAH: 'video' sekarang dari state dan propertinya disesuaikan ---
          videos.map((video) => (
            <Col key={video._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={ <img alt={video.title} src={video.thumbnailUrl} onClick={() => handlePreview(video.thumbnailUrl)} /> }
                actions={[
                  <EditOutlined key="edit" onClick={() => handleEdit(video)} />,
                  <DeleteOutlined key="delete" onClick={() => handleDelete(video._id)} style={{ color: "red" }} />,
                ]}
              >
                <Card.Meta
                  title={video.title}
                  description={
                    <>
                      <p>🎞 Genre: {video.genre}</p>
                      <p>{video.description}</p>
                      <a href={video.youtubeUrl} target="_blank" rel="noreferrer">
                        🔗 Tonton Video
                      </a>
                    </>
                  }
                />
              </Card>
            </Col>
          ))
        )}
      </Row>

      <Modal open={!!previewImage} footer={null} onCancel={handleCancelPreview}>
        <img alt="Preview Thumbnail" src={previewImage} style={{ width: "100%", borderRadius: "8px" }} />
      </Modal>
    </div>
  );
}