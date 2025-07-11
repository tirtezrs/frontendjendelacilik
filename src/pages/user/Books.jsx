// src/pages/user/Books.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Typography, message, Spin, Modal } from 'antd';

const { Title, Paragraph } = Typography;

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewBook, setPreviewBook] = useState(null);

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

  const handlePreview = (book) => setPreviewBook(book);
  const handleCancelPreview = () => setPreviewBook(null);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '0 24px' }}>
      <Title level={2}>📚 Daftar Buku Cerita 📚</Title>
      <Row gutter={[16, 16]}>
        {books.length > 0 ? (
          books.map(book => (
            <Col key={book._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                onClick={() => handlePreview(book)}
                cover={
                  <img
                    alt={book.title}
                    src={book.coverUrl.startsWith('http') ? book.coverUrl : `http://localhost:8000${book.coverUrl}`}
                    style={{ height: 240, objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/200x300?text=No+Image";
                    }}
                  />
                }
              >
                <Card.Meta 
                  title={book.title}
                  description={
                    <>
                      <Paragraph ellipsis={{ rows: 2 }}>{book.description}</Paragraph>
                      <p style={{ margin: 0, fontSize: 12, color: '#888' }}>📖 Genre: {book.genre}</p>
                    </>
                  }
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

      {/* Modal Preview */}
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
};

export default Books;
