import React, { useState, useEffect } from 'react'; // <-- BARU
import axios from 'axios'; // <-- BARU
import { BookOutlined, VideoCameraOutlined, MessageOutlined } from '@ant-design/icons';
import { Spin, message } from 'antd'; // <-- BARU
import '../../styles/dashboard.css';

const Dashboard = () => {
  // --- BARU: State untuk menyimpan data statistik dan status loading ---
  const [stats, setStats] = useState({ books: 0, videos: 0, comments: 0 });
  const [loading, setLoading] = useState(true);

  // --- BARU: useEffect untuk mengambil data dari backend saat halaman dimuat ---
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Memanggil endpoint statistik yang sudah kita buat di backend
        const response = await axios.get('http://localhost:8000/api/stats');
        setStats(response.data);
      } catch (error) {
        console.error("Gagal mengambil data statistik:", error);
        message.error("Gagal memuat data statistik.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []); // [] berarti hanya dijalankan sekali saat komponen dimuat

  // --- BARU: Tampilkan loading spinner jika data belum siap ---
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard Admin</h1>
        <p>Ringkasan aktivitas & data konten JendelaCilik</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <BookOutlined style={{ fontSize: 32, color: '#77B6EA' }} />
          {/* DIUBAH: Angka sekarang dinamis dari state */}
          <h3>{stats.books}</h3>
          <p>Total Buku Cerita</p>
        </div>
        <div className="stat-card">
          <VideoCameraOutlined style={{ fontSize: 32, color: '#FFC9B9' }} />
          {/* DIUBAH: Angka sekarang dinamis dari state */}
          <h3>{stats.videos}</h3>
          <p>Total Video Anak</p>
        </div>
        <div className="stat-card">
          <MessageOutlined style={{ fontSize: 32, color: '#445566' }} />
          {/* DIUBAH: Angka sekarang dinamis dari state */}
          <h3>{stats.comments}</h3>
          <p>Komentar Pengguna</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;