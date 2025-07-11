// src/pages/shared/About.jsx
import React from 'react';
import { Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#A8E6CF',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    }}>
      <Card style={{ maxWidth: 600, backgroundColor: '#FFEAA7' }}>
        <Title level={2} style={{ color: '#333', textAlign: 'center' }}>
          Tentang JendelaCilik
        </Title>
        <Paragraph style={{ color: '#333', fontSize: '16px', textAlign: 'justify' }}>
          <strong>JendelaCilik</strong> adalah aplikasi berbasis web yang dirancang khusus untuk anak-anak usia 2 hingga 7 tahun. 
          Aplikasi ini menyediakan buku cerita digital, video lagu anak, dan permainan edukatif yang menyenangkan untuk mendukung 
          perkembangan dan pembelajaran anak usia dini.
        </Paragraph>
        <Paragraph style={{ color: '#333', fontSize: '16px', textAlign: 'justify' }}>
          Kami percaya bahwa belajar bisa menjadi pengalaman yang menyenangkan dan penuh warna seperti dunia permen 🍭. 
          Dengan tampilan yang cerah dan fitur interaktif, anak-anak dapat mengeksplorasi dunia dengan cara yang menyenangkan dan aman.
        </Paragraph>
      </Card>
    </div>
  );
};

export default About;
