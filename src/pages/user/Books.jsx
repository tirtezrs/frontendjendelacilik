// src/pages/user/Books.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Typography, message, Spin } from 'antd';

const { Title, Paragraph } = Typography;

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data buku dari backend saat komponen dimuat
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error("Gagal mengambil data buku:", error);
        message.error("Gagal memuat daftar buku.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const openBook = (pdfUrl) => {
    window.open(`http://localhost:8000${pdfUrl}`, '_blank');
  };

  // Jika sedang loading, tampilkan spinner
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  // Tampilan utama saat tidak loading
  return (
    <div>
      <Title level={2}>📚 Daftar Buku Cerita 📚</Title>
      <Row gutter={[16, 16]}>
        {books.length > 0 ? (
          books.map(book => (
            <Col key={book._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                onClick={() => openBook(book.pdfUrl)}
                cover={
                  <img
                    alt={book.title}
                    src={`http://localhost:8000${book.coverUrl}`}
                    style={{ height: 240, objectFit: 'cover' }}
                  />
                }
              >
                <Card.Meta 
                  title={book.title}
                  description={<Paragraph ellipsis={{ rows: 3 }}>{book.description}</Paragraph>}
                />
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <p>Belum ada buku yang ditambahkan.</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Books;
