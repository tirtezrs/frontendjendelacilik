import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import {
  RightOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  List,
  Input,
  Button,
  Rate,
  message,
  Card,
} from "antd";
import Banner from "../../components/banner";
import "../../styles/home.css";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [previewBooks, setPreviewBooks] = useState([]);
  const [previewVideos, setPreviewVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [booksRes, videosRes, commentsRes] = await Promise.all([
        axios.get("http://localhost:8000/api/books?limit=6"),
        axios.get("http://localhost:8000/api/videos?limit=6"),
        axios.get("http://localhost:8000/api/comments"),
      ]);
      setPreviewBooks(booksRes.data);
      setPreviewVideos(videosRes.data);
      setComments(commentsRes.data);
    } catch (error) {
      message.error("Gagal memuat data halaman utama.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitComment = async () => {
    if (!newComment || rating === 0) {
      return message.warning("Isi komentar dan rating terlebih dahulu");
    }
    if (!user) {
      return message.error("Anda harus login untuk mengirim komentar.");
    }

    const commentData = {
      user: user.username,
      text: newComment,
      rating: rating,
    };

    try {
      await axios.post("http://localhost:8000/api/comments", commentData);
      message.success("Komentar berhasil ditambahkan!");
      setNewComment("");
      setRating(0);
      fetchData();
    } catch (error) {
      message.error("Gagal mengirim komentar.");
    }
  };

  return (
    <div className="home-container">
      <Banner />
      <div className="home-intro">
        <h2>🌟 Selamat Datang!</h2>
        <p>Yuk belajar sambil bermain! Temukan cerita seru dan video lagu anak yang edukatif dan menyenangkan.</p>
      </div>

      {/* Buku Cerita */}
      <div className="section-preview">
        <div className="section-title-row">
          <h3>Buku Cerita</h3>
        </div>
        <div className="preview-wrapper">
          <div className="preview-list">
            {previewBooks.map((book) => (
              <Card
                key={book._id}
                hoverable
                className="preview-card"
                cover={<img alt={book.title} src={book.coverUrl} style={{ height: 180, objectFit: 'cover' }} />}
              >
                <Card.Meta title={book.title} />
              </Card>
            ))}
          </div>
          <div className="arrow-button" onClick={() => navigate("/user/books")}>
            <RightOutlined />
          </div>
        </div>
      </div>

      {/* Video Anak */}
      <div className="section-preview">
        <div className="section-title-row">
          <h3>Video Anak</h3>
        </div>
        <div className="preview-wrapper">
          <div className="preview-list">
            {previewVideos.map((video) => (
              <Card
                key={video._id}
                hoverable
                className="preview-card"
                cover={<img alt={video.title} src={video.thumbnailUrl} style={{ height: 180, objectFit: 'cover' }} />}
              >
                <Card.Meta title={video.title} />
              </Card>
            ))}
          </div>
          <div className="arrow-button" onClick={() => navigate("/user/playlist")}>
            <RightOutlined />
          </div>
        </div>
      </div>

      {/* Komentar Pengguna */}
      <div className="comment-section">
        <h2>💬 Komentar Pengguna</h2>

        {user ? (
          <>
            <Input.TextArea
              rows={3}
              placeholder="Tulis komentar..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <Rate value={rating} onChange={setRating} />
              <Button type="primary" icon={<SendOutlined />} onClick={handleSubmitComment}>
                Kirim
              </Button>
            </div>
          </>
        ) : (
          <p>Silakan <Link to="/login">login</Link> untuk mengirim komentar.</p>
        )}

        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={comments}
          style={{ marginTop: 24 }}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<span>{item.user}</span>}
                description={
                  <>
                    <p>{item.text}</p>
                    <Rate disabled value={item.rating} />
                    <div style={{ fontSize: 12, color: '#888' }}>
                      {new Date(item.createdAt).toLocaleString('id-ID')}
                    </div>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Home;
