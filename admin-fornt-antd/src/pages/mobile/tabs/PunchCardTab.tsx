import { useModel } from '@umijs/max';
import { Button, ImageUploader, Toast } from 'antd-mobile';
import React, { useEffect, useRef, useState } from 'react';

const PunchCardTab: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const [images, setImages] = useState<{ url: string }[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // 获取摄像头画面
  useEffect(() => {
    const initCamera = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        Toast.show({ content: '当前不支持摄像头', icon: 'fail' });
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('摄像头获取失败:', err);
        Toast.show({ content: '无法访问摄像头', icon: 'fail' });
      }
    };

    initCamera();

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // 拍照打卡
  const handleCapture = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL('image/png');
      setImages((prev) => [...prev, { url: imageUrl }]);
      Toast.show({ content: '拍照成功', icon: 'success' });
    }
  };

  return (
    <div style={{ padding: 12, textAlign: 'center' }}>
      <div
        style={{
          width: '100%',
          maxWidth: 360,
          margin: '0 auto',
          borderRadius: 12,
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ width: '100%', height: 'auto', aspectRatio: '3/4' }}
        />
      </div>

      <Button
        color="primary"
        block
        style={{ marginTop: 20 }}
        onClick={handleCapture}
        disabled={images.length >= 10}
      >
        拍照打卡
      </Button>

      <ImageUploader
        value={images}
        onChange={setImages}
        maxCount={10}
        preview
        showUpload={false}
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default PunchCardTab;
