import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  Card,
  Button,
  Popconfirm,
  Typography,
  notification,
  Spin,
} from 'antd';

import '../../styles/managecomments.css'; // Tetap gunakan styling frontend

const { Title, Text, Paragraph } = Typography;

const ManageComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi ambil komentar dari backend
  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/comments');
      setComments(response.data);
    } catch (error) {
      notification.error({
        message: 'Gagal!',
        description: 'Gagal memuat data komentar.',
        placement: 'topRight',
      });
      console.error("Fetch comments error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Fungsi hapus komentar ke backend
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/comments/${id}`);
      notification.success({
        message: 'Berhasil!',
        description: 'Komentar berhasil dihapus',
        placement: 'topRight',
      });
      fetchComments(); // refresh data
    } catch (error) {
      notification.error({
        message: 'Gagal!',
        description: 'Gagal menghapus komentar.',
        placement: 'topRight',
      });
      console.error("Delete comment error:", error);
    }
  };

  return (
    <div className="manage-comments-container">
      <Title level={2}>💬 Kelola Komentar Pengguna</Title>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spin size="large" />
        </div>
      ) : comments.length === 0 ? (
        <Text type="secondary">Belum ada komentar dari pengguna.</Text>
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={comments}
          renderItem={(comment) => (
            <List.Item>
              <Card
                title={`👤 ${comment.user}`}
                extra={
                  <Popconfirm
                    title="Hapus komentar ini?"
                    onConfirm={() => handleDelete(comment._id)}
                    okText="Ya"
                    cancelText="Batal"
                  >
                    <Button danger size="small">
                      Hapus
                    </Button>
                  </Popconfirm>
                }
              >
                <Paragraph>{comment.text}</Paragraph>
                <p>
                  <Text type="secondary">Rating: {comment.rating} ⭐</Text>
                </p>
                <p>
                  <Text type="secondary">
                    Tanggal:{' '}
                    {new Date(comment.createdAt).toLocaleString('id-ID', {
                      dateStyle: 'long',
                      timeStyle: 'short',
                    })}
                  </Text>
                </p>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default ManageComments;
