// src/pages/user/Playlist.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Typography, message, Spin } from 'antd'; // Menggunakan komponen dari Ant Design

const { Title } = Typography;

const Playlist = () => {
  // State untuk menyimpan daftar video dan status loading
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gunakan useEffect untuk mengambil data saat halaman pertama kali dimuat
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/videos');
        setVideos(response.data);
      } catch (error) {
        console.error("Gagal mengambil data video:", error);
        message.error("Gagal memuat daftar video.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []); // Array kosong memastikan ini hanya berjalan sekali

  // Tampilkan loading spinner jika data sedang diambil
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Title level={2}>🎵 Video Playlist Anak 🎵</Title>
      <Row gutter={[16, 16]}>
        {videos.length > 0 ? (
          // Looping setiap video dan tampilkan sebagai kartu
          videos.map(video => (
            <Col key={video._id} xs={24} sm={12} md={8} lg={6}>
              <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Card
                  hoverable
                  cover={<img alt={video.title} src={video.thumbnailUrl} style={{ height: 180, objectFit: 'cover' }} />}
                >
                  <Card.Meta title={video.title} description={`Genre: ${video.genre}`} />
                </Card>
              </a>
            </Col>
          ))
        ) : (
          // Tampilkan pesan ini jika tidak ada video di database
          <Col span={24}>
            <p>Belum ada video yang ditambahkan.</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Playlist;